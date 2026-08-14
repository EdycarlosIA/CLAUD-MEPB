import type { Metadata } from "next";
import { HeroTv } from "@/components/tv/HeroTv";
import { ListaMidias } from "@/components/tv/ListaMidias";
import { MIDIAS } from "@/content/midia";

export const metadata: Metadata = {
  title: "TV MEPB",
  description:
    "Mensagens, séries, podcasts, lives e documentários da Missão Evangélica Pentecostal do Brasil.",
};

/** Item de destaque do hero: o mais recente entre os marcados como `destaque`. */
const EMDESTAQUE = [...MIDIAS]
  .filter((m) => m.destaque)
  .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())[0];

export default function TvPage() {
  return (
    <>
      <HeroTv midia={EMDESTAQUE} />
      <ListaMidias />
    </>
  );
}
