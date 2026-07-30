import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { Trilha, TituloSecao } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Selo } from "@/components/ui/Selo";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { BotaoLink } from "@/components/ui/Botao";
import { CardIgreja } from "@/components/cards";
import { IGREJAS, NOMES_UF, getIgreja } from "@/content/igrejas";
import { linkMapa, linkWhatsApp, slug } from "@/lib/utils";

/** Gera as rotas estáticas de todas as igrejas em tempo de build. */
export function generateStaticParams() {
  return IGREJAS.map((igreja) => ({ slug: igreja.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const igreja = getIgreja(slug);
  if (!igreja) return { title: "Igreja não encontrada" };

  return {
    title: igreja.nome,
    description: `${igreja.nome} — ${igreja.endereco}, ${igreja.bairro}, ${igreja.cidade}/${igreja.uf}. Horários de culto, contato e como chegar.`,
    alternates: { canonical: `/igrejas/${igreja.slug}` },
  };
}

const ROTULO_TIPO = {
  "sede-nacional": "Sede Nacional",
  "sede-estadual": "Sede Estadual",
  igreja: "Igreja",
  congregacao: "Congregação",
} as const;

const ORDEM_DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export default async function IgrejaPage({ params }: { params: Promise<{ slug: string }> }) {
  // Renomeado para não sombrear o utilitário `slug()` usado mais abaixo.
  const { slug: slugIgreja } = await params;
  const igreja = getIgreja(slugIgreja);
  if (!igreja) notFound();

  // Sugestões: mesma UF primeiro, completando com outras
  const relacionadas = [
    ...IGREJAS.filter((i) => i.uf === igreja.uf && i.slug !== igreja.slug),
    ...IGREJAS.filter((i) => i.uf !== igreja.uf && i.slug !== igreja.slug),
  ].slice(0, 3);

  // Agrupa os cultos por dia da semana, respeitando a ordem natural
  const porDia = ORDEM_DIAS.map((dia) => ({
    dia,
    cultos: igreja.cultos.filter((c) => c.dia === dia),
  })).filter((g) => g.cultos.length > 0);

  const enderecoCompleto = `${igreja.endereco}, ${igreja.bairro}, ${igreja.cidade} - ${igreja.uf}, ${igreja.cep}`;

  /** Dados estruturados: ajuda o Google a exibir a igreja em buscas locais. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: igreja.nome,
    description: igreja.descricao,
    foundingDate: String(igreja.fundacao),
    address: {
      "@type": "PostalAddress",
      streetAddress: igreja.endereco,
      addressLocality: igreja.cidade,
      addressRegion: igreja.uf,
      postalCode: igreja.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: igreja.coordenadas.lat,
      longitude: igreja.coordenadas.lng,
    },
    ...(igreja.telefone ? { telephone: igreja.telefone } : {}),
    ...(igreja.email ? { email: igreja.email } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cabeçalho */}
      <section className="border-b border-line bg-bg-subtle pb-10 pt-[calc(var(--nav-height)+2.5rem)]">
        <div className="container-portal">
          <Trilha
            itens={[
              { rotulo: "Igrejas", href: "/igrejas" },
              { rotulo: `${igreja.cidade}/${igreja.uf}`, href: `/igrejas?uf=${igreja.uf}` },
              { rotulo: igreja.nome },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Selo tom={igreja.tipo === "sede-nacional" ? "primario" : "neutro"}>
              {ROTULO_TIPO[igreja.tipo]}
            </Selo>
            <Selo tom="neutro">Desde {igreja.fundacao}</Selo>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold md:text-4xl">{igreja.nome}</h1>

          <p className="mt-4 flex items-center gap-2 text-fg-muted">
            <MapPin aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
            {igreja.bairro}, {igreja.cidade} — {NOMES_UF[igreja.uf]}
          </p>
        </div>
      </section>

      {/* Corpo */}
      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          {/* ---------- Coluna principal ---------- */}
          <div className="min-w-0">
            {/* Galeria */}
            <div className="grid gap-4 sm:grid-cols-2">
              <ImagemDemo
                imagem={igreja.fotos[0]}
                proporcao="4/3"
                className={igreja.fotos.length === 1 ? "sm:col-span-2" : undefined}
              />
              {igreja.fotos.slice(1).map((foto) => (
                <ImagemDemo key={foto.src} imagem={foto} proporcao="4/3" />
              ))}
            </div>

            {/* Sobre */}
            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">Sobre a igreja</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-muted">
                {igreja.descricao}
              </p>
            </section>

            {/* Pastor */}
            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">Liderança</h2>
              <Card className="mt-6">
                <CardCorpo className="flex flex-col gap-6 sm:flex-row">
                  <ImagemDemo
                    imagem={igreja.pastor.foto}
                    proporcao="1/1"
                    className="w-28 shrink-0 sm:w-32"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Pastor titular
                    </p>
                    <h3 className="mt-1.5 text-xl font-semibold">{igreja.pastor.nome}</h3>
                    <p className="mt-0.5 text-sm text-fg-muted">
                      À frente da igreja desde {igreja.pastor.desde}
                    </p>
                    <p className="mt-4 leading-relaxed text-fg-muted">{igreja.pastor.bio}</p>
                  </div>
                </CardCorpo>
              </Card>
            </section>

            {/* Departamentos */}
            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">Departamentos ativos</h2>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {igreja.departamentos.map((nome) => (
                  <li key={nome}>
                    <Link
                      href={`/departamentos/${slug(nome)}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                    >
                      {nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Endereço */}
            <section className="mt-12">
              <h2 className="rule-accent text-2xl font-semibold">Como chegar</h2>

              <Card className="mt-6 overflow-hidden">
                {/* Prévia do mapa. Em produção, embutir o iframe do Google Maps. */}
                <div
                  aria-hidden="true"
                  className="relative h-48 bg-[var(--mepb-navy-900)] sm:h-56"
                >
                  <div className="dot-grid absolute inset-0 opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
                      <MapPin className="h-7 w-7 text-white" />
                    </span>
                  </div>
                </div>

                <CardCorpo>
                  <address className="not-italic leading-relaxed text-fg-muted">
                    {igreja.endereco}
                    <br />
                    {igreja.bairro} — {igreja.cidade}/{igreja.uf}
                    <br />
                    CEP {igreja.cep}
                  </address>

                  <BotaoLink
                    href={linkMapa(igreja.coordenadas.lat, igreja.coordenadas.lng, enderecoCompleto)}
                    variante="contorno"
                    className="mt-5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation aria-hidden="true" className="h-4 w-4" />
                    Abrir no Google Maps
                  </BotaoLink>
                </CardCorpo>
              </Card>
            </section>
          </div>

          {/* ---------- Card de ações (sticky no desktop) ---------- */}
          <aside className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:self-start">
            <Card>
              <CardCorpo>
                <h2 className="flex items-center gap-2.5 text-lg font-semibold">
                  <CalendarDays aria-hidden="true" className="h-5 w-5 text-primary" />
                  Horários
                </h2>

                <dl className="mt-5 space-y-4">
                  {porDia.map((grupo) => (
                    <div key={grupo.dia} className="border-b border-line pb-4 last:border-0 last:pb-0">
                      <dt className="text-sm font-bold uppercase tracking-wider text-fg-subtle">
                        {grupo.dia}
                      </dt>
                      <dd className="mt-2 space-y-1.5">
                        {grupo.cultos.map((culto) => (
                          <p key={culto.horario + culto.descricao} className="flex justify-between gap-3 text-sm">
                            <span className="text-fg-muted">{culto.descricao}</span>
                            <span data-numeric className="shrink-0 font-semibold">
                              {culto.horario}
                            </span>
                          </p>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardCorpo>

              {/* Contatos */}
              <div className="border-t border-line p-[var(--card-padding)]">
                <h2 className="text-lg font-semibold">Contato</h2>

                <ul className="mt-4 space-y-2.5">
                  {igreja.whatsapp && (
                    <li>
                      <a
                        href={linkWhatsApp(
                          igreja.whatsapp,
                          `Olá! Encontrei a ${igreja.nome} pelo portal da MEPB e gostaria de mais informações.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] bg-support-subtle px-4 font-semibold text-support transition-opacity hover:opacity-85"
                      >
                        <MessageCircle aria-hidden="true" className="h-5 w-5" />
                        Falar no WhatsApp
                      </a>
                    </li>
                  )}

                  {igreja.telefone && (
                    <li>
                      <a
                        href={`tel:+55${igreja.telefone.replace(/\D/g, "")}`}
                        className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] px-4 text-sm text-fg-muted transition-colors hover:bg-bg-muted"
                      >
                        <Phone aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                        {igreja.telefone}
                      </a>
                    </li>
                  )}

                  {igreja.email && (
                    <li>
                      <a
                        href={`mailto:${igreja.email}`}
                        className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] px-4 text-sm text-fg-muted transition-colors hover:bg-bg-muted"
                      >
                        <Mail aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                        <span className="truncate">{igreja.email}</span>
                      </a>
                    </li>
                  )}

                  {igreja.instagram && (
                    <li>
                      <a
                        href={`https://instagram.com/${igreja.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-md)] px-4 text-sm text-fg-muted transition-colors hover:bg-bg-muted"
                      >
                        <Instagram aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                        @{igreja.instagram}
                      </a>
                    </li>
                  )}
                </ul>

                <BotaoLink href="/participe" variante="primario" larguraTotal className="mt-5">
                  Quero uma visita
                </BotaoLink>
              </div>
            </Card>
          </aside>
        </div>

        {/* Relacionadas */}
        <section className="mt-20 border-t border-line pt-16">
          <TituloSecao
            titulo="Outras igrejas próximas"
            acao={
              <BotaoLink href="/igrejas" variante="contorno">
                Ver todas
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relacionadas.map((outra) => (
              <li key={outra.slug}>
                <CardIgreja igreja={outra} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Barra fixa no mobile — "Como chegar" sempre ao alcance do polegar */}
      <div className="no-print sticky bottom-0 z-30 border-t border-line bg-surface/95 p-3 shadow-lg backdrop-blur-md lg:hidden">
        <div className="flex gap-3">
          <BotaoLink
            href={linkMapa(igreja.coordenadas.lat, igreja.coordenadas.lng, enderecoCompleto)}
            variante="primario"
            className="flex-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation aria-hidden="true" className="h-4 w-4" />
            Como chegar
          </BotaoLink>

          {igreja.whatsapp && (
            <BotaoLink
              href={linkWhatsApp(igreja.whatsapp)}
              variante="contorno"
              className="flex-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </BotaoLink>
          )}
        </div>
      </div>
    </>
  );
}
