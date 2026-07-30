import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, User } from "lucide-react";
import { Trilha, TituloSecao } from "@/components/layout/Pagina";
import { Selo } from "@/components/ui/Selo";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { BotaoLink } from "@/components/ui/Botao";
import { CardNoticia } from "@/components/cards";
import { NOTICIAS, NOTICIAS_RECENTES, getNoticia } from "@/content/noticias";
import { formatarData } from "@/lib/utils";

export function generateStaticParams() {
  return NOTICIAS.map((noticia) => ({ slug: noticia.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = getNoticia(slug);
  if (!noticia) return { title: "Notícia não encontrada" };

  return {
    title: noticia.titulo,
    description: noticia.resumo,
    alternates: { canonical: `/noticias/${noticia.slug}` },
    openGraph: {
      type: "article",
      title: noticia.titulo,
      description: noticia.resumo,
      publishedTime: noticia.data,
      authors: [noticia.autor],
    },
  };
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = getNoticia(slug);
  if (!noticia) notFound();

  // Relacionadas: mesma categoria primeiro, completando com as mais recentes
  const relacionadas = [
    ...NOTICIAS_RECENTES.filter((n) => n.categoria === noticia.categoria && n.slug !== noticia.slug),
    ...NOTICIAS_RECENTES.filter((n) => n.categoria !== noticia.categoria && n.slug !== noticia.slug),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.resumo,
    datePublished: noticia.data,
    author: { "@type": "Organization", name: noticia.autor },
    publisher: {
      "@type": "Organization",
      name: "Missão Evangélica Pentecostal do Brasil",
    },
    articleSection: noticia.categoria,
    keywords: noticia.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Cabeçalho */}
        <header className="border-b border-line bg-bg-subtle pb-12 pt-[calc(var(--nav-height)+2.5rem)]">
          <div className="container-portal">
            <div className="mx-auto max-w-3xl">
              <Trilha
                itens={[
                  { rotulo: "Notícias", href: "/noticias" },
                  { rotulo: noticia.categoria, href: "/noticias" },
                  { rotulo: noticia.titulo },
                ]}
              />

              <div className="mt-6">
                <Selo tom="primario">{noticia.categoria}</Selo>
              </div>

              <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.625rem]">
                {noticia.titulo}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-fg-muted">{noticia.resumo}</p>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted">
                <li>
                  <time dateTime={noticia.data}>{formatarData(noticia.data)}</time>
                </li>
                <li className="flex items-center gap-2">
                  <User aria-hidden="true" className="h-4 w-4" />
                  {noticia.autor}
                </li>
                <li className="flex items-center gap-2">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  {noticia.tempoLeitura} min de leitura
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Corpo */}
        <div className="container-portal section-y">
          <div className="mx-auto max-w-3xl">
            <ImagemDemo imagem={noticia.imagem} proporcao="16/9" legenda />

            <div className="mt-12 space-y-6">
              {noticia.corpo.map((paragrafo, i) => (
                <p
                  key={i}
                  className={
                    // Primeiro parágrafo em corpo maior, como abertura editorial
                    i === 0
                      ? "text-xl leading-relaxed text-fg"
                      : "text-[1.0625rem] leading-relaxed text-fg-muted"
                  }
                >
                  {paragrafo}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-fg-subtle">
                Assuntos
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {noticia.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-bg-muted px-3.5 py-1.5 text-sm text-fg-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* Relacionadas */}
      <section className="border-t border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            titulo="Leia também"
            acao={
              <BotaoLink href="/noticias" variante="contorno">
                Todas as notícias
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {relacionadas.map((outra) => (
              <li key={outra.slug}>
                <CardNoticia noticia={outra} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
