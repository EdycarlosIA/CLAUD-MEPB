import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Play, User } from "lucide-react";
import { Trilha, TituloSecao } from "@/components/layout/Pagina";
import { Selo } from "@/components/ui/Selo";
import { BotaoLink } from "@/components/ui/Botao";
import { CardMidia } from "@/components/cards";
import { MIDIAS, getMidia } from "@/content/midia";
import { SITE } from "@/content/site";
import { formatarData } from "@/lib/utils";

export function generateStaticParams() {
  return MIDIAS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const midia = getMidia(slug);
  if (!midia) return { title: "Conteúdo não encontrado" };

  return {
    title: midia.titulo,
    description: midia.descricao,
    alternates: { canonical: `/tv/${midia.slug}` },
  };
}

export default async function MidiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const midia = getMidia(slug);
  if (!midia) notFound();

  // Da mesma série primeiro; depois, os mais recentes
  const relacionados = [
    ...MIDIAS.filter((m) => m.serie && m.serie === midia.serie && m.slug !== midia.slug),
    ...MIDIAS.filter((m) => m.serie !== midia.serie && m.slug !== midia.slug),
  ].slice(0, 3);

  return (
    <>
      {/* Player */}
      <section className="bg-[var(--mepb-navy-950)] pt-[var(--nav-height)]">
        <div className="container-portal py-8">
          {/*
            Placeholder do player. Em produção, substituir por um embed do YouTube
            com carregamento sob demanda (facade), para não pesar o carregamento
            inicial com o iframe de terceiros.
          */}
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-[var(--mepb-navy-900)]">
            <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-xl transition-transform hover:scale-105">
                <Play aria-hidden="true" className="ml-1.5 h-9 w-9 fill-white text-white" />
              </span>
              <div>
                <p className="font-semibold text-white">Reprodução de demonstração</p>
                <p className="mt-1.5 max-w-md text-sm text-white/60">
                  No portal em produção, este espaço exibe o vídeo hospedado no canal
                  oficial da MEPB no YouTube.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informações */}
      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <Trilha
              itens={[{ rotulo: "TV MEPB", href: "/tv" }, { rotulo: midia.titulo }]}
            />

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Selo tom="azul">{midia.tipo}</Selo>
              {midia.serie && <Selo tom="neutro">{midia.serie}</Selo>}
            </div>

            <h1 className="mt-5 text-balance text-3xl font-semibold md:text-4xl">{midia.titulo}</h1>

            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted">
              <li className="flex items-center gap-2">
                <User aria-hidden="true" className="h-4 w-4" />
                {midia.preletor}
              </li>
              <li>
                <time dateTime={midia.data}>{formatarData(midia.data)}</time>
              </li>
              <li className="flex items-center gap-2">
                <Clock aria-hidden="true" className="h-4 w-4" />
                {midia.duracao}
              </li>
            </ul>

            <section className="mt-10">
              <h2 className="rule-accent text-xl font-semibold">Sobre este conteúdo</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-muted">
                {midia.descricao}
              </p>
            </section>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
              <h2 className="text-lg font-semibold">Acompanhe a MEPB</h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Inscreva-se no canal oficial para receber as transmissões ao vivo e os
                novos episódios das séries.
              </p>

              <BotaoLink
                href={SITE.redes.youtube}
                variante="primario"
                larguraTotal
                className="mt-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canal no YouTube
              </BotaoLink>

              <BotaoLink href="/agenda" variante="contorno" larguraTotal className="mt-3">
                Ver próximas transmissões
              </BotaoLink>
            </div>
          </aside>
        </div>

        <section className="mt-20 border-t border-line pt-16">
          <TituloSecao
            titulo={midia.serie ? "Continue a série" : "Você também pode gostar"}
            acao={
              <BotaoLink href="/tv" variante="contorno">
                Todo o catálogo
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((outro) => (
              <li key={outro.slug}>
                <CardMidia midia={outro} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
