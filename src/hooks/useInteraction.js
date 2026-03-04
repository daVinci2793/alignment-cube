import { useEffect, useRef, useCallback } from "react";
import { clamp } from "../utils/math.js";

/**
 * Manages canvas rotation, auto-spin, and animated transitions.
 * Returns current rotation values and control functions.
 *
 * BUG FIX: rotation is stored in refs and only flushed to state
 * when the animation frame fires, avoiding stale closure issues
 * with handleSelectView / markInteracted.
 */
export function useRotation({ autoSpin, setAutoSpin }) {
    const rotXRef = useRef(-0.45);
    const rotYRef = useRef(0.65);
    const targetRot = useRef(null);
    const autoSpinRef = useRef(autoSpin);
    const frameRef = useRef(0);
    // We store listeners that want to be notified each frame
    const onFrameRef = useRef(null);

    // Momentum / inertia state
    const velXRef = useRef(0);
    const velYRef = useRef(0);
    const FRICTION = 0.96;        // per-frame multiplier (lower = more drag)
    const VEL_EPSILON = 0.00005;  // stop threshold

    useEffect(() => { autoSpinRef.current = autoSpin; }, [autoSpin]);

    const getRotX = useCallback(() => rotXRef.current, []);
    const getRotY = useCallback(() => rotYRef.current, []);
    const getFrame = useCallback(() => frameRef.current, []);

    const setRotX = useCallback((v) => { rotXRef.current = v; }, []);
    const setRotY = useCallback((v) => { rotYRef.current = v; }, []);

    // Called by useDrag on pointer-up to kick off inertia
    const setVelocity = useCallback((vx, vy) => {
        velXRef.current = vx;
        velYRef.current = vy;
    }, []);

    const clearVelocity = useCallback(() => {
        velXRef.current = 0;
        velYRef.current = 0;
    }, []);

    const animateTo = useCallback((rx, ry) => {
        targetRot.current = { rx, ry };
    }, []);

    // Animation loop — runs continuously, drives spin and transitions
    useEffect(() => {
        let running = true;
        const tick = () => {
            if (!running) return;
            frameRef.current++;

            if (targetRot.current) {
                const { rx, ry } = targetRot.current;
                const dx = rx - rotXRef.current, dy = ry - rotYRef.current;
                if (Math.abs(dx) < 0.003 && Math.abs(dy) < 0.003) {
                    rotXRef.current = rx;
                    rotYRef.current = ry;
                    targetRot.current = null;
                } else {
                    rotXRef.current += dx * 0.1;
                    rotYRef.current += dy * 0.1;
                }
            } else if (Math.abs(velXRef.current) > VEL_EPSILON || Math.abs(velYRef.current) > VEL_EPSILON) {
                // Apply momentum
                rotXRef.current = clamp(rotXRef.current + velXRef.current, -1.2, 1.2);
                rotYRef.current += velYRef.current;
                velXRef.current *= FRICTION;
                velYRef.current *= FRICTION;
                // Snap to zero when negligible
                if (Math.abs(velXRef.current) <= VEL_EPSILON) velXRef.current = 0;
                if (Math.abs(velYRef.current) <= VEL_EPSILON) velYRef.current = 0;
            } else if (autoSpinRef.current) {
                rotYRef.current += 0.003;
            }

            // Notify the draw loop
            if (onFrameRef.current) onFrameRef.current(frameRef.current);

            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        return () => { running = false; };
    }, []);

    return {
        getRotX, getRotY, getFrame,
        setRotX, setRotY, animateTo,
        setVelocity, clearVelocity,
        rotXRef, rotYRef, frameRef,
        onFrameRef,
    };
}

/**
 * Keyboard shortcut handler.
 * Extracted so the main component doesn't re-bind on every state change.
 */
export function useKeyboard({
    rotXRef, rotYRef, setRotX, setRotY,
    handleSelectView, viewPresets,
    setSelected, setInfoAxis, setCompareList,
    setGuides, setProjLines, setAutoSpin, setZoom,
    setPanX, setPanY,
}) {
    useEffect(() => {
        const handler = e => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
            const k = e.key;
            if (k === "1") { e.preventDefault(); handleSelectView(viewPresets[0]); }
            else if (k === "2") { e.preventDefault(); handleSelectView(viewPresets[1]); }
            else if (k === "3") { e.preventDefault(); handleSelectView(viewPresets[2]); }
            else if (k === "4") { e.preventDefault(); handleSelectView(viewPresets[3]); }
            else if (k === "Escape") { setSelected(null); setInfoAxis(null); setCompareList([]); }
            else if (k === "Home") { e.preventDefault(); setPanX(0); setPanY(0); }
            else if (k === "g") setGuides(p => !p);
            else if (k === "p") setProjLines(p => !p);
            else if (k === "s") setAutoSpin(p => !p);
            else if (k === "=" || k === "+") { e.preventDefault(); setZoom(p => clamp(p + 0.15, 0.4, 3.0)); }
            else if (k === "-") { e.preventDefault(); setZoom(p => clamp(p - 0.15, 0.4, 3.0)); }
            else if (k === "ArrowLeft") { e.preventDefault(); setAutoSpin(false); setRotY(rotYRef.current - 0.1); }
            else if (k === "ArrowRight") { e.preventDefault(); setAutoSpin(false); setRotY(rotYRef.current + 0.1); }
            else if (k === "ArrowUp") { e.preventDefault(); setAutoSpin(false); setRotX(clamp(rotXRef.current - 0.1, -1.2, 1.2)); }
            else if (k === "ArrowDown") { e.preventDefault(); setAutoSpin(false); setRotX(clamp(rotXRef.current + 0.1, -1.2, 1.2)); }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [rotXRef, rotYRef, setRotX, setRotY, handleSelectView, viewPresets, setSelected, setInfoAxis, setCompareList, setGuides, setProjLines, setAutoSpin, setZoom, setPanX, setPanY]);
}

/**
 * Canvas resize and DPR management.
 */
export function useCanvasResize(wrapRef, setCSize) {
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            if (width > 0 && height > 0) setCSize({ w: width, h: height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [wrapRef, setCSize]);
}

/**
 * Pointer drag handler using refs to avoid re-render-per-pixel.
 *
 * CAD-style navigation:
 *   LMB drag        → Orbit (rotate)
 *   MMB drag        → Orbit (rotate)  — standard CAD middle-click orbit
 *   Shift + LMB     → Pan (translate view)
 *   Shift + MMB     → Pan (translate view)
 *   Scroll           → Zoom
 *   LMB click (no drag) → Select / hit-test
 *
 * BUG FIX: `last` position is now a ref instead of state.
 * BUG FIX: `drag` is now a ref — no more stale closure on rapid moves.
 */
export function useDrag({
    canvasRef, rotXRef, rotYRef, setRotX, setRotY,
    panXRef, panYRef, setPanX, setPanY,
    setAutoSpin, setActiveView, setActivePlane,
    onHitTest, onSelect, isMobileRef,
    targetRotRef, markInteracted,
    setHovered, setZoom,
    setVelocity, clearVelocity,
}) {
    const dragRef = useRef(false);       // "orbit" | "pan" | false
    const lastRef = useRef({ x: 0, y: 0 });
    const pinchDistRef = useRef(null);
    const pinchMidRef = useRef(null);     // midpoint tracking for 2-finger pan
    const downPosRef = useRef({ x: 0, y: 0 }); // to detect click vs drag
    const activePointersRef = useRef(new Set()); // track multi-touch
    const capturedPointerRef = useRef(null);     // pointer capture id

    // Track recent velocities for momentum on release
    const recentDeltasRef = useRef([]);  // [{dx,dy,t}]
    const VELOCITY_WINDOW = 80; // ms — only use deltas from last N ms

    const getPos = (e) => e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };

    const onDown = useCallback((e) => {
        // Track active pointers for multi-touch coordination
        if (e.pointerId != null) activePointersRef.current.add(e.pointerId);
        // If multi-touch, cancel single-finger drag — touch events handle it
        if (activePointersRef.current.size >= 2) { dragRef.current = false; return; }

        markInteracted();
        const pt = getPos(e);
        const button = e.button ?? 0; // 0=LMB, 1=MMB, 2=RMB

        // Right click — ignore (browser context menu)
        if (button === 2) return;

        // For LMB without shift, first check hit-test (select)
        if (button === 0 && !e.shiftKey) {
            const hit = onHitTest(pt.x, pt.y);
            if (hit) {
                onSelect(hit);
                setAutoSpin(false);
                return;
            }
        }

        // Determine drag mode
        const isPan = e.shiftKey; // Shift+any button = pan
        dragRef.current = isPan ? "pan" : "orbit";
        lastRef.current = pt;
        downPosRef.current = pt;
        recentDeltasRef.current = [];
        setAutoSpin(false);
        if (clearVelocity) clearVelocity(); // stop any existing momentum

        // Capture pointer so drag continues even when cursor leaves the canvas/window
        if (e.pointerId != null && canvasRef.current) {
            try {
                canvasRef.current.setPointerCapture(e.pointerId);
                capturedPointerRef.current = e.pointerId;
            } catch (_) { /* some browsers may reject */ }
        }
    }, [onHitTest, onSelect, setAutoSpin, markInteracted, clearVelocity, canvasRef]);

    const onMove = useCallback((e) => {
        // Multi-touch handled by touch events, not pointer events
        if (activePointersRef.current.size >= 2) return;
        if (dragRef.current) {
            const pt = getPos(e);
            const dx = pt.x - lastRef.current.x;
            const dy = pt.y - lastRef.current.y;

            if (dragRef.current === "pan") {
                // Pan: translate the view center
                setPanX(panXRef.current + dx);
                setPanY(panYRef.current + dy);
            } else {
                // Orbit: rotate view
                setRotX(clamp(rotXRef.current + dy * 0.008, -1.2, 1.2));
                setRotY(rotYRef.current + dx * 0.008);
                setActiveView("3D");
                setActivePlane(null);
                if (targetRotRef) targetRotRef.current = null;

                // Record delta for momentum calculation
                recentDeltasRef.current.push({ dx: dx * 0.008, dy: dy * 0.008, t: performance.now() });
                // Prune old entries
                const now = performance.now();
                recentDeltasRef.current = recentDeltasRef.current.filter(d => now - d.t < VELOCITY_WINDOW);
            }

            lastRef.current = pt;
        } else if (!isMobileRef.current) {
            const pt = getPos(e);
            setHovered(onHitTest(pt.x, pt.y));
        }
    }, [rotXRef, rotYRef, setRotX, setRotY, panXRef, panYRef, setPanX, setPanY, setActiveView, setActivePlane, onHitTest, isMobileRef, targetRotRef, setHovered]);

    const onUp = useCallback((e) => {
        const wasDragging = dragRef.current;
        if (e && e.pointerId != null) activePointersRef.current.delete(e.pointerId);

        // Release pointer capture
        if (capturedPointerRef.current != null && canvasRef.current) {
            try {
                canvasRef.current.releasePointerCapture(capturedPointerRef.current);
            } catch (_) { /* ignore */ }
            capturedPointerRef.current = null;
        }

        // Kick off inertia if we were orbiting
        if (wasDragging === "orbit" && setVelocity) {
            const now = performance.now();
            const recent = recentDeltasRef.current.filter(d => now - d.t < VELOCITY_WINDOW);
            if (recent.length >= 2) {
                // Average velocity over the recent window
                let sumDx = 0, sumDy = 0;
                for (const d of recent) { sumDx += d.dx; sumDy += d.dy; }
                setVelocity(sumDy / recent.length, sumDx / recent.length);
            }
        }
        recentDeltasRef.current = [];

        dragRef.current = false;
        pinchDistRef.current = null;
        pinchMidRef.current = null;
    }, [canvasRef, setVelocity]);

    const onLeave = useCallback((e) => {
        // If we have pointer capture active, do NOT kill the drag —
        // we're still tracking the pointer outside the canvas.
        if (capturedPointerRef.current != null) {
            setHovered(null);
            return;
        }
        if (e && e.pointerId != null) activePointersRef.current.delete(e.pointerId);
        dragRef.current = false;
        setHovered(null);
    }, [setHovered]);

    // Wheel zoom
    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const handler = (e) => {
            e.preventDefault();
            setZoom(prev => clamp(prev + (e.deltaY > 0 ? -0.08 : 0.08), 0.4, 3.0));
        };
        cv.addEventListener("wheel", handler, { passive: false });
        return () => cv.removeEventListener("wheel", handler);
    }, [canvasRef, setZoom]);

    // --- Multi-touch: pinch-to-zoom + two-finger pan ---
    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;

        const onTouchStart = (e) => {
            if (e.touches.length >= 2) {
                e.preventDefault();
                // Cancel any single-finger orbit
                dragRef.current = false;
                markInteracted();
                setAutoSpin(false);

                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                pinchDistRef.current = Math.sqrt(dx * dx + dy * dy);
                pinchMidRef.current = {
                    x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                    y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
                };
            }
        };

        const onTouchMove = (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                // Pinch zoom (change in finger distance)
                if (pinchDistRef.current !== null) {
                    const delta = dist - pinchDistRef.current;
                    setZoom(prev => clamp(prev + delta * 0.005, 0.4, 3.0));
                }
                pinchDistRef.current = dist;

                // Two-finger pan (change in midpoint)
                if (pinchMidRef.current !== null) {
                    const panDx = midX - pinchMidRef.current.x;
                    const panDy = midY - pinchMidRef.current.y;
                    setPanX(panXRef.current + panDx);
                    setPanY(panYRef.current + panDy);
                }
                pinchMidRef.current = { x: midX, y: midY };
            }
        };

        const onTouchEnd = (e) => {
            if (e.touches.length < 2) {
                pinchDistRef.current = null;
                pinchMidRef.current = null;
            }
        };

        cv.addEventListener("touchstart", onTouchStart, { passive: false });
        cv.addEventListener("touchmove", onTouchMove, { passive: false });
        cv.addEventListener("touchend", onTouchEnd);
        return () => {
            cv.removeEventListener("touchstart", onTouchStart);
            cv.removeEventListener("touchmove", onTouchMove);
            cv.removeEventListener("touchend", onTouchEnd);
        };
    }, [canvasRef, setZoom, panXRef, panYRef, setPanX, setPanY, markInteracted, setAutoSpin]);

    return { dragRef, onDown, onMove, onUp, onLeave };
}
