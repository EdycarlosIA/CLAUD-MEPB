import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/Pagina";
import { Formulario } from "@/components/formularios/Formulario";
import { Card, CardCorpo } from "@/components/ui/Card";
import { BotaoLink } from "@/components/ui/Botao";
import { SITE } from "@/content/site";
import { linkWhatsApp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Sede Nacional da Missão Evangélica Pentecostal do Brasil, em Natal/RN. Endereço, telefone, e-mail e formulário de contato.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Contato"
        subtitulo="Fale com a Sede Nacional. Para assuntos da sua igreja local, procure diretamente a liderança da congregação que você frequenta."
        trilha={[{ rotulo: "Contato" }]}
      />

      <div className="container-portal section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          {/* Formulário */}
          <div className="min-w-0">
            <h2 className="rule-accent text-2xl font-semibold">Envie uma mensagem</h2>

            <div className="mt-8">
              <Formulario
                rotuloEnvio="Enviar mensagem"
                mensagemSucesso="Sua mensagem chegou à Secretaria da Sede Nacional. Respondemos em até três dias úteis."
                nota="Seus dados são utilizados apenas para responder a esta mensagem, conforme a Política de Privacidade e a LGPD."
                campos={[
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
                    rotulo: "Telefone",
                    placeholder: "(00) 00000-0000",
                    largura: "metade",
                  },
                  {
                    tipo: "texto",
                    nome: "igreja",
                    rotulo: "Igreja de origem",
                    placeholder: "Se for membro de alguma igreja MEPB",
                    largura: "metade",
                  },
                  {
                    tipo: "select",
                    nome: "assunto",
                    rotulo: "Assunto",
                    obrigatorio: true,
                    opcoes: [
                      "Informações gerais",
                      "Secretaria e documentos",
                      "Filiação de igreja",
                      "Credencial ministerial",
                      "Eventos e inscrições",
                      "Missões",
                      "Comunicação e imprensa",
                      "Outro",
                    ],
                  },
                  {
                    tipo: "textarea",
                    nome: "mensagem",
                    rotulo: "Mensagem",
                    obrigatorio: true,
                    placeholder: "Descreva sua solicitação com o máximo de detalhes possível.",
                  },
                  {
                    tipo: "checkbox",
                    nome: "consentimento",
                    rotulo: "Autorizo o uso dos meus dados para o atendimento desta solicitação, conforme a Política de Privacidade.",
                    obrigatorio: true,
                  },
                ]}
              />
            </div>
          </div>

          {/* Dados da sede */}
          <aside className="space-y-6">
            <Card>
              <CardCorpo>
                <h2 className="text-lg font-semibold">{SITE.sede.titulo}</h2>

                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex gap-3.5">
                    <MapPin aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-primary" />
                    <address className="not-italic leading-relaxed text-fg-muted">
                      {SITE.sede.endereco}
                      <br />
                      {SITE.sede.cidade}/{SITE.sede.uf}
                      <br />
                      CEP {SITE.sede.cep}
                    </address>
                  </li>

                  <li className="flex gap-3.5">
                    <Phone aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-primary" />
                    <a
                      href={`tel:+55${SITE.sede.telefone.replace(/\D/g, "")}`}
                      className="text-fg-muted hover:text-fg hover:underline"
                    >
                      {SITE.sede.telefone}
                    </a>
                  </li>

                  <li className="flex gap-3.5">
                    <Mail aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-primary" />
                    <a
                      href={`mailto:${SITE.sede.email}`}
                      className="break-all text-fg-muted hover:text-fg hover:underline"
                    >
                      {SITE.sede.email}
                    </a>
                  </li>

                  <li className="flex gap-3.5">
                    <Clock aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-primary" />
                    <span className="leading-relaxed text-fg-muted">
                      {SITE.sede.horarioAtendimento}
                    </span>
                  </li>
                </ul>

                <BotaoLink
                  href={linkWhatsApp(SITE.sede.whatsapp)}
                  variante="primario"
                  larguraTotal
                  className="mt-7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Falar no WhatsApp
                </BotaoLink>
              </CardCorpo>
            </Card>

            <Card>
              <CardCorpo>
                <h2 className="text-lg font-semibold">Procurando outra coisa?</h2>
                <ul className="mt-4 space-y-1">
                  {[
                    { rotulo: "Encontrar uma igreja perto de mim", href: "/igrejas" },
                    { rotulo: "Enviar um pedido de oração", href: "/oracao" },
                    { rotulo: "Baixar documentos oficiais", href: "/biblioteca" },
                    { rotulo: "Ver perguntas frequentes", href: "/faq" },
                  ].map((atalho) => (
                    <li key={atalho.href}>
                      <BotaoLink href={atalho.href} variante="fantasma" larguraTotal className="justify-start">
                        {atalho.rotulo}
                      </BotaoLink>
                    </li>
                  ))}
                </ul>
              </CardCorpo>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
