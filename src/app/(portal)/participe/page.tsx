import type { Metadata } from "next";
import { PageHero, TituloSecao } from "@/components/layout/Pagina";
import { Formulario } from "@/components/formularios/Formulario";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Quero Participar",
  description:
    "Peça uma visita pastoral, informe-se sobre membresia ou coloque-se à disposição para servir em um ministério da MEPB.",
};

const CAMINHOS = [
  {
    titulo: "Quero uma visita",
    texto:
      "Alguém da igreja MEPB mais próxima entra em contato para combinar uma conversa — na sua casa, em um lugar público ou por telefone, como você preferir.",
  },
  {
    titulo: "Quero ser membro",
    texto:
      "A membresia acontece após profissão de fé, batismo em águas por imersão e um período de acompanhamento conduzido pela igreja local.",
  },
  {
    titulo: "Quero servir",
    texto:
      "Todo membro pode servir. Diga em qual departamento você se identifica e a liderança local conversa com você sobre os próximos passos.",
  },
];

export default function ParticipePage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Quero Participar"
        subtitulo="Seja para conhecer, para se tornar membro ou para servir — este é o formulário certo. Não há compromisso nenhum em preenchê-lo."
        trilha={[{ rotulo: "Quero Participar" }]}
      />

      {/* Caminhos */}
      <section className="border-b border-line bg-bg-subtle section-y">
        <div className="container-portal">
          <TituloSecao titulo="Três caminhos, um mesmo formulário" centralizado />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {CAMINHOS.map((caminho, i) => (
              <Reveal as="li" key={caminho.titulo} atraso={i * 90}>
                <Card className="h-full">
                  <CardCorpo className="p-7">
                    <span
                      aria-hidden="true"
                      data-numeric
                      className="font-serif text-3xl font-semibold text-line-strong"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{caminho.titulo}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{caminho.texto}</p>
                  </CardCorpo>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulário */}
      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl">
            <TituloSecao
              titulo="Fale com a gente"
              descricao="Preencha os campos abaixo. Sua mensagem é encaminhada à igreja MEPB mais próxima da cidade que você informar."
            />

            <div className="mt-10">
              <Formulario
                rotuloEnvio="Enviar solicitação"
                mensagemSucesso="Sua solicitação foi encaminhada à igreja mais próxima de você. Em breve alguém entrará em contato."
                nota="Seus dados são usados exclusivamente para o encaminhamento desta solicitação à igreja local, conforme a Política de Privacidade e a LGPD."
                campos={[
                  {
                    tipo: "select",
                    nome: "interesse",
                    rotulo: "O que você procura",
                    obrigatorio: true,
                    opcoes: [
                      "Quero uma visita",
                      "Quero ser membro",
                      "Quero servir em um ministério",
                      "Quero transferir minha membresia",
                      "Tenho outra dúvida",
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
                    rotulo: "E-mail",
                    obrigatorio: true,
                    placeholder: "nome@exemplo.com.br",
                    largura: "metade",
                  },
                  {
                    tipo: "tel",
                    nome: "telefone",
                    rotulo: "Telefone ou WhatsApp",
                    obrigatorio: true,
                    placeholder: "(00) 00000-0000",
                    ajuda: "É por aqui que a igreja vai te procurar.",
                    largura: "metade",
                  },
                  {
                    tipo: "texto",
                    nome: "cidade",
                    rotulo: "Cidade e estado",
                    obrigatorio: true,
                    placeholder: "Ex.: Natal/RN",
                    ajuda: "Usamos para encontrar a igreja mais próxima.",
                    largura: "metade",
                  },
                  {
                    tipo: "select",
                    nome: "departamento",
                    rotulo: "Departamento de interesse",
                    ajuda: "Preencha apenas se quiser servir em uma área específica.",
                    opcoes: [
                      "Homens",
                      "Mulheres",
                      "Jovens",
                      "Adolescentes",
                      "Crianças",
                      "Louvor",
                      "Missões",
                      "Educação",
                      "Evangelismo",
                      "Ainda não sei",
                    ],
                  },
                  {
                    tipo: "textarea",
                    nome: "mensagem",
                    rotulo: "Sua mensagem",
                    placeholder: "Conte um pouco sobre você e sobre o que está buscando.",
                  },
                  {
                    tipo: "checkbox",
                    nome: "consentimento",
                    rotulo: "Autorizo o contato da MEPB e o uso dos meus dados para esta finalidade, conforme a Política de Privacidade.",
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
