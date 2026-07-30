"use client";

import Link from "next/link";
import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { Selo } from "@/components/ui/Selo";
import { NOTICIAS_RECENTES } from "@/content/noticias";
import type { Noticia } from "@/content/types";
import { formatarDataCurta } from "@/lib/utils";

export default function AdminNoticiasPage() {
  return (
    <PaginaCrud<Noticia>
      titulo="Notícias"
      descricao="Matérias publicadas no portal pela Secretaria de Comunicação e pelos departamentos nacionais."
      rotuloNovo="Nova notícia"
      registros={NOTICIAS_RECENTES}
      camposBusca={(n) => [n.titulo, n.resumo, n.categoria, n.autor, n.tags.join(" ")]}
      colunas={[
        { chave: "titulo", rotulo: "Título" },
        { chave: "categoria", rotulo: "Categoria" },
        { chave: "autor", rotulo: "Autoria" },
        { chave: "situacao", rotulo: "Situação" },
        { chave: "data", rotulo: "Publicação", alinhamento: "direita" },
      ]}
      linha={(noticia) => ({
        titulo: (
          <Link
            href={`/noticias/${noticia.slug}`}
            className="line-clamp-1 font-medium hover:text-primary hover:underline"
          >
            {noticia.titulo}
          </Link>
        ),
        categoria: <Selo tom="neutro">{noticia.categoria}</Selo>,
        autor: <span className="whitespace-nowrap text-fg-muted">{noticia.autor}</span>,
        situacao: noticia.destaque ? (
          <Selo tom="primario">Destaque</Selo>
        ) : (
          <Selo tom="verde">Publicada</Selo>
        ),
        data: (
          <span data-numeric className="whitespace-nowrap text-fg-muted">
            {formatarDataCurta(noticia.data)}
          </span>
        ),
      })}
    />
  );
}
