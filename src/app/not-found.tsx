import Link from "next/link";

import { BrandMark } from "@/components/ui/brand-mark";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(230,36,41,0.14),transparent_60%)]"
        aria-hidden="true"
      />
      <BrandMark className="relative h-14 w-14 text-ink" />
      <p className="relative mt-8 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand">
        Error 404
      </p>
      <h1 className="relative mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-medium uppercase leading-none tracking-[-0.04em]">
        Off the web.
      </h1>
      <p className="relative mt-5 max-w-md text-sm leading-relaxed text-muted">
        This page doesn&apos;t exist — or it slipped off the grid. Let&apos;s get
        you back to solid ground.
      </p>
      <Link
        href="/"
        className="relative mt-8 rounded-full bg-brand px-6 py-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#f02b31]"
      >
        Back to home
      </Link>
    </main>
  );
}
