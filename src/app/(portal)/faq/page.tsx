import type { Metadata } from "next";
import { PageHero, TituloSecao } from "@/components/layout/Pagina";
import { Acordeao } from "@/components/ui/Acordeao";
import { BotaoLink } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORIAS_FAQ, PERGUNTAS } from "@/content/faq";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Respostas às dúvidas mais comuns sobre a MEPB, visitas, membresia, documentos oficiais e o trabalho missionário.",
};

export default function FaqPage() {
  /** Dados estruturados de FAQ — habilita o resultado expandido no Google. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        compacto
        titulo="Perguntas Frequentes"
        subtitulo="As dúvidas que mais chegam à Secretaria da Sede Nacional, respondidas de forma direta."
        trilha={[{ rotulo: "Perguntas Frequentes" }]}
      />

      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl space-y-14">
            {CATEGORIAS_FAQ.map((categoria) => {
              const perguntas = PERGUNTAS.filter((p) => p.categoria === categoria);
              if (perguntas.length === 0) return null;

              return (
                <Reveal key={categoria}>
                  <section aria-labelledby={`faq-${categoria}`}>
                    <h2
                      id={`faq-${categoria}`}
                      className="rule-accent text-xl font-semibold md:text-2xl"
                    >
                      {categoria}
                    </h2>

                    <Acordeao
                      unico
                      className="mt-8"
                      itens={perguntas.map((p) => ({
                        titulo: p.pergunta,
                        conteudo: <p className="leading-relaxed">{p.resposta}</p>,
                      }))}
                    />
                  </section>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            titulo="Não encontrou sua resposta?"
            descricao="A Secretaria da Sede Nacional responde em até três dias úteis."
            centralizado
          />

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <BotaoLink href="/contato" variante="primario" tamanho="lg">
              Falar com a Sede Nacional
            </BotaoLink>
            <BotaoLink href="/igrejas" variante="contorno" tamanho="lg">
              Procurar minha igreja
            </BotaoLink>
          </div>
        </div>
      </section>
    </>
  );
}
