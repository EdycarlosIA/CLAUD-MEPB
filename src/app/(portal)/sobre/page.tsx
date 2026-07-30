import type { Metadata } from "next";
import { ArrowRight, BookOpen, Landmark, Milestone, Users } from "lucide-react";
import { PageHero, TituloSecao, Versiculo } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { BotaoLink } from "@/components/ui/Botao";
import { NUMEROS } from "@/content/site";
import { MISSAO } from "@/content/institucional";

export const metadata: Metadata = {
  title: "Sobre a MEPB",
  description:
    "Conheça a história, a missão, a visão, os valores, a declaração de fé e a liderança da Missão Evangélica Pentecostal do Brasil.",
};

const SECOES = [
  {
    href: "/sobre/historia",
    titulo: "Nossa História",
    descricao:
      "De um salão alugado em Manaus, em 1939, à presença em 21 estados e quatro continentes. Linha do tempo completa e acervo histórico.",
    Icone: Milestone,
  },
  {
    href: "/sobre/missao-visao-valores",
    titulo: "Missão, Visão e Valores",
    descricao:
      "O que nos move, aonde queremos chegar e os princípios inegociáveis que orientam cada decisão da denominação.",
    Icone: Landmark,
  },
  {
    href: "/sobre/nossa-fe",
    titulo: "Nossa Fé",
    descricao:
      "A declaração doutrinária da MEPB, em doze artigos, com as referências bíblicas que sustentam cada um deles.",
    Icone: BookOpen,
  },
  {
    href: "/sobre/lideranca",
    titulo: "Liderança",
    descricao:
      "A composição atual do Supremo Concílio e a galeria dos presidentes que conduziram a Missão desde 1965.",
    Icone: Users,
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        titulo="Sobre a MEPB"
        subtitulo="Uma denominação evangélica pentecostal brasileira, fundada em 1939, com sede nacional em Natal e presença em todas as regiões do país."
        trilha={[{ rotulo: "Sobre a MEPB" }]}
      />

      {/* Indicadores */}
      <section aria-label="A MEPB em números" className="border-b border-line bg-bg-subtle">
        <div className="container-portal">
          <ul className="grid grid-cols-2 divide-line md:grid-cols-5 md:divide-x">
            {NUMEROS.map((item) => (
              <li key={item.rotulo} className="px-2 py-8 text-center md:py-10">
                <span data-numeric className="block font-serif text-3xl font-semibold text-primary md:text-4xl">
                  {item.valor}
                </span>
                <span className="mt-2 block text-sm font-semibold">{item.rotulo}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Texto de apresentação */}
      <section className="section-y">
        <div className="container-portal">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <Reveal>
              <TituloSecao
                sobretitulo="Apresentação"
                titulo="Quem é a Missão Evangélica Pentecostal do Brasil"
              />
            </Reveal>

            <Reveal atraso={100}>
              <div className="prose-portal space-y-5 leading-relaxed text-fg-muted">
                <p>
                  A Missão Evangélica Pentecostal do Brasil começou suas atividades em
                  1939, na cidade de Manaus, no Amazonas, pelo trabalho pioneiro do casal
                  missionário Harland Edwin Graham e Hazel Evelyn Graham. A obra teve
                  origem na Church By the Side of the Road, de Seattle, nos Estados Unidos,
                  que enviou o casal para promover a evangelização no Brasil.
                </p>
                <p>
                  Em 26 de junho, Harland e Harold alugaram um salão no bairro do Alecrim
                  e realizaram o primeiro culto oficial da Missão Evangélica Pentecostal
                  na cidade de Natal, no Rio Grande do Norte.
                </p>
                <p>
                  Já atuando em vários estados brasileiros, a Igreja Missão Evangélica
                  Pentecostal do Brasil criou seu estatuto e se organizou em 1965,
                  estabelecendo sua Sede Nacional na cidade do Recife. Posteriormente, a
                  sede foi transferida para Natal, no Rio Grande do Norte, onde permanece,
                  com jurisdição sobre todo o território nacional.
                </p>
                <p>
                  A denominação é dirigida nacionalmente por um órgão colegiado chamado
                  Supremo Concílio. Está presente em 21 estados da federação, 16 capitais
                  e em mais de 130 municípios, e desenvolve trabalho assistencial por meio
                  de seus departamentos nacionais e estaduais de educação teológica e
                  secular, além do barco Missionária Ethel Matson, que atende as populações
                  ribeirinhas do Rio Negro, na Amazônia.
                </p>
                <p>
                  Ousada na fé, como aprendeu com seus fundadores, a Missão avançou a
                  quatro continentes do mundo por meio de seus missionários e parceiros,
                  levando o Evangelho de Cristo a comunidades diversas.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Navegação da seção */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao titulo="Explore a seção" centralizado />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {SECOES.map((secao, i) => (
              <Reveal as="li" key={secao.href} atraso={i * 80}>
                <Card href={secao.href} className="h-full">
                  <CardCorpo className="flex gap-5">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary-subtle text-primary">
                      <secao.Icone aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                        {secao.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{secao.descricao}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Acessar
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Frentes de atuação */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Atuação"
            titulo="Frentes de trabalho da denominação"
            centralizado
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MISSAO.atuacao.map((frente, i) => (
              <Reveal as="li" key={frente.titulo} atraso={i * 70}>
                <Card className="h-full">
                  <CardCorpo>
                    <span
                      aria-hidden="true"
                      data-numeric
                      className="font-serif text-3xl font-semibold text-line-strong"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-semibold">{frente.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{frente.descricao}</p>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Versículo de fechamento */}
      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] py-20 text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="container-portal relative">
          <Versiculo
            claro
            texto="Jesus Cristo é o mesmo, ontem, e hoje, e eternamente."
            referencia="Hebreus 13.8"
          />
          <div className="mt-12 flex justify-center">
            <BotaoLink href="/igrejas" variante="claro" tamanho="lg">
              Encontre uma igreja perto de você
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </BotaoLink>
          </div>
        </div>
      </section>
    </>
  );
}
