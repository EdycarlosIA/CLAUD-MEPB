import { cn } from "@/lib/utils";

/**
 * Tocha institucional usada como marca d'água.
 *
 * É o **único** elemento de assinatura visual do portal, conforme definido na
 * estratégia de UX: aparece a 5–8% de opacidade em heros e seções de destaque,
 * substituindo a repetição da logomarca completa.
 *
 * Puramente decorativa — `aria-hidden` para não poluir leitores de tela.
 */
export function Tocha({
  className,
  opacidade = 0.06,
}: {
  className?: string;
  opacidade?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 220"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
      style={{ opacity: opacidade }}
    >
      {/*
        Chama externa: ponta afilada, ventre largo e uma leve inclinação, para
        ler como fogo. A versão anterior, arredondada no topo, lia como bulbo.
      */}
      <path
        d="M60 4c-2 16-9 24-17 33-7.5 8.5-11 16.5-11 24.5C32 76 44 86 60 86s28-10 28-24.5c0-6.5-2.5-12.5-7.5-18-3 3.5-6.5 5-10 4 6-11 3.5-24-10.5-44Z"
        fill="currentColor"
      />
      {/* Chama interna */}
      <path
        d="M60 34c-1.5 9-5 13.5-9 18.5-3.5 4.5-5 8.5-5 12.5 0 7.5 6 13 14 13s14-5.5 14-13c0-6.5-4.5-12-14-31Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Colar da tocha */}
      <path d="M43 90h34l-4.5 13h-25L43 90Z" fill="currentColor" />
      {/* Haste, levemente afunilada */}
      <path d="M52.5 103h15l-2 94h-11l-2-94Z" fill="currentColor" opacity="0.85" />
      {/* Base */}
      <path d="M45 197h30l3 13H42l3-13Z" fill="currentColor" />
    </svg>
  );
}
