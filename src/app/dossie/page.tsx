import type { Metadata } from "next";
import { DOSSIER } from "@/data/dossier";
import { DossierReader } from "@/components/dossie/DossierReader";

export const metadata: Metadata = {
  title: "Documentos organizadores",
};

export default function DossierPage() {
  return <DossierReader docs={DOSSIER} />;
}
