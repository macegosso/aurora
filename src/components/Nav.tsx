"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mark } from "./Mark";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Visão geral" },
  { href: "/deck", label: "Case" },
  { href: "/prototipo", label: "Protótipo" },
  { href: "/dossie", label: "Documentos" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300"
      style={{
        background: solid ? "rgba(5,6,14,0.8)" : "rgba(5,6,14,0)",
        backdropFilter: solid ? "blur(16px) saturate(150%)" : "none",
        borderBottom: `1px solid ${solid ? "var(--color-line)" : "transparent"}`,
      }}
    >
      <div className="wrap flex h-[60px] items-center gap-4 sm:h-[68px]">
        <Link
          href="/"
          data-cursor
          className="flex items-center gap-2.5 font-serif text-[20px] font-semibold tracking-tight sm:text-[22px]"
        >
          <Mark size={24} className="aurora-pulse" />
          Aurora
        </Link>

        {/* desktop links */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                data-cursor
                className="rounded-full px-3.5 py-2 text-sm whitespace-nowrap transition-colors"
                style={{
                  color: active ? "var(--color-text)" : "var(--color-muted)",
                  background: active ? "var(--color-card)" : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          data-cursor
          onClick={() => setOpen((o) => !o)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          style={{ background: open ? "var(--color-card)" : "transparent" }}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-text transition-all duration-300"
              style={{ top: open ? "6px" : "1px", transform: open ? "rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-[6px] block h-[1.5px] w-5 rounded-full bg-text transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-text transition-all duration-300"
              style={{ top: open ? "6px" : "11px", transform: open ? "rotate(-45deg)" : "none" }}
            />
          </span>
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
            style={{ background: "rgba(5,6,14,0.96)", backdropFilter: "blur(16px)" }}
          >
            <div className="wrap flex flex-col py-3">
              {LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    data-cursor
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[17px] transition-colors"
                    style={{
                      color: active ? "var(--color-text)" : "var(--color-soft)",
                      background: active ? "var(--color-card)" : "transparent",
                    }}
                  >
                    {l.label}
                    {active ? <span className="h-1.5 w-1.5 rounded-full bg-teal" /> : null}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
