export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

// 3D perspective projection
export function project(px, py, pz, rX, rY, scale, cx, cy) {
    const cY = Math.cos(rY), sY = Math.sin(rY);
    const x1 = px * cY - pz * sY, z1 = px * sY + pz * cY;
    const cX = Math.cos(rX), sX = Math.sin(rX);
    const y1 = py * cX - z1 * sX, z2 = py * sX + z1 * cX;
    const f = 600 / (600 + z2);
    return { sx: cx + x1 * scale * f, sy: cy + y1 * scale * f, z: z2, f };
}

// Classify a value into the neg/mid/pos tier
export function classifyAxis(v, neg, mid, pos) {
    if (v < -1.67) return { label: neg.toUpperCase(), type: "neg" };
    if (v > 1.67) return { label: pos.toUpperCase(), type: "pos" };
    return { label: mid.toUpperCase(), type: "mid" };
}
