"use client";

import { motion } from "motion/react";
import type { Slide } from "@/data/types";
import { Reveal } from "@/components/Reveal";

const MAP = [
  { from: "“não se veste sozinho”", to: "autonomia" },
  { from: "“não fala frases completas”", to: "comunicação" },
  { from: "“não tem noção de perigo”", to: "cognição e supervisão" },
];

export function ProvarSection({ slide }: { slide: Slide }) {
  return (
    <section className="flex min-h-screen snap-start flex-col justify-center border-b border-line py-24">
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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* o que ela vê */}
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-card/40 p-6">
              <div className="mb-4 font-mono text-[11px] tracking-[0.14em] text-coral uppercase">
                O que ela vê
              </div>
              <div className="space-y-3">
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-line bg-card px-4 py-3 text-[14px] text-soft">
                  Me dá exemplos do dia a dia em que ele precisa de ajuda?
                </div>
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-teal/15 px-4 py-3 text-[14px] text-text">
                  Ele não se veste sozinho, não fala frases completas e não tem
                  noção de perigo.
                </div>
              </div>
            </div>
          </Reveal>

          {/* o que a IA faz — mapping */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-line glass p-6">
              <div className="mb-4 font-mono text-[11px] tracking-[0.14em] text-purple uppercase">
                O que a IA faz · traduz para os critérios da perícia
              </div>
              <div className="space-y-3">
                {MAP.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ delay: 0.15 + i * 0.18 }}
                    className="grid grid-cols-1 items-start gap-1.5 rounded-xl border border-line bg-bg2/60 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-2.5"
                  >
                    <span className="text-[12.5px] text-soft sm:text-right">{p.from}</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
                      className="hidden h-px w-8 origin-left bg-gradient-to-r from-teal to-purple sm:inline-block"
                    />
                    <span className="text-[13px] font-semibold text-purple">{p.to}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                <span className="rounded-md border border-teal/30 bg-teal/10 px-2.5 py-1 font-mono text-[11px] text-teal">
                  Triagem: Resolver · 0,82
                </span>
                <span className="rounded-md border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[11px] text-gold">
                  LOAS art. 20, §6º
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {slide.note ? (
          <Reveal delay={0.15}>
            <p className="mt-9 max-w-[760px] text-[14.5px] leading-relaxed text-muted">
              {slide.note}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
