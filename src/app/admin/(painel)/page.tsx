import Link from "next/link";
import { CalendarDays, Church, Globe2, Newspaper, Plus, UserRound } from "lucide-react";
import {
  AvisoPrototipo, CabecalhoAdmin, GraficoBarras, GraficoLinha, Kpi, Painel, Tabela,
} from "@/components/admin/UI";
import { Selo } from "@/components/ui/Selo";
import { BotaoLink } from "@/components/ui/Botao";
import { IGREJAS, NOMES_UF } from "@/content/igrejas";
import { NOTICIAS_RECENTES } from "@/content/noticias";
import { EVENTOS_ORDENADOS } from "@/content/eventos";
import { MISSIONARIOS } from "@/content/missoes";
import { formatarDataCurta } from "@/lib/utils";

/** Série histórica de demonstração — no CMS, viria de uma agregação real. */
const CRESCIMENTO = [
  { rotulo: "2019", valor: 96 },
  { rotulo: "2020", valor: 101 },
  { rotulo: "2021", valor: 108 },
  { rotulo: "2022", valor: 114 },
  { rotulo: "2023", valor: 119 },
  { rotulo: "2024", valor: 126 },
  { rotulo: "2025", valor: 131 },
  { rotulo: "2026", valor: 138 },
];

/** Agrupa as igrejas cadastradas por região do país. */
const REGIOES: Record<string, string[]> = {
  Nordeste: ["RN", "CE", "PB", "PE", "AL", "SE", "BA", "PI", "MA"],
  Norte: ["AM", "PA", "RR", "AP", "RO", "AC", "TO"],
  Sudeste: ["SP", "RJ", "MG", "ES"],
  "Centro-Oeste": ["DF", "GO", "MT", "MS"],
  Sul: ["PR", "SC", "RS"],
};

export default function DashboardPage() {
  const porRegiao = Object.entries(REGIOES)
    .map(([regiao, ufs]) => ({
      rotulo: regiao,
      valor: IGREJAS.filter((i) => ufs.includes(i.uf)).length,
    }))
    .filter((r) => r.valor > 0)
    .sort((a, b) => b.valor - a.valor);

  const ultimasIgrejas = [...IGREJAS]
    .sort((a, b) => b.fundacao - a.fundacao)
    .slice(0, 6);

  return (
    <>
      <CabecalhoAdmin
        titulo="Dashboard"
        descricao="Visão geral do conteúdo publicado no portal e dos indicadores da denominação."
        acao={
          <BotaoLink href="/admin/igrejas" variante="primario">
            <Plus aria-hidden="true" className="h-4 w-4" />
            Cadastrar igreja
          </BotaoLink>
        }
      />

      <AvisoPrototipo>
        Painel de demonstração. Os números refletem os dados fictícios do protótipo; em
        produção, cada indicador consulta as coleções correspondentes no CMS.
      </AvisoPrototipo>

      {/* Indicadores */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi rotulo="Igrejas cadastradas" valor={IGREJAS.length} variacao={5.3} detalhe="vs. ano anterior" Icone={Church} />
        <Kpi rotulo="Pastores credenciados" valor={IGREJAS.length} variacao={2.1} detalhe="vs. ano anterior" Icone={UserRound} />
        <Kpi rotulo="Eventos na agenda" valor={EVENTOS_ORDENADOS.length} detalhe="programados para 2026" Icone={CalendarDays} />
        <Kpi rotulo="Missionários no campo" valor={MISSIONARIOS.length} variacao={9.4} detalhe="vs. ano anterior" Icone={Globe2} />
      </div>

      {/* Gráficos */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Painel
          titulo="Crescimento de municípios alcançados"
          descricao="Número de municípios com presença da MEPB, por ano."
        >
          <GraficoLinha dados={CRESCIMENTO} rotuloSerie="Municípios alcançados por ano" />
        </Painel>

        <Painel titulo="Igrejas por região" descricao="Distribuição dos cadastros no portal.">
          <GraficoBarras dados={porRegiao} rotuloSerie="Igrejas cadastradas por região" />
        </Painel>
      </div>

      {/* Tabelas */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Painel titulo="Igrejas recentes" descricao="Últimos registros pela data de fundação.">
          <Tabela
            colunas={[
              { chave: "nome", rotulo: "Igreja" },
              { chave: "local", rotulo: "Localidade" },
              { chave: "tipo", rotulo: "Tipo" },
              { chave: "fundacao", rotulo: "Fundação", alinhamento: "direita" },
            ]}
            linhas={ultimasIgrejas.map((igreja) => ({
              nome: (
                <Link href={`/igrejas/${igreja.slug}`} className="font-medium hover:text-primary hover:underline">
                  {igreja.nome}
                </Link>
              ),
              local: (
                <span className="text-fg-muted">
                  {igreja.cidade}/{igreja.uf}
                </span>
              ),
              tipo: <Selo tom="neutro">{igreja.tipo.replace("-", " ")}</Selo>,
              fundacao: (
                <span data-numeric className="text-fg-muted">
                  {igreja.fundacao}
                </span>
              ),
            }))}
          />
        </Painel>

        <Painel titulo="Últimas notícias publicadas" descricao="Conteúdo mais recente do portal.">
          <Tabela
            colunas={[
              { chave: "titulo", rotulo: "Título" },
              { chave: "categoria", rotulo: "Categoria" },
              { chave: "data", rotulo: "Publicação", alinhamento: "direita" },
            ]}
            linhas={NOTICIAS_RECENTES.slice(0, 6).map((noticia) => ({
              titulo: (
                <Link
                  href={`/noticias/${noticia.slug}`}
                  className="line-clamp-1 font-medium hover:text-primary hover:underline"
                >
                  {noticia.titulo}
                </Link>
              ),
              categoria: <Selo tom="neutro">{noticia.categoria}</Selo>,
              data: (
                <span data-numeric className="whitespace-nowrap text-fg-muted">
                  {formatarDataCurta(noticia.data)}
                </span>
              ),
            }))}
          />
        </Painel>
      </div>

      {/* Atalhos */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { rotulo: "Nova notícia", href: "/admin/noticias", Icone: Newspaper },
          { rotulo: "Novo evento", href: "/admin/eventos", Icone: CalendarDays },
          { rotulo: "Novo pastor", href: "/admin/pastores", Icone: UserRound },
          { rotulo: "Novo missionário", href: "/admin/missionarios", Icone: Globe2 },
        ].map((atalho) => (
          <Link
            key={atalho.href}
            href={atalho.href}
            className="flex min-h-[var(--tap-target)] items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-surface px-5 py-4 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <atalho.Icone aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
            {atalho.rotulo}
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-fg-subtle">
        Estados representados no portal:{" "}
        {Array.from(new Set(IGREJAS.map((i) => i.uf)))
          .map((uf) => NOMES_UF[uf])
          .join(", ")}
        .
      </p>
    </>
  );
}
