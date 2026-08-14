import { ArrowRight, MapPin } from "lucide-react";
import { BotaoLink } from "@/components/ui/Botao";
import { Tocha } from "@/components/marca/Tocha";
import { SITE } from "@/content/site";

/**
 * Hero da home.
 *
 * O fundo é composto por gradientes e um grafismo em SVG, não por uma fotografia,
 * porque o portal ainda não tem banco de imagens próprio — e imagem de banco de
 * dados genérica é justamente o que descaracteriza um site institucional de igreja.
 * Ao substituir por foto real, manter o véu (`.scrim`), que é o que garante o
 * contraste mínimo de 4.5:1 do texto sobre a imagem.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[min(88vh,52rem)] items-center overflow-hidden bg-[var(--mepb-navy-900)]">
      {/* Camada 1 — gradiente de base */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, #2e5c99 0%, #232a5c 42%, #182050 72%, #0d1129 100%)",
        }}
      />

      {/* Camada 2 — grafismo de arcos, evocando o globo do símbolo oficial */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g fill="none" stroke="#fff" strokeOpacity="0.07" strokeWidth="1.2">
          {[180, 300, 420, 540, 660, 780].map((r) => (
            <circle key={r} cx="1160" cy="180" r={r} />
          ))}
        </g>
        <g fill="none" stroke="#fff" strokeOpacity="0.05" strokeWidth="1">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx="1160" cy="180" rx={220 + i * 130} ry={560} />
          ))}
        </g>
      </svg>

      {/* Camada 3 — véu que garante o contraste do texto */}
      <div aria-hidden="true" className="scrim absolute inset-0" />

      {/* Camada 4 — tocha, assinatura visual */}
      <Tocha
        className="absolute -right-4 bottom-0 h-[34rem] w-auto text-white md:right-12 lg:h-[42rem]"
        opacidade={0.07}
      />

      <div className="container-portal relative py-24 pt-[calc(var(--nav-height)+4rem)]">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mepb-red-400)]" aria-hidden="true" />
            Desde {SITE.fundacao} · Presente em 22 estados
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Uma missão que atravessa
            <br className="hidden sm:block" /> gerações e fronteiras
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
            {SITE.descricao}
          </p>

          <blockquote className="mt-9 border-l-2 border-[var(--mepb-red-400)] pl-5">
            <p className="font-serif text-xl italic leading-relaxed text-white/95">
              “{SITE.versiculoInstitucional.texto}”
            </p>
            <cite className="mt-2.5 block text-xs font-bold uppercase not-italic tracking-[0.16em] text-white/65">
              {SITE.versiculoInstitucional.referencia}
            </cite>
          </blockquote>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row">
            <BotaoLink href="/igrejas" variante="primario" tamanho="lg">
              <MapPin aria-hidden="true" className="h-5 w-5" />
              Encontre uma Igreja
            </BotaoLink>

            <BotaoLink href="/sobre" variante="claro" tamanho="lg">
              Conheça a MEPB
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </BotaoLink>
          </div>
        </div>
      </div>
    </section>
  );
}
