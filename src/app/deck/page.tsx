import type { Metadata } from "next";
import { SLIDES } from "@/data/deck";
import { DeckStory } from "@/components/deck/DeckStory";

export const metadata: Metadata = {
  title: "A apresentação",
  description:
    "A dor e a solução do case Aurora — do problema ao pedido, numa leitura única e navegável.",
};

export default function DeckPage() {
  return <DeckStory slides={SLIDES} />;
}
