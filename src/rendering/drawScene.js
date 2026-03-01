import { CHARACTERS, AXIS_INFO, NEAREST_5, STARS, RGB_CACHE } from "../data/index.js";
import { lerp, clamp, project } from "../utils/math.js";
import { hex2rgb } from "../utils/color.js";
import { drawRoundRect, drawTextShadowed } from "../utils/drawing.js";

// ---- Module-scope constants (avoid re-allocation every frame) ----

const CUBE_FACES = [
    { corners: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]], color: [50, 35, 70] },
    { corners: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], color: [35, 70, 50] },
    { corners: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]], color: [70, 35, 35] },
    { corners: [[1, -1, -1], [1, -1, 1], [1, 1, 1], [1, 1, -1]], color: [70, 50, 35] },
    { corners: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], color: [35, 50, 70] },
    { corners: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]], color: [70, 70, 35] },
];

const CUBE_CORNERS = [];
for (let x = -1; x <= 1; x += 2)
    for (let y = -1; y <= 1; y += 2)
        for (let z = -1; z <= 1; z += 2)
            CUBE_CORNERS.push([x, y, z]);

// Pre-compute edge pairs from corners (pairs that differ in exactly 1 axis)
const CUBE_EDGES = [];
for (let i = 0; i < CUBE_CORNERS.length; i++)
    for (let j = i + 1; j < CUBE_CORNERS.length; j++) {
        let d = 0, eAxis = -1;
        for (let k = 0; k < 3; k++) if (CUBE_CORNERS[i][k] !== CUBE_CORNERS[j][k]) { d++; eAxis = k; }
        if (d === 1) CUBE_EDGES.push({ a: CUBE_CORNERS[i], b: CUBE_CORNERS[j], axK: "xyz"[eAxis] });
    }

const AXIS_ENDPOINTS = { x: [1.5, 0, 0], y: [0, 1.5, 0], z: [0, 0, 1.5] };

const AXIS_CENTER_LINES = [
    { f: [-1.25, 0, 0], t: [1.25, 0, 0], c: [255, 107, 107], k: "x" },
    { f: [0, -1.25, 0], t: [0, 1.25, 0], c: [255, 217, 61], k: "y" },
    { f: [0, 0, -1.25], t: [0, 0, 1.25], c: [107, 203, 119], k: "z" },
];

const AXIS_LABELS = [
    { p: [1.5, 0, 0], l: "UNBOUND", c: "#ff6b6b", k: "x" },
    { p: [-1.5, 0, 0], l: "STRUCTURED", c: "#ff6b6b", k: "x" },
    { p: [0, 1.5, 0], l: "MALIGNANT", c: "#ffd93d", k: "y" },
    { p: [0, -1.5, 0], l: "BENEVOLENT", c: "#ffd93d", k: "y" },
    { p: [0, 0, 1.5], l: "UNIVERSAL", c: "#6bcb77", k: "z" },
    { p: [0, 0, -1.5], l: "PAROCHIAL", c: "#6bcb77", k: "z" },
];

// Pre-compute RGB values for axis label colors
const AXIS_LABEL_RGB = {};
AXIS_LABELS.forEach(a => {
    if (!AXIS_LABEL_RGB[a.c]) AXIS_LABEL_RGB[a.c] = hex2rgb(a.c);
});

const GRID_DIVIDER_VALUES = [-1 / 3, 1 / 3];

// Reusable arrays for per-frame projection (avoid allocating new arrays each frame)
const _projFaces = new Array(6);
const _cornerZs = new Array(8);

// ---- Starfield offscreen cache ----
let _starCanvas = null;
let _starCacheW = 0;
let _starCacheH = 0;
let _starCacheFrame = -999;  // last frame the star cache was drawn

function _getRgb(hexColor) {
    return RGB_CACHE[hexColor] || hex2rgb(hexColor);
}

/**
 * Main canvas rendering function.
 * Extracted from the component so it can be tested and profiled independently.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} opts — all rendering state
 * @returns {Array} projected character data (for hit-testing)
 */
export function drawScene(ctx, opts) {
    const {
        W, H, rotX, rotY, zoom, frame,
        panX = 0, panY = 0,
        hovered, selected,
        guides, projLines,
        activePlane,
        compareMode, compareList,
        searchQuery,
        isMobile,
        hintOpacity,
        activeArchetype,
    } = opts;

    const cx = W / 2 + panX, cy = H / 2 + panY;
    const scale = Math.min(W, H) * 0.28 * zoom;

    ctx.clearRect(0, 0, W, H);

    // --- BG ---
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
    bg.addColorStop(0, "#14142a");
    bg.addColorStop(1, "#070710");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // --- STARFIELD (offscreen cached, redrawn every 4 frames) ---
    const starStale = !_starCanvas || _starCacheW !== W || _starCacheH !== H || (frame - _starCacheFrame) >= 4;
    if (starStale) {
        if (!_starCanvas) {
            _starCanvas = (typeof OffscreenCanvas !== "undefined")
                ? new OffscreenCanvas(W, H)
                : document.createElement("canvas");
        }
        if (_starCacheW !== W || _starCacheH !== H) {
            _starCanvas.width = W;
            _starCanvas.height = H;
            _starCacheW = W;
            _starCacheH = H;
        }
        const sCtx = _starCanvas.getContext("2d");
        sCtx.clearRect(0, 0, W, H);
        for (let i = 0; i < STARS.length; i++) {
            const s = STARS[i];
            const twinkle = 0.5 + 0.5 * Math.sin(frame * s.speed * 60 + s.x * 100);
            const alpha = s.a * (0.5 + 0.5 * twinkle);
            const sx = s.x * W, sy = s.y * H;
            const [cr, cg, cb] = s.tint;
            // Glow halo for bright stars
            if (s.glow) {
                const grad = sCtx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 4);
                grad.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.35})`);
                grad.addColorStop(0.4, `rgba(${cr},${cg},${cb},${alpha * 0.12})`);
                grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
                sCtx.fillStyle = grad;
                sCtx.fillRect(sx - s.r * 4, sy - s.r * 4, s.r * 8, s.r * 8);
            }
            // Core dot
            sCtx.beginPath();
            sCtx.arc(sx, sy, s.r, 0, Math.PI * 2);
            sCtx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
            sCtx.fill();
        }
        _starCacheFrame = frame;
    }
    ctx.drawImage(_starCanvas, 0, 0);

    // --- VIGNETTE ---
    const vig = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.25, cx, cy, Math.max(W, H) * 0.72);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    const p = (x, y, z) => project(x, y, z, rotX, rotY, scale, cx, cy);

    // Compute z-depth range from cube corners for correct depth normalisation
    let zNear = Infinity, zFar = -Infinity;
    for (let i = 0; i < CUBE_CORNERS.length; i++) {
        const cz = p(CUBE_CORNERS[i][0], CUBE_CORNERS[i][1], CUBE_CORNERS[i][2]).z;
        if (cz < zNear) zNear = cz;
        if (cz > zFar) zFar = cz;
    }
    const zRange = Math.max(zFar - zNear, 0.01);
    const zNorm = (z) => clamp((z - zNear) / zRange, 0, 1);

    // --- Axis collapse detection ---
    const fadeThresh = scale * 0.25, hideThresh = scale * 0.08;
    const axisMul = {};
    for (const key of ["x", "y", "z"]) {
        const ep = AXIS_ENDPOINTS[key];
        const pt = p(ep[0], ep[1], ep[2]);
        const d = Math.sqrt((pt.sx - cx) ** 2 + (pt.sy - cy) ** 2);
        axisMul[key] = d <= hideThresh ? 0 : d <= fadeThresh ? (d - hideThresh) / (fadeThresh - hideThresh) : 1;
    }
    const minMul = Math.min(axisMul.x, axisMul.y, axisMul.z);
    const flatness = 1 - minMul;
    const chromeFade = lerp(1, 0.12, flatness);

    // --- CUBE FACES (hoisted definition, reuse projection array) ---
    for (let fi = 0; fi < CUBE_FACES.length; fi++) {
        const f = CUBE_FACES[fi];
        const pts = f.corners.map(c2 => p(c2[0], c2[1], c2[2]));
        const avgZ = (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4;
        _projFaces[fi] = { color: f.color, pts, avgZ };
    }
    _projFaces.sort((a, b) => b.avgZ - a.avgZ);
    for (let fi = 0; fi < _projFaces.length; fi++) {
        const f = _projFaces[fi];
        const a = 0.045 * chromeFade;
        if (a < 0.002) continue;
        ctx.fillStyle = `rgba(${f.color[0]},${f.color[1]},${f.color[2]},${a})`;
        ctx.beginPath(); ctx.moveTo(f.pts[0].sx, f.pts[0].sy);
        for (let i = 1; i < f.pts.length; i++) ctx.lineTo(f.pts[i].sx, f.pts[i].sy);
        ctx.closePath(); ctx.fill();
    }

    // --- EDGES (hoisted edge list) ---
    for (let ei = 0; ei < CUBE_EDGES.length; ei++) {
        const edge = CUBE_EDGES[ei];
        const ec = axisMul[edge.axK];
        const pa = p(edge.a[0], edge.a[1], edge.a[2]);
        const pb = p(edge.b[0], edge.b[1], edge.b[2]);
        const depthA = lerp(0.4, 0.1, zNorm((pa.z + pb.z) / 2));
        const alpha = depthA * ec;
        if (alpha < 0.005) continue;
        ctx.strokeStyle = `rgba(110,140,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy); ctx.stroke();
    }

    // --- GRID DIVIDERS (batch dashed drawing to reduce setLineDash thrashing) ---
    if (guides) {
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 4]);
        const drawDiv = (x1, y1, z1, x2, y2, z2, col, axK) => {
            const pa = p(x1, y1, z1), pb = p(x2, y2, z2);
            const depthA2 = lerp(0.28, 0.06, zNorm((pa.z + pb.z) / 2));
            const alpha = depthA2 * (axK ? axisMul[axK] : 1);
            if (alpha < 0.01) return;
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
            ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy); ctx.stroke();
        };
        for (let vi = 0; vi < GRID_DIVIDER_VALUES.length; vi++) {
            const v = GRID_DIVIDER_VALUES[vi];
            drawDiv(v, -1, -1, v, -1, 1, [255, 107, 107], "x"); drawDiv(v, 1, -1, v, 1, 1, [255, 107, 107], "x");
            drawDiv(v, -1, -1, v, 1, -1, [255, 107, 107], "x"); drawDiv(v, -1, 1, v, 1, 1, [255, 107, 107], "x");
            drawDiv(-1, v, -1, -1, v, 1, [255, 217, 61], "y"); drawDiv(1, v, -1, 1, v, 1, [255, 217, 61], "y");
            drawDiv(-1, v, -1, 1, v, -1, [255, 217, 61], "y"); drawDiv(-1, v, 1, 1, v, 1, [255, 217, 61], "y");
            drawDiv(-1, -1, v, -1, 1, v, [107, 203, 119], "z"); drawDiv(1, -1, v, 1, 1, v, [107, 203, 119], "z");
            drawDiv(-1, -1, v, 1, -1, v, [107, 203, 119], "z"); drawDiv(-1, 1, v, 1, 1, v, [107, 203, 119], "z");
        }
        ctx.setLineDash([]);

        // Plane view grid labels
        if (activePlane) {
            const labelsFor = a => a === "x" ? ["Structured", "Pragmatic", "Unbound"] : a === "y" ? ["Benevolent", "Transactional", "Malignant"] : ["Parochial", "Factional", "Universal"];
            const colorFor = a => a === "x" ? [255, 107, 107] : a === "y" ? [255, 217, 61] : [107, 203, 119];
            const [a1, a2] = activePlane.axes;
            const thirdAxis = "xyz".replace(a1, "").replace(a2, "")[0];
            const positions = [-2 / 3, 0, 2 / 3];
            const l1 = labelsFor(a1), l2 = labelsFor(a2);
            const c1 = colorFor(a1), c2 = colorFor(a2);
            const fs2 = Math.max(7, Math.min(11, Math.min(W, H) * 0.02));
            positions.forEach((v, i) => {
                const coords1 = [0, 0, 0]; coords1["xyz".indexOf(a1)] = v; coords1["xyz".indexOf(a2)] = -1.18; coords1["xyz".indexOf(thirdAxis)] = 0;
                const pt1 = p(coords1[0], coords1[1], coords1[2]);
                const al1 = lerp(0.85, 0.2, zNorm(pt1.z));
                ctx.font = `bold ${fs2}px 'IBM Plex Mono',monospace`;
                ctx.textAlign = "center"; ctx.textBaseline = "middle";
                ctx.fillStyle = `rgba(${c1[0]},${c1[1]},${c1[2]},${al1})`;
                ctx.fillText(l1[i], pt1.sx, pt1.sy);
                const coords2 = [0, 0, 0]; coords2["xyz".indexOf(a2)] = v; coords2["xyz".indexOf(a1)] = -1.18; coords2["xyz".indexOf(thirdAxis)] = 0;
                const pt2 = p(coords2[0], coords2[1], coords2[2]);
                const al2 = lerp(0.85, 0.2, zNorm(pt2.z));
                ctx.fillStyle = `rgba(${c2[0]},${c2[1]},${c2[2]},${al2})`;
                ctx.fillText(l2[i], pt2.sx, pt2.sy);
            });
        }
    }

    // --- AXIS CENTER LINES ---
    for (let ai = 0; ai < AXIS_CENTER_LINES.length; ai++) {
        const { f: from, t: to, c: col, k: key } = AXIS_CENTER_LINES[ai];
        const pa = p(from[0], from[1], from[2]), pb = p(to[0], to[1], to[2]);
        const alpha = 0.35 * axisMul[key] * chromeFade;
        if (alpha < 0.01) continue;
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy); ctx.stroke();
    }

    // --- AXIS LABELS ---
    const fs = Math.max(8, Math.min(13, Math.min(W, H) * 0.025));
    ctx.font = `bold ${fs}px 'IBM Plex Mono',monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (let ai = 0; ai < AXIS_LABELS.length; ai++) {
        const { p: pos2, l: lbl, c: col, k: key } = AXIS_LABELS[ai];
        const mul = axisMul[key];
        if (mul < 0.02) continue;
        const pt = p(pos2[0], pos2[1], pos2[2]);
        const alpha = lerp(0.95, 0.12, zNorm(pt.z)) * mul;
        const [r, g, b] = AXIS_LABEL_RGB[col];
        drawTextShadowed(ctx, lbl, pt.sx, pt.sy, `rgba(${r},${g},${b},${alpha})`);
    }

    // --- CHARACTERS ---
    const chars = CHARACTERS.map(ch => ({
        ...ch,
        ...p(ch.x / 5, ch.y / 5, ch.z / 5),
        nx: ch.x / 5, ny: ch.y / 5, nz: ch.z / 5,
    }));
    chars.sort((a, b) => b.z - a.z);

    const activeChar = selected || hovered;

    // --- COMPARE LINE ---
    if (compareMode && compareList.length === 2) {
        const [ch1, ch2] = compareList.map(n => chars.find(c3 => c3.name === n)).filter(Boolean);
        if (ch1 && ch2) {
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = "rgba(255,200,100,0.3)"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(ch1.sx, ch1.sy); ctx.lineTo(ch2.sx, ch2.sy); ctx.stroke();
            ctx.setLineDash([]);
            const mx2 = (ch1.sx + ch2.sx) / 2, my2 = (ch1.sy + ch2.sy) / 2;
            const dist = Math.sqrt((ch1.x - ch2.x) ** 2 + (ch1.y - ch2.y) ** 2 + (ch1.z - ch2.z) ** 2).toFixed(1);
            ctx.font = "bold 10px 'IBM Plex Mono',monospace";
            const tw = ctx.measureText(`Δ ${dist}`).width;
            ctx.fillStyle = "rgba(10,10,20,0.7)";
            const pr = 4;
            drawRoundRect(ctx, mx2 - tw / 2 - pr, my2 - 14, tw + pr * 2, 16, 4); ctx.fill();
            ctx.fillStyle = "rgba(255,200,100,0.7)"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(`Δ ${dist}`, mx2, my2 - 6);
        }
    }

    // --- PROJECTION LINES ---
    if (projLines && activeChar) {
        const ch = chars.find(c3 => c3.name === activeChar);
        if (ch) {
            const [r, g, b] = _getRgb(ch.color);
            const drawPL = (x1, y1, z1, x2, y2, z2, a) => {
                const pa2 = p(x1, y1, z1), pb2 = p(x2, y2, z2);
                ctx.strokeStyle = `rgba(${r},${g},${b},${a})`; ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath(); ctx.moveTo(pa2.sx, pa2.sy); ctx.lineTo(pb2.sx, pb2.sy); ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath(); ctx.arc(pb2.sx, pb2.sy, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`; ctx.fill();
            };
            drawPL(ch.nx, ch.ny, ch.nz, ch.nx, 1, ch.nz, 0.45);
            drawPL(ch.nx, ch.ny, ch.nz, ch.nx, ch.ny, -1, 0.45);
            drawPL(ch.nx, ch.ny, ch.nz, -1, ch.ny, ch.nz, 0.45);
            drawPL(ch.nx, ch.ny, ch.nz, ch.nx, -1, ch.nz, 0.15);
            drawPL(ch.nx, ch.ny, ch.nz, 1, ch.ny, ch.nz, 0.15);
            drawPL(ch.nx, ch.ny, ch.nz, ch.nx, ch.ny, 1, 0.15);
        }
    }

    // --- SUB-CUBE GLOW (highlight the grid cell a selected char falls in — click only, not hover) ---
    if (selected) {
        const ach = chars.find(c3 => c3.name === selected);
        if (ach) {
            const [cr, cg, cb] = _getRgb(ach.color);
            // Determine which of the 3 cells each axis falls into
            // Grid boundaries at -1/3 and +1/3 in normalised space (= ±1.67 in real space)
            const cellEdge = (nv) => {
                if (nv < -1 / 3) return [-1, -1 / 3];
                if (nv > 1 / 3) return [1 / 3, 1];
                return [-1 / 3, 1 / 3];
            };
            const [xlo, xhi] = cellEdge(ach.nx);
            const [ylo, yhi] = cellEdge(ach.ny);
            const [zlo, zhi] = cellEdge(ach.nz);

            // Draw the 12 edges of this sub-cube with a soft glow
            const subEdges = [
                // 4 edges along X
                [xlo, ylo, zlo, xhi, ylo, zlo], [xlo, yhi, zlo, xhi, yhi, zlo],
                [xlo, ylo, zhi, xhi, ylo, zhi], [xlo, yhi, zhi, xhi, yhi, zhi],
                // 4 edges along Y
                [xlo, ylo, zlo, xlo, yhi, zlo], [xhi, ylo, zlo, xhi, yhi, zlo],
                [xlo, ylo, zhi, xlo, yhi, zhi], [xhi, ylo, zhi, xhi, yhi, zhi],
                // 4 edges along Z
                [xlo, ylo, zlo, xlo, ylo, zhi], [xhi, ylo, zlo, xhi, ylo, zhi],
                [xlo, yhi, zlo, xlo, yhi, zhi], [xhi, yhi, zlo, xhi, yhi, zhi],
            ];
            subEdges.forEach(([x1, y1, z1, x2, y2, z2]) => {
                const pa2 = p(x1, y1, z1), pb2 = p(x2, y2, z2);
                const edgeDepth = zNorm((pa2.z + pb2.z) / 2);
                const alpha = lerp(0.35, 0.08, edgeDepth) * chromeFade;
                if (alpha < 0.01) return;
                // Soft bloom line (wider, low alpha)
                ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.35})`;
                ctx.lineWidth = 4; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(pa2.sx, pa2.sy); ctx.lineTo(pb2.sx, pb2.sy); ctx.stroke();
                // Sharp inner line
                ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.7})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath(); ctx.moveTo(pa2.sx, pa2.sy); ctx.lineTo(pb2.sx, pb2.sy); ctx.stroke();
            });
            ctx.lineCap = "butt";
        }
    }

    // --- ARCHETYPE SUB-CUBE HIGHLIGHT ---
    if (activeArchetype) {
        const ar = activeArchetype.nRange;
        const [xlo, xhi] = ar.x;
        const [ylo, yhi] = ar.y;
        const [zlo, zhi] = ar.z;

        // Draw semi-transparent faces of the sub-cube
        const subFaces = [
            [[xlo, ylo, zlo], [xhi, ylo, zlo], [xhi, yhi, zlo], [xlo, yhi, zlo]],
            [[xlo, ylo, zhi], [xhi, ylo, zhi], [xhi, yhi, zhi], [xlo, yhi, zhi]],
            [[xlo, ylo, zlo], [xlo, ylo, zhi], [xlo, yhi, zhi], [xlo, yhi, zlo]],
            [[xhi, ylo, zlo], [xhi, ylo, zhi], [xhi, yhi, zhi], [xhi, yhi, zlo]],
            [[xlo, ylo, zlo], [xhi, ylo, zlo], [xhi, ylo, zhi], [xlo, ylo, zhi]],
            [[xlo, yhi, zlo], [xhi, yhi, zlo], [xhi, yhi, zhi], [xlo, yhi, zhi]],
        ];
        const projSubFaces = subFaces.map(corners => {
            const pts = corners.map(c => p(...c));
            return { pts, avgZ: pts.reduce((s, pt) => s + pt.z, 0) / 4 };
        });
        projSubFaces.sort((a, b) => b.avgZ - a.avgZ);
        projSubFaces.forEach(f => {
            const depthA = lerp(0.10, 0.03, zNorm(f.avgZ));
            const a = depthA * chromeFade;
            if (a < 0.005) return;
            ctx.fillStyle = `rgba(136,204,255,${a})`;
            ctx.beginPath(); ctx.moveTo(f.pts[0].sx, f.pts[0].sy);
            for (let i = 1; i < f.pts.length; i++) ctx.lineTo(f.pts[i].sx, f.pts[i].sy);
            ctx.closePath(); ctx.fill();
        });

        // Draw the 12 edges of the archetype sub-cube
        const archEdges = [
            [xlo, ylo, zlo, xhi, ylo, zlo], [xlo, yhi, zlo, xhi, yhi, zlo],
            [xlo, ylo, zhi, xhi, ylo, zhi], [xlo, yhi, zhi, xhi, yhi, zhi],
            [xlo, ylo, zlo, xlo, yhi, zlo], [xhi, ylo, zlo, xhi, yhi, zlo],
            [xlo, ylo, zhi, xlo, yhi, zhi], [xhi, ylo, zhi, xhi, yhi, zhi],
            [xlo, ylo, zlo, xlo, ylo, zhi], [xhi, ylo, zlo, xhi, ylo, zhi],
            [xlo, yhi, zlo, xlo, yhi, zhi], [xhi, yhi, zlo, xhi, yhi, zhi],
        ];
        archEdges.forEach(([x1, y1, z1, x2, y2, z2]) => {
            const pa2 = p(x1, y1, z1), pb2 = p(x2, y2, z2);
            const edgeDepth = zNorm((pa2.z + pb2.z) / 2);
            const alpha = lerp(0.45, 0.12, edgeDepth) * chromeFade;
            if (alpha < 0.01) return;
            ctx.strokeStyle = `rgba(136,204,255,${alpha * 0.4})`;
            ctx.lineWidth = 5; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(pa2.sx, pa2.sy); ctx.lineTo(pb2.sx, pb2.sy); ctx.stroke();
            ctx.strokeStyle = `rgba(136,204,255,${alpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(pa2.sx, pa2.sy); ctx.lineTo(pb2.sx, pb2.sy); ctx.stroke();
        });
        ctx.lineCap = "butt";
    }

    // --- CHARACTER DOTS ---
    const lfs = Math.max(7, Math.min(10, Math.min(W, H) * 0.018));

    // Spotlight set: selected + nearest 5 + search matches
    const spotlightSet = new Set();
    if (selected) {
        spotlightSet.add(selected);
        (NEAREST_5[selected] || []).forEach(n => spotlightSet.add(n.name));
    }
    const searchMatch = searchQuery && searchQuery.length >= 2
        ? (name, source) => name.toLowerCase().includes(searchQuery.toLowerCase()) || source.toLowerCase().includes(searchQuery.toLowerCase())
        : null;
    if (searchMatch) {
        chars.forEach(ch => { if (searchMatch(ch.name, ch.source)) spotlightSet.add(ch.name); });
    }
    const hasSpotlight = spotlightSet.size > 0;

    // Archetype in-range helper
    const archInRange = activeArchetype ? (nx, ny, nz) => {
        const r = activeArchetype.nRange;
        return nx >= r.x[0] && nx <= r.x[1] && ny >= r.y[0] && ny <= r.y[1] && nz >= r.z[0] && nz <= r.z[1];
    } : null;

    // Per-character rendering state
    const labelData = chars.map(ch => {
        const isSelected = selected === ch.name;
        const isHovered = hovered === ch.name;
        const isCompared = compareMode && compareList.includes(ch.name);
        const isNeighbor = hasSpotlight && spotlightSet.has(ch.name) && !isSelected;
        const isSearchHit = searchMatch ? searchMatch(ch.name, ch.source) : false;
        const isSpotlit = isSelected || isNeighbor || isCompared || isSearchHit;
        const isInArchetype = archInRange ? archInRange(ch.nx, ch.ny, ch.nz) : false;
        const archDim = activeArchetype && !isInArchetype && !isSelected && !isHovered ? 0.15 : 1.0;
        const contextDim = (hasSpotlight && !isSpotlit && !isHovered ? 0.12 : 1.0) * archDim;
        const depthNorm = zNorm(ch.z);
        const baseDepthAlpha = isSpotlit || isHovered
            ? lerp(1, 0.4, depthNorm)
            : lerp(1, 0.06, depthNorm * depthNorm);
        const depthAlpha = baseDepthAlpha * contextDim;
        const depthScale = lerp(1, 0.7, depthNorm);
        const highlight = isSelected || isHovered || isCompared;
        const rad = (highlight ? 8 : (isNeighbor || isSearchHit) ? 5.5 : isInArchetype ? 4.5 : 3.8) * ch.f * depthScale;
        const showLabel = isSelected || isHovered || (isNeighbor && hasSpotlight) || isCompared || isSearchHit || (isInArchetype && activeArchetype);
        ctx.font = `${highlight ? "bold " : ""}${lfs}px 'IBM Plex Mono',monospace`;
        const tw = ctx.measureText(ch.name).width;
        const lx = ch.sx + rad + 6;
        const ly = ch.sy;
        const pw = tw + 8, ph = lfs + 5;
        return { ch, isSelected, isHovered, isCompared, isNeighbor, isSpotlit, highlight, depthAlpha, depthNorm, rad, showLabel, tw, lx, ly, pw, ph };
    });

    // Nudge overlapping labels
    const visibleLabels = labelData.filter(d => d.showLabel);
    for (let pass2 = 0; pass2 < 5; pass2++) {
        for (let i = 0; i < visibleLabels.length; i++) {
            for (let j = i + 1; j < visibleLabels.length; j++) {
                const a = visibleLabels[i], b = visibleLabels[j];
                const overlapX = Math.min(a.lx + a.pw, b.lx + b.pw) - Math.max(a.lx, b.lx);
                const overlapY = Math.min(a.ly + a.ph / 2, b.ly + b.ph / 2) - Math.max(a.ly - a.ph / 2, b.ly - b.ph / 2);
                if (overlapX > 0 && overlapY > 0) {
                    const nudge = (overlapY / 2) + 2;
                    if (a.ly < b.ly) { a.ly -= nudge; b.ly += nudge; }
                    else { a.ly += nudge; b.ly -= nudge; }
                }
            }
        }
    }

    // Sort draw order
    const drawOrder = [...labelData].sort((a, b) => {
        const aPri = a.isSelected ? 3 : a.isHovered ? 2 : a.isSpotlit ? 1 : 0;
        const bPri = b.isSelected ? 3 : b.isHovered ? 2 : b.isSpotlit ? 1 : 0;
        if (aPri !== bPri) return aPri - bPri;
        return b.ch.z - a.ch.z;
    });

    // Draw characters
    drawOrder.forEach(({ ch, isSelected, isHovered, isCompared, isNeighbor, highlight, depthAlpha, rad, showLabel, lx, ly, pw, ph }) => {
        if (depthAlpha < 0.015) return;
        const [r, g, b] = _getRgb(ch.color);

        // Glow
        if (depthAlpha > 0.05) {
            const glowR = highlight ? rad * 4.5 : isNeighbor ? rad * 3 : rad * 1.8;
            const glowA = highlight ? 0.35 : isNeighbor ? 0.2 : 0.08;
            const glow = ctx.createRadialGradient(ch.sx, ch.sy, 0, ch.sx, ch.sy, glowR);
            glow.addColorStop(0, `rgba(${r},${g},${b},${glowA * depthAlpha})`);
            glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(ch.sx, ch.sy, glowR, 0, Math.PI * 2); ctx.fill();
        }

        // Pulsing selection ring
        if (isSelected) {
            const pulse = 0.4 + 0.3 * Math.sin(frame * 0.05);
            ctx.beginPath(); ctx.arc(ch.sx, ch.sy, rad + 5 + Math.sin(frame * 0.03) * 2, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r},${g},${b},${pulse * depthAlpha})`;
            ctx.lineWidth = 1.5; ctx.stroke();
        }

        // Neighbor connection line
        if (isNeighbor && selected) {
            const selCh = chars.find(c3 => c3.name === selected);
            if (selCh) {
                ctx.setLineDash([3, 4]);
                ctx.strokeStyle = `rgba(${r},${g},${b},${depthAlpha * 0.25})`;
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(selCh.sx, selCh.sy); ctx.lineTo(ch.sx, ch.sy); ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        // Main dot
        ctx.beginPath(); ctx.arc(ch.sx, ch.sy, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${depthAlpha})`; ctx.fill();

        // Specular highlight
        if (depthAlpha > 0.15) {
            ctx.beginPath(); ctx.arc(ch.sx - rad * 0.2, ch.sy - rad * 0.25, rad * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${depthAlpha * (highlight ? 0.35 : 0.15)})`; ctx.fill();
        }

        // Edge ring
        ctx.beginPath(); ctx.arc(ch.sx, ch.sy, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${depthAlpha * (highlight ? 0.5 : 0.08)})`;
        ctx.lineWidth = highlight ? 1.5 : 0.5; ctx.stroke();

        // Compare dashed ring
        if (isCompared && !isSelected) {
            ctx.beginPath(); ctx.arc(ch.sx, ch.sy, rad + 4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,200,100,${depthAlpha * 0.5})`;
            ctx.lineWidth = 1.5; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([]);
        }

        // Label
        if (showLabel) {
            ctx.font = `${highlight ? "bold " : ""}${lfs}px 'IBM Plex Mono',monospace`;
            const labelAlpha = isSelected ? depthAlpha : isHovered ? depthAlpha * 0.95 : depthAlpha * 0.75;
            ctx.fillStyle = `rgba(6,6,16,${labelAlpha * 0.85})`;
            drawRoundRect(ctx, lx - 4, ly - ph / 2, pw, ph, 4); ctx.fill();
            if (highlight) {
                ctx.strokeStyle = `rgba(${r},${g},${b},${labelAlpha * 0.3})`;
                ctx.lineWidth = 0.5;
                drawRoundRect(ctx, lx - 4, ly - ph / 2, pw, ph, 4); ctx.stroke();
            }
            ctx.textAlign = "left"; ctx.textBaseline = "middle";
            ctx.fillStyle = `rgba(${highlight ? "255,255,255" : `${r},${g},${b}`},${labelAlpha * 0.9})`;
            ctx.fillText(ch.name, lx, ly);

            // Distance for neighbor dots
            if (isNeighbor && selected) {
                const nInfo = (NEAREST_5[selected] || []).find(n => n.name === ch.name);
                if (nInfo) {
                    const distTxt = `Δ${nInfo.dist}`;
                    ctx.font = `${lfs - 2}px 'IBM Plex Mono',monospace`;
                    ctx.fillStyle = `rgba(${r},${g},${b},${labelAlpha * 0.65})`;
                    ctx.fillText(distTxt, lx + pw - 4, ly + ph / 2 + 8);
                }
            }
        }
    });

    // --- HINT ---
    if (hintOpacity > 0) {
        ctx.globalAlpha = hintOpacity;
        ctx.font = `${Math.max(9, Math.min(12, W * 0.018))}px 'IBM Plex Mono',monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        const hint = isMobile
            ? "drag to orbit · 2-finger drag to pan · pinch to zoom · tap to inspect"
            : "drag to orbit · shift+drag to pan · scroll to zoom · click to inspect";
        ctx.fillText(hint, cx, H - 20);
        ctx.globalAlpha = 1;
    }

    return chars; // Return projected chars for hit-testing
}
