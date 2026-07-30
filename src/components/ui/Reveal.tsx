"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aparecimento suave ao entrar na viewport.
 *
 * Usa IntersectionObserver em vez do Framer Motion para as animações de entrada
 * de seção — são dezenas por página e não justificam o custo de JavaScript de
 * uma biblioteca de animação. O Framer Motion fica reservado para as interações
 * que realmente precisam dele (menus, drawer, transições de filtro).
 *
 * A supressão por `prefers-reduced-motion` está na regra global do `globals.css`.
 */
export function Reveal({
  children,
  atraso = 0,
  className,
  as: Componente = "div",
}: {
  children: ReactNode;
  /** Atraso em milissegundos, para escalonar itens de uma mesma grade. */
  atraso?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    // Sem suporte a IntersectionObserver, o conteúdo simplesmente aparece.
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <Componente
      ref={ref as never}
      className={cn("reveal", className)}
      data-visible={visivel ? "true" : "false"}
      style={{ transitionDelay: `${atraso}ms` }}
    >
      {children}
    </Componente>
  );
}
