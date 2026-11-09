import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { WebDivider } from "@/components/art/web-patterns";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/lib/site";

import { ContactForm } from "./contact-form";

const channels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.socials.email,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/TheCollegeProgrammer",
    href: siteConfig.socials.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/devansh-avchat",
    href: siteConfig.socials.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Resume",
    value: "Devansh Avchat — PDF",
    href: siteConfig.resume,
    icon: Download,
    external: false,
    download: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-shell overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-page">
        <SectionHeading
          index="05"
          label="Contact"
          title={"Let's build\nsomething."}
          description="Have a project in mind, a problem worth solving, or just want to compare notes on building with AI? The inbox is open."
          className="max-w-4xl"
        />

        <WebDivider className="mt-14 lg:mt-20" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col">
            <Reveal>
              <div className="flex items-start gap-3 rounded-md border border-line bg-surface/35 p-5">
                <span className="relative mt-1 flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {siteConfig.availability}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/60">
                    <MapPin className="h-3 w-3" />
                    {siteConfig.location} · Remote friendly
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 border-t border-line">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Reveal key={channel.label} delay={index * 0.05} y={20}>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={
                        channel.external ? "noreferrer noopener" : undefined
                      }
                      download={
                        channel.download
                          ? "Devansh-Avchat-Resume.pdf"
                          : undefined
                      }
                      className="group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors hover:border-brand/30"
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand/40 group-hover:text-brand">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[0.52rem] uppercase tracking-[0.22em] text-muted/60">
                            {channel.label}
                          </span>
                          <span className="mt-1 block truncate text-sm text-ink/85 transition-colors group-hover:text-ink">
                            {channel.value}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 rounded-md border border-dashed border-line bg-white/[0.01] p-5">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.22em] text-brand/80">
                  Good reasons to reach out
                </p>
                <ul className="mt-3 space-y-2 text-[0.8rem] leading-relaxed text-muted/75">
                  <li>— Full-stack builds and product collaborations</li>
                  <li>— AI / ML experiments that need a real interface</li>
                  <li>— Internships and early-career opportunities</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal y={36} delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
