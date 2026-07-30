"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CategoriaNoticia } from "@/content/types";
import { CATEGORIAS_NOTICIA, NOTICIAS_RECENTES } from "@/content/noticias";
import { CardNoticia } from "@/components/cards";
import { EstadoVazio } from "@/components/layout/Pagina";
import { Botao } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { cn, contem } from "@/lib/utils";

/**
 * Listagem de notícias com busca e filtro por categoria.
 * A primeira notícia em destaque só aparece quando nenhum filtro está ativo —
 * com filtro ativo, o usuário espera uma grade homogênea de resultados.
 */
export function ListaNoticias() {
  const [categoria, setCategoria] = useState<CategoriaNoticia | "">("");
  const [busca, setBusca] = useState("");

  const resultados = useMemo(
    () =>
      NOTICIAS_RECENTES.filter((noticia) => {
        if (categoria && noticia.categoria !== categoria) return false;
        return contem(busca, noticia.titulo, noticia.resumo, noticia.tags.join(" "));
      }),
    [categoria, busca],
  );

  const semFiltro = !categoria && !busca.trim();
  const [destaque, ...demais] = resultados;

  return (
    <div className="container-portal section-y">
      {/* Barra de filtros */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="busca-noticia" className="sr-only">
            Buscar notícias
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle"
          />
          <input
            id="busca-noticia"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar notícias…"
            className="min-h-[var(--tap-target)] w-full rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-bg)] py-3 pl-12 pr-4 text-[0.9375rem] placeholder:text-[var(--field-placeholder)]"
          />
        </div>

        <div className="scrollbar-slim -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
          <ul role="list" className="flex gap-2">
            {["", ...CATEGORIAS_NOTICIA].map((cat) => (
              <li key={cat || "todas"}>
                <button
                  type="button"
                  onClick={() => setCategoria(cat as CategoriaNoticia | "")}
                  aria-pressed={categoria === cat}
                  className={cn(
                    "min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                    categoria === cat
                      ? "border-primary bg-primary text-white"
                      : "border-line-strong text-fg-muted hover:border-primary hover:text-primary",
                  )}
                >
                  {cat || "Todas"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contagem */}
      <p aria-live="polite" className="mt-6 text-sm text-fg-muted">
        {resultados.length} {resultados.length === 1 ? "notícia encontrada" : "notícias encontradas"}
      </p>

      {/* Resultados */}
      {resultados.length === 0 ? (
        <div className="mt-10">
          <EstadoVazio
            titulo="Nenhuma notícia encontrada"
            descricao="Não há matérias com esses critérios. Tente outra palavra-chave ou volte para todas as categorias."
            acao={
              <Botao
                variante="primario"
                onClick={() => {
                  setBusca("");
                  setCategoria("");
                }}
              >
                Limpar filtros
              </Botao>
            }
          />
        </div>
      ) : semFiltro ? (
        <>
          <Reveal className="mt-10">
            <CardNoticia noticia={destaque} destaque />
          </Reveal>

          <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {demais.map((noticia, i) => (
              <Reveal as="li" key={noticia.slug} atraso={(i % 3) * 70}>
                <CardNoticia noticia={noticia} />
              </Reveal>
            ))}
          </ul>
        </>
      ) : (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resultados.map((noticia, i) => (
            <Reveal as="li" key={noticia.slug} atraso={(i % 3) * 70}>
              <CardNoticia noticia={noticia} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
