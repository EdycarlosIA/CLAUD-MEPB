import { cn } from "@/lib/utils";

/**
 * Ilustrações sacras autorais do portal: pessoas em oração e adoração.
 *
 * Não são fotografias e não são templos. A escolha é deliberada:
 *  - a silhueta não define rosto, etnia ou vestuário, então qualquer membro se
 *    reconhece nela — o que uma foto de banco de imagens nunca faz;
 *  - não há licenciamento nem risco de a mesma foto aparecer no site de outra
 *    denominação;
 *  - pesa poucos KB e acompanha o tema claro/escuro sem versão alternativa.
 *
 * ── Duas restrições aprendidas desenhando isto ─────────────────────────────
 *
 * 1. O tronco é um **path preenchido** com cintura, quadril e pernas separadas.
 *    Desenhado como traço grosso de ponta arredondada, virava um pino de boliche.
 *
 * 2. Silhueta frontal **não expressa mãos unidas à frente do peito**: as mãos
 *    ficam sobre o tronco e desaparecem dentro dele. Por isso o repertório se
 *    limita ao que a silhueta resolve bem — braços erguidos, braços abertos e
 *    cabeça inclinada com os braços ao longo do corpo. Uma versão de perfil,
 *    com as mãos unidas à frente, foi tentada e descartada: em perfil as pernas
 *    se fundem numa coluna só e a figura lê como alguém de túnica.
 *
 * Proporção: figura de 100 unidades de altura, cabeça de ~14 (≈ 1/7 do corpo).
 */

type Pose = "maos-erguidas" | "bracos-abertos" | "cabeca-baixa";

/** Tronco, quadril e pernas de frente — comum às três poses frontais. */
const CORPO_FRENTE =
  "M40 17 C36.5 18.5 35.5 20.5 35.5 23 " +
  "L37 44 L38.5 52 L37 74 L36 96 " +
  "C35.6 98 36.6 99 38.5 99 L43 99 " +
  "C44.6 99 45.2 98 45.2 96 L45.8 74 " +
  "L50 59 L54.2 74 L54.8 96 " +
  "C54.8 98 55.4 99 57 99 L61.5 99 " +
  "C63.4 99 64.4 98 64 96 L63 74 " +
  "L61.5 52 L63 44 L64.5 23 " +
  "C64.5 20.5 63.5 18.5 60 17 Z";

const TRACO = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 5.6,
};

function Figura({ pose }: { pose: Pose }) {
  const cabecaBaixa = pose === "cabeca-baixa";

  return (
    <g>
      <ellipse
        cx={cabecaBaixa ? 51.5 : 50}
        cy={cabecaBaixa ? 11.5 : 9}
        rx="6"
        ry="7"
        fill="currentColor"
      />
      <path d={CORPO_FRENTE} fill="currentColor" />

      {/* Todo braço corre por FORA do tronco (x 35,5–64,5); por dentro, some. */}
      {pose === "maos-erguidas" && (
        <path d="M37 24 L31 12 L30.5 4M63 24 L69 12 L69.5 4" {...TRACO} />
      )}

      {pose === "bracos-abertos" && (
        <path d="M37 25 L27 31 L20 26M63 25 L73 31 L80 26" {...TRACO} />
      )}

      {pose === "cabeca-baixa" && (
        // Braços ao longo do corpo, levemente afastados para se destacarem
        <path d="M37 26 L33 40 L34 54M63 26 L67 40 L66 54" {...TRACO} />
      )}
    </g>
  );
}

/** Luz que desce sobre a cena. */
function Luz({ id, claro }: { id: string; claro: boolean }) {
  const cor = claro ? "#ffffff" : "var(--mepb-gold-300)";
  return (
    <radialGradient id={id} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor={cor} stopOpacity={claro ? 0.3 : 0.4} />
      <stop offset="55%" stopColor={cor} stopOpacity={claro ? 0.09 : 0.13} />
      <stop offset="100%" stopColor={cor} stopOpacity="0" />
    </radialGradient>
  );
}

/**
 * Congregação em adoração, contra a luz.
 * Duas fileiras: a de trás menor e mais apagada, criando profundidade.
 */
export function CongregacaoEmOracao({
  className,
  claro = false,
}: {
  className?: string;
  /** Silhuetas claras sobre fundo escuro. */
  claro?: boolean;
}) {
  const fundo: { x: number; e: number; pose: Pose }[] = [
    { x: 40, e: 0.74, pose: "cabeca-baixa" },
    { x: 138, e: 0.78, pose: "maos-erguidas" },
    { x: 244, e: 0.72, pose: "cabeca-baixa" },
    { x: 348, e: 0.77, pose: "bracos-abertos" },
    { x: 448, e: 0.73, pose: "maos-erguidas" },
    { x: 544, e: 0.76, pose: "cabeca-baixa" },
  ];

  const frente: { x: number; e: number; pose: Pose }[] = [
    { x: -8, e: 1.02, pose: "cabeca-baixa" },
    { x: 94, e: 1.1, pose: "maos-erguidas" },
    { x: 200, e: 1, pose: "cabeca-baixa" },
    { x: 306, e: 1.12, pose: "bracos-abertos" },
    { x: 424, e: 1.02, pose: "maos-erguidas" },
    { x: 528, e: 1.06, pose: "cabeca-baixa" },
  ];

  const tinta = claro ? "#ffffff" : "var(--mepb-navy-900)";

  return (
    <svg
      viewBox="0 0 640 280"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Ilustração: congregação reunida em oração e adoração, sob um feixe de luz."
    >
      <defs>
        <Luz id="luz-cong" claro={claro} />
        <linearGradient id="fade-cong" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="74%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="mask-cong">
          <rect width="640" height="280" fill="url(#fade-cong)" />
        </mask>
      </defs>

      {/* A elipse de luz cabe na largura da viewBox e só vaza pelo topo — é de
          lá que a luz vem. Vazando pelas laterais, a borda do SVG apareceria
          como um retângulo mais claro. */}
      <ellipse cx="320" cy="20" rx="318" ry="250" fill="url(#luz-cong)" />

      <g mask="url(#mask-cong)" color={tinta}>
        <g opacity="0.38">
          {fundo.map((f, i) => (
            <g key={`f${i}`} transform={`translate(${f.x} ${212 - 100 * f.e}) scale(${f.e})`}>
              <Figura pose={f.pose} />
            </g>
          ))}
        </g>
        <g opacity="0.94">
          {frente.map((f, i) => (
            <g key={`p${i}`} transform={`translate(${f.x} ${272 - 100 * f.e}) scale(${f.e})`}>
              <Figura pose={f.pose} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Trio em oração — versão compacta da congregação, para colunas estreitas e
 * blocos devocionais. Usa exatamente as mesmas poses da cena grande.
 */
export function TrioEmOracao({
  className,
  claro = false,
}: {
  className?: string;
  claro?: boolean;
}) {
  const figuras: { x: number; e: number; pose: Pose }[] = [
    { x: 6, e: 0.92, pose: "cabeca-baixa" },
    { x: 88, e: 1.12, pose: "maos-erguidas" },
    { x: 186, e: 0.96, pose: "cabeca-baixa" },
  ];

  const tinta = claro ? "#ffffff" : "var(--mepb-navy-900)";

  return (
    <svg
      viewBox="0 0 280 220"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Ilustração: três pessoas em oração e adoração, sob um feixe de luz."
    >
      <defs>
        <Luz id="luz-trio" claro={claro} />
        <linearGradient id="fade-trio" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="76%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="mask-trio">
          <rect width="280" height="220" fill="url(#fade-trio)" />
        </mask>
      </defs>

      <ellipse cx="140" cy="16" rx="139" ry="200" fill="url(#luz-trio)" />

      <g mask="url(#mask-trio)" color={tinta} opacity="0.94">
        {figuras.map((f, i) => (
          <g key={i} transform={`translate(${f.x} ${212 - 100 * f.e}) scale(${f.e})`}>
            <Figura pose={f.pose} />
          </g>
        ))}
      </g>
    </svg>
  );
}
