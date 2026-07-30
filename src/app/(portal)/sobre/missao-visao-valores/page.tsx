import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";
import { PageHero, TituloSecao, Versiculo } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { MISSAO } from "@/content/institucional";

export const metadata: Metadata = {
  title: "Missão, Visão e Valores",
  description:
    "A missão, a visão, os valores e as frentes de atuação da Missão Evangélica Pentecostal do Brasil.",
};

export default function MissaoVisaoValoresPage() {
  return (
    <>
      <PageHero
        titulo="Missão, Visão e Valores"
        subtitulo="O que nos move, aonde queremos chegar e os princípios que não negociamos no caminho."
        trilha={[
          { rotulo: "Sobre a MEPB", href: "/sobre" },
          { rotulo: "Missão, Visão e Valores" },
        ]}
      />

      {/* Missão e Visão */}
      <section className="section-y">
        <div className="container-portal">
          <ul className="grid gap-6 lg:grid-cols-2">
            {[
              { rotulo: "Missão", texto: MISSAO.missao, Icone: Target },
              { rotulo: "Visão", texto: MISSAO.visao, Icone: Compass },
            ].map((bloco, i) => (
              <Reveal as="li" key={bloco.rotulo} atraso={i * 110}>
                <Card className="h-full">
                  <CardCorpo className="p-8 md:p-10">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-primary-subtle text-primary">
                      <bloco.Icone aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h2 className="rule-accent mt-6 text-2xl font-semibold">{bloco.rotulo}</h2>
                    <p className="mt-6 text-lg leading-relaxed text-fg-muted">{bloco.texto}</p>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Valores */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Valores"
            titulo="Princípios que orientam cada decisão"
            descricao="Não são declarações de parede: são os critérios pelos quais medimos a nossa prática como denominação."
            centralizado
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MISSAO.valores.map((valor, i) => (
              <Reveal as="li" key={valor.titulo} atraso={(i % 3) * 80}>
                <Card className="h-full">
                  <CardCorpo>
                    <span
                      aria-hidden="true"
                      data-numeric
                      className="font-serif text-3xl font-semibold text-line-strong"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{valor.titulo}</h3>
                    <p className="mt-3 leading-relaxed text-fg-muted">{valor.descricao}</p>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Atuação */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Atuação"
            titulo="Como a missão se traduz em trabalho"
            centralizado
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {MISSAO.atuacao.map((frente, i) => (
              <Reveal as="li" key={frente.titulo} atraso={i * 80}>
                <div className="border-l-2 border-primary pl-6">
                  <h3 className="text-lg font-semibold">{frente.titulo}</h3>
                  <p className="mt-2.5 leading-relaxed text-fg-muted">{frente.descricao}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] py-20 text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="container-portal relative">
          <Versiculo
            claro
            texto="Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo."
            referencia="Mateus 28.19"
          />
        </div>
      </section>
    </>
  );
}
