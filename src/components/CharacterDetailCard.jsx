import React, { useRef, useEffect, useCallback, useState } from "react";
import { CHARACTERS, NEAREST_5 } from "../data/index.js";
import { getArchetypeForChar } from "../data/index.js";
import AxisBar from "./AxisBar.jsx";
import AlignmentBadge from "./AlignmentBadge.jsx";

const CASCADE_OFFSET = 28;
const CARD_WIDTH = 340;

/**
 * Floating, draggable PEN breakdown card.
 * Position persists across character re-selection via the positions ref map in parent.
 * Multiple cards cascade from top-left with offset.
 */
export default function CharacterDetailCard({
    name, hovered, index, zBase,
    initialPos, onPositionChange,
    onSelect, onHover, onClose, onFocus,
    isMobile, containerRef,
}) {
    const sel = CHARACTERS.find(c => c.name === name);

    const cardRef = useRef(null);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    // Position: use saved position from parent, or cascade default
    const defaultPos = isMobile
        ? { x: 12, y: 80 }
        : { x: 24 + index * CASCADE_OFFSET, y: 70 + index * CASCADE_OFFSET };

    const [pos, setPos] = useState(initialPos || defaultPos);

    // Sync if initialPos changes externally
    useEffect(() => {
        if (initialPos) setPos(initialPos);
    }, [initialPos?.x, initialPos?.y]);

    // Stable move/up handlers (refs capture latest state via refs)
    const onMoveRef = useRef(null);
    const onUpRef = useRef(null);

    onMoveRef.current = (e) => {
        e.preventDefault();
        const container = containerRef?.current;
        const cRect = container ? container.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        let nx = e.clientX - offset.current.x - cRect.left;
        let ny = e.clientY - offset.current.y - cRect.top;
        nx = Math.max(0, Math.min(nx, cRect.width - CARD_WIDTH));
        ny = Math.max(0, Math.min(ny, cRect.height - 60));
        const next = { x: nx, y: ny };
        setPos(next);
        onPositionChange(name, next);
    };

    onUpRef.current = () => {
        dragging.current = false;
        document.body.style.cursor = "";
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
    };

    // Stable wrappers that delegate to refs (so no stale closures)
    const handleMove = useCallback((e) => { onMoveRef.current?.(e); }, []);
    const handleUp = useCallback(() => { onUpRef.current?.(); }, []);

    const onDragStart = useCallback((e) => {
        e.preventDefault();
        dragging.current = true;
        document.body.style.cursor = "grabbing";
        const container = containerRef?.current;
        const cRect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
        offset.current = { x: e.clientX - cRect.left - pos.x, y: e.clientY - cRect.top - pos.y };
        onFocus(name);
        // Only attach global listeners when drag starts
        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
    }, [name, onFocus, containerRef, pos.x, pos.y, handleMove, handleUp]);

    // Cleanup on unmount — remove any lingering listeners
    useEffect(() => {
        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };
    }, [handleMove, handleUp]);

    // Guard after all hooks — Rules of Hooks compliance
    if (!sel) return null;

    const nearest = NEAREST_5[sel.name] || [];

    const posStyle = isMobile
        ? { bottom: 80, left: 12, right: 12 }
        : { left: pos.x, top: pos.y };

    return (
        <div
            ref={cardRef}
            onPointerDown={() => onFocus(name)}
            style={{
                position: "absolute", zIndex: zBase,
                ...posStyle,
                width: isMobile ? "auto" : CARD_WIDTH,
                maxWidth: "92vw", maxHeight: "80dvh", overflowY: "auto",
                background: "rgba(10,10,22,0.96)",
                border: "1px solid rgba(100,140,255,0.2)",
                borderRadius: 10,
                boxShadow: "0 12px 50px rgba(0,0,0,0.7), 0 0 1px rgba(100,140,255,0.3)",
                backdropFilter: "blur(12px)",
                fontFamily: "'IBM Plex Mono','Fira Code',monospace",
                color: "#e0e0e0",
                touchAction: "none",
            }}
        >
            {/* Drag handle / title bar */}
            <div
                onPointerDown={onDragStart}
                style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 16px 10px",
                    cursor: "grab", userSelect: "none",
                    borderBottom: "1px solid rgba(100,140,255,0.08)",
                }}
            >
                <div style={{
                    width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                    background: sel.color, boxShadow: `0 0 12px ${sel.color}55`,
                }} />
                <div style={{
                    fontSize: 16, fontWeight: 700, color: sel.color,
                    flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                    {sel.name}
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(name); }} style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#9494a4", fontSize: 14, cursor: "pointer", padding: "4px 10px", borderRadius: 4,
                    fontFamily: "inherit", lineHeight: 1, flexShrink: 0,
                }}>✕</button>
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
                    <AxisBar label="Praxis — Method" color="#ff6b6b" value={sel.x} neg="Structured" mid="Pragmatic" pos="Unbound" />
                    <AxisBar label="Ethos — Impact" color="#ffd93d" value={sel.y} neg="Benevolent" mid="Transactional" pos="Malignant" />
                    <AxisBar label="Nexus — Scope" color="#6bcb77" value={sel.z} neg="Parochial" mid="Factional" pos="Universal" />
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
                                    onClick={(e) => { e.stopPropagation(); onSelect(n.name, e); }}
                                    onMouseEnter={() => !isMobile && onHover(n.name)}
                                    onMouseLeave={() => !isMobile && onHover(null)}
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
}
