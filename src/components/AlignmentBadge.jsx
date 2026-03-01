import React, { memo } from "react";
import { classifyAxis } from "../utils/math.js";

export default memo(function AlignmentBadge({ x, y, z }) {
    const cx = classifyAxis(x, "Structured", "Pragmatic", "Unbound");
    const cy = classifyAxis(y, "Benevolent", "Transactional", "Malignant");
    const cz = classifyAxis(z, "Parochial", "Factional", "Universal");

    const seg = (cls, color) => (
        <span style={{
            padding: "4px 8px", fontSize: 10, fontWeight: 700, letterSpacing: 0.6,
            background: `${color}15`, color,
            borderRadius: 2, border: `1px solid ${color}33`,
        }}>{cls.label}</span>
    );

    return (
        <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
            {seg(cx, "#ff6b6b")}{seg(cy, "#ffd93d")}{seg(cz, "#6bcb77")}
        </div>
    );
})
