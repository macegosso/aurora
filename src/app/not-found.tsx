import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Mark size={54} className="aurora-pulse" />
      <h1 className="mt-8 font-serif text-5xl font-semibold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Esta rota não existe no case. Volte ao portal e siga pelo deck, protótipo,
        dossiê ou CV.
      </p>
      <Link
        href="/"
        data-cursor
        data-cursor-label="início"
        className="mt-8 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-[#1c0d07] transition-colors hover:bg-coral2"
      >
        ← Voltar ao início
      </Link>
    </section>
  );
}
