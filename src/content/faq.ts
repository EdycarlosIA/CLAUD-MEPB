import type { PerguntaFrequente } from "./types";

/** Conteúdo fictício de demonstração — collection `faq` do Strapi. */

export const CATEGORIAS_FAQ: PerguntaFrequente["categoria"][] = [
  "Sobre a MEPB",
  "Visitantes",
  "Membresia",
  "Documentos",
  "Missões",
];

export const PERGUNTAS: PerguntaFrequente[] = [
  {
    categoria: "Sobre a MEPB",
    pergunta: "O que é a Missão Evangélica Pentecostal do Brasil?",
    resposta:
      "A MEPB é uma denominação evangélica pentecostal brasileira, fundada em 1939 em Manaus a partir do trabalho do casal missionário Harland e Hazel Graham. Organizou-se formalmente em 1965 e hoje mantém sede nacional em Natal, no Rio Grande do Norte, com atuação em 21 estados e em campos missionários de quatro continentes.",
  },
  {
    categoria: "Sobre a MEPB",
    pergunta: "Como a denominação é governada?",
    resposta:
      "A MEPB é dirigida nacionalmente por um órgão colegiado chamado Supremo Concílio, formado por Presidente, Vice-Presidente, 1º e 2º Secretários, 1º e 2º Tesoureiros e três vogais. O Concílio é eleito em Convenção Nacional, a assembleia máxima da denominação.",
  },
  {
    categoria: "Sobre a MEPB",
    pergunta: "Em quais estados a MEPB está presente?",
    resposta:
      "A denominação está presente em 21 estados da federação, em 16 capitais e em mais de 130 municípios. Você pode conferir a lista completa e localizar a igreja mais próxima na página Encontre uma Igreja.",
  },
  {
    categoria: "Visitantes",
    pergunta: "Nunca fui a uma igreja evangélica. Como funciona um culto?",
    resposta:
      "O culto costuma durar entre uma hora e meia e duas horas. Começa com um tempo de louvor com música, segue com leitura da Bíblia e pregação, e termina com oração. Não há nada que você precise fazer além de estar presente — ninguém será chamado à frente ou constrangido de qualquer forma.",
  },
  {
    categoria: "Visitantes",
    pergunta: "Preciso me vestir de alguma maneira específica?",
    resposta:
      "Não. Você será bem-vindo exatamente como estiver. Recomendamos apenas roupas confortáveis, já que o culto tem momentos em pé e sentados.",
  },
  {
    categoria: "Visitantes",
    pergunta: "Posso levar meus filhos?",
    resposta:
      "Sim. A maioria das nossas igrejas mantém atividades específicas para crianças durante o culto, organizadas por faixa etária pelo Departamento de Crianças. Consulte a ficha da igreja que você pretende visitar para confirmar os horários.",
  },
  {
    categoria: "Visitantes",
    pergunta: "Como faço para pedir uma visita pastoral?",
    resposta:
      "Você pode solicitar uma visita pela página Quero Participar, indicando sua cidade e a melhor forma de contato. A solicitação é encaminhada à igreja MEPB mais próxima de você, que fará o contato para combinar o melhor momento.",
  },
  {
    categoria: "Membresia",
    pergunta: "Como me torno membro de uma igreja MEPB?",
    resposta:
      "A membresia se dá após profissão de fé, batismo em águas por imersão e a conclusão de um período de acompanhamento e discipulado conduzido pela igreja local. Procure o pastor da igreja que você frequenta para conhecer o processo.",
  },
  {
    categoria: "Membresia",
    pergunta: "Sou membro de outra denominação. Posso transferir minha membresia?",
    resposta:
      "Sim. A transferência é feita mediante carta de recomendação da igreja de origem, apresentada ao pastor da igreja MEPB de destino. Cada caso é avaliado pela liderança local.",
  },
  {
    categoria: "Membresia",
    pergunta: "Como posso servir em algum ministério?",
    resposta:
      "Todo membro pode servir. Manifeste seu interesse ao pastor ou ao líder do departamento com que você mais se identifica — ou preencha o formulário na página Quero Participar, na opção Quero Servir.",
  },
  {
    categoria: "Documentos",
    pergunta: "Onde encontro o Estatuto e o Regimento Interno?",
    resposta:
      "Ambos estão disponíveis para download gratuito na Biblioteca do portal, na categoria Documentos Oficiais, sempre na versão consolidada mais recente aprovada em Convenção.",
  },
  {
    categoria: "Documentos",
    pergunta: "Posso usar a logomarca da MEPB nos materiais da minha igreja?",
    resposta:
      "Sim, desde que respeitadas as regras do Manual de Identidade Visual, disponível na Biblioteca. O pacote com os arquivos oficiais da logomarca também pode ser baixado por lá.",
  },
  {
    categoria: "Documentos",
    pergunta: "Por que alguns documentos aparecem como restritos?",
    resposta:
      "Documentos marcados como restritos são de uso interno de obreiros credenciados e secretarias de igrejas filiadas. O acesso é liberado após autenticação na Área Administrativa.",
  },
  {
    categoria: "Missões",
    pergunta: "Como posso contribuir com o trabalho missionário?",
    resposta:
      "Há três formas principais: oração pelos missionários e seus campos, contribuição financeira por meio da igreja local ou da campanha nacional de missões, e envio — colocando-se à disposição para servir. A página de Missões traz os detalhes de cada uma.",
  },
  {
    categoria: "Missões",
    pergunta: "Quero ser missionário. Por onde começo?",
    resposta:
      "O caminho começa na igreja local, com o reconhecimento do chamado pela liderança, seguido de preparo teológico em um dos nossos seminários e do processo de candidatura junto ao Departamento Nacional de Missões.",
  },
  {
    categoria: "Missões",
    pergunta: "Em quais países a MEPB atua atualmente?",
    resposta:
      "Além do Brasil, a denominação mantém missionários na Bolívia, Venezuela, Portugal, Espanha, Moçambique, Angola, Guiné-Bissau, Estados Unidos e Japão — em quatro continentes.",
  },
];
