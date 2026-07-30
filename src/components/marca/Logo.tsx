import { cn } from "@/lib/utils";

/**
 * Logomarca da MEPB — releitura vetorial do símbolo oficial.
 *
 * Reúne, de forma sintética, os três elementos da identidade: o mapa (círculo do
 * globo), a Bíblia aberta (base) e a tocha (chama central). Desenhada em traço
 * simples para permanecer legível a 24px na navbar.
 *
 * Em produção, substituir pelo arquivo vetorial oficial mantendo a mesma API.
 */
export function Logo({
  className,
  variante = "completa",
  invertida = false,
}: {
  className?: string;
  /** `completa` inclui o nome ao lado do símbolo; `simbolo` traz só o brasão. */
  variante?: "completa" | "simbolo";
  /** Versão para fundos escuros. */
  invertida?: boolean;
}) {
  /*
    Fora do modo invertido, a logo lê tokens **semânticos** — não primitivas.
    Com as primitivas fixas, o texto ficava azul-marinho sobre o fundo escuro
    do tema noturno, reprovando no contraste.
    `invertida` continua forçando branco, para uso sobre imagens escuras.
  */
  const azul = invertida ? "#ffffff" : "var(--sem-fg)";
  const vermelho = invertida ? "#f0a5a9" : "var(--sem-primary)";
  const verde = invertida ? "rgba(255,255,255,0.55)" : "var(--mepb-green-300)";
  const textoSecundario = invertida ? "rgba(255,255,255,0.72)" : "var(--sem-accent)";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0"
        role="img"
        aria-label="Símbolo da Missão Evangélica Pentecostal do Brasil"
      >
        {/* Globo — remete ao mapa do símbolo oficial e ao alcance mundial */}
        <circle cx="24" cy="21" r="15" fill="none" stroke={azul} strokeWidth="1.6" />
        <ellipse cx="24" cy="21" rx="6.4" ry="15" fill="none" stroke={azul} strokeWidth="1.1" opacity="0.5" />
        <path d="M9.4 16.4h29.2M9.4 25.6h29.2" stroke={azul} strokeWidth="1.1" opacity="0.5" />

        {/* Massa continental estilizada, em verde de apoio */}
        <path
          d="M20.5 12.5c2.6-.6 4.9.4 5.6 2.2.7 1.9-.6 3-2.3 3.6-1.8.6-2.4 1.6-2 3.2.5 1.9 2.3 2.4 3.6 3.9 1.2 1.4.9 3.4-.8 4.6-1.9 1.3-4.6.9-6.1-.8-1.8-2-2.2-5.1-1.3-8 .7-2.4 1.6-4.2 3.3-8.7Z"
          fill={verde}
          opacity={invertida ? 0.5 : 0.85}
        />

        {/* Tocha — chama e haste, elemento de assinatura da marca */}
        <path
          d="M24 4.2c1.9 2.3 2.9 4.2 2.9 5.9 0 1.8-1.3 3.1-2.9 3.1s-2.9-1.3-2.9-3.1c0-1.7 1-3.6 2.9-5.9Z"
          fill={vermelho}
        />
        <path d="M24 13.2v6.6" stroke={vermelho} strokeWidth="1.7" strokeLinecap="round" />

        {/* Bíblia aberta — base do símbolo */}
        <path
          d="M6.5 38.2c4.6-2.1 11.3-2.1 17.5.9 6.2-3 12.9-3 17.5-.9v3.6c-4.6-2.1-11.3-2.1-17.5.9-6.2-3-12.9-3-17.5-.9v-3.6Z"
          fill={azul}
        />
        {/* Vinco central da Bíblia — acompanha o fundo para permanecer visível
            tanto no tema claro quanto no escuro. */}
        <path d="M24 39.1v3.6" stroke={invertida ? "var(--mepb-navy-900)" : "var(--sem-bg)"} strokeWidth="1" />
      </svg>

      {variante === "completa" && (
        <span className="flex flex-col leading-none">
          <span
            className="font-serif text-xl font-semibold tracking-tight"
            style={{ color: azul }}
          >
            MEPB
          </span>
          <span
            className="mt-1 text-[0.6875rem] font-medium leading-tight tracking-wide"
            style={{ color: textoSecundario }}
          >
            Missão Evangélica
            <br />
            Pentecostal do Brasil
          </span>
        </span>
      )}
    </span>
  );
}
