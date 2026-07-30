import type { Metadata } from "next";
import { PageHero, TituloSecao } from "@/components/layout/Pagina";
import { Reveal } from "@/components/ui/Reveal";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { Selo } from "@/components/ui/Selo";
import { LINHA_DO_TEMPO } from "@/content/institucional";
import { GALERIA } from "@/content/galeria";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nossa História",
  description:
    "De Manaus, em 1939, ao Brasil inteiro: a trajetória da Missão Evangélica Pentecostal do Brasil em linha do tempo, com acervo histórico.",
};

export default function HistoriaPage() {
  const acervo = GALERIA.filter((item) => item.categoria === "Histórico");

  return (
    <>
      <PageHero
        titulo="Nossa História"
        subtitulo="Mais de oito décadas separando um salão alugado em Manaus de uma denominação presente em 21 estados e quatro continentes."
        trilha={[{ rotulo: "Sobre a MEPB", href: "/sobre" }, { rotulo: "Nossa História" }]}
      />

      {/* Abertura */}
      <section className="section-y">
        <div className="container-portal">
          <Reveal>
            <div className="prose-portal mx-auto space-y-5 text-center">
              <p className="text-xl leading-relaxed text-fg-muted">
                A história da MEPB não começou com uma estrutura, um templo ou um plano
                de expansão. Começou com um casal de missionários que atravessou um
                continente e ficou.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao sobretitulo="Linha do tempo" titulo="Marcos da nossa trajetória" centralizado />

          <ol className="relative mx-auto mt-16 max-w-3xl">
            {/* Eixo vertical da linha do tempo */}
            <span
              aria-hidden="true"
              className="absolute left-[0.4375rem] top-2 h-[calc(100%-1rem)] w-px bg-line-strong sm:left-1/2 sm:-translate-x-1/2"
            />

            {LINHA_DO_TEMPO.map((marco, i) => (
              <Reveal
                as="li"
                key={marco.ano + marco.titulo}
                atraso={40}
                className={cn(
                  "relative pb-12 pl-9 last:pb-0",
                  // Em telas grandes, alterna os lados do eixo
                  "sm:w-1/2 sm:pl-0",
                  i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12",
                )}
              >
                {/* Marcador */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1.5 h-[0.9375rem] w-[0.9375rem] rounded-full border-2 border-bg-subtle",
                    marco.destaque ? "bg-primary" : "bg-line-strong",
                    i % 2 === 0
                      ? "sm:left-auto sm:right-[-0.53125rem]"
                      : "sm:left-[-0.46875rem]",
                  )}
                />

                <span
                  data-numeric
                  className={cn(
                    "font-serif text-2xl font-semibold",
                    marco.destaque ? "text-primary" : "text-fg-subtle",
                  )}
                >
                  {marco.ano}
                </span>

                <h3 className="mt-1.5 text-lg font-semibold">{marco.titulo}</h3>
                <p className="mt-2.5 leading-relaxed text-fg-muted">{marco.descricao}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Acervo */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Acervo"
            titulo="Fotografias históricas"
            descricao="Registros do início da obra, preservados pelo arquivo histórico da Sede Nacional."
            centralizado
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {acervo.map((item, i) => (
              <Reveal as="li" key={item.id} atraso={i * 80}>
                <figure>
                  <ImagemDemo imagem={item.imagem} proporcao="4/3" />
                  <figcaption className="mt-4">
                    <Selo tom="neutro">{item.data.slice(0, 4)}</Selo>
                    <p className="mt-2.5 font-semibold">{item.titulo}</p>
                    <p className="mt-0.5 text-sm text-fg-muted">{item.local}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-fg-subtle">
            O acervo histórico da MEPB está em processo de digitalização. Se você possui
            fotografias, documentos ou registros do início da obra, entre em contato com
            a Secretaria de Comunicação.
          </p>
        </div>
      </section>
    </>
  );
}
