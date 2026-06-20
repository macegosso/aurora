"use client";

import dynamic from "next/dynamic";
import type { Slide } from "@/data/types";

const AuroraScene = dynamic(() => import("@/components/home/AuroraScene"), {
  ssr: false,
  loading: () => null,
});

export function CaseCover({ slide }: { slide: Slide }) {
  return (
    <section className="relative flex min-h-screen snap-start items-center overflow-hidden border-b border-line">
      {/* full-bleed 3D aurora */}
      <div className="anim-hero-fade pointer-events-none absolute inset-0 z-0">
        <AuroraScene />
      </div>

      {/* legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,14,0.92) 0%, rgba(5,6,14,0.62) 40%, rgba(5,6,14,0) 72%), linear-gradient(0deg, var(--color-bg) 2%, transparent 26%)",
        }}
      />

      <div className="wrap relative z-10 w-full">
        <div className="max-w-[760px] py-24">
          <div
            className="anim-hero-in mb-7 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-soft uppercase"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
            {slide.sec}
          </div>

          <h1 className="font-display text-[clamp(76px,13vw,168px)] leading-[0.9] font-bold tracking-[-0.04em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="anim-hero-word text-aurora inline-block will-change-transform">
                {slide.title}
              </span>
            </span>
          </h1>

          {slide.lead ? (
            <p
              className="anim-hero-in mt-7 max-w-[600px] text-[clamp(19px,2.5vw,27px)] leading-snug font-medium text-text"
              style={{ animationDelay: "0.5s" }}
            >
              {slide.lead}
            </p>
          ) : null}

          {slide.note ? (
            <p
              className="anim-hero-in mt-5 max-w-[560px] text-[15px] leading-relaxed text-muted"
              style={{ animationDelay: "0.62s" }}
            >
              {slide.note}
            </p>
          ) : null}
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
        <span className="inline-block animate-pulse">role para começar ↓</span>
      </div>
    </section>
  );
}
