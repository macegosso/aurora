import { Reveal } from "@/components/Reveal";

const LAYERS = [
  {
    k: "01",
    label: "A experiência",
    desc: "O que a pessoa vê — a conversa, no WhatsApp.",
    color: "#ff7e5a",
    tint: "rgba(255,126,90,.12)",
    icon: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    k: "02",
    label: "O raio-X",
    desc: "O raciocínio da IA — o que ela faz, e por que só IA faz.",
    color: "#9d8bff",
    tint: "rgba(157,139,255,.12)",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </>
    ),
  },
  {
    k: "03",
    label: "Os dados",
    desc: "A base por baixo — norma citada, triagem calibrada e guard-rails.",
    color: "#34e3c4",
    tint: "rgba(52,227,196,.12)",
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </>
    ),
  },
];

export function HowToRead() {
  return (
    <div className="wrap pt-4 pb-2">
      <Reveal immediate>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="font-mono text-[12px] tracking-[0.16em] text-teal uppercase">
            Como ler — o mesmo passo, em três camadas
          </div>
          <div className="text-[13px] text-muted">
            Triagem honesta:{" "}
            <span className="text-teal">resolver</span> ·{" "}
            <span className="text-purple">rotear</span> ·{" "}
            <span className="text-gold">dizer a verdade</span>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <Reveal key={l.k} delay={i * 0.08}>
            <div className="ring-aurora group relative h-full overflow-hidden rounded-2xl border border-line glass p-5 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: l.tint }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={l.color}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {l.icon}
                  </svg>
                </div>
                <div className="font-mono text-[11px] tracking-[0.16em] text-muted">
                  {l.k}
                </div>
              </div>
              <div className="mt-4 font-display text-[18px] font-semibold" style={{ color: l.color }}>
                {l.label}
              </div>
              <p className="mt-1.5 text-[13.5px] leading-snug text-muted">{l.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
