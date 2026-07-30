"use client";

import { useState } from "react";
import type { CampoMissionario } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Diagrama dos campos missionários da MEPB.
 *
 * É deliberadamente um **diagrama**, não um mapa geográfico: uma malha de
 * meridianos e paralelos (projeção equiretangular) sobre a qual os campos são
 * posicionados por latitude/longitude aproximadas. A escolha evita exibir um
 * contorno costeiro impreciso e mantém o arquivo em poucos KB.
 *
 * Cada marcador é um botão acessível; a lista de campos ao lado do diagrama
 * cumpre o mesmo papel para quem navega por leitor de tela.
 */
export function MapaMundi({
  campos,
  className,
}: {
  campos: CampoMissionario[];
  className?: string;
}) {
  const [ativo, setAtivo] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 1000 500"
        className="h-auto w-full"
        role="img"
        aria-label={`Diagrama dos campos missionários da MEPB em ${campos.length} países.`}
      >
        {/* Moldura */}
        <rect
          x="0.5"
          y="0.5"
          width="999"
          height="499"
          rx="12"
          fill="none"
          stroke="rgb(255 255 255 / 0.14)"
        />

        {/* Meridianos a cada 30° de longitude */}
        {Array.from({ length: 11 }, (_, i) => (i + 1) * (1000 / 12)).map((x) => (
          <line
            key={`m${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="500"
            stroke="rgb(255 255 255 / 0.07)"
            strokeWidth="1"
          />
        ))}

        {/* Paralelos a cada 30° de latitude */}
        {Array.from({ length: 5 }, (_, i) => (i + 1) * (500 / 6)).map((y) => (
          <line
            key={`p${y}`}
            x1="0"
            y1={y}
            x2="1000"
            y2={y}
            stroke="rgb(255 255 255 / 0.07)"
            strokeWidth="1"
          />
        ))}

        {/* Linha do Equador, um pouco mais evidente */}
        <line x1="0" y1="250" x2="1000" y2="250" stroke="rgb(255 255 255 / 0.2)" strokeWidth="1.5" />

        {/* Marcadores dos campos */}
        {campos.map((campo) => {
          const cx = (campo.x / 100) * 1000;
          const cy = (campo.y / 100) * 500;
          const destacado = ativo === campo.pais;
          const raio = 6 + Math.min(campo.missionarios, 14) * 0.55;

          return (
            <g key={campo.pais}>
              {/* Halo */}
              <circle
                cx={cx}
                cy={cy}
                r={raio + 8}
                fill="var(--mepb-red-600)"
                opacity={destacado ? 0.3 : 0.14}
                className="transition-opacity duration-300"
              />
              <circle
                cx={cx}
                cy={cy}
                r={raio}
                fill="var(--mepb-red-600)"
                stroke="#fff"
                strokeWidth={destacado ? 2.5 : 1.5}
                className="transition-all duration-200"
              />

              {/* Rótulo aparece ao focar ou passar o mouse */}
              {destacado && (
                <text
                  x={cx}
                  y={cy - raio - 14}
                  textAnchor="middle"
                  className="fill-white text-[15px] font-semibold"
                >
                  {campo.pais}
                </text>
              )}

              <foreignObject x={cx - raio - 10} y={cy - raio - 10} width={(raio + 10) * 2} height={(raio + 10) * 2}>
                <button
                  type="button"
                  className="h-full w-full rounded-full bg-transparent"
                  onMouseEnter={() => setAtivo(campo.pais)}
                  onMouseLeave={() => setAtivo(null)}
                  onFocus={() => setAtivo(campo.pais)}
                  onBlur={() => setAtivo(null)}
                >
                  <span className="sr-only">
                    {campo.pais}, {campo.continente} — {campo.missionarios} missionários desde {campo.desde}
                  </span>
                </button>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
