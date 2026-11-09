"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { clamp } from "@/lib/utils";
import { stepSpiderPhysics } from "./spider-physics";

export function useSpiderScene() {
  const root = useRef(null);
  const character = useRef(null);
  const bounce = useRef(null);
  const stringPath = useRef(null);
  const stringGlow = useRef(null);
  const flash = useRef(null);
  const finePointer = useRef(false);
  const reducedMotion = useRef(false);
  const visible = useRef(true);
  const physics = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
    targetX: 0,
    targetY: 0,
    lastMove: 0,
  });

  const swing = useCallback(() => {
    const state = physics.current;
    const direction = Math.random() > 0.5 ? 1 : -1;
    state.vx += direction * (95 + Math.random() * 70);
    state.vy -= 20;
    state.lastMove = performance.now();

    if (!bounce.current || !flash.current) return;

    gsap.killTweensOf([bounce.current, flash.current]);
    gsap.fromTo(
      bounce.current,
      { scale: 1 },
      {
        scale: 1.035,
        duration: 0.16,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
        svgOrigin: "320 250",
        overwrite: "auto",
      }
    );
    gsap.fromTo(
      flash.current,
      { opacity: 0.9, scale: 1 },
      {
        opacity: 0,
        scale: 2.6,
        duration: 0.85,
        ease: "power2.out",
        svgOrigin: "320 250",
        overwrite: "auto",
      }
    );
  }, []);

  useGSAP(
    () => {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      finePointer.current = window.matchMedia("(pointer: fine)").matches;
      const state = physics.current;

      if (reducedMotion.current) {
        state.y = 0;
        state.x = 0;
        character.current?.setAttribute(
          "transform",
          "translate(0 0) rotate(0 320 250)"
        );
        return;
      }

      state.y = -118;
      gsap.set(bounce.current, { opacity: 0 });

      const timeline = gsap.timeline();
      timeline
        .fromTo(
          root.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.1, ease: "power2.out" }
        )
        .fromTo(
          stringPath.current,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.45, ease: "power2.inOut" },
          0.05
        )
        .to(
          bounce.current,
          { opacity: 1, duration: 1.15, ease: "power2.out" },
          0.3
        )
        .fromTo(
          "[data-scene-ui]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          0.9
        )
        .add(() => {
          state.vx += 46;
        }, 1.55);

      return () => {
        timeline.kill();
      };
    },
    { scope: root }
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mediaQuery.matches;
    finePointer.current = window.matchMedia("(pointer: fine)").matches;

    const onPointerMove = (event) => {
      if (!root.current || !finePointer.current || reducedMotion.current) {
        return;
      }
      const rect = root.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.45;
      physics.current.targetX = clamp(
        (event.clientX - centerX) / (rect.width * 0.52),
        -1,
        1
      );
      physics.current.targetY = clamp(
        (event.clientY - centerY) / (rect.height * 0.65),
        -1,
        1
      );
      physics.current.lastMove = performance.now();
    };

    if (finePointer.current && !reducedMotion.current) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    if (root.current) observer.observe(root.current);

    if (reducedMotion.current) {
      character.current?.setAttribute(
        "transform",
        "translate(0 0) rotate(0 320 250)"
      );
      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
      };
    }

    const tick = () => {
      if (!visible.current || !character.current) return;
      const dt = clamp(gsap.ticker.deltaRatio(60) / 60, 0.001, 0.033);
      stepSpiderPhysics({
        character: character.current,
        stringPath: stringPath.current,
        stringGlow: stringGlow.current,
        state: physics.current,
        finePointer: finePointer.current,
        now: performance.now(),
        dt,
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return {
    root,
    character,
    bounce,
    stringPath,
    stringGlow,
    flash,
    swing,
  };
}
