"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3, CalendarDays, Church, Globe2, Image as ImageIcon,
  LogOut, Menu, Newspaper, ShieldCheck, UserRound, X,
} from "lucide-react";
import { Logo } from "@/components/marca/Logo";
import { AlternarTema } from "@/components/layout/AlternarTema";
import { cn } from "@/lib/utils";

/**
 * Chrome da Área Administrativa: barra lateral fixa + topo.
 *
 * Visualmente distinto do portal público de propósito — a mudança de contexto
 * precisa ser imediata. No mobile, a lateral vira drawer.
 */

const MENU = [
  { rotulo: "Dashboard", href: "/admin", Icone: BarChart3 },
  { rotulo: "Igrejas", href: "/admin/igrejas", Icone: Church },
  { rotulo: "Pastores", href: "/admin/pastores", Icone: UserRound },
  { rotulo: "Eventos", href: "/admin/eventos", Icone: CalendarDays },
  { rotulo: "Notícias", href: "/admin/noticias", Icone: Newspaper },
  { rotulo: "Missionários", href: "/admin/missionarios", Icone: Globe2 },
  { rotulo: "Mídia", href: "/admin/midia", Icone: ImageIcon },
  { rotulo: "Permissões", href: "/admin/permissoes", Icone: ShieldCheck },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const caminho = usePathname();
  const [drawer, setDrawer] = useState(false);

  /** O Dashboard só está ativo na rota exata; os demais aceitam subrotas. */
  function ativo(href: string) {
    return href === "/admin" ? caminho === "/admin" : caminho.startsWith(href);
  }

  const navegacao = (
    <nav aria-label="Navegação da área administrativa" className="flex-1 px-3 py-4">
      <ul className="space-y-1">
        {MENU.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setDrawer(false)}
              aria-current={ativo(item.href) ? "page" : undefined}
              className={cn(
                "flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] px-3.5 text-sm font-medium transition-colors",
                ativo(item.href)
                  ? "bg-white/15 text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white",
              )}
            >
              <item.Icone aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
              {item.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const rodapeLateral = (
    <div className="border-t border-white/10 p-3">
      <Link
        href="/"
        className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] px-3.5 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
      >
        <LogOut aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
        Voltar ao portal
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-bg-subtle">
      {/* Lateral fixa — telas grandes */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-[var(--mepb-navy-900)] lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
          <Logo variante="simbolo" invertida />
          <span className="ml-2.5 text-sm font-bold uppercase tracking-wider text-white/85">
            Painel
          </span>
        </div>
        {navegacao}
        {rodapeLateral}
      </aside>

      {/* Drawer — telas pequenas */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawer(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu do painel administrativo"
            className="absolute inset-y-0 left-0 flex w-64 flex-col bg-[var(--mepb-navy-900)]"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
              <Logo variante="simbolo" invertida />
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Fechar menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
                autoFocus
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            {navegacao}
            {rodapeLateral}
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-60">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-surface/95 px-4 backdrop-blur-md md:px-6">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Abrir menu do painel"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg hover:bg-bg-muted lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>

          <p className="flex-1 truncate text-sm font-semibold">
            Área Administrativa
            <span className="ml-2 hidden font-normal text-fg-subtle sm:inline">
              Missão Evangélica Pentecostal do Brasil
            </span>
          </p>

          <AlternarTema className="text-fg-muted" />

          <div className="flex items-center gap-3 border-l border-line pl-3">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mepb-navy-900)] text-xs font-bold text-white"
            >
              JA
            </span>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-tight">Pr. José Azemar</p>
              <p className="text-xs leading-tight text-fg-subtle">Administrador</p>
            </div>
          </div>
        </header>

        <main id="conteudo" className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
