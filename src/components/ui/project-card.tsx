"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, MoveUpRight } from "lucide-react";

import { GithubIcon } from "@/components/ui/social-icons";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface/35 transition-all duration-500 hover:border-brand/30 hover:bg-surface/55">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 46vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090D]/70 via-transparent to-transparent opacity-70" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <span className="rounded-full border border-white/10 bg-background/50 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink/80 backdrop-blur-sm">
            {project.category}
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.22em] text-white/60">
            {project.index}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
          <div>
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-white/50">
              {project.year}
            </p>
            <p className="mt-1 font-display text-xs uppercase tracking-[0.18em] text-ink/70">
              {project.subtitle}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-background/40 text-ink/70 backdrop-blur-sm transition-all duration-300 group-hover/card:border-brand/50 group-hover/card:text-brand">
            <MoveUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[clamp(1.55rem,3.2vw,2.2rem)] font-medium uppercase leading-none tracking-[-0.02em] text-ink">
            {project.title}
          </h3>
          <span className="mt-1 hidden font-mono text-[0.52rem] uppercase tracking-[0.2em] text-muted/40 sm:block">
            {project.category}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted/85">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted/75"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-5">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="group/button inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
          >
            {expanded ? "Close details" : "Project details"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-brand transition-transform duration-300",
                expanded && "rotate-180",
              )}
            />
          </button>

          <div className="flex items-center gap-4">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Source
              </a>
            ) : null}
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                Live
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>

        <div
          id={panelId}
          className={cn(
            "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            expanded
              ? "mt-5 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="rounded-md border border-line/80 bg-background/40 p-5">
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-brand/80">
                Overview
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted/85">
                {project.overview}
              </p>

              <p className="mt-5 font-mono text-[0.52rem] uppercase tracking-[0.24em] text-brand/80">
                What it covers
              </p>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[0.78rem] leading-relaxed text-muted/80"
                  >
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand/80" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-brand transition-colors hover:bg-brand/20"
                >
                  Visit live project
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <p className="mt-6 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-muted/50">
                  Research build · code available on GitHub
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
