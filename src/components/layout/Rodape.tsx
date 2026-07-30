import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { NAV_LEGAL, NAV_RODAPE, SITE } from "@/content/site";
import { Logo } from "@/components/marca/Logo";
import { Tocha } from "@/components/marca/Tocha";

/** Rodapé institucional: quatro colunas de navegação, dados da sede e faixa legal. */
export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[var(--footer-bg)] text-[var(--footer-fg)]">
      {/* Marca d'água da tocha — assinatura visual, sem repetir a logomarca */}
      <Tocha
        className="absolute -right-8 top-1/2 h-[26rem] w-auto -translate-y-1/2 text-white"
        opacidade={0.04}
      />

      <div className="container-portal relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Identidade + versículo */}
          <div className="max-w-sm">
            <Logo invertida />
            <p className="mt-6 text-sm leading-relaxed">
              Desde {SITE.fundacao}, anunciando o Evangelho de Jesus Cristo em todo o
              território nacional e entre as nações.
            </p>
            <blockquote className="mt-6 border-l-2 border-[var(--footer-border)] pl-4">
              <p className="font-serif text-[0.9375rem] italic leading-relaxed text-[var(--footer-fg-strong)]">
                “{SITE.versiculoInstitucional.texto}”
              </p>
              <cite className="mt-2 block text-xs font-semibold not-italic tracking-wider">
                {SITE.versiculoInstitucional.referencia}
              </cite>
            </blockquote>

            <ul className="mt-8 flex gap-2">
              {[
                { href: SITE.redes.instagram, Icone: Instagram, nome: "Instagram" },
                { href: SITE.redes.facebook, Icone: Facebook, nome: "Facebook" },
                { href: SITE.redes.youtube, Icone: Youtube, nome: "YouTube" },
              ].map(({ href, Icone, nome }) => (
                <li key={nome}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${nome} da MEPB (abre em nova aba)`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--footer-border)] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icone aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colunas de navegação */}
          {NAV_RODAPE.map((coluna) => (
            <nav key={coluna.titulo} aria-labelledby={`rodape-${coluna.titulo}`}>
              <h2
                id={`rodape-${coluna.titulo}`}
                className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--footer-fg-strong)]"
              >
                {coluna.titulo}
              </h2>
              <ul className="mt-5 space-y-1">
                {coluna.itens.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-9 items-center text-sm transition-colors hover:text-white hover:underline"
                    >
                      {item.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Sede nacional */}
        <div className="mt-16 grid gap-6 border-t border-[var(--footer-border)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--footer-fg-strong)]">
              {SITE.sede.titulo}
            </h2>
            <address className="mt-4 flex gap-3 text-sm not-italic leading-relaxed">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {SITE.sede.endereco}
                <br />
                {SITE.sede.cidade}/{SITE.sede.uf} — CEP {SITE.sede.cep}
              </span>
            </address>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--footer-fg-strong)]">
              Contato
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`tel:+55${SITE.sede.telefone.replace(/\D/g, "")}`} className="flex min-h-9 items-center gap-3 hover:text-white">
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {SITE.sede.telefone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.sede.email}`} className="flex min-h-9 items-center gap-3 hover:text-white">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {SITE.sede.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--footer-fg-strong)]">
              Atendimento
            </h2>
            <p className="mt-4 text-sm leading-relaxed">{SITE.sede.horarioAtendimento}</p>
          </div>
        </div>
      </div>

      {/* Faixa legal */}
      <div className="border-t border-[var(--footer-border)]">
        <div className="container-portal flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {SITE.nome}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
