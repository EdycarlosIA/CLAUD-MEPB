import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Etiqueta compacta para categoria, status ou tipo de conteúdo. */

type Tom = "neutro" | "primario" | "azul" | "verde" | "escuro" | "claro";

const TONS: Record<Tom, string> = {
  neutro: "bg-bg-muted text-fg-muted",
  primario: "bg-primary-subtle text-primary",
  azul: "bg-accent-subtle text-accent",
  verde: "bg-support-subtle text-support",
  escuro: "bg-[var(--mepb-navy-900)] text-white",
  claro: "bg-white/15 text-white backdrop-blur-sm",
};

export function Selo({
  children,
  tom = "neutro",
  className,
}: {
  children: ReactNode;
  tom?: Tom;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-xs font-semibold uppercase tracking-wider",
        TONS[tom],
        className,
      )}
    >
      {children}
    </span>
  );
}
