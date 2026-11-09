"use client";
import { ArrowUp, Mail } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { navigation, siteConfig } from "@/lib/site";
import { useSmoothScroll } from "./smooth-scroll";
export function Footer() {
    const { scrollTo } = useSmoothScroll();
    const socials = [
        { label: "GitHub", href: siteConfig.socials.github, icon: GithubIcon },
        { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedinIcon },
        { label: "Email", href: siteConfig.socials.email, icon: Mail },
    ];
    return (<footer className="relative overflow-hidden border-t border-line bg-surface/40">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-[120px]" aria-hidden="true"/>
      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <a href="#home" onClick={(event) => {
            event.preventDefault();
            scrollTo(0);
        }} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.025]">
                <BrandMark className="h-7 w-7 text-ink"/>
              </span>
              <span className="font-display text-base font-semibold uppercase tracking-[0.24em]">
                Devansh
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Full-stack developer and AI enthusiast, building thoughtful
              digital products from Nagpur, India.
            </p>

            <div className="mt-8 flex items-center gap-2">
              {socials.map((social) => {
            const Icon = social.icon;
            return (<a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined} aria-label={social.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-brand/50 hover:text-ink">
                    <Icon className="h-4 w-4"/>
                  </a>);
        })}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="label-mono">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {navigation.map((item) => (<li key={item.id}>
                  <a href={`#${item.id}`} onClick={(event) => {
                event.preventDefault();
                scrollTo(`#${item.id}`, -88);
            }} className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
                    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-4"/>
                    {item.label}
                  </a>
                </li>))}
            </ul>
          </nav>

          <div>
            <p className="label-mono">Reach out</p>
            <div className="mt-5 space-y-3 text-sm">
              <a href={siteConfig.socials.email} className="link-underline block break-all text-muted transition-colors hover:text-ink">
                {siteConfig.email}
              </a>
              <p className="text-muted">{siteConfig.location}</p>
            </div>
            <button type="button" onClick={() => scrollTo(0)} className="group mt-8 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink">
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand/60">
                <ArrowUp className="h-3.5 w-3.5"/>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <p className="font-display text-[clamp(1.9rem,6vw,5.2rem)] font-medium uppercase leading-[0.95] tracking-[-0.04em] text-ink/90">
            Beyond the code.
            <span className="block text-stroke text-ink/10">
              Building what&apos;s next.
            </span>
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.fullName}. All rights reserved.
          </p>
          <p>Designed &amp; built with intent / Nagpur, IN</p>
        </div>
      </div>
    </footer>);
}
