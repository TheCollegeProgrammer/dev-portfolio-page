"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";

import { WebCorner } from "@/components/art/web-patterns";
import { HeroScene } from "@/components/hero/hero-scene";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Email",
    href: siteConfig.socials.email,
    icon: Mail,
    external: false,
  },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.15,
        });

        timeline
          .fromTo(
            "[data-hero-eyebrow]",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
          )
          .fromTo(
            "[data-hero-line]",
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.15,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.35",
          )
          .fromTo(
            "[data-hero-role]",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75 },
            "-=0.65",
          )
          .fromTo(
            "[data-hero-copy]",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.6",
          )
          .fromTo(
            "[data-hero-cta]",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.09 },
            "-=0.5",
          )
          .fromTo(
            "[data-hero-social]",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.45",
          )
          .fromTo(
            "[data-hero-meta]",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.5",
          );

        const webTween = gsap.to("[data-hero-web]", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        const glowTween = gsap.to("[data-hero-glow]", {
          yPercent: 24,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        return () => {
          timeline.kill();
          webTween.scrollTrigger?.kill();
          webTween.kill();
          glowTween.scrollTrigger?.kill();
          glowTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          data-hero-glow
          className="absolute -right-[10%] top-[10%] h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(230,36,41,0.17),rgba(148,27,36,0.06)_42%,transparent_68%)] blur-2xl"
        />
        <div
          className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
        />
        <div
          data-hero-web
          className="absolute -right-32 -top-24 text-white/25 sm:-right-20 sm:-top-10"
        >
          <WebCorner className="h-[34rem] w-[34rem] rotate-180 sm:h-[44rem] sm:w-[44rem]" />
        </div>
        <div className="absolute left-[6%] top-0 h-40 w-px bg-gradient-to-b from-brand/60 to-transparent" />
        <div className="absolute left-[6%] top-40 h-1 w-1 rounded-full bg-brand" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-page relative flex min-h-[100svh] flex-col lg:block">
        <div className="relative z-10 flex flex-1 flex-col justify-center pb-2 pt-28 sm:pt-32 lg:w-[55%] lg:pb-28 lg:pt-40">
          <div
            data-hero-eyebrow
            className="flex items-center gap-3 opacity-0"
          >
            <span className="h-px w-9 bg-brand" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-brand">
              Hello, I&apos;m Devansh.
            </span>
          </div>

          <h1 className="mt-6 font-display uppercase">
            <span className="block overflow-hidden pb-2">
              <span
                data-hero-line
                className="block whitespace-nowrap text-[clamp(3.3rem,10.5vw,8.75rem)] font-medium leading-[0.82] tracking-[-0.055em] text-ink"
              >
                Devansh
              </span>
            </span>
            <span className="mt-2 block overflow-hidden pb-1">
              <span
                data-hero-line
                className="text-stroke block whitespace-nowrap pb-1 text-[clamp(1.55rem,4.6vw,4rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              >
                Beyond the code.
              </span>
            </span>
          </h1>

          <div
            data-hero-role
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted opacity-0 sm:text-[0.68rem]"
          >
            <span>Full-Stack Developer</span>
            <span className="text-brand">/</span>
            <span>AI Enthusiast</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="hidden text-muted/60 sm:inline">
              Nagpur, IN
            </span>
          </div>

          <p
            data-hero-copy
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-muted opacity-0 sm:text-lg"
          >
            I build digital experiences, explore emerging technologies, and
            turn ambitious ideas into{" "}
            <span className="text-ink/90">working products.</span>
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              data-hero-cta
              href="#projects"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#projects", -88);
              }}
              className={buttonVariants({ size: "lg" })}
            >
              Explore My Work
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              data-hero-cta
              href={siteConfig.resume}
              download="Devansh-Avchat-Resume.pdf"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Download Resume
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <div
            data-hero-social
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 opacity-0"
          >
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-muted/70">
              Find me
            </span>
            <span className="h-px w-6 bg-line" />
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
                >
                  <Icon className="h-3.5 w-3.5 text-muted/70 transition-colors group-hover:text-brand" />
                  {social.label}
                  <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              );
            })}
          </div>

          <div
            data-hero-meta
            className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-line/70 pt-5 opacity-0 sm:mt-12"
          >
            <div>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-muted/60">
                Education
              </span>
              <p className="mt-1.5 text-[0.8rem] text-ink/80">
                B.Tech CSE · AI &amp; DS
              </p>
            </div>
            <div>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-muted/60">
                Building since
              </span>
              <p className="mt-1.5 text-[0.8rem] text-ink/80">2024 / Present</p>
            </div>
          </div>

          <div className="mt-10 hidden items-center gap-3 lg:flex">
            <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
              <span className="h-1.5 w-1 animate-scroll-cue rounded-full bg-brand" />
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted/60">
              Scroll to explore
            </span>
          </div>
        </div>

        <div className="relative z-0 h-[58svh] min-h-[430px] w-full pb-2 sm:min-h-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[50%] lg:min-h-0 lg:pb-14 lg:pt-8">
          <HeroScene className="h-full" />
        </div>
      </div>
    </section>
  );
}
