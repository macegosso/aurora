"use client";

import { motion } from "motion/react";

/** Animated calibrated-confidence dial (0..1) with the aurora gradient stroke. */
export function ConfidenceRing({
  value,
  size = 92,
}: {
  value: number;
  size?: number;
}) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value));

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="conf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34e3c4" />
            <stop offset="55%" stopColor="#9d8bff" />
            <stop offset="100%" stopColor="#ff5fa8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line2)"
          strokeWidth={6}
          opacity={0.5}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#conf-grad)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          key={pct}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-[20px] font-bold text-text"
        >
          {pct.toFixed(2).replace(".", ",")}
        </motion.span>
        <span className="font-mono text-[8.5px] tracking-[0.12em] text-muted uppercase">
          confiança
        </span>
      </div>
    </div>
  );
}
