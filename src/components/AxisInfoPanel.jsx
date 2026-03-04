import React, { memo } from "react";
import { AXIS_INFO } from "../data/axisInfo.js";

export default memo(function AxisInfoPanel({ axis, onClose, isMobile }) {
    const info = AXIS_INFO[axis];
    if (!info) return null;

    return (
        <div onClick={e => e.stopPropagation()} style={{
            position: "absolute", top: isMobile ? 50 : 60, left: isMobile ? 8 : "50%",
            transform: isMobile ? "none" : "translateX(-50%)",
            width: isMobile ? "calc(100% - 16px)" : 520, maxWidth: "95vw",
            background: "rgba(10,10,22,0.97)", border: "1px solid rgba(100,140,255,0.2)",
            borderRadius: 10, padding: 24, zIndex: 50, boxShadow: "0 12px 50px rgba(0,0,0,0.7)",
            backdropFilter: "blur(10px)", maxHeight: "80dvh", overflowY: "auto",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#9090a0", fontWeight: 700, textTransform: "uppercase" }}>{info.pillar}</div>
                <button aria-label="Close axis info" onClick={onClose} style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9090a0", fontSize: 16, cursor: "pointer", padding: "4px 10px", borderRadius: 4,
                    fontFamily: "inherit", lineHeight: 1.2,
                }}>✕</button>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: info.color, letterSpacing: 1, marginBottom: 12 }}>{info.name}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#9494a4", marginBottom: 16 }}>
                <span>← {info.neg} (−5)</span><span>{info.pos} (+5) →</span>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "#aaa", marginBottom: 18, padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 6 }}>{info.def}</div>
            {info.tiers.map((t, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: info.color, marginBottom: 5, letterSpacing: 0.5 }}>{t.label}</div>
                    <div style={{
                        fontSize: 13, lineHeight: 1.75, color: "#bbb", padding: "10px 14px",
                        background: "rgba(100,140,255,0.03)", borderRadius: 6,
                        borderLeft: `2px solid ${info.color}${i === 1 ? "44" : "88"}`,
                    }}>{t.text}</div>
                </div>
            ))}
            <div style={{
                fontSize: 13, lineHeight: 1.7, color: "#7799cc", fontStyle: "italic",
                padding: "12px 14px", background: "rgba(100,140,255,0.03)", borderRadius: 6,
                borderLeft: "2px solid rgba(100,140,255,0.3)", marginTop: 6,
            }}>{info.key}</div>
        </div>
    );
})
