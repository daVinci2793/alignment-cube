import React, { memo } from "react";
import { CHARACTERS, NEAREST_5 } from "../data/index.js";
import { getArchetypeForChar } from "../data/index.js";
import AxisBar from "./AxisBar.jsx";
import AlignmentBadge from "./AlignmentBadge.jsx";

/**
 * Inline PEN detail view for mobile drawer.
 * Shows the same content as CharacterDetailCard but without floating/drag.
 * Supports swiping between multiple selected characters.
 */
export default memo(function MobileDetailView({ selectedList, hovered, onCharClick, onHover }) {
    if (!selectedList || selectedList.length === 0) {
        return (
            <div style={{ padding: 32, textAlign: "center", color: "#8b8b9b", fontSize: 12, lineHeight: 1.8 }}>
                Tap a character in the cube to see their alignment breakdown.
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {selectedList.map(name => {
                const sel = CHARACTERS.find(c => c.name === name);
                if (!sel) return null;
                const nearest = NEAREST_5[sel.name] || [];

                return (
                    <div key={name} style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(100,140,255,0.1)",
                        borderRadius: 10, overflow: "hidden",
                    }}>
                        {/* Header */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "12px 16px 10px",
                            borderBottom: "1px solid rgba(100,140,255,0.08)",
                        }}>
                            <div style={{
                                width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                                background: sel.color, boxShadow: `0 0 12px ${sel.color}55`,
                            }} />
                            <div style={{
                                fontSize: 16, fontWeight: 700, color: sel.color,
                                flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                                {sel.name}
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: "12px 16px 16px" }}>
                            {/* Source + category */}
                            <div style={{ fontSize: 11, color: "#9090a0", marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
                                <span>{sel.source}</span>
                                <span style={{ color: "#7e7e8e" }}>·</span>
                                <span style={{ color: "#8b8b9b" }}>{sel.category}</span>
                            </div>

                            {/* Description */}
                            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#aaa", marginBottom: 18 }}>{sel.desc}</div>

                            {/* Axis bars */}
                            <div style={{ fontSize: 12 }}>
                                <AxisBar label="Praxis: Method" color="#ff6b6b" value={sel.x} neg="Structured" mid="Pragmatic" pos="Unbound" />
                                <AxisBar label="Ethos: Impact" color="#ffd93d" value={sel.y} neg="Benevolent" mid="Transactional" pos="Malignant" />
                                <AxisBar label="Nexus: Reach" color="#6bcb77" value={sel.z} neg="Parochial" mid="Factional" pos="Universal" />
                            </div>

                            {/* Alignment badge */}
                            <AlignmentBadge x={sel.x} y={sel.y} z={sel.z} />

                            {/* Archetype label */}
                            {(() => {
                                const arch = getArchetypeForChar(sel);
                                if (!arch) return null;
                                return (
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                        marginTop: 8, padding: "6px 12px",
                                        background: "rgba(136,204,255,0.05)",
                                        border: "1px solid rgba(136,204,255,0.12)",
                                        borderRadius: 6,
                                    }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#88ccff", letterSpacing: 1 }}>{arch.code}</span>
                                        <span style={{ fontSize: 11, color: "#88aabb" }}>{arch.name}</span>
                                    </div>
                                );
                            })()}

                            {/* Nearest neighbors */}
                            {nearest.length > 0 && (
                                <div style={{ marginTop: 16 }}>
                                    <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#9090a0", marginBottom: 8, fontWeight: 700 }}>
                                        Nearest neighbors
                                    </div>
                                    {nearest.map((n, i) => {
                                        const nCh = CHARACTERS.find(c => c.name === n.name);
                                        if (!nCh) return null;
                                        return (
                                            <div key={n.name}
                                                onClick={(e) => { e.stopPropagation(); onCharClick(n.name, e); }}
                                                onMouseEnter={() => onHover(n.name)}
                                                onMouseLeave={() => onHover(null)}
                                                style={{
                                                    padding: "6px 10px", cursor: "pointer", borderRadius: 4,
                                                    display: "flex", alignItems: "center", gap: 8,
                                                    background: hovered === n.name ? "rgba(255,255,255,0.04)" : "transparent",
                                                    transition: "background 0.12s",
                                                }}
                                            >
                                                <span style={{ fontSize: 10, color: "#8b8b9b", width: 14, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
                                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: nCh.color, flexShrink: 0 }} />
                                                <span style={{ fontSize: 12, color: "#aaa", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.name}</span>
                                                <span style={{ fontSize: 10, color: "#8b8b9b", marginLeft: "auto", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>Δ{n.dist}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
})
