import type { CategoriaNoticia, Noticia } from "./types";

/** Conteúdo fictício de demonstração — collection `noticia` do Strapi. */

export const CATEGORIAS_NOTICIA: CategoriaNoticia[] = [
  "Institucional",
  "Missões",
  "Eventos",
  "Departamentos",
  "Educação",
  "Ação Social",
];

export const NOTICIAS: Noticia[] = [
  {
    slug: "convencao-nacional-2026-natal",
    titulo: "Convenção Nacional 2026 reunirá lideranças de 22 estados em Natal",
    resumo:
      "Encontro acontece entre 14 e 17 de outubro no Templo Central e marcará a eleição do Supremo Concílio para o próximo quadriênio.",
    categoria: "Institucional",
    data: "2026-07-18",
    autor: "Secretaria de Comunicação",
    destaque: true,
    imagem: {
      src: "/img/noticias/convencao-2026.svg",
      alt: "Plenário do Templo Central preparado para a Convenção Nacional",
    },
    corpo: [
      "A Missão Evangélica Pentecostal do Brasil confirmou as datas da Convenção Nacional 2026. O encontro será realizado entre os dias 14 e 17 de outubro, no Templo Central, em Natal, e deve reunir cerca de novecentos delegados vindos dos vinte e um estados onde a denominação está presente.",
      "Além das sessões administrativas, a programação inclui cultos de celebração, painéis sobre plantação de igrejas e um seminário dedicado à formação de novos obreiros. A Convenção também elegerá o Supremo Concílio para o quadriênio seguinte.",
      "As inscrições para delegados serão abertas em agosto, pelo portal, e cada igreja poderá indicar seus representantes conforme o critério previsto no Regimento Interno.",
      "A Secretaria de Comunicação informa que a programação completa e os materiais de apoio estarão disponíveis na Biblioteca do portal assim que aprovados pela comissão organizadora.",
    ],
    tags: ["convenção", "supremo concílio", "natal"],
    tempoLeitura: 3,
  },
  {
    slug: "barco-missionario-ethel-matson-novas-comunidades",
    titulo: "Barco Missionária Ethel Matson passa a atender mais seis comunidades",
    resumo:
      "Ampliação do trabalho fluvial no Rio Negro leva assistência espiritual e atendimento básico de saúde a famílias ribeirinhas do Amazonas.",
    categoria: "Missões",
    data: "2026-07-09",
    autor: "Departamento Nacional de Missões",
    destaque: true,
    imagem: {
      src: "/img/noticias/barco-rio-negro.svg",
      alt: "Barco missionário navegando pelo Rio Negro ao amanhecer",
    },
    corpo: [
      "O ministério fluvial da MEPB no Amazonas ampliou seu alcance. A partir deste mês, o barco Missionária Ethel Matson passa a atender dezenove comunidades ribeirinhas ao longo do Rio Negro, seis a mais do que no roteiro anterior.",
      "Cada viagem dura em média onze dias e leva, além do trabalho de evangelização e discipulado, atendimento odontológico básico, distribuição de material escolar e cestas de alimentos.",
      "O nome da embarcação homenageia a missionária Ethel Matson, que dedicou parte de sua vida ao trabalho entre os povos da região amazônica.",
      "O missionário Paulo Tavares, responsável pelo roteiro, destaca que a maior dificuldade continua sendo o período de seca, quando alguns igarapés ficam intransitáveis e as comunidades passam meses sem visita.",
    ],
    tags: ["amazonas", "ribeirinhos", "missões"],
    tempoLeitura: 4,
  },
  {
    slug: "seminario-harland-graham-abre-inscricoes",
    titulo: "Seminário Teológico Harland Graham abre inscrições para 2027",
    resumo:
      "Instituição de Natal oferece cursos de Bacharel em Teologia e formação livre para obreiros, com turmas presenciais e semipresenciais.",
    categoria: "Educação",
    data: "2026-06-28",
    autor: "Departamento Nacional de Educação",
    destaque: false,
    imagem: {
      src: "/img/noticias/seminario-inscricoes.svg",
      alt: "Sala de aula do Seminário Teológico Harland Graham",
    },
    corpo: [
      "Estão abertas as inscrições para o processo seletivo 2027 do Seminário Teológico Harland Graham, em Natal. São oferecidas vagas para o curso de Bacharel em Teologia, com duração de quatro anos, e para o programa de formação livre de obreiros.",
      "Nesta edição, o seminário amplia a oferta de turmas semipresenciais, atendendo a uma demanda antiga de alunos do interior e de outros estados.",
      "O edital completo, com calendário, documentação exigida e conteúdo programático da prova, está disponível na Biblioteca do portal.",
    ],
    tags: ["seminário", "teologia", "educação"],
    tempoLeitura: 2,
  },
  {
    slug: "congresso-nacional-de-jovens-2026",
    titulo: "Congresso Nacional de Jovens 2026 tem tema definido",
    resumo:
      "Com o tema \"Firmes no Propósito\", o encontro acontece em Fortaleza e espera receber mais de dois mil jovens de todo o país.",
    categoria: "Departamentos",
    data: "2026-06-15",
    autor: "Departamento Nacional de Jovens",
    destaque: false,
    imagem: {
      src: "/img/noticias/congresso-jovens.svg",
      alt: "Jovens reunidos em culto de celebração",
    },
    corpo: [
      "O Departamento Nacional de Jovens definiu o tema do Congresso Nacional de 2026: \"Firmes no Propósito\", inspirado em 1 Coríntios 15.58.",
      "O encontro será realizado em Fortaleza, entre 20 e 23 de agosto, e a organização espera receber mais de dois mil jovens vindos de todas as regiões do país.",
      "A programação inclui plenárias, oficinas de liderança, um festival de louvor e uma ação social conjunta em bairros da capital cearense.",
    ],
    tags: ["jovens", "congresso", "fortaleza"],
    tempoLeitura: 2,
  },
  {
    slug: "mepb-inaugura-igreja-em-belo-horizonte",
    titulo: "MEPB consolida presença no Sudeste com nova sede em Belo Horizonte",
    resumo:
      "Templo reformado no bairro Santa Efigênia passa a funcionar como base do programa de plantação de igrejas na região.",
    categoria: "Institucional",
    data: "2026-05-30",
    autor: "Secretaria de Comunicação",
    destaque: false,
    imagem: {
      src: "/img/noticias/nova-igreja-bh.svg",
      alt: "Culto de inauguração da igreja em Belo Horizonte",
    },
    corpo: [
      "A Igreja MEPB de Belo Horizonte inaugurou seu novo templo no bairro Santa Efigênia, em cerimônia que reuniu lideranças nacionais e representantes das igrejas do Sudeste.",
      "O espaço passa a abrigar também o núcleo regional de plantação de igrejas, responsável por acompanhar novos pontos de pregação em Minas Gerais, São Paulo e Espírito Santo.",
      "Fundada em 2015, a igreja é a mais recente da denominação na região e cresceu de doze para cerca de duzentos membros na última década.",
    ],
    tags: ["belo horizonte", "plantação de igrejas", "sudeste"],
    tempoLeitura: 3,
  },
  {
    slug: "campanha-agasalho-2026",
    titulo: "Campanha do Agasalho 2026 arrecada 12 mil peças em todo o país",
    resumo:
      "Ação conjunta dos departamentos de Mulheres e Evangelismo atendeu famílias em situação de vulnerabilidade em 40 municípios.",
    categoria: "Ação Social",
    data: "2026-05-12",
    autor: "Departamento Nacional de Mulheres",
    destaque: false,
    imagem: {
      src: "/img/noticias/campanha-agasalho.svg",
      alt: "Voluntárias organizando roupas doadas na campanha do agasalho",
    },
    corpo: [
      "A Campanha do Agasalho 2026, promovida em conjunto pelos departamentos nacionais de Mulheres e Evangelismo, arrecadou cerca de doze mil peças de roupa em todo o país.",
      "As doações foram distribuídas em quarenta municípios, com prioridade para famílias atendidas pelos projetos sociais das igrejas locais.",
      "A coordenação nacional agradeceu o empenho das igrejas e informou que a próxima edição já está sendo planejada, com meta de ampliar a ação para sessenta municípios.",
    ],
    tags: ["ação social", "mulheres", "solidariedade"],
    tempoLeitura: 2,
  },
  {
    slug: "novo-manual-de-identidade-visual",
    titulo: "Denominação publica novo Manual de Identidade Visual",
    resumo:
      "Documento padroniza o uso da logomarca, cores institucionais e aplicações em materiais impressos e digitais das igrejas filiadas.",
    categoria: "Institucional",
    data: "2026-04-22",
    autor: "Secretaria de Comunicação",
    destaque: false,
    imagem: {
      src: "/img/noticias/manual-identidade.svg",
      alt: "Páginas abertas do Manual de Identidade Visual da MEPB",
    },
    corpo: [
      "A Secretaria de Comunicação publicou a nova edição do Manual de Identidade Visual da MEPB, disponível para download na Biblioteca do portal.",
      "O documento estabelece regras claras para o uso da logomarca, define as cores institucionais e traz modelos de aplicação para placas, materiais impressos, redes sociais e apresentações.",
      "Junto ao manual, foi disponibilizado um pacote com os arquivos vetoriais da logomarca em todas as versões autorizadas.",
    ],
    tags: ["identidade visual", "comunicação", "biblioteca"],
    tempoLeitura: 2,
  },
  {
    slug: "encontro-nacional-de-casais-2026",
    titulo: "Encontro Nacional de Casais reúne 300 famílias em João Pessoa",
    resumo:
      "Programação de três dias abordou comunicação no casamento, criação de filhos e finanças familiares à luz da Palavra.",
    categoria: "Eventos",
    data: "2026-04-08",
    autor: "Departamento Nacional de Homens",
    destaque: false,
    imagem: {
      src: "/img/noticias/encontro-casais.svg",
      alt: "Casais reunidos durante plenária do encontro nacional",
    },
    corpo: [
      "Trezentas famílias participaram do Encontro Nacional de Casais, realizado em João Pessoa entre os dias 4 e 6 de abril.",
      "A programação abordou temas como comunicação no casamento, criação de filhos, administração das finanças familiares e a prática da oração em casa.",
      "O encontro é promovido a cada dois anos e nesta edição contou com casais de dezesseis estados.",
    ],
    tags: ["casais", "família", "joão pessoa"],
    tempoLeitura: 2,
  },
  {
    slug: "mepb-completa-85-anos",
    titulo: "MEPB celebra 85 anos de história e missão no Brasil",
    resumo:
      "De um salão alugado em Manaus, em 1939, a denominação chegou a 22 estados e a quatro continentes.",
    categoria: "Institucional",
    data: "2026-03-14",
    autor: "Secretaria de Comunicação",
    destaque: false,
    imagem: {
      src: "/img/noticias/85-anos.svg",
      alt: "Fotografia histórica do primeiro templo da Missão",
    },
    corpo: [
      "A Missão Evangélica Pentecostal do Brasil celebrou oitenta e cinco anos de fundação com cultos especiais em todas as igrejas filiadas.",
      "A obra começou em 1939, em Manaus, com o trabalho pioneiro do casal missionário Harland Edwin Graham e Hazel Evelyn Graham, enviados pela Church By the Side of the Road, de Seattle, nos Estados Unidos.",
      "Hoje, a denominação está presente em vinte e um estados, dezesseis capitais e mais de cento e trinta municípios, além de sustentar missionários em quatro continentes.",
      "As celebrações incluíram a abertura do acervo histórico digitalizado, disponível na seção Nossa História do portal.",
    ],
    tags: ["aniversário", "história", "85 anos"],
    tempoLeitura: 3,
  },
];

export function getNoticia(slug: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.slug === slug);
}

/** Notícias ordenadas da mais recente para a mais antiga. */
export const NOTICIAS_RECENTES = [...NOTICIAS].sort(
  (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
);
