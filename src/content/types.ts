/**
 * Tipos do modelo de conteúdo do Portal MEPB.
 *
 * Cada interface aqui corresponde a uma *collection type* do Strapi descrita em
 * `docs/03-modelo-de-conteudo.md`. As páginas consomem exclusivamente estes tipos,
 * então migrar dos dados fictícios para o CMS real significa trocar a origem dos
 * dados (`src/lib/api.ts`), sem tocar em nenhuma página ou componente.
 */

/** Unidades da federação onde a MEPB está presente. */
export type UF =
  | "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO"
  | "MA" | "MG" | "MS" | "MT" | "PA" | "PB" | "PE" | "PI" | "PR"
  | "RJ" | "RN" | "RO" | "RR" | "RS" | "SC" | "SE" | "SP" | "TO";

/** Imagem com texto alternativo obrigatório — acessibilidade por contrato de tipo. */
export interface Imagem {
  /** Caminho do arquivo ou identificador do placeholder SVG gerado. */
  src: string;
  /** Texto alternativo. Nunca opcional: o tipo força o autor a preencher. */
  alt: string;
  legenda?: string;
}

/** Horário de um culto ou atividade regular. */
export interface Culto {
  dia:
    | "Domingo" | "Segunda" | "Terça" | "Quarta"
    | "Quinta" | "Sexta" | "Sábado";
  horario: string;
  descricao: string;
}

/** Igreja local filiada à MEPB. */
export interface Igreja {
  slug: string;
  nome: string;
  tipo: "sede-nacional" | "sede-estadual" | "igreja" | "congregacao";
  cidade: string;
  uf: UF;
  bairro: string;
  endereco: string;
  cep: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  /** Coordenadas usadas no mapa e no link "Como chegar". */
  coordenadas: { lat: number; lng: number };
  pastor: {
    nome: string;
    desde: number;
    bio: string;
    foto: Imagem;
  };
  cultos: Culto[];
  descricao: string;
  fundacao: number;
  departamentos: string[];
  fotos: Imagem[];
}

/** Categoria editorial das notícias. */
export type CategoriaNoticia =
  | "Institucional"
  | "Missões"
  | "Eventos"
  | "Departamentos"
  | "Educação"
  | "Ação Social";

export interface Noticia {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: CategoriaNoticia;
  data: string;
  autor: string;
  destaque: boolean;
  imagem: Imagem;
  /** Corpo em parágrafos. No CMS vira Rich Text. */
  corpo: string[];
  tags: string[];
  tempoLeitura: number;
}

export interface Evento {
  slug: string;
  titulo: string;
  tipo: "Congresso" | "Convenção" | "Seminário" | "Culto" | "Retiro" | "Capacitação";
  dataInicio: string;
  dataFim?: string;
  cidade: string;
  uf: UF;
  local: string;
  endereco: string;
  descricao: string;
  imagem: Imagem;
  destaque: boolean;
  inscricoesAbertas: boolean;
  valor?: string;
  publico: string;
  programacao: { horario: string; atividade: string; responsavel?: string }[];
  materiais: { titulo: string; formato: string; tamanho: string }[];
}

export interface Departamento {
  slug: string;
  nome: string;
  lema: string;
  /** Nome do ícone em lucide-react. */
  icone: string;
  faixaEtaria?: string;
  descricao: string;
  sobre: string[];
  coordenador: { nome: string; cargo: string };
  atividades: { titulo: string; descricao: string }[];
  versiculo: { texto: string; referencia: string };
  imagem: Imagem;
}

export interface Missionario {
  slug: string;
  nome: string;
  campo: string;
  pais: string;
  continente: "América do Sul" | "América do Norte" | "África" | "Europa" | "Ásia";
  desde: number;
  resumo: string;
  historia: string[];
  foco: string[];
  pedidosOracao: string[];
  foto: Imagem;
}

export interface CampoMissionario {
  pais: string;
  continente: string;
  /** Posição percentual no mapa-múndi SVG (0–100). */
  x: number;
  y: number;
  missionarios: number;
  desde: number;
}

export interface Midia {
  slug: string;
  titulo: string;
  tipo: "Mensagem" | "Série" | "Podcast" | "Live" | "Documentário";
  preletor: string;
  data: string;
  duracao: string;
  descricao: string;
  serie?: string;
  destaque: boolean;
  capa: Imagem;
  /** ID do vídeo no YouTube. No protótipo, alimenta o placeholder do player. */
  youtubeId?: string;
}

export interface Documento {
  slug: string;
  titulo: string;
  categoria:
    | "Documentos Oficiais"
    | "Manuais"
    | "Identidade Visual"
    | "Louvor"
    | "Formulários"
    | "Estudos";
  descricao: string;
  formato: "PDF" | "DOCX" | "ZIP" | "MP3" | "PNG";
  tamanho: string;
  atualizadoEm: string;
  downloads: number;
  restrito: boolean;
}

export interface MarcoHistorico {
  ano: string;
  titulo: string;
  descricao: string;
  destaque?: boolean;
}

export interface Presidente {
  nome: string;
  periodo: string;
  origem: string;
  nota: string;
}

export interface ArtigoFe {
  titulo: string;
  texto: string;
  referencias: string[];
}

export interface PerguntaFrequente {
  pergunta: string;
  resposta: string;
  categoria: "Sobre a MEPB" | "Visitantes" | "Membresia" | "Documentos" | "Missões";
}

export interface ItemGaleria {
  id: string;
  titulo: string;
  categoria: "Eventos" | "Missões" | "Departamentos" | "Histórico" | "Igrejas";
  tipo: "foto" | "video";
  data: string;
  local: string;
  imagem: Imagem;
}
