"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import type { Accent, Slide } from "@/data/types";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { CaseCover } from "./CaseCover";
import { CenaSection } from "./CenaSection";
import { CountUp } from "./CountUp";
import { ProvarSection } from "./ProvarSection";
import { JourneySection } from "./JourneySection";

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

const isSizing = (s: Slide) => !!s.stats?.some((st) => /TAM/i.test(st.label));

/* icons for the três saídas */
const SAIDA_ICON: Record<string, React.ReactNode> = {
  Resolver: <path d="M20 6 9 17l-5-5" />,
  Rotear: <path d="M5 12h14M13 6l6 6-6 6" />,
  "Dizer a verdade": (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
};

/* ---------------- guided chapter nav ---------------- */

function useActiveId(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-18% 0px -72% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function ChapterNav({ chapters, activeIdx }: { chapters: { label: string; i: number }[]; activeIdx: number }) {
  const current = chapters.reduce((acc, c) => (c.i <= activeIdx ? c.i : acc), chapters[0].i);
  return (
    <nav className="pointer-events-auto fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex">
      {chapters.map((c) => {
        const on = c.i === current;
        return (
          <button
            key={c.i}
            type="button"
            data-cursor
            onClick={() => document.getElementById(`sec-${c.i}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="group flex items-center gap-2.5 text-left"
          >
            <span
              className="h-px transition-all duration-300"
              style={{
                width: on ? 28 : 14,
                background: on ? "var(--color-teal)" : "var(--color-line2)",
              }}
            />
            <span
              className="font-mono text-[10.5px] tracking-[0.1em] uppercase transition-colors"
              style={{ color: on ? "var(--color-text)" : "var(--color-muted)" }}
            >
              {c.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ---------------- shared bits ---------------- */

function Kicker({ n, children }: { n?: number; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5 font-mono text-[12px] tracking-[0.18em] text-coral uppercase">
      {n !== undefined ? <span className="text-muted">{String(n).padStart(2, "0")}</span> : null}
      {children}
    </div>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-display font-semibold tracking-tight text-text ${className}`}>{children}</h2>;
}

/* ---------------- visual bodies ---------------- */

function SizingBars({ slide }: { slide: Slide }) {
  const widths = [100, 46, 16];
  const colors = ["#34e3c4", "#9d8bff", "#ff5fa8"];
  const tiers = ["TAM", "SAM", "SOM"];
  return (
    <div className="mt-12 space-y-7">
      {slide.stats!.map((st, i) => (
        <Reveal key={i} delay={i * 0.12}>
          <div>
            <div className="mb-2 flex items-baseline gap-3">
              <span className="w-10 font-mono text-[12px] tracking-[0.14em] text-muted">{tiers[i]}</span>
              <span className="font-display text-[clamp(28px,5vw,48px)] leading-none font-bold" style={{ color: colors[i] }}>
                <CountUp value={st.big} />
              </span>
              <span className="text-[13px] text-muted">{st.label}</span>
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
              className={`font-display text-[clamp(48px,7vw,76px)] leading-none font-bold ${ACCENT_TEXT[STAT_CYCLE[i % 3]]}`}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <CountUp value={st.big} />
            </motion.div>
            <div className="mt-3 text-[14px] leading-snug text-muted">{st.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Cards({ slide }: { slide: Slide }) {
  const saidas = slide.cards!.every((c) => c.t in SAIDA_ICON);
  const n = slide.cards!.length;
  const cls = n === 3 ? "md:grid-cols-3" : n === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2";
  return (
    <div className={`mt-10 grid grid-cols-1 gap-4 ${cls}`}>
      {slide.cards!.map((c, i) => {
        const accent = c.accent ?? "coral";
        const hex = ACCENT_HEX[accent];
        return (
          <Reveal key={i} delay={i * 0.08}>
            <div className="ring-aurora group relative h-full overflow-hidden rounded-2xl border border-line glass p-6 transition-all duration-300 hover:-translate-y-1.5">
              <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: hex, opacity: 0.7 }} />
              {saidas ? (
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl" style={{ background: hex + "1f" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hex} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {SAIDA_ICON[c.t]}
                  </svg>
                </div>
              ) : null}
              <h3 className={`font-display text-[19px] font-semibold tracking-tight ${ACCENT_TEXT[accent]}`}>{c.t}</h3>
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
    <div className={`mt-10 grid grid-cols-1 gap-5 ${cls}`}>
      {slide.cols!.map((col, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <div className="h-full rounded-2xl border border-line bg-card/40 p-6">
            <h4 className="mb-4 font-mono text-[12px] tracking-[0.08em] text-soft uppercase">{col.h}</h4>
            <ul className="space-y-3">
              {col.items.map((it, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-soft">
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

function StepsPipeline({ slide }: { slide: Slide }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {slide.steps!.map((step, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div className="flex h-full items-center gap-3 rounded-xl border border-line bg-card/40 p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-[12px] font-semibold text-[#04111a]" style={{ background: "var(--aurora)" }}>
              {i + 1}
            </span>
            <span className="text-[14px] leading-snug text-soft">{step}</span>
          </div>
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

/* ---------------- section shells ---------------- */

function QuoteSection({ slide }: { slide: Slide }) {
  return (
    <section className="flex min-h-screen snap-start flex-col justify-center border-b border-line py-24">
      <div className="wrap max-w-[920px]">
        <Reveal>
          <div className="font-mono text-[12px] tracking-[0.18em] text-muted uppercase">{slide.sec}</div>
        </Reveal>
        {slide.lead ? (
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(28px,4.6vw,52px)] leading-[1.12] font-semibold tracking-tight">{slide.lead}</p>
          </Reveal>
        ) : null}
        {slide.footnote ? (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[680px] text-[clamp(16px,2vw,20px)] leading-relaxed text-coral">{slide.footnote}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function ProtoSection({ slide }: { slide: Slide }) {
  return (
    <section className="flex min-h-screen snap-start flex-col justify-center border-b border-line py-24">
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
            <Title className="max-w-[18em] text-[clamp(26px,4vw,40px)] leading-[1.08]">{slide.title}</Title>
          </Reveal>
          {slide.lead ? (
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-soft">{slide.lead}</p>
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
    <section className="flex min-h-screen snap-start flex-col justify-center py-24">
      <div className="wrap">
        <Reveal>
          <Kicker>{slide.sec}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Title className="max-w-[20em] text-[clamp(28px,4.4vw,46px)] leading-[1.08]">{slide.title}</Title>
        </Reveal>
        {slide.cards ? <Cards slide={slide} /> : null}
        {slide.footnote ? (
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-[820px] font-display text-[clamp(22px,3vw,34px)] leading-snug font-medium text-aurora">{slide.footnote}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-3.5">
            <Magnetic strength={0.25}>
              <Link href="/prototipo" data-cursor data-cursor-label="abrir" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-[#04111a]" style={{ backgroundImage: "var(--aurora)" }}>
                Abrir o protótipo →
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/dossie" data-cursor className="ring-aurora inline-flex items-center gap-2 rounded-full border border-line2 px-6 py-3.5 text-[14px] font-medium text-soft transition-colors hover:text-text">
                Ler os documentos ↗
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection({ slide, index }: { slide: Slide; index: number }) {
  const tinted = index % 2 === 1;
  return (
    <section className={`flex min-h-screen snap-start flex-col justify-center border-b border-line py-24 ${tinted ? "bg-bg2/40" : ""}`}>
      <div className="wrap">
        <Reveal>
          <Kicker n={index}>{slide.sec}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Title className="max-w-[20em] text-[clamp(26px,4vw,44px)] leading-[1.08]">{slide.title}</Title>
        </Reveal>
        {slide.lead ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[760px] text-[clamp(16px,1.9vw,19px)] leading-relaxed text-soft">{slide.lead}</p>
          </Reveal>
        ) : null}

        {slide.stats ? (isSizing(slide) ? <SizingBars slide={slide} /> : <BigStats slide={slide} />) : null}
        {slide.cards ? <Cards slide={slide} /> : null}
        {slide.cols ? <Cols slide={slide} /> : null}
        {slide.steps ? <StepsPipeline slide={slide} /> : null}
        {slide.bullets ? <Bullets slide={slide} /> : null}

        {slide.note ? (
          <Reveal delay={0.1}>
            <p className="mt-9 max-w-[720px] text-[14.5px] leading-relaxed text-muted">{slide.note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------- main ---------------- */

function buildChapters(slides: Slide[]) {
  const find = (pred: (s: Slide) => boolean) => slides.findIndex(pred);
  const want: { label: string; i: number }[] = [
    { label: "O problema", i: find((s) => s.kind === "quote") },
    { label: "O tamanho", i: find(isSizing) },
    { label: "A raiz", i: find((s) => /^Insight/.test(s.sec)) },
    { label: "A solução", i: find((s) => s.kind === "cards" && /^Solução/.test(s.sec)) },
    { label: "Validação", i: find((s) => /^Validação/.test(s.sec)) },
    { label: "O negócio", i: find((s) => /riscos/.test(s.sec)) },
    { label: "O protótipo", i: find((s) => s.kind === "proto") },
    { label: "O pedido", i: find((s) => s.kind === "principles") },
  ];
  return want.filter((c) => c.i >= 0).sort((a, b) => a.i - b.i);
}

export function DeckStory({ slides }: { slides: Slide[] }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // magnetic section scrolling, scoped to this page
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add("snap-deck");
    return () => el.classList.remove("snap-deck");
  }, []);

  const ids = slides.map((_, i) => `sec-${i}`);
  const activeId = useActiveId(ids);
  const activeIdx = Number(activeId.replace("sec-", "")) || 0;
  const chapters = buildChapters(slides);

  return (
    <div>
      <motion.div className="read-progress" style={{ width: "100%", scaleX: progress }} />
      {chapters.length ? <ChapterNav chapters={chapters} activeIdx={activeIdx} /> : null}

      {slides.map((s, i) => {
        const inner =
          s.kind === "cover" ? (
            <CaseCover slide={s} />
          ) : s.kind === "quote" && /a cena/i.test(s.title) ? (
            <CenaSection slide={s} />
          ) : s.kind === "quote" ? (
            <QuoteSection slide={s} />
          ) : s.kind === "proto" ? (
            <ProtoSection slide={s} />
          ) : s.kind === "principles" ? (
            <Closing slide={s} />
          ) : /como a IA resolve/i.test(s.sec) ? (
            <ProvarSection slide={s} />
          ) : s.sec === "O problema" && s.cards ? (
            <JourneySection slide={s} tinted={i % 2 === 1} />
          ) : (
            <StorySection slide={s} index={i} />
          );
        return (
          <div id={`sec-${i}`} key={i}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
