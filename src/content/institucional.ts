import type { ArtigoFe, MarcoHistorico, Presidente } from "./types";

/**
 * Conteúdo institucional: história, linha do tempo, liderança e declaração de fé.
 *
 * Os marcos históricos referenciam fatos divulgados publicamente pela própria
 * denominação. Nomes de presidentes e membros do concílio são fictícios, criados
 * para o protótipo — devem ser substituídos pelos dados oficiais antes da publicação.
 */

export const MISSAO = {
  missao:
    "Anunciar o Evangelho de Jesus Cristo a toda criatura, formando discípulos e plantando igrejas comprometidas com a Palavra de Deus, no Brasil e entre as nações.",
  visao:
    "Ser uma denominação presente em todo o território nacional e nos campos missionários do mundo, reconhecida pela fidelidade doutrinária, pela integridade e pelo cuidado com as pessoas.",
  valores: [
    {
      titulo: "Fidelidade às Escrituras",
      descricao:
        "A Bíblia é a nossa única regra de fé e prática. Toda decisão, ensino e prática da Missão é submetida ao que está escrito.",
    },
    {
      titulo: "Vida no Espírito",
      descricao:
        "Cremos e buscamos a experiência pentecostal, com sobriedade, ordem e edificação da igreja, conforme o ensino apostólico.",
    },
    {
      titulo: "Compromisso Missionário",
      descricao:
        "Missões não é um departamento entre outros: é a razão de existirmos como Missão desde 1939.",
    },
    {
      titulo: "Integridade",
      descricao:
        "Zelamos pela transparência administrativa e pela conduta irrepreensível dos que servem em qualquer função.",
    },
    {
      titulo: "Cuidado com as Pessoas",
      descricao:
        "A igreja é feita de gente. O acolhimento, o discipulado e a assistência ao necessitado são parte inseparável da nossa obra.",
    },
    {
      titulo: "Unidade na Diversidade",
      descricao:
        "Somos uma denominação nacional formada por igrejas de realidades muito distintas, unidas pela mesma fé e pelo mesmo propósito.",
    },
  ],
  atuacao: [
    {
      titulo: "Plantação de igrejas",
      descricao:
        "Apoio técnico e financeiro à abertura de novos pontos de pregação em regiões ainda não alcançadas pela denominação.",
    },
    {
      titulo: "Educação teológica",
      descricao:
        "Seminários em Natal e Fortaleza, além de programas de formação livre para obreiros em todas as regiões.",
    },
    {
      titulo: "Missões transculturais",
      descricao:
        "Envio e sustento de missionários em quatro continentes, além do trabalho fluvial e indígena em território nacional.",
    },
    {
      titulo: "Assistência social",
      descricao:
        "Atendimento a famílias em vulnerabilidade, campanhas de arrecadação e apoio a creches mantidas por igrejas locais.",
    },
  ],
};

/** Linha do tempo exibida em `/sobre/historia`. */
export const LINHA_DO_TEMPO: MarcoHistorico[] = [
  {
    ano: "1939",
    titulo: "O início em Manaus",
    descricao:
      "O casal missionário Harland Edwin Graham e Hazel Evelyn Graham, enviados pela Church By the Side of the Road, de Seattle (EUA), inicia o trabalho de evangelização em Manaus, no Amazonas.",
    destaque: true,
  },
  {
    ano: "1940s",
    titulo: "Primeiro culto em Natal",
    descricao:
      "Em 26 de junho, Harland e Harold alugam um salão no bairro do Alecrim e realizam o primeiro culto oficial da Missão Evangélica Pentecostal na cidade de Natal, no Rio Grande do Norte.",
    destaque: true,
  },
  {
    ano: "1943",
    titulo: "Templo Central de Natal",
    descricao:
      "É organizada a congregação que viria a se tornar o Templo Central de Natal, hoje sede nacional da denominação.",
  },
  {
    ano: "1951–1962",
    titulo: "Expansão pelo Nordeste e Norte",
    descricao:
      "A obra se estabelece em Recife, Fortaleza e Belém, consolidando a presença da Missão nas duas regiões que formariam sua base histórica.",
  },
  {
    ano: "1965",
    titulo: "Estatuto e organização formal",
    descricao:
      "Já atuando em vários estados, a Igreja Missão Evangélica Pentecostal do Brasil elabora seu estatuto e se organiza formalmente, estabelecendo a Sede Nacional em Recife. Em 14 de dezembro, concluído o registro do Estatuto, o missionário Harland Graham é eleito o primeiro presidente.",
    destaque: true,
  },
  {
    ano: "1966",
    titulo: "Primeira Convenção Nacional",
    descricao:
      "Realiza-se em Natal a primeira Convenção Nacional da Missão Evangélica Pentecostal do Brasil, instituindo o modelo de governo colegiado que vigora até hoje.",
    destaque: true,
  },
  {
    ano: "1970s",
    titulo: "Transferência da Sede Nacional",
    descricao:
      "A Sede Nacional é transferida de Recife para Natal, no Rio Grande do Norte, onde permanece até os dias atuais, com jurisdição sobre todo o território nacional.",
  },
  {
    ano: "1980s",
    titulo: "Formação teológica",
    descricao:
      "São estruturados os seminários teológicos da denominação em Fortaleza (CE) e Natal (RN), consolidando o compromisso com a formação de obreiros.",
  },
  {
    ano: "1996–2013",
    titulo: "A Missão alcança quatro continentes",
    descricao:
      "Com o envio de missionários aos Estados Unidos, à África, à Europa e à Ásia, a denominação passa a atuar em quatro continentes por meio de seus missionários e parceiros.",
    destaque: true,
  },
  {
    ano: "1998",
    titulo: "Ministério fluvial no Rio Negro",
    descricao:
      "Entra em operação o barco Missionária Ethel Matson, atendendo as populações ribeirinhas do Rio Negro, no Amazonas — trabalho que segue ativo até hoje.",
  },
  {
    ano: "2019",
    titulo: "Especial 80 anos",
    descricao:
      "A denominação celebra oito décadas de história com programação especial e o início da organização de seu acervo documental.",
  },
  {
    ano: "Hoje",
    titulo: "Presença nacional",
    descricao:
      "A MEPB está presente em 21 estados da federação, 16 capitais e mais de 130 municípios, mantendo seminários teológicos, campos missionários e projetos de assistência social.",
    destaque: true,
  },
];

/** Galeria de presidentes — dados fictícios para o protótipo. */
export const PRESIDENTES: Presidente[] = [
  {
    nome: "Miss. Harland Edwin Graham",
    periodo: "1965 – 1972",
    origem: "Seattle, Estados Unidos",
    nota: "Fundador da obra no Brasil e primeiro presidente eleito, após a conclusão e registro do Estatuto em 1965.",
  },
  {
    nome: "Pr. Manoel Bezerra da Costa",
    periodo: "1972 – 1980",
    origem: "Natal, Rio Grande do Norte",
    nota: "Conduziu a transferência da Sede Nacional de Recife para Natal.",
  },
  {
    nome: "Pr. Wilson Araújo Filgueira",
    periodo: "1980 – 1988",
    origem: "Fortaleza, Ceará",
    nota: "Responsável pela estruturação dos seminários teológicos da denominação.",
  },
  {
    nome: "Pr. José Ivan Nogueira",
    periodo: "1988 – 1996",
    origem: "Recife, Pernambuco",
    nota: "Ampliou a presença da MEPB nas regiões Sudeste e Centro-Oeste.",
  },
  {
    nome: "Pr. Abelardo Duarte Coutinho",
    periodo: "1996 – 2008",
    origem: "Natal, Rio Grande do Norte",
    nota: "Sob sua gestão, a denominação enviou seus primeiros missionários ao exterior.",
  },
  {
    nome: "Pr. Severino Ramos da Cunha",
    periodo: "2008 – 2016",
    origem: "João Pessoa, Paraíba",
    nota: "Modernizou a administração e implantou o sistema de registro das igrejas filiadas.",
  },
  {
    nome: "Pr. Josué Andrade Lima",
    periodo: "2016 – atual",
    origem: "Natal, Rio Grande do Norte",
    nota: "Preside o Supremo Concílio no quadriênio atual, com ênfase na formação de obreiros e na expansão missionária.",
  },
];

/** Composição do Supremo Concílio — dados fictícios para o protótipo. */
export const SUPREMO_CONCILIO = [
  { cargo: "Presidente", nome: "Pr. Josué Andrade Lima", uf: "RN" },
  { cargo: "Vice-Presidente", nome: "Pr. Elias Ferreira do Nascimento", uf: "AM" },
  { cargo: "1º Secretário", nome: "Pr. Marcos Vinícius Teixeira", uf: "CE" },
  { cargo: "2º Secretário", nome: "Pr. Fábio Henrique Cavalcanti", uf: "PB" },
  { cargo: "1º Tesoureiro", nome: "Pr. Antônio Carlos Beserra", uf: "PE" },
  { cargo: "2º Tesoureiro", nome: "Pr. Gilberto Almeida Santos", uf: "BA" },
  { cargo: "Vogal", nome: "Pr. Raimundo Sena Barbosa", uf: "PA" },
  { cargo: "Vogal", nome: "Pr. Aldenir Moura Campelo", uf: "PI" },
  { cargo: "Vogal", nome: "Pr. Daniel Rocha Monteiro", uf: "SP" },
];

/**
 * Declaração de fé.
 * Texto-base representativo da doutrina pentecostal clássica, escrito para o
 * protótipo. Deve ser substituído pelo credo oficial aprovado em Convenção.
 */
export const DECLARACAO_DE_FE: ArtigoFe[] = [
  {
    titulo: "Das Sagradas Escrituras",
    texto:
      "Cremos que a Bíblia Sagrada, composta pelos sessenta e seis livros do Antigo e do Novo Testamento, é a Palavra de Deus inspirada, infalível e suficiente, única regra de fé e prática para a vida do cristão e para o governo da igreja.",
    referencias: ["2 Timóteo 3.16-17", "2 Pedro 1.21"],
  },
  {
    titulo: "Do Deus Único e Trino",
    texto:
      "Cremos em um só Deus, eterno, criador dos céus e da terra, subsistente em três pessoas distintas e iguais em essência: o Pai, o Filho e o Espírito Santo.",
    referencias: ["Deuteronômio 6.4", "Mateus 28.19", "2 Coríntios 13.13"],
  },
  {
    titulo: "Do Senhor Jesus Cristo",
    texto:
      "Cremos na divindade de nosso Senhor Jesus Cristo, em seu nascimento virginal, em sua vida sem pecado, em seus milagres, em sua morte vicária na cruz, em sua ressurreição corporal, em sua ascensão ao céu e em sua volta pessoal e visível.",
    referencias: ["João 1.1-14", "Mateus 1.23", "1 Coríntios 15.3-4", "Atos 1.11"],
  },
  {
    titulo: "Do Espírito Santo",
    texto:
      "Cremos na pessoa e na obra do Espírito Santo, que convence o mundo do pecado, regenera, habita, santifica e capacita o crente para o serviço cristão.",
    referencias: ["João 16.8-11", "Tito 3.5", "1 Coríntios 6.19"],
  },
  {
    titulo: "Do Batismo no Espírito Santo",
    texto:
      "Cremos no batismo no Espírito Santo, experiência distinta e subsequente à conversão, concedido a todos os que o buscam, tendo como sinal inicial o falar em outras línguas conforme o Espírito concede.",
    referencias: ["Atos 2.4", "Atos 10.44-46", "Atos 19.6"],
  },
  {
    titulo: "Dos Dons Espirituais",
    texto:
      "Cremos na atualidade dos dons espirituais, concedidos pelo Espírito Santo para a edificação da igreja, devendo ser exercidos com ordem, decência e sujeição à Palavra.",
    referencias: ["1 Coríntios 12.4-11", "1 Coríntios 14.40"],
  },
  {
    titulo: "Da Salvação",
    texto:
      "Cremos que a salvação é dádiva de Deus, recebida pela graça mediante a fé em Jesus Cristo, e não por obras, produzindo arrependimento genuíno e nova vida em Cristo.",
    referencias: ["Efésios 2.8-9", "João 3.16", "Romanos 10.9-10"],
  },
  {
    titulo: "Da Igreja",
    texto:
      "Cremos na Igreja como o corpo de Cristo, formada por todos os salvos, e na igreja local como comunidade visível de crentes reunidos para adoração, ensino, comunhão e serviço.",
    referencias: ["Efésios 1.22-23", "Atos 2.42", "Hebreus 10.25"],
  },
  {
    titulo: "Das Ordenanças",
    texto:
      "Cremos no batismo em águas por imersão, ministrado ao crente após profissão de fé, e na Ceia do Senhor, celebrada em memória de sua morte até que Ele venha.",
    referencias: ["Mateus 28.19", "Romanos 6.4", "1 Coríntios 11.23-26"],
  },
  {
    titulo: "Da Vida Cristã",
    texto:
      "Cremos que o cristão é chamado à santidade, à integridade e ao amor ao próximo, manifestando na conduta diária a transformação operada por Cristo.",
    referencias: ["1 Pedro 1.15-16", "Gálatas 5.22-23", "Tiago 2.17"],
  },
  {
    titulo: "Da Segunda Vinda de Cristo",
    texto:
      "Cremos na volta pessoal, visível e gloriosa de nosso Senhor Jesus Cristo para arrebatar a sua Igreja e, posteriormente, estabelecer o seu reino.",
    referencias: ["1 Tessalonicenses 4.16-17", "Apocalipse 1.7"],
  },
  {
    titulo: "Do Juízo Final e da Eternidade",
    texto:
      "Cremos na ressurreição dos mortos, no juízo final, na vida eterna dos salvos e na condenação eterna dos que rejeitam a salvação em Cristo.",
    referencias: ["João 5.28-29", "Apocalipse 20.11-15", "Mateus 25.46"],
  },
];
