"use client";

import Link from "next/link";
import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { AvisoPrototipo } from "@/components/admin/UI";
import { Selo } from "@/components/ui/Selo";
import { MISSIONARIOS } from "@/content/missoes";
import type { Missionario } from "@/content/types";

export default function AdminMissionariosPage() {
  return (
    <PaginaCrud<Missionario>
      titulo="Missionários"
      descricao="Obreiros enviados e sustentados pela denominação, no Brasil e no exterior."
      rotuloNovo="Novo missionário"
      registros={MISSIONARIOS}
      camposBusca={(m) => [m.nome, m.pais, m.campo, m.continente]}
      colunas={[
        { chave: "nome", rotulo: "Missionário" },
        { chave: "campo", rotulo: "Campo" },
        { chave: "pais", rotulo: "País" },
        { chave: "continente", rotulo: "Continente" },
        { chave: "desde", rotulo: "No campo desde", alinhamento: "direita" },
      ]}
      linha={(missionario) => ({
        nome: (
          <Link
            href={`/missoes/${missionario.slug}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {missionario.nome}
          </Link>
        ),
        campo: <span className="line-clamp-1 text-fg-muted">{missionario.campo}</span>,
        pais: <Selo tom="neutro">{missionario.pais}</Selo>,
        continente: (
          <span className="whitespace-nowrap text-fg-muted">{missionario.continente}</span>
        ),
        desde: (
          <span data-numeric className="text-fg-muted">
            {missionario.desde}
          </span>
        ),
      })}
      aviso={
        <AvisoPrototipo>
          Os pedidos de oração exibidos no portal são atualizados pelos próprios
          missionários, a partir do perfil de acesso concedido em <strong>Permissões</strong>.
        </AvisoPrototipo>
      }
    />
  );
}
