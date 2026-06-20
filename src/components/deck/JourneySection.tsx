"use client";

import { motion } from "motion/react";
import type { Accent, Slide } from "@/data/types";
import { Reveal } from "@/components/Reveal";

const ACCENT_HEX: Record<Accent, string> = {
  coral: "#ff7e5a",
  teal: "#34e3c4",
  gold: "#f0c24b",
  purple: "#9d8bff",
};

export function JourneySection({ slide, tinted }: { slide: Slide; tinted: boolean }) {
  const cards = slide.cards ?? [];
  return (
    <section className={`flex min-h-screen snap-start flex-col justify-center border-b border-line py-24 ${tinted ? "bg-bg2/40" : ""}`}>
      <div className="wrap">
        <Reveal>
          <div className="mb-4 font-mono text-[12px] tracking-[0.18em] text-coral uppercase">
            {slide.sec}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-[20em] font-display text-[clamp(26px,4vw,44px)] leading-[1.08] font-semibold tracking-tight text-text">
            {slide.title}
          </h2>
        </Reveal>
        {slide.lead ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[760px] text-[clamp(16px,1.9vw,19px)] leading-relaxed text-soft">
              {slide.lead}
            </p>
          </Reveal>
        ) : null}

        {/* the journey: a path with stops where people drop off */}
        <div className="relative mt-12 pl-10">
          {/* animated spine */}
          <motion.div
            className="absolute top-1 left-[15px] w-px origin-top"
            style={{ background: "linear-gradient(180deg, #ff7e5a, #f0c24b, #34e3c4, #9d8bff)" }}
            initial={{ scaleY: 0, height: "100%" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="space-y-7">
            {cards.map((c, i) => {
              const hex = ACCENT_HEX[c.accent ?? "coral"];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ delay: i * 0.14, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* node */}
                  <span
                    className="absolute top-1 -left-[38px] grid h-[31px] w-[31px] place-items-center rounded-full border-2 font-mono text-[11px] font-bold"
                    style={{ borderColor: hex, color: hex, background: "var(--color-bg)" }}
                  >
                    {i + 1}
                  </span>
                  <div className="rounded-2xl border border-line bg-card/40 p-5 transition-colors hover:border-line2">
                    <h3 className="font-display text-[18px] font-semibold tracking-tight" style={{ color: hex }}>
                      {c.t}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-soft">{c.d}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {slide.note ? (
          <Reveal delay={0.15}>
            <p className="mt-9 max-w-[760px] text-[14.5px] leading-relaxed text-muted">{slide.note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
