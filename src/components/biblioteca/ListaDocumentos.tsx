"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Documento } from "@/content/types";
import { CATEGORIAS_DOCUMENTO, DOCUMENTOS } from "@/content/biblioteca";
import { CardDocumento } from "@/components/cards";
import { EstadoVazio } from "@/components/layout/Pagina";
import { Botao } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { cn, contem } from "@/lib/utils";

/**
 * Biblioteca de documentos.
 * Quando não há filtro, os documentos aparecem agrupados por categoria — é como
 * a liderança procura o material ("preciso de um formulário", não "preciso do
 * documento X"). Com filtro, vira lista simples de resultados.
 */
export function ListaDocumentos() {
  const [categoria, setCategoria] = useState<Documento["categoria"] | "">("");
  const [busca, setBusca] = useState("");

  const resultados = useMemo(
    () =>
      DOCUMENTOS.filter((doc) => {
        if (categoria && doc.categoria !== categoria) return false;
        return contem(busca, doc.titulo, doc.descricao, doc.categoria);
      }),
    [categoria, busca],
  );

  const agrupados = useMemo(
    () =>
      CATEGORIAS_DOCUMENTO.map((cat) => ({
        categoria: cat,
        documentos: resultados.filter((d) => d.categoria === cat),
      })).filter((g) => g.documentos.length > 0),
    [resultados],
  );

  return (
    <div className="container-portal section-y">
      {/* Filtros */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="busca-documento" className="sr-only">
            Buscar documentos
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle"
          />
          <input
            id="busca-documento"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título ou assunto…"
            className="min-h-[var(--tap-target)] w-full rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-bg)] py-3 pl-12 pr-4 text-[0.9375rem] placeholder:text-[var(--field-placeholder)]"
          />
        </div>

        <div className="scrollbar-slim -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
          <ul role="list" className="flex gap-2">
            {["", ...CATEGORIAS_DOCUMENTO].map((cat) => (
              <li key={cat || "todas"}>
                <button
                  type="button"
                  onClick={() => setCategoria(cat as Documento["categoria"] | "")}
                  aria-pressed={categoria === cat}
                  className={cn(
                    "min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                    categoria === cat
                      ? "border-primary bg-primary text-white"
                      : "border-line-strong text-fg-muted hover:border-primary hover:text-primary",
                  )}
                >
                  {cat || "Todos"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-fg-muted">
        {resultados.length} {resultados.length === 1 ? "documento encontrado" : "documentos encontrados"}
      </p>

      {resultados.length === 0 ? (
        <div className="mt-10">
          <EstadoVazio
            titulo="Nenhum documento encontrado"
            descricao="Não localizamos materiais com esses critérios. Tente outra palavra-chave ou veja todas as categorias."
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
      ) : (
        <div className="mt-10 space-y-14">
          {agrupados.map((grupo) => (
            <section key={grupo.categoria} aria-labelledby={`cat-${grupo.categoria}`}>
              <div className="flex items-baseline gap-4">
                <h2
                  id={`cat-${grupo.categoria}`}
                  className="text-lg font-semibold"
                >
                  {grupo.categoria}
                </h2>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
                <span className="text-sm text-fg-muted">
                  {grupo.documentos.length}{" "}
                  {grupo.documentos.length === 1 ? "item" : "itens"}
                </span>
              </div>

              <ul className="mt-6 grid gap-4 lg:grid-cols-2">
                {grupo.documentos.map((documento, i) => (
                  <Reveal as="li" key={documento.slug} atraso={(i % 2) * 60}>
                    <CardDocumento documento={documento} />
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
