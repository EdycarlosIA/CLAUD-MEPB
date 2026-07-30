import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, TituloSecao } from "@/components/layout/Pagina";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Formulario } from "@/components/formularios/Formulario";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "LGPD — Portal do Titular",
  description:
    "Exerça seus direitos como titular de dados pessoais previstos na Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
};

const DIREITOS = [
  {
    titulo: "Confirmação e acesso",
    texto: "Saber se tratamos dados seus e obter cópia dos dados que temos.",
  },
  {
    titulo: "Correção",
    texto: "Solicitar a correção de dados incompletos, inexatos ou desatualizados.",
  },
  {
    titulo: "Anonimização ou eliminação",
    texto: "Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos.",
  },
  {
    titulo: "Portabilidade",
    texto: "Solicitar a portabilidade dos seus dados a outro fornecedor de serviço.",
  },
  {
    titulo: "Revogação do consentimento",
    texto: "Retirar, a qualquer momento, o consentimento que você havia fornecido.",
  },
  {
    titulo: "Informação sobre compartilhamento",
    texto: "Saber com quais entidades públicas ou privadas compartilhamos seus dados.",
  },
];

export default function LgpdPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="LGPD — Portal do Titular"
        subtitulo="A Lei nº 13.709/2018 garante a você o controle sobre os seus dados pessoais. Esta página explica seus direitos e como exercê-los."
        trilha={[{ rotulo: "LGPD" }]}
      />

      {/* Direitos */}
      <section className="section-y">
        <div className="container-portal">
          <TituloSecao
            sobretitulo="Seus direitos"
            titulo="O que a lei garante a você"
            descricao="Como titular de dados pessoais, você pode exercer os direitos abaixo a qualquer momento, gratuitamente."
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIREITOS.map((direito, i) => (
              <Reveal as="li" key={direito.titulo} atraso={(i % 3) * 70}>
                <Card className="h-full">
                  <CardCorpo>
                    <h3 className="font-semibold">{direito.titulo}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{direito.texto}</p>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Encarregado */}
      <section className="border-y border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl">
            <h2 className="rule-accent text-2xl font-semibold">Encarregado pelo tratamento de dados</h2>

            <p className="mt-6 leading-relaxed text-fg-muted">
              A {SITE.sigla} designou um encarregado (DPO) responsável por receber
              comunicações dos titulares e da Autoridade Nacional de Proteção de Dados.
            </p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-fg-subtle">
                  E-mail do encarregado
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${SITE.sede.email}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {SITE.sede.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-fg-subtle">
                  Endereço postal
                </dt>
                <dd className="mt-1.5 text-fg-muted">
                  {SITE.sede.endereco} — {SITE.sede.cidade}/{SITE.sede.uf}, CEP {SITE.sede.cep}
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-sm leading-relaxed text-fg-muted">
              O prazo de resposta é de até 15 dias, conforme o artigo 19 da LGPD. Para
              entender como tratamos seus dados, consulte também a{" "}
              <Link href="/privacidade" className="font-semibold text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Requerimento */}
      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl">
            <TituloSecao
              titulo="Requerimento do titular"
              descricao="Use o formulário abaixo para registrar formalmente uma solicitação relacionada aos seus dados pessoais."
            />

            <div className="mt-10">
              <Formulario
                rotuloEnvio="Registrar requerimento"
                mensagemSucesso="Seu requerimento foi registrado e encaminhado ao encarregado pelo tratamento de dados. O prazo de resposta é de até 15 dias."
                nota="Para atender à sua solicitação, precisamos confirmar sua identidade. Podemos entrar em contato pedindo informações adicionais antes de dar seguimento ao requerimento."
                campos={[
                  {
                    tipo: "select",
                    nome: "direito",
                    rotulo: "Qual direito você deseja exercer",
                    obrigatorio: true,
                    opcoes: [
                      "Confirmação e acesso aos dados",
                      "Correção de dados",
                      "Anonimização, bloqueio ou eliminação",
                      "Portabilidade",
                      "Revogação do consentimento",
                      "Informação sobre compartilhamento",
                    ],
                  },
                  {
                    tipo: "texto",
                    nome: "nome",
                    rotulo: "Nome completo",
                    obrigatorio: true,
                    largura: "metade",
                  },
                  {
                    tipo: "email",
                    nome: "email",
                    rotulo: "E-mail cadastrado",
                    obrigatorio: true,
                    ajuda: "Informe o mesmo e-mail usado no cadastro original.",
                    largura: "metade",
                  },
                  {
                    tipo: "textarea",
                    nome: "detalhamento",
                    rotulo: "Detalhamento do pedido",
                    obrigatorio: true,
                    placeholder: "Descreva com clareza o que você está solicitando.",
                  },
                  {
                    tipo: "checkbox",
                    nome: "veracidade",
                    rotulo: "Declaro que as informações prestadas são verdadeiras e que sou o titular dos dados ou seu representante legal.",
                    obrigatorio: true,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
