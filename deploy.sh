#!/usr/bin/env bash
#
# deploy.sh — Build and deploy Alignment Cube to local nginx
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh              # uses default web root /var/www/alignment-cube
#   ./deploy.sh /var/www/html  # custom web root
#
set -euo pipefail

WEB_ROOT="${1:-/var/www/alignment-cube}"

# ── Prerequisites ────────────────────────────────────────────
command -v node >/dev/null 2>&1 || { echo "❌  Node.js is not installed. Install it first (apt install nodejs npm)."; exit 1; }
command -v npm  >/dev/null 2>&1 || { echo "❌  npm is not installed."; exit 1; }

echo "── Installing dependencies ──"
npm ci --prefer-offline

echo "── Building production bundle ──"
npm run build

echo "── Deploying to $WEB_ROOT ──"
sudo mkdir -p "$WEB_ROOT"
sudo rm -rf "${WEB_ROOT:?}"/*
sudo cp -r dist/* "$WEB_ROOT"/

# ── Nginx config (only written on first run) ─────────────────
NGINX_CONF="/etc/nginx/sites-available/alignment-cube"

if [ ! -f "$NGINX_CONF" ]; then
    echo "── Writing nginx site config ──"
    sudo tee "$NGINX_CONF" > /dev/null <<NGINX
server {
    listen 80;
    server_name _;

    root $WEB_ROOT;
    index index.html;

    # SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/html application/javascript text/css application/json image/svg+xml;
    gzip_min_length 256;
}
NGINX

    sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/alignment-cube
    sudo rm -f /etc/nginx/sites-enabled/default

    echo "── Testing & reloading nginx ──"
    sudo nginx -t && sudo systemctl reload nginx
else
    echo "── Nginx config already exists, skipping ──"
    sudo nginx -t && sudo systemctl reload nginx
fi

echo ""
echo "✅  Deployed to $WEB_ROOT"
echo "    Open http://$(hostname -I | awk '{print $1}') in your browser."
