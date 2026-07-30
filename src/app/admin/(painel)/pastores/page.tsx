"use client";

import { PaginaCrud } from "@/components/admin/PaginaCrud";
import { AvisoPrototipo } from "@/components/admin/UI";
import { Selo } from "@/components/ui/Selo";
import { IGREJAS, NOMES_UF } from "@/content/igrejas";
import type { Igreja } from "@/content/types";

/**
 * No modelo de dados, o pastor titular é um campo da igreja. Esta tela apresenta
 * a mesma informação sob a ótica do obreiro — que é como a Secretaria trabalha
 * ao emitir e renovar credenciais.
 */
export default function AdminPastoresPage() {
  return (
    <PaginaCrud<Igreja>
      titulo="Pastores"
      descricao="Pastores titulares das igrejas filiadas, com a respectiva lotação e tempo de ministério na igreja atual."
      rotuloNovo="Novo pastor"
      registros={IGREJAS}
      camposBusca={(i) => [i.pastor.nome, i.nome, i.cidade, NOMES_UF[i.uf]]}
      colunas={[
        { chave: "nome", rotulo: "Nome" },
        { chave: "igreja", rotulo: "Igreja" },
        { chave: "local", rotulo: "Localidade" },
        { chave: "situacao", rotulo: "Credencial" },
        { chave: "desde", rotulo: "Titular desde", alinhamento: "direita" },
      ]}
      linha={(igreja) => ({
        nome: <span className="font-medium">{igreja.pastor.nome}</span>,
        igreja: <span className="text-fg-muted">{igreja.nome}</span>,
        local: (
          <span className="whitespace-nowrap text-fg-muted">
            {igreja.cidade}/{igreja.uf}
          </span>
        ),
        situacao: <Selo tom="verde">Ativa</Selo>,
        desde: (
          <span data-numeric className="text-fg-muted">
            {igreja.pastor.desde}
          </span>
        ),
      })}
      aviso={
        <AvisoPrototipo>
          A emissão e a renovação de credenciais ministeriais seguem o Regimento Interno.
          O formulário de requerimento está disponível na Biblioteca do portal.
        </AvisoPrototipo>
      }
    />
  );
}
