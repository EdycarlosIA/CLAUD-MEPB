import type { Metadata } from "next";
import { PageHero } from "@/components/layout/Pagina";
import { ListaNoticias } from "@/components/noticias/ListaNoticias";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Notícias oficiais da Missão Evangélica Pentecostal do Brasil: institucional, missões, eventos, departamentos, educação e ação social.",
};

export default function NoticiasPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Notícias"
        subtitulo="O que está acontecendo na denominação — do campo missionário às decisões da Sede Nacional."
        trilha={[{ rotulo: "Notícias" }]}
      />
      <ListaNoticias />
    </>
  );
}
