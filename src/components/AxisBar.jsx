import React, { memo } from "react";

/**
 * Three-region PEN axis bar.
 * Regions: neg (-5 to -1.67), mid (-1.67 to +1.67), pos (+1.67 to +5)
 * Shows region labels, highlights the active one, and positions the dot.
 */
export default memo(function AxisBar({ label, color, value, neg, mid, pos }) {
    // Which region the value falls into
    const region = value <= -1.67 ? "neg" : value >= 1.67 ? "pos" : "mid";

    // Boundaries as percentages of the full -5…+5 range (width 10)
    const b1Pct = ((-1.67 + 5) / 10) * 100;  // ~33.3%
    const b2Pct = ((1.67 + 5) / 10) * 100;    // ~66.7%
    const dotPct = ((value + 5) / 10) * 100;

    const regionDefs = [
        { key: "neg", label: neg, left: 0, width: b1Pct, active: region === "neg" },
        { key: "mid", label: mid, left: b1Pct, width: b2Pct - b1Pct, active: region === "mid" },
        { key: "pos", label: pos, left: b2Pct, width: 100 - b2Pct, active: region === "pos" },
    ];

    return (
        <div style={{ marginBottom: 14 }}>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                <span style={{ color, fontWeight: 500 }}>{label}</span>
                <span style={{ color: "#fff", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                    {value > 0 ? "+" : ""}{value}
                </span>
            </div>

            {/* Three-region bar */}
            <div style={{ position: "relative", height: 28 }}>
                {/* Region segments */}
                <div style={{ display: "flex", height: 20, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {regionDefs.map(r => (
                        <div key={r.key} style={{
                            width: `${r.width}%`,
                            background: r.active ? `${color}18` : "rgba(255,255,255,0.02)",
                            borderRight: r.key !== "pos" ? "1px solid rgba(255,255,255,0.08)" : "none",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background 0.2s",
                            position: "relative",
                        }}>
                            <span style={{
                                fontSize: 8, fontWeight: r.active ? 700 : 500,
                                letterSpacing: 0.5, textTransform: "uppercase",
                                color: r.active ? color : "rgba(255,255,255,0.45)",
                                transition: "color 0.2s",
                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                padding: "0 2px",
                            }}>
                                {r.label}
                            </span>
                            {/* Active region glow overlay */}
                            {r.active && (
                                <div style={{
                                    position: "absolute", inset: 0,
                                    background: `linear-gradient(180deg, ${color}10 0%, ${color}08 100%)`,
                                    borderRadius: 3,
                                    boxShadow: `inset 0 0 12px ${color}15`,
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Dot indicator — positioned over the bar */}
                <div style={{
                    position: "absolute", top: 5, left: `${dotPct}%`,
                    width: 12, height: 12, borderRadius: "50%",
                    background: color, transform: "translateX(-50%)",
                    boxShadow: `0 0 10px ${color}55, 0 0 3px ${color}aa`,
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    zIndex: 2,
                }} />

                {/* Boundary tick marks */}
                <div style={{
                    position: "absolute", top: 0, left: `${b1Pct}%`,
                    width: 1, height: 20,
                    background: "rgba(255,255,255,0.12)",
                    zIndex: 1,
                }} />
                <div style={{
                    position: "absolute", top: 0, left: `${b2Pct}%`,
                    width: 1, height: 20,
                    background: "rgba(255,255,255,0.12)",
                    zIndex: 1,
                }} />
            </div>
        </div>
    );
})
