import { BrainCircuit, Code2, Database, Server, Terminal, Wrench, } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillCategories } from "@/lib/data/skills";
const iconMap = {
    frontend: Code2,
    backend: Server,
    programming: Terminal,
    database: Database,
    ai: BrainCircuit,
    tools: Wrench,
};
export function Skills() {
    return (<section id="skills" className="section-shell overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
        <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/[0.05] blur-[120px]"/>
      </div>

      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="03" label="Skills" title={"My\ntoolkit."} className="max-w-2xl"/>
          <Reveal className="lg:pb-3">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              No percentages. No invented proficiency bars. Just the tools I
              reach for and the problems they help me solve.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (<Reveal key={category.title} delay={index * 0.05} y={26}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface/40 p-6 transition-all duration-500 hover:border-brand/30 hover:bg-surface sm:p-7">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl"/>
                  </div>

                  <div className="relative flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white/[0.02] text-muted transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                      <Icon className="h-4.5 w-4.5"/>
                    </span>
                    <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-xl font-medium uppercase tracking-[0.02em] text-ink">
                    {category.title}
                  </h3>
                  <p className="relative mt-2 text-[0.8rem] leading-relaxed text-muted/75">
                    {category.blurb}
                  </p>

                  <div className="relative mt-6 flex flex-wrap gap-1.5 border-t border-line/70 pt-5">
                    {category.skills.map((skill) => (<span key={skill} className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted/80 transition-colors duration-300 group-hover:border-white/10 group-hover:text-ink/80">
                        {skill}
                      </span>))}
                  </div>
                </div>
              </Reveal>);
        })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-md border border-dashed border-line bg-white/[0.01] px-6 py-5 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.2em] text-muted/60">
              Currently going deeper into
              <span className="text-ink/80"> system design</span> and
              <span className="text-ink/80"> applied machine learning</span>.
            </p>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-brand">
              Always learning
            </span>
          </div>
        </Reveal>
      </div>
    </section>);
}
