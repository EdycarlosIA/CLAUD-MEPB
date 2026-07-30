"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { UF } from "@/content/types";
import { IGREJAS, NOMES_UF, UFS_COM_PRESENCA } from "@/content/igrejas";
import { MapaBrasil } from "@/components/marca/MapaBrasil";

/**
 * Mapa de presença da home.
 *
 * Ao selecionar um estado, mostra ali mesmo quantas igrejas existem e oferece o
 * atalho para o localizador já filtrado — resolvendo a tarefa principal do
 * visitante sem tirá-lo da página inicial.
 */
export function MapaPresenca() {
  const [uf, setUf] = useState<UF | "">("");

  const contagem = useMemo(() => {
    return IGREJAS.reduce<Partial<Record<UF, number>>>((acc, igreja) => {
      acc[igreja.uf] = (acc[igreja.uf] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  const quantidade = uf ? (contagem[uf] ?? 0) : 0;

  return (
    <div>
      <MapaBrasil
        ufsAtivas={UFS_COM_PRESENCA}
        ufSelecionada={uf}
        onSelecionar={setUf}
        contagemPorUF={contagem}
        className="mx-auto max-w-md"
      />

      {/* Área de resposta com altura reservada, para o mapa não "pular" ao selecionar */}
      <div className="mt-6 min-h-[5.5rem] rounded-[var(--radius-lg)] border border-line bg-surface p-5 text-center">
        {uf ? (
          <>
            <p className="font-semibold">{NOMES_UF[uf]}</p>
            <p className="mt-1 text-sm text-fg-muted">
              {quantidade > 0
                ? `${quantidade} ${quantidade === 1 ? "igreja cadastrada" : "igrejas cadastradas"} no portal`
                : "Nenhuma igreja cadastrada no portal ainda"}
            </p>
            <Link
              href={`/igrejas?uf=${uf}`}
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Ver igrejas em {NOMES_UF[uf]}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <p className="pt-3 text-sm text-fg-muted">
            Toque em um estado para ver a presença da MEPB na sua região.
          </p>
        )}
      </div>
    </div>
  );
}
