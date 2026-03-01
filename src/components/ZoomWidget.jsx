import React, { memo } from "react";
import { clamp } from "../utils/math.js";

export default memo(function ZoomWidget({ zoom, setZoom, isMobile }) {
    const steps = [0.4, 0.6, 0.8, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0];
    const trackH = isMobile ? 80 : 100;
    const pct = ((zoom - 0.4) / 2.6) * 100;

    const btnS = {
        width: 28, height: 28, background: "rgba(12,12,25,0.9)", border: "1px solid rgba(100,140,255,0.15)",
        color: "#888", fontSize: 15, cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <button onClick={() => setZoom(prev => clamp(prev + 0.15, 0.4, 3.0))} style={{ ...btnS, borderRadius: "4px 4px 0 0", borderBottom: "none" }}>+</button>
            <div
                style={{
                    width: 28, height: trackH, background: "rgba(12,12,25,0.9)", border: "1px solid rgba(100,140,255,0.15)",
                    borderTop: "none", borderBottom: "none", position: "relative", cursor: "pointer",
                }}
                onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pctClick = 1 - (e.clientY - rect.top) / rect.height;
                    setZoom(clamp(0.4 + pctClick * 2.6, 0.4, 3.0));
                }}
            >
                <div style={{ position: "absolute", left: "50%", top: 4, bottom: 4, width: 2, transform: "translateX(-50%)", background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />
                {steps.map(s => (
                    <div key={s} style={{
                        position: "absolute", left: 5, right: 5, top: `${(1 - (s - 0.4) / 2.6) * 100}%`,
                        height: 1, background: s === 1 ? "rgba(100,140,255,0.3)" : "rgba(255,255,255,0.04)",
                    }} />
                ))}
                <div style={{
                    position: "absolute", left: 3, right: 3, top: `${(1 - pct / 100) * 100}%`,
                    transform: "translateY(-50%)",
                    height: 6, borderRadius: 3,
                    background: "rgba(100,140,255,0.6)", boxShadow: "0 0 6px rgba(100,140,255,0.3)",
                }} />
            </div>
            <div style={{
                width: 28, padding: "3px 0", textAlign: "center", background: "rgba(12,12,25,0.9)",
                border: "1px solid rgba(100,140,255,0.15)", borderTop: "none", borderBottom: "none",
                fontSize: 7, color: "#8b8b9b", fontFamily: "inherit", letterSpacing: 0.3, fontWeight: 600,
            }}>{Math.round(zoom * 100)}%</div>
            <button onClick={() => setZoom(prev => clamp(prev - 0.15, 0.4, 3.0))} style={{ ...btnS, borderRadius: "0 0 4px 4px", borderTop: "none" }}>−</button>
        </div>
    );
})
