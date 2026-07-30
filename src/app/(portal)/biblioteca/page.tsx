import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { PageHero } from "@/components/layout/Pagina";
import { ListaDocumentos } from "@/components/biblioteca/ListaDocumentos";
import { DOCUMENTOS } from "@/content/biblioteca";

export const metadata: Metadata = {
  title: "Biblioteca",
  description:
    "Estatuto, regimento interno, manuais, formulários, materiais de identidade visual, hinário e estudos oficiais da MEPB para download.",
};

export default function BibliotecaPage() {
  const publicos = DOCUMENTOS.filter((d) => !d.restrito).length;

  return (
    <>
      <PageHero
        compacto
        titulo="Biblioteca"
        subtitulo="Documentos oficiais, manuais, formulários e materiais da denominação, reunidos em um só lugar e sempre na versão mais recente."
        trilha={[{ rotulo: "Biblioteca" }]}
      >
        <ul className="flex flex-wrap gap-x-12 gap-y-4">
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {DOCUMENTOS.length}
            </span>
            <span className="text-sm text-white/70">materiais disponíveis</span>
          </li>
          <li>
            <span data-numeric className="block font-serif text-2xl font-semibold text-white">
              {publicos}
            </span>
            <span className="text-sm text-white/70">de acesso livre</span>
          </li>
        </ul>
      </PageHero>

      {/* Aviso sobre documentos restritos */}
      <div className="border-b border-line bg-bg-subtle">
        <div className="container-portal py-5">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
            <Lock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Materiais marcados como <strong className="font-semibold text-fg">restritos</strong>{" "}
              são de uso interno de obreiros credenciados e secretarias de igrejas
              filiadas. O acesso é liberado após autenticação na Área Administrativa.
            </span>
          </p>
        </div>
      </div>

      <ListaDocumentos />
    </>
  );
}
