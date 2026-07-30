import Link from "next/link";
import { BotaoLink } from "@/components/ui/Botao";
import { Tocha } from "@/components/marca/Tocha";

export const metadata = {
  title: "Página não encontrada",
};

/** Página 404 — oferece caminhos úteis em vez de apenas informar o erro. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-[var(--mepb-navy-900)] pt-[var(--nav-height)] text-white">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
      <Tocha
        className="absolute -right-8 top-1/2 h-[28rem] w-auto -translate-y-1/2 text-white"
        opacidade={0.06}
      />

      <div className="container-portal relative py-20">
        <div className="max-w-2xl">
          <p data-numeric className="font-serif text-7xl font-semibold text-[var(--mepb-red-400)]">
            404
          </p>

          <h1 className="mt-6 text-balance text-3xl font-semibold text-white md:text-4xl">
            Não encontramos esta página
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-white/75">
            O endereço pode ter mudado ou o conteúdo pode ter sido movido. Abaixo estão
            os caminhos mais procurados no portal.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <BotaoLink href="/" variante="primario" tamanho="lg">
              Voltar ao início
            </BotaoLink>
            <BotaoLink href="/igrejas" variante="claro" tamanho="lg">
              Encontre uma Igreja
            </BotaoLink>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-sm">
            {[
              { rotulo: "Sobre a MEPB", href: "/sobre" },
              { rotulo: "Notícias", href: "/noticias" },
              { rotulo: "Agenda", href: "/agenda" },
              { rotulo: "Biblioteca", href: "/biblioteca" },
              { rotulo: "Contato", href: "/contato" },
              { rotulo: "Mapa do Site", href: "/mapa-do-site" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/75 hover:text-white hover:underline">
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
