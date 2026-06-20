"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import type { Accent, Slide } from "@/data/types";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

const ACCENT_TEXT: Record<Accent, string> = {
  coral: "text-coral",
  teal: "text-teal",
  gold: "text-gold",
  purple: "text-purple",
};
const ACCENT_HEX: Record<Accent, string> = {
  coral: "#ff7e5a",
  teal: "#34e3c4",
  gold: "#f0c24b",
  purple: "#9d8bff",
};
const STAT_CYCLE: Accent[] = ["teal", "purple", "gold"];

function cardGrid(n: number) {
  if (n <= 1) return "grid-cols-1";
  if (n === 2) return "grid-cols-1 sm:grid-cols-2";
  if (n === 3) return "grid-cols-1 md:grid-cols-3";
  if (n === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
}

const isSizing = (s: Slide) => !!s.stats?.some((st) => /TAM/i.test(st.label));

/* ---------------- shared bits ---------------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 font-mono text-[12px] tracking-[0.18em] text-coral uppercase">
      {children}
    </div>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display font-semibold tracking-tight text-text ${className}`}>
      {children}
    </h2>
  );
}

/* ---------------- sizing (TAM / SAM / SOM) ---------------- */

function SizingBars({ slide }: { slide: Slide }) {
  const widths = [100, 46, 16];
  const colors = ["#34e3c4", "#9d8bff", "#ff5fa8"];
  const tiers = ["TAM", "SAM", "SOM"];
  return (
    <div className="mt-12 space-y-6">
      {slide.stats!.map((st, i) => (
        <Reveal key={i} delay={i * 0.12}>
          <div>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[12px] tracking-[0.16em] text-muted">
                  {tiers[i]}
                </span>
                <span
                  className="font-display text-[clamp(28px,5vw,48px)] leading-none font-bold"
                  style={{ color: colors[i] }}
                >
                  {st.big}
                </span>
              </div>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-card">
              <motion.div
                className="h-full rounded-full"
                style={{ background: colors[i] }}
                initial={{ width: 0 }}
                whileInView={{ width: `${widths[i]}%` }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.12 }}
              />
            </div>
            <p className="mt-2 max-w-[680px] text-[13.5px] leading-snug text-muted">
              {st.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function BigStats({ slide }: { slide: Slide }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
      {slide.stats!.map((st, i) => (
        <Reveal key={i} delay={i * 0.12}>
          <div>
            <motion.div
              className={`font-display text-[clamp(44px,7vw,72px)] leading-none font-bold ${ACCENT_TEXT[STAT_CYCLE[i % 3]]}`}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {st.big}
            </motion.div>
            <div className="mt-3 text-[13.5px] leading-snug text-muted">{st.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- bodies ---------------- */

function Cards({ slide }: { slide: Slide }) {
  return (
    <div className={`mt-10 grid gap-4 ${cardGrid(slide.cards!.length)}`}>
      {slide.cards!.map((c, i) => {
        const accent = c.accent ?? "coral";
        return (
          <Reveal key={i} delay={i * 0.08}>
            <div className="ring-aurora group h-full rounded-2xl border border-line glass p-6 transition-all duration-300 hover:-translate-y-1.5">
              <h3 className={`font-display text-[19px] font-semibold tracking-tight ${ACCENT_TEXT[accent]}`}>
                {c.t}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-soft">{c.d}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Cols({ slide }: { slide: Slide }) {
  const n = slide.cols!.length;
  const cls = n >= 3 ? "md:grid-cols-3" : n === 2 ? "md:grid-cols-2" : "grid-cols-1";
  return (
    <div className={`mt-10 grid grid-cols-1 gap-8 ${cls}`}>
      {slide.cols!.map((col, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <div>
            <h4 className="border-b border-line pb-3 font-mono text-[12px] tracking-[0.08em] text-soft uppercase">
              {col.h}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.items.map((it, j) => (
                <li key={j} className="flex gap-3 text-[14.5px] leading-relaxed text-soft">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Steps({ slide }: { slide: Slide }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-y-3">
      {slide.steps!.map((step, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <span className="flex items-center">
            <span className="rounded-full border border-line bg-card px-4 py-2 text-[13.5px] text-soft">
              {step}
            </span>
            {i < slide.steps!.length - 1 ? (
              <span className="mx-2.5 font-mono text-coral" aria-hidden>
                →
              </span>
            ) : null}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

function Bullets({ slide }: { slide: Slide }) {
  return (
    <ul className="mt-10 space-y-4">
      {slide.bullets!.map((b, i) => (
        <Reveal key={i} delay={i * 0.07}>
          <li className="flex gap-3.5 text-[17px] leading-relaxed text-soft">
            <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-teal" aria-hidden />
            <span>{b}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------------- section kinds ---------------- */

function Cover({ slide }: { slide: Slide }) {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 55% at 75% 30%, rgba(157,139,255,0.16), transparent 70%), radial-gradient(45% 45% at 10% 80%, rgba(52,227,196,0.12), transparent 70%)",
        }}
      />
      <div className="wrap relative z-10">
        <Reveal immediate>
          <div className="font-mono text-[12px] tracking-[0.18em] text-muted uppercase">
            {slide.sec}
          </div>
        </Reveal>
        <Reveal immediate delay={0.1}>
          <h1 className="mt-5 font-display text-[clamp(72px,12vw,150px)] leading-[0.92] font-bold tracking-[-0.04em]">
            <span className="text-aurora">{slide.title}</span>
          </h1>
        </Reveal>
        {slide.lead ? (
          <Reveal immediate delay={0.2}>
            <p className="mt-7 max-w-[680px] text-[clamp(18px,2.3vw,24px)] leading-snug font-medium text-text">
              {slide.lead}
            </p>
          </Reveal>
        ) : null}
        {slide.note ? (
          <Reveal immediate delay={0.3}>
            <p className="mt-5 max-w-[620px] text-[15px] leading-relaxed text-muted">
              {slide.note}
            </p>
          </Reveal>
        ) : null}
      </div>
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
        <span className="inline-block animate-pulse">role para começar ↓</span>
      </div>
    </section>
  );
}

function QuoteSection({ slide }: { slide: Slide }) {
  return (
    <section className="border-b border-line py-28 md:py-40">
      <div className="wrap max-w-[920px]">
        <Reveal>
          <div className="font-mono text-[12px] tracking-[0.18em] text-muted uppercase">
            {slide.sec} · {slide.title}
          </div>
        </Reveal>
        {slide.lead ? (
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(28px,4.6vw,52px)] leading-[1.12] font-semibold tracking-tight">
              {slide.lead}
            </p>
          </Reveal>
        ) : null}
        {slide.footnote ? (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[680px] text-[clamp(16px,2vw,20px)] leading-relaxed text-coral">
              {slide.footnote}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function ProtoSection({ slide }: { slide: Slide }) {
  return (
    <section className="border-b border-line py-28">
      <div className="wrap">
        <div
          className="ring-aurora overflow-hidden rounded-[28px] border border-line2 p-8 md:p-14"
          style={{
            background:
              "radial-gradient(80% 120% at 100% 0%, rgba(157,139,255,0.12), transparent 60%), linear-gradient(160deg, var(--color-panel), var(--color-bg2))",
          }}
        >
          <Reveal>
            <Kicker>{slide.sec}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <Title className="max-w-[18em] text-[clamp(26px,4vw,40px)] leading-[1.08]">
              {slide.title}
            </Title>
          </Reveal>
          {slide.lead ? (
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-soft">
                {slide.lead}
              </p>
            </Reveal>
          ) : null}
          {slide.cards ? <Cards slide={slide} /> : null}
          {slide.cta ? (
            <Reveal delay={0.15}>
              <div className="mt-10">
                <Magnetic strength={0.25}>
                  <Link
                    href="/prototipo"
                    data-cursor
                    data-cursor-label="abrir"
                    className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold text-[#04111a] transition-transform"
                    style={{ backgroundImage: "var(--aurora)" }}
                  >
                    {slide.cta.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Closing({ slide }: { slide: Slide }) {
  return (
    <section className="py-28 md:py-36">
      <div className="wrap">
        <Reveal>
          <Kicker>{slide.sec}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Title className="max-w-[20em] text-[clamp(28px,4.4vw,46px)] leading-[1.08]">
            {slide.title}
          </Title>
        </Reveal>
        {slide.cards ? <Cards slide={slide} /> : null}
        {slide.footnote ? (
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-[760px] font-display text-[clamp(20px,2.6vw,30px)] leading-snug font-medium text-aurora">
              {slide.footnote}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-3.5">
            <Magnetic strength={0.25}>
              <Link
                href="/prototipo"
                data-cursor
                data-cursor-label="abrir"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-[#04111a]"
                style={{ backgroundImage: "var(--aurora)" }}
              >
                Abrir o protótipo →
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/dossie"
                data-cursor
                className="ring-aurora inline-flex items-center gap-2 rounded-full border border-line2 px-6 py-3.5 text-[14px] font-medium text-soft transition-colors hover:text-text"
              >
                Ler o dossiê ↗
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* generic narrative section */
function StorySection({ slide, index }: { slide: Slide; index: number }) {
  const tinted = index % 2 === 1;
  return (
    <section className={`border-b border-line py-24 md:py-28 ${tinted ? "bg-bg2/40" : ""}`}>
      <div className="wrap">
        <Reveal>
          <Kicker>{slide.sec}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Title className="max-w-[20em] text-[clamp(26px,4vw,44px)] leading-[1.08]">
            {slide.title}
          </Title>
        </Reveal>
        {slide.lead ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[760px] text-[clamp(16px,1.9vw,19px)] leading-relaxed text-soft">
              {slide.lead}
            </p>
          </Reveal>
        ) : null}

        {slide.stats ? (isSizing(slide) ? <SizingBars slide={slide} /> : <BigStats slide={slide} />) : null}
        {slide.cards ? <Cards slide={slide} /> : null}
        {slide.cols ? <Cols slide={slide} /> : null}
        {slide.steps ? <Steps slide={slide} /> : null}
        {slide.bullets ? <Bullets slide={slide} /> : null}

        {slide.note ? (
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-[760px] border-t border-line pt-5 text-[14px] leading-relaxed text-soft">
              {slide.note}
            </p>
          </Reveal>
        ) : null}
        {slide.footnote ? (
          <Reveal delay={0.12}>
            <p className="mt-5 font-mono text-[11.5px] tracking-[0.04em] text-muted">
              {slide.footnote}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------- main ---------------- */

export function DeckStory({ slides }: { slides: Slide[] }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div>
      {/* scroll progress */}
      <motion.div className="read-progress" style={{ width: "100%", scaleX: progress }} />

      {slides.map((s, i) => {
        if (s.kind === "cover") return <Cover key={i} slide={s} />;
        if (s.kind === "quote") return <QuoteSection key={i} slide={s} />;
        if (s.kind === "proto") return <ProtoSection key={i} slide={s} />;
        if (s.kind === "principles") return <Closing key={i} slide={s} />;
        return <StorySection key={i} slide={s} index={i} />;
      })}
    </div>
  );
}
