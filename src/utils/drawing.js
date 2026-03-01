// Draw a rounded rectangle path (polyfill for older browsers)
export function drawRoundRect(ctx, x, y, w, h, r) {
    if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        return;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// Draw text with a dark outline for readability on the canvas
export function drawTextShadowed(ctx, text, x, y, fillStyle) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1]]) {
        ctx.fillText(text, x + dx, y + dy);
    }
    ctx.fillStyle = fillStyle;
    ctx.fillText(text, x, y);
}
