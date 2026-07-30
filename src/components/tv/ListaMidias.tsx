"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Midia } from "@/content/types";
import { MIDIAS, SERIES, TIPOS_MIDIA } from "@/content/midia";
import { CardMidia } from "@/components/cards";
import { EstadoVazio, TituloSecao } from "@/components/layout/Pagina";
import { Botao } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { cn, contem } from "@/lib/utils";

/** Catálogo da TV MEPB com filtro por tipo, busca e agrupamento por série. */
export function ListaMidias() {
  const [tipo, setTipo] = useState<Midia["tipo"] | "">("");
  const [busca, setBusca] = useState("");

  const resultados = useMemo(
    () =>
      MIDIAS.filter((midia) => {
        if (tipo && midia.tipo !== tipo) return false;
        return contem(busca, midia.titulo, midia.preletor, midia.descricao, midia.serie);
      }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()),
    [tipo, busca],
  );

  const semFiltro = !tipo && !busca.trim();

  return (
    <>
      {/* Filtros */}
      <div className="container-portal pt-16 md:pt-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <label htmlFor="busca-midia" className="sr-only">
              Buscar na TV MEPB
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle"
            />
            <input
              id="busca-midia"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por título, série ou preletor…"
              className="min-h-[var(--tap-target)] w-full rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-bg)] py-3 pl-12 pr-4 text-[0.9375rem] placeholder:text-[var(--field-placeholder)]"
            />
          </div>

          <div className="scrollbar-slim -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <ul role="list" className="flex gap-2">
              {["", ...TIPOS_MIDIA].map((t) => (
                <li key={t || "todos"}>
                  <button
                    type="button"
                    onClick={() => setTipo(t as Midia["tipo"] | "")}
                    aria-pressed={tipo === t}
                    className={cn(
                      "min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                      tipo === t
                        ? "border-primary bg-primary text-white"
                        : "border-line-strong text-fg-muted hover:border-primary hover:text-primary",
                    )}
                  >
                    {t || "Tudo"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-live="polite" className="mt-6 text-sm text-fg-muted">
          {resultados.length} {resultados.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}
        </p>

        {resultados.length === 0 ? (
          <div className="mt-10 pb-16">
            <EstadoVazio
              titulo="Nenhum conteúdo encontrado"
              descricao="Não há mensagens, séries ou podcasts com esses critérios. Tente outra busca."
              acao={
                <Botao
                  variante="primario"
                  onClick={() => {
                    setBusca("");
                    setTipo("");
                  }}
                >
                  Limpar filtros
                </Botao>
              }
            />
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((midia, i) => (
              <Reveal as="li" key={midia.slug} atraso={(i % 3) * 70}>
                <CardMidia midia={midia} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>

      {/* Séries — só fazem sentido quando não há filtro ativo */}
      {semFiltro && (
        <section className="mt-20 border-t border-line bg-bg-subtle section-y">
          <div className="container-portal">
            <TituloSecao
              sobretitulo="Séries"
              titulo="Acompanhe do começo"
              descricao="Conteúdos organizados em sequência, para estudo contínuo pessoal ou em grupo."
            />

            <div className="mt-12 space-y-12">
              {SERIES.map((serie) => (
                <Reveal key={serie.nome}>
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-lg font-semibold">{serie.nome}</h3>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    <span className="text-sm text-fg-muted">
                      {serie.episodios.length}{" "}
                      {serie.episodios.length === 1 ? "episódio" : "episódios"}
                    </span>
                  </div>

                  <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {serie.episodios.map((episodio) => (
                      <li key={episodio.slug}>
                        <CardMidia midia={episodio} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
