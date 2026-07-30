import type { Metadata } from "next";
import { PageHero } from "@/components/layout/Pagina";
import { Galeria } from "@/components/galeria/Galeria";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Fotos e vídeos dos eventos, campos missionários, departamentos, igrejas e do acervo histórico da MEPB.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Galeria"
        subtitulo="Registros dos eventos, dos campos missionários e da vida das nossas igrejas — incluindo o acervo histórico da denominação."
        trilha={[{ rotulo: "Galeria" }]}
      />
      <Galeria />
    </>
  );
}
