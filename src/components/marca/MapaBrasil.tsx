"use client";

import type { UF } from "@/content/types";
import { NOMES_UF } from "@/content/igrejas";
import { cn } from "@/lib/utils";

/**
 * Mapa do Brasil em cartograma de blocos (tile grid map).
 *
 * Por que blocos e não o contorno geográfico:
 *  - Estados pequenos do Nordeste — justamente onde a MEPB é mais forte — ficam
 *    grandes o suficiente para receber toque de 44px no celular.
 *  - Cada estado é um `<button>` real: navegável por Tab, acionável por Enter,
 *    com nome acessível completo. Um mapa em `<path>` exigiria toda uma camada
 *    de acessibilidade paralela.
 *  - O SVG pesa poucos KB, contra centenas de KB de um contorno vetorizado.
 *
 * A leitura geográfica é preservada: a posição relativa de cada bloco respeita a
 * disposição real dos estados no território.
 */

/** Posição de cada UF na grade — [coluna, linha], ambas 1-indexadas. */
const GRADE: Record<UF, [number, number]> = {
  RR: [3, 1], AP: [4, 1],
  AM: [2, 2], PA: [3, 2], MA: [4, 2], CE: [5, 2], RN: [6, 2],
  AC: [1, 3], RO: [2, 3], TO: [4, 3], PI: [5, 3], PB: [6, 3],
  MT: [3, 4], GO: [4, 4], DF: [5, 4], BA: [6, 4], PE: [7, 4],
  MS: [3, 5], MG: [5, 5], ES: [6, 5], AL: [7, 5],
  SP: [4, 6], RJ: [5, 6], SE: [7, 6],
  PR: [4, 7],
  SC: [4, 8],
  RS: [4, 9],
};

const COLUNAS = 7;
const LINHAS = 9;
const LADO = 40;   // aresta do bloco
const VAO = 6;     // respiro entre blocos

export function MapaBrasil({
  ufsAtivas,
  ufSelecionada,
  onSelecionar,
  contagemPorUF = {},
  className,
}: {
  /** Estados com presença da MEPB — os demais aparecem apagados e inativos. */
  ufsAtivas: UF[];
  ufSelecionada?: UF | "";
  onSelecionar?: (uf: UF | "") => void;
  /** Número de igrejas por estado, exibido no title do bloco. */
  contagemPorUF?: Partial<Record<UF, number>>;
  className?: string;
}) {
  const largura = COLUNAS * (LADO + VAO) - VAO;
  const altura = LINHAS * (LADO + VAO) - VAO;

  return (
    <svg
      viewBox={`0 0 ${largura} ${altura}`}
      className={cn("h-auto w-full", className)}
      role="group"
      aria-label="Mapa do Brasil por estado. Selecione um estado para filtrar as igrejas."
    >
      {(Object.keys(GRADE) as UF[]).map((uf) => {
        const [col, linha] = GRADE[uf];
        const x = (col - 1) * (LADO + VAO);
        const y = (linha - 1) * (LADO + VAO);

        const ativa = ufsAtivas.includes(uf);
        const selecionada = ufSelecionada === uf;
        const quantidade = contagemPorUF[uf] ?? 0;

        const rotulo = ativa
          ? `${NOMES_UF[uf]} — ${quantidade} ${quantidade === 1 ? "igreja" : "igrejas"}`
          : `${NOMES_UF[uf]} — sem igreja cadastrada`;

        return (
          <g key={uf}>
            <rect
              x={x}
              y={y}
              width={LADO}
              height={LADO}
              rx={8}
              className={cn(
                "transition-colors duration-200",
                selecionada
                  ? "fill-[var(--mepb-red-600)]"
                  : ativa
                    ? "fill-[var(--mepb-navy-900)] hover:fill-[var(--mepb-blue-600)]"
                    : "fill-[var(--sem-bg-muted)]",
              )}
              stroke={selecionada ? "var(--mepb-red-800)" : "transparent"}
              strokeWidth="2"
            />
            <text
              x={x + LADO / 2}
              y={y + LADO / 2}
              textAnchor="middle"
              dominantBaseline="central"
              className={cn(
                "pointer-events-none text-[13px] font-semibold",
                ativa || selecionada
                  ? "fill-white"
                  : "fill-[var(--sem-fg-subtle)]",
              )}
            >
              {uf}
            </text>

            {/* Botão transparente sobreposto: dá o comportamento acessível ao bloco. */}
            {ativa && onSelecionar && (
              <foreignObject x={x} y={y} width={LADO} height={LADO}>
                <button
                  type="button"
                  onClick={() => onSelecionar(selecionada ? "" : uf)}
                  aria-pressed={selecionada}
                  title={rotulo}
                  className="h-full w-full cursor-pointer rounded-lg bg-transparent"
                >
                  <span className="sr-only">{rotulo}</span>
                </button>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
  );
}
