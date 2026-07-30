import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight, Baby, Flame, Globe2, GraduationCap, Heart, Megaphone, Music, Sparkles, Users,
} from "lucide-react";
import { Trilha, TituloSecao, Versiculo } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Selo } from "@/components/ui/Selo";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { BotaoLink } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { DEPARTAMENTOS, getDepartamento } from "@/content/departamentos";
import { EVENTOS_ORDENADOS } from "@/content/eventos";
import { CardEvento } from "@/components/cards";

const ICONES = { Users, Heart, Flame, Sparkles, Baby, Music, Globe2, GraduationCap, Megaphone } as const;

export function generateStaticParams() {
  return DEPARTAMENTOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const departamento = getDepartamento(slug);
  if (!departamento) return { title: "Departamento não encontrado" };

  return {
    title: departamento.nome,
    description: departamento.descricao,
    alternates: { canonical: `/departamentos/${departamento.slug}` },
  };
}

export default async function DepartamentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const departamento = getDepartamento(slug);
  if (!departamento) notFound();

  const Icone = ICONES[departamento.icone as keyof typeof ICONES];
  const outros = DEPARTAMENTOS.filter((d) => d.slug !== departamento.slug).slice(0, 4);

  // Eventos cujo título ou público mencionam o departamento
  const termo = departamento.nome.replace("Departamento de ", "").toLowerCase();
  const eventos = EVENTOS_ORDENADOS.filter(
    (e) =>
      e.titulo.toLowerCase().includes(termo) ||
      e.publico.toLowerCase().includes(termo),
  ).slice(0, 2);

  return (
    <>
      {/* Cabeçalho */}
      <header className="relative overflow-hidden bg-[var(--mepb-navy-900)] pb-16 pt-[calc(var(--nav-height)+2.5rem)] text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />

        <div className="container-portal relative">
          <Trilha
            claro
            itens={[
              { rotulo: "Departamentos", href: "/departamentos" },
              { rotulo: departamento.nome },
            ]}
          />

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span
              aria-hidden="true"
              className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-white/10 backdrop-blur-sm"
            >
              <Icone className="h-8 w-8 text-white" />
            </span>

            <div>
              <h1 className="text-balance text-3xl font-semibold text-white md:text-4xl">
                {departamento.nome}
              </h1>
              <p className="mt-3 font-serif text-lg italic text-white/80">
                “{departamento.lema}”
              </p>
            </div>
          </div>

          {departamento.faixaEtaria && (
            <div className="mt-6">
              <Selo tom="claro">{departamento.faixaEtaria}</Selo>
            </div>
          )}
        </div>
      </header>

      {/* Corpo */}
      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <ImagemDemo imagem={departamento.imagem} proporcao="16/9" />

            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">Sobre o departamento</h2>
              <div className="mt-6 space-y-5">
                {departamento.sobre.map((paragrafo, i) => (
                  <p key={i} className="text-[1.0625rem] leading-relaxed text-fg-muted">
                    {paragrafo}
                  </p>
                ))}
              </div>
            </section>

            {/* Atividades */}
            <section className="mt-14">
              <h2 className="rule-accent text-2xl font-semibold">Principais atividades</h2>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {departamento.atividades.map((atividade, i) => (
                  <Reveal as="li" key={atividade.titulo} atraso={i * 70}>
                    <Card className="h-full">
                      <CardCorpo className="p-5">
                        <h3 className="font-semibold">{atividade.titulo}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                          {atividade.descricao}
                        </p>
                      </CardCorpo>
                    </Card>
                  </Reveal>
                ))}
              </ul>
            </section>

            {/* Eventos relacionados */}
            {eventos.length > 0 && (
              <section className="mt-14">
                <h2 className="rule-accent text-2xl font-semibold">Na agenda</h2>
                <ul className="mt-8 grid gap-5">
                  {eventos.map((evento) => (
                    <li key={evento.slug}>
                      <CardEvento evento={evento} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Lateral */}
          <aside className="space-y-6 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <Card>
              <CardCorpo>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                  Coordenação nacional
                </h2>
                <p className="mt-3 font-semibold">{departamento.coordenador.nome}</p>
                <p className="mt-0.5 text-sm text-fg-muted">{departamento.coordenador.cargo}</p>

                <BotaoLink href="/contato" variante="contorno" larguraTotal className="mt-5">
                  Falar com o departamento
                </BotaoLink>
              </CardCorpo>
            </Card>

            <Card>
              <CardCorpo>
                <Versiculo
                  texto={departamento.versiculo.texto}
                  referencia={departamento.versiculo.referencia}
                  className="text-left [&>p]:text-lg [&>cite]:text-left"
                />
              </CardCorpo>
            </Card>

            <Card>
              <CardCorpo>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                  Materiais
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  Manuais, estudos e materiais oficiais deste e dos demais departamentos
                  estão reunidos na Biblioteca do portal.
                </p>
                <BotaoLink href="/biblioteca" variante="fantasma" larguraTotal className="mt-4">
                  Ir para a Biblioteca
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </BotaoLink>
              </CardCorpo>
            </Card>
          </aside>
        </div>

        {/* Outros departamentos */}
        <section className="mt-20 border-t border-line pt-16">
          <TituloSecao
            titulo="Outros departamentos"
            acao={
              <BotaoLink href="/departamentos" variante="contorno">
                Ver todos
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {outros.map((outro) => (
              <li key={outro.slug}>
                <Card href={`/departamentos/${outro.slug}`} className="h-full">
                  <CardCorpo className="p-5">
                    <h3 className="font-semibold transition-colors group-hover:text-accent">
                      {outro.nome}
                    </h3>
                    <p className="clamp-2 mt-2 text-sm text-fg-muted">{outro.descricao}</p>
                  </CardCorpo>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
