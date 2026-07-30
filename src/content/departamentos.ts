import type { Departamento } from "./types";

/** Conteúdo fictício de demonstração — collection `departamento` do Strapi. */

export const DEPARTAMENTOS: Departamento[] = [
  {
    slug: "homens",
    nome: "Departamento de Homens",
    lema: "Varões de fé, sustento da casa e da igreja",
    icone: "Users",
    descricao:
      "Reúne os homens da igreja para comunhão, estudo da Palavra e serviço, com ênfase na responsabilidade espiritual sobre a família.",
    sobre: [
      "O Departamento Nacional de Homens existe para fortalecer o varão cristão no seu papel dentro da casa, da igreja e da sociedade. A atuação se dá por meio de encontros regulares de comunhão, estudos temáticos e mutirões de serviço nas comunidades.",
      "A cada dois anos, o departamento promove o Encontro Nacional de Casais em parceria com o Departamento de Mulheres, tratando de temas como comunicação no casamento, criação de filhos e administração das finanças familiares.",
      "Nas igrejas locais, o departamento é também responsável pelos trabalhos de manutenção dos templos e pelas ações de apoio a famílias em dificuldade.",
    ],
    coordenador: { nome: "Pr. Antônio Carlos Beserra", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Encontro Nacional de Casais", descricao: "Realizado a cada dois anos, reúne famílias de todo o país." },
      { titulo: "Café dos Varões", descricao: "Encontro mensal de comunhão e estudo bíblico nas igrejas locais." },
      { titulo: "Mutirão de Serviço", descricao: "Ações de reforma e manutenção em templos e casas de membros idosos." },
    ],
    versiculo: {
      texto: "Eu e a minha casa serviremos ao Senhor.",
      referencia: "Josué 24.15",
    },
    imagem: { src: "/img/departamentos/homens.svg", alt: "Homens reunidos em encontro de comunhão" },
  },
  {
    slug: "mulheres",
    nome: "Departamento de Mulheres",
    lema: "Servas dedicadas, mãos que edificam",
    icone: "Heart",
    descricao:
      "Congrega as mulheres da denominação em torno da oração, do ensino e da ação social, com forte atuação nas comunidades atendidas pelas igrejas.",
    sobre: [
      "O Departamento Nacional de Mulheres é um dos mais atuantes da MEPB. Sua agenda combina vida devocional, capacitação e serviço ao próximo, com círculos de oração semanais em praticamente todas as igrejas filiadas.",
      "A frente social do departamento coordena a Campanha do Agasalho, o atendimento a famílias em situação de vulnerabilidade e o apoio às creches mantidas por igrejas locais.",
      "O Encontro Nacional de Mulheres, realizado anualmente, é o principal evento do departamento e reúne participantes de todas as regiões do país.",
    ],
    coordenador: { nome: "Irmã Neide Barros de Souza", cargo: "Coordenadora Nacional" },
    atividades: [
      { titulo: "Encontro Nacional de Mulheres", descricao: "Três dias de ensino, comunhão e capacitação." },
      { titulo: "Círculo de Oração", descricao: "Reunião semanal de intercessão nas igrejas locais." },
      { titulo: "Campanha do Agasalho", descricao: "Arrecadação e distribuição de roupas em todo o país." },
    ],
    versiculo: {
      texto: "A mulher virtuosa quem a achará? O seu valor muito excede o de rubis.",
      referencia: "Provérbios 31.10",
    },
    imagem: { src: "/img/departamentos/mulheres.svg", alt: "Mulheres reunidas em círculo de oração" },
  },
  {
    slug: "jovens",
    nome: "Departamento de Jovens",
    lema: "Firmes no propósito",
    icone: "Flame",
    faixaEtaria: "18 a 35 anos",
    descricao:
      "Espaço de formação, comunhão e envio da juventude da MEPB, com forte ênfase em missões e liderança.",
    sobre: [
      "O Departamento Nacional de Jovens acompanha a juventude da denominação na transição para a vida adulta, oferecendo formação bíblica sólida, oportunidades de serviço e um ambiente de comunhão saudável.",
      "O Congresso Nacional de Jovens é o maior evento da MEPB em número de participantes e reúne mais de dois mil jovens a cada edição, com plenárias, oficinas de liderança e festival de louvor.",
      "O departamento também mantém o programa Envio, que apoia jovens interessados em servir por períodos determinados nos campos missionários da denominação.",
    ],
    coordenador: { nome: "Pr. Cleiton Ribeiro Mendes", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Congresso Nacional de Jovens", descricao: "Encontro anual com plenárias, oficinas e festival de louvor." },
      { titulo: "Programa Envio", descricao: "Experiência missionária de curta duração nos campos da MEPB." },
      { titulo: "Células de Estudo", descricao: "Grupos semanais de estudo bíblico e discipulado." },
    ],
    versiculo: {
      texto: "Sede firmes e constantes, sempre abundantes na obra do Senhor.",
      referencia: "1 Coríntios 15.58",
    },
    imagem: { src: "/img/departamentos/jovens.svg", alt: "Jovens reunidos em culto de celebração" },
  },
  {
    slug: "adolescentes",
    nome: "Departamento de Adolescentes",
    lema: "Crescendo na graça e no conhecimento",
    icone: "Sparkles",
    faixaEtaria: "12 a 17 anos",
    descricao:
      "Acompanha os adolescentes em uma fase decisiva, unindo ensino bíblico, convivência e atividades adequadas à idade.",
    sobre: [
      "O Departamento de Adolescentes trabalha com a faixa etária entre doze e dezessete anos, um período de formação de identidade e de escolhas que marcam a vida adulta.",
      "As atividades combinam estudo bíblico em linguagem acessível, dinâmicas de grupo, esporte e momentos de oração, sempre com acompanhamento de líderes preparados.",
      "O Retiro Nacional de Adolescentes, realizado anualmente, é o ponto alto da agenda do departamento.",
    ],
    coordenador: { nome: "Pr. Fábio Henrique Cavalcanti", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Retiro Nacional", descricao: "Fim de semana de acampamento, estudo e convivência." },
      { titulo: "Encontro Semanal", descricao: "Estudo bíblico e dinâmicas nas igrejas locais." },
      { titulo: "Projeto Esporte e Fé", descricao: "Atividades esportivas abertas à comunidade." },
    ],
    versiculo: {
      texto: "Ninguém despreze a tua mocidade; mas sê o exemplo dos fiéis.",
      referencia: "1 Timóteo 4.12",
    },
    imagem: { src: "/img/departamentos/adolescentes.svg", alt: "Adolescentes em atividade de grupo" },
  },
  {
    slug: "criancas",
    nome: "Departamento de Crianças",
    lema: "Deixai vir a mim os pequeninos",
    icone: "Baby",
    faixaEtaria: "0 a 11 anos",
    descricao:
      "Cuida do ensino bíblico infantil na Escola Dominical e nas atividades específicas para cada faixa etária.",
    sobre: [
      "O Departamento Nacional de Crianças é responsável pelo material didático da Escola Bíblica Dominical infantil e pela capacitação de professores nas igrejas filiadas.",
      "O trabalho é organizado por faixas etárias — maternal, jardim, primários e juniores — com conteúdo adequado ao desenvolvimento de cada grupo.",
      "O departamento mantém também o programa Férias com Cristo, uma semana de atividades bíblicas e recreativas realizada nos períodos de recesso escolar.",
    ],
    coordenador: { nome: "Irmã Cláudia Regina Farias", cargo: "Coordenadora Nacional" },
    atividades: [
      { titulo: "Escola Bíblica Dominical", descricao: "Ensino semanal organizado por faixa etária." },
      { titulo: "Férias com Cristo", descricao: "Semana de atividades bíblicas e recreativas." },
      { titulo: "Capacitação de Professores", descricao: "Formação continuada para professores da EBD infantil." },
    ],
    versiculo: {
      texto: "Deixai vir a mim os pequeninos e não os embaraceis.",
      referencia: "Marcos 10.14",
    },
    imagem: { src: "/img/departamentos/criancas.svg", alt: "Crianças em atividade da Escola Bíblica Dominical" },
  },
  {
    slug: "louvor",
    nome: "Departamento de Louvor",
    lema: "Cantai ao Senhor um cântico novo",
    icone: "Music",
    descricao:
      "Coordena os ministérios de música das igrejas, cuidando da formação técnica e da postura espiritual dos que servem no altar.",
    sobre: [
      "O Departamento Nacional de Louvor orienta os ministérios de música das igrejas filiadas, com atenção tanto à qualidade técnica quanto ao caráter de quem conduz a congregação em adoração.",
      "Anualmente, promove a Capacitação Nacional de Ministérios de Louvor, com oficinas de teoria musical, técnica vocal, operação de som e condução de culto.",
      "O departamento mantém e distribui o repertório oficial da denominação, incluindo partituras, cifras e playbacks disponíveis na Biblioteca do portal.",
    ],
    coordenador: { nome: "Ministro Josias Lemos Andrade", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Capacitação Nacional", descricao: "Oficinas técnicas e espirituais para ministérios de louvor." },
      { titulo: "Repertório Oficial", descricao: "Partituras, cifras e playbacks das músicas da denominação." },
      { titulo: "Festival de Louvor", descricao: "Apresentação de ministérios durante o Congresso de Jovens." },
    ],
    versiculo: {
      texto: "Cantai ao Senhor um cântico novo, cantai ao Senhor toda a terra.",
      referencia: "Salmos 96.1",
    },
    imagem: { src: "/img/departamentos/louvor.svg", alt: "Ministério de louvor conduzindo o culto" },
  },
  {
    slug: "missoes",
    nome: "Departamento de Missões",
    lema: "Até os confins da terra",
    icone: "Globe2",
    descricao:
      "Sustenta, envia e acompanha os missionários da MEPB no Brasil e no exterior.",
    sobre: [
      "O Departamento Nacional de Missões é o braço da denominação responsável pelo envio, sustento e acompanhamento pastoral dos missionários da MEPB.",
      "Atualmente, a denominação mantém obreiros em quatro continentes, além do trabalho transcultural em território nacional, com destaque para o ministério fluvial no Amazonas e o trabalho indígena em Roraima.",
      "O departamento coordena ainda a campanha anual de missões, que financia a manutenção dos campos e o envio de novos obreiros.",
    ],
    coordenador: { nome: "Pr. Elias Ferreira do Nascimento", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Campanha Nacional de Missões", descricao: "Mobilização anual para sustento dos campos missionários." },
      { titulo: "Ministério Fluvial", descricao: "Atendimento a comunidades ribeirinhas do Rio Negro." },
      { titulo: "Envio e Acompanhamento", descricao: "Preparo, envio e cuidado pastoral dos missionários." },
    ],
    versiculo: {
      texto: "Sereis minhas testemunhas até aos confins da terra.",
      referencia: "Atos 1.8",
    },
    imagem: { src: "/img/departamentos/missoes.svg", alt: "Missionários em trabalho de campo" },
  },
  {
    slug: "educacao",
    nome: "Departamento de Educação",
    lema: "Ensinando a Palavra com fidelidade",
    icone: "GraduationCap",
    descricao:
      "Responsável pelos seminários teológicos, pela Escola Bíblica Dominical e pela formação continuada de obreiros.",
    sobre: [
      "O Departamento Nacional de Educação supervisiona a formação teológica na denominação, incluindo o Seminário Teológico Harland Graham, em Natal, e o Seminário Teológico Pentecostal do Ceará, em Fortaleza.",
      "Além do ensino formal, o departamento produz o material da Escola Bíblica Dominical e coordena os seminários regionais de capacitação de liderança.",
      "A meta declarada do departamento é que todo obreiro credenciado pela MEPB tenha, no mínimo, formação básica em teologia.",
    ],
    coordenador: { nome: "Pr. Marcos Vinícius Teixeira", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Seminários Teológicos", descricao: "Bacharelado em Teologia em Natal e Fortaleza." },
      { titulo: "Escola Bíblica Dominical", descricao: "Produção do material didático de todas as faixas etárias." },
      { titulo: "Seminários Regionais", descricao: "Capacitação de pastores e líderes por região." },
    ],
    versiculo: {
      texto: "Procura apresentar-te a Deus aprovado, que maneja bem a palavra da verdade.",
      referencia: "2 Timóteo 2.15",
    },
    imagem: { src: "/img/departamentos/educacao.svg", alt: "Sala de aula do seminário teológico" },
  },
  {
    slug: "evangelismo",
    nome: "Departamento de Evangelismo",
    lema: "Ide e pregai",
    icone: "Megaphone",
    descricao:
      "Mobiliza as igrejas para a evangelização local, coordenando campanhas, ações de rua e projetos de plantação de igrejas.",
    sobre: [
      "O Departamento Nacional de Evangelismo organiza a ação evangelística das igrejas filiadas, com campanhas coordenadas em nível nacional e apoio a iniciativas locais.",
      "O departamento acompanha também os projetos de plantação de igrejas, oferecendo suporte a obreiros que iniciam novos pontos de pregação.",
      "A frente social do departamento atua junto a pessoas em situação de rua, dependentes químicos e famílias em vulnerabilidade, em parceria com o Departamento de Mulheres.",
    ],
    coordenador: { nome: "Pr. Jonas Batista de Oliveira", cargo: "Coordenador Nacional" },
    atividades: [
      { titulo: "Campanha Nacional de Evangelismo", descricao: "Mobilização simultânea de todas as igrejas filiadas." },
      { titulo: "Plantação de Igrejas", descricao: "Apoio técnico e financeiro a novos pontos de pregação." },
      { titulo: "Ação nas Ruas", descricao: "Atendimento a pessoas em situação de rua e vulnerabilidade." },
    ],
    versiculo: {
      texto: "Ide por todo o mundo e pregai o evangelho a toda criatura.",
      referencia: "Marcos 16.15",
    },
    imagem: { src: "/img/departamentos/evangelismo.svg", alt: "Equipe de evangelismo em ação na rua" },
  },
];

export function getDepartamento(slug: string): Departamento | undefined {
  return DEPARTAMENTOS.find((d) => d.slug === slug);
}
