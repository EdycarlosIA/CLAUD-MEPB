import type { Metadata } from "next";
import { PageHero, Versiculo } from "@/components/layout/Pagina";
import { Formulario } from "@/components/formularios/Formulario";
import { Card, CardCorpo } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Pedido de Oração",
  description:
    "Envie seu pedido de oração. Nossa equipe de intercessão ora por cada pedido recebido, com total sigilo.",
};

export default function OracaoPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Pedido de Oração"
        subtitulo="Você não precisa passar por isso sozinho. Envie seu pedido — ele será levado a Deus pela nossa equipe de intercessão."
        trilha={[{ rotulo: "Pedido de Oração" }]}
      />

      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <Formulario
              rotuloEnvio="Enviar pedido de oração"
              mensagemSucesso="Seu pedido foi recebido e será levado à nossa equipe de intercessão. Que o Senhor te sustente."
              nota="Seus dados são usados apenas para o atendimento do pedido e para eventual retorno, conforme a Política de Privacidade e a LGPD. Pedidos marcados como confidenciais são vistos somente pela coordenação de intercessão."
              campos={[
                {
                  tipo: "texto",
                  nome: "nome",
                  rotulo: "Seu nome",
                  obrigatorio: true,
                  placeholder: "Como podemos chamá-lo",
                  largura: "metade",
                },
                {
                  tipo: "email",
                  nome: "email",
                  rotulo: "E-mail",
                  obrigatorio: true,
                  placeholder: "nome@exemplo.com.br",
                  ajuda: "Usamos apenas para retornar, se você desejar.",
                  largura: "metade",
                },
                {
                  tipo: "tel",
                  nome: "telefone",
                  rotulo: "Telefone ou WhatsApp",
                  placeholder: "(00) 00000-0000",
                  largura: "metade",
                },
                {
                  tipo: "texto",
                  nome: "cidade",
                  rotulo: "Cidade e estado",
                  placeholder: "Ex.: Natal/RN",
                  largura: "metade",
                },
                {
                  tipo: "select",
                  nome: "motivo",
                  rotulo: "Assunto do pedido",
                  obrigatorio: true,
                  opcoes: [
                    "Saúde",
                    "Família",
                    "Trabalho e provisão",
                    "Vida espiritual",
                    "Luto",
                    "Vícios e libertação",
                    "Gratidão e testemunho",
                    "Outro",
                  ],
                },
                {
                  tipo: "textarea",
                  nome: "pedido",
                  rotulo: "Seu pedido",
                  obrigatorio: true,
                  placeholder: "Escreva com liberdade. Não é preciso usar palavras difíceis.",
                },
                {
                  tipo: "checkbox",
                  nome: "confidencial",
                  rotulo: "Quero que meu pedido seja tratado de forma confidencial, visto apenas pela coordenação de intercessão.",
                },
                {
                  tipo: "checkbox",
                  nome: "consentimento",
                  rotulo: "Autorizo o uso dos meus dados para o atendimento deste pedido, conforme a Política de Privacidade.",
                  obrigatorio: true,
                },
              ]}
            />
          </div>

          <aside className="space-y-6">
            <Card>
              <CardCorpo>
                <h2 className="text-lg font-semibold">Como funciona</h2>
                <ol className="mt-5 space-y-4">
                  {[
                    "Seu pedido chega à coordenação nacional de intercessão.",
                    "A equipe ora por ele nas reuniões semanais de oração.",
                    "Se você autorizar, encaminhamos o pedido à igreja mais próxima da sua cidade para acompanhamento.",
                  ].map((etapa, i) => (
                    <li key={i} className="flex gap-3.5 text-sm leading-relaxed text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xs font-bold text-primary"
                      >
                        {i + 1}
                      </span>
                      {etapa}
                    </li>
                  ))}
                </ol>
              </CardCorpo>
            </Card>

            <Card>
              <CardCorpo>
                <Versiculo
                  texto="Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus."
                  referencia="Filipenses 4.6"
                  className="text-left [&>p]:text-lg [&>cite]:text-left"
                />
              </CardCorpo>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
