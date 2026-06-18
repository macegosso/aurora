"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import type { Slide } from "@/data/types";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { SlideContent } from "./SlideContent";

// crossfade + slight x/scale, resolved per `custom={direction}` (+1 fwd / -1 back)
const stageVariants: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 36, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d * -36, scale: 0.985 }),
};

export function DeckViewer({ slides }: { slides: Slide[] }) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  // direction drives the crossfade offset (+1 forward, -1 back)
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number, dir: number) => {
      setIndex((cur) => {
        const clamped = Math.max(0, Math.min(total - 1, next));
        if (clamped !== cur) setDirection(dir);
        return clamped;
      });
    },
    [total],
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDirection(-1);
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setDirection(1);
        setIndex((i) => Math.min(total - 1, i + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const slide = slides[index];
  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <section className="pb-32">
      <SectionHeading kicker="O deck" title="A narrativa do case">
        Cada slide carrega um argumento no título. Leia os títulos em sequência
        e você terá a tese inteira — do problema ao pedido. Use as setas do
        teclado ou os controles abaixo.
      </SectionHeading>

      <div className="wrap mt-10">
        <Reveal immediate>
          {/* stage */}
          <div
            className="relative min-h-[540px] overflow-hidden rounded-[22px] border border-line p-7 sm:p-10 md:p-[54px]"
            style={{
              background:
                "linear-gradient(160deg, var(--color-panel) 0%, var(--color-bg2) 100%)",
            }}
          >
            {/* slide counter, top-right of stage */}
            <div className="pointer-events-none absolute right-6 top-6 font-mono text-[11px] tracking-[0.14em] text-muted">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={stageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full min-h-[440px]"
              >
                <SlideContent slide={slide} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* controls */}
        <div className="mt-7 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Magnetic>
              <button
                type="button"
                onClick={prev}
                disabled={atStart}
                data-cursor
                aria-label="Slide anterior"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-[13.5px] text-soft transition-all duration-300 hover:border-line2 hover:bg-card2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-card"
              >
                <span aria-hidden>←</span> Voltar
              </button>
            </Magnetic>

            <div className="font-mono text-[12px] tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-line2">/</span>{" "}
              {String(total).padStart(2, "0")}
            </div>

            <Magnetic>
              <button
                type="button"
                onClick={next}
                disabled={atEnd}
                data-cursor
                aria-label="Próximo slide"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-[13.5px] text-soft transition-all duration-300 hover:border-line2 hover:bg-card2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-card"
              >
                Avançar <span aria-hidden>→</span>
              </button>
            </Magnetic>
          </div>

          {/* dot indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {slides.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  data-cursor
                  aria-label={`Ir para o slide ${i + 1}`}
                  aria-current={active ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active
                      ? "w-7 bg-coral"
                      : "w-2 bg-line2 hover:bg-muted"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
