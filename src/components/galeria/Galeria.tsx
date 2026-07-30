"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import type { ItemGaleria } from "@/content/types";
import { CATEGORIAS_GALERIA, GALERIA } from "@/content/galeria";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { Selo } from "@/components/ui/Selo";
import { EstadoVazio } from "@/components/layout/Pagina";
import { Botao } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatarDataCurta } from "@/lib/utils";

/** Galeria de fotos e vídeos com filtro por categoria. */
export function Galeria() {
  const [categoria, setCategoria] = useState<ItemGaleria["categoria"] | "">("");

  const resultados = useMemo(
    () =>
      GALERIA.filter((item) => !categoria || item.categoria === categoria).sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
      ),
    [categoria],
  );

  return (
    <div className="container-portal section-y">
      <div className="scrollbar-slim -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
        <ul role="list" className="flex gap-2">
          {["", ...CATEGORIAS_GALERIA].map((cat) => (
            <li key={cat || "todas"}>
              <button
                type="button"
                onClick={() => setCategoria(cat as ItemGaleria["categoria"] | "")}
                aria-pressed={categoria === cat}
                className={cn(
                  "min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                  categoria === cat
                    ? "border-primary bg-primary text-white"
                    : "border-line-strong text-fg-muted hover:border-primary hover:text-primary",
                )}
              >
                {cat || "Tudo"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-fg-muted">
        {resultados.length} {resultados.length === 1 ? "registro" : "registros"}
      </p>

      {resultados.length === 0 ? (
        <div className="mt-10">
          <EstadoVazio
            descricao="Ainda não há registros nesta categoria."
            acao={
              <Botao variante="primario" onClick={() => setCategoria("")}>
                Ver tudo
              </Botao>
            }
          />
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((item, i) => (
            <Reveal as="li" key={item.id} atraso={(i % 3) * 70}>
              <figure className="group">
                <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
                  <ImagemDemo imagem={item.imagem} proporcao="4/3" />

                  {item.tipo === "video" && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-[var(--duration-base)] group-hover:scale-110"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <Play className="ml-1 h-6 w-6 fill-[var(--mepb-navy-900)] text-[var(--mepb-navy-900)]" />
                      </span>
                    </span>
                  )}
                </div>

                <figcaption className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Selo tom="neutro">{item.categoria}</Selo>
                    {item.tipo === "video" && <Selo tom="primario">Vídeo</Selo>}
                  </div>
                  <p className="mt-2.5 font-semibold leading-snug">{item.titulo}</p>
                  <p className="mt-1 text-sm text-fg-muted">
                    {item.local} · {formatarDataCurta(item.data)}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
