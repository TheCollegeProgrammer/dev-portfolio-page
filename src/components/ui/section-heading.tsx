"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);
  const lines = title.split("\n");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-heading-word]");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 86%",
            once: true,
          },
        });

        timeline
          .fromTo(
            "[data-heading-meta]",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          )
          .fromTo(
            words,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.95,
              stagger: 0.045,
              ease: "power4.out",
            },
            "-=0.4",
          );

        if (description) {
          timeline.fromTo(
            "[data-heading-copy]",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.55",
          );
        }

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          ScrollTrigger.refresh();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div
        data-heading-meta
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className="font-mono text-[0.7rem] tracking-[0.24em] text-brand">
          {index}
        </span>
        <span className="h-px w-8 bg-brand/50" />
        <span className="label-mono">{label}</span>
      </div>

      <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.045em] text-ink">
        {lines.map((line, lineIndex) => (
          <span
            key={`${line}-${lineIndex}`}
            className="block overflow-hidden pb-[0.08em]"
          >
            {line.split(" ").map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                data-heading-word
                className="mr-[0.22em] inline-block will-change-transform last:mr-0"
              >
                {word}
              </span>
            ))}
          </span>
        ))}
      </h2>

      {description ? (
        <p
          data-heading-copy
          className={cn(
            "mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
