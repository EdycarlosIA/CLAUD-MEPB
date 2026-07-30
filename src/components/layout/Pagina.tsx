import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, SearchX } from "lucide-react";
import { Tocha } from "@/components/marca/Tocha";
import { cn } from "@/lib/utils";

/**
 * Blocos estruturais reutilizados por todas as páginas internas.
 * Manter esse padrão único reduz o custo cognitivo de navegar pelo portal e o
 * custo de manutenção das dezenas de rotas.
 */

/** Trilha de navegação. Sempre inicia em "Início". */
export function Trilha({
  itens,
  claro = false,
}: {
  itens: { rotulo: string; href?: string }[];
  /** Versão para fundos escuros (dentro do PageHero). */
  claro?: boolean;
}) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm", claro ? "text-white/75" : "text-fg-muted")}>
        <li>
          <Link href="/" className="rounded transition-colors hover:underline">
            Início
          </Link>
        </li>
        {itens.map((item, i) => {
          const ultimo = i === itens.length - 1;
          return (
            <li key={`${item.rotulo}-${i}`} className="flex items-center gap-1">
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />
              {item.href && !ultimo ? (
                <Link href={item.href} className="rounded transition-colors hover:underline">
                  {item.rotulo}
                </Link>
              ) : (
                <span aria-current="page" className={claro ? "text-white" : "text-fg"}>
                  {item.rotulo}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Cabeçalho padrão das páginas internas.
 * Fundo azul-marinho com a tocha em marca d'água a 6% — a mesma assinatura
 * visual usada no rodapé e nas seções de destaque.
 */
export function PageHero({
  titulo,
  subtitulo,
  trilha,
  children,
  compacto = false,
}: {
  titulo: string;
  subtitulo?: string;
  trilha?: { rotulo: string; href?: string }[];
  /** Conteúdo extra: selos, ações ou indicadores. */
  children?: ReactNode;
  compacto?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[var(--mepb-navy-900)] text-white",
        // Compensa a navbar fixa
        compacto ? "pb-12 pt-[calc(var(--nav-height)+3rem)]" : "pb-16 pt-[calc(var(--nav-height)+4rem)]",
      )}
    >
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
      <Tocha
        className="absolute -right-10 top-1/2 h-[22rem] w-auto -translate-y-1/2 text-white"
        opacidade={0.06}
      />

      <div className="container-portal relative">
        {trilha && (
          <div className="mb-6">
            <Trilha itens={trilha} claro />
          </div>
        )}

        <h1 className="max-w-3xl text-balance text-3xl font-semibold text-white md:text-4xl lg:text-[2.75rem]">
          {titulo}
        </h1>

        {subtitulo && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{subtitulo}</p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Título de seção com o fio vermelho da marca. */
export function TituloSecao({
  sobretitulo,
  titulo,
  descricao,
  centralizado = false,
  acao,
  className,
  nivel: Tag = "h2",
}: {
  sobretitulo?: string;
  titulo: string;
  descricao?: string;
  centralizado?: boolean;
  /** Link ou botão alinhado à direita do título (ex.: "Ver todas"). */
  acao?: ReactNode;
  className?: string;
  nivel?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "gap-6",
        acao ? "flex flex-col sm:flex-row sm:items-end sm:justify-between" : "block",
        centralizado && "text-center",
        className,
      )}
    >
      <div className={cn(centralizado && "mx-auto max-w-2xl")}>
        {sobretitulo && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            {sobretitulo}
          </p>
        )}
        <Tag
          className={cn(
            "rule-accent text-2xl font-semibold md:text-3xl",
            centralizado && "rule-accent-center",
          )}
        >
          {titulo}
        </Tag>
        {descricao && (
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-fg-muted">
            {descricao}
          </p>
        )}
      </div>

      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  );
}

/** Estado vazio com orientação útil — nunca apenas "nenhum resultado". */
export function EstadoVazio({
  titulo = "Nenhum resultado encontrado",
  descricao,
  acao,
}: {
  titulo?: string;
  descricao: string;
  acao?: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-bg-subtle px-6 py-16 text-center">
      <SearchX aria-hidden="true" className="mx-auto h-10 w-10 text-fg-subtle" />
      <h3 className="mt-5 text-lg font-semibold">{titulo}</h3>
      <p className="mx-auto mt-2 max-w-md text-fg-muted">{descricao}</p>
      {acao && <div className="mt-6">{acao}</div>}
    </div>
  );
}

/** Bloco de versículo usado como respiro entre seções. */
export function Versiculo({
  texto,
  referencia,
  className,
  claro = false,
}: {
  texto: string;
  referencia: string;
  className?: string;
  claro?: boolean;
}) {
  return (
    <blockquote className={cn("text-center", className)}>
      <p
        className={cn(
          "mx-auto max-w-3xl text-balance font-serif text-xl italic leading-relaxed md:text-2xl",
          claro ? "text-white" : "text-fg",
        )}
      >
        “{texto}”
      </p>
      <cite
        className={cn(
          "mt-5 block text-xs font-bold uppercase not-italic tracking-[0.16em]",
          claro ? "text-white/70" : "text-primary",
        )}
      >
        {referencia}
      </cite>
    </blockquote>
  );
}
