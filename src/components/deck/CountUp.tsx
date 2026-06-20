"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Counts a number up to its value when scrolled into view. Parses the leading
 * number out of strings like "8 mi", "13,2%", "+800 mil", "274 mil".
 * Falls back to the static string for ranges ("R$ 8–15 bi") or non-numerics.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  const m = value.match(/^([^\d]*)([\d.,]+)([\s\S]*)$/);
  const isRange = /[\d][–—-]\s*[\d]/.test(value); // 8–15 etc.
  const animatable = !!m && !isRange;

  const [disp, setDisp] = useState(animatable ? `${m![1]}0${m![3]}` : value);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animatable || !m) return;
    if (reduce) {
      setDisp(value);
      return;
    }
    if (!inView) return;

    const prefix = m[1];
    const suffix = m[3];
    const numStr = m[2];
    const decimals = (numStr.split(/[.,]/)[1] || "").length;
    const target = parseFloat(numStr.replace(/\./g, "").replace(",", "."));
    const dur = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = target * eased;
      const formatted = cur.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      setDisp(`${prefix}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{disp}</span>;
}
