"use client";
import { createContext, useCallback, useContext, useEffect, useRef, } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
const SmoothScrollContext = createContext(null);
export function SmoothScroll({ children }) {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        let cancelled = false;
        import("lenis").then(({ default: Lenis }) => {
            if (cancelled)
                return;
            const lenis = new Lenis({
                autoRaf: false,
                duration: 1.05,
                smoothWheel: true,
                touchMultiplier: 1.35,
                wheelMultiplier: 0.95,
            });
            lenisRef.current = lenis;
            lenis.on("scroll", ScrollTrigger.update);
            const raf = (time) => {
                lenis.raf(time * 1000);
            };
            rafRef.current = raf;
            gsap.ticker.add(raf);
            gsap.ticker.lagSmoothing(0);
            requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        return () => {
            cancelled = true;
            if (rafRef.current) {
                gsap.ticker.remove(rafRef.current);
                rafRef.current = null;
            }
            lenisRef.current?.destroy();
            lenisRef.current = null;
            gsap.ticker.lagSmoothing(500, 33);
        };
    }, []);
    const scrollTo = useCallback((target, offset = 0) => {
        const lenis = lenisRef.current;
        if (lenis) {
            lenis.scrollTo(target, {
                offset,
                duration: 1.15,
                easing: (t) => 1 - Math.pow(1 - t, 4),
            });
            return;
        }
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const behavior = prefersReduced ? "auto" : "smooth";
        if (typeof target === "number") {
            window.scrollTo({ top: target + offset, behavior });
            return;
        }
        const element = typeof target === "string"
            ? document.querySelector(target)
            : target;
        if (!element)
            return;
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
    }, []);
    const stop = useCallback(() => {
        lenisRef.current?.stop();
    }, []);
    const start = useCallback(() => {
        lenisRef.current?.start();
    }, []);
    return (<SmoothScrollContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>);
}
export function useSmoothScroll() {
    const context = useContext(SmoothScrollContext);
    if (!context) {
        throw new Error("useSmoothScroll must be used within SmoothScroll");
    }
    return context;
}
