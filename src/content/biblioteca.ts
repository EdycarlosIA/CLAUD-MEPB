import type { Documento } from "./types";

/** Conteúdo fictício de demonstração — collection `documento` do Strapi. */

export const CATEGORIAS_DOCUMENTO: Documento["categoria"][] = [
  "Documentos Oficiais",
  "Manuais",
  "Identidade Visual",
  "Louvor",
  "Formulários",
  "Estudos",
];

export const DOCUMENTOS: Documento[] = [
  {
    slug: "estatuto-mepb",
    titulo: "Estatuto da Missão Evangélica Pentecostal do Brasil",
    categoria: "Documentos Oficiais",
    descricao:
      "Documento constitutivo da denominação, com a redação consolidada aprovada em Convenção Nacional. Define a natureza, a finalidade, a estrutura de governo e o regime patrimonial da Missão.",
    formato: "PDF",
    tamanho: "1,8 MB",
    atualizadoEm: "2024-10-18",
    downloads: 4820,
    restrito: false,
  },
  {
    slug: "regimento-interno",
    titulo: "Regimento Interno",
    categoria: "Documentos Oficiais",
    descricao:
      "Regulamenta a aplicação do Estatuto, detalhando o funcionamento das convenções, dos departamentos e das igrejas filiadas.",
    formato: "PDF",
    tamanho: "1,2 MB",
    atualizadoEm: "2024-10-18",
    downloads: 3610,
    restrito: false,
  },
  {
    slug: "codigo-de-etica-ministerial",
    titulo: "Código de Ética Ministerial",
    categoria: "Documentos Oficiais",
    descricao:
      "Princípios de conduta aplicáveis a pastores, obreiros e demais credenciados pela denominação.",
    formato: "PDF",
    tamanho: "640 KB",
    atualizadoEm: "2023-06-02",
    downloads: 2145,
    restrito: false,
  },
  {
    slug: "manual-do-obreiro",
    titulo: "Manual do Obreiro",
    categoria: "Manuais",
    descricao:
      "Orientações práticas para o exercício do ministério: celebração de ordenanças, aconselhamento, visitação e administração da igreja local.",
    formato: "PDF",
    tamanho: "3,4 MB",
    atualizadoEm: "2025-02-11",
    downloads: 5290,
    restrito: false,
  },
  {
    slug: "manual-da-escola-biblica-dominical",
    titulo: "Manual da Escola Bíblica Dominical",
    categoria: "Manuais",
    descricao:
      "Estrutura, metodologia e orientações pedagógicas para professores da EBD em todas as faixas etárias.",
    formato: "PDF",
    tamanho: "2,6 MB",
    atualizadoEm: "2025-01-20",
    downloads: 3870,
    restrito: false,
  },
  {
    slug: "manual-de-secretaria-da-igreja-local",
    titulo: "Manual de Secretaria da Igreja Local",
    categoria: "Manuais",
    descricao:
      "Procedimentos para registro de membros, atas, relatórios estatísticos e prestação de contas à Sede Nacional.",
    formato: "PDF",
    tamanho: "1,9 MB",
    atualizadoEm: "2024-08-30",
    downloads: 1980,
    restrito: true,
  },
  {
    slug: "manual-de-identidade-visual",
    titulo: "Manual de Identidade Visual",
    categoria: "Identidade Visual",
    descricao:
      "Regras de uso da logomarca, paleta de cores institucional, tipografia e modelos de aplicação em materiais impressos e digitais.",
    formato: "PDF",
    tamanho: "8,2 MB",
    atualizadoEm: "2026-04-22",
    downloads: 2410,
    restrito: false,
  },
  {
    slug: "pacote-de-logomarcas",
    titulo: "Pacote de Logomarcas Oficiais",
    categoria: "Identidade Visual",
    descricao:
      "Arquivos vetoriais e em alta resolução da logomarca da MEPB, em todas as versões autorizadas (positiva, negativa, monocromática e reduzida).",
    formato: "ZIP",
    tamanho: "24 MB",
    atualizadoEm: "2026-04-22",
    downloads: 1760,
    restrito: false,
  },
  {
    slug: "modelos-de-apresentacao",
    titulo: "Modelos de Apresentação e Papelaria",
    categoria: "Identidade Visual",
    descricao:
      "Templates de slides, papel timbrado, cartão de visita e artes para redes sociais seguindo o padrão institucional.",
    formato: "ZIP",
    tamanho: "36 MB",
    atualizadoEm: "2026-05-05",
    downloads: 1120,
    restrito: false,
  },
  {
    slug: "hinario-oficial",
    titulo: "Hinário Oficial da MEPB",
    categoria: "Louvor",
    descricao:
      "Coletânea completa dos hinos adotados pela denominação, com letras, partituras e cifras.",
    formato: "PDF",
    tamanho: "12 MB",
    atualizadoEm: "2023-11-14",
    downloads: 6740,
    restrito: false,
  },
  {
    slug: "playbacks-repertorio-2026",
    titulo: "Playbacks — Repertório Oficial 2026",
    categoria: "Louvor",
    descricao:
      "Faixas instrumentais do repertório oficial do ano, para uso dos ministérios de louvor das igrejas filiadas.",
    formato: "ZIP",
    tamanho: "220 MB",
    atualizadoEm: "2026-01-15",
    downloads: 2890,
    restrito: false,
  },
  {
    slug: "partituras-corais",
    titulo: "Partituras para Coral",
    categoria: "Louvor",
    descricao:
      "Arranjos a quatro vozes dos principais hinos da denominação, em formato de partitura.",
    formato: "PDF",
    tamanho: "6,8 MB",
    atualizadoEm: "2025-09-08",
    downloads: 1430,
    restrito: false,
  },
  {
    slug: "ficha-de-filiacao-de-igreja",
    titulo: "Ficha de Filiação de Igreja",
    categoria: "Formulários",
    descricao:
      "Formulário para solicitação de filiação de igreja à Missão Evangélica Pentecostal do Brasil.",
    formato: "PDF",
    tamanho: "280 KB",
    atualizadoEm: "2025-03-27",
    downloads: 940,
    restrito: false,
  },
  {
    slug: "requerimento-de-credencial-ministerial",
    titulo: "Requerimento de Credencial Ministerial",
    categoria: "Formulários",
    descricao:
      "Formulário de solicitação e renovação de credencial para obreiros e pastores.",
    formato: "PDF",
    tamanho: "310 KB",
    atualizadoEm: "2025-03-27",
    downloads: 1680,
    restrito: true,
  },
  {
    slug: "relatorio-estatistico-anual",
    titulo: "Relatório Estatístico Anual — Modelo",
    categoria: "Formulários",
    descricao:
      "Planilha padrão para envio dos dados anuais da igreja local à Sede Nacional.",
    formato: "DOCX",
    tamanho: "180 KB",
    atualizadoEm: "2026-01-08",
    downloads: 1240,
    restrito: true,
  },
  {
    slug: "estudo-doutrina-pentecostal",
    titulo: "Estudo — A Doutrina Pentecostal Clássica",
    categoria: "Estudos",
    descricao:
      "Material de estudo em oito lições sobre o batismo no Espírito Santo e os dons espirituais à luz das Escrituras.",
    formato: "PDF",
    tamanho: "2,2 MB",
    atualizadoEm: "2025-07-19",
    downloads: 3210,
    restrito: false,
  },
  {
    slug: "estudo-discipulado-novos-convertidos",
    titulo: "Estudo — Discipulado de Novos Convertidos",
    categoria: "Estudos",
    descricao:
      "Roteiro de doze encontros para acompanhamento de novos convertidos na igreja local.",
    formato: "PDF",
    tamanho: "1,6 MB",
    atualizadoEm: "2025-05-30",
    downloads: 4050,
    restrito: false,
  },
  {
    slug: "estudo-familia-crista",
    titulo: "Estudo — A Família Cristã",
    categoria: "Estudos",
    descricao:
      "Série de seis estudos sobre casamento, criação de filhos e vida devocional em família.",
    formato: "PDF",
    tamanho: "1,4 MB",
    atualizadoEm: "2026-04-10",
    downloads: 2670,
    restrito: false,
  },
];

export function getDocumento(slug: string): Documento | undefined {
  return DOCUMENTOS.find((d) => d.slug === slug);
}
