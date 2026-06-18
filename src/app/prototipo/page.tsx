import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PrototypeExperience } from "@/components/prototipo/PrototypeExperience";
import { SCENARIOS } from "@/data/prototype";

export const metadata: Metadata = {
  title: "Protótipo",
};

export default function PrototipoPage() {
  return (
    <>
      <SectionHeading kicker="O protótipo" title="A demonstração navegável">
        Não é mockup de tela — é a experiência e a mecânica de IA, lado a lado.
        Percorra o caso passo a passo e veja, a cada passo, as três camadas: a
        conversa, o raio-X do raciocínio e os dados por baixo.
      </SectionHeading>
      <div className="wrap pb-32">
        <PrototypeExperience scenarios={SCENARIOS} />
      </div>
    </>
  );
}
