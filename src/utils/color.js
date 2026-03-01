// HSL to hex conversion
export function hsl2hex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return "#" + [f(0), f(8), f(4)]
        .map(v => Math.round(v * 255).toString(16).padStart(2, "0"))
        .join("");
}

// Hex color to [r, g, b] array (0-255)
export function hex2rgb(h) {
    return [
        parseInt(h.slice(1, 3), 16),
        parseInt(h.slice(3, 5), 16),
        parseInt(h.slice(5, 7), 16),
    ];
}
