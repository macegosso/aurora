"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { ChatMsg } from "@/data/types";
import { Mark } from "@/components/Mark";

function Bubble({
  msg,
  animate,
  delay,
}: {
  msg: ChatMsg;
  animate: boolean;
  delay: number;
}) {
  const me = msg.who === "me"; // citizen on the right, Aurora ("them") on the left
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14, scale: 0.96 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26, delay }}
      className={`flex ${me ? "justify-end" : "justify-start"}`}
    >
      {msg.doc ? (
        <div
          className={`flex max-w-[82%] items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-[12.5px] ${
            me ? "rounded-br-md border-teal/30 bg-teal/10" : "rounded-bl-md border-line bg-card"
          }`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-bg2 text-[14px]">
            📄
          </span>
          <span className="min-w-0">
            <span className="block truncate text-text">{msg.doc}</span>
            {msg.sz ? <span className="text-[11px] text-muted">{msg.sz}</span> : null}
          </span>
        </div>
      ) : (
        <div
          className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug whitespace-pre-line ${
            me
              ? "rounded-br-md bg-teal/15 text-text"
              : "rounded-bl-md border border-line bg-card text-soft"
          }`}
        >
          {msg.t}
        </div>
      )}
    </motion.div>
  );
}

export function ChatPanel({
  messages,
  animateFrom = 0,
}: {
  messages: ChatMsg[];
  animateFrom?: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[420px] flex-col overflow-hidden rounded-[34px] border border-line2 bg-bg2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]">
      <div className="absolute top-2 left-1/2 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-line2" />

      <div className="flex items-center gap-3 border-b border-line bg-panel px-4 pt-6 pb-3">
        <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--aurora)" }}>
          <Mark size={20} />
        </div>
        <div className="min-w-0">
          <div className="font-display text-[15px] font-semibold text-text">Aurora</div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            copiloto · online
          </div>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4"
        style={{
          background:
            "linear-gradient(180deg, rgba(157,139,255,0.04), transparent 30%), var(--color-bg)",
        }}
      >
        {messages.map((m, i) => (
          <Bubble
            key={i}
            msg={m}
            animate={i >= animateFrom}
            delay={Math.max(0, i - animateFrom) * 0.5}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-panel px-3 py-2.5">
        <div className="flex-1 rounded-full border border-line bg-bg px-4 py-2 text-[12px] text-muted">
          Mensagem
        </div>
        <div
          className="grid h-8 w-8 place-items-center rounded-full text-[#04111a]"
          style={{ background: "var(--aurora)" }}
        >
          ↑
        </div>
      </div>
    </div>
  );
}
