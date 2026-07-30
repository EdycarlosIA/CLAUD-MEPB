import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookMarked,
  CalendarDays,
  Flame,
  Globe2,
  GraduationCap,
  Heart,
  HeartHandshake,
  MapPin,
  Megaphone,
  Music,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { Hero } from "@/components/home/Hero";
import { MapaPresenca } from "@/components/home/MapaPresenca";
import { TituloSecao, Versiculo } from "@/components/layout/Pagina";
import { BotaoLink } from "@/components/ui/Botao";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Tocha } from "@/components/marca/Tocha";
import { CardDepartamento, CardEvento, CardNoticia } from "@/components/cards";

import { ACESSO_RAPIDO, NUMEROS } from "@/content/site";
import { NOTICIAS_RECENTES } from "@/content/noticias";
import { EVENTOS_ORDENADOS } from "@/content/eventos";
import { DEPARTAMENTOS } from "@/content/departamentos";
import { RESUMO_MISSOES } from "@/content/missoes";

/** Mapa de ícones — resolve o nome vindo do conteúdo para o componente real. */
const ICONES = {
  MapPin, CalendarDays, PlayCircle, BookMarked,
  Users, Heart, Flame, Sparkles, Baby, Music, Globe2, GraduationCap, Megaphone,
} as const;

export default function Home() {
  const [destaque, ...demais] = NOTICIAS_RECENTES;
  const proximosEventos = EVENTOS_ORDENADOS.slice(0, 3);

  return (
    <>
      <Hero />

      {/* ================= Faixa de números ================= */}
      <section aria-label="A MEPB em números" className="border-b border-line bg-bg-subtle">
        <div className="container-portal">
          <ul className="grid grid-cols-2 divide-line md:grid-cols-5 md:divide-x">
            {NUMEROS.map((item, i) => (
              <Reveal as="li" key={item.rotulo} atraso={i * 70} className="px-2 py-8 text-center md:py-10">
                <span data-numeric className="block font-serif text-4xl font-semibold text-primary md:text-5xl">
                  {item.valor}
                </span>
                <span className="mt-2 block text-sm font-semibold text-fg">{item.rotulo}</span>
                <span className="mt-0.5 block text-xs text-fg-subtle">{item.detalhe}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Quem somos + mapa ================= */}
      <section className="section-y">
        <div className="container-portal grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <TituloSecao
              sobretitulo="Quem somos"
              titulo="Uma denominação nacional, enraizada no Evangelho"
              descricao="A Missão Evangélica Pentecostal do Brasil nasceu em 1939, em Manaus, do trabalho do casal missionário Harland e Hazel Graham. Organizou-se formalmente em 1965 e hoje mantém sua sede nacional em Natal, no Rio Grande do Norte."
            />

            <p className="prose-portal mt-6 leading-relaxed text-fg-muted">
              De um salão alugado no bairro do Alecrim, em Natal, a obra se estendeu
              a 21 estados, 16 capitais e mais de 130 municípios — e alcançou quatro
              continentes por meio de seus missionários e parceiros. Ao longo de mais
              de oito décadas, a Missão manteve o mesmo compromisso: anunciar Cristo,
              formar discípulos e cuidar de pessoas.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BotaoLink href="/sobre/historia" variante="primario">
                Nossa história
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
              <BotaoLink href="/sobre/nossa-fe" variante="contorno">
                Nossa fé
              </BotaoLink>
            </div>
          </Reveal>

          <Reveal atraso={120}>
            <div className="rounded-[var(--radius-xl)] border border-line bg-bg-subtle p-7 md:p-9">
              <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-[0.14em] text-fg-muted">
                Onde estamos
              </h3>
              <MapaPresenca />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Acesso rápido ================= */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Acesso rápido"
            titulo="Por onde você quer começar?"
            centralizado
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ACESSO_RAPIDO.map((item, i) => {
              const Icone = ICONES[item.icone as keyof typeof ICONES];
              return (
                <Reveal as="li" key={item.href} atraso={i * 80}>
                  <Card href={item.href} className="h-full">
                    <CardCorpo>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-primary-subtle text-primary transition-transform duration-[var(--duration-base)] group-hover:scale-110">
                        <Icone aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold transition-colors group-hover:text-accent">
                        {item.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.descricao}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Acessar
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardCorpo>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= Notícias ================= */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Comunicação"
            titulo="Notícias da denominação"
            acao={
              <BotaoLink href="/noticias" variante="contorno">
                Todas as notícias
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <CardNoticia noticia={destaque} destaque />
            </Reveal>

            <ul className="flex flex-col gap-4">
              {demais.slice(0, 4).map((noticia, i) => (
                <Reveal as="li" key={noticia.slug} atraso={i * 70}>
                  <CardNoticia noticia={noticia} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= Agenda ================= */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Agenda nacional"
            titulo="Próximos eventos"
            descricao="Congressos, convenções e encontros oficiais da MEPB em todo o país."
            acao={
              <BotaoLink href="/agenda" variante="contorno">
                Ver agenda completa
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </BotaoLink>
            }
          />

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {proximosEventos.map((evento, i) => (
              <Reveal as="li" key={evento.slug} atraso={i * 90}>
                <CardEvento evento={evento} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Missões ================= */}
      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] text-white section-y">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <Tocha
          className="absolute -left-16 top-1/2 h-[30rem] w-auto -translate-y-1/2 text-white"
          opacidade={0.05}
        />

        <div className="container-portal relative">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--mepb-red-400)]">
                Campo missionário
              </p>
              <h2 className="text-balance text-3xl font-semibold text-white md:text-4xl">
                Do Rio Negro aos confins da terra
              </h2>
              <span aria-hidden="true" className="mt-5 block h-[3px] w-11 rounded-full bg-[var(--mepb-red-400)]" />

              <p className="mt-7 max-w-xl leading-relaxed text-white/80">
                Missões não é um departamento entre outros — é a razão de existirmos
                como Missão desde 1939. Hoje sustentamos obreiros em quatro continentes,
                além do trabalho fluvial no Amazonas e do ministério entre imigrantes e
                comunidades indígenas em território nacional.
              </p>

              <ul className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
                {[
                  { valor: RESUMO_MISSOES.paises, rotulo: "países" },
                  { valor: RESUMO_MISSOES.continentes, rotulo: "continentes" },
                  { valor: RESUMO_MISSOES.missionarios, rotulo: "missionários" },
                ].map((item) => (
                  <li key={item.rotulo}>
                    <span data-numeric className="block font-serif text-4xl font-semibold text-white">
                      {item.valor}
                    </span>
                    <span className="mt-1 block text-sm text-white/65">{item.rotulo}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <BotaoLink href="/missoes" variante="primario">
                  Conheça o campo missionário
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </BotaoLink>
                <BotaoLink href="/oracao" variante="claro">
                  <HeartHandshake aria-hidden="true" className="h-4 w-4" />
                  Interceder
                </BotaoLink>
              </div>
            </Reveal>

            <Reveal atraso={140}>
              <Versiculo
                claro
                texto="E este evangelho do reino será pregado em todo o mundo, em testemunho a todas as nações, e então virá o fim."
                referencia="Mateus 24.14"
                className="rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.04] px-8 py-14 backdrop-blur-sm"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Departamentos ================= */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Departamentos"
            titulo="Um lugar para cada idade e cada chamado"
            descricao="Nove departamentos nacionais organizam a vida e o serviço da igreja, do berçário ao campo missionário."
            centralizado
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTAMENTOS.map((departamento, i) => (
              <Reveal as="li" key={departamento.slug} atraso={(i % 3) * 80}>
                <CardDepartamento
                  departamento={departamento}
                  Icone={ICONES[departamento.icone as keyof typeof ICONES]}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Convite ================= */}
      <section className="border-t border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                Você é bem-vindo, exatamente como está
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted">
                Se você nunca entrou em uma igreja, se está voltando depois de muito
                tempo, ou se apenas precisa de alguém para orar com você — há um lugar
                preparado. Não é preciso saber nada de antemão.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <BotaoLink href="/conheca-jesus" variante="primario" tamanho="lg">
                  Conheça Jesus
                </BotaoLink>
                <BotaoLink href="/oracao" variante="contorno" tamanho="lg">
                  Peça uma oração
                </BotaoLink>
                <BotaoLink href="/participe" variante="contorno" tamanho="lg">
                  Quero participar
                </BotaoLink>
              </div>

              <p className="mt-10 text-sm text-fg-muted">
                Prefere conversar com alguém pessoalmente?{" "}
                <Link href="/igrejas" className="font-semibold text-primary hover:underline">
                  Encontre a igreja mais próxima
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
