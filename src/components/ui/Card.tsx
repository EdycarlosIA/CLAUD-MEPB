import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cartão base do portal. Consome os tokens `--card-*`.
 *
 * `href` transforma o cartão inteiro em área clicável mantendo um único link no
 * DOM — evita o padrão de "link aninhado" que confunde leitores de tela.
 */
export function Card({
  children,
  className,
  href,
  interativo = false,
  as: Componente = "div",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  /** Aplica elevação e deslocamento no hover. Implícito quando há `href`. */
  interativo?: boolean;
  as?: "div" | "article" | "li";
}) {
  const classes = cn(
    "relative rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--card-bg)]",
    "shadow-[var(--card-shadow)]",
    (interativo || href) &&
      cn(
        "transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)] hover:border-line-strong",
        "focus-within:-translate-y-1 focus-within:shadow-[var(--card-shadow-hover)]",
      ),
    className,
  );

  if (href) {
    return (
      <Componente className={cn(classes, "group")}>
        {children}
        {/* Camada de clique que cobre o cartão sem aninhar links */}
        <Link href={href} className="absolute inset-0 rounded-[var(--card-radius)]">
          <span className="sr-only">Abrir</span>
        </Link>
      </Componente>
    );
  }

  return <Componente className={classes}>{children}</Componente>;
}

/** Conteúdo interno com o respiro padrão do cartão. */
export function CardCorpo({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-[var(--card-padding)]", className)}>{children}</div>;
}
