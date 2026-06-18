"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { Magnetic } from "@/components/Magnetic";

const AuroraScene = dynamic(() => import("./AuroraScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const h1 = root.current!.querySelector<HTMLElement>(".hero-title")!;

      // reveal scene container regardless
      gsap.set(".hero-canvas", { opacity: 0 });
      gsap.to(".hero-canvas", { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.2 });

      if (reduce) {
        gsap.set([".hero-stagger", h1], { opacity: 1, y: 0 });
        return;
      }

      const split = new SplitText(h1, { type: "chars" });
      gsap.set(h1, { opacity: 1 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(split.chars, {
        yPercent: 115,
        opacity: 0,
        rotateX: -70,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".hero-stagger",
          {
            y: 26,
            opacity: 0,
            filter: "blur(8px)",
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.65"
        );

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* full-bleed aurora scene */}
      <div className="hero-canvas pointer-events-none absolute inset-0 z-0">
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

      <div className="wrap relative z-10 w-full">
        <div className="max-w-[720px] py-28">
          <div className="hero-stagger mb-7 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-soft uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
            AI Product Challenge · Blip
          </div>

          <h1
            className="hero-title font-display text-[clamp(68px,13vw,168px)] leading-[0.9] font-bold tracking-[-0.04em]"
            style={{ opacity: 0 }}
          >
            <span className="text-aurora">Aurora</span>
          </h1>

          <p className="hero-stagger mt-6 max-w-[560px] text-[clamp(18px,2.4vw,24px)] leading-snug font-medium text-text">
            A pessoa do lado de quem o sistema deixou pra trás.
          </p>

          <p className="hero-stagger mt-5 max-w-[560px] text-[16px] leading-relaxed text-soft">
            Um copiloto de IA, no WhatsApp, que faz{" "}
            <span className="text-teal">triagem honesta</span> de casos do INSS —
            devolvendo às pessoas o acesso ao que já é delas.
          </p>

          <div className="hero-stagger mt-9 flex flex-wrap items-center gap-3.5">
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

          <div className="hero-stagger mt-10 grid max-w-[520px] grid-cols-3 gap-5 border-t border-line pt-6">
            {[
              { n: "8 mi", l: "negativas/ano", c: "text-teal" },
              { n: "13,2%", l: "estão erradas", c: "text-purple" },
              { n: "30%", l: "vai ao intermediário", c: "text-pink" },
            ].map((s) => (
              <div key={s.n}>
                <div className={`font-display text-[26px] font-bold ${s.c}`}>
                  {s.n}
                </div>
                <div className="mt-1 text-[12px] text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
        <span className="inline-block animate-pulse">role para explorar ↓</span>
      </div>
    </section>
  );
}
