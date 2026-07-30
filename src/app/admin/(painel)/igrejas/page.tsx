"use client";

import Link from "next/link";
import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { AvisoPrototipo } from "@/components/admin/UI";
import { Selo } from "@/components/ui/Selo";
import { IGREJAS, NOMES_UF } from "@/content/igrejas";
import type { Igreja } from "@/content/types";

const ROTULO_TIPO: Record<Igreja["tipo"], string> = {
  "sede-nacional": "Sede Nacional",
  "sede-estadual": "Sede Estadual",
  igreja: "Igreja",
  congregacao: "Congregação",
};

export default function AdminIgrejasPage() {
  return (
    <PaginaCrud<Igreja>
      titulo="Igrejas"
      descricao="Cadastro das igrejas e congregações filiadas à MEPB em todo o território nacional."
      rotuloNovo="Nova igreja"
      registros={IGREJAS}
      camposBusca={(i) => [i.nome, i.cidade, i.bairro, i.pastor.nome, NOMES_UF[i.uf]]}
      colunas={[
        { chave: "nome", rotulo: "Igreja" },
        { chave: "tipo", rotulo: "Tipo" },
        { chave: "local", rotulo: "Localidade" },
        { chave: "pastor", rotulo: "Pastor titular" },
        { chave: "fundacao", rotulo: "Fundação", alinhamento: "direita" },
      ]}
      linha={(igreja) => ({
        nome: (
          <Link
            href={`/igrejas/${igreja.slug}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {igreja.nome}
          </Link>
        ),
        tipo: (
          <Selo tom={igreja.tipo === "sede-nacional" ? "primario" : "neutro"}>
            {ROTULO_TIPO[igreja.tipo]}
          </Selo>
        ),
        local: (
          <span className="whitespace-nowrap text-fg-muted">
            {igreja.cidade}/{igreja.uf}
          </span>
        ),
        pastor: <span className="text-fg-muted">{igreja.pastor.nome}</span>,
        fundacao: (
          <span data-numeric className="text-fg-muted">
            {igreja.fundacao}
          </span>
        ),
      })}
      aviso={
        <AvisoPrototipo>
          O cadastro de igrejas é descentralizado: cada secretaria estadual mantém os
          registros do seu estado, e a Sede Nacional tem visão consolidada. As permissões
          por estado são definidas em <strong>Permissões</strong>.
        </AvisoPrototipo>
      }
    />
  );
}
