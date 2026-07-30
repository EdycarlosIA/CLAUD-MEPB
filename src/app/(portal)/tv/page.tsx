import type { Metadata } from "next";
import { PageHero } from "@/components/layout/Pagina";
import { ListaMidias } from "@/components/tv/ListaMidias";
import { MIDIAS, SERIES } from "@/content/midia";

export const metadata: Metadata = {
  title: "TV MEPB",
  description:
    "Mensagens, séries, podcasts, lives e documentários da Missão Evangélica Pentecostal do Brasil.",
};

export default function TvPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="TV MEPB"
        subtitulo="Mensagens, séries de estudo, podcasts e transmissões ao vivo. Conteúdo para a semana inteira, não só para o domingo."
        trilha={[{ rotulo: "TV MEPB" }]}
      >
        <ul className="flex flex-wrap gap-x-12 gap-y-4">
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {MIDIAS.length}
            </span>
            <span className="text-sm text-white/70">conteúdos publicados</span>
          </li>
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {SERIES.length}
            </span>
            <span className="text-sm text-white/70">séries em andamento</span>
          </li>
        </ul>
      </PageHero>

      <ListaMidias />
    </>
  );
}
