"use client";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { milestones } from "@/lib/data/journey";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
export function Journey() {
    const root = useRef(null);
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const line = root.current?.querySelector("[data-timeline-line]");
            if (line) {
                const lineTween = gsap.fromTo(line, { scaleY: 0 }, {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top 72%",
                        end: "bottom 62%",
                        scrub: 0.4,
                    },
                });
                ScrollTrigger.refresh();
                return () => {
                    lineTween.scrollTrigger?.kill();
                    lineTween.kill();
                };
            }
        });
        return () => mm.revert();
    }, { scope: root });
    return (<section id="journey" className="section-shell overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-20 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-brand/[0.05] blur-[130px]"/>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
      </div>

      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="04" label="Journey" title={"The\njourney."} className="max-w-2xl"/>
          <Reveal className="lg:pb-3">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A timeline of the parts that actually happened — no invented
              awards, no borrowed milestones.
            </p>
          </Reveal>
        </div>

        <div ref={root} className="relative mt-16 lg:mt-24">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/[0.08] md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
            <div data-timeline-line className="h-full w-full origin-top bg-gradient-to-b from-brand via-brand/50 to-brand/10"/>
          </div>

          <ol className="relative">
            {milestones.map((milestone, index) => (<li key={`${milestone.year}-${milestone.title}`} data-milestone className="relative pb-12 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-0 md:pb-16 md:pl-0">
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-brand/60 bg-background md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
                  <span className={cn("h-1.5 w-1.5 rounded-full", index === milestones.length - 1
                ? "animate-pulse-soft bg-brand"
                : "bg-brand/70")}/>
                </span>

                <div className={cn("group rounded-md border border-line bg-surface/35 p-5 transition-all duration-500 hover:border-brand/30 hover:bg-surface/55 sm:p-6", index % 2 === 0
                ? "md:col-start-1 md:mr-12"
                : "md:col-start-2 md:ml-12")}>
                  <div className={cn("flex items-center justify-between gap-4", index % 2 === 0 && "md:flex-row-reverse")}>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brand">
                      {milestone.year}
                    </span>
                    <span className="h-px flex-1 bg-white/[0.07]"/>
                    <span className="font-mono text-[0.52rem] tracking-[0.2em] text-muted/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={cn("mt-4 font-display text-lg font-medium uppercase tracking-[0.01em] text-ink sm:text-xl", index % 2 === 0 && "md:text-right")}>
                    {milestone.title}
                  </h3>
                  <p className={cn("mt-3 text-[0.82rem] leading-relaxed text-muted/80", index % 2 === 0 && "md:text-right")}>
                    {milestone.description}
                  </p>

                  <div className={cn("mt-4 flex flex-wrap gap-1.5", index % 2 === 0 && "md:justify-end")}>
                    {milestone.tags.map((tag) => (<span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-muted/65">
                        {tag}
                      </span>))}
                  </div>
                </div>
              </li>))}
          </ol>
        </div>
      </div>
    </section>);
}
