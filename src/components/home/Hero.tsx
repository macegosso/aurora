"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";

const AuroraScene = dynamic(() => import("./AuroraScene"), {
  ssr: false,
  loading: () => null,
});

const STATS = [
  { n: "8 mi", l: "negativas/ano", c: "text-teal" },
  { n: "13,2%", l: "estão erradas", c: "text-purple" },
  { n: "30%", l: "vai ao intermediário", c: "text-pink" },
];

export function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* full-bleed aurora scene */}
      <div className="anim-hero-fade pointer-events-none absolute inset-0 z-0">
        <AuroraScene />
      </div>

      {/* legibility scrim — darkens the left where the copy sits */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,14,0.92) 0%, rgba(5,6,14,0.6) 38%, rgba(5,6,14,0) 70%), linear-gradient(0deg, var(--color-bg) 2%, transparent 28%)",
        }}
      />

      {/* extra darkening on phones so the copy stays legible over the orb */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-bg/45 sm:hidden" aria-hidden />

      <div className="wrap relative z-10 w-full">
        <div className="max-w-[720px] py-20 sm:py-28">
          <div
            className="anim-hero-in mb-7 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-soft uppercase"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
            AI Product Challenge · Blip
          </div>

          <h1 className="font-display text-[clamp(52px,13vw,168px)] leading-[0.92] font-bold tracking-[-0.03em] sm:leading-[0.9] sm:tracking-[-0.04em]">
            {/* overflow mask keeps the gradient word a single clipped element
                (no per-char transforms that would break background-clip:text) */}
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="anim-hero-word text-aurora inline-block will-change-transform">
                Aurora
              </span>
            </span>
          </h1>

          <p
            className="anim-hero-in mt-6 max-w-[560px] text-[clamp(18px,2.4vw,24px)] leading-snug font-medium text-text"
            style={{ animationDelay: "0.5s" }}
          >
            A pessoa do lado de quem o sistema deixou pra trás.
          </p>

          <p
            className="anim-hero-in mt-5 max-w-[560px] text-[16px] leading-relaxed text-soft"
            style={{ animationDelay: "0.6s" }}
          >
            Um copiloto de IA, no WhatsApp, que faz{" "}
            <span className="text-teal">triagem honesta</span> de casos do INSS —
            devolvendo às pessoas o acesso ao que já é delas.
          </p>

          <div
            className="anim-hero-in mt-9 flex flex-wrap items-center gap-3.5"
            style={{ animationDelay: "0.72s" }}
          >
            <Magnetic strength={0.25}>
              <Link
                href="/deck"
                data-cursor
                data-cursor-label="ver"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-[#04111a] transition-transform"
                style={{ backgroundImage: "var(--aurora)" }}
              >
                Ver o case
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/prototipo"
                data-cursor
                className="ring-aurora inline-flex items-center gap-2 rounded-full border border-line2 px-6 py-3.5 text-[14px] font-medium text-soft transition-colors hover:text-text"
              >
                Abrir protótipo ↗
              </Link>
            </Magnetic>
          </div>

          <div
            className="anim-hero-in mt-10 grid max-w-[520px] grid-cols-3 gap-3 border-t border-line pt-6 sm:gap-5"
            style={{ animationDelay: "0.84s" }}
          >
            {STATS.map((s) => (
              <div key={s.n}>
                <div className={`font-display text-[22px] font-bold sm:text-[26px] ${s.c}`}>
                  {s.n}
                </div>
                <div className="mt-1 text-[12px] text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 w-max max-w-[calc(100vw-40px)] -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px] sm:tracking-[0.2em]">
        <span className="inline-block animate-pulse">role para explorar ↓</span>
      </div>
    </section>
  );
}
