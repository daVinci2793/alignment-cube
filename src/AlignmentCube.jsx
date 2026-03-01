import React, { useState, useRef, useEffect, useCallback } from "react";
import { CHARACTERS, VIEW_PRESETS } from "./data/index.js";
import { clamp } from "./utils/math.js";
import { drawScene } from "./rendering/drawScene.js";
import { useRotation, useKeyboard, useCanvasResize, useDrag } from "./hooks/useInteraction.js";
import useAmbientMusic from "./hooks/useAmbientMusic.js";
import CadGizmo from "./components/CadGizmo.jsx";
import AxisInfoPanel from "./components/AxisInfoPanel.jsx";
import PlaneOverlay from "./components/PlaneOverlay.jsx";
import ZoomWidget from "./components/ZoomWidget.jsx";
import SidebarPanel from "./components/SidebarPanel.jsx";
import CharacterDetailCard from "./components/CharacterDetailCard.jsx";
import MobileDetailView from "./components/MobileDetailView.jsx";
import ArchetypePanel from "./components/ArchetypePanel.jsx";

const SIDEBAR_MIN = 260;
const SIDEBAR_MAX = 520;
const SIDEBAR_DEFAULT = 340;

export default function AlignmentCube() {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);

    // ---- UI state ----
    const [hovered, setHovered] = useState(null);
    const [selectedList, setSelectedList] = useState([]);   // multi-select array
    const [guides, setGuides] = useState(true);
    const [projLines, setProjLines] = useState(true);
    const [drawer, setDrawer] = useState(false);
    const [cSize, setCSize] = useState({ w: 400, h: 400 });
    const [autoSpin, setAutoSpin] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
    const [activeView, setActiveView] = useState("3D");
    const [activePlane, setActivePlane] = useState(null);
    const [infoAxis, setInfoAxis] = useState(null);
    const [compareMode, setCompareMode] = useState(false);
    const [compareList, setCompareList] = useState([]);
    const [catFilter, setCatFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [hintOpacity, setHintOpacity] = useState(1);
    const [renderTick, setRenderTick] = useState(0); // drives React re-renders for canvas
    const [focusOrder, setFocusOrder] = useState([]);  // z-order stack for cards
    const [sidebarOpen, setSidebarOpen] = useState(true); // collapse/expand sidebar on desktop
    const [drawerTab, setDrawerTab] = useState("browse"); // "browse" | "detail" for mobile drawer
    const [showArchetypes, setShowArchetypes] = useState(false);
    const [activeArchetype, setActiveArchetype] = useState(null);

    const hintFadingRef = useRef(false);
    const projectedRef = useRef([]);
    const isMobileRef = useRef(false);
    const cardPositionsRef = useRef({});  // { [name]: {x,y} } persists card drag positions

    // Derive the "primary" selected — last in list — used for canvas highlighting
    const primarySelected = selectedList.length > 0 ? selectedList[selectedList.length - 1] : null;

    // ---- Ambient background music (Minecraft-style quiet, sporadic playback) ----
    useAmbientMusic();

    // ---- Sidebar resize via pointer drag (refs to avoid re-render per pixel) ----
    const resizingRef = useRef(false);
    const resizeStartXRef = useRef(0);
    const resizeStartWRef = useRef(SIDEBAR_DEFAULT);

    useEffect(() => {
        const onPointerMove = (e) => {
            if (!resizingRef.current) return;
            // Handle is on the RIGHT edge of left sidebar, so dragging right = wider
            const delta = e.clientX - resizeStartXRef.current;
            const next = clamp(resizeStartWRef.current + delta, SIDEBAR_MIN, SIDEBAR_MAX);
            setSidebarWidth(next);
        };
        const onPointerUp = () => {
            if (resizingRef.current) {
                resizingRef.current = false;
                document.body.style.cursor = "";
                document.body.style.userSelect = "";
            }
        };
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, []);

    const onResizeHandleDown = useCallback((e) => {
        e.preventDefault();
        resizingRef.current = true;
        resizeStartXRef.current = e.clientX;
        resizeStartWRef.current = sidebarWidth;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    }, [sidebarWidth]);

    // Use window width (not canvas width) to avoid layout oscillation at iPad sizes
    const [windowWidth, setWindowWidth] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1024);
    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    const isMobile = windowWidth < 768;
    isMobileRef.current = isMobile;

    // ---- Pan offset (refs for drag performance, flushed to state via render tick) ----
    const panXRef = useRef(0);
    const panYRef = useRef(0);
    const setPanX = useCallback((v) => { panXRef.current = v; }, []);
    const setPanY = useCallback((v) => { panYRef.current = v; }, []);

    // ---- Rotation / animation ----
    const rotation = useRotation({ autoSpin, setAutoSpin });
    const { rotXRef, rotYRef, frameRef, setRotX, setRotY, animateTo, onFrameRef } = rotation;

    // Animation frame callback — drives canvas redraws and hint fading
    useEffect(() => {
        onFrameRef.current = (frame) => {
            // Fade hint on first interaction
            if (hintFadingRef.current) {
                setHintOpacity(prev => {
                    const next = prev - 0.02;
                    if (next <= 0) { hintFadingRef.current = false; return 0; }
                    return next;
                });
            }
            // Trigger React re-render at ~30fps for canvas (every other rAF)
            if (frame % 2 === 0) setRenderTick(t => t + 1);
        };
    }, [onFrameRef]);

    const markInteracted = useCallback(() => {
        if (!hintFadingRef.current && hintOpacity > 0) hintFadingRef.current = true;
    }, [hintOpacity]);

    // ---- View presets ----
    const handleSelectView = useCallback((v) => {
        setActiveView(v.label);
        setAutoSpin(false);
        markInteracted();
        animateTo(v.rx, v.ry);
        setActivePlane(v.plane || null);
    }, [animateTo, markInteracted]);

    // ---- Resize ----
    useCanvasResize(wrapRef, canvasRef, setCSize);

    // ---- Keyboard ----
    // Wrap setSelectedList for Escape clearing (useKeyboard expects setSelected)
    const clearSelected = useCallback(() => { setSelectedList([]); setFocusOrder([]); }, []);
    useKeyboard({
        rotXRef, rotYRef, setRotX, setRotY,
        handleSelectView, viewPresets: VIEW_PRESETS,
        setSelected: clearSelected, setInfoAxis, setCompareList,
        setGuides, setProjLines, setAutoSpin, setZoom,
        setPanX, setPanY,
    });

    // ---- Hit testing ----
    // BUG FIX: hit radius now scales with zoom
    const hitTest = useCallback((cx, cy) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return null;
        const mx = cx - rect.left, my = cy - rect.top;
        const baseRadius = isMobileRef.current ? 35 : 24;
        const hitRadius = baseRadius * Math.max(0.6, Math.min(zoom, 2.0));
        for (let i = projectedRef.current.length - 1; i >= 0; i--) {
            const c = projectedRef.current[i];
            const dx = mx - c.sx, dy = my - c.sy;
            if (Math.sqrt(dx * dx + dy * dy) < hitRadius) return c.name;
        }
        return null;
    }, [zoom]);

    // ---- Selection handler (supports Ctrl+click for multi-select) ----
    const handleCharSelect = useCallback((name, event) => {
        if (compareMode) {
            setCompareList(prev => {
                if (prev.includes(name)) return prev.filter(n => n !== name);
                if (prev.length >= 2) return [prev[1], name];
                return [...prev, name];
            });
            return;
        }
        const multi = event && (event.ctrlKey || event.metaKey);
        setSelectedList(prev => {
            if (multi) {
                // toggle in/out of list
                if (prev.includes(name)) {
                    const next = prev.filter(n => n !== name);
                    setFocusOrder(fo => fo.filter(n => n !== name));
                    return next;
                }
                return [...prev, name];
            }
            // simple click: toggle single
            if (prev.length === 1 && prev[0] === name) {
                setFocusOrder([]);
                return [];
            }
            setFocusOrder([name]);
            return [name];
        });
    }, [compareMode]);

    // Canvas clicks go through useDrag → onSelect, which doesn't have the event object
    // Wrap it to also support simple canvas clicks (no Ctrl info from canvas)
    const handleCanvasSelect = useCallback((hit) => {
        handleCharSelect(hit, null);
    }, [handleCharSelect]);

    // ---- Drag / pointer / wheel / pinch ----
    const { dragRef, onDown, onMove, onUp, onLeave } = useDrag({
        canvasRef, rotXRef, rotYRef, setRotX, setRotY,
        panXRef, panYRef, setPanX, setPanY,
        setAutoSpin, setActiveView, setActivePlane,
        onHitTest: hitTest, onSelect: handleCanvasSelect,
        isMobileRef, targetRotRef: rotation.rotXRef ? { current: null } : null,
        markInteracted,
        setHovered, setZoom,
    });

    // ---- Canvas draw ----
    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const dpr = window.devicePixelRatio || 1;
        c.width = cSize.w * dpr;
        c.height = cSize.h * dpr;
        c.style.width = cSize.w + "px";
        c.style.height = cSize.h + "px";
        const ctx = c.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        projectedRef.current = drawScene(ctx, {
            W: cSize.w, H: cSize.h,
            rotX: rotXRef.current, rotY: rotYRef.current,
            panX: panXRef.current, panY: panYRef.current,
            zoom, frame: frameRef.current,
            hovered, selected: primarySelected,
            guides, projLines,
            activePlane,
            compareMode, compareList,
            searchQuery,
            isMobile,
            hintOpacity,
            activeArchetype,
        });
    }, [renderTick, cSize, hovered, primarySelected, guides, projLines, activePlane, compareMode, compareList, searchQuery, isMobile, hintOpacity, zoom, activeArchetype]);

    // ---- Card lifecycle callbacks ----
    const handleCardClose = useCallback((name) => {
        setSelectedList(prev => prev.filter(n => n !== name));
        setFocusOrder(prev => prev.filter(n => n !== name));
    }, []);

    const handleCardFocus = useCallback((name) => {
        setFocusOrder(prev => {
            const without = prev.filter(n => n !== name);
            return [...without, name];
        });
    }, []);

    const handlePositionChange = useCallback((name, pos) => {
        cardPositionsRef.current[name] = pos;
    }, []);

    // ---- Toolbar button style ----
    const btn = (active) => ({
        background: active ? "rgba(100,140,255,0.22)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? "rgba(100,140,255,0.4)" : "rgba(255,255,255,0.06)"}`,
        color: active ? "#ccc" : "#8b8b9b",
        padding: isMobile ? "7px 10px" : "5px 10px",
        fontSize: 10, letterSpacing: 1, cursor: "pointer", borderRadius: 3,
        fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.15s",
    });

    // ---- RENDER ----
    return (
        <div style={{
            width: "100%", height: "100vh", background: "#0a0a14",
            fontFamily: "'IBM Plex Mono','Fira Code',monospace",
            color: "#e0e0e0", display: "flex", flexDirection: "column",
            overflow: "hidden", userSelect: "none", touchAction: "none",
        }}>
            {/* Header toolbar */}
            <div style={{
                padding: isMobile ? "8px 12px 5px" : "10px 20px 6px",
                borderBottom: "1px solid rgba(100,140,255,0.08)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                background: "rgba(10,10,20,0.5)",
            }}>
                <h1 style={{
                    margin: 0, fontSize: isMobile ? 11 : 15, fontWeight: 700, letterSpacing: 3,
                    textTransform: "uppercase",
                    background: "linear-gradient(135deg,#ff6b6b,#ffd93d 50%,#6bcb77)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Praxis · Ethos · Nexus</h1>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", flexShrink: 0 }}>
                    {!isMobile && (
                        <button onClick={() => setSidebarOpen(p => !p)} style={btn(sidebarOpen)} title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
                            {sidebarOpen ? "◀ PANEL" : "▶ PANEL"}
                        </button>
                    )}
                    <button onClick={() => setGuides(p => !p)} style={btn(guides)} title="Toggle grid [G]">GRID</button>
                    <button onClick={() => setProjLines(p => !p)} style={btn(projLines)} title="Projection lines [P]">PROJ</button>
                    <button onClick={() => setAutoSpin(p => !p)} style={btn(autoSpin)} title="Auto-rotate [S]">SPIN</button>
                    <button onClick={() => { setShowArchetypes(p => !p); if (showArchetypes) setActiveArchetype(null); }} style={btn(showArchetypes)} title="Browse 27 archetypes">TYPES</button>
                    <button onClick={() => {
                        setRotX(-0.45); setRotY(0.65); setZoom(1);
                        setPanX(0); setPanY(0);
                        setActiveView("3D"); setActivePlane(null);
                        setSelectedList([]); setFocusOrder([]); setHovered(null); setCompareList([]);
                        setSearchQuery(""); setAutoSpin(true);
                        setShowArchetypes(false); setActiveArchetype(null);
                    }} style={btn(false)} title="Reset view">RESET</button>
                </div>
            </div>

            {/* Main content area */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
                {/* Desktop sidebar — LEFT side */}
                {!isMobile && sidebarOpen && (
                    <>
                        <div style={{
                            width: sidebarWidth, borderRight: "1px solid rgba(100,140,255,0.08)",
                            padding: "12px 16px", overflowY: "auto", flexShrink: 0,
                            background: "rgba(8,8,16,0.4)",
                        }}>
                            <SidebarPanel
                                selectedList={selectedList} hovered={hovered}
                                onCharClick={handleCharSelect} setHovered={setHovered}
                                compareMode={compareMode} setCompareMode={setCompareMode}
                                compareList={compareList} setCompareList={setCompareList}
                                infoAxis={infoAxis} setInfoAxis={setInfoAxis}
                                catFilter={catFilter} setCatFilter={setCatFilter}
                                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                isMobile={false}
                            />
                        </div>
                        {/* Resize handle */}
                        <div
                            onPointerDown={onResizeHandleDown}
                            style={{
                                width: 6, cursor: "col-resize", flexShrink: 0,
                                background: "transparent", position: "relative", zIndex: 5,
                                transition: "background 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(100,140,255,0.15)"; }}
                            onMouseLeave={e => { if (!resizingRef.current) e.currentTarget.style.background = "transparent"; }}
                        >
                            <div style={{
                                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                                width: 2, height: 32, borderRadius: 1, background: "rgba(100,140,255,0.2)",
                            }} />
                        </div>
                    </>
                )}

                {/* Canvas container */}
                <div ref={wrapRef} style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
                    <canvas ref={canvasRef}
                        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
                        onPointerLeave={onLeave} onPointerCancel={onUp}
                        onMouseDown={e => { if (e.button === 1) e.preventDefault(); }}
                        onContextMenu={e => e.preventDefault()}
                        style={{
                            width: "100%", height: "100%",
                            cursor: dragRef.current === "pan" ? "move" : dragRef.current ? "grabbing" : hovered ? "pointer" : "grab",
                            touchAction: "none",
                        }}
                    />
                    <PlaneOverlay plane={activePlane} isMobile={isMobile} />

                    {/* Floating clear button */}
                    {selectedList.length > 0 && (
                        <button onClick={() => { setSelectedList([]); setFocusOrder([]); setCompareList([]); }} style={{
                            position: "absolute", top: isMobile ? 8 : 12, right: isMobile ? 8 : 12, zIndex: 8,
                            background: "rgba(12,12,25,0.85)", border: "1px solid rgba(255,255,255,0.15)",
                            color: "#aaa", padding: isMobile ? "8px 12px" : "6px 10px",
                            fontSize: isMobile ? 11 : 9, fontWeight: 600, letterSpacing: 0.5,
                            cursor: "pointer", borderRadius: 6, fontFamily: "inherit",
                            backdropFilter: "blur(8px)", transition: "all 0.15s",
                            display: "flex", alignItems: "center", gap: 5,
                        }}>
                            <span style={{ fontSize: isMobile ? 13 : 11, lineHeight: 1 }}>✕</span>
                            <span>Clear</span>
                        </button>
                    )}

                    {/* Gizmo — bottom tray */}
                    <div style={{
                        position: "absolute", bottom: 12, left: isMobile ? 12 : 8, zIndex: 6,
                        background: isMobile ? "rgba(12,12,25,0.85)" : "transparent",
                        borderRadius: isMobile ? 14 : 0,
                        border: isMobile ? "1px solid rgba(100,140,255,0.15)" : "none",
                        padding: isMobile ? "8px 10px 6px" : 0,
                        backdropFilter: isMobile ? "blur(8px)" : "none",
                        boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.5)" : "none",
                    }}>
                        <CadGizmo rotX={rotXRef.current} rotY={rotYRef.current} activeView={activeView} onSelectView={handleSelectView} isMobile={isMobile} />
                    </div>

                    {/* Zoom — hidden on mobile */}
                    {!isMobile && (
                        <div style={{ position: "absolute", right: 12, bottom: 12, zIndex: 6 }}>
                            <ZoomWidget zoom={zoom} setZoom={setZoom} isMobile={isMobile} />
                        </div>
                    )}

                    {/* Mobile drawer toggle */}
                    {isMobile && (
                        <button onClick={() => setDrawer(p => !p)} style={{
                            position: "absolute", bottom: 12, right: 12, zIndex: 8,
                            background: drawer ? "rgba(100,140,255,0.3)" : "rgba(12,12,25,0.9)",
                            border: `1px solid ${selectedList.length > 0 && !drawer ? "rgba(100,180,255,0.5)" : "rgba(100,140,255,0.3)"}`,
                            color: "#bbb",
                            padding: "10px 14px", fontSize: 10, fontWeight: 700,
                            letterSpacing: 1, cursor: "pointer", borderRadius: 20,
                            fontFamily: "inherit", boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}>
                            {drawer ? "✕" : "☰"}
                            {selectedList.length > 0 && !drawer && (
                                <span style={{
                                    position: "absolute", top: -3, right: -3,
                                    width: 10, height: 10, borderRadius: "50%",
                                    background: CHARACTERS.find(c => c.name === primarySelected)?.color || "#648cff",
                                    border: "2px solid rgba(12,12,25,0.9)",
                                    boxShadow: `0 0 8px ${CHARACTERS.find(c => c.name === primarySelected)?.color || "#648cff"}88`,
                                }} />
                            )}
                        </button>
                    )}

                    {/* Axis info panel */}
                    {infoAxis && <AxisInfoPanel axis={infoAxis} onClose={() => setInfoAxis(null)} isMobile={isMobile} />}

                    {/* Archetype panel */}
                    {showArchetypes && (
                        <ArchetypePanel
                            activeArchetype={activeArchetype}
                            setActiveArchetype={setActiveArchetype}
                            onClose={() => { setShowArchetypes(false); setActiveArchetype(null); }}
                            isMobile={isMobile}
                            containerRef={wrapRef}
                        />
                    )}

                    {/* Floating PEN detail cards — only when sidebar is visible (desktop + panel open) */}
                    {!compareMode && !isMobile && sidebarOpen && selectedList.map((name, i) => (
                        <CharacterDetailCard
                            key={name}
                            name={name}
                            hovered={hovered}
                            index={i}
                            zBase={100 + (focusOrder.indexOf(name) === -1 ? i : focusOrder.indexOf(name))}
                            initialPos={cardPositionsRef.current[name] || undefined}
                            onPositionChange={handlePositionChange}
                            onSelect={handleCharSelect}
                            onHover={setHovered}
                            onClose={handleCardClose}
                            onFocus={handleCardFocus}
                            isMobile={isMobile}
                            containerRef={wrapRef}
                        />
                    ))}
                </div>



                {/* Mobile drawer */}
                {isMobile && (
                    <>
                        {drawer && <div onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9 }} />}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            maxHeight: drawer ? "78vh" : 0, overflow: "hidden",
                            transition: "max-height 0.3s ease",
                            background: "#0c0c1a", borderTop: drawer ? "1px solid rgba(100,140,255,0.15)" : "none",
                            zIndex: 10, borderRadius: "16px 16px 0 0",
                            display: "flex", flexDirection: "column",
                        }}>
                            {/* Drag handle + clear */}
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 16px 4px", flexShrink: 0 }}>
                                <div style={{ flex: 1 }} />
                                <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
                                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                    {selectedList.length > 0 && (
                                        <button onClick={() => { setSelectedList([]); setFocusOrder([]); }} style={{
                                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                                            color: "#9090a0", fontSize: 9, cursor: "pointer", padding: "3px 8px", borderRadius: 4,
                                            fontFamily: "inherit", letterSpacing: 0.5,
                                        }}>✕ Clear</button>
                                    )}
                                </div>
                            </div>

                            {/* Tab bar */}
                            <div style={{ display: "flex", gap: 0, padding: "4px 16px 0", flexShrink: 0 }}>
                                {["browse", "detail"].map(tab => {
                                    const active = drawerTab === tab;
                                    const hasSelection = selectedList.length > 0;
                                    const label = tab === "browse" ? "Browse" : "Detail";
                                    return (
                                        <button key={tab} onClick={() => setDrawerTab(tab)} style={{
                                            flex: 1, padding: "10px 0 8px", fontSize: 11, fontWeight: 600,
                                            letterSpacing: 1, textTransform: "uppercase",
                                            background: "transparent",
                                            border: "none", borderBottom: `2px solid ${active ? "rgba(100,140,255,0.6)" : "rgba(255,255,255,0.04)"}`,
                                            color: active ? "#ccc" : "#8b8b9b",
                                            cursor: "pointer", fontFamily: "inherit",
                                            transition: "all 0.15s",
                                            position: "relative",
                                        }}>
                                            {label}
                                            {tab === "detail" && hasSelection && !active && (
                                                <span style={{
                                                    position: "absolute", top: 6, right: "calc(50% - 28px)",
                                                    width: 7, height: 7, borderRadius: "50%",
                                                    background: CHARACTERS.find(c => c.name === primarySelected)?.color || "#648cff",
                                                    boxShadow: `0 0 6px ${CHARACTERS.find(c => c.name === primarySelected)?.color || "#648cff"}88`,
                                                }} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab content */}
                            <div style={{ overflowY: "auto", flex: 1, padding: "8px 16px 32px", minHeight: 0 }}>
                                {drawerTab === "browse" ? (
                                    <SidebarPanel
                                        selectedList={selectedList} hovered={hovered}
                                        onCharClick={handleCharSelect} setHovered={setHovered}
                                        compareMode={compareMode} setCompareMode={setCompareMode}
                                        compareList={compareList} setCompareList={setCompareList}
                                        infoAxis={infoAxis} setInfoAxis={setInfoAxis}
                                        catFilter={catFilter} setCatFilter={setCatFilter}
                                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                        isMobile={true}
                                    />
                                ) : (
                                    <MobileDetailView
                                        selectedList={selectedList}
                                        hovered={hovered}
                                        onCharClick={handleCharSelect}
                                        onHover={setHovered}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
