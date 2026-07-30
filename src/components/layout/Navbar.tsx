"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import { NAV_PRINCIPAL, type ItemNav } from "@/content/site";
import { Logo } from "@/components/marca/Logo";
import { AlternarTema } from "./AlternarTema";
import { cn } from "@/lib/utils";

/**
 * Navegação principal.
 *
 * Comportamento:
 *  - transparente sobre o hero da home, sólida a partir de 24px de rolagem;
 *  - submenus abrem no hover e no foco, fecham com Esc e ao clicar fora;
 *  - em telas pequenas vira drawer lateral com acordeões e CTA fixo no rodapé;
 *  - o CTA "Encontre uma Igreja" está sempre visível — é a tarefa nº 1 do visitante.
 */
export function Navbar() {
  const caminho = usePathname();
  const naHome = caminho === "/";
  /*
    O Framer Motion é usado só onde o CSS não resolve bem: animação de **saída**
    de submenus e do drawer, que exige manter o elemento montado durante a
    transição. As demais animações do portal são CSS puro, para não pagar
    JavaScript por efeito decorativo.
  */
  const movimentoReduzido = useReducedMotion();
  const duracao = movimentoReduzido ? 0 : 0.22;

  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Transparente apenas no topo da home
  useEffect(() => {
    function aoRolar() {
      setRolou(window.scrollY > 24);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Fecha tudo ao trocar de página
  useEffect(() => {
    setAberto(null);
    setDrawer(false);
  }, [caminho]);

  // Esc fecha submenu e drawer; clique fora fecha o submenu
  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAberto(null);
        setDrawer(false);
      }
    }
    function aoClicar(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setAberto(null);
      }
    }
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("mousedown", aoClicar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("mousedown", aoClicar);
    };
  }, []);

  // Trava a rolagem do corpo enquanto o drawer estiver aberto
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const transparente = naHome && !rolou && !drawer;

  function ativo(item: ItemNav) {
    if (item.href === "/") return caminho === "/";
    return caminho === item.href || caminho.startsWith(`${item.href}/`);
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)]",
          transparente
            ? "bg-transparent"
            : "border-b border-line bg-[var(--nav-bg-solid)]/95 shadow-sm backdrop-blur-md",
        )}
      >
        <nav
          aria-label="Navegação principal"
          className="container-portal flex h-[var(--nav-height)] items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="shrink-0 rounded-md"
            aria-label="Missão Evangélica Pentecostal do Brasil — Página inicial"
          >
            <Logo invertida={transparente} />
          </Link>

          {/* ---------- Navegação em telas grandes ---------- */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_PRINCIPAL.map((item) => {
              const temFilhos = Boolean(item.filhos?.length);
              const estaAberto = aberto === item.rotulo;

              return (
                <li
                  key={item.rotulo}
                  className="relative"
                  onMouseEnter={() => temFilhos && setAberto(item.rotulo)}
                  onMouseLeave={() => temFilhos && setAberto(null)}
                >
                  <Link
                    href={item.href}
                    onFocus={() => setAberto(temFilhos ? item.rotulo : null)}
                    aria-expanded={temFilhos ? estaAberto : undefined}
                    aria-haspopup={temFilhos ? "true" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center gap-1 rounded-md px-3 text-[0.9375rem] font-medium",
                      "transition-colors duration-[var(--duration-fast)]",
                      transparente
                        ? "text-white/90 hover:text-white"
                        : "text-fg-muted hover:text-fg",
                      ativo(item) && (transparente ? "text-white" : "text-fg"),
                    )}
                  >
                    {item.rotulo}
                    {temFilhos && (
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-[var(--duration-fast)]",
                          estaAberto && "rotate-180",
                        )}
                      />
                    )}
                    {/* Indicador vermelho do item ativo */}
                    {ativo(item) && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {temFilhos && estaAberto && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: duracao, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "absolute left-0 top-full pt-2",
                          item.mega ? "w-[34rem]" : "w-[19rem]",
                        )}
                      >
                        <ul
                          className={cn(
                            "rounded-[var(--radius-lg)] border border-line bg-surface p-2 shadow-lg",
                            item.mega && "grid grid-cols-3 gap-0.5",
                          )}
                        >
                          {item.filhos!.map((filho) => (
                            <li key={filho.href}>
                              <Link
                                href={filho.href}
                                className="block min-h-11 rounded-[var(--radius-md)] px-3 py-2.5 transition-colors hover:bg-bg-subtle"
                              >
                                <span className="block text-sm font-semibold text-fg">
                                  {filho.rotulo}
                                </span>
                                {filho.descricao && (
                                  <span className="mt-0.5 block text-xs leading-snug text-fg-muted">
                                    {filho.descricao}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* ---------- Ações ---------- */}
          <div className="flex items-center gap-1">
            <AlternarTema className={transparente ? "text-white" : "text-fg-muted"} />

            <Link
              href="/igrejas"
              className={cn(
                "hidden min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-5",
                "text-[0.9375rem] font-semibold shadow-sm transition-all duration-[var(--duration-base)]",
                "hover:shadow-md lg:inline-flex",
                transparente
                  ? "bg-white/95 text-[var(--mepb-navy-900)] hover:bg-white"
                  : "bg-primary text-white hover:bg-primary-hover",
              )}
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Encontre uma Igreja
            </Link>

            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={drawer}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full xl:hidden",
                transparente ? "text-white" : "text-fg",
              )}
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* ---------- Drawer (telas pequenas e médias) ---------- */}
      <AnimatePresence>
        {drawer && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duracao }}
            className="absolute inset-0 bg-[var(--mepb-navy-950)]/60 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: movimentoReduzido ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-surface shadow-xl"
          >
            <div className="flex h-[var(--nav-height)] shrink-0 items-center justify-between border-b border-line px-5">
              <Logo variante="simbolo" />
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Fechar menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg hover:bg-bg-muted"
                autoFocus
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Navegação principal" className="scrollbar-slim flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {NAV_PRINCIPAL.map((item) => (
                  <ItemDrawer key={item.rotulo} item={item} caminho={caminho} />
                ))}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-line p-4">
              <Link
                href="/igrejas"
                className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-primary px-6 font-semibold text-white shadow-sm"
              >
                <MapPin aria-hidden="true" className="h-5 w-5" />
                Encontre uma Igreja
              </Link>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Item do drawer: link simples ou acordeão quando há submenu. */
function ItemDrawer({ item, caminho }: { item: ItemNav; caminho: string }) {
  const [aberto, setAberto] = useState(
    () => Boolean(item.filhos?.some((f) => caminho.startsWith(f.href))),
  );

  if (!item.filhos?.length) {
    return (
      <li>
        <Link
          href={item.href}
          className={cn(
            "flex min-h-[var(--tap-target)] items-center rounded-[var(--radius-md)] px-4 font-medium",
            caminho.startsWith(item.href) ? "bg-primary-subtle text-primary" : "text-fg hover:bg-bg-subtle",
          )}
        >
          {item.rotulo}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="flex min-h-[var(--tap-target)] w-full items-center justify-between rounded-[var(--radius-md)] px-4 font-medium text-fg hover:bg-bg-subtle"
      >
        {item.rotulo}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 text-fg-muted transition-transform", aberto && "rotate-180")}
        />
      </button>

      {aberto && (
        <ul className="mb-2 ml-4 mt-1 space-y-0.5 border-l-2 border-line pl-3">
          <li>
            <Link
              href={item.href}
              className="flex min-h-11 items-center rounded-[var(--radius-md)] px-3 text-sm font-semibold text-accent hover:bg-bg-subtle"
            >
              Ver tudo em {item.rotulo}
            </Link>
          </li>
          {item.filhos.map((filho) => (
            <li key={filho.href}>
              <Link
                href={filho.href}
                className={cn(
                  "flex min-h-11 items-center rounded-[var(--radius-md)] px-3 text-sm",
                  caminho === filho.href ? "font-semibold text-primary" : "text-fg-muted hover:bg-bg-subtle",
                )}
              >
                {filho.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
