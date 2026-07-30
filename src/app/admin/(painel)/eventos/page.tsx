"use client";

import Link from "next/link";
import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { Selo } from "@/components/ui/Selo";
import { EVENTOS_ORDENADOS } from "@/content/eventos";
import type { Evento } from "@/content/types";
import { formatarPeriodo } from "@/lib/utils";

export default function AdminEventosPage() {
  return (
    <PaginaCrud<Evento>
      titulo="Eventos"
      descricao="Agenda nacional: convenções, congressos, seminários, retiros e capacitações."
      rotuloNovo="Novo evento"
      registros={EVENTOS_ORDENADOS}
      camposBusca={(e) => [e.titulo, e.cidade, e.local, e.tipo, e.publico]}
      colunas={[
        { chave: "titulo", rotulo: "Evento" },
        { chave: "tipo", rotulo: "Tipo" },
        { chave: "periodo", rotulo: "Período" },
        { chave: "local", rotulo: "Localidade" },
        { chave: "inscricoes", rotulo: "Inscrições" },
      ]}
      linha={(evento) => ({
        titulo: (
          <Link
            href={`/agenda/${evento.slug}`}
            className="line-clamp-1 font-medium hover:text-primary hover:underline"
          >
            {evento.titulo}
          </Link>
        ),
        tipo: <Selo tom="azul">{evento.tipo}</Selo>,
        periodo: (
          <span className="whitespace-nowrap text-fg-muted">
            {formatarPeriodo(evento.dataInicio, evento.dataFim)}
          </span>
        ),
        local: (
          <span className="whitespace-nowrap text-fg-muted">
            {evento.cidade}/{evento.uf}
          </span>
        ),
        inscricoes: evento.inscricoesAbertas ? (
          <Selo tom="verde">Abertas</Selo>
        ) : (
          <Selo tom="neutro">Encerradas</Selo>
        ),
      })}
    />
  );
}
