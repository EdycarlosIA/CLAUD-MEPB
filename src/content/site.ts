/**
 * Configuração global do portal: identidade da instituição, navegação e rodapé.
 * Fonte única de verdade — navbar, rodapé, mapa do site e sitemap.xml leem daqui.
 */

export const SITE = {
  nome: "Missão Evangélica Pentecostal do Brasil",
  sigla: "MEPB",
  descricao:
    "Portal oficial da Missão Evangélica Pentecostal do Brasil. Desde 1939 anunciando o Evangelho de Cristo em todo o território nacional e em quatro continentes.",
  url: "https://www.mepb.org.br",
  fundacao: 1939,
  versiculoInstitucional: {
    texto: "Ide por todo o mundo e pregai o evangelho a toda criatura.",
    referencia: "Marcos 16.15",
  },
  sede: {
    titulo: "Sede Nacional",
    endereco: "Rua Itaporanga, 184 — Cidade da Esperança",
    cidade: "Natal",
    uf: "RN",
    cep: "59070-470",
    telefone: "(84) 3205-4155",
    email: "mepb@mepb.org.br",
    horarioAtendimento: "Segunda a sexta, das 8h às 17h",
  },
  redes: {
    instagram: "https://instagram.com/mepboficial",
    facebook: "https://facebook.com/mepbnacional",
    youtube: "https://youtube.com/@mepbnacional",
    spotify: "https://open.spotify.com/show/mepb",
  },
} as const;

/** Indicadores institucionais exibidos na faixa de números da home. */
export const NUMEROS = [
  { valor: "85+", rotulo: "anos de história", detalhe: "desde 1939" },
  { valor: "22", rotulo: "estados", detalhe: "presença nacional" },
  { valor: "16", rotulo: "capitais", detalhe: "em todas as regiões" },
  { valor: "133+", rotulo: "municípios", detalhe: "igrejas e congregações" },
  { valor: "4", rotulo: "continentes", detalhe: "campo missionário" },
] as const;

export interface ItemNav {
  rotulo: string;
  href: string;
  descricao?: string;
  filhos?: ItemNav[];
  /** Mega-menu em colunas em vez de lista simples. */
  mega?: boolean;
}

/**
 * Navegação principal — sete itens, limite deliberado para evitar fadiga de
 * decisão e caber em uma linha a partir de 1280px.
 */
export const NAV_PRINCIPAL: ItemNav[] = [
  {
    rotulo: "Sobre",
    href: "/sobre",
    filhos: [
      {
        rotulo: "Nossa História",
        href: "/sobre/historia",
        descricao: "De Manaus, 1939, ao Brasil inteiro",
      },
      {
        rotulo: "Missão, Visão e Valores",
        href: "/sobre/missao-visao-valores",
        descricao: "O que nos move e onde atuamos",
      },
      {
        rotulo: "Nossa Fé",
        href: "/sobre/nossa-fe",
        descricao: "Declaração doutrinária da MEPB",
      },
      {
        rotulo: "Liderança",
        href: "/sobre/lideranca",
        descricao: "Supremo Concílio e presidentes",
      },
    ],
  },
  { rotulo: "Igrejas", href: "/igrejas" },
  { rotulo: "Missões", href: "/missoes" },
  { rotulo: "Notícias", href: "/noticias" },
  { rotulo: "Agenda", href: "/agenda" },
  {
    rotulo: "Departamentos",
    href: "/departamentos",
    mega: true,
    filhos: [
      { rotulo: "Homens", href: "/departamentos/homens" },
      { rotulo: "Mulheres", href: "/departamentos/mulheres" },
      { rotulo: "Jovens", href: "/departamentos/jovens" },
      { rotulo: "Adolescentes", href: "/departamentos/adolescentes" },
      { rotulo: "Crianças", href: "/departamentos/criancas" },
      { rotulo: "Louvor", href: "/departamentos/louvor" },
      { rotulo: "Missões", href: "/departamentos/missoes" },
      { rotulo: "Educação", href: "/departamentos/educacao" },
      { rotulo: "Evangelismo", href: "/departamentos/evangelismo" },
    ],
  },
  {
    rotulo: "Mídia",
    href: "/tv",
    filhos: [
      {
        rotulo: "TV MEPB",
        href: "/tv",
        descricao: "Mensagens, séries, podcasts e lives",
      },
      {
        rotulo: "Galeria",
        href: "/galeria",
        descricao: "Fotos e vídeos da denominação",
      },
      {
        rotulo: "Biblioteca",
        href: "/biblioteca",
        descricao: "Estatuto, manuais e materiais oficiais",
      },
    ],
  },
];

/** Rodapé em quatro colunas. */
export const NAV_RODAPE = [
  {
    titulo: "Institucional",
    itens: [
      { rotulo: "Quem somos", href: "/sobre" },
      { rotulo: "Nossa História", href: "/sobre/historia" },
      { rotulo: "Missão, Visão e Valores", href: "/sobre/missao-visao-valores" },
      { rotulo: "Nossa Fé", href: "/sobre/nossa-fe" },
      { rotulo: "Liderança", href: "/sobre/lideranca" },
    ],
  },
  {
    titulo: "Comunidade",
    itens: [
      { rotulo: "Encontre uma Igreja", href: "/igrejas" },
      { rotulo: "Missões", href: "/missoes" },
      { rotulo: "Departamentos", href: "/departamentos" },
      { rotulo: "Agenda Nacional", href: "/agenda" },
      { rotulo: "Notícias", href: "/noticias" },
    ],
  },
  {
    titulo: "Recursos",
    itens: [
      { rotulo: "TV MEPB", href: "/tv" },
      { rotulo: "Biblioteca", href: "/biblioteca" },
      { rotulo: "Galeria", href: "/galeria" },
      { rotulo: "Perguntas Frequentes", href: "/faq" },
      { rotulo: "Área Administrativa", href: "/admin/login" },
    ],
  },
  {
    titulo: "Participe",
    itens: [
      { rotulo: "Conheça Jesus", href: "/conheca-jesus" },
      { rotulo: "Pedido de Oração", href: "/oracao" },
      { rotulo: "Quero Participar", href: "/participe" },
      { rotulo: "Contato", href: "/contato" },
    ],
  },
] as const;

/** Faixa legal do rodapé. */
export const NAV_LEGAL = [
  { rotulo: "Política de Privacidade", href: "/privacidade" },
  { rotulo: "LGPD", href: "/lgpd" },
  { rotulo: "Mapa do Site", href: "/mapa-do-site" },
] as const;

/** Cards de acesso rápido da home — as quatro tarefas mais frequentes. */
export const ACESSO_RAPIDO = [
  {
    titulo: "Encontre uma Igreja",
    descricao: "Localize a igreja MEPB mais próxima de você em todo o Brasil.",
    href: "/igrejas",
    icone: "MapPin",
  },
  {
    titulo: "Agenda Nacional",
    descricao: "Congressos, convenções e eventos oficiais da denominação.",
    href: "/agenda",
    icone: "CalendarDays",
  },
  {
    titulo: "TV MEPB",
    descricao: "Mensagens, séries, podcasts e transmissões ao vivo.",
    href: "/tv",
    icone: "PlayCircle",
  },
  {
    titulo: "Biblioteca",
    descricao: "Estatuto, regimento, manuais e materiais oficiais.",
    href: "/biblioteca",
    icone: "BookMarked",
  },
] as const;
