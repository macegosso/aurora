"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DossierDoc } from "@/data/types";
import { SectionHeading } from "@/components/SectionHeading";

/** Markdown -> dark design system. Every element is restyled. */
const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-2 mb-5 font-serif text-3xl font-semibold tracking-tight text-text md:text-[2.4rem] md:leading-[1.1]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 border-t border-line pt-9 font-serif text-2xl font-semibold tracking-tight text-text md:text-[1.7rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-coral uppercase">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-7 mb-2 text-base font-semibold tracking-tight text-teal">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[15.5px] leading-[1.72] text-soft">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text">{children}</strong>
  ),
  em: ({ children }) => <em className="text-soft italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="text-coral underline decoration-coral/40 underline-offset-2 transition-colors hover:decoration-coral"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-5 text-[15.5px] leading-[1.72] text-soft marker:text-coral/70">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 text-[15.5px] leading-[1.72] text-soft marker:text-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-lg border-l-2 border-coral bg-card px-5 py-3 text-[15px] leading-[1.7] text-soft italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  code: ({ className, children }) => {
    const isBlock = typeof className === "string" && className.includes("language-");
    if (isBlock) {
      return <code className={`${className} font-mono text-[13px] text-soft`}>{children}</code>;
    }
    return (
      <code className="rounded-md bg-card2 px-1.5 py-0.5 font-mono text-[0.86em] text-gold">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-line bg-bg2 p-4 text-[13px] leading-[1.6]">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left text-[14px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-card">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-line last:border-0 odd:bg-card/40">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="border-r border-line px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-soft uppercase last:border-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-r border-line px-4 py-2.5 align-top text-soft last:border-0">
      {children}
    </td>
  ),
};

export function DossierReader({ docs }: { docs: DossierDoc[] }) {
  const [activeId, setActiveId] = useState(docs[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const paneRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => docs.find((d) => d.id === activeId) ?? docs[0],
    [docs, activeId],
  );

  // Track window scroll for the top read-progress bar.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeId]);

  const selectDoc = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!active) return null;

  return (
    <>
      <motion.div
        className="read-progress"
        style={{ width: "100%", scaleX: progress }}
      />

      <SectionHeading
        kicker="Documentos organizadores"
        title="A profundidade por trás de cada afirmação"
      >
        Os documentos que sustentam o case.
      </SectionHeading>

      <div className="wrap pb-32">
        {/* Mobile: horizontal chip row */}
        <nav
          aria-label="Documentos"
          className="-mx-5 mb-7 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden"
        >
          {docs.map((d) => {
            const isActive = d.id === active.id;
            return (
              <button
                key={d.id}
                type="button"
                data-cursor
                onClick={() => selectDoc(d.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-coral bg-card text-coral"
                    : "border-line bg-panel text-muted hover:border-line2 hover:text-soft"
                }`}
              >
                {d.title}
              </button>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop: sticky sidebar */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Documentos"
              className="sticky top-[90px] flex flex-col gap-1.5"
            >
              {docs.map((d) => {
                const isActive = d.id === active.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    data-cursor
                    onClick={() => selectDoc(d.id)}
                    className={`group rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? "border-coral/60 bg-card"
                        : "border-transparent hover:border-line hover:bg-card/40"
                    }`}
                  >
                    <div
                      className={`font-serif text-[15px] leading-snug font-medium tracking-tight transition-colors ${
                        isActive ? "text-coral" : "text-text"
                      }`}
                    >
                      {d.title}
                    </div>
                    {d.subtitle ? (
                      <div className="mt-0.5 text-[12.5px] leading-snug text-muted">
                        {d.subtitle}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Reading pane */}
          <article className="min-w-0 rounded-[22px] border border-line bg-panel p-7 md:p-[42px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-[74ch]"
              >
                {active.subtitle ? (
                  <div className="mb-6 font-mono text-xs tracking-[0.14em] text-coral uppercase">
                    {active.subtitle}
                  </div>
                ) : null}
                <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {active.md}
                </Markdown>
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </>
  );
}
