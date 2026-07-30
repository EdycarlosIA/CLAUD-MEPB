import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Download, MapPin, Ticket, Users } from "lucide-react";
import { Trilha, TituloSecao } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Selo } from "@/components/ui/Selo";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { BotaoLink } from "@/components/ui/Botao";
import { CardEvento } from "@/components/cards";
import { EVENTOS, EVENTOS_ORDENADOS, getEvento } from "@/content/eventos";
import { formatarPeriodo } from "@/lib/utils";

export function generateStaticParams() {
  return EVENTOS.map((evento) => ({ slug: evento.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const evento = getEvento(slug);
  if (!evento) return { title: "Evento não encontrado" };

  return {
    title: evento.titulo,
    description: evento.descricao,
    alternates: { canonical: `/agenda/${evento.slug}` },
  };
}

export default async function EventoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evento = getEvento(slug);
  if (!evento) notFound();

  const outros = EVENTOS_ORDENADOS.filter((e) => e.slug !== evento.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.titulo,
    description: evento.descricao,
    startDate: evento.dataInicio,
    ...(evento.dataFim ? { endDate: evento.dataFim } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: evento.local,
      address: {
        "@type": "PostalAddress",
        streetAddress: evento.endereco,
        addressLocality: evento.cidade,
        addressRegion: evento.uf,
        addressCountry: "BR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Missão Evangélica Pentecostal do Brasil",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cabeçalho */}
      <header className="relative overflow-hidden bg-[var(--mepb-navy-900)] pb-16 pt-[calc(var(--nav-height)+2.5rem)] text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />

        <div className="container-portal relative">
          <Trilha
            claro
            itens={[{ rotulo: "Agenda", href: "/agenda" }, { rotulo: evento.titulo }]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Selo tom="claro">{evento.tipo}</Selo>
            {evento.inscricoesAbertas ? (
              <Selo tom="claro">Inscrições abertas</Selo>
            ) : (
              <Selo tom="claro">Inscrições encerradas</Selo>
            )}
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-3xl font-semibold text-white md:text-4xl lg:text-[2.75rem]">
            {evento.titulo}
          </h1>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icone: CalendarDays, rotulo: "Quando", valor: formatarPeriodo(evento.dataInicio, evento.dataFim) },
              { Icone: MapPin, rotulo: "Onde", valor: `${evento.local}, ${evento.cidade}/${evento.uf}` },
              { Icone: Users, rotulo: "Para quem", valor: evento.publico },
              { Icone: Ticket, rotulo: "Investimento", valor: evento.valor ?? "A definir" },
            ].map((item) => (
              <li key={item.rotulo} className="flex gap-3">
                <item.Icone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--mepb-red-400)]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                    {item.rotulo}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-white/90">{item.valor}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Corpo */}
      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <div className="min-w-0">
            <ImagemDemo imagem={evento.imagem} proporcao="16/9" />

            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">Sobre o evento</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-muted">
                {evento.descricao}
              </p>
            </section>

            {/* Programação */}
            <section className="mt-14">
              <h2 className="rule-accent text-2xl font-semibold">Programação</h2>

              <ol className="mt-8 space-y-0">
                {evento.programacao.map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-1 border-l-2 border-line py-4 pl-6 transition-colors hover:border-primary sm:flex-row sm:gap-6"
                  >
                    <span
                      data-numeric
                      className="shrink-0 text-sm font-bold text-primary sm:w-32"
                    >
                      {item.horario}
                    </span>
                    <div>
                      <p className="font-semibold">{item.atividade}</p>
                      {item.responsavel && (
                        <p className="mt-0.5 text-sm text-fg-muted">{item.responsavel}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Local */}
            <section className="mt-14">
              <h2 className="rule-accent text-2xl font-semibold">Local</h2>
              <Card className="mt-6">
                <CardCorpo>
                  <p className="font-semibold">{evento.local}</p>
                  <address className="mt-2 not-italic leading-relaxed text-fg-muted">
                    {evento.endereco}
                  </address>
                  <BotaoLink
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evento.endereco)}`}
                    variante="contorno"
                    className="mt-5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                    Ver no mapa
                  </BotaoLink>
                </CardCorpo>
              </Card>
            </section>
          </div>

          {/* Coluna lateral */}
          <aside className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <Card>
              <CardCorpo>
                <h2 className="text-lg font-semibold">Inscrição</h2>

                {evento.inscricoesAbertas ? (
                  <>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      As inscrições para este evento estão abertas. Confirme sua vaga
                      pelo formulário ou procure a secretaria da sua igreja.
                    </p>
                    <p className="mt-4 rounded-[var(--radius-md)] bg-bg-muted px-4 py-3 text-sm font-semibold">
                      {evento.valor}
                    </p>
                    <BotaoLink href="/contato" variante="primario" larguraTotal className="mt-5">
                      Fazer inscrição
                    </BotaoLink>
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      As inscrições para este evento estão encerradas. Consulte a
                      secretaria da sua igreja sobre eventuais vagas remanescentes.
                    </p>
                    <BotaoLink href="/agenda" variante="contorno" larguraTotal className="mt-5">
                      Ver outros eventos
                    </BotaoLink>
                  </>
                )}
              </CardCorpo>

              {/* Materiais */}
              {evento.materiais.length > 0 && (
                <div className="border-t border-line p-[var(--card-padding)]">
                  <h2 className="text-lg font-semibold">Materiais</h2>
                  <ul className="mt-4 space-y-1.5">
                    {evento.materiais.map((material) => (
                      <li key={material.titulo}>
                        <a
                          href="#"
                          className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm transition-colors hover:bg-bg-muted"
                        >
                          <Download aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{material.titulo}</span>
                            <span className="block text-xs text-fg-subtle">
                              {material.formato} · {material.tamanho}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </aside>
        </div>

        {/* Outros eventos */}
        <section className="mt-20 border-t border-line pt-16">
          <TituloSecao titulo="Outros eventos na agenda" />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {outros.map((outro) => (
              <li key={outro.slug}>
                <CardEvento evento={outro} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
