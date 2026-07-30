import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, HeartHandshake, MapPin } from "lucide-react";
import { Trilha, TituloSecao } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Selo } from "@/components/ui/Selo";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { BotaoLink } from "@/components/ui/Botao";
import { CardMissionario } from "@/components/cards";
import { MISSIONARIOS, getMissionario } from "@/content/missoes";

export function generateStaticParams() {
  return MISSIONARIOS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const missionario = getMissionario(slug);
  if (!missionario) return { title: "Missionário não encontrado" };

  return {
    title: missionario.nome,
    description: missionario.resumo,
    alternates: { canonical: `/missoes/${missionario.slug}` },
  };
}

export default async function MissionarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const missionario = getMissionario(slug);
  if (!missionario) notFound();

  const outros = MISSIONARIOS.filter((m) => m.slug !== missionario.slug).slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden bg-[var(--mepb-navy-900)] pb-16 pt-[calc(var(--nav-height)+2.5rem)] text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />

        <div className="container-portal relative">
          <Trilha
            claro
            itens={[{ rotulo: "Missões", href: "/missoes" }, { rotulo: missionario.nome }]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Selo tom="claro">{missionario.continente}</Selo>
            <Selo tom="claro">No campo desde {missionario.desde}</Selo>
          </div>

          <h1 className="mt-6 text-balance text-3xl font-semibold text-white md:text-4xl">
            {missionario.nome}
          </h1>

          <p className="mt-4 flex items-center gap-2 text-white/80">
            <MapPin aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
            {missionario.campo} — {missionario.pais}
          </p>
        </div>
      </header>

      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <ImagemDemo imagem={missionario.foto} proporcao="16/9" />

            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">A história do campo</h2>
              <div className="mt-6 space-y-5">
                {missionario.historia.map((paragrafo, i) => (
                  <p key={i} className="text-[1.0625rem] leading-relaxed text-fg-muted">
                    {paragrafo}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="rule-accent text-2xl font-semibold">Frentes de trabalho</h2>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {missionario.foco.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            {/* Pedidos de oração — a contribuição mais direta que a página pede */}
            <Card>
              <CardCorpo>
                <h2 className="flex items-center gap-2.5 text-lg font-semibold">
                  <HeartHandshake aria-hidden="true" className="h-5 w-5 text-primary" />
                  Pedidos de oração
                </h2>

                <ul className="mt-5 space-y-3">
                  {missionario.pedidosOracao.map((pedido) => (
                    <li key={pedido} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {pedido}
                    </li>
                  ))}
                </ul>

                <BotaoLink href="/oracao" variante="primario" larguraTotal className="mt-6">
                  Enviar meu pedido
                </BotaoLink>
              </CardCorpo>
            </Card>

            <Card>
              <CardCorpo>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                  Ficha do campo
                </h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-fg-subtle">País</dt>
                    <dd className="font-semibold">{missionario.pais}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Continente</dt>
                    <dd className="font-semibold">{missionario.continente}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Campo</dt>
                    <dd className="font-semibold">{missionario.campo}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">No campo desde</dt>
                    <dd data-numeric className="font-semibold">
                      {missionario.desde}
                    </dd>
                  </div>
                </dl>
              </CardCorpo>
            </Card>
          </aside>
        </div>

        <section className="mt-20 border-t border-line pt-16">
          <TituloSecao
            titulo="Outros missionários"
            acao={
              <BotaoLink href="/missoes" variante="contorno">
                Ver o campo completo
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outros.map((outro) => (
              <li key={outro.slug}>
                <CardMissionario missionario={outro} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
