"use client";

import type { ReactNode } from "react";
import type { CV } from "@/data/types";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

/* ---------- helpers ---------- */

/** Normalize a bare host/path into an absolute https:// URL. */
function toHref(raw: string): string {
  const v = raw.trim();
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v.replace(/^\/+/, "")}`;
}

/** Strip protocol + trailing slash for a clean display label. */
function displayUrl(raw: string): string {
  return raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

/* ---------- contact ---------- */

function ContactItem({
  glyph,
  href,
  external,
  children,
}: {
  glyph: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const body = (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="text-muted/70 select-none">
        {glyph}
      </span>
      {children}
    </span>
  );

  if (!href) {
    return <span className="text-soft">{body}</span>;
  }

  return (
    <Magnetic strength={0.25}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor
        data-cursor-label="open"
        className="text-soft transition-colors hover:text-coral"
      >
        {body}
      </a>
    </Magnetic>
  );
}

/* ---------- section frame ---------- */

function Section({
  label,
  delay = 0,
  children,
}: {
  label: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className="mt-14 first:mt-0">
      <section>
        <h2 className="mb-5 font-mono text-xs tracking-[0.18em] text-teal uppercase">
          {label}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

/* ---------- chips ---------- */

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-[13px] text-soft transition-colors hover:border-line2 hover:text-text">
      {children}
    </span>
  );
}

/* ============================================================ */

export function CVView({ cv }: { cv: CV }) {
  const c = cv;
  const isPlaceholder = c.name.startsWith("Seu Nome");

  const hasContact =
    c.email || c.phone || c.location || c.linkedin || c.github || c.website;

  const experience = c.experience?.filter((e) => e.role || e.company) ?? [];
  const skills = c.skills?.filter(Boolean) ?? [];
  const education = c.education?.filter((e) => e.course || e.school) ?? [];
  const languages = c.languages?.filter(Boolean) ?? [];

  return (
    <main className="wrap pt-28 pb-40 md:pt-32">
      <div className="mx-auto max-w-[860px]">
        {isPlaceholder ? (
          <Reveal>
            <div
              className="mb-10 rounded-xl border border-dashed border-gold/45 bg-gold/[0.04] px-4 py-3 font-mono text-[12px] leading-relaxed text-gold/90"
              role="note"
            >
              Dados de exemplo — edite em{" "}
              <span className="text-gold">src/data/deck.ts</span> (objeto{" "}
              <span className="text-gold">CV</span>).
            </div>
          </Reveal>
        ) : null}

        {/* Header */}
        <Reveal>
          <header>
            <h1 className="font-serif text-[40px] font-semibold tracking-tight md:text-[46px]">
              {c.name}
            </h1>
            {c.role ? (
              <p className="mt-1.5 font-mono text-[13px] tracking-[0.08em] text-coral uppercase">
                {c.role}
              </p>
            ) : null}
            {c.tagline ? (
              <p className="mt-3 max-w-[620px] font-serif text-[17px] text-soft italic md:text-lg">
                {c.tagline}
              </p>
            ) : null}

            {hasContact ? (
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-mono text-[12.5px]">
                {c.email ? (
                  <ContactItem glyph="✉" href={`mailto:${c.email}`}>
                    {c.email}
                  </ContactItem>
                ) : null}
                {c.phone ? (
                  <ContactItem glyph="☎" href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>
                    {c.phone}
                  </ContactItem>
                ) : null}
                {c.location ? (
                  <ContactItem glyph="⌖">{c.location}</ContactItem>
                ) : null}
                {c.linkedin ? (
                  <ContactItem glyph="in" href={toHref(c.linkedin)} external>
                    {displayUrl(c.linkedin)}
                  </ContactItem>
                ) : null}
                {c.github ? (
                  <ContactItem glyph="gh" href={toHref(c.github)} external>
                    {displayUrl(c.github)}
                  </ContactItem>
                ) : null}
                {c.website ? (
                  <ContactItem glyph="↗" href={toHref(c.website)} external>
                    {displayUrl(c.website)}
                  </ContactItem>
                ) : null}
              </div>
            ) : null}
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <hr className="mt-10 border-0 border-t border-line" />
        </Reveal>

        {/* Resumo */}
        {c.summary ? (
          <Section label="Resumo" delay={0.05}>
            <p className="max-w-[680px] text-[15px] leading-relaxed text-soft">
              {c.summary}
            </p>
          </Section>
        ) : null}

        {/* Experiência */}
        {experience.length ? (
          <Section label="Experiência" delay={0.05}>
            <ol className="relative ml-1 border-l border-line/80 pl-7">
              {experience.map((e, i) => (
                <li key={`${e.company}-${i}`} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute top-2 -left-[33px] h-2.5 w-2.5 rounded-full bg-coral ring-4 ring-bg"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[16px] font-medium text-text">
                      {e.role}
                      {e.role && e.company ? (
                        <span className="text-muted"> · </span>
                      ) : null}
                      <span className="text-soft">{e.company}</span>
                    </h3>
                    {e.period ? (
                      <span className="font-mono text-[12px] whitespace-nowrap text-muted">
                        {e.period}
                      </span>
                    ) : null}
                  </div>
                  {e.points?.length ? (
                    <ul className="mt-3 space-y-2">
                      {e.points.filter(Boolean).map((p, j) => (
                        <li
                          key={j}
                          className="relative pl-5 text-[14.5px] leading-relaxed text-soft"
                        >
                          <span
                            aria-hidden
                            className="absolute top-[0.55em] left-0 h-1.5 w-1.5 rounded-full bg-coral/80"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {/* Competências */}
        {skills.length ? (
          <Section label="Competências" delay={0.05}>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((s, i) => (
                <Chip key={i}>{s}</Chip>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Formação */}
        {education.length ? (
          <Section label="Formação" delay={0.05}>
            <ul>
              {education.map((e, i) => (
                <li
                  key={`${e.school}-${i}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-4 last:border-b-0"
                >
                  <span className="text-[15px] text-soft">
                    <span className="text-text">{e.course}</span>
                    {e.course && e.school ? (
                      <span className="text-muted"> · </span>
                    ) : null}
                    {e.school}
                  </span>
                  {e.period ? (
                    <span className="font-mono text-[12px] whitespace-nowrap text-muted">
                      {e.period}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Idiomas */}
        {languages.length ? (
          <Section label="Idiomas" delay={0.05}>
            <div className="flex flex-wrap gap-2.5">
              {languages.map((l, i) => (
                <Chip key={i}>{l}</Chip>
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </main>
  );
}
