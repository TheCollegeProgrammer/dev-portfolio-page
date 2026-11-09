import { ArrowUpRight } from "lucide-react";

import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon } from "@/components/ui/social-icons";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export function Projects() {
  return (
    <section id="projects" className="section-shell overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-[12%] top-20 h-[26rem] w-[26rem] rounded-full bg-brand/[0.05] blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="02"
            label="Projects"
            title={"Selected\nwork."}
            className="max-w-3xl"
          />
          <Reveal className="lg:pb-3">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <p className="max-w-xs text-sm leading-relaxed text-muted lg:text-right">
                Four builds spanning full-stack products, applied AI, and data.
                Each one taught me something the last one couldn&apos;t.
              </p>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                All repositories
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06} y={34}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line/70 pt-6 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted/50">
              Selected builds / 2024 — 2026
            </p>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted/50">
              More experiments live on GitHub
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
