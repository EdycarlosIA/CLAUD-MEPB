import type { Evento } from "./types";

/** Conteúdo fictício de demonstração — collection `evento` do Strapi. */

export const EVENTOS: Evento[] = [
  {
    slug: "convencao-nacional-2026",
    titulo: "Convenção Nacional MEPB 2026",
    tipo: "Convenção",
    dataInicio: "2026-10-14",
    dataFim: "2026-10-17",
    cidade: "Natal",
    uf: "RN",
    local: "Templo Central — Sede Nacional",
    endereco: "Av. Prudente de Morais, 1450 — Tirol, Natal/RN",
    descricao:
      "Assembleia máxima da denominação, reúne delegados das igrejas filiadas de todo o país para deliberações administrativas, eleição do Supremo Concílio e cultos de celebração.",
    imagem: {
      src: "/img/eventos/convencao-2026.svg",
      alt: "Templo Central preparado para a Convenção Nacional",
    },
    destaque: true,
    inscricoesAbertas: true,
    valor: "Delegados: isento · Visitantes: R$ 60,00",
    publico: "Pastores, obreiros, delegados e membros",
    programacao: [
      { horario: "14/10 · 19h30", atividade: "Culto de Abertura", responsavel: "Pr. Josué Andrade Lima" },
      { horario: "15/10 · 08h00", atividade: "Primeira Sessão Administrativa" },
      { horario: "15/10 · 14h00", atividade: "Painel: Plantação de Igrejas no Brasil" },
      { horario: "15/10 · 19h30", atividade: "Culto Missionário", responsavel: "Pr. Elias Ferreira do Nascimento" },
      { horario: "16/10 · 08h00", atividade: "Segunda Sessão Administrativa" },
      { horario: "16/10 · 14h00", atividade: "Seminário de Formação de Obreiros" },
      { horario: "16/10 · 19h30", atividade: "Culto de Consagração" },
      { horario: "17/10 · 09h00", atividade: "Eleição do Supremo Concílio" },
      { horario: "17/10 · 18h00", atividade: "Culto de Encerramento e Posse" },
    ],
    materiais: [
      { titulo: "Edital de Convocação", formato: "PDF", tamanho: "480 KB" },
      { titulo: "Ficha de Credenciamento de Delegado", formato: "PDF", tamanho: "210 KB" },
      { titulo: "Programação Completa", formato: "PDF", tamanho: "1,2 MB" },
      { titulo: "Guia de Hospedagem em Natal", formato: "PDF", tamanho: "860 KB" },
    ],
  },
  {
    slug: "congresso-nacional-de-jovens-2026",
    titulo: "Congresso Nacional de Jovens — Firmes no Propósito",
    tipo: "Congresso",
    dataInicio: "2026-08-20",
    dataFim: "2026-08-23",
    cidade: "Fortaleza",
    uf: "CE",
    local: "Centro de Eventos do Ceará",
    endereco: "Av. Washington Soares, 999 — Edson Queiroz, Fortaleza/CE",
    descricao:
      "Maior encontro da juventude da MEPB, com plenárias, oficinas de liderança, festival de louvor e ação social nos bairros da capital cearense.",
    imagem: {
      src: "/img/eventos/congresso-jovens.svg",
      alt: "Jovens reunidos no congresso nacional",
    },
    destaque: true,
    inscricoesAbertas: true,
    valor: "R$ 120,00 (lote promocional até 30/06)",
    publico: "Jovens de 18 a 35 anos",
    programacao: [
      { horario: "20/08 · 19h00", atividade: "Culto de Abertura" },
      { horario: "21/08 · 09h00", atividade: "Plenária: O Chamado e a Perseverança" },
      { horario: "21/08 · 14h00", atividade: "Oficinas simultâneas de liderança" },
      { horario: "21/08 · 19h00", atividade: "Festival de Louvor" },
      { horario: "22/08 · 08h00", atividade: "Ação Social nos bairros" },
      { horario: "22/08 · 19h00", atividade: "Noite Missionária" },
      { horario: "23/08 · 09h00", atividade: "Culto de Envio" },
    ],
    materiais: [
      { titulo: "Regulamento do Congresso", formato: "PDF", tamanho: "320 KB" },
      { titulo: "Arte para divulgação nas igrejas", formato: "ZIP", tamanho: "14 MB" },
    ],
  },
  {
    slug: "encontro-nacional-de-mulheres-2026",
    titulo: "Encontro Nacional de Mulheres",
    tipo: "Congresso",
    dataInicio: "2026-09-11",
    dataFim: "2026-09-13",
    cidade: "Recife",
    uf: "PE",
    local: "Igreja MEPB de Recife",
    endereco: "Rua do Hospício, 415 — Boa Vista, Recife/PE",
    descricao:
      "Três dias de ensino, comunhão e capacitação para mulheres de todas as idades, com foco em vida devocional, família e serviço na igreja local.",
    imagem: {
      src: "/img/eventos/encontro-mulheres.svg",
      alt: "Mulheres reunidas em plenária do encontro nacional",
    },
    destaque: false,
    inscricoesAbertas: true,
    valor: "R$ 90,00",
    publico: "Mulheres a partir de 18 anos",
    programacao: [
      { horario: "11/09 · 19h00", atividade: "Culto de Abertura" },
      { horario: "12/09 · 09h00", atividade: "Estudo: A Mulher de Fé no Tempo Presente" },
      { horario: "12/09 · 14h00", atividade: "Mesa-redonda: Família e Ministério" },
      { horario: "13/09 · 09h00", atividade: "Culto de Encerramento" },
    ],
    materiais: [{ titulo: "Programação e informações", formato: "PDF", tamanho: "540 KB" }],
  },
  {
    slug: "seminario-de-lideranca-norte-2026",
    titulo: "Seminário Regional de Liderança — Região Norte",
    tipo: "Seminário",
    dataInicio: "2026-08-08",
    dataFim: "2026-08-09",
    cidade: "Manaus",
    uf: "AM",
    local: "Primeira Igreja MEPB de Manaus",
    endereco: "Rua Ramos Ferreira, 890 — Centro, Manaus/AM",
    descricao:
      "Capacitação de pastores, obreiros e líderes de departamento das igrejas da região Norte, com módulos sobre administração eclesiástica e cuidado pastoral.",
    imagem: {
      src: "/img/eventos/seminario-norte.svg",
      alt: "Sala de aula durante o seminário de liderança",
    },
    destaque: false,
    inscricoesAbertas: true,
    valor: "Gratuito para obreiros credenciados",
    publico: "Pastores, obreiros e líderes de departamento",
    programacao: [
      { horario: "08/08 · 08h30", atividade: "Módulo I — Administração Eclesiástica" },
      { horario: "08/08 · 14h00", atividade: "Módulo II — Cuidado Pastoral" },
      { horario: "09/08 · 08h30", atividade: "Módulo III — Ensino e Discipulado" },
      { horario: "09/08 · 15h00", atividade: "Encerramento e Certificação" },
    ],
    materiais: [{ titulo: "Apostila do Seminário", formato: "PDF", tamanho: "3,4 MB" }],
  },
  {
    slug: "retiro-nacional-de-adolescentes-2026",
    titulo: "Retiro Nacional de Adolescentes",
    tipo: "Retiro",
    dataInicio: "2026-07-25",
    dataFim: "2026-07-27",
    cidade: "Gravatá",
    uf: "PE",
    local: "Acampamento Monte Sião",
    endereco: "Rodovia BR-232, km 82 — Gravatá/PE",
    descricao:
      "Fim de semana de acampamento com estudos bíblicos, dinâmicas, atividades ao ar livre e momentos de oração para adolescentes de 12 a 17 anos.",
    imagem: {
      src: "/img/eventos/retiro-adolescentes.svg",
      alt: "Adolescentes em atividade ao ar livre no acampamento",
    },
    destaque: false,
    inscricoesAbertas: false,
    valor: "R$ 180,00 (com hospedagem e alimentação)",
    publico: "Adolescentes de 12 a 17 anos",
    programacao: [
      { horario: "25/07 · 18h00", atividade: "Chegada e acolhida" },
      { horario: "26/07 · 09h00", atividade: "Estudo bíblico e dinâmicas" },
      { horario: "26/07 · 20h00", atividade: "Fogueira e testemunhos" },
      { horario: "27/07 · 10h00", atividade: "Culto de Encerramento" },
    ],
    materiais: [{ titulo: "Autorização para menores", formato: "PDF", tamanho: "180 KB" }],
  },
  {
    slug: "capacitacao-de-louvor-2026",
    titulo: "Capacitação Nacional de Ministérios de Louvor",
    tipo: "Capacitação",
    dataInicio: "2026-11-07",
    dataFim: "2026-11-08",
    cidade: "Salvador",
    uf: "BA",
    local: "Igreja MEPB de Salvador",
    endereco: "Rua Guedes Cabral, 340 — Rio Vermelho, Salvador/BA",
    descricao:
      "Oficinas de teoria musical, técnica vocal, operação de som e condução de culto, voltadas a integrantes de ministérios de louvor das igrejas filiadas.",
    imagem: {
      src: "/img/eventos/capacitacao-louvor.svg",
      alt: "Músicos durante oficina de capacitação de louvor",
    },
    destaque: false,
    inscricoesAbertas: true,
    valor: "R$ 70,00",
    publico: "Músicos, cantores e operadores de som",
    programacao: [
      { horario: "07/11 · 08h30", atividade: "Oficina de Teoria Musical" },
      { horario: "07/11 · 14h00", atividade: "Oficina de Técnica Vocal" },
      { horario: "08/11 · 08h30", atividade: "Operação de Som e Estrutura de Culto" },
      { horario: "08/11 · 18h00", atividade: "Culto de Louvor — apresentação final" },
    ],
    materiais: [
      { titulo: "Repertório oficial 2026", formato: "PDF", tamanho: "2,1 MB" },
      { titulo: "Playbacks do repertório", formato: "ZIP", tamanho: "220 MB" },
    ],
  },
];

export function getEvento(slug: string): Evento | undefined {
  return EVENTOS.find((e) => e.slug === slug);
}

/** Eventos ordenados por data de início. */
export const EVENTOS_ORDENADOS = [...EVENTOS].sort(
  (a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime(),
);
