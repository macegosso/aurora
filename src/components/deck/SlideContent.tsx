"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { Accent, Slide } from "@/data/types";
import { Magnetic } from "@/components/Magnetic";

/* ---------- accent helpers ---------- */

const ACCENT_TEXT: Record<Accent, string> = {
  coral: "text-coral",
  teal: "text-teal",
  gold: "text-gold",
  purple: "text-purple",
};

const STAT_CYCLE: Accent[] = ["coral", "teal", "gold"];

/* ---------- internal-route mapping for CTAs ---------- */

const ROUTE_MAP: Record<string, string> = {
  "#prototipo": "/prototipo",
  "#deck": "/deck",
  "#dossie": "/dossie",
  "#cv": "/cv",
};

/* ---------- stagger orchestration (reduced-motion safe) ---------- */

const block: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Cover slides get larger, centered treatment. */
function isCover(kind: Slide["kind"]) {
  return kind === "cover";
}

export function SlideContent({ slide }: { slide: Slide }) {
  const cover = isCover(slide.kind);
  const quote = slide.kind === "quote";
  const principlesPunch = slide.kind === "principles";
  const punchLine = quote || principlesPunch; // footnote rendered as serif italic coral

  return (
    <motion.div
      className={
        cover
          ? "flex h-full flex-col items-center justify-center text-center"
          : "flex h-full flex-col"
      }
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
      }}
    >
      {/* kicker = sec */}
      <motion.div
        variants={block}
        className={`mb-3 font-mono text-[11px] tracking-[0.18em] text-coral uppercase ${
          cover ? "mx-auto" : ""
        }`}
      >
        {slide.sec}
      </motion.div>

      {/* title */}
      <motion.h2
        variants={block}
        className={
          cover
            ? "font-serif font-semibold tracking-tight text-text text-[clamp(52px,9vw,90px)] leading-[0.98]"
            : quote
              ? "font-serif font-medium tracking-tight text-muted text-[clamp(22px,3vw,30px)] leading-tight"
              : "font-serif font-semibold tracking-tight text-text text-[clamp(28px,4.4vw,46px)] leading-[1.04]"
        }
      >
        {slide.title}
      </motion.h2>

      {/* lead */}
      {slide.lead ? (
        <motion.p
          variants={block}
          className={
            cover
              ? "mx-auto mt-7 max-w-[640px] font-serif text-[clamp(20px,2.6vw,27px)] italic text-coral leading-snug"
              : quote
                ? "mt-6 max-w-[760px] font-serif text-[clamp(24px,3.3vw,32px)] text-soft leading-[1.28]"
                : "mt-5 max-w-[760px] text-[clamp(16px,1.7vw,19px)] text-soft leading-relaxed"
          }
        >
          {slide.lead}
        </motion.p>
      ) : null}

      {/* stats */}
      {slide.stats?.length ? (
        <motion.div
          variants={block}
          className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-3"
        >
          {slide.stats.map((s, i) => {
            const accent = STAT_CYCLE[i % STAT_CYCLE.length];
            return (
              <div key={i}>
                <div
                  className={`font-serif text-[clamp(34px,5vw,52px)] font-semibold leading-none tracking-tight ${ACCENT_TEXT[accent]}`}
                >
                  {s.big}
                </div>
                <div className="mt-2.5 text-[13px] text-muted leading-snug">
                  {s.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      ) : null}

      {/* cards */}
      {slide.cards?.length ? (
        <motion.div
          variants={block}
          className={`mt-9 grid gap-4 ${cardGridCols(slide.cards.length)}`}
        >
          {slide.cards.map((c, i) => {
            const accent: Accent = c.accent ?? "coral";
            return (
              <div
                key={i}
                className="group rounded-2xl border border-line bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line2"
                data-cursor
              >
                <h3
                  className={`font-serif text-[18px] font-semibold tracking-tight ${ACCENT_TEXT[accent]}`}
                >
                  {c.t}
                </h3>
                <p className="mt-2 text-[14px] text-muted leading-relaxed">
                  {c.d}
                </p>
              </div>
            );
          })}
        </motion.div>
      ) : null}

      {/* cols */}
      {slide.cols?.length ? (
        <motion.div
          variants={block}
          className={`mt-9 grid gap-7 ${colGridCols(slide.cols.length)}`}
        >
          {slide.cols.map((col, i) => (
            <div key={i}>
              <h4 className="border-b border-line pb-3 font-mono text-[12px] tracking-[0.08em] text-soft uppercase">
                {col.h}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[14.5px] text-soft leading-relaxed"
                  >
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                      aria-hidden
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      ) : null}

      {/* steps */}
      {slide.steps?.length ? (
        <motion.div
          variants={block}
          className="mt-9 flex flex-wrap items-center gap-y-3"
        >
          {slide.steps.map((step, i) => (
            <span key={i} className="flex items-center">
              <span className="rounded-full border border-line bg-card px-4 py-2 text-[13.5px] text-soft">
                {step}
              </span>
              {i < slide.steps!.length - 1 ? (
                <span className="mx-2.5 font-mono text-coral" aria-hidden>
                  →
                </span>
              ) : null}
            </span>
          ))}
        </motion.div>
      ) : null}

      {/* bullets */}
      {slide.bullets?.length ? (
        <motion.ul variants={block} className="mt-9 space-y-4">
          {slide.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-3.5 text-[17px] text-soft leading-relaxed"
            >
              <span
                className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-teal"
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </motion.ul>
      ) : null}

      {/* cta */}
      {slide.cta ? (
        <motion.div
          variants={block}
          className={`mt-9 ${cover ? "mx-auto" : ""}`}
        >
          <CtaButton href={slide.cta.href} label={slide.cta.label} />
        </motion.div>
      ) : null}

      {/* spacer pushes footer content to the bottom on non-cover slides */}
      {!cover ? <div className="grow" /> : null}

      {/* note — top-bordered footer note */}
      {slide.note ? (
        <motion.p
          variants={block}
          className={`mt-8 border-t border-line pt-5 text-[14px] text-soft leading-relaxed ${
            cover ? "mx-auto max-w-[560px] border-t-0 pt-0" : ""
          }`}
        >
          {slide.note}
        </motion.p>
      ) : null}

      {/* footnote — punch line (quote/principles) OR small mono muted source */}
      {slide.footnote ? (
        punchLine ? (
          <motion.p
            variants={block}
            className="mt-7 font-serif text-[19px] italic text-coral leading-snug"
          >
            {slide.footnote}
          </motion.p>
        ) : (
          <motion.p
            variants={block}
            className="mt-6 font-mono text-[11.5px] tracking-[0.04em] text-muted"
          >
            {slide.footnote}
          </motion.p>
        )
      ) : null}
    </motion.div>
  );
}

/* ---------- CTA: internal Link vs external anchor ---------- */

function CtaButton({ href, label }: { href: string; label: string }) {
  const internal = ROUTE_MAP[href];
  const pill =
    "inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-[14px] font-medium text-[#1c0d07] transition-all duration-300 hover:bg-coral2";

  if (internal) {
    return (
      <Magnetic>
        <Link
          href={internal}
          className={pill}
          data-cursor
          data-cursor-label="open"
        >
          {label}
          <span aria-hidden>→</span>
        </Link>
      </Magnetic>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <Magnetic>
      <a
        href={href}
        className={pill}
        data-cursor
        data-cursor-label="open"
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {label}
        <span aria-hidden>→</span>
      </a>
    </Magnetic>
  );
}

/* ---------- responsive grid sizing by item count ---------- */

function cardGridCols(n: number): string {
  if (n <= 1) return "grid-cols-1";
  if (n === 2) return "grid-cols-1 sm:grid-cols-2";
  if (n === 3) return "grid-cols-1 sm:grid-cols-3";
  if (n === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"; // 5+
}

function colGridCols(n: number): string {
  if (n <= 1) return "grid-cols-1";
  if (n === 2) return "grid-cols-1 md:grid-cols-2";
  if (n === 3) return "grid-cols-1 md:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
}
