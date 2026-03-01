import CHARACTERS from "./characters.js";
import { CATEGORY_PALETTES } from "./axisInfo.js";
import { hsl2hex, hex2rgb } from "../utils/color.js";
import { ARCHETYPES, getCharactersInArchetype } from "./archetypes.js";

// ---- Assign colors from category palette with per-character variation ----
const catCounters = {};
CHARACTERS.forEach(ch => {
    const pal = CATEGORY_PALETTES[ch.category] || CATEGORY_PALETTES.Fiction;
    const idx = (catCounters[ch.category] = (catCounters[ch.category] || 0) + 1) - 1;
    const catSize = CHARACTERS.filter(c => c.category === ch.category).length;
    const hueSpread = catSize > 1 ? (idx / (catSize - 1) - 0.5) * 36 : 0;
    const lightSpread = catSize > 1 ? (idx / (catSize - 1) - 0.5) * 24 : 0;
    const satSpread = catSize > 1 ? (idx / (catSize - 1) - 0.5) * 20 : 0;
    const h = (pal.h + hueSpread + 360) % 360;
    const s = Math.max(20, Math.min(90, pal.s + satSpread));
    const l = Math.max(40, Math.min(80, pal.l + lightSpread));
    ch.color = hsl2hex(h, s, l);
});

// ---- Precompute hex2rgb cache (avoids ~200+ string parses per frame) ----
export const RGB_CACHE = {};
CHARACTERS.forEach(ch => {
    if (ch.color && !RGB_CACHE[ch.color]) {
        RGB_CACHE[ch.color] = hex2rgb(ch.color);
    }
});

// ---- Precompute archetype character counts (avoids 27 filter passes per render) ----
export const ARCHETYPE_COUNTS = {};
ARCHETYPES.forEach(arch => {
    ARCHETYPE_COUNTS[arch.code] = getCharactersInArchetype(arch, CHARACTERS).length;
});

// ---- Precompute nearest 5 neighbors ----
export const NEAREST_5 = {};
CHARACTERS.forEach(a => {
    const dists = CHARACTERS
        .filter(b => b.name !== a.name)
        .map(b => ({
            name: b.name,
            dist: Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2),
        }))
        .sort((x, y) => x.dist - y.dist);
    NEAREST_5[a.name] = dists.slice(0, 5).map(d => ({ name: d.name, dist: d.dist.toFixed(1) }));
});

// ---- Derived constants ----
export const CATEGORIES = ["All", ...new Set(CHARACTERS.map(c => c.category))];

// Star color palettes: cool blue, warm white, pale gold, soft rose
const _STAR_TINTS = [
    [180, 200, 255],  // cool blue (common)
    [180, 200, 255],
    [220, 225, 255],  // bright white-blue
    [255, 245, 230],  // warm white
    [255, 230, 180],  // pale gold
    [255, 200, 210],  // soft rose (rare)
];
export const STARS = Array.from({ length: 200 }, () => {
    const bright = Math.random() < 0.08;  // ~8% are "bright" stars
    return {
        x: Math.random(), y: Math.random(),
        r: bright ? Math.random() * 1.4 + 1.2 : Math.random() * 1.3 + 0.3,
        a: bright ? Math.random() * 0.3 + 0.55 : Math.random() * 0.45 + 0.08,
        speed: Math.random() * 0.0004 + 0.0001,
        tint: _STAR_TINTS[Math.floor(Math.random() * _STAR_TINTS.length)],
        glow: bright,
    };
});

export { default as CHARACTERS } from "./characters.js";
export { AXIS_INFO, VIEW_PRESETS, CATEGORY_PALETTES } from "./axisInfo.js";
export { ARCHETYPES, PRAXIS_TIERS, ETHOS_TIERS, NEXUS_TIERS, getArchetypeForChar, getCharactersInArchetype } from "./archetypes.js";
