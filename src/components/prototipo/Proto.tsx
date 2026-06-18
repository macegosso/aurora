"use client";

import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";

const PROTOTYPE_SRC = "/prototipo.html";

/**
 * Frames the standalone interactive prototype. The iframe lazy-mounts when the
 * frame scrolls into view (keeps the static HTML out of the initial paint), and
 * a Fullscreen API button promotes the frame to a borderless full-viewport view.
 * Falls back gracefully where the Fullscreen API is unavailable.
 */
export function Proto() {
  const frameRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  // Lazy-mount the iframe once the frame nears the viewport.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Track native fullscreen state + capability.
  useEffect(() => {
    const el = frameRef.current;
    setCanFullscreen(Boolean(el && el.requestFullscreen));
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const enterFullscreen = () => {
    const el = frameRef.current;
    if (!el?.requestFullscreen) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      void el.requestFullscreen();
    }
  };

  return (
    <div className="wrap pt-10 pb-28 md:pt-12 md:pb-36">
      {/* Hint bar + open-in-new-tab pill */}
      <Reveal>
        <div className="flex flex-col gap-5 rounded-[18px] border border-line bg-panel/60 p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
          <p className="max-w-[640px] text-[15px] leading-relaxed text-soft">
            Percorra os cinco casos passo a passo. A cada passo, três camadas: a
            conversa, o raciocínio{" "}
            <span className="text-coral">(raio-X)</span> e os dados por baixo.
            Melhor em tela cheia.
          </p>

          <Magnetic className="shrink-0">
            <a
              href={PROTOTYPE_SRC}
              target="_blank"
              rel="noopener"
              data-cursor
              data-cursor-label="abrir"
              className="group inline-flex items-center gap-2 rounded-full border border-coral/50 px-5 py-2.5 font-mono text-xs tracking-[0.08em] text-coral uppercase transition-colors duration-300 hover:border-coral hover:bg-coral/10"
            >
              Abrir em tela cheia
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </Magnetic>
        </div>
      </Reveal>

      {/* Framed prototype with faux browser chrome */}
      <Reveal delay={0.08}>
        <div
          ref={frameRef}
          className="group/frame mt-7 overflow-hidden rounded-[22px] border border-line bg-panel transition-colors duration-300 hover:border-line2 data-[fs=true]:rounded-none data-[fs=true]:border-0"
          data-fs={isFullscreen}
        >
          {/* Browser chrome top bar */}
          <div className="flex items-center gap-3 border-b border-line bg-bg2/70 px-4 py-3">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-3 rounded-full bg-coral/70" />
              <span className="size-3 rounded-full bg-gold/70" />
              <span className="size-3 rounded-full bg-teal/70" />
            </div>

            <div className="mx-auto flex max-w-full items-center gap-2 truncate rounded-full border border-line bg-card/60 px-4 py-1.5 font-mono text-[11px] tracking-[0.04em] text-muted">
              <span className="size-1.5 rounded-full bg-teal/80" aria-hidden />
              aurora · protótipo
            </div>

            {canFullscreen ? (
              <button
                type="button"
                onClick={enterFullscreen}
                data-cursor
                data-cursor-label={isFullscreen ? "sair" : "expandir"}
                aria-label={
                  isFullscreen ? "Sair da tela cheia" : "Expandir para tela cheia"
                }
                className="shrink-0 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-muted uppercase transition-colors duration-300 hover:border-coral/50 hover:text-coral"
              >
                {isFullscreen ? "Fechar ✕" : "Expandir ⛶"}
              </button>
            ) : null}
          </div>

          {/* Lazy-mounted iframe stage */}
          <div
            ref={sentinelRef}
            className="relative h-[78vh] min-h-[560px] w-full data-[fs=true]:h-full"
            data-fs={isFullscreen}
          >
            {mounted ? (
              <iframe
                src={PROTOTYPE_SRC}
                title="Protótipo Aurora"
                loading="lazy"
                className="block h-full w-full border-0 bg-bg"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-bg">
                <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  carregando protótipo…
                </span>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
