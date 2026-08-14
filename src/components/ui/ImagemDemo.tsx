import type { Imagem } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Asset de demonstração do protótipo.
 *
 * O portal ainda não tem banco de imagens, então cada `Imagem` do conteúdo é
 * renderizada como um SVG gerado a partir do próprio caminho do arquivo: o hash
 * do `src` define um par de tons da paleta institucional, garantindo que a mesma
 * imagem tenha sempre a mesma aparência entre recarregamentos e entre páginas.
 *
 * Vantagens sobre um PNG cinza genérico:
 *  - nenhum arquivo binário no repositório;
 *  - funciona em exportação estática, sem servidor de imagens;
 *  - o texto alternativo real do conteúdo é preservado e exibido.
 *
 * Em produção, trocar este componente por `next/image` apontando para o CMS —
 * a assinatura (`imagem`, `className`, `proporcao`) permanece a mesma.
 */

/** Hash estável e determinístico de uma string. */
function hash(texto: string): number {
  let h = 0;
  for (let i = 0; i < texto.length; i++) {
    h = (h << 5) - h + texto.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Pares de tons institucionais usados nos gradientes dos placeholders. */
const PALETAS = [
  ["#182050", "#2e5c99"],
  ["#232a5c", "#414a85"],
  ["#27507f", "#4a85c8"],
  ["#1e4232", "#2f7d5a"],
  ["#741921", "#c8202f"],
  ["#0d1129", "#343a6c"],
];

/**
 * Só o SVG do gradiente determinístico, sem moldura nem proporção fixa —
 * para usos que precisam preencher um contêiner próprio (ex.: hero full-bleed).
 */
export function FundoDemo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const semente = hash(src);
  const [inicio, fim] = PALETAS[semente % PALETAS.length];
  const id = `grad-${semente.toString(36)}`;
  const rotacao = semente % 40;

  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={alt}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${rotacao} 0.5 0.5)`}>
          <stop offset="0%" stopColor={inicio} />
          <stop offset="100%" stopColor={fim} />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill={`url(#${id})`} />

      {/* Arcos concêntricos — textura discreta, variando com a semente */}
      <g fill="none" stroke="#fff" strokeOpacity="0.09" strokeWidth="1">
        {[40, 70, 100, 130, 160].map((r) => (
          <circle key={r} cx={40 + (semente % 240)} cy={30 + (semente % 120)} r={r} />
        ))}
      </g>

      {/* Silhueta da tocha, marca d'água do protótipo */}
      <g transform="translate(252 34) scale(0.34)" fill="#fff" fillOpacity="0.13">
        <path d="M60 6c16 20 25 36 25 50.5C85 73 74 85 60 85S35 73 35 56.5C35 42 44 26 60 6Z" />
        <path d="M42 88h36l-5 14H47l-5-14Z" />
        <path d="M52 102h16v98H52z" />
        <path d="M44 200h32v12H44z" />
      </g>
    </svg>
  );
}

export function ImagemDemo({
  imagem,
  className,
  proporcao = "16/9",
  legenda = false,
}: {
  imagem: Imagem;
  className?: string;
  /** Proporção do quadro: "16/9", "4/3", "1/1" ou "3/4". */
  proporcao?: "16/9" | "4/3" | "1/1" | "3/4";
  /** Exibe a legenda abaixo da imagem, quando o conteúdo tiver uma. */
  legenda?: boolean;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] bg-surface-sunken"
        style={{ aspectRatio: proporcao.replace("/", " / ") }}
      >
        <FundoDemo src={imagem.src} alt={imagem.alt} className="absolute inset-0" />
      </div>

      {legenda && imagem.legenda && (
        <figcaption className="mt-2 text-sm text-fg-muted">{imagem.legenda}</figcaption>
      )}
    </figure>
  );
}
