import type { Metadata } from "next";
import { PageHero, Versiculo } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { BotaoLink } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { Tocha } from "@/components/marca/Tocha";

export const metadata: Metadata = {
  title: "Conheça Jesus",
  description:
    "O que a Bíblia diz sobre Deus, sobre nós e sobre o caminho da salvação em Jesus Cristo — explicado de forma simples e direta.",
};

/**
 * Página de apresentação do Evangelho.
 *
 * Deliberadamente a página mais sóbria do portal: sem cards coloridos, sem
 * indicadores, sem chamadas concorrentes. Uma coluna, texto grande, muito
 * respiro. O conteúdo é o produto.
 */

const PASSOS = [
  {
    titulo: "Deus criou você para se relacionar com Ele",
    texto:
      "A Bíblia começa com um Deus que cria por amor e chama tudo o que fez de bom. Você não é um acidente estatístico: foi pensado, desejado e feito à imagem de Deus, com propósito e dignidade.",
    referencia: "Gênesis 1.27",
  },
  {
    titulo: "Mas algo se rompeu entre nós e Ele",
    texto:
      "A Bíblia chama isso de pecado — não apenas os erros que cometemos, mas a condição de vivermos afastados de Deus, tentando ser o centro da própria vida. Todos nós estamos nessa condição, sem exceção, e ninguém consegue se consertar sozinho.",
    referencia: "Romanos 3.23",
  },
  {
    titulo: "Jesus veio pagar o preço dessa separação",
    texto:
      "Deus não esperou que déssemos o primeiro passo. Ele veio até nós em Jesus Cristo, que viveu sem pecado, morreu na cruz no nosso lugar e ressuscitou ao terceiro dia, vencendo a morte. A conta que não tínhamos como pagar, Ele pagou.",
    referencia: "Romanos 5.8",
  },
  {
    titulo: "A salvação é um presente, não um pagamento",
    texto:
      "Não existe lista de tarefas a cumprir antes de se aproximar de Deus. A salvação é recebida pela fé, como um presente — e presente não se compra, se aceita. Nada do que você fez até aqui é grande demais para o perdão de Deus.",
    referencia: "Efésios 2.8-9",
  },
  {
    titulo: "O que fazer agora",
    texto:
      "Reconheça diante de Deus a sua necessidade dele. Creia que Jesus morreu e ressuscitou por você. Entregue a sua vida a Ele e peça que assuma o comando. Não há fórmula mágica nem palavras certas — Deus ouve o coração sincero.",
    referencia: "Romanos 10.9",
  },
];

export default function ConhecaJesusPage() {
  return (
    <>
      <PageHero
        titulo="Conheça Jesus"
        subtitulo="Se você chegou até aqui procurando entender o que os cristãos creem, esta página foi escrita para você. Sem pressa, sem cobrança."
        trilha={[{ rotulo: "Conheça Jesus" }]}
      />

      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-xl leading-relaxed text-fg-muted">
                O Evangelho não é um conjunto de regras a cumprir nem uma exigência de
                que você melhore antes de se aproximar de Deus. É uma notícia — e uma
                notícia boa. Ela se resume em cinco pontos.
              </p>
            </Reveal>

            <ol className="mt-16 space-y-16">
              {PASSOS.map((passo, i) => (
                <Reveal as="li" key={passo.titulo}>
                  <span
                    aria-hidden="true"
                    data-numeric
                    className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-primary"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h2 className="mt-3 text-balance text-2xl font-semibold md:text-3xl">
                    {passo.titulo}
                  </h2>

                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-fg-muted">
                    {passo.texto}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-fg-subtle">{passo.referencia}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Oração */}
      <section className="relative overflow-hidden bg-[var(--mepb-navy-900)] text-white section-y">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
        <Tocha
          className="absolute -right-8 top-1/2 h-[26rem] w-auto -translate-y-1/2 text-white"
          opacidade={0.05}
        />

        <div className="container-portal relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold text-white">
              Uma oração, se você quiser fazer sua
            </h2>
            <p className="mt-5 leading-relaxed text-white/75">
              Não há poder nas palavras em si — o que importa é a sinceridade de quem
              ora. Se estas palavras traduzem o que vai no seu coração, faça-as suas.
            </p>

            <blockquote className="mt-12 rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.05] px-8 py-12 backdrop-blur-sm">
              <p className="font-serif text-xl leading-relaxed text-white md:text-2xl">
                “Senhor Jesus, reconheço que preciso de ti. Sei que me afastei de Deus e
                que não consigo, por mim mesmo, consertar isso. Creio que morreste na
                cruz por mim e que ressuscitaste. Peço que me perdoes e que assumas o
                comando da minha vida a partir de hoje. Amém.”
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Próximos passos */}
      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold">E agora?</h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              A fé cristã não se vive sozinho. Se você fez essa oração, ou se ainda tem
              dúvidas e quer conversar, o próximo passo é encontrar pessoas com quem
              caminhar.
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                titulo: "Encontre uma igreja",
                texto: "Veja qual igreja MEPB está mais perto de você e visite quando quiser.",
                href: "/igrejas",
                rotulo: "Buscar igreja",
              },
              {
                titulo: "Peça uma conversa",
                texto: "Se preferir, alguém da igreja mais próxima entra em contato com você.",
                href: "/participe",
                rotulo: "Quero uma visita",
              },
              {
                titulo: "Peça oração",
                texto: "Conte o que está vivendo. Nossa equipe de intercessão ora por você.",
                href: "/oracao",
                rotulo: "Enviar pedido",
              },
            ].map((passo, i) => (
              <Reveal as="li" key={passo.titulo} atraso={i * 90}>
                <Card className="h-full">
                  <CardCorpo className="flex h-full flex-col p-7">
                    <h3 className="text-lg font-semibold">{passo.titulo}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                      {passo.texto}
                    </p>
                    <BotaoLink href={passo.href} variante="contorno" className="mt-6">
                      {passo.rotulo}
                    </BotaoLink>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>

          <div className="mt-20">
            <Versiculo
              texto="Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei."
              referencia="Mateus 11.28"
            />
          </div>
        </div>
      </section>
    </>
  );
}
