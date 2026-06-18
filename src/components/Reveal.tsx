"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal-on-scroll wrapper. Children fade/slide/de-blur into view.
 *
 * - Default: triggers via `whileInView` (for genuinely below-the-fold content).
 * - `immediate`: triggers on mount instead — use for above-the-fold primary
 *   content (page headings, hero-adjacent blocks) that must never depend on a
 *   scroll/IntersectionObserver event to become visible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  immediate?: boolean;
}) {
  const variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
    },
  };

  const trigger = immediate
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once: true, margin: "0px 0px -12% 0px" } as const,
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={variants}
      {...trigger}
    >
      {children}
    </motion.div>
  );
}
