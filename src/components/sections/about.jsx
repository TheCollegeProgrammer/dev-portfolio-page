import { BrainCircuit, Code2, Compass, GraduationCap } from "lucide-react";
import { Crosshair, WebCorner } from "@/components/art/web-patterns";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";
const infoCards = [
    {
        icon: GraduationCap,
        label: "Education",
        value: siteConfig.education.degree,
        meta: `${siteConfig.education.institution} · ${siteConfig.education.period}`,
    },
    {
        icon: Code2,
        label: "Focus",
        value: "Full-stack product engineering",
        meta: "React, Next.js, Node.js, data-backed interfaces",
    },
    {
        icon: BrainCircuit,
        label: "Exploring",
        value: "Applied AI & computer vision",
        meta: "Models that earn their place inside a product",
    },
    {
        icon: Compass,
        label: "Philosophy",
        value: "Build with intent. Ship with care.",
        meta: "Clarity over noise, depth over shortcuts",
    },
];
const interests = [
    "Full-stack architecture",
    "Applied AI",
    "Computer vision",
    "Product design",
    "Data storytelling",
];
export function About() {
    return (<section id="about" className="section-shell overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 top-24 h-[32rem] w-[32rem] rounded-full bg-brand/[0.06] blur-[130px]"/>
        <WebCorner className="-left-40 top-10 h-[34rem] w-[34rem] rotate-90 text-white/20"/>
        <div className="absolute right-[8%] top-1/3 hidden h-px w-40 bg-gradient-to-r from-brand/40 to-transparent lg:block"/>
      </div>

      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="01" label="About" title={"Behind\nthe code."} className="max-w-3xl"/>
          <Reveal className="shrink-0 lg:pb-3">
            <p className="max-w-xs font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.2em] text-muted/60">
              Developer / Student
              <br />
              Nagpur, India
              <br />
              21.1458° N · 79.0882° E
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="max-w-2xl text-balance font-display text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-ink/95">
                I&apos;m a developer interested in the space between how
                something works and{" "}
                <span className="text-brand">how it feels.</span>
              </p>
            </Reveal>

            <Reveal delay={0.08} className="grid gap-6 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                I&apos;m pursuing a B.Tech in Computer Science and Engineering
                (AI &amp; Data Science) at Ramdeobaba University, Nagpur. Most
                of my time goes into building full-stack products, testing ideas
                in machine learning, and learning what makes an interface
                genuinely useful.
              </p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                My work moves between the frontend, the API layer, and the data
                underneath. I like projects that force me to connect those
                layers — where a model, a database, and a carefully built screen
                have to work as one system.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative border-l border-brand/40 pl-6">
                <span className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-brand"/>
                <p className="font-display text-lg font-medium italic leading-relaxed text-ink/80 sm:text-xl">
                  &ldquo;Build with intent. Ship with care. Keep learning in
                  public.&rdquo;
                </p>
                <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted/60">
                  Working philosophy
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <p className="label-mono">Technical interests</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interests.map((interest) => (<span key={interest} className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-brand/40 hover:text-ink">
                      {interest}
                    </span>))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5">
            <Reveal y={36}>
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-md border border-line bg-surface">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(230,36,41,0.2),transparent_58%)]"/>
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"/>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 sm:h-56 sm:w-56">
                    <div className="absolute inset-5 rounded-full border border-brand/15"/>
                    <div className="absolute inset-10 rounded-full border border-white/[0.06]"/>
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.05]"/>
                    <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.05]"/>
                    <span className="relative font-display text-[6rem] font-medium leading-none text-ink/[0.08] sm:text-[7rem]">
                      D
                    </span>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.5rem] uppercase tracking-[0.32em] text-brand/80">
                      Self / 2026
                    </div>
                  </div>
                </div>

                <Crosshair className="absolute left-5 top-5 h-6 w-6 text-white/20"/>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-muted/60">
                      Portrait slot
                    </p>
                    <p className="mt-1 font-display text-sm font-medium uppercase tracking-[0.16em] text-ink/80">
                      Devansh Avchat
                    </p>
                  </div>
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted/40">
                    Replace in code
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {infoCards.map((card) => {
            const Icon = card.icon;
            return (<div key={card.label} className="group rounded-md border border-line bg-white/[0.015] p-5 transition-colors duration-300 hover:border-brand/30 hover:bg-white/[0.03]">
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5 text-brand/80"/>
                        <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted/60">
                          {card.label}
                        </span>
                      </div>
                      <p className="mt-3 text-[0.82rem] font-medium leading-snug text-ink/90">
                        {card.value}
                      </p>
                      <p className="mt-2 text-[0.72rem] leading-relaxed text-muted/70">
                        {card.meta}
                      </p>
                    </div>);
        })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>);
}
