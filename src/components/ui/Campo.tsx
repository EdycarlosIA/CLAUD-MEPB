import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Campos de formulário do portal.
 *
 * Regras aplicadas em todos eles, conforme as diretrizes de acessibilidade:
 *  - o `<label>` é sempre visível — placeholder nunca substitui rótulo;
 *  - a mensagem de erro fica imediatamente abaixo do campo, ligada por
 *    `aria-describedby`, com `aria-invalid` no controle;
 *  - a altura mínima respeita o alvo de toque de 44px.
 */

function Rotulo({
  htmlFor,
  children,
  obrigatorio,
}: {
  htmlFor: string;
  children: ReactNode;
  obrigatorio?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-fg">
      {children}
      {obrigatorio && (
        <span className="ml-1 text-primary" aria-hidden="true">
          *
        </span>
      )}
      {obrigatorio && <span className="sr-only"> (obrigatório)</span>}
    </label>
  );
}

function Auxiliar({ id, erro, ajuda }: { id: string; erro?: string; ajuda?: string }) {
  if (erro) {
    return (
      <p id={`${id}-erro`} className="mt-2 text-sm font-medium text-danger" role="alert">
        {erro}
      </p>
    );
  }
  if (ajuda) {
    return (
      <p id={`${id}-ajuda`} className="mt-2 text-sm text-fg-muted">
        {ajuda}
      </p>
    );
  }
  return null;
}

const CONTROLE = cn(
  "w-full rounded-[var(--field-radius)] border bg-[var(--field-bg)] text-[var(--field-fg)]",
  "px-4 text-[0.9375rem] placeholder:text-[var(--field-placeholder)]",
  "transition-colors duration-[var(--duration-fast)]",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

interface Base {
  id: string;
  rotulo: string;
  erro?: string;
  ajuda?: string;
  obrigatorio?: boolean;
  className?: string;
}

export function CampoTexto({
  id,
  rotulo,
  erro,
  ajuda,
  obrigatorio,
  className,
  ...props
}: Base & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <div className={className}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {rotulo}
      </Rotulo>
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : ajuda ? `${id}-ajuda` : undefined}
        aria-required={obrigatorio || undefined}
        className={cn(
          CONTROLE,
          "min-h-[var(--field-height)]",
          erro ? "border-danger" : "border-[var(--field-border)]",
        )}
        {...props}
      />
      <Auxiliar id={id} erro={erro} ajuda={ajuda} />
    </div>
  );
}

export function CampoTextarea({
  id,
  rotulo,
  erro,
  ajuda,
  obrigatorio,
  className,
  ...props
}: Base & Omit<ComponentProps<"textarea">, "id" | "className">) {
  return (
    <div className={className}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {rotulo}
      </Rotulo>
      <textarea
        id={id}
        rows={5}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : ajuda ? `${id}-ajuda` : undefined}
        aria-required={obrigatorio || undefined}
        className={cn(
          CONTROLE,
          "resize-y py-3 leading-relaxed",
          erro ? "border-danger" : "border-[var(--field-border)]",
        )}
        {...props}
      />
      <Auxiliar id={id} erro={erro} ajuda={ajuda} />
    </div>
  );
}

export function CampoSelect({
  id,
  rotulo,
  erro,
  ajuda,
  obrigatorio,
  className,
  children,
  ...props
}: Base & Omit<ComponentProps<"select">, "id" | "className">) {
  return (
    <div className={className}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {rotulo}
      </Rotulo>
      <div className="relative">
        <select
          id={id}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : ajuda ? `${id}-ajuda` : undefined}
          aria-required={obrigatorio || undefined}
          className={cn(
            CONTROLE,
            "min-h-[var(--field-height)] cursor-pointer appearance-none pr-11",
            erro ? "border-danger" : "border-[var(--field-border)]",
          )}
          {...props}
        >
          {children}
        </select>
        {/* Seta desenhada, já que `appearance-none` remove a nativa */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-current text-fg-muted"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </div>
      <Auxiliar id={id} erro={erro} ajuda={ajuda} />
    </div>
  );
}

/** Caixa de seleção com rótulo à direita e área de clique adequada. */
export function CampoCheckbox({
  id,
  rotulo,
  erro,
  className,
  ...props
}: Omit<Base, "ajuda"> & Omit<ComponentProps<"input">, "id" | "className" | "type">) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-[var(--field-border)] accent-[var(--sem-primary)]"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-fg-muted">
          {rotulo}
        </label>
      </div>
      <Auxiliar id={id} erro={erro} />
    </div>
  );
}
