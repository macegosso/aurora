import { Hero } from "@/components/home/Hero";
import { EntryCards } from "@/components/home/EntryCards";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      {/* manifesto band — the thesis in one breath */}
      <section className="wrap border-t border-line py-24 md:py-32">
        <Reveal>
          <div className="font-mono text-[12px] tracking-[0.18em] text-teal uppercase">
            A tese
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-[920px] text-[clamp(26px,4vw,44px)] leading-[1.22] font-medium tracking-tight">
            O sistema nega <span className="text-aurora">8 milhões</span> de vezes
            por ano — e errando muito. A raiz não é falta de acesso, é{" "}
            <span className="text-teal">assimetria de informação</span>. E, pela
            primeira vez, ela é atacável em escala.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[640px] text-[16px] leading-relaxed text-muted">
            Aurora é o robô do lado do cidadão: lê a carta torta, traduz o
            juridiquês, transforma a vida real em prova — e diz a verdade quando
            não há direito. Onde um formulário falharia, só um modelo de
            linguagem dá conta.
          </p>
        </Reveal>
      </section>

      <EntryCards />
    </>
  );
}
