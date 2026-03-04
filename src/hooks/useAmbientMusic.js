/**
 * Minecraft-style ambient music scheduler.
 *
 * Behaviour:
 *  - Waits for a user interaction (click/key/touch) before unlocking audio.
 *  - Plays the track at a quiet, randomised volume (0.06 – 0.14).
 *  - After each play, waits a long, random silence (45–180 s) before
 *    deciding whether to play again.
 *  - Fade-in over ~4 s at the start, fade-out over ~4 s at the end of
 *    each play cycle — so entries and exits feel subconscious.
 *  - The whole thing runs on refs so it never triggers React re-renders.
 */

import { useEffect, useRef } from "react";

const AUDIO_SRC = "/audio/Infinite Orbit Drift.mp3";

// Tunables
const BASE_VOLUME = 0.045;   // centre of the quiet range
const VOL_VARIANCE = 0.02;   // ± random variance around base
const FADE_MS = 8000;   // fade-in / fade-out duration
const FADE_STEPS = 80;     // granularity of volume ramp
const SILENCE_MIN_S = 45;     // minimum silence between plays (seconds)
const SILENCE_MAX_S = 180;    // maximum silence between plays (seconds)
const SKIP_CHANCE = 0.30;   // 30 % chance to skip a scheduled play → longer gap

export default function useAmbientMusic() {
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const fadingRef = useRef(null);
    const unmountedRef = useRef(false);

    useEffect(() => {
        unmountedRef.current = false;

        /* ---------- helpers ---------- */
        function randBetween(lo, hi) {
            return lo + Math.random() * (hi - lo);
        }

        function targetVolume() {
            return Math.max(0.02, Math.min(0.25, BASE_VOLUME + (Math.random() - 0.5) * 2 * VOL_VARIANCE));
        }

        function clearFade() {
            if (fadingRef.current) { clearInterval(fadingRef.current); fadingRef.current = null; }
        }

        function fadeVolume(audio, from, to, durationMs, onDone) {
            clearFade();
            const steps = FADE_STEPS;
            const stepMs = durationMs / steps;
            let i = 0;
            audio.volume = from;
            fadingRef.current = setInterval(() => {
                i++;
                const t = i / steps;
                // ease-in-out sine curve for smooth feel
                audio.volume = from + (to - from) * (0.5 - 0.5 * Math.cos(Math.PI * t));
                if (i >= steps) {
                    clearFade();
                    audio.volume = to;
                    if (onDone) onDone();
                }
            }, stepMs);
        }

        /* ---------- schedule logic ---------- */
        function scheduleNext() {
            if (unmountedRef.current) return;
            const silenceSec = randBetween(SILENCE_MIN_S, SILENCE_MAX_S);
            timerRef.current = setTimeout(() => {
                if (unmountedRef.current) return;
                // Random chance to skip entirely → extends silence
                if (Math.random() < SKIP_CHANCE) {
                    scheduleNext();
                    return;
                }
                play();
            }, silenceSec * 1000);
        }

        function play() {
            if (unmountedRef.current) return;
            const audio = audioRef.current;
            if (!audio) return;

            const vol = targetVolume();
            audio.currentTime = 0;
            audio.volume = 0;
            audio.play().then(() => {
                if (unmountedRef.current) { audio.pause(); return; }
                // Fade in
                fadeVolume(audio, 0, vol, FADE_MS);

                // Schedule fade-out near the end of the track
                const waitForFadeOut = Math.max(0, (audio.duration - FADE_MS / 1000) * 1000);
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                    if (unmountedRef.current) return;
                    fadeVolume(audio, audio.volume, 0, FADE_MS, () => {
                        audio.pause();
                        scheduleNext();
                    });
                }, waitForFadeOut);
            }).catch(() => {
                // Autoplay blocked — try again later
                scheduleNext();
            });
        }

        /* ---------- initialise ---------- */
        const audio = new Audio(AUDIO_SRC);
        audio.preload = "none";
        audio.volume = 0;
        audioRef.current = audio;

        // First play after a short initial silence (8–30 s) so it kicks in
        // gently after the user has been exploring for a bit.
        function startAfterInteraction() {
            const initialDelay = randBetween(8, 30) * 1000;
            timerRef.current = setTimeout(() => {
                if (!unmountedRef.current) play();
            }, initialDelay);
            // One-shot — remove all unlock listeners
            window.removeEventListener("click", startAfterInteraction);
            window.removeEventListener("keydown", startAfterInteraction);
            window.removeEventListener("touchstart", startAfterInteraction);
        }

        // Browsers require a user gesture to unlock audio
        window.addEventListener("click", startAfterInteraction);
        window.addEventListener("keydown", startAfterInteraction);
        window.addEventListener("touchstart", startAfterInteraction);

        /* ---------- cleanup ---------- */
        return () => {
            unmountedRef.current = true;
            clearFade();
            if (timerRef.current) clearTimeout(timerRef.current);
            window.removeEventListener("click", startAfterInteraction);
            window.removeEventListener("keydown", startAfterInteraction);
            window.removeEventListener("touchstart", startAfterInteraction);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);
}
