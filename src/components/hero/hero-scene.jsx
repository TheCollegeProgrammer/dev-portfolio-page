"use client";

import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroSceneArt } from "./hero-scene-art";
import { useSpiderScene } from "./use-spider-scene";

export function HeroScene({ className }) {
  const {
    root,
    character,
    bounce,
    stringPath,
    stringGlow,
    flash,
    swing,
  } = useSpiderScene();

  return (
    <div
      ref={root}
      className={cn(
        "relative isolate h-full w-full select-none",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_55%_45%,rgba(230,36,41,0.16),transparent_72%)]"
        aria-hidden="true"
      />

      <HeroSceneArt
        characterRef={character}
        bounceRef={bounce}
        stringPathRef={stringPath}
        stringGlowRef={stringGlow}
        flashRef={flash}
        onSwing={swing}
      />

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
