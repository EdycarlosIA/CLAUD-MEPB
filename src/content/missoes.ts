import type { CampoMissionario, Missionario } from "./types";

/** Conteúdo fictício de demonstração — collections `missionario` e `campo` do Strapi. */

/**
 * Campos missionários posicionados sobre o mapa-múndi SVG.
 * `x` e `y` são percentuais dentro da viewBox do mapa (projeção equiretangular).
 */
export const CAMPOS: CampoMissionario[] = [
  { pais: "Brasil", continente: "América do Sul", x: 33.5, y: 63, missionarios: 14, desde: 1939 },
  { pais: "Bolívia", continente: "América do Sul", x: 29.8, y: 62, missionarios: 3, desde: 2008 },
  { pais: "Venezuela", continente: "América do Sul", x: 29.5, y: 51, missionarios: 4, desde: 2017 },
  { pais: "Portugal", continente: "Europa", x: 46.2, y: 36, missionarios: 3, desde: 2011 },
  { pais: "Espanha", continente: "Europa", x: 47.4, y: 35, missionarios: 2, desde: 2014 },
  { pais: "Moçambique", continente: "África", x: 57.8, y: 68, missionarios: 5, desde: 2003 },
  { pais: "Angola", continente: "África", x: 53.6, y: 64, missionarios: 4, desde: 2006 },
  { pais: "Guiné-Bissau", continente: "África", x: 46.8, y: 52, missionarios: 2, desde: 2019 },
  { pais: "Estados Unidos", continente: "América do Norte", x: 21.5, y: 34, missionarios: 3, desde: 1996 },
  { pais: "Japão", continente: "Ásia", x: 84.5, y: 38, missionarios: 2, desde: 2013 },
];

export const MISSIONARIOS: Missionario[] = [
  {
    slug: "familia-tavares-rio-negro",
    nome: "Família Tavares",
    campo: "Comunidades ribeirinhas do Rio Negro",
    pais: "Brasil",
    continente: "América do Sul",
    desde: 2010,
    resumo:
      "Conduzem o barco Missionária Ethel Matson, levando o Evangelho e assistência básica a dezenove comunidades no interior do Amazonas.",
    historia: [
      "Paulo e Marlene Tavares deixaram Manaus em 2010 para dedicar-se integralmente ao trabalho fluvial no Rio Negro. Desde então, percorrem em média onze dias por viagem, atendendo comunidades que só podem ser alcançadas por barco.",
      "Além dos cultos e do discipulado, o trabalho inclui atendimento odontológico básico, distribuição de material escolar e apoio às escolas comunitárias.",
      "Nos últimos cinco anos, seis novas congregações foram estabelecidas ao longo do roteiro percorrido pela família.",
    ],
    foco: ["Evangelismo fluvial", "Discipulado", "Assistência básica de saúde", "Educação"],
    pedidosOracao: [
      "Pela manutenção do barco e pelos custos de combustível",
      "Pelos novos convertidos das comunidades atendidas",
      "Por sabedoria no período de seca, quando o acesso fica restrito",
    ],
    foto: { src: "/img/missionarios/familia-tavares.svg", alt: "Retrato da família Tavares em frente ao barco missionário" },
  },
  {
    slug: "casal-moura-mocambique",
    nome: "Casal Moura",
    campo: "Província de Nampula",
    pais: "Moçambique",
    continente: "África",
    desde: 2003,
    resumo:
      "Missionários mais antigos da MEPB no exterior, atuam na formação de líderes locais e na tradução de materiais bíblicos.",
    historia: [
      "Enviados em 2003, Roberto e Lúcia Moura foram os primeiros missionários da MEPB em Moçambique. Instalaram-se na província de Nampula, onde iniciaram um trabalho de evangelização entre comunidades rurais.",
      "Com o passar dos anos, o foco migrou da pregação direta para a formação de líderes locais — hoje, doze pastores moçambicanos foram formados sob sua orientação.",
      "O casal também coordena a tradução de materiais de Escola Bíblica Dominical para a língua macua.",
    ],
    foco: ["Formação de líderes", "Tradução de materiais", "Plantação de igrejas"],
    pedidosOracao: [
      "Pela saúde do casal, que enfrenta o clima e as doenças locais",
      "Pelos pastores em formação",
      "Pela conclusão da tradução do material infantil",
    ],
    foto: { src: "/img/missionarios/casal-moura.svg", alt: "Retrato do casal Moura com líderes locais em Moçambique" },
  },
  {
    slug: "missionaria-ana-beatriz-portugal",
    nome: "Missionária Ana Beatriz Coelho",
    campo: "Área metropolitana de Lisboa",
    pais: "Portugal",
    continente: "Europa",
    desde: 2011,
    resumo:
      "Trabalha entre a comunidade brasileira em Portugal, com ênfase no acolhimento de imigrantes recém-chegados.",
    historia: [
      "Ana Beatriz chegou a Lisboa em 2011 com o propósito de atender a crescente comunidade brasileira imigrante na região metropolitana.",
      "O trabalho começou com pequenos grupos em casas e hoje conta com dois pontos de pregação e um centro de acolhimento que orienta recém-chegados sobre documentação, moradia e emprego.",
      "O ministério tem alcançado também portugueses e imigrantes de países africanos de língua portuguesa.",
    ],
    foco: ["Acolhimento de imigrantes", "Plantação de igrejas", "Assistência social"],
    pedidosOracao: [
      "Por um espaço próprio para o centro de acolhimento",
      "Pelas famílias brasileiras em processo de adaptação",
      "Por novos obreiros para o campo europeu",
    ],
    foto: { src: "/img/missionarios/ana-beatriz.svg", alt: "Retrato da missionária Ana Beatriz Coelho" },
  },
  {
    slug: "familia-nakamura-japao",
    nome: "Família Nakamura",
    campo: "Região de Aichi",
    pais: "Japão",
    continente: "Ásia",
    desde: 2013,
    resumo:
      "Atuam entre trabalhadores brasileiros descendentes de japoneses, com cultos bilíngues e apoio a famílias.",
    historia: [
      "Descendentes de japoneses e membros da MEPB em São Paulo, Ricardo e Emília Nakamura foram enviados em 2013 para a região de Aichi, onde vive uma grande comunidade de trabalhadores brasileiros.",
      "Os cultos são realizados em português e japonês, atendendo tanto os imigrantes quanto seus filhos nascidos no Japão.",
      "O trabalho enfrenta o desafio das longas jornadas de trabalho da comunidade, o que levou o casal a organizar encontros em horários alternativos.",
    ],
    foco: ["Cultos bilíngues", "Ministério com famílias", "Discipulado de segunda geração"],
    pedidosOracao: [
      "Pelos jovens da segunda geração, divididos entre duas culturas",
      "Por disposição diante das longas jornadas da comunidade",
      "Pela abertura de um novo ponto de pregação",
    ],
    foto: { src: "/img/missionarios/familia-nakamura.svg", alt: "Retrato da família Nakamura no Japão" },
  },
  {
    slug: "missionario-carlos-eduardo-angola",
    nome: "Missionário Carlos Eduardo Pires",
    campo: "Luanda e arredores",
    pais: "Angola",
    continente: "África",
    desde: 2006,
    resumo:
      "Coordena o instituto bíblico da MEPB em Luanda e supervisiona sete congregações angolanas.",
    historia: [
      "Carlos Eduardo chegou a Angola em 2006, poucos anos após o fim do conflito civil, para colaborar na reconstrução do trabalho evangélico na região de Luanda.",
      "Fundou um instituto bíblico que já formou mais de oitenta obreiros angolanos, hoje responsáveis pela maior parte das congregações locais.",
      "Seu foco atual é a transição completa da liderança das igrejas para obreiros nacionais.",
    ],
    foco: ["Ensino teológico", "Supervisão de congregações", "Transição de liderança"],
    pedidosOracao: [
      "Pela formação da nova turma do instituto bíblico",
      "Pela sustentabilidade financeira das congregações locais",
      "Pela transição de liderança para obreiros angolanos",
    ],
    foto: { src: "/img/missionarios/carlos-eduardo.svg", alt: "Retrato do missionário Carlos Eduardo Pires" },
  },
  {
    slug: "familia-fontes-roraima",
    nome: "Família Fontes",
    campo: "Fronteira Brasil–Venezuela",
    pais: "Brasil",
    continente: "América do Sul",
    desde: 2019,
    resumo:
      "Atendem imigrantes venezuelanos e comunidades indígenas em Roraima, com cultos em português e espanhol.",
    historia: [
      "Hélio e Rosana Fontes assumiram o trabalho em Boa Vista em 2019, no auge do fluxo migratório venezuelano para o Brasil.",
      "O ministério combina acolhimento humanitário — alimentação, orientação e encaminhamento — com trabalho pastoral entre os imigrantes.",
      "A família também mantém visitas regulares a duas comunidades indígenas da região, respeitando os protocolos de acesso e o trabalho de lideranças locais.",
    ],
    foco: ["Acolhimento de imigrantes", "Ministério indígena", "Cultos bilíngues"],
    pedidosOracao: [
      "Pelas famílias venezuelanas em situação de vulnerabilidade",
      "Pela aproximação respeitosa às comunidades indígenas",
      "Por recursos para o ponto de acolhimento em Boa Vista",
    ],
    foto: { src: "/img/missionarios/familia-fontes.svg", alt: "Retrato da família Fontes em Roraima" },
  },
];

export function getMissionario(slug: string): Missionario | undefined {
  return MISSIONARIOS.find((m) => m.slug === slug);
}

/** Indicadores exibidos no topo da página de Missões. */
export const RESUMO_MISSOES = {
  paises: CAMPOS.length,
  continentes: new Set(CAMPOS.map((c) => c.continente)).size,
  missionarios: CAMPOS.reduce((total, c) => total + c.missionarios, 0),
  desde: 1939,
};

/** Testemunhos exibidos na página de Missões. */
export const TESTEMUNHOS = [
  {
    texto:
      "Conheci o Evangelho quando o barco chegou à nossa comunidade. Não havia igreja aqui, nem estrada. Hoje somos quarenta e dois membros e temos nosso próprio templo de madeira.",
    autor: "Dona Raimunda Nonata",
    origem: "Comunidade São Sebastião, Rio Negro (AM)",
  },
  {
    texto:
      "Cheguei em Lisboa sem documento, sem trabalho e sem conhecer ninguém. O centro de acolhimento me ajudou com o essencial e, ali, encontrei também a fé que me sustentou.",
    autor: "Jonas Ribeiro",
    origem: "Lisboa, Portugal",
  },
  {
    texto:
      "Fui aluno do instituto bíblico em 2009. Hoje pastoreio uma congregação com trezentos membros e já ajudei a formar outros seis obreiros angolanos.",
    autor: "Pastor Domingos Kiala",
    origem: "Luanda, Angola",
  },
];
