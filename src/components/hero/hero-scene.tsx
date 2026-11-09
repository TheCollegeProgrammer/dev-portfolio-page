"use client";

import { useCallback, useEffect, useRef } from "react";
import { MousePointer2 } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { clamp, cn } from "@/lib/utils";

import { SpiderCharacterArt } from "./spider-character";

type HeroSceneProps = {
  className?: string;
};

type PhysicsState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  targetX: number;
  targetY: number;
  lastMove: number;
};

const spokes = Array.from({ length: 14 }, (_, index) => index);
const rings = [90, 150, 210, 270, 330];

export function HeroScene({ className }: HeroSceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const character = useRef<SVGGElement>(null);
  const bounce = useRef<SVGGElement>(null);
  const stringPath = useRef<SVGPathElement>(null);
  const stringGlow = useRef<SVGPathElement>(null);
  const flash = useRef<SVGCircleElement>(null);
  const finePointer = useRef(false);
  const reducedMotion = useRef(false);
  const visible = useRef(true);

  const physics = useRef<PhysicsState>({
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
      },
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
      },
    );
  }, []);

  useGSAP(
    () => {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      finePointer.current = window.matchMedia("(pointer: fine)").matches;

      const state = physics.current;

      if (reducedMotion.current) {
        state.y = 0;
        state.x = 0;
        character.current?.setAttribute(
          "transform",
          "translate(0 0) rotate(0 320 250)",
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
          { opacity: 1, duration: 1.1, ease: "power2.out" },
        )
        .fromTo(
          stringPath.current,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.45,
            ease: "power2.inOut",
          },
          0.05,
        )
        .to(
          bounce.current,
          { opacity: 1, duration: 1.15, ease: "power2.out" },
          0.3,
        )
        .fromTo(
          "[data-scene-ui]",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.9,
        )
        .add(() => {
          state.vx += 46;
        }, 1.55);

      return () => {
        timeline.kill();
      };
    },
    { scope: root },
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mediaQuery.matches;
    finePointer.current = window.matchMedia("(pointer: fine)").matches;

    const onPointerMove = (event: PointerEvent) => {
      if (!root.current || !finePointer.current || reducedMotion.current) {
        return;
      }

      const rect = root.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.45;

      physics.current.targetX = clamp(
        (event.clientX - centerX) / (rect.width * 0.52),
        -1,
        1,
      );
      physics.current.targetY = clamp(
        (event.clientY - centerY) / (rect.height * 0.65),
        -1,
        1,
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
      { threshold: 0.02 },
    );

    if (root.current) observer.observe(root.current);

    if (reducedMotion.current) {
      character.current?.setAttribute(
        "transform",
        "translate(0 0) rotate(0 320 250)",
      );
      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
      };
    }

    const tick = () => {
      if (!visible.current || !character.current) return;

      const state = physics.current;
      const now = performance.now();
      const dt = clamp(gsap.ticker.deltaRatio(60) / 60, 0.001, 0.033);
      const idleFor = now - state.lastMove;
      const influence =
        finePointer.current && !reducedMotion.current
          ? clamp(1 - (idleFor - 500) / 1400, 0, 1)
          : 0;
      const idleSway = finePointer.current
        ? 0
        : Math.sin(now * 0.00105) * 9 + Math.sin(now * 0.00043) * 3;

      const targetX = state.targetX * 58 * influence + idleSway;
      const targetY = state.targetY * 10 * influence;

      const stiffness = 23;
      const damping = 4;
      const rotationStiffness = 32;
      const rotationDamping = 6.2;

      state.vx += (stiffness * (targetX - state.x) - damping * state.vx) * dt;
      state.x += state.vx * dt;

      if (Math.abs(state.x) > 74) {
        state.x = clamp(state.x, -74, 74);
        state.vx *= -0.38;
      }

      state.vy += (20 * (targetY - state.y) - 4.5 * state.vy) * dt;
      state.y += state.vy * dt;

      if (Math.abs(state.y) > 34) {
        state.y = clamp(state.y, -34, 34);
        state.vy *= -0.35;
      }

      const targetRotation = state.x * 0.082 + state.vx * 0.016;
      state.vrot +=
        (rotationStiffness * (targetRotation - state.rot) -
          rotationDamping * state.vrot) *
        dt;
      state.rot += state.vrot * dt;

      if (Math.abs(state.rot) > 8.5) {
        state.rot = clamp(state.rot, -8.5, 8.5);
        state.vrot *= -0.4;
      }

      const cx = 320 + state.x;
      const cy = 250 + state.y;

      character.current.setAttribute(
        "transform",
        `translate(${state.x} ${state.y}) rotate(${state.rot} 320 250)`,
      );

      const bend = clamp(state.vx * 0.36, -44, 44);
      const segment = (cy + 18) / 3;
      const d = `M 320 -18 C 320 ${-18 + segment}, ${320 + bend} ${
        -18 + segment * 2
      }, ${cx} ${cy}`;

      stringPath.current?.setAttribute("d", d);
      stringGlow.current?.setAttribute("d", d);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={root}
      className={cn("relative isolate h-full w-full select-none", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_55%_45%,rgba(230,36,41,0.16),transparent_72%)]"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 640 900"
        preserveAspectRatio="xMidYMin meet"
        className="relative h-full w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="scene-aura" cx="0" cy="0" r="1">
            <stop offset="0" stopColor="#E62429" stopOpacity="0.34" />
            <stop offset="0.55" stopColor="#941B24" stopOpacity="0.12" />
            <stop offset="1" stopColor="#08090D" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="scene-string"
            x1="320"
            y1="-20"
            x2="320"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F5F5F5" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#F5F5F5" stopOpacity="0.55" />
            <stop offset="1" stopColor="#E62429" stopOpacity="0.8" />
          </linearGradient>
          <filter id="scene-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter
            id="scene-soft-glow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="320"
          cy="440"
          rx="235"
          ry="310"
          fill="url(#scene-aura)"
          filter="url(#scene-blur)"
          opacity="0.7"
        />

        <g stroke="#E62429" fill="none" opacity="0.13">
          {spokes.map((spoke) => {
            const angle = (spoke * Math.PI * 2) / 14;
            return (
              <line
                key={`spoke-${spoke}`}
                x1="320"
                y1="380"
                x2={320 + Math.cos(angle) * 360}
                y2={380 + Math.sin(angle) * 360}
                strokeWidth="0.7"
              />
            );
          })}
          {rings.map((radius, index) => (
            <circle
              key={`ring-${radius}`}
              cx="320"
              cy="380"
              r={radius}
              strokeDasharray={`1 ${9 + index * 2}`}
              opacity={0.4 + index * 0.07}
            />
          ))}
        </g>

        <g stroke="#F5F5F5" opacity="0.2">
          <circle cx="140" cy="250" r="1.2" fill="#F5F5F5" />
          <circle cx="530" cy="320" r="1" fill="#F5F5F5" />
          <circle cx="500" cy="180" r="1.3" fill="#E62429" />
          <circle cx="120" cy="470" r="1" fill="#F5F5F5" />
          <circle cx="560" cy="620" r="1.2" fill="#F5F5F5" />
        </g>

        <g
          stroke="#F5F5F5"
          strokeWidth="1"
          opacity="0.5"
          filter="url(#scene-soft-glow)"
        >
          <path
            d="M320-16C320 40 320 140 320 244"
            stroke="#E62429"
            strokeWidth="4"
            opacity="0.12"
          />
          <path
            ref={stringGlow}
            d="M320-18C320 72 320 162 320 250"
            stroke="#E62429"
            strokeWidth="5"
            opacity="0.16"
            fill="none"
          />
          <path
            ref={stringPath}
            d="M320-18C320 72 320 162 320 250"
            stroke="url(#scene-string)"
            strokeWidth="1.4"
            fill="none"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </g>

        <g>
          <circle
            cx="320"
            cy="6"
            r="11"
            fill="none"
            stroke="#E62429"
            strokeOpacity="0.35"
          />
          <circle cx="320" cy="6" r="4" fill="#E62429" />
          <circle cx="320" cy="6" r="10" fill="#E62429" opacity="0.12" />
          <path
            d="M320 6L296-6M320 6L344-6M320 6L304 26M320 6L336 26"
            stroke="#F5F5F5"
            strokeOpacity="0.18"
            strokeWidth="0.8"
          />
        </g>

        <circle
          ref={flash}
          cx="320"
          cy="250"
          r="18"
          fill="none"
          stroke="#E62429"
          strokeWidth="1.5"
          opacity="0"
        />

        <g ref={character} transform="translate(0 0) rotate(0 320 250)">
          <g ref={bounce}>
            <g
              transform="translate(320 250)"
              onPointerDown={swing}
              style={{ cursor: "pointer" }}
            >
              <SpiderCharacterArt />
            </g>
          </g>
        </g>
      </svg>

      <div
        data-scene-ui
        className="pointer-events-none absolute inset-x-0 bottom-1 flex items-end justify-between gap-4 px-1 sm:bottom-3"
      >
        <div className="font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.24em] text-muted/80">
          <span className="block text-brand">Fig. 01</span>
          <span>Suspension study</span>
        </div>
        <button
          type="button"
          onClick={swing}
          className="pointer-events-auto group flex items-center gap-2 rounded-full border border-line/80 bg-background/40 px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted backdrop-blur-sm transition-all duration-300 hover:border-brand/50 hover:text-ink"
          aria-label="Swing the hanging figure"
        >
          <MousePointer2 className="h-3 w-3 text-brand transition-transform duration-300 group-hover:-rotate-12" />
          Click to swing
        </button>
      </div>

      <div
        data-scene-ui
        className="pointer-events-none absolute right-0 top-24 hidden flex-col items-center gap-3 xl:flex"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-brand/50 to-transparent" />
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-muted/70 [writing-mode:vertical-rl]">
          Beyond the code — mmxxvi
        </span>
      </div>
    </div>
  );
}
