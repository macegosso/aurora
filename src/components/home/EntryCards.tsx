import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

type Entry = {
  href: string;
  title: string;
  desc: string;
  accent: string;
  tint: string;
  icon: React.ReactNode;
};

const ENTRIES: Entry[] = [
  {
    href: "/deck",
    title: "O deck",
    desc: "21 slides: do problema à convicção. A narrativa do case, nível Spec PM.",
    accent: "#34e3c4",
    tint: "rgba(52,227,196,.14)",
    icon: <path d="M2 3h20v14H2zM8 21h8M12 17v4" />,
  },
  {
    href: "/prototipo",
    title: "O protótipo",
    desc: "Navegável, em três camadas: a experiência, o raio-X e os dados por trás.",
    accent: "#9d8bff",
    tint: "rgba(157,139,255,.14)",
    icon: <path d="M5 2h14v20H5zM12 18h.01" />,
  },
  {
    href: "/dossie",
    title: "O dossiê",
    desc: "PRD, deep-dive, base normativa, discovery, red-team — a profundidade.",
    accent: "#f0c24b",
    tint: "rgba(240,194,75,.14)",
    icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />,
  },
  {
    href: "/cv",
    title: "O CV",
    desc: "Quem está por trás do case — experiência e contato.",
    accent: "#ff5fa8",
    tint: "rgba(255,95,168,.14)",
    icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  },
];

export function EntryCards() {
  return (
    <section className="wrap py-20 md:py-28">
      <Reveal>
        <h2 className="mb-6 font-mono text-[12px] font-medium tracking-[0.18em] text-muted uppercase">
          Explore o case
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {ENTRIES.map((e, i) => (
          <Reveal key={e.href} delay={i * 0.08}>
            <Magnetic strength={0.18} className="block h-full">
              <Link
                href={e.href}
                data-cursor
                data-cursor-label="abrir"
                className="ring-aurora group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:glow"
              >
                <div
                  className="mb-4 grid h-[42px] w-[42px] place-items-center rounded-xl"
                  style={{ background: e.tint }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={e.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {e.icon}
                  </svg>
                </div>
                <h3 className="mb-1.5 font-display text-xl font-semibold">{e.title}</h3>
                <p className="text-[13.5px] leading-snug text-muted">{e.desc}</p>
                <div
                  className="mt-4 flex items-center gap-1.5 font-mono text-xs"
                  style={{ color: e.accent }}
                >
                  abrir
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Magnetic>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
