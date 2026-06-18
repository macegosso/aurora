import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Proto } from "@/components/prototipo/Proto";

export const metadata: Metadata = {
  title: "Protótipo",
};

export default function PrototipoPage() {
  return (
    <>
      <SectionHeading kicker="O protótipo" title="A demonstração navegável">
        Uma peça interativa e autônoma — abra-a aqui, embutida na página, ou em
        tela cheia para a experiência completa.
      </SectionHeading>
      <Proto />
    </>
  );
}
