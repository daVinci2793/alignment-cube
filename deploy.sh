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

# ── System dependencies ──────────────────────────────────────
echo "── Updating packages & installing dependencies ──"
sudo apt-get update -y
sudo apt-get install -y curl nginx brotli

# Install Node.js 20.x via NodeSource if not present
if ! command -v node >/dev/null 2>&1; then
    echo "── Installing Node.js 20.x ──"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "  Node: $(node -v)  npm: $(npm -v)"

echo "── Installing npm dependencies ──"
npm ci --prefer-offline

echo "── Building production bundle ──"
npm run build

# ── Pre-compress assets with gzip & brotli ────────────────────
echo "── Pre-compressing static assets ──"
find dist -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.svg' \) | while read -r f; do
    gzip  -9 -k -f "$f"                          # .gz  sidecar
    if command -v brotli >/dev/null 2>&1; then
        brotli -9 -k -f "$f"                     # .br  sidecar
    fi
done

echo "── Deploying to $WEB_ROOT ──"
sudo mkdir -p "$WEB_ROOT"
sudo rm -rf "${WEB_ROOT:?}"/*
sudo cp -r dist/* "$WEB_ROOT"/

# ── Nginx config (only written on first run) ─────────────────
NGINX_CONF="/etc/nginx/sites-available/alignment-cube"

if [ ! -f "$NGINX_CONF" ]; then
    echo "── Writing nginx site config ──"

    # Install brotli module if available (best-effort)
    sudo apt-get install -y libnginx-mod-http-brotli-filter libnginx-mod-http-brotli-static 2>/dev/null || true

    sudo tee "$NGINX_CONF" > /dev/null <<NGINX
server {
    listen 3180;
    server_name _;

    root $WEB_ROOT;
    index index.html;

    # ─── Kernel-level I/O tricks ──────────────────────────────
    sendfile        on;      # zero-copy: kernel sends file directly to socket
    tcp_nopush      on;      # batch headers + body into fewer packets
    tcp_nodelay     on;      # disable Nagle — send small packets immediately

    # ─── Open-file cache ──────────────────────────────────────
    # Cache file descriptors, sizes & modification times in memory
    open_file_cache          max=1024 inactive=60s;
    open_file_cache_valid    30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors   on;

    # ─── Gzip (runtime fallback) ──────────────────────────────
    gzip             on;
    gzip_static      on;     # serve pre-compressed .gz sidecars when they exist
    gzip_vary        on;     # Vary: Accept-Encoding so proxies cache both
    gzip_proxied     any;    # compress even behind your reverse proxy
    gzip_comp_level  6;      # sweet spot: good ratio, low CPU
    gzip_min_length  256;
    gzip_types
        text/html
        text/css
        text/plain
        text/xml
        application/javascript
        application/json
        application/xml
        image/svg+xml
        font/woff2;

    # ─── Brotli (if module is loaded) ─────────────────────────
    brotli           on;
    brotli_static    on;     # serve pre-compressed .br sidecars
    brotli_comp_level 6;
    brotli_types
        text/html
        text/css
        text/plain
        text/xml
        application/javascript
        application/json
        application/xml
        image/svg+xml
        font/woff2;

    # ─── SPA fallback ─────────────────────────────────────────
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # ─── Hashed assets — cache forever ────────────────────────
    # Vite fingerprints these filenames, so they're safe to cache aggressively
    location /assets/ {
        expires max;
        add_header Cache-Control "public, immutable";
        access_log off;      # no point logging static hits
    }

    # ─── Audio — long cache, but not immutable (filename isn't hashed) ──
    location /audio/ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # ─── index.html — never cache (so deploys take effect immediately) ──
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # ─── Security headers (free perf + safety) ────────────────
    add_header X-Content-Type-Options  "nosniff"       always;
    add_header X-Frame-Options         "SAMEORIGIN"    always;
    add_header Referrer-Policy         "strict-origin-when-cross-origin" always;
}
NGINX

    sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/alignment-cube

    echo "── Testing & reloading nginx ──"
    sudo nginx -t && sudo systemctl reload nginx
else
    echo "── Nginx config already exists, skipping ──"
    sudo nginx -t && sudo systemctl reload nginx
fi

echo ""
echo "✅  Deployed to $WEB_ROOT"
echo "    Open http://$(hostname -I | awk '{print $1}') in your browser."
