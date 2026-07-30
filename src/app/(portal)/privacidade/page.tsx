import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/Pagina";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Missão Evangélica Pentecostal do Brasil coleta, usa, armazena e protege os dados pessoais dos usuários do portal.",
};

/**
 * Modelo de política de privacidade para o protótipo.
 * O texto final deve ser revisado por assessoria jurídica antes da publicação.
 */
const SECOES = [
  {
    titulo: "1. Quem somos",
    paragrafos: [
      `A ${SITE.nome} (${SITE.sigla}) é uma instituição religiosa sem fins lucrativos, com sede em ${SITE.sede.cidade}/${SITE.sede.uf}, responsável pelo tratamento dos dados pessoais coletados neste portal.`,
      `Contato do encarregado pelo tratamento de dados: ${SITE.sede.email}.`,
    ],
  },
  {
    titulo: "2. Quais dados coletamos",
    paragrafos: [
      "Coletamos apenas os dados que você fornece voluntariamente ao preencher um dos formulários do portal — pedido de oração, solicitação de visita, inscrição em eventos ou contato geral.",
      "Esses dados podem incluir: nome, e-mail, telefone, cidade, estado, igreja de origem e o conteúdo da mensagem enviada.",
      "Não coletamos dados sensíveis de forma automatizada nem utilizamos cookies de rastreamento publicitário ou de perfilamento comportamental.",
    ],
  },
  {
    titulo: "3. Para que usamos seus dados",
    paragrafos: [
      "Os dados são usados exclusivamente para a finalidade informada no momento da coleta: responder à sua mensagem, encaminhar seu pedido à igreja local mais próxima, processar sua inscrição em um evento ou levar seu pedido de oração à equipe de intercessão.",
      "Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins comerciais.",
    ],
  },
  {
    titulo: "4. Base legal",
    paragrafos: [
      "O tratamento dos seus dados se fundamenta no consentimento que você fornece ao marcar a caixa de autorização nos formulários, nos termos do artigo 7º, inciso I, da Lei nº 13.709/2018 (LGPD).",
      "Em alguns casos, o tratamento pode se basear no legítimo interesse da instituição para a manutenção de seus registros administrativos e no cumprimento de obrigação legal ou regulatória.",
    ],
  },
  {
    titulo: "5. Compartilhamento interno",
    paragrafos: [
      "Solicitações de visita e pedidos de oração podem ser encaminhados à igreja MEPB da sua região, para que o atendimento aconteça presencialmente.",
      "Pedidos de oração marcados como confidenciais são vistos apenas pela coordenação nacional de intercessão.",
    ],
  },
  {
    titulo: "6. Por quanto tempo guardamos",
    paragrafos: [
      "Os dados são mantidos pelo tempo necessário ao cumprimento da finalidade para a qual foram coletados, ou pelo prazo exigido por obrigação legal.",
      "Você pode solicitar a exclusão dos seus dados a qualquer momento, salvo quando houver dever legal de retenção.",
    ],
  },
  {
    titulo: "7. Segurança",
    paragrafos: [
      "Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não autorizado, perda, alteração ou divulgação indevida — incluindo controle de acesso por perfil na Área Administrativa e transmissão criptografada.",
    ],
  },
  {
    titulo: "8. Seus direitos",
    paragrafos: [
      "A LGPD garante a você o direito de confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou desatualizados, solicitar anonimização ou eliminação, revogar o consentimento e obter informação sobre compartilhamentos.",
      "Para exercer qualquer desses direitos, consulte a página LGPD deste portal.",
    ],
  },
  {
    titulo: "9. Alterações desta política",
    paragrafos: [
      "Esta política pode ser atualizada. A data da última revisão é sempre informada no rodapé desta página. Alterações relevantes serão comunicadas no portal.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        compacto
        titulo="Política de Privacidade"
        subtitulo="Como coletamos, usamos e protegemos os dados pessoais fornecidos pelos usuários deste portal."
        trilha={[{ rotulo: "Política de Privacidade" }]}
      />

      <section className="section-y">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl">
            <p className="rounded-[var(--radius-lg)] border border-line bg-bg-subtle p-5 text-sm leading-relaxed text-fg-muted">
              <strong className="font-semibold text-fg">Aviso do protótipo:</strong> este
              é um texto modelo, elaborado para a demonstração. O documento definitivo
              deve ser revisado por assessoria jurídica antes da publicação.
            </p>

            <div className="mt-12 space-y-12">
              {SECOES.map((secao) => (
                <section key={secao.titulo}>
                  <h2 className="text-xl font-semibold md:text-2xl">{secao.titulo}</h2>
                  <div className="mt-4 space-y-4">
                    {secao.paragrafos.map((paragrafo, i) => (
                      <p key={i} className="leading-relaxed text-fg-muted">
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 border-t border-line pt-8 text-sm text-fg-subtle">
              <p>Última revisão: julho de 2026.</p>
              <p className="mt-2">
                Para exercer seus direitos como titular de dados, acesse a{" "}
                <Link href="/lgpd" className="font-semibold text-primary hover:underline">
                  página LGPD
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
