import type { Metadata } from "next";
import { PageHero, TituloSecao } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Selo } from "@/components/ui/Selo";
import { PRESIDENTES, SUPREMO_CONCILIO } from "@/content/institucional";

export const metadata: Metadata = {
  title: "Liderança",
  description:
    "Composição do Supremo Concílio da MEPB e galeria dos presidentes que conduziram a denominação desde 1965.",
};

/** Iniciais usadas no avatar quando não há fotografia disponível. */
function iniciais(nome: string): string {
  const partes = nome
    .replace(/^(Pr\.|Pra\.|Miss\.|Pastor|Missionário)\s+/i, "")
    .split(" ")
    .filter((p) => p.length > 2);
  return `${partes[0]?.[0] ?? ""}${partes[partes.length - 1]?.[0] ?? ""}`.toUpperCase();
}

export default function LiderancaPage() {
  const [atual, ...anteriores] = [...PRESIDENTES].reverse();

  return (
    <>
      <PageHero
        titulo="Liderança"
        subtitulo="A MEPB é dirigida nacionalmente por um órgão colegiado — o Supremo Concílio — eleito em Convenção Nacional."
        trilha={[{ rotulo: "Sobre a MEPB", href: "/sobre" }, { rotulo: "Liderança" }]}
      />

      {/* Supremo Concílio */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Governo da denominação"
            titulo="Supremo Concílio"
            descricao="Composto por Presidente, Vice-Presidente, 1º e 2º Secretários, 1º e 2º Tesoureiros e três vogais, eleitos para um quadriênio."
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUPREMO_CONCILIO.map((membro, i) => (
              <Reveal as="li" key={membro.cargo + membro.nome} atraso={(i % 3) * 70}>
                <Card className="h-full">
                  <CardCorpo className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--mepb-navy-900)] font-serif text-lg font-semibold text-white"
                    >
                      {iniciais(membro.nome)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        {membro.cargo}
                      </p>
                      <p className="mt-1 font-semibold leading-snug">{membro.nome}</p>
                      <p className="mt-0.5 text-sm text-fg-muted">{membro.uf}</p>
                    </div>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Presidente atual */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao sobretitulo="Presidência" titulo="Presidente em exercício" />

          <Reveal className="mt-12">
            <Card>
              <CardCorpo className="flex flex-col gap-8 p-8 sm:flex-row sm:items-center md:p-10">
                <span
                  aria-hidden="true"
                  className="inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[var(--mepb-navy-900)] font-serif text-3xl font-semibold text-white"
                >
                  {iniciais(atual.nome)}
                </span>
                <div>
                  <Selo tom="primario">{atual.periodo}</Selo>
                  <h3 className="mt-3 text-2xl font-semibold">{atual.nome}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{atual.origem}</p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">{atual.nota}</p>
                </div>
              </CardCorpo>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Galeria de presidentes */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Memória"
            titulo="Presidentes da Missão"
            descricao="Desde a eleição do missionário Harland Graham, em dezembro de 1965, após a conclusão e o registro do Estatuto."
          />

          <ol className="mt-12 space-y-4">
            {anteriores.map((presidente, i) => (
              <Reveal as="li" key={presidente.nome} atraso={i * 50}>
                <Card>
                  <CardCorpo className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bg-muted font-serif text-lg font-semibold text-fg-muted"
                    >
                      {iniciais(presidente.nome)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{presidente.nome}</h3>
                      <p className="mt-0.5 text-sm text-fg-muted">{presidente.origem}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{presidente.nota}</p>
                    </div>

                    <span
                      data-numeric
                      className="shrink-0 text-sm font-semibold text-fg-subtle sm:text-right"
                    >
                      {presidente.periodo}
                    </span>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ol>

          <p className="mt-10 text-center text-sm text-fg-subtle">
            Os nomes e períodos exibidos nesta página são fictícios, criados para o
            protótipo, e devem ser substituídos pelos registros oficiais da Secretaria.
          </p>
        </div>
      </section>
    </>
  );
}
