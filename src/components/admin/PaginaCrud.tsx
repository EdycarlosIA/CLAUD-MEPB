"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Download, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { CabecalhoAdmin, Painel, Tabela } from "@/components/admin/UI";
import { contem } from "@/lib/utils";

/**
 * Tela de listagem/gestão reutilizada por todas as coleções do painel.
 *
 * Cada página de CRUD fornece as colunas e os registros já formatados; a busca,
 * a paginação visual e a coluna de ações ficam aqui. Concentrar esse padrão em
 * um componente evita sete telas quase idênticas divergindo com o tempo.
 */
export function PaginaCrud<T>({
  titulo,
  descricao,
  rotuloNovo,
  registros,
  colunas,
  linha,
  camposBusca,
  aviso,
}: {
  titulo: string;
  descricao: string;
  rotuloNovo: string;
  registros: T[];
  colunas: { chave: string; rotulo: string; alinhamento?: "esquerda" | "direita" }[];
  /** Converte um registro em células da tabela. */
  linha: (registro: T) => Record<string, ReactNode>;
  /** Campos considerados na busca textual. */
  camposBusca: (registro: T) => (string | undefined)[];
  aviso?: ReactNode;
}) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(
    () => registros.filter((r) => contem(busca, ...camposBusca(r))),
    [registros, busca, camposBusca],
  );

  /** Coluna de ações, comum a todas as listagens. */
  const colunasComAcoes = [...colunas, { chave: "acoes", rotulo: "Ações", alinhamento: "direita" as const }];

  const linhas = filtrados.map((registro) => ({
    ...linha(registro),
    acoes: (
      <div className="flex justify-end gap-1">
        <button
          type="button"
          aria-label="Editar registro"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-fg-muted transition-colors hover:bg-bg-muted hover:text-accent"
        >
          <Pencil aria-hidden="true" className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Excluir registro"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-fg-muted transition-colors hover:bg-bg-muted hover:text-danger"
        >
          <Trash2 aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    ),
  }));

  return (
    <>
      <CabecalhoAdmin
        titulo={titulo}
        descricao={descricao}
        acao={
          <div className="flex gap-2">
            <Botao variante="contorno">
              <Download aria-hidden="true" className="h-4 w-4" />
              Exportar
            </Botao>
            <Botao variante="primario">
              <Plus aria-hidden="true" className="h-4 w-4" />
              {rotuloNovo}
            </Botao>
          </div>
        }
      />

      {aviso}

      <Painel titulo="Registros" descricao={`${filtrados.length} de ${registros.length} registros`}>
        <div className="mb-6 max-w-sm">
          <label htmlFor="busca-crud" className="sr-only">
            Buscar registros
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-fg-subtle"
            />
            <input
              id="busca-crud"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar…"
              className="min-h-[var(--tap-target)] w-full rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-bg)] py-2.5 pl-11 pr-4 text-sm placeholder:text-[var(--field-placeholder)]"
            />
          </div>
        </div>

        <div aria-live="polite" className="sr-only">
          {filtrados.length} registros encontrados
        </div>

        <Tabela
          colunas={colunasComAcoes}
          linhas={linhas}
          larguraMinima="52rem"
          vazio="Nenhum registro corresponde à sua busca."
        />

        {/* Paginação — visual apenas, já que o protótipo carrega tudo de uma vez */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-sm">
          <p className="text-fg-muted">
            Exibindo <strong className="font-semibold text-fg">{filtrados.length}</strong>{" "}
            {filtrados.length === 1 ? "registro" : "registros"}
          </p>

          <div className="flex gap-1.5">
            <button
              type="button"
              disabled
              className="min-h-10 rounded-[var(--radius-md)] border border-line px-4 font-medium text-fg-subtle disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--mepb-navy-900)] px-3 font-semibold text-white">
              1
            </span>
            <button
              type="button"
              disabled
              className="min-h-10 rounded-[var(--radius-md)] border border-line px-4 font-medium text-fg-subtle disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </Painel>
    </>
  );
}
