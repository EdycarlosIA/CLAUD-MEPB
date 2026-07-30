"use client";

import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { AvisoPrototipo } from "@/components/admin/UI";
import { Selo } from "@/components/ui/Selo";
import { MIDIAS } from "@/content/midia";
import type { Midia } from "@/content/types";
import { formatarDataCurta } from "@/lib/utils";

export default function AdminMidiaPage() {
  return (
    <PaginaCrud<Midia>
      titulo="Mídia"
      descricao="Conteúdos da TV MEPB: mensagens, séries, podcasts, lives e documentários."
      rotuloNovo="Novo conteúdo"
      registros={[...MIDIAS].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())}
      camposBusca={(m) => [m.titulo, m.preletor, m.tipo, m.serie, m.descricao]}
      colunas={[
        { chave: "titulo", rotulo: "Título" },
        { chave: "tipo", rotulo: "Tipo" },
        { chave: "serie", rotulo: "Série" },
        { chave: "preletor", rotulo: "Preletor" },
        { chave: "duracao", rotulo: "Duração", alinhamento: "direita" },
        { chave: "data", rotulo: "Publicação", alinhamento: "direita" },
      ]}
      linha={(midia) => ({
        titulo: (
          <Link
            href={`/tv/${midia.slug}`}
            className="line-clamp-1 font-medium hover:text-primary hover:underline"
          >
            {midia.titulo}
          </Link>
        ),
        tipo: <Selo tom="azul">{midia.tipo}</Selo>,
        serie: <span className="text-fg-muted">{midia.serie ?? "—"}</span>,
        preletor: <span className="whitespace-nowrap text-fg-muted">{midia.preletor}</span>,
        duracao: (
          <span data-numeric className="whitespace-nowrap text-fg-muted">
            {midia.duracao}
          </span>
        ),
        data: (
          <span data-numeric className="whitespace-nowrap text-fg-muted">
            {formatarDataCurta(midia.data)}
          </span>
        ),
      })}
      aviso={
        <AvisoPrototipo>
          <span className="inline-flex items-center gap-2">
            <UploadCloud aria-hidden="true" className="h-4 w-4 shrink-0" />
            Os vídeos ficam hospedados no canal oficial do YouTube; o portal armazena
            apenas os metadados e a capa. Arquivos de imagem e PDF vão para o gerenciador
            de mídia do CMS.
          </span>
        </AvisoPrototipo>
      }
    />
  );
}
