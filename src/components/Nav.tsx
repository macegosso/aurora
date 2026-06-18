"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "./Mark";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Visão geral" },
  { href: "/deck", label: "Deck" },
  { href: "/prototipo", label: "Protótipo" },
  { href: "/dossie", label: "Dossiê" },
  { href: "/cv", label: "CV" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300"
      style={{
        background: scrolled ? "rgba(5,6,14,0.7)" : "rgba(5,6,14,0)",
        backdropFilter: scrolled ? "blur(16px) saturate(150%)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--color-line)" : "transparent"}`,
      }}
    >
      <div className="wrap flex h-[68px] items-center gap-6">
        <Link
          href="/"
          data-cursor
          className="flex items-center gap-2.5 font-serif text-[22px] font-semibold tracking-tight"
        >
          <Mark size={26} className="aurora-pulse" />
          Aurora
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                data-cursor
                className="relative rounded-full px-3.5 py-2 text-sm whitespace-nowrap transition-colors"
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
      </div>
    </nav>
  );
}
