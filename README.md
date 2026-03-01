# Alignment Cube

An interactive 3D alignment cube visualization built with React and HTML Canvas.  
Characters are plotted across three axes — **Pragmatism**, **Ethics**, and **Narcissism** — and grouped into 27 archetypes. Rotate, zoom, filter, and drill into any character to see their PEN breakdown.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)

---

## Features

- 3D rotatable cube rendered on HTML Canvas at ~30 fps
- 200+ characters with per-axis PEN scores
- 27-archetype classification grid (draggable panel)
- Character detail cards with nearest-neighbor analysis
- Sidebar search, axis filtering, and plane overlays
- Ambient background music (Minecraft-style sporadic playback)
- Starfield backdrop with colour tints and glow halos
- Mobile-friendly drawer UI
- Fully static — no server runtime required

---

## Prerequisites

| Tool    | Version |
|---------|---------|
| Node.js | ≥ 18    |
| npm     | ≥ 9     |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/<your-username>/alignment-cube.git
cd alignment-cube

# Install dependencies
npm install

# Start dev server (opens http://localhost:5173)
npm run dev
```

---

## Production Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the build locally
```

---

## Deploy to a Server (nginx)

A one-command deploy script is included for Debian/Ubuntu hosts (e.g. a Proxmox LXC):

```bash
# On the server after cloning:
chmod +x deploy.sh
./deploy.sh                     # default web root: /var/www/alignment-cube
./deploy.sh /var/www/html       # custom web root
```

The script will:

1. `npm ci` — install locked dependencies
2. `npm run build` — create the production bundle
3. Copy `dist/` contents to the nginx web root
4. Write an nginx site config (first run only) with SPA fallback, asset caching, and gzip
5. Reload nginx

---

## Project Structure

```
├── public/
│   └── audio/               # Ambient music track
├── src/
│   ├── main.jsx              # React entry point
│   ├── AlignmentCube.jsx     # Root component (state, canvas loop, toolbar)
│   ├── components/
│   │   ├── AlignmentBadge.jsx
│   │   ├── ArchetypePanel.jsx    # 27-archetype grid, draggable
│   │   ├── AxisBar.jsx
│   │   ├── AxisInfoPanel.jsx
│   │   ├── CadGizmo.jsx         # 3D rotation gizmo
│   │   ├── CharacterDetailCard.jsx
│   │   ├── MobileDetailView.jsx
│   │   ├── PlaneOverlay.jsx
│   │   ├── SidebarPanel.jsx
│   │   └── ZoomWidget.jsx
│   ├── data/
│   │   ├── archetypes.js     # 27 archetype definitions
│   │   ├── axisInfo.js       # PEN axis descriptions
│   │   ├── characters.js     # 200+ character entries
│   │   └── index.js          # Precomputed caches (RGB, star field, counts)
│   ├── hooks/
│   │   ├── useAmbientMusic.js    # Minecraft-style music scheduler
│   │   └── useInteraction.js     # Rotation, keyboard, resize, drag
│   ├── rendering/
│   │   └── drawScene.js      # Main canvas render function
│   └── utils/
│       ├── color.js
│       ├── drawing.js
│       ├── index.js
│       └── math.js
├── index.html
├── vite.config.js
├── deploy.sh                 # One-command server deploy
└── package.json
```

---

## Tech Stack

- **React 18** — UI components & state management
- **Vite 6** — Dev server & production bundler
- **HTML Canvas 2D** — All 3D rendering (no WebGL/Three.js)
- **nginx** — Production static file server

---

## License

Private project — not licensed for redistribution.
