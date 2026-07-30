"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Alternador de tema claro/escuro.
 *
 * A escolha é gravada em `localStorage` e aplicada como `data-theme` no
 * `<html>` — o mesmo atributo que a camada semântica dos tokens observa.
 * A aplicação inicial acontece no script inline do `layout.tsx`, antes da
 * primeira pintura, para não haver piscada de tema.
 */
export function AlternarTema({ className }: { className?: string }) {
  const [tema, setTema] = useState<"light" | "dark">("light");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const atual = document.documentElement.getAttribute("data-theme");
    setTema(atual === "dark" ? "dark" : "light");
    setMontado(true);
  }, []);

  function alternar() {
    const novo = tema === "dark" ? "light" : "dark";
    setTema(novo);
    document.documentElement.setAttribute("data-theme", novo);
    try {
      localStorage.setItem("mepb-tema", novo);
    } catch {
      // Modo privado pode bloquear o localStorage — a troca segue valendo na sessão.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full",
        "transition-colors duration-[var(--duration-fast)] hover:bg-current/10",
        className,
      )}
      aria-label={tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {/* Antes da montagem, renderiza um ícone fixo para não divergir do servidor */}
      {montado && tema === "dark" ? (
        <Sun aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Moon aria-hidden="true" className="h-5 w-5" />
      )}
    </button>
  );
}
