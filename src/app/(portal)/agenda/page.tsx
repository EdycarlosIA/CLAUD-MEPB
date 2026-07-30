import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageHero, TituloSecao } from "@/components/layout/Pagina";
import { Reveal } from "@/components/ui/Reveal";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Selo } from "@/components/ui/Selo";
import { CardEvento } from "@/components/cards";
import { EVENTOS_ORDENADOS } from "@/content/eventos";
import { blocoData, formatarPeriodo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Agenda Nacional",
  description:
    "Calendário oficial da MEPB: convenções, congressos, seminários, retiros e capacitações em todo o país.",
};

/** Rótulo do mês a partir do índice retornado por `blocoData`. */
const MESES_EXTENSO: Record<string, string> = {
  JAN: "Janeiro", FEV: "Fevereiro", MAR: "Março", ABR: "Abril",
  MAI: "Maio", JUN: "Junho", JUL: "Julho", AGO: "Agosto",
  SET: "Setembro", OUT: "Outubro", NOV: "Novembro", DEZ: "Dezembro",
};

export default function AgendaPage() {
  const destaques = EVENTOS_ORDENADOS.filter((e) => e.destaque);

  // Agrupa por mês/ano para a visão de calendário
  const porMes = EVENTOS_ORDENADOS.reduce<
    { chave: string; rotulo: string; eventos: typeof EVENTOS_ORDENADOS }[]
  >((grupos, evento) => {
    const { mes, ano } = blocoData(evento.dataInicio);
    const chave = `${ano}-${mes}`;
    const existente = grupos.find((g) => g.chave === chave);
    if (existente) {
      existente.eventos.push(evento);
    } else {
      grupos.push({
        chave,
        rotulo: `${MESES_EXTENSO[mes]} de ${ano}`,
        eventos: [evento],
      });
    }
    return grupos;
  }, []);

  return (
    <>
      <PageHero
        compacto
        titulo="Agenda Nacional"
        subtitulo="Convenções, congressos, seminários e retiros oficiais da denominação. Inscrições, programação e materiais em cada evento."
        trilha={[{ rotulo: "Agenda Nacional" }]}
      >
        <ul className="flex flex-wrap gap-x-10 gap-y-4">
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {EVENTOS_ORDENADOS.length}
            </span>
            <span className="text-sm text-white/70">eventos programados</span>
          </li>
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {EVENTOS_ORDENADOS.filter((e) => e.inscricoesAbertas).length}
            </span>
            <span className="text-sm text-white/70">com inscrições abertas</span>
          </li>
        </ul>
      </PageHero>

      {/* Destaques */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Destaques"
            titulo="Os grandes encontros do ano"
            descricao="Eventos que reúnem delegados e participantes de todas as regiões do país."
          />

          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {destaques.map((evento, i) => {
              const data = blocoData(evento.dataInicio);
              return (
                <Reveal as="li" key={evento.slug} atraso={i * 110}>
                  <Card href={`/agenda/${evento.slug}`} className="h-full overflow-hidden">
                    <div className="relative bg-[var(--mepb-navy-900)] p-8 text-white">
                      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
                      <div className="relative">
                        <div className="flex flex-wrap items-center gap-2">
                          <Selo tom="claro">{evento.tipo}</Selo>
                          {evento.inscricoesAbertas && <Selo tom="claro">Inscrições abertas</Selo>}
                        </div>

                        <p data-numeric className="mt-6 font-serif text-5xl font-semibold">
                          {data.dia}
                          <span className="ml-2 text-xl font-normal text-white/70">
                            {data.mes} {data.ano}
                          </span>
                        </p>

                        <h3 className="mt-4 text-balance text-2xl font-semibold text-white">
                          {evento.titulo}
                        </h3>
                      </div>
                    </div>

                    <CardCorpo>
                      <p className="clamp-3 leading-relaxed text-fg-muted">{evento.descricao}</p>
                      <dl className="mt-5 space-y-1.5 text-sm">
                        <div className="flex gap-2">
                          <dt className="font-semibold">Quando:</dt>
                          <dd className="text-fg-muted">
                            {formatarPeriodo(evento.dataInicio, evento.dataFim)}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="font-semibold">Onde:</dt>
                          <dd className="text-fg-muted">
                            {evento.local} — {evento.cidade}/{evento.uf}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="font-semibold">Público:</dt>
                          <dd className="text-fg-muted">{evento.publico}</dd>
                        </div>
                      </dl>
                    </CardCorpo>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Calendário por mês */}
      <section className="border-t border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Calendário"
            titulo="Todos os eventos por mês"
          />

          <div className="mt-12 space-y-12">
            {porMes.map((grupo) => (
              <Reveal key={grupo.chave}>
                <div className="flex items-center gap-4">
                  <CalendarDays aria-hidden="true" className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{grupo.rotulo}</h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  <span className="text-sm text-fg-muted">
                    {grupo.eventos.length} {grupo.eventos.length === 1 ? "evento" : "eventos"}
                  </span>
                </div>

                <ul className="mt-6 grid gap-5 lg:grid-cols-2">
                  {grupo.eventos.map((evento) => (
                    <li key={evento.slug}>
                      <CardEvento evento={evento} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
