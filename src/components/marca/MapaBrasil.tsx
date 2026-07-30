"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { UF } from "@/content/types";
import { NOMES_UF } from "@/content/igrejas";
import { CONTORNOS, MAPA_VIEWBOX } from "./contornos-brasil";
import { cn } from "@/lib/utils";

/**
 * Mapa do Brasil com os contornos geográficos reais dos 27 estados.
 *
 * Acessibilidade de um mapa em `<path>`: como as formas são irregulares, cada
 * estado é o próprio elemento focável (`tabIndex`, `role="button"`,
 * Enter/Espaço), em vez de um botão sobreposto. A lista de resultados ao lado do
 * mapa cumpre a mesma função para quem não usa apontador, e o `aria-live`
 * anuncia a mudança de seleção.
 *
 * As animações usam Framer Motion porque envolvem estados sobrepostos (realce,
 * elevação e tooltip com entrada e saída) que o CSS resolveria mal.
 */
export function MapaBrasil({
  ufsAtivas,
  ufSelecionada,
  onSelecionar,
  contagemPorUF = {},
  className,
  mostrarSiglas = true,
}: {
  /** Estados com presença da MEPB — os demais ficam apagados e inativos. */
  ufsAtivas: UF[];
  ufSelecionada?: UF | "";
  onSelecionar?: (uf: UF | "") => void;
  contagemPorUF?: Partial<Record<UF, number>>;
  className?: string;
  /** Exibe a sigla sobre os estados com igreja cadastrada. */
  mostrarSiglas?: boolean;
}) {
  const [sobre, setSobre] = useState<UF | null>(null);
  const movimentoReduzido = useReducedMotion();

  const ufs = Object.keys(CONTORNOS) as UF[];
  const destacada = sobre ?? (ufSelecionada || null);
  const infoDestacada = destacada ? CONTORNOS[destacada] : null;

  function acionar(uf: UF) {
    if (!onSelecionar) return;
    onSelecionar(ufSelecionada === uf ? "" : uf);
  }

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${MAPA_VIEWBOX.largura} ${MAPA_VIEWBOX.altura}`}
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label="Mapa do Brasil. Selecione um estado para filtrar as igrejas."
      >
        <defs>
          {/* Elevação suave do estado em destaque */}
          <filter id="mapa-elevacao" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#182050" floodOpacity="0.28" />
          </filter>
        </defs>

        {ufs.map((uf) => {
          const ativa = ufsAtivas.includes(uf);
          const selecionada = ufSelecionada === uf;
          const emFoco = destacada === uf;
          const quantidade = contagemPorUF[uf] ?? 0;
          const { d, c } = CONTORNOS[uf];

          const rotulo = ativa
            ? `${NOMES_UF[uf]}: ${quantidade} ${quantidade === 1 ? "igreja" : "igrejas"}`
            : `${NOMES_UF[uf]}: sem igreja cadastrada`;

          return (
            <motion.path
              key={uf}
              d={d}
              // O estado em destaque sobe na ordem de pintura para a elevação aparecer
              style={{
                transformOrigin: `${c[0]}px ${c[1]}px`,
                transformBox: "view-box",
                cursor: ativa && onSelecionar ? "pointer" : "default",
              }}
              animate={{
                scale: emFoco && ativa && !movimentoReduzido ? 1.035 : 1,
                fill: selecionada
                  ? "var(--mepb-red-600)"
                  : emFoco && ativa
                    ? "var(--mepb-blue-600)"
                    : ativa
                      ? "var(--mepb-navy-900)"
                      : "var(--sem-bg-muted)",
              }}
              transition={{ duration: movimentoReduzido ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              stroke="var(--sem-bg)"
              strokeWidth={selecionada || emFoco ? 3 : 1.6}
              strokeLinejoin="round"
              filter={emFoco && ativa ? "url(#mapa-elevacao)" : undefined}
              // Só os estados com igreja participam da navegação por teclado
              tabIndex={ativa && onSelecionar ? 0 : undefined}
              role={ativa && onSelecionar ? "button" : undefined}
              aria-pressed={ativa && onSelecionar ? selecionada : undefined}
              aria-label={ativa && onSelecionar ? rotulo : undefined}
              onMouseEnter={() => ativa && setSobre(uf)}
              onMouseLeave={() => setSobre(null)}
              onFocus={() => ativa && setSobre(uf)}
              onBlur={() => setSobre(null)}
              onClick={() => ativa && acionar(uf)}
              onKeyDown={(e) => {
                if (!ativa) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  acionar(uf);
                }
              }}
            >
              {/* Fallback para navegadores que exibem o title nativo do SVG */}
              <title>{rotulo}</title>
            </motion.path>
          );
        })}

        {/* Siglas dos estados com presença */}
        {mostrarSiglas &&
          ufs
            .filter((uf) => ufsAtivas.includes(uf))
            .map((uf) => {
              const { c } = CONTORNOS[uf];
              const emFoco = destacada === uf;
              return (
                <motion.text
                  key={`s-${uf}`}
                  x={c[0]}
                  y={c[1]}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none fill-white font-semibold"
                  animate={{ fontSize: emFoco ? 44 : 34, opacity: emFoco ? 1 : 0.82 }}
                  transition={{ duration: movimentoReduzido ? 0 : 0.2 }}
                >
                  {uf}
                </motion.text>
              );
            })}
      </svg>

      {/* Tooltip — segue o centroide do estado em destaque */}
      <AnimatePresence>
        {destacada && infoDestacada && ufsAtivas.includes(destacada) && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: movimentoReduzido ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-[var(--radius-md)] bg-[var(--mepb-navy-950)] px-3.5 py-2 shadow-lg"
            style={{
              left: `${(infoDestacada.c[0] / MAPA_VIEWBOX.largura) * 100}%`,
              top: `${(infoDestacada.c[1] / MAPA_VIEWBOX.altura) * 100 - 3}%`,
            }}
          >
            <p className="whitespace-nowrap text-sm font-semibold text-white">
              {NOMES_UF[destacada]}
            </p>
            <p className="whitespace-nowrap text-xs text-white/70">
              {(contagemPorUF[destacada] ?? 0) === 1
                ? "1 igreja cadastrada"
                : `${contagemPorUF[destacada] ?? 0} igrejas cadastradas`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
