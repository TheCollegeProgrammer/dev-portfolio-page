"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/ui/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

import { useSmoothScroll } from "./smooth-scroll";

export function Navbar() {
  const { scrollTo, stop, start } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-38% 0px -52% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    stop();
    const timer = window.setTimeout(() => firstLinkRef.current?.focus(), 120);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, start, stop]);

  useEffect(() => {
    if (!open || !menuRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-menu-panel]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "power4.inOut",
        },
      );
      gsap.fromTo(
        "[data-menu-item]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          delay: 0.18,
          ease: "power3.out",
        },
      );
    }, menuRef);

    return () => ctx.revert();
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    setActive(id);
    scrollTo(`#${id}`, -88);
  };

  const onNavClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      goTo(id);
    };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-background/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <a
            href="#home"
            onClick={onNavClick("home")}
            className="group flex items-center gap-3"
            aria-label="Devansh — back to top"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.025] transition-colors duration-300 group-hover:border-brand/60">
              <BrandMark className="h-6 w-6 text-ink transition-transform duration-500 group-hover:-rotate-12" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-ink">
                Devansh
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted">
                Portfolio / 26
              </span>
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onNavClick(item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300",
                  active === item.id
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand transition-all duration-300",
                    active === item.id
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available
            </span>
            <a
              href="#contact"
              onClick={onNavClick("contact")}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.025] text-ink transition-colors hover:border-brand/50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div
            data-menu-panel
            className="absolute inset-0 flex flex-col bg-background px-6 pb-10 pt-28"
          >
            <div className="flex flex-1 flex-col justify-center">
              <p
                data-menu-item
                className="mb-6 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-brand"
              >
                Navigate
              </p>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    ref={item.id === "home" ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={onNavClick(item.id)}
                    data-menu-item
                    aria-current={active === item.id ? "page" : undefined}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-line/60 py-4 font-display text-[clamp(2rem,8vw,3rem)] font-medium uppercase leading-none tracking-[-0.03em] transition-colors",
                      active === item.id
                        ? "text-brand"
                        : "text-ink hover:text-brand",
                    )}
                  >
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted">
                      {item.index}
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div
              data-menu-item
              className="mt-10 flex items-center justify-between border-t border-line pt-6"
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                {`Nagpur, IN · 21.14° N`}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-emerald-400">
                Available
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
