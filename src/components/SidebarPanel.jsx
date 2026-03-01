import React, { useMemo, memo } from "react";
import { CHARACTERS, AXIS_INFO, NEAREST_5, CATEGORIES, CATEGORY_PALETTES } from "../data/index.js";

export default memo(function SidebarPanel({
    selectedList, hovered, onCharClick, setHovered,
    compareMode, setCompareMode, compareList, setCompareList,
    infoAxis, setInfoAxis,
    catFilter, setCatFilter,
    searchQuery, setSearchQuery,
    isMobile,
}) {
    const primarySel = selectedList.length > 0 ? selectedList[selectedList.length - 1] : null;
    const sel = CHARACTERS.find(c => c.name === (primarySel || hovered));

    const compareChars = compareList.map(n => CHARACTERS.find(c => c.name === n)).filter(Boolean);
    const compareDist = compareChars.length === 2
        ? Math.sqrt(
            (compareChars[0].x - compareChars[1].x) ** 2 +
            (compareChars[0].y - compareChars[1].y) ** 2 +
            (compareChars[0].z - compareChars[1].z) ** 2
        ).toFixed(1)
        : null;

    // Memoize filtered list so it isn't recomputed on every render
    const filteredChars = useMemo(() => {
        const q = (searchQuery || "").toLowerCase();
        return CHARACTERS.filter(ch =>
            (catFilter === "All" || ch.category === catFilter) &&
            (!q || ch.name.toLowerCase().includes(q) || ch.source.toLowerCase().includes(q))
        );
    }, [catFilter, searchQuery]);

    const handleCharClick = (name, e) => {
        if (compareMode) {
            setCompareList(prev =>
                prev.includes(name) ? prev.filter(n => n !== name) :
                    prev.length >= 2 ? [prev[1], name] : [...prev, name]
            );
        } else {
            onCharClick(name, e);
        }
    };

    return (
        <div style={{ fontSize: 12, display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Top controls — fixed */}
            <div style={{ flexShrink: 0 }}>
                {/* Three Pillars buttons */}
                <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#8b8b9b", marginBottom: 8, fontWeight: 700 }}>The Three Pillars</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
                    {["x", "y", "z"].map(axis => (
                        <button key={axis} onClick={() => setInfoAxis(prev => prev === axis ? null : axis)} style={{
                            width: "100%",
                            background: infoAxis === axis ? `${AXIS_INFO[axis].color}15` : "rgba(255,255,255,0.015)",
                            border: `1px solid ${infoAxis === axis ? AXIS_INFO[axis].color + "55" : "rgba(255,255,255,0.05)"}`,
                            color: AXIS_INFO[axis].color, padding: "8px 10px", fontSize: 12,
                            cursor: "pointer", borderRadius: 5, fontFamily: "inherit",
                            fontWeight: 600, letterSpacing: 0.5, textAlign: "center", transition: "all 0.15s",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        }}>
                            <span style={{ opacity: 0.85 }}>{AXIS_INFO[axis].neg}</span>
                            <span style={{ opacity: 0.65 }}>↔</span>
                            <span>{AXIS_INFO[axis].pos}</span>
                        </button>
                    ))}
                </div>

                {/* Compare mode toggle */}
                <button onClick={() => { setCompareMode(pr => !pr); setCompareList([]); }} style={{
                    width: "100%", padding: "10px 12px", fontSize: 12, fontWeight: 600, marginBottom: 16,
                    background: compareMode ? "rgba(255,180,60,0.12)" : "rgba(255,255,255,0.015)",
                    border: `1px solid ${compareMode ? "rgba(255,180,60,0.35)" : "rgba(255,255,255,0.05)"}`,
                    color: compareMode ? "#ffb43c" : "#8b8b9b",
                    cursor: "pointer", borderRadius: 5, fontFamily: "inherit", letterSpacing: 1, transition: "all 0.15s",
                }}>{compareMode ? "COMPARE MODE ON — pick 2" : "COMPARE MODE"}</button>

                {/* Compare results */}
                {compareMode && compareChars.length === 2 && (
                    <div style={{
                        marginBottom: 16, padding: 14, background: "rgba(255,180,60,0.04)",
                        borderRadius: 8, border: "1px solid rgba(255,180,60,0.12)",
                    }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#ffb43c", marginBottom: 10, textAlign: "center" }}>
                            Distance: {compareDist}
                        </div>
                        {[["x", "Praxis"], ["y", "Ethos"], ["z", "Nexus"]].map(([axis, label]) => {
                            const a = AXIS_INFO[axis];
                            const v1 = compareChars[0][axis], v2 = compareChars[1][axis];
                            return (
                                <div key={axis} style={{ fontSize: 12, display: "flex", justifyContent: "space-between", marginBottom: 5, color: "#888" }}>
                                    <span style={{ color: a.color }}>{label}</span>
                                    <span>
                                        <span style={{ color: compareChars[0].color }}>{v1 > 0 ? "+" : ""}{v1}</span>
                                        {" vs "}
                                        <span style={{ color: compareChars[1].color }}>{v2 > 0 ? "+" : ""}{v2}</span>
                                        <span style={{ color: "#8b8b9b" }}> (Δ{Math.abs(v1 - v2).toFixed(1)})</span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Character list header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#9090a0", fontWeight: 700 }}>Characters</div>
                    <span style={{ fontSize: 10, color: "#8b8b9b", fontVariantNumeric: "tabular-nums" }}>{filteredChars.length}</span>
                </div>

                {/* Search */}
                <input
                    type="text" placeholder="Search characters…" value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%", padding: "8px 12px", fontSize: 12, marginBottom: 8,
                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                        color: "#ccc", borderRadius: 5, fontFamily: "inherit", outline: "none",
                        boxSizing: "border-box",
                    }}
                    onFocus={e => { e.target.style.borderColor = "rgba(100,140,255,0.3)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; }}
                />

                {/* Category filter pills */}
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 10 }}>
                    {CATEGORIES.map(cat => {
                        const isActive = catFilter === cat;
                        const pal = cat !== "All" ? CATEGORY_PALETTES[cat] : null;
                        const count = cat === "All" ? CHARACTERS.length : CHARACTERS.filter(c => c.category === cat).length;
                        const pillColor = pal ? `hsl(${pal.h},${pal.s}%,${pal.l}%)` : "#888";
                        return (
                            <button key={cat} onClick={() => setCatFilter(cat)} style={{
                                padding: "4px 8px", fontSize: 10, fontWeight: 600, letterSpacing: 0.4,
                                background: isActive ? (pal ? `hsla(${pal.h},${pal.s}%,${pal.l}%,0.15)` : "rgba(100,140,255,0.15)") : "rgba(255,255,255,0.02)",
                                border: `1px solid ${isActive ? (pal ? `hsla(${pal.h},${pal.s}%,${pal.l}%,0.4)` : "rgba(100,140,255,0.4)") : "rgba(255,255,255,0.04)"}`,
                                color: isActive ? pillColor : "#8b8b9b",
                                cursor: "pointer", borderRadius: 10, fontFamily: "inherit", transition: "all 0.12s",
                                whiteSpace: "nowrap",
                            }}>{cat === "All" ? `All (${count})` : `${cat} (${count})`}</button>
                        );
                    })}
                </div>
            </div>{/* end Top controls */}

            {/* Character list — fills remaining space, scrollable */}
            <div style={{ flex: 1, overflowY: "auto", marginRight: -4, paddingRight: 4, minHeight: 0 }}>
                {filteredChars.map(ch => {
                    const isActive = selectedList.includes(ch.name) || hovered === ch.name;
                    const isComp = compareMode && compareList.includes(ch.name);
                    return (
                        <div key={ch.name}
                            onClick={(e) => handleCharClick(ch.name, e)}
                            onMouseEnter={() => !isMobile && setHovered(ch.name)}
                            onMouseLeave={() => !isMobile && setHovered(null)}
                            style={{
                                padding: "7px 10px", marginBottom: 2, cursor: "pointer", borderRadius: 4,
                                background: isActive || isComp ? "rgba(100,140,255,0.06)" : "transparent",
                                borderLeft: `3px solid ${isActive || isComp ? ch.color : "transparent"}`,
                                transition: "all 0.12s",
                            }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{
                                    width: 7, height: 7, borderRadius: "50%", background: ch.color, flexShrink: 0,
                                    boxShadow: isActive || isComp ? `0 0 8px ${ch.color}66` : "none",
                                    border: isComp ? "2px solid rgba(255,200,100,0.6)" : "none",
                                }} />
                                <span style={{
                                    fontWeight: isActive ? 700 : 400, fontSize: 12,
                                    color: isActive || isComp ? "#ddd" : "#999",
                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                }}>{ch.name}</span>
                                <span style={{ color: "#8b8b9b", fontSize: 10, marginLeft: "auto", fontWeight: 500, flexShrink: 0 }}>{ch.source}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Placeholder when nothing selected */}
            {!primarySel && !compareMode && (
                <div style={{ padding: 16, textAlign: "center", color: "#8b8b9b", fontSize: 12, lineHeight: 1.7, flexShrink: 0 }}>
                    {isMobile ? "Tap" : "Click"} a character to see their PEN breakdown.{!isMobile && " Ctrl+click to open multiple."}
                </div>
            )}

            {/* Selected indicator chips */}
            {selectedList.length > 0 && !compareMode && (
                <div style={{ flexShrink: 0, padding: "8px 0", borderTop: "1px solid rgba(100,140,255,0.06)" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {selectedList.map(name => {
                            const ch = CHARACTERS.find(c => c.name === name);
                            if (!ch) return null;
                            return (
                                <span key={name} style={{
                                    display: "inline-flex", alignItems: "center", gap: 4,
                                    padding: "3px 8px", borderRadius: 12, fontSize: 10,
                                    background: `${ch.color}12`, border: `1px solid ${ch.color}33`,
                                    color: ch.color, fontWeight: 600,
                                }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: ch.color }} />
                                    {ch.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Keyboard shortcuts reference — desktop only, sticky footer */}
            {!isMobile && (
                <div style={{
                    flexShrink: 0, marginTop: "auto",
                    padding: "10px 12px", background: "rgba(255,255,255,0.015)",
                    borderRadius: 6, border: "1px solid rgba(255,255,255,0.03)",
                    borderTop: "1px solid rgba(100,140,255,0.06)",
                }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#8b8b9b", marginBottom: 8, fontWeight: 700 }}>Controls</div>
                    {[["LMB Drag", "Orbit"], ["Shift+Drag", "Pan"], ["Scroll / +−", "Zoom"], ["Home", "Reset pan"],
                    ["← → ↑ ↓", "Rotate"], ["1 2 3 4", "View presets"],
                    ["G", "Toggle grid"], ["P", "Projection lines"], ["S", "Toggle spin"], ["Esc", "Deselect"],
                    ["Ctrl+Click", "Multi-select"],
                    ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 10 }}>
                            <span style={{ color: "#9090a0", fontFamily: "inherit" }}>{k}</span>
                            <span style={{ color: "#8b8b9b" }}>{v}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
})
