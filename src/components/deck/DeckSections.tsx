"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Accent, Slide } from "@/data/types";
import { Reveal } from "@/components/Reveal";

const ACCENT_HEX: Record<Accent, string> = {
  coral: "#ff7e5a",
  teal: "#34e3c4",
  gold: "#f0c24b",
  purple: "#9d8bff",
};

function Shell({
  tinted,
  children,
}: {
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex min-h-screen snap-start flex-col justify-center border-b border-line py-24 ${tinted ? "bg-bg2/40" : ""}`}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

function Head({ slide }: { slide: Slide }) {
  return (
    <>
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
    </>
  );
}

function Note({ slide }: { slide: Slide }) {
  if (!slide.note) return null;
  return (
    <Reveal delay={0.15}>
      <p className="mt-9 max-w-[760px] text-[14.5px] leading-relaxed text-muted">{slide.note}</p>
    </Reveal>
  );
}

/* ---------------- 1 · intermediário: the 70 / 30 split ---------------- */

export function IntermediarioSection({ slide, tinted }: { slide: Slide; tinted?: boolean }) {
  return (
    <Shell tinted={tinted}>
      <Head slide={slide} />
      <Reveal delay={0.12}>
        <div className="mt-12 max-w-[820px]">
          <div className="flex h-16 w-full overflow-hidden rounded-2xl border border-line">
            <motion.div
              className="flex items-center justify-start bg-teal/15 pl-4"
              initial={{ width: "100%" }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span className="font-mono text-[12px] text-teal">70% · fica com a pessoa</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              style={{ background: "var(--color-coral)" }}
              initial={{ width: "0%" }}
              whileInView={{ width: "30%" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span className="font-display text-[18px] font-bold text-[#1c0d07]">30%</span>
            </motion.div>
          </div>
          <p className="mt-3 text-[13.5px] text-muted">
            De cada benefício atrasado recuperado, até{" "}
            <span className="text-coral">30%</span> vão ao intermediário — mais 3 a 5
            parcelas. A Aurora faz o mesmo trabalho de navegação de graça.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {slide.cols?.map((col, i) => (
          <Reveal key={i} delay={0.15 + i * 0.1}>
            <div className="h-full rounded-2xl border border-line bg-card/40 p-6">
              <h4 className="mb-4 font-mono text-[12px] tracking-[0.08em] text-soft uppercase">{col.h}</h4>
              <ul className="space-y-3">
                {col.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[14.5px] leading-relaxed text-soft">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Note slide={slide} />
    </Shell>
  );
}

/* ---------------- 2 · por que agora: robô do Estado × robô do cidadão ---------------- */

export function WhyNowSplit({ slide, tinted }: { slide: Slide; tinted?: boolean }) {
  const cols = slide.cols ?? [];
  const sides = [
    { col: cols[0], hex: "#ff5fa8", icon: <path d="M18 6 6 18M6 6l12 12" />, tag: "nega" },
    { col: cols[1], hex: "#34e3c4", icon: <path d="M20 6 9 17l-5-5" />, tag: "defende" },
  ];
  return (
    <Shell tinted={tinted}>
      <Head slide={slide} />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {sides.map((s, i) =>
          s.col ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border p-6"
              style={{ borderColor: s.hex + "55", background: s.hex + "0f" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: s.hex + "22" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s.hex} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </span>
                <h4 className="font-display text-[18px] font-semibold" style={{ color: s.hex }}>
                  {s.col.h}
                </h4>
              </div>
              <ul className="space-y-3">
                {s.col.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[14.5px] leading-relaxed text-soft">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.hex }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null
        )}
      </div>
      {slide.footnote ? (
        <Reveal delay={0.15}>
          <p className="mt-9 max-w-[760px] text-[clamp(16px,1.9vw,19px)] leading-relaxed text-coral">
            {slide.footnote}
          </p>
        </Reveal>
      ) : null}
    </Shell>
  );
}

/* ---------------- 3 · as três saídas: interactive ---------------- */

const SAIDA_ICON: Record<string, React.ReactNode> = {
  Resolver: <path d="M20 6 9 17l-5-5" />,
  Rotear: <path d="M5 12h14M13 6l6 6-6 6" />,
  "Dizer a verdade": <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};
const SAIDA_EXAMPLE: Record<string, string> = {
  Resolver: "Ex.: negada por impacto não demonstrado, com prova possível → a Aurora monta o recurso, de graça.",
  Rotear: "Ex.: renda acima do limite, mas com despesas extraordinárias → advogado verificado, com dossiê pronto.",
  "Dizer a verdade": "Ex.: sem direito e sem alavanca de prova ou renda → a verdade, com a norma e uma alternativa.",
};

export function SaidasSection({ slide, tinted }: { slide: Slide; tinted?: boolean }) {
  const cards = slide.cards ?? [];
  const [sel, setSel] = useState(0);
  return (
    <Shell tinted={tinted}>
      <Head slide={slide} />
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c, i) => {
          const accent = c.accent ?? "coral";
          const hex = ACCENT_HEX[accent];
          const on = i === sel;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <button
                type="button"
                data-cursor
                onMouseEnter={() => setSel(i)}
                onClick={() => setSel(i)}
                className="h-full w-full rounded-2xl border p-6 text-left transition-all duration-300"
                style={{
                  borderColor: on ? hex + "99" : "var(--color-line)",
                  background: on ? hex + "12" : "rgba(20,24,50,0.4)",
                  transform: on ? "translateY(-4px)" : "none",
                }}
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl" style={{ background: hex + "1f" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hex} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {SAIDA_ICON[c.t]}
                  </svg>
                </div>
                <h3 className="font-display text-[19px] font-semibold tracking-tight" style={{ color: hex }}>
                  {c.t}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-soft">{c.d}</p>
              </button>
            </Reveal>
          );
        })}
      </div>
      <motion.div
        key={sel}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-xl border border-line bg-bg2/60 p-4 text-[13.5px] text-soft"
      >
        {SAIDA_EXAMPLE[cards[sel]?.t] ?? ""}
      </motion.div>
      <Note slide={slide} />
    </Shell>
  );
}

/* ---------------- 4 · por que IA: icon trio that lights up ---------------- */

const AI_ICON: React.ReactNode[] = [
  <path key="c" d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  <path key="d" d="M4 4h16v4H4zM4 12h10v4H4zM4 18h7" />,
  <path key="l" d="M5 8h14M5 12h9M12 20l-2-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-2 4z" />,
];

export function WhyAITrio({ slide, tinted }: { slide: Slide; tinted?: boolean }) {
  const cols = slide.cols ?? [];
  const hexes = ["#34e3c4", "#9d8bff", "#ff5fa8"];
  return (
    <Shell tinted={tinted}>
      <Head slide={slide} />
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cols.map((col, i) => {
          const hex = hexes[i % 3];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0, boxShadow: `0 0 0 1px ${hex}33, 0 14px 50px -18px ${hex}66` }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ delay: i * 0.14, duration: 0.6 }}
              className="h-full rounded-2xl border border-line glass p-6"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl" style={{ background: hex + "1f" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={hex} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  {AI_ICON[i % 3]}
                </svg>
              </div>
              <h3 className="font-display text-[18px] font-semibold" style={{ color: hex }}>
                {col.h}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-soft">{col.items[0]}</p>
            </motion.div>
          );
        })}
      </div>
      <Note slide={slide} />
    </Shell>
  );
}

/* ---------------- 5 · a máquina de confiança: pipeline with a flow dot ---------------- */

export function MecanicaFlow({ slide, tinted }: { slide: Slide; tinted?: boolean }) {
  const steps = slide.steps ?? [];
  return (
    <Shell tinted={tinted}>
      <Head slide={slide} />
      <div className="relative mt-12 pl-9">
        {/* spine */}
        <div className="absolute top-2 bottom-2 left-[14px] w-px bg-line2" />
        {/* flow dot */}
        <motion.div
          className="absolute left-[10px] h-2.5 w-2.5 rounded-full"
          style={{ background: "var(--color-teal)", boxShadow: "0 0 12px var(--color-teal)" }}
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="space-y-4">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="relative flex items-center gap-4">
                <span className="absolute -left-9 grid h-7 w-7 place-items-center rounded-full border border-line2 bg-bg font-mono text-[11px] text-soft">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-line bg-card/40 px-4 py-3 text-[14px] text-soft">
                  {step}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Note slide={slide} />
    </Shell>
  );
}

/* ---------------- 6 · os riscos: risco → resposta ---------------- */

export function RiscosSection({ slide, tinted }: { slide: Slide; tinted?: boolean }) {
  const cards = slide.cards ?? [];
  return (
    <Shell tinted={tinted}>
      <Head slide={slide} />
      <div className="mt-10 space-y-3.5">
        {cards.map((c, i) => {
          const hex = ACCENT_HEX[c.accent ?? "coral"];
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(0,300px)_auto_1fr]">
                <div className="rounded-xl border p-4" style={{ borderColor: hex + "55", background: hex + "10" }}>
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: hex }}>
                    Risco
                  </div>
                  <div className="mt-1 font-display text-[16px] font-semibold text-text">{c.t}</div>
                </div>
                <div className="hidden items-center justify-center font-mono text-line2 md:flex">→</div>
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl border border-line bg-card/40 p-4"
                >
                  <div className="font-mono text-[10px] tracking-[0.14em] text-teal uppercase">Resposta</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-soft">{c.d}</div>
                </motion.div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Note slide={slide} />
    </Shell>
  );
}
