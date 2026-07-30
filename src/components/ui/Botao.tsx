import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botão do design system.
 *
 * Consome exclusivamente tokens de componente (`--btn-*`), nunca primitivas.
 * A altura mínima de 44px (`--tap-target`) é aplicada em todas as variantes —
 * requisito de alvo de toque do WCAG 2.2 AA.
 */

type Variante = "primario" | "secundario" | "contorno" | "fantasma" | "claro";
type Tamanho = "sm" | "md" | "lg";

const VARIANTES: Record<Variante, string> = {
  primario:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] hover:bg-[var(--btn-primary-bg-hover)] shadow-sm hover:shadow-md",
  secundario:
    "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-fg)] hover:opacity-90 shadow-sm",
  contorno:
    "border border-[var(--btn-outline-border)] text-[var(--btn-outline-fg)] bg-transparent hover:bg-bg-muted",
  fantasma: "text-fg bg-transparent hover:bg-bg-muted",
  // Para uso sobre imagens escuras (hero)
  claro: "bg-white/95 text-[var(--mepb-navy-900)] hover:bg-white shadow-md",
};

const TAMANHOS: Record<Tamanho, string> = {
  sm: "min-h-11 px-4 text-sm gap-1.5",
  md: "min-h-11 px-6 text-[0.9375rem] gap-2",
  lg: "min-h-[3.25rem] px-8 text-base gap-2.5",
};

const BASE = cn(
  "inline-flex items-center justify-center rounded-[var(--btn-radius)] font-semibold",
  "transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)]",
  "disabled:pointer-events-none disabled:opacity-50",
  "whitespace-nowrap",
);

interface Comum {
  variante?: Variante;
  tamanho?: Tamanho;
  larguraTotal?: boolean;
  children: ReactNode;
  className?: string;
}

/** Renderiza `<Link>` quando recebe `href`, `<button>` caso contrário. */
export function Botao({
  variante = "primario",
  tamanho = "md",
  larguraTotal,
  className,
  children,
  ...props
}: Comum & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button
      className={cn(BASE, VARIANTES[variante], TAMANHOS[tamanho], larguraTotal && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function BotaoLink({
  variante = "primario",
  tamanho = "md",
  larguraTotal,
  className,
  children,
  href,
  ...props
}: Comum & { href: string } & Omit<ComponentProps<typeof Link>, "children" | "className" | "href">) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTES[variante], TAMANHOS[tamanho], larguraTotal && "w-full", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
