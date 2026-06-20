"use client";

import { useState } from "react";
import type { Slide } from "@/data/types";
import { Reveal } from "@/components/Reveal";

const FACTS = [
  { k: "40 anos", v: "de trabalho" },
  { k: "Negada", v: "a aposentadoria" },
  { k: "30%", v: "cobrados para “ajudar”" },
];

export function CenaSection({ slide }: { slide: Slide }) {
  // try the real photo first; fall back to the illustrated portrait
  const [src, setSrc] = useState("/personas/marlene.webp");

  return (
    <section className="flex min-h-screen snap-start flex-col justify-center border-b border-line py-24">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* portrait */}
        <Reveal>
          <figure className="ring-aurora relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[24px] border border-line2">
            <div className="aspect-[4/5] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                onError={() => setSrc("/personas/marlene.svg")}
                alt="Dona Marlene — a pessoa do lado de quem o sistema deixou pra trás"
                className="h-full w-full object-cover"
                style={{ filter: "saturate(1.02)" }}
              />
            </div>
            {/* aurora tint + caption */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(0deg, rgba(5,6,14,0.85) 0%, rgba(5,6,14,0) 45%), linear-gradient(120deg, rgba(52,227,196,0.10), rgba(157,139,255,0.10))",
              }}
            />
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full glass px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-soft uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              Dona Marlene · 64 anos
            </figcaption>
          </figure>
        </Reveal>

        {/* scene */}
        <div>
          <Reveal>
            <div className="font-mono text-[12px] tracking-[0.18em] text-coral uppercase">
              {slide.sec}
            </div>
          </Reveal>
          {slide.lead ? (
            <Reveal delay={0.1}>
              <p className="mt-5 font-display text-[clamp(20px,2.5vw,30px)] leading-[1.28] font-medium tracking-tight text-text">
                {slide.lead}
              </p>
            </Reveal>
          ) : null}
          {slide.footnote ? (
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[560px] text-[clamp(16px,1.9vw,19px)] leading-relaxed text-coral">
                {slide.footnote}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap gap-3">
              {FACTS.map((f) => (
                <div key={f.k} className="rounded-xl border border-line bg-card/50 px-4 py-3">
                  <div className="font-display text-[20px] font-bold text-text">{f.k}</div>
                  <div className="text-[12.5px] text-muted">{f.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
