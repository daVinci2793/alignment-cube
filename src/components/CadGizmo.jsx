import React, { useRef, useEffect, useCallback, memo } from "react";
import { hex2rgb } from "../utils/color.js";
import { VIEW_PRESETS } from "../data/axisInfo.js";

export default memo(function CadGizmo({ rotX, rotY, activeView, onSelectView, isMobile }) {
    const size = isMobile ? 64 : 105;
    const cRef = useRef(null);

    const draw = useCallback(() => {
        const c = cRef.current;
        if (!c) return;
        const ctx = c.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        c.width = size * dpr;
        c.height = size * dpr;
        c.style.width = size + "px";
        c.style.height = size + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, size, size);

        const cx = size / 2, cy = size / 2, len = size * 0.28;
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.44, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(12,12,25,0.9)";
        ctx.fill();
        ctx.strokeStyle = "rgba(100,140,255,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const axes = [
            { dir: [1, 0, 0], color: "#ff6b6b", neg: "S", pos: "U" },
            { dir: [0, 1, 0], color: "#ffd93d", neg: "B", pos: "M" },
            { dir: [0, 0, 1], color: "#6bcb77", neg: "P", pos: "U" },
        ];

        const projected = axes.map(a => {
            const [px, py, pz] = a.dir;
            const cY2 = Math.cos(rotY), sY2 = Math.sin(rotY);
            const x1 = px * cY2 - pz * sY2, z1 = px * sY2 + pz * cY2;
            const cX2 = Math.cos(rotX), sX2 = Math.sin(rotX);
            const y1 = py * cX2 - z1 * sX2, z2 = py * sX2 + z1 * cX2;
            return { ...a, ex: cx + x1 * len, ey: cy + y1 * len, z: z2, enx: cx - x1 * len, eny: cy - y1 * len };
        });

        projected.sort((a, b) => b.z - a.z);

        projected.forEach(a => {
            const alpha = a.z < 0 ? 0.2 : 0.9;
            const [r, g, b] = hex2rgb(a.color);
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(a.enx, a.eny);
            ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`; ctx.lineWidth = 1; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(a.ex, a.ey);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`; ctx.lineWidth = 2.5; ctx.stroke();
            ctx.beginPath(); ctx.arc(a.ex, a.ey, 9, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.85})`; ctx.fill();
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.3})`; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.font = "bold 7px 'IBM Plex Mono',monospace";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillStyle = `rgba(0,0,0,${alpha * 0.9})`; ctx.fillText(a.pos, a.ex, a.ey);
            ctx.font = "6px 'IBM Plex Mono',monospace";
            ctx.fillStyle = `rgba(${r},${g},${b},0.55)`; ctx.fillText(a.neg, a.enx, a.eny);
        });

        ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.fill();
    }, [rotX, rotY, size]);

    useEffect(() => { draw(); }, [draw]);

    return (
        <div>
            <canvas ref={cRef} style={{ display: "block" }} />
            <div style={{ display: "flex", gap: 3, marginTop: 5, justifyContent: "center" }}>
                {VIEW_PRESETS.map(v => (
                    <button key={v.label} onClick={() => onSelectView(v)} title={`${v.desc} [${v.key}]`} style={{
                        background: activeView === v.label ? "rgba(100,140,255,0.3)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${activeView === v.label ? "rgba(100,140,255,0.5)" : "rgba(255,255,255,0.06)"}`,
                        color: activeView === v.label ? "#ddd" : "#8b8b9b",
                        padding: "3px 7px", fontSize: 8, fontWeight: 600, letterSpacing: 1,
                        cursor: "pointer", borderRadius: 3, fontFamily: "inherit", transition: "all 0.15s",
                    }}>{v.label}</button>
                ))}
            </div>
        </div>
    );
});
