import type { ReactNode } from "react";
import { cn, milhar } from "@/lib/utils";

/**
 * Componentes da Área Administrativa.
 *
 * Os gráficos são desenhados em SVG puro, sem biblioteca de charts. Para o
 * volume de dados de um painel institucional — poucas séries, poucos pontos —
 * uma dependência de 50 a 150 KB não se justifica, e o SVG herda os tokens de
 * cor do tema automaticamente, inclusive no modo escuro.
 */

/* -------------------------------------------------------------------------- */
/* Cabeçalho de página                                                         */
/* -------------------------------------------------------------------------- */

export function CabecalhoAdmin({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">{titulo}</h1>
        {descricao && <p className="mt-2 text-fg-muted">{descricao}</p>}
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Indicador                                                                   */
/* -------------------------------------------------------------------------- */

export function Kpi({
  rotulo,
  valor,
  variacao,
  detalhe,
  Icone,
}: {
  rotulo: string;
  valor: string | number;
  /** Variação percentual: positiva sobe, negativa desce. */
  variacao?: number;
  detalhe?: string;
  Icone: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-fg-muted">{rotulo}</p>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent-subtle text-accent">
          <Icone aria-hidden className="h-[1.125rem] w-[1.125rem]" />
        </span>
      </div>

      <p data-numeric className="mt-4 font-serif text-3xl font-semibold">
        {typeof valor === "number" ? milhar(valor) : valor}
      </p>

      <div className="mt-2 flex items-center gap-2 text-xs">
        {variacao !== undefined && (
          <span
            className={cn(
              "font-semibold",
              variacao >= 0 ? "text-support" : "text-danger",
            )}
          >
            {variacao >= 0 ? "▲" : "▼"} {Math.abs(variacao)}%
          </span>
        )}
        {detalhe && <span className="text-fg-subtle">{detalhe}</span>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Painel                                                                      */
/* -------------------------------------------------------------------------- */

export function Painel({
  titulo,
  descricao,
  children,
  className,
}: {
  titulo: string;
  descricao?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-sm md:p-6",
        className,
      )}
    >
      <h2 className="font-semibold">{titulo}</h2>
      {descricao && <p className="mt-1 text-sm text-fg-muted">{descricao}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Gráfico de linha                                                            */
/* -------------------------------------------------------------------------- */

export function GraficoLinha({
  dados,
  rotuloSerie,
}: {
  dados: { rotulo: string; valor: number }[];
  rotuloSerie: string;
}) {
  const L = 640;
  const A = 220;
  // A margem direita precisa comportar metade do rótulo do último ponto,
  // que é centralizado sobre ele — com margem menor, o texto era cortado.
  const margem = { topo: 16, direita: 26, base: 30, esquerda: 40 };

  const maximo = Math.max(...dados.map((d) => d.valor));
  const minimo = Math.min(...dados.map((d) => d.valor));
  // Amplia a faixa em 10% para o traçado não encostar nas bordas
  const teto = maximo + (maximo - minimo) * 0.15 || maximo * 1.15;
  const piso = Math.max(0, minimo - (maximo - minimo) * 0.15);

  const larguraUtil = L - margem.esquerda - margem.direita;
  const alturaUtil = A - margem.topo - margem.base;

  const pontos = dados.map((d, i) => ({
    ...d,
    x: margem.esquerda + (i / (dados.length - 1)) * larguraUtil,
    y: margem.topo + alturaUtil - ((d.valor - piso) / (teto - piso)) * alturaUtil,
  }));

  const linha = pontos.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${linha} L${pontos[pontos.length - 1].x},${margem.topo + alturaUtil} L${pontos[0].x},${margem.topo + alturaUtil} Z`;

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${L} ${A}`} className="h-auto w-full" role="img"
        aria-label={`${rotuloSerie}. De ${dados[0].rotulo} a ${dados[dados.length - 1].rotulo}, variando de ${minimo} a ${maximo}.`}>
        <defs>
          <linearGradient id="grad-linha" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sem-accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--sem-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Linhas de grade e escala do eixo Y */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = margem.topo + alturaUtil * f;
          const valor = Math.round(teto - (teto - piso) * f);
          return (
            <g key={f}>
              <line
                x1={margem.esquerda}
                y1={y}
                x2={L - margem.direita}
                y2={y}
                stroke="var(--sem-border)"
                strokeWidth="1"
              />
              <text
                x={margem.esquerda - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-[var(--sem-fg-subtle)] text-[11px]"
              >
                {valor}
              </text>
            </g>
          );
        })}

        <path d={area} fill="url(#grad-linha)" />
        <path
          d={linha}
          fill="none"
          stroke="var(--sem-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {pontos.map((p) => (
          <g key={p.rotulo}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--sem-surface)" stroke="var(--sem-accent)" strokeWidth="2.5" />
            <text
              x={p.x}
              y={A - 8}
              textAnchor="middle"
              className="fill-[var(--sem-fg-subtle)] text-[11px]"
            >
              {p.rotulo}
            </text>
          </g>
        ))}
      </svg>

      {/* Tabela equivalente para leitores de tela */}
      <figcaption className="sr-only">
        <table>
          <caption>{rotuloSerie}</caption>
          <tbody>
            {dados.map((d) => (
              <tr key={d.rotulo}>
                <th scope="row">{d.rotulo}</th>
                <td>{d.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Gráfico de barras horizontais                                               */
/* -------------------------------------------------------------------------- */

export function GraficoBarras({
  dados,
  rotuloSerie,
}: {
  dados: { rotulo: string; valor: number }[];
  rotuloSerie: string;
}) {
  const maximo = Math.max(...dados.map((d) => d.valor));

  return (
    <figure className="m-0">
      <ul className="space-y-4" aria-label={rotuloSerie}>
        {dados.map((d) => (
          <li key={d.rotulo}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{d.rotulo}</span>
              <span data-numeric className="text-fg-muted">
                {milhar(d.valor)}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-bg-muted">
              <div
                className="h-full rounded-full bg-[var(--sem-accent)] transition-[width] duration-700 ease-[var(--ease-out-soft)]"
                style={{ width: `${(d.valor / maximo) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Tabela                                                                      */
/* -------------------------------------------------------------------------- */

export function Tabela({
  colunas,
  linhas,
  vazio = "Nenhum registro encontrado.",
  larguraMinima = "32rem",
}: {
  colunas: { chave: string; rotulo: string; alinhamento?: "esquerda" | "direita" }[];
  linhas: Record<string, ReactNode>[];
  vazio?: string;
  /** Largura mínima antes de a tabela rolar horizontalmente dentro do painel. */
  larguraMinima?: string;
}) {
  if (linhas.length === 0) {
    return (
      <p className="rounded-[var(--radius-lg)] border border-dashed border-line-strong px-6 py-12 text-center text-fg-muted">
        {vazio}
      </p>
    );
  }

  return (
    // O contêiner rola horizontalmente para que a página nunca role
    <div className="scrollbar-slim -mx-5 overflow-x-auto md:mx-0">
      <table className="w-full border-collapse text-sm" style={{ minWidth: larguraMinima }}>
        <thead>
          <tr className="border-b border-line">
            {colunas.map((coluna) => (
              <th
                key={coluna.chave}
                scope="col"
                className={cn(
                  "px-5 py-3 text-xs font-bold uppercase tracking-wider text-fg-subtle",
                  coluna.alinhamento === "direita" ? "text-right" : "text-left",
                )}
              >
                {coluna.rotulo}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {linhas.map((linha, i) => (
            <tr
              key={i}
              className="border-b border-line transition-colors last:border-0 hover:bg-bg-subtle"
            >
              {colunas.map((coluna) => (
                <td
                  key={coluna.chave}
                  className={cn(
                    "px-5 py-3.5 align-middle",
                    coluna.alinhamento === "direita" ? "text-right" : "text-left",
                  )}
                >
                  {linha[coluna.chave]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Aviso do protótipo                                                          */
/* -------------------------------------------------------------------------- */

export function AvisoPrototipo({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 rounded-[var(--radius-md)] border border-line bg-accent-subtle px-5 py-3.5 text-sm leading-relaxed text-fg-muted">
      {children}
    </p>
  );
}
