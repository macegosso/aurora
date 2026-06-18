import type { Metadata } from "next";
import { DOSSIER } from "@/data/dossier";
import { DossierReader } from "@/components/dossie/DossierReader";

export const metadata: Metadata = {
  title: "Dossiê",
};

export default function DossierPage() {
  return <DossierReader docs={DOSSIER} />;
}
