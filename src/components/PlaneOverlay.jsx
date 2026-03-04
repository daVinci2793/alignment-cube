import React, { memo } from "react";
import { AXIS_INFO } from "../data/axisInfo.js";

export default memo(function PlaneOverlay({ plane, isMobile }) {
    if (!plane) return null;
    const a1 = AXIS_INFO[plane.axes[0]], a2 = AXIS_INFO[plane.axes[1]];
    return (
        <div style={{
            position: "absolute", top: isMobile ? 6 : 10, left: "50%", transform: "translateX(-50%)",
            background: "rgba(10,10,22,0.88)", border: "1px solid rgba(100,140,255,0.12)",
            borderRadius: 8, padding: "8px 18px", zIndex: 5, textAlign: "center", maxWidth: "90vw",
            backdropFilter: "blur(8px)",
        }}>
            <div style={{ fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#ccc", letterSpacing: 1 }}>{plane.title}</div>
            <div style={{ fontSize: 11, color: "#9090a0", marginTop: 3 }}>
                <span style={{ color: a1.color }}>{a1.neg}↔{a1.pos}</span>{" vs "}
                <span style={{ color: a2.color }}>{a2.neg}↔{a2.pos}</span>
                <span style={{ color: "#7e7e8e" }}> · {plane.sub}</span>
            </div>
        </div>
    );
})
