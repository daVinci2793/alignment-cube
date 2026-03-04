import React, { useState, useMemo, useRef, useCallback, useEffect, memo } from "react";
import {
    CHARACTERS, ARCHETYPES, PRAXIS_TIERS, ETHOS_TIERS, NEXUS_TIERS,
    getCharactersInArchetype, ARCHETYPE_COUNTS,
} from "../data/index.js";

// ---- Axis colours (match axisInfo.js) ----
const AXIS_COLOR = { x: "#ff6b6b", y: "#ffd93d", z: "#6bcb77" };
const HIGHLIGHT_COLOR = "#88ccff";

// ---- Layout: 3 Nexus layers, each a 3×3 grid (Praxis cols × Ethos rows) ----
const NEXUS_LAYERS = NEXUS_TIERS.map(nt => ({
    ...nt,
    rows: ETHOS_TIERS.map(et => ({
        ...et,
        cells: PRAXIS_TIERS.map(pt => {
            return ARCHETYPES.find(a =>
                a.praxis === pt.label && a.ethos === et.label && a.nexus === nt.label
            );
        }),
    })),
}));

export default memo(function ArchetypePanel({ activeArchetype, setActiveArchetype, onClose, isMobile, containerRef }) {
    const [expandedCode, setExpandedCode] = useState(null);

    // ---- Drag state (desktop only) ----
    const [pos, setPos] = useState(null);         // null = use default CSS centering
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const onMoveRef = useRef(null);
    const onUpRef = useRef(null);

    // Helper: get the containing element's viewport rect
    const getContainerRect = () => {
        const el = containerRef?.current;
        return el ? el.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    };

    onMoveRef.current = (e) => {
        e.preventDefault();
        const cRect = getContainerRect();
        let nx = e.clientX - offset.current.x - cRect.left;
        let ny = e.clientY - offset.current.y - cRect.top;
        // Keep panel inside container
        nx = Math.max(0, Math.min(nx, cRect.width - 200));
        ny = Math.max(0, Math.min(ny, cRect.height - 100));
        setPos({ x: nx, y: ny });
    };

    onUpRef.current = () => {
        dragging.current = false;
        document.body.style.cursor = "";
        window.removeEventListener("pointermove", handleDragMove);
        window.removeEventListener("pointerup", handleDragUp);
    };

    const handleDragMove = useCallback((e) => { onMoveRef.current?.(e); }, []);
    const handleDragUp = useCallback(() => { onUpRef.current?.(); }, []);

    const onDragStart = useCallback((e) => {
        if (isMobile) return; // no dragging on mobile
        e.preventDefault();
        dragging.current = true;
        document.body.style.cursor = "grabbing";
        // Panel rect (viewport-relative) and container rect
        const panelRect = e.currentTarget.closest("[data-archetype-panel]").getBoundingClientRect();
        const cRect = containerRef?.current?.getBoundingClientRect() || { left: 0, top: 0 };
        // Convert visual position to container-relative and lock it in
        setPos({ x: panelRect.left - cRect.left, y: panelRect.top - cRect.top });
        // Offset = pointer position relative to panel's top-left
        offset.current = { x: e.clientX - panelRect.left, y: e.clientY - panelRect.top };
        window.addEventListener("pointermove", handleDragMove);
        window.addEventListener("pointerup", handleDragUp);
    }, [isMobile, handleDragMove, handleDragUp, containerRef]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.removeEventListener("pointermove", handleDragMove);
            window.removeEventListener("pointerup", handleDragUp);
        };
    }, [handleDragMove, handleDragUp]);

    // Reset position when panel re-opens
    useEffect(() => { setPos(null); }, []);

    // When user picks an archetype, toggle selection
    const handleCellClick = (arch) => {
        if (!arch) return;
        if (activeArchetype?.code === arch.code) {
            // Deselect
            setActiveArchetype(null);
            setExpandedCode(null);
        } else {
            setActiveArchetype(arch);
            setExpandedCode(arch.code);
        }
    };

    // Characters that match the expanded archetype
    const matchingChars = useMemo(() => {
        if (!expandedCode) return [];
        const arch = ARCHETYPES.find(a => a.code === expandedCode);
        if (!arch) return [];
        return getCharactersInArchetype(arch, CHARACTERS);
    }, [expandedCode]);

    const expanded = expandedCode ? ARCHETYPES.find(a => a.code === expandedCode) : null;

    // Position style: if dragged, use absolute x/y; otherwise use default centering
    const posStyle = pos && !isMobile
        ? { position: "absolute", top: pos.y, left: pos.x, transform: "none" }
        : { position: "absolute", top: isMobile ? 44 : 56, left: isMobile ? 4 : "50%", transform: isMobile ? "none" : "translateX(-50%)" };

    return (
        <div data-archetype-panel onClick={e => e.stopPropagation()} style={{
            ...posStyle,
            width: isMobile ? "calc(100% - 8px)" : 680,
            maxWidth: "98vw",
            background: "rgba(10,10,22,0.97)",
            border: "1px solid rgba(100,140,255,0.2)",
            borderRadius: 10,
            padding: isMobile ? 14 : 22,
            zIndex: 50,
            boxShadow: "0 12px 50px rgba(0,0,0,0.7)",
            backdropFilter: "blur(10px)",
            maxHeight: isMobile ? "82dvh" : "85vh",
            overflowY: "auto",
            fontFamily: "'IBM Plex Mono','Fira Code',monospace",
        }}>
            {/* Header — acts as drag handle on desktop */}
            <div
                onPointerDown={onDragStart}
                style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10,
                    cursor: isMobile ? "default" : "grab", userSelect: "none",
                }}
            >
                <div style={{
                    fontSize: 11, letterSpacing: 2, color: "#9090a0",
                    fontWeight: 700, textTransform: "uppercase",
                }}>The 27 Archetypes</div>
                <button onClick={onClose} style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9090a0", fontSize: 16, cursor: "pointer", padding: "4px 10px", borderRadius: 4,
                    fontFamily: "inherit", lineHeight: 1.2,
                }}>✕</button>
            </div>

            <div style={{
                fontSize: 12, lineHeight: 1.6, color: "#9494a4", marginBottom: 16,
                padding: "8px 10px", background: "rgba(255,255,255,0.02)", borderRadius: 6,
            }}>
                Every character in the cube belongs to one of 27 archetypes, defined by their
                {" "}<span style={{ color: AXIS_COLOR.x }}>Praxis</span>,
                {" "}<span style={{ color: AXIS_COLOR.y }}>Ethos</span>, and
                {" "}<span style={{ color: AXIS_COLOR.z }}>Nexus</span> tier.
                Click any cell to highlight its region on the cube.
            </div>

            {/* Nexus layers */}
            {NEXUS_LAYERS.map(layer => (
                <div key={layer.key} style={{ marginBottom: 16 }}>
                    {/* Layer header */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
                    }}>
                        <div style={{
                            fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
                            fontWeight: 700, color: AXIS_COLOR.z,
                        }}>{layer.label}</div>
                        <div style={{ flex: 1, height: 1, background: `${AXIS_COLOR.z}22` }} />
                        <div style={{ fontSize: 9, color: "#8b8b9b" }}>Nexus</div>
                    </div>

                    {/* Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: 3 }}>
                        {/* Column headers */}
                        <div /> {/* empty corner */}
                        {PRAXIS_TIERS.map(pt => (
                            <div key={pt.key} style={{
                                textAlign: "center", fontSize: 9, fontWeight: 700,
                                letterSpacing: 1, color: AXIS_COLOR.x, padding: "4px 0",
                                textTransform: "uppercase", opacity: 0.85,
                            }}>{pt.label}</div>
                        ))}

                        {/* Rows */}
                        {layer.rows.map(row => (
                            <React.Fragment key={row.key}>
                                {/* Row header */}
                                <div style={{
                                    fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                                    color: AXIS_COLOR.y, padding: "8px 6px 8px 0",
                                    textAlign: "right", whiteSpace: "nowrap",
                                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                                    textTransform: "uppercase", opacity: 0.85,
                                }}>{row.label}</div>

                                {/* Cells */}
                                {row.cells.map(arch => {
                                    if (!arch) return <div key="empty" />;
                                    const isActive = activeArchetype?.code === arch.code;
                                    const isExpanded = expandedCode === arch.code;
                                    const count = ARCHETYPE_COUNTS[arch.code] || 0;
                                    return (
                                        <div key={arch.code}
                                            onClick={() => handleCellClick(arch)}
                                            style={{
                                                padding: isMobile ? "6px 4px" : "8px 6px",
                                                borderRadius: 5,
                                                cursor: "pointer",
                                                background: isActive
                                                    ? "rgba(136,204,255,0.12)"
                                                    : "rgba(255,255,255,0.015)",
                                                border: `1px solid ${isActive ? "rgba(136,204,255,0.4)" : "rgba(255,255,255,0.04)"}`,
                                                transition: "all 0.15s",
                                                textAlign: "center",
                                                position: "relative",
                                            }}
                                            onMouseEnter={e => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = "rgba(136,204,255,0.06)";
                                                    e.currentTarget.style.borderColor = "rgba(136,204,255,0.2)";
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                                                }
                                            }}
                                        >
                                            <div style={{
                                                fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
                                                color: isActive ? HIGHLIGHT_COLOR : "#999",
                                                marginBottom: 2,
                                            }}>{arch.code}</div>
                                            <div style={{
                                                fontSize: isMobile ? 9 : 10, fontWeight: 600,
                                                color: isActive ? "#ddd" : "#9494a4",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}>{arch.name}</div>
                                            <div style={{
                                                fontSize: 8, color: "#8b8b9b", marginTop: 2,
                                            }}>{count} char{count !== 1 ? "s" : ""}</div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}

            {/* Expanded detail */}
            {expanded && (
                <div style={{
                    marginTop: 8, padding: isMobile ? 12 : 16,
                    background: "rgba(136,204,255,0.04)",
                    borderRadius: 8,
                    border: "1px solid rgba(136,204,255,0.12)",
                    animation: "fadeIn 0.15s ease-out",
                }}>
                    {/* Title row */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{
                            fontSize: 18, fontWeight: 700, color: HIGHLIGHT_COLOR,
                            letterSpacing: 1,
                        }}>{expanded.name}</span>
                        <span style={{
                            fontSize: 13, fontWeight: 700, color: "#888",
                            letterSpacing: 1.5, fontFamily: "inherit",
                        }}>{expanded.code}</span>
                    </div>

                    {/* PEN breakdown */}
                    <div style={{
                        display: "flex", gap: isMobile ? 8 : 16, marginBottom: 12,
                        fontSize: 11, flexWrap: "wrap",
                    }}>
                        <span><span style={{ color: AXIS_COLOR.x, fontWeight: 700 }}>P</span><span style={{ color: "#888" }}>raxis: </span><span style={{ color: "#bbb" }}>{expanded.praxis}</span></span>
                        <span><span style={{ color: AXIS_COLOR.y, fontWeight: 700 }}>E</span><span style={{ color: "#888" }}>thos: </span><span style={{ color: "#bbb" }}>{expanded.ethos}</span></span>
                        <span><span style={{ color: AXIS_COLOR.z, fontWeight: 700 }}>N</span><span style={{ color: "#888" }}>exus: </span><span style={{ color: "#bbb" }}>{expanded.nexus}</span></span>
                    </div>

                    {/* Traits */}
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                        {expanded.traits.map(t => (
                            <span key={t} style={{
                                padding: "3px 8px", borderRadius: 10, fontSize: 10,
                                fontWeight: 600, letterSpacing: 0.3,
                                background: "rgba(136,204,255,0.08)",
                                border: "1px solid rgba(136,204,255,0.15)",
                                color: "#aaccdd",
                            }}>{t}</span>
                        ))}
                    </div>

                    {/* Description */}
                    <div style={{
                        fontSize: 12, lineHeight: 1.7, color: "#bbb",
                        marginBottom: 14,
                    }}>{expanded.description}</div>

                    {/* Matching characters */}
                    {matchingChars.length > 0 && (
                        <div>
                            <div style={{
                                fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                                color: "#9090a0", fontWeight: 700, marginBottom: 8,
                            }}>Characters in this archetype ({matchingChars.length})</div>
                            <div style={{
                                display: "flex", gap: 4, flexWrap: "wrap",
                                maxHeight: 120, overflowY: "auto",
                            }}>
                                {matchingChars.map(ch => (
                                    <span key={ch.name} style={{
                                        display: "inline-flex", alignItems: "center", gap: 4,
                                        padding: "3px 8px", borderRadius: 12, fontSize: 10,
                                        background: `${ch.color}12`,
                                        border: `1px solid ${ch.color}33`,
                                        color: ch.color, fontWeight: 600,
                                    }}>
                                        <span style={{
                                            width: 5, height: 5, borderRadius: "50%",
                                            background: ch.color, flexShrink: 0,
                                        }} />
                                        {ch.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {matchingChars.length === 0 && (
                        <div style={{ fontSize: 11, color: "#8b8b9b", fontStyle: "italic" }}>
                            No characters currently mapped to this region.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
})
