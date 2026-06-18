import type { Metadata } from "next";
import { CV } from "@/data/deck";
import { CVView } from "@/components/cv/CVView";

export const metadata: Metadata = {
  title: "CV",
};

export default function CVPage() {
  return <CVView cv={CV} />;
}
