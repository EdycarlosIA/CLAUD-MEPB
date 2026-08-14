import type { Midia } from "./types";

/** Conteúdo fictício de demonstração — collection `midia` do Strapi (TV MEPB). */

export const TIPOS_MIDIA: Midia["tipo"][] = [
  "Mensagem",
  "Série",
  "Podcast",
  "Live",
  "Documentário",
];

export const MIDIAS: Midia[] = [
  {
    slug: "a-fidelidade-que-atravessa-geracoes",
    titulo: "A fidelidade que atravessa gerações",
    tipo: "Mensagem",
    preletor: "Pr. José Azemar",
    data: "2026-07-20",
    duracao: "48 min",
    descricao:
      "Mensagem ministrada no culto de celebração dos 85 anos da Missão, sobre a fidelidade de Deus ao longo da história da denominação.",
    destaque: true,
    capa: { src: "/img/tv/fidelidade-geracoes.svg", alt: "Púlpito iluminado durante a pregação" },
    youtubeId: "demo-mepb-01",
  },
  {
    slug: "serie-fundamentos-da-fe-01",
    titulo: "Fundamentos da Fé — Episódio 1: As Escrituras",
    tipo: "Série",
    serie: "Fundamentos da Fé",
    preletor: "Pr. Marcos Vinícius Teixeira",
    data: "2026-07-06",
    duracao: "32 min",
    descricao:
      "Primeiro episódio da série que percorre os artigos da declaração de fé da MEPB, começando pela autoridade das Sagradas Escrituras.",
    destaque: true,
    capa: { src: "/img/tv/fundamentos-01.svg", alt: "Bíblia aberta sobre a mesa de estudo" },
    youtubeId: "demo-mepb-02",
  },
  {
    slug: "serie-fundamentos-da-fe-02",
    titulo: "Fundamentos da Fé — Episódio 2: O Deus Único e Trino",
    tipo: "Série",
    serie: "Fundamentos da Fé",
    preletor: "Pr. Marcos Vinícius Teixeira",
    data: "2026-07-13",
    duracao: "35 min",
    descricao:
      "Segundo episódio da série, dedicado à doutrina da Trindade e à sua importância para a vida devocional do cristão.",
    destaque: false,
    capa: { src: "/img/tv/fundamentos-02.svg", alt: "Bíblia aberta com anotações de estudo" },
    youtubeId: "demo-mepb-03",
  },
  {
    slug: "podcast-caminhos-da-missao-ep-12",
    titulo: "Caminhos da Missão — Ep. 12: Onze dias de rio",
    tipo: "Podcast",
    serie: "Caminhos da Missão",
    preletor: "Missionário Paulo Tavares",
    data: "2026-06-30",
    duracao: "54 min",
    descricao:
      "O missionário Paulo Tavares relata como é uma viagem completa do barco Missionária Ethel Matson pelas comunidades do Rio Negro.",
    destaque: false,
    capa: { src: "/img/tv/podcast-caminhos-12.svg", alt: "Microfone de estúdio com fundo escuro" },
    youtubeId: "demo-mepb-04",
  },
  {
    slug: "podcast-caminhos-da-missao-ep-11",
    titulo: "Caminhos da Missão — Ep. 11: Vinte anos em Moçambique",
    tipo: "Podcast",
    serie: "Caminhos da Missão",
    preletor: "Casal Moura",
    data: "2026-06-16",
    duracao: "61 min",
    descricao:
      "Conversa com Roberto e Lúcia Moura sobre duas décadas de trabalho na província de Nampula e a formação de líderes locais.",
    destaque: false,
    capa: { src: "/img/tv/podcast-caminhos-11.svg", alt: "Microfone de estúdio em close" },
    youtubeId: "demo-mepb-05",
  },
  {
    slug: "live-culto-de-celebracao-julho",
    titulo: "Culto de Celebração ao vivo — Templo Central",
    tipo: "Live",
    preletor: "Pr. José Azemar",
    data: "2026-07-27",
    duracao: "1h 52min",
    descricao:
      "Transmissão ao vivo do culto dominical de celebração diretamente da Sede Nacional, em Natal.",
    destaque: false,
    capa: { src: "/img/tv/live-culto.svg", alt: "Templo cheio durante o culto de celebração" },
    youtubeId: "demo-mepb-06",
  },
  {
    slug: "documentario-85-anos",
    titulo: "85 Anos — A história da Missão contada por quem a viveu",
    tipo: "Documentário",
    preletor: "Secretaria de Comunicação",
    data: "2026-03-14",
    duracao: "42 min",
    descricao:
      "Documentário com depoimentos de pastores, missionários e membros antigos sobre os oitenta e cinco anos de história da MEPB.",
    destaque: true,
    capa: { src: "/img/tv/documentario-85-anos.svg", alt: "Fotografias históricas dispostas sobre a mesa" },
    youtubeId: "demo-mepb-07",
  },
  {
    slug: "mensagem-o-chamado-e-a-perseveranca",
    titulo: "O chamado e a perseverança",
    tipo: "Mensagem",
    preletor: "Pr. Cleiton Ribeiro Mendes",
    data: "2026-06-08",
    duracao: "39 min",
    descricao:
      "Mensagem dirigida à juventude sobre firmeza no propósito de Deus diante das pressões do tempo presente.",
    destaque: false,
    capa: { src: "/img/tv/o-chamado.svg", alt: "Jovem lendo a Bíblia durante o culto" },
    youtubeId: "demo-mepb-08",
  },
  {
    slug: "serie-familia-segundo-a-palavra-01",
    titulo: "Família segundo a Palavra — Episódio 1: O lar como altar",
    tipo: "Série",
    serie: "Família segundo a Palavra",
    preletor: "Pr. Antônio Carlos Beserra",
    data: "2026-05-18",
    duracao: "28 min",
    descricao:
      "Abertura da série sobre vida familiar cristã, tratando da responsabilidade espiritual dentro de casa.",
    destaque: false,
    capa: { src: "/img/tv/familia-01.svg", alt: "Família reunida em momento de oração" },
    youtubeId: "demo-mepb-09",
  },
];

export function getMidia(slug: string): Midia | undefined {
  return MIDIAS.find((m) => m.slug === slug);
}

/** Séries agrupadas, usadas na aba "Séries" da TV MEPB. */
export const SERIES = Array.from(
  MIDIAS.reduce((mapa, midia) => {
    if (!midia.serie) return mapa;
    const atual = mapa.get(midia.serie) ?? [];
    atual.push(midia);
    return mapa.set(midia.serie, atual);
  }, new Map<string, Midia[]>()),
).map(([nome, episodios]) => ({ nome, episodios }));
