import type { Metadata } from "next";
import { PageHero, Versiculo } from "@/components/layout/Pagina";
import { Reveal } from "@/components/ui/Reveal";
import { BotaoLink } from "@/components/ui/Botao";
import { DECLARACAO_DE_FE } from "@/content/institucional";

export const metadata: Metadata = {
  title: "Nossa Fé",
  description:
    "A declaração de fé da Missão Evangélica Pentecostal do Brasil em doze artigos, com as referências bíblicas que sustentam cada um deles.",
};

export default function NossaFePage() {
  return (
    <>
      <PageHero
        titulo="Nossa Fé"
        subtitulo="A Bíblia Sagrada é a nossa única regra de fé e prática. Estes doze artigos resumem o que cremos e ensinamos."
        trilha={[{ rotulo: "Sobre a MEPB", href: "/sobre" }, { rotulo: "Nossa Fé" }]}
      />

      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg-muted">
                A declaração abaixo não substitui as Escrituras — ela apenas organiza,
                de forma resumida, aquilo que a MEPB entende que as Escrituras ensinam.
                Cada artigo traz as referências bíblicas que o fundamentam, para que
                possam ser examinadas.
              </p>
            </Reveal>

            <ol className="mt-14 space-y-10">
              {DECLARACAO_DE_FE.map((artigo, i) => (
                <Reveal as="li" key={artigo.titulo} atraso={40}>
                  <article className="border-l-2 border-line pl-6 transition-colors hover:border-primary md:pl-8">
                    <div className="flex items-baseline gap-4">
                      <span
                        data-numeric
                        aria-hidden="true"
                        className="font-serif text-sm font-semibold text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl font-semibold md:text-2xl">{artigo.titulo}</h2>
                    </div>

                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-fg-muted">
                      {artigo.texto}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {artigo.referencias.map((ref) => (
                        <li
                          key={ref}
                          className="rounded-full bg-bg-muted px-3 py-1 text-xs font-semibold text-fg-muted"
                        >
                          {ref}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] py-20 text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="container-portal relative">
          <Versiculo
            claro
            texto="Toda a Escritura é divinamente inspirada e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça."
            referencia="2 Timóteo 3.16"
          />
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <BotaoLink href="/biblioteca" variante="claro">
              Baixar o Estatuto e o Regimento
            </BotaoLink>
            <BotaoLink href="/faq" variante="contorno" className="border-white/30 text-white hover:bg-white/10">
              Perguntas frequentes
            </BotaoLink>
          </div>
        </div>
      </section>
    </>
  );
}
