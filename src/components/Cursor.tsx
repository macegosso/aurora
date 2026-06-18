"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small dot + a lerping ring that grows and tints when
 * hovering interactive targets ([data-cursor] or a/button). Hidden on
 * coarse-pointer devices.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-cursor");

    const d = dot.current!;
    const r = ring.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a, button, [data-cursor]");
      r.dataset.active = interactive ? "true" : "false";
      const label = interactive?.getAttribute("data-cursor-label");
      r.dataset.label = label ? "true" : "false";
      r.textContent = label ?? "";
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => (r.dataset.down = "true");
    const onUp = () => (r.dataset.down = "false");
    const onLeave = () => {
      d.style.opacity = "0";
      r.style.opacity = "0";
    };
    const onEnter = () => {
      d.style.opacity = "1";
      r.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden data-active="false" />
    </>
  );
}
