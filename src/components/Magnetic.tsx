"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Pulls children toward the cursor on hover. Uses gsap.quickTo (a single
 * reusable tween) so high-frequency mousemove updates stay smooth.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    xTo.current = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !xTo.current || !yTo.current) return;
    const rect = el.getBoundingClientRect();
    xTo.current((e.clientX - rect.left - rect.width / 2) * strength);
    yTo.current((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
