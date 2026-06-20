"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisRef: Lenis | null = null;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On the case (/deck) we use native scroll + CSS scroll-snap, which Lenis
    // would override — so skip smooth scroll there.
    if (reduce || pathname === "/deck") return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, [pathname]);

  // Reset scroll on route change (v16 no longer auto-scrolls to top for us).
  useEffect(() => {
    if (lenisRef) lenisRef.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // refresh triggers after the new route paints
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return <>{children}</>;
}
