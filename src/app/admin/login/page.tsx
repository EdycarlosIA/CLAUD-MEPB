import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/marca/Logo";
import { Tocha } from "@/components/marca/Tocha";
import { FormularioLogin } from "@/components/admin/FormularioLogin";

export const metadata: Metadata = {
  title: "Entrar — Área Administrativa",
  robots: { index: false, follow: false },
};

/** Tela de autenticação. Fica fora do grupo `(painel)`, por isso não tem lateral. */
export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Painel institucional — só a partir de lg, para não roubar espaço no mobile */}
      <aside className="relative hidden overflow-hidden bg-[var(--mepb-navy-900)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
        <Tocha
          className="absolute -right-10 top-1/2 h-[34rem] w-auto -translate-y-1/2 text-white"
          opacidade={0.06}
        />

        <div className="relative">
          <Logo invertida />
        </div>

        <div className="relative max-w-md">
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-white">
            Área Administrativa do Portal
          </h2>
          <p className="mt-5 leading-relaxed text-white/70">
            Espaço reservado às secretarias estaduais e à Sede Nacional para o cadastro
            de igrejas, pastores, eventos, notícias e missionários.
          </p>
        </div>

        <blockquote className="relative border-l-2 border-[var(--mepb-red-400)] pl-5">
          <p className="font-serif italic leading-relaxed text-white/90">
            “Faça-se tudo decentemente e com ordem.”
          </p>
          <cite className="mt-2 block text-xs font-bold uppercase not-italic tracking-[0.16em] text-white/55">
            1 Coríntios 14.40
          </cite>
        </blockquote>
      </aside>

      {/* Formulário */}
      <main id="conteudo" className="flex items-center justify-center bg-bg px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Voltar ao portal
          </Link>

          <div className="mt-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="mt-8 text-2xl font-semibold md:text-3xl">Entrar no painel</h1>
          <p className="mt-3 text-fg-muted">
            Use as credenciais fornecidas pela Secretaria da Sede Nacional.
          </p>

          <div className="mt-8">
            <FormularioLogin />
          </div>
        </div>
      </main>
    </div>
  );
}
