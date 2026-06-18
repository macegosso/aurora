"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type {
  ChatMsg,
  Outcome,
  Scenario,
  ScenarioStep,
  StepInternals,
  Xray,
} from "@/data/types";
import { ConfidenceRing } from "./ConfidenceRing";
import { ChatPanel } from "./ChatPanel";

const CASE_LABEL: Record<string, string> = {
  a_autismo_impacto: "Autismo / BPC",
  b_renda_despesas: "Renda + despesas",
  c_erro_calculo: "Erro do INSS",
  d_cadunico: "CadÚnico",
  e_nao_honesto: "O “não” honesto",
};

const OUTCOME: Record<Outcome, { label: string; color: string; dot: string }> = {
  resolve: { label: "Resolver", color: "text-teal", dot: "#34e3c4" },
  route: { label: "Rotear", color: "text-purple", dot: "#9d8bff" },
  honest_no: { label: "Dizer a verdade", color: "text-gold", dot: "#f0c24b" },
  cadunico: { label: "Desbloquear pré-requisito", color: "text-coral", dot: "#ff7e5a" },
};

const prettySlug = (s: string) => s.replace(/_/g, " ");

function LayerLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

function DataBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-3.5">
      <div className="mb-2 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}

/* ---------------- raio-X ---------------- */

function XrayPanel({ xray, stepKey }: { xray: Xray; stepKey: string }) {
  const rows = [
    { k: "O que está acontecendo", v: xray.seen, c: "text-soft" },
    { k: "O que a Aurora faz", v: xray.ai, c: "text-text" },
    { k: "Por que precisa de IA", v: xray.why, c: "text-soft" },
  ].filter((r) => r.v);

  return (
    <div className="rounded-2xl border border-line glass p-5">
      <LayerLabel color="#9d8bff">O raio-X · o raciocínio</LayerLabel>
      <AnimatePresence mode="wait">
        <motion.div
          key={stepKey}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-3.5"
        >
          {rows.map((r) => (
            <motion.div
              key={r.k}
              variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
            >
              <div className="mb-1 font-mono text-[10px] tracking-[0.1em] text-purple uppercase">
                {r.k}
              </div>
              <p className={`text-[13.5px] leading-snug ${r.c}`}>{r.v}</p>
            </motion.div>
          ))}
          {xray.chips?.length ? (
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {xray.chips.map((c, i) => (
                <span
                  key={i}
                  className={`rounded-full border px-3 py-1 text-[11.5px] ${
                    c.accent
                      ? "border-purple/40 bg-purple/10 text-purple"
                      : "border-line bg-card text-muted"
                  }`}
                >
                  {c.t}
                </span>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- dados (flexible) ---------------- */

function InternalsPanel({
  internals,
  outcome,
  stepKey,
}: {
  internals: StepInternals;
  outcome: Outcome;
  stepKey: string;
}) {
  const meta = OUTCOME[outcome];
  const { ocr, systems, retrieval, deadline, guardrails, triage, generation } = internals;

  return (
    <div className="rounded-2xl border border-line glass p-5">
      <LayerLabel color="#34e3c4">Os dados · sob o capô</LayerLabel>
      <AnimatePresence mode="wait">
        <motion.div
          key={stepKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {triage ? (
            <div className="flex items-center gap-5">
              <ConfidenceRing value={triage.confidence} />
              <div className="min-w-0">
                <div className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                  Triagem
                </div>
                <div className={`mt-1 flex items-center gap-2 font-display text-[16px] leading-tight font-semibold ${meta.color}`}>
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: meta.dot }} />
                  {triage.label}
                </div>
              </div>
            </div>
          ) : null}

          {triage?.signals?.length ? (
            <DataBlock label="Sinais">
              <div className="flex flex-wrap gap-2">
                {triage.signals.map((s) => (
                  <span key={s} className="rounded-md border border-line bg-card px-2.5 py-1 text-[11.5px] text-soft">
                    {s}
                  </span>
                ))}
              </div>
            </DataBlock>
          ) : null}

          {triage?.reasoning ? (
            <DataBlock label="Raciocínio">
              <p className="text-[12.5px] leading-snug text-soft italic">{triage.reasoning}</p>
            </DataBlock>
          ) : null}

          {deadline ? (
            <DataBlock label="Prazo">
              <div className="flex items-end gap-3">
                <span className="font-display text-[30px] leading-none font-bold text-coral">
                  {deadline.dias_restantes}
                </span>
                <span className="pb-1 text-[12px] text-muted">
                  dias · ciência {deadline.ciencia} → {deadline.prazo_final}
                </span>
              </div>
            </DataBlock>
          ) : null}

          {ocr ? (
            <DataBlock label="Leitura da carta (OCR)">
              <dl className="space-y-1.5">
                {Object.entries(ocr).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-[12.5px]">
                    <dt className="shrink-0 font-mono text-muted">{prettySlug(k)}:</dt>
                    <dd className="text-soft">{v}</dd>
                  </div>
                ))}
              </dl>
            </DataBlock>
          ) : null}

          {retrieval?.length ? (
            <DataBlock label="Norma recuperada (RAG)">
              <div className="flex flex-wrap gap-2">
                {retrieval.map((r) => (
                  <span key={r} className="rounded-md border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[11px] text-gold">
                    {prettySlug(r)}
                  </span>
                ))}
              </div>
            </DataBlock>
          ) : null}

          {generation ? (
            <DataBlock label={generation.doc_type ?? "Geração"}>
              {generation.excerpt ? (
                <p className="rounded-lg border border-line bg-bg2 p-3 font-mono text-[11.5px] leading-relaxed text-soft">
                  {generation.excerpt}
                </p>
              ) : null}
              {generation.citations?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {generation.citations.map((c) => (
                    <span key={c} className="rounded border border-teal/30 bg-teal/10 px-2 py-0.5 font-mono text-[10.5px] text-teal">
                      {prettySlug(c)}
                    </span>
                  ))}
                </div>
              ) : null}
            </DataBlock>
          ) : null}

          {guardrails?.length ? (
            <DataBlock label="Guard-rails (P0)">
              <ul className="space-y-1.5">
                {guardrails.map((g, i) => {
                  const ok = g.status === "pass";
                  return (
                    <motion.li
                      key={g.check}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-2 text-[12.5px] text-soft"
                    >
                      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] ${ok ? "bg-teal/20 text-teal" : "bg-pink/20 text-pink"}`}>
                        {ok ? "✓" : "!"}
                      </span>
                      {g.check}
                    </motion.li>
                  );
                })}
              </ul>
            </DataBlock>
          ) : null}

          {systems?.length ? (
            <DataBlock label="Sistemas">
              <div className="flex flex-wrap gap-2">
                {systems.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-card px-2.5 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </DataBlock>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- main ---------------- */

export function PrototypeExperience({ scenarios }: { scenarios: Scenario[] }) {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [stepIndex, setStepIndex] = useState(0);

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const steps = scenario.steps;
  const step: ScenarioStep | undefined = steps[stepIndex];
  const meta = OUTCOME[scenario.outcomeType];

  const select = (id: string) => {
    setScenarioId(id);
    setStepIndex(0);
  };

  const { messages, animateFrom } = useMemo(() => {
    const prior = steps.slice(0, stepIndex).flatMap((s) => s.chat);
    const current = steps[stepIndex]?.chat ?? [];
    return { messages: [...prior, ...current] as ChatMsg[], animateFrom: prior.length };
  }, [steps, stepIndex]);

  const total = steps.length;
  const atStart = stepIndex === 0;
  const atEnd = stepIndex === total - 1;
  const stageName = scenario.stages[stepIndex] ?? step?.kicker;

  return (
    <div>
      {/* case tabs */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {scenarios.map((s) => {
          const active = s.id === scenarioId;
          return (
            <button
              key={s.id}
              type="button"
              data-cursor
              onClick={() => select(s.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[13px] whitespace-nowrap transition-all ${
                active
                  ? "border-teal/60 bg-teal/10 text-text"
                  : "border-line bg-panel text-muted hover:border-line2 hover:text-soft"
              }`}
            >
              {s.recommended ? <span className="mr-1 text-teal">★</span> : null}
              {CASE_LABEL[s.id] ?? s.benefit}
            </button>
          );
        })}
      </div>

      {/* scenario header */}
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-7 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-card/40 p-5 md:grid-cols-[1fr_auto]"
      >
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] text-coral uppercase">
            {scenario.benefit}
          </div>
          <div className="mt-1.5 font-display text-[18px] font-semibold text-text">
            {scenario.persona.name}
          </div>
          <p className="mt-1 max-w-[640px] text-[13.5px] leading-snug text-muted">
            {scenario.persona.line}
          </p>
          {scenario.letter?.text ? (
            <div className="mt-3 rounded-xl border-l-2 border-line2 bg-bg2/60 p-3 text-[12.5px] leading-snug text-soft italic">
              {scenario.letter.text}
            </div>
          ) : null}
        </div>
        <div className="flex items-start">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12.5px] font-medium ${meta.color}`}
            style={{ borderColor: meta.dot + "55", background: meta.dot + "1a" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: meta.dot }} />
            Saída: {meta.label}
          </span>
        </div>
      </motion.div>

      {/* stage title */}
      {step ? (
        <div className="mt-7">
          <div className="font-mono text-[11px] tracking-[0.16em] text-coral uppercase">
            {step.kicker}
          </div>
          <h2 className="mt-1 font-display text-[clamp(22px,3vw,30px)] font-semibold tracking-tight text-text">
            {step.title}
          </h2>
        </div>
      ) : null}

      {/* three layers */}
      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,400px)_1fr]">
        <div className="flex flex-col">
          <LayerLabel color="#ff7e5a">A experiência · no WhatsApp</LayerLabel>
          <div className="h-[560px]">
            <ChatPanel messages={messages} animateFrom={animateFrom} />
          </div>
        </div>

        <div className="space-y-5">
          {step ? <XrayPanel xray={step.xray} stepKey={`${scenario.id}-${stepIndex}`} /> : null}
          {step ? (
            <InternalsPanel
              internals={step.internals}
              outcome={scenario.outcomeType}
              stepKey={`${scenario.id}-${stepIndex}`}
            />
          ) : null}

          {/* ending */}
          <AnimatePresence>
            {atEnd && scenario.ending ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border p-5"
                style={{ borderColor: meta.dot + "55", background: meta.dot + "12" }}
              >
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: meta.dot }}>
                  Desfecho
                </div>
                <div className="mt-1.5 font-display text-[18px] font-semibold text-text">
                  {scenario.ending.headline}
                </div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-soft">
                  {scenario.ending.body}
                </p>
                {scenario.ending.artifact ? (
                  <div className="mt-3 rounded-xl border border-line bg-bg2/70 p-3">
                    <div className="flex items-center gap-2 font-mono text-[12px] text-teal">
                      📄 {scenario.ending.artifact.title}
                    </div>
                    {scenario.ending.artifact.excerpt ? (
                      <p className="mt-1.5 text-[12px] leading-snug text-muted">
                        {scenario.ending.artifact.excerpt}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className="mt-8 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={atStart}
            data-cursor
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-[13.5px] text-soft transition-all hover:border-line2 hover:bg-card2 disabled:cursor-not-allowed disabled:opacity-35"
          >
            ← Voltar
          </button>

          <div className="text-center">
            <div className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              {stageName} · {stepIndex + 1}/{total}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
            disabled={atEnd}
            data-cursor
            data-cursor-label="próximo"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-[#04111a] transition-transform disabled:cursor-not-allowed disabled:opacity-35"
            style={{ backgroundImage: "var(--aurora)" }}
          >
            Avançar →
          </button>
        </div>

        {/* stage rail */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {scenario.stages.map((label, i) => {
            const active = i === stepIndex;
            const done = i < stepIndex;
            return (
              <button
                key={label + i}
                type="button"
                onClick={() => setStepIndex(i)}
                data-cursor
                className={`rounded-full px-3 py-1.5 text-[11.5px] transition-all ${
                  active
                    ? "bg-teal/15 text-teal"
                    : done
                      ? "text-soft hover:text-text"
                      : "text-muted hover:text-soft"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
