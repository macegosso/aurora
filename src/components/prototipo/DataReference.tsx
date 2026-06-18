import type { KbEntry, TriageRules } from "@/data/types";
import { Reveal } from "@/components/Reveal";

const OUTCOME_COLOR: Record<string, string> = {
  Resolver: "#34e3c4",
  Rotear: "#9d8bff",
  "Dizer a verdade": "#f0c24b",
  "Bloqueio de pré-requisito": "#ff7e5a",
};

export function DataReference({
  triage,
  kb,
}: {
  triage: TriageRules;
  kb: KbEntry[];
}) {
  return (
    <section className="mt-24">
      <Reveal>
        <div className="font-mono text-[12px] tracking-[0.16em] text-teal uppercase">
          Os dados por trás
        </div>
        <h2 className="mt-2 max-w-[760px] font-display text-[clamp(24px,3.4vw,38px)] font-semibold tracking-tight">
          O moat não é o modelo — é a base normativa, a triagem calibrada e os
          guard-rails.
        </h2>
        <p className="mt-3 max-w-[680px] text-[15px] text-muted">{triage.summary}</p>
      </Reveal>

      {/* triagem — four outcomes */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {triage.rules.map((r, i) => {
          const color = OUTCOME_COLOR[r.outcome] ?? "#9d8bff";
          return (
            <Reveal key={r.outcome} delay={i * 0.07}>
              <div
                className="h-full rounded-2xl border bg-card/40 p-5"
                style={{ borderColor: color + "44" }}
              >
                <div
                  className="flex items-center gap-2 font-display text-[16px] font-semibold"
                  style={{ color }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  {r.outcome}
                </div>
                <p className="mt-3 text-[13px] leading-snug text-soft">{r.when}</p>
                <p className="mt-2.5 border-t border-line pt-2.5 text-[12.5px] leading-snug text-muted">
                  {r.action}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {triage.confidence_gate ? (
        <Reveal>
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-purple/30 bg-purple/[0.07] p-4">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-purple/15 text-purple">
              ⚐
            </span>
            <p className="text-[13.5px] leading-relaxed text-soft">
              <span className="font-medium text-purple">Humano no loop.</span>{" "}
              {triage.confidence_gate}
            </p>
          </div>
        </Reveal>
      ) : null}

      {/* base normativa — expandable */}
      <Reveal>
        <div className="mt-12 mb-4 font-mono text-[11px] tracking-[0.16em] text-gold uppercase">
          Base normativa citável · {kb.length} fontes
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
        {kb.map((e) => (
          <details
            key={e.id}
            className="group rounded-xl border border-line bg-panel/60 px-4 py-3 transition-colors open:border-line2 open:bg-card/50"
          >
            <summary
              data-cursor
              className="flex cursor-pointer list-none items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2.5">
                <span className="font-display text-[14.5px] font-semibold text-text">
                  {e.topic}
                </span>
                {e.volatile ? (
                  <span className="rounded-full border border-coral/40 bg-coral/10 px-2 py-0.5 font-mono text-[9.5px] tracking-wide text-coral uppercase">
                    volátil
                  </span>
                ) : null}
              </span>
              <span className="font-mono text-[16px] text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-3 space-y-2.5 border-t border-line pt-3">
              <p className="text-[13.5px] leading-relaxed text-soft">{e.plain}</p>
              <p className="text-[12.5px] leading-relaxed text-muted">{e.rule}</p>
              <p className="font-mono text-[11px] leading-snug text-gold/80">{e.source}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
