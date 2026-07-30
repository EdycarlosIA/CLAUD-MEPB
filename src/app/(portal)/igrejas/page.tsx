import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/Pagina";
import { Localizador } from "@/components/igrejas/Localizador";
import { IGREJAS, UFS_DISPONIVEIS } from "@/content/igrejas";

export const metadata: Metadata = {
  title: "Encontre uma Igreja",
  description:
    "Localize a igreja da Missão Evangélica Pentecostal do Brasil mais próxima de você. Busque por estado, cidade ou nome e veja horários de culto, endereço e contato.",
};

export default function IgrejasPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Encontre uma Igreja"
        subtitulo="Busque pelo nome, pela cidade ou selecione seu estado no mapa. Cada ficha traz horários de culto, endereço, contato e como chegar."
        trilha={[{ rotulo: "Encontre uma Igreja" }]}
      >
        <ul className="flex flex-wrap gap-x-10 gap-y-4">
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {IGREJAS.length}
            </span>
            <span className="text-sm text-white/70">igrejas no portal</span>
          </li>
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {UFS_DISPONIVEIS.length}
            </span>
            <span className="text-sm text-white/70">estados representados</span>
          </li>
        </ul>
      </PageHero>

      {/*
        `useSearchParams` exige fronteira de Suspense no App Router.
        O fallback reserva altura para evitar deslocamento de layout.
      */}
      <Suspense
        fallback={
          <div className="container-portal section-y">
            <div className="h-32 animate-pulse rounded-[var(--radius-xl)] bg-bg-muted" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-[var(--radius-lg)] bg-bg-muted" />
              ))}
            </div>
          </div>
        }
      >
        <Localizador />
      </Suspense>
    </>
  );
}
