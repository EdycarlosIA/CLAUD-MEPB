import type { Metadata } from "next";
import { HandCoins, HeartHandshake, Send } from "lucide-react";
import { PageHero, TituloSecao, Versiculo } from "@/components/layout/Pagina";
import { MapaMundi } from "@/components/marca/MapaMundi";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { BotaoLink } from "@/components/ui/Botao";
import { CardMissionario } from "@/components/cards";
import { CAMPOS, MISSIONARIOS, RESUMO_MISSOES, TESTEMUNHOS } from "@/content/missoes";

export const metadata: Metadata = {
  title: "Missões",
  description:
    "O campo missionário da MEPB: missionários em quatro continentes, projetos, testemunhos, pedidos de oração e como contribuir.",
};

/** Campos agrupados por continente, para a lista acessível ao lado do mapa. */
const POR_CONTINENTE = Array.from(
  CAMPOS.reduce((mapa, campo) => {
    const atual = mapa.get(campo.continente) ?? [];
    atual.push(campo);
    return mapa.set(campo.continente, atual);
  }, new Map<string, typeof CAMPOS>()),
);

export default function MissoesPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Missões"
        subtitulo="Missões não é um departamento entre outros — é a razão de existirmos como Missão desde 1939."
        trilha={[{ rotulo: "Missões" }]}
      >
        <ul className="flex flex-wrap gap-x-12 gap-y-4">
          {[
            { valor: RESUMO_MISSOES.paises, rotulo: "países alcançados" },
            { valor: RESUMO_MISSOES.continentes, rotulo: "continentes" },
            { valor: RESUMO_MISSOES.missionarios, rotulo: "missionários no campo" },
          ].map((item) => (
            <li key={item.rotulo}>
              <span data-numeric className="block font-serif text-3xl font-semibold text-white">
                {item.valor}
              </span>
              <span className="text-sm text-white/70">{item.rotulo}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Mapa dos campos */}
      <section className="relative overflow-hidden bg-[var(--mepb-navy-950)] py-16 text-white md:py-20">
        <div className="container-portal">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--mepb-red-400)]">
                Onde estamos
              </p>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Campos missionários da MEPB
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/70">
                Passe o cursor ou navegue com o teclado pelos marcadores para conhecer
                cada campo. O tamanho do marcador indica o número de obreiros.
              </p>

              <div className="mt-10">
                <MapaMundi campos={CAMPOS} />
              </div>
            </div>

            {/* Lista dos campos — cumpre o papel do mapa para leitores de tela */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                Campos por continente
              </h3>

              <div className="mt-6 space-y-7">
                {POR_CONTINENTE.map(([continente, campos]) => (
                  <div key={continente}>
                    <h4 className="text-sm font-bold text-white">{continente}</h4>
                    <ul className="mt-3 space-y-2">
                      {campos.map((campo) => (
                        <li
                          key={campo.pais}
                          className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 text-sm"
                        >
                          <span className="text-white/85">{campo.pais}</span>
                          <span data-numeric className="shrink-0 text-white/55">
                            {campo.missionarios} · desde {campo.desde}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missionários */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Quem está no campo"
            titulo="Nossos missionários"
            descricao="Famílias e obreiros enviados e sustentados pela denominação. Cada perfil traz a história do campo e os pedidos de oração."
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MISSIONARIOS.map((missionario, i) => (
              <Reveal as="li" key={missionario.slug} atraso={(i % 3) * 80}>
                <CardMissionario missionario={missionario} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Testemunhos */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao sobretitulo="Testemunhos" titulo="Vidas alcançadas" centralizado />

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {TESTEMUNHOS.map((testemunho, i) => (
              <Reveal as="li" key={testemunho.autor} atraso={i * 100}>
                <Card className="h-full">
                  <CardCorpo className="flex h-full flex-col">
                    <span aria-hidden="true" className="font-serif text-5xl leading-none text-primary/25">
                      “
                    </span>
                    <blockquote className="mt-2 flex-1">
                      <p className="leading-relaxed text-fg-muted">{testemunho.texto}</p>
                    </blockquote>
                    <footer className="mt-6 border-t border-line pt-4">
                      <p className="font-semibold">{testemunho.autor}</p>
                      <p className="mt-0.5 text-sm text-fg-muted">{testemunho.origem}</p>
                    </footer>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Como contribuir */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Participe"
            titulo="Como contribuir com o trabalho missionário"
            descricao="Há três formas de sustentar a obra — e nenhuma delas é mais importante que as outras."
            centralizado
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                Icone: HeartHandshake,
                titulo: "Interceda",
                texto:
                  "Nenhum campo se sustenta sem oração. Cada perfil de missionário traz pedidos específicos, atualizados pelos próprios obreiros.",
                acao: { rotulo: "Enviar um pedido de oração", href: "/oracao" },
              },
              {
                Icone: HandCoins,
                titulo: "Contribua",
                texto:
                  "A campanha nacional de missões financia a manutenção dos campos e o envio de novos obreiros. A contribuição é feita pela igreja local.",
                acao: { rotulo: "Falar com a Sede Nacional", href: "/contato" },
              },
              {
                Icone: Send,
                titulo: "Vá",
                texto:
                  "Se você sente o chamado missionário, o caminho começa na sua igreja local, com o reconhecimento da liderança e o preparo teológico.",
                acao: { rotulo: "Quero servir", href: "/participe" },
              },
            ].map((forma, i) => (
              <Reveal as="li" key={forma.titulo} atraso={i * 100}>
                <Card className="h-full">
                  <CardCorpo className="flex h-full flex-col p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-primary-subtle text-primary">
                      <forma.Icone aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{forma.titulo}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{forma.texto}</p>
                    <BotaoLink href={forma.acao.href} variante="contorno" className="mt-6">
                      {forma.acao.rotulo}
                    </BotaoLink>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] py-20 text-white">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="container-portal relative">
          <Versiculo
            claro
            texto="Como pregarão, se não forem enviados? Como está escrito: Quão formosos são os pés dos que anunciam o evangelho de paz."
            referencia="Romanos 10.15"
          />
        </div>
      </section>
    </>
  );
}
