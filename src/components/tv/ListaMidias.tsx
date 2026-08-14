"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Midia } from "@/content/types";
import { MIDIAS, TIPOS_MIDIA } from "@/content/midia";
import { CardMidia } from "@/components/cards";
import { CarrosselMidias } from "@/components/tv/CarrosselMidias";
import { EstadoVazio } from "@/components/layout/Pagina";
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
      <div className="container-portal relative z-10 -mt-14 md:-mt-20">
        <div className="rounded-[var(--radius-xl)] border border-line bg-surface/95 p-4 shadow-[var(--card-shadow-hover)] backdrop-blur-md sm:p-5">
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

            <div className="scrollbar-slim -mx-1 overflow-x-auto px-1">
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
        </div>
      </div>

      {semFiltro ? (
        // Sem filtro ativo: vitrine em fileiras, uma por tipo de conteúdo.
        <div className="pb-8 pt-10 md:pt-14">
          {TIPOS_MIDIA.map((t) => (
            <CarrosselMidias
              key={t}
              titulo={t === "Série" ? "Séries" : `${t}s`}
              midias={MIDIAS.filter((m) => m.tipo === t).sort(
                (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
              )}
            />
          ))}
        </div>
      ) : (
        // Com busca ou filtro ativo: grade de resultados, como uma busca de vídeo.
        <div className="container-portal pt-10 md:pt-14">
          <p aria-live="polite" className="text-sm text-fg-muted">
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
            <ul className="mt-6 grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
              {resultados.map((midia, i) => (
                <Reveal as="li" key={midia.slug} atraso={(i % 3) * 70}>
                  <CardMidia midia={midia} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
