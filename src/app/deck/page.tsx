import type { Metadata } from "next";
import { SLIDES } from "@/data/deck";
import { DeckViewer } from "@/components/deck/DeckViewer";

export const metadata: Metadata = {
  title: "Deck",
  description:
    "A narrativa do case Aurora, slide a slide — leia os títulos em sequência e você terá o argumento inteiro.",
};

export default function DeckPage() {
  return <DeckViewer slides={SLIDES} />;
}
