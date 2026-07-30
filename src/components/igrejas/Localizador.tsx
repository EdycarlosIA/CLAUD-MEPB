"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { UF } from "@/content/types";
import {
  IGREJAS,
  NOMES_UF,
  UFS_COM_PRESENCA,
  UFS_DISPONIVEIS,
  cidadesPorUF,
} from "@/content/igrejas";
import { MapaBrasil } from "@/components/marca/MapaBrasil";
import { CardIgreja } from "@/components/cards";
import { EstadoVazio } from "@/components/layout/Pagina";
import { Botao } from "@/components/ui/Botao";
import { CampoSelect } from "@/components/ui/Campo";
import { cn, contem } from "@/lib/utils";

/**
 * Localizador de Igrejas.
 *
 * Decisões de UX registradas em `docs/01-arquitetura-da-informacao.md`:
 *  - os filtros são refletidos na URL (`?uf=RN&cidade=Natal&q=...`), de modo que
 *    um resultado possa ser compartilhado por WhatsApp — o canal real do público;
 *  - mobile-first: no celular a busca vem primeiro e o mapa fica abaixo da lista,
 *    porque quem está na rua quer o resultado, não o mapa;
 *  - a contagem de resultados é anunciada em `aria-live` a cada mudança de filtro.
 */
export function Localizador() {
  const router = useRouter();
  const params = useSearchParams();

  const [uf, setUf] = useState<UF | "">((params.get("uf") as UF) || "");
  const [cidade, setCidade] = useState(params.get("cidade") || "");
  const [busca, setBusca] = useState(params.get("q") || "");
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  // Reflete o estado dos filtros na URL, sem empilhar entradas no histórico.
  useEffect(() => {
    const novo = new URLSearchParams();
    if (uf) novo.set("uf", uf);
    if (cidade) novo.set("cidade", cidade);
    if (busca.trim()) novo.set("q", busca.trim());
    const query = novo.toString();
    router.replace(query ? `/igrejas?${query}` : "/igrejas", { scroll: false });
  }, [uf, cidade, busca, router]);

  const cidades = useMemo(() => (uf ? cidadesPorUF(uf) : []), [uf]);

  const contagemPorUF = useMemo(
    () =>
      IGREJAS.reduce<Partial<Record<UF, number>>>((acc, igreja) => {
        acc[igreja.uf] = (acc[igreja.uf] ?? 0) + 1;
        return acc;
      }, {}),
    [],
  );

  const resultados = useMemo(
    () =>
      IGREJAS.filter((igreja) => {
        if (uf && igreja.uf !== uf) return false;
        if (cidade && igreja.cidade !== cidade) return false;
        return contem(
          busca,
          igreja.nome,
          igreja.cidade,
          igreja.bairro,
          igreja.endereco,
          igreja.pastor.nome,
          NOMES_UF[igreja.uf],
        );
      }),
    [uf, cidade, busca],
  );

  const temFiltro = Boolean(uf || cidade || busca.trim());

  function limpar() {
    setUf("");
    setCidade("");
    setBusca("");
  }

  /** Trocar de estado invalida a cidade selecionada. */
  function trocarUf(novo: UF | "") {
    setUf(novo);
    setCidade("");
  }

  return (
    // Respiro superior menor que o padrão: o PageHero logo acima já separa
    // visualmente, e a barra de busca deve ficar ao alcance sem rolagem.
    <div className="container-portal pb-16 pt-10 md:pb-24 md:pt-12">
      {/* ---------------- Barra de busca ---------------- */}
      <div className="rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Busca textual */}
          <div className="flex-1">
            <label htmlFor="busca-igreja" className="mb-2 block text-sm font-semibold">
              Buscar por nome, cidade ou bairro
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle"
              />
              <input
                id="busca-igreja"
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Ex.: Natal, Tirol, Templo Central…"
                className={cn(
                  "min-h-[var(--tap-target)] w-full rounded-[var(--field-radius)] border border-[var(--field-border)]",
                  "bg-[var(--field-bg)] py-3 pl-12 pr-4 text-[0.9375rem]",
                  "placeholder:text-[var(--field-placeholder)]",
                )}
              />
            </div>
          </div>

          {/* Filtros — recolhidos no mobile para não empurrar os resultados */}
          <div
            className={cn(
              "gap-4 lg:flex lg:w-auto",
              filtrosAbertos ? "grid grid-cols-1 sm:grid-cols-2" : "hidden",
            )}
          >
            <CampoSelect
              id="filtro-uf"
              rotulo="Estado"
              value={uf}
              onChange={(e) => trocarUf(e.target.value as UF | "")}
              className="lg:w-52"
            >
              <option value="">Todos os estados</option>
              {UFS_DISPONIVEIS.map((sigla) => (
                <option key={sigla} value={sigla}>
                  {NOMES_UF[sigla]}
                </option>
              ))}
            </CampoSelect>

            <CampoSelect
              id="filtro-cidade"
              rotulo="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              disabled={!uf}
              ajuda={!uf ? "Selecione um estado primeiro" : undefined}
              className="lg:w-52"
            >
              <option value="">Todas as cidades</option>
              {cidades.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </CampoSelect>
          </div>

          {/* Botão que revela os filtros no mobile */}
          <Botao
            variante="contorno"
            onClick={() => setFiltrosAbertos((v) => !v)}
            className="lg:hidden"
            aria-expanded={filtrosAbertos}
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            {filtrosAbertos ? "Ocultar filtros" : "Filtrar por estado e cidade"}
          </Botao>
        </div>

        {/* Filtros ativos */}
        {temFiltro && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
            <span className="text-sm font-semibold text-fg-muted">Filtros ativos:</span>

            {uf && (
              <Chip rotulo={NOMES_UF[uf]} aoRemover={() => trocarUf("")} />
            )}
            {cidade && <Chip rotulo={cidade} aoRemover={() => setCidade("")} />}
            {busca.trim() && <Chip rotulo={`“${busca.trim()}”`} aoRemover={() => setBusca("")} />}

            <button
              type="button"
              onClick={limpar}
              className="ml-1 min-h-11 rounded px-2 text-sm font-semibold text-primary hover:underline"
            >
              Limpar tudo
            </button>
          </div>
        )}
      </div>

      {/* ---------------- Resultados ---------------- */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[26rem_1fr] lg:gap-12">
        {/* Mapa — aparece depois dos resultados no mobile (order) */}
        <aside className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-fg-muted">
              Presença por estado
            </h2>

            <div className="rounded-[var(--radius-xl)] border border-line bg-bg-subtle p-6">
              <MapaBrasil
                ufsAtivas={UFS_COM_PRESENCA}
                ufSelecionada={uf}
                onSelecionar={trocarUf}
                contagemPorUF={contagemPorUF}
              />

              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-xs text-fg-muted">
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-3 w-3 rounded bg-[var(--mepb-navy-900)]" />
                  Estado com igreja cadastrada
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-3 w-3 rounded bg-[var(--mepb-red-600)]" />
                  Estado selecionado
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-3 w-3 rounded bg-[var(--sem-bg-muted)]" />
                  Sem cadastro no portal
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Lista */}
        <section aria-labelledby="titulo-resultados" className="order-1 min-w-0 lg:order-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 id="titulo-resultados" className="text-sm font-bold uppercase tracking-[0.14em] text-fg-muted">
              Igrejas encontradas
            </h2>
            <p aria-live="polite" className="text-sm font-semibold">
              {resultados.length}{" "}
              {resultados.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          {resultados.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2">
              {resultados.map((igreja) => (
                <li key={igreja.slug}>
                  <CardIgreja igreja={igreja} />
                </li>
              ))}
            </ul>
          ) : (
            <EstadoVazio
              titulo="Nenhuma igreja encontrada"
              descricao="Não encontramos igrejas com esses filtros. Tente ampliar a busca ou selecionar outro estado no mapa."
              acao={
                <Botao variante="primario" onClick={limpar}>
                  Limpar filtros
                </Botao>
              }
            />
          )}

          <p className="mt-10 rounded-[var(--radius-lg)] border border-line bg-bg-subtle p-5 text-sm leading-relaxed text-fg-muted">
            <strong className="font-semibold text-fg">Não encontrou sua igreja?</strong> O
            cadastro de igrejas no portal é feito pelas secretarias estaduais através da
            Área Administrativa. Se a sua congregação ainda não aparece aqui, fale com a
            liderança local ou entre em contato com a Sede Nacional.
          </p>
        </section>
      </div>
    </div>
  );
}

/** Etiqueta de filtro ativo, removível. */
function Chip({ rotulo, aoRemover }: { rotulo: string; aoRemover: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary-subtle py-1 pl-3 pr-1 text-sm font-semibold text-primary">
      {rotulo}
      <button
        type="button"
        onClick={aoRemover}
        aria-label={`Remover filtro ${rotulo}`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/15"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </span>
  );
}
