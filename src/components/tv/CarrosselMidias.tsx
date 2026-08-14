import Link from "next/link";
import { Play } from "lucide-react";
import type { Midia } from "@/content/types";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { formatarDataCurta } from "@/lib/utils";

/**
 * Fileira de rolagem horizontal — o padrão de vitrine dos apps de streaming,
 * usado na TV MEPB para agrupar mensagens, séries, podcasts etc. por tipo.
 */
export function CarrosselMidias({
  titulo,
  midias,
  verTudoHref,
}: {
  titulo: string;
  midias: Midia[];
  verTudoHref?: string;
}) {
  if (midias.length === 0) return null;

  return (
    <section aria-label={titulo} className="py-3">
      <div className="container-portal flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold md:text-xl">{titulo}</h2>
        {verTudoHref && (
          <Link
            href={verTudoHref}
            className="whitespace-nowrap text-sm font-semibold text-primary hover:underline"
          >
            Ver tudo
          </Link>
        )}
      </div>

      <ul
        role="list"
        className="scrollbar-slim mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]"
      >
        {midias.map((midia) => (
          <li key={midia.slug} className="w-64 shrink-0 snap-start sm:w-72">
            <CartaoCarrossel midia={midia} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CartaoCarrossel({ midia }: { midia: Midia }) {
  return (
    <Link href={`/tv/${midia.slug}`} className="group block focus-visible:outline-none">
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--card-shadow)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] group-hover:shadow-[var(--card-shadow-hover)] group-focus-visible:scale-[1.04]">
        <ImagemDemo imagem={midia.capa} proporcao="16/9" className="[&>div]:rounded-none" />

        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:bg-black/25 group-hover:opacity-100"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-[var(--mepb-navy-900)] text-[var(--mepb-navy-900)]" />
          </span>
        </span>

        <span className="absolute bottom-2 right-2 rounded bg-[var(--mepb-navy-950)]/85 px-1.5 py-0.5 text-[0.6875rem] font-semibold text-white">
          {midia.duracao}
        </span>
      </div>

      <h3 className="clamp-2 mt-2.5 text-sm font-semibold leading-snug transition-colors group-hover:text-accent">
        {midia.titulo}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-fg-muted">
        <span className="truncate">{midia.preletor}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={midia.data} className="whitespace-nowrap">
          {formatarDataCurta(midia.data)}
        </time>
      </p>
    </Link>
  );
}
