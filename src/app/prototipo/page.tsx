import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { HowToRead } from "@/components/prototipo/HowToRead";
import { PrototypeExperience } from "@/components/prototipo/PrototypeExperience";
import { DataReference } from "@/components/prototipo/DataReference";
import { SCENARIOS, KNOWLEDGE_BASE, TRIAGE_RULES } from "@/data/prototype";

export const metadata: Metadata = {
  title: "Protótipo",
};

export default function PrototipoPage() {
  return (
    <>
      <SectionHeading kicker="O protótipo" title="A demonstração navegável">
        Uma prova de conceito navegável — não a tela final, mas a experiência e a
        mecânica de IA, lado a lado. Percorra cada caso passo a passo e veja, a
        cada passo, as três camadas: a conversa, o raio-X do raciocínio e os
        dados por trás.
      </SectionHeading>

      <HowToRead />

      <div className="wrap pt-10 pb-32">
        <PrototypeExperience scenarios={SCENARIOS} />
        <DataReference triage={TRIAGE_RULES} kb={KNOWLEDGE_BASE} />
      </div>
    </>
  );
}
