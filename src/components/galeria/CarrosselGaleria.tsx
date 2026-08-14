import { Play } from "lucide-react";
import type { ItemGaleria } from "@/content/types";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { formatarDataCurta } from "@/lib/utils";

/**
 * Fileira de rolagem horizontal por categoria — mesma vitrine da TV MEPB,
 * aplicada aqui a fotos e vídeos do acervo.
 */
export function CarrosselGaleria({ titulo, itens }: { titulo: string; itens: ItemGaleria[] }) {
  if (itens.length === 0) return null;

  return (
    <section aria-label={titulo} className="py-3">
      <div className="container-portal">
        <h2 className="text-lg font-semibold md:text-xl">{titulo}</h2>
      </div>

      <ul
        role="list"
        className="scrollbar-slim mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]"
      >
        {itens.map((item) => (
          <li key={item.id} className="w-56 shrink-0 snap-start sm:w-64">
            <figure className="group">
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--card-shadow)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] group-hover:shadow-[var(--card-shadow-hover)]">
                <ImagemDemo imagem={item.imagem} proporcao="4/3" className="[&>div]:rounded-none" />

                {item.tipo === "video" && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:bg-black/25 group-hover:opacity-100"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-[var(--mepb-navy-900)] text-[var(--mepb-navy-900)]" />
                    </span>
                  </span>
                )}
              </div>

              <figcaption className="mt-2.5">
                <p className="clamp-2 text-sm font-semibold leading-snug">{item.titulo}</p>
                <p className="mt-1 text-xs text-fg-muted">
                  {item.local} · {formatarDataCurta(item.data)}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
