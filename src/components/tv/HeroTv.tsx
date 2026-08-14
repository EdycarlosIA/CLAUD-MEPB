import { Info, Play } from "lucide-react";
import type { Midia } from "@/content/types";
import { FundoDemo } from "@/components/ui/ImagemDemo";
import { BotaoLink } from "@/components/ui/Botao";
import { Selo } from "@/components/ui/Selo";
import { formatarDataCurta } from "@/lib/utils";

/**
 * Hero de vitrine da TV MEPB — banner cheio com o conteúdo em destaque,
 * no espírito de um serviço de streaming: imagem de fundo, degradê para
 * legibilidade e as ações principais (assistir / mais informações) sobre ela.
 */
export function HeroTv({ midia }: { midia: Midia }) {
  return (
    <section className="relative isolate flex h-[78vh] min-h-[30rem] max-h-[42rem] items-end overflow-hidden bg-[var(--mepb-navy-950)] text-white">
      <div className="absolute inset-0">
        <FundoDemo src={midia.capa.src} alt="" className="scale-105" />
      </div>

      {/* Degradês de legibilidade: de baixo para cima e da esquerda para o centro */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--mepb-navy-950)] via-[var(--mepb-navy-950)]/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-[var(--mepb-navy-950)]/90 via-[var(--mepb-navy-950)]/20 to-transparent md:block"
      />

      <div className="container-portal relative pb-14 pt-[calc(var(--nav-height)+2rem)] md:pb-20">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--mepb-red-400)]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            Em destaque na TV MEPB
          </p>

          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] text-white md:text-5xl">
            {midia.titulo}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-white/75">
            <Selo tom="claro">{midia.tipo}</Selo>
            <span>{midia.preletor}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={midia.data}>{formatarDataCurta(midia.data)}</time>
            <span aria-hidden="true">·</span>
            <span>{midia.duracao}</span>
          </div>

          <p className="clamp-3 mt-5 text-base leading-relaxed text-white/85 md:text-lg">
            {midia.descricao}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BotaoLink href={`/tv/${midia.slug}`} variante="claro" tamanho="lg">
              <Play aria-hidden="true" className="h-5 w-5 fill-current" />
              Assistir agora
            </BotaoLink>
            <BotaoLink
              href={`/tv/${midia.slug}`}
              variante="secundario"
              tamanho="lg"
              className="border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Info aria-hidden="true" className="h-5 w-5" />
              Mais informações
            </BotaoLink>
          </div>
        </div>
      </div>
    </section>
  );
}
