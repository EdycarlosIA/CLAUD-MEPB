"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Acordeão acessível.
 *
 * Usa `<button>` real com `aria-expanded` e `aria-controls`, em vez de
 * `<details>`, para manter controle total sobre a animação e permitir o modo
 * "apenas um aberto por vez" nas páginas de FAQ.
 */
export function Acordeao({
  itens,
  unico = false,
  className,
}: {
  itens: { titulo: string; conteudo: ReactNode }[];
  /** Mantém no máximo um item aberto por vez. */
  unico?: boolean;
  className?: string;
}) {
  const [abertos, setAbertos] = useState<number[]>([]);

  function alternar(indice: number) {
    setAbertos((atual) => {
      if (atual.includes(indice)) return atual.filter((i) => i !== indice);
      return unico ? [indice] : [...atual, indice];
    });
  }

  return (
    <div className={cn("divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface", className)}>
      {itens.map((item, i) => {
        const aberto = abertos.includes(i);
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => alternar(i)}
                aria-expanded={aberto}
                aria-controls={`acordeao-painel-${i}`}
                id={`acordeao-botao-${i}`}
                className={cn(
                  "flex min-h-[var(--tap-target)] w-full items-center justify-between gap-4",
                  "px-5 py-4 text-left font-semibold text-fg",
                  "transition-colors duration-[var(--duration-fast)] hover:bg-bg-subtle",
                )}
              >
                <span>{item.titulo}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-fg-muted transition-transform duration-[var(--duration-base)]",
                    aberto && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={`acordeao-painel-${i}`}
              role="region"
              aria-labelledby={`acordeao-botao-${i}`}
              hidden={!aberto}
              className="px-5 pb-5 text-fg-muted"
            >
              {item.conteudo}
            </div>
          </div>
        );
      })}
    </div>
  );
}
