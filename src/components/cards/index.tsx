import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Download, FileText, MapPin, Play, Users } from "lucide-react";
import type { Departamento, Documento, Evento, Igreja, Midia, Missionario, Noticia } from "@/content/types";
import { NOMES_UF } from "@/content/igrejas";
import { Card, CardCorpo } from "@/components/ui/Card";
import { Selo } from "@/components/ui/Selo";
import { ImagemDemo } from "@/components/ui/ImagemDemo";
import { blocoData, cn, formatarDataCurta, formatarPeriodo, milhar } from "@/lib/utils";

/**
 * Cartões de conteúdo do portal.
 *
 * Cada tipo de conteúdo tem exatamente um cartão, usado em todos os lugares onde
 * aparece — home, páginas-índice, resultados de busca e relacionados. Isso mantém
 * a consistência visual e concentra qualquer ajuste em um único ponto.
 */

/* -------------------------------------------------------------------------- */
/* Notícia                                                                     */
/* -------------------------------------------------------------------------- */

export function CardNoticia({ noticia, destaque = false }: { noticia: Noticia; destaque?: boolean }) {
  if (destaque) {
    return (
      <Card as="article" href={`/noticias/${noticia.slug}`} className="overflow-hidden">
        <ImagemDemo imagem={noticia.imagem} proporcao="16/9" className="[&>div]:rounded-b-none" />
        <CardCorpo>
          <div className="flex flex-wrap items-center gap-3">
            <Selo tom="primario">{noticia.categoria}</Selo>
            <time dateTime={noticia.data} className="text-sm text-fg-muted">
              {formatarDataCurta(noticia.data)}
            </time>
          </div>
          <h3 className="mt-4 text-balance text-xl font-semibold leading-snug transition-colors group-hover:text-accent md:text-2xl">
            {noticia.titulo}
          </h3>
          <p className="clamp-3 mt-3 leading-relaxed text-fg-muted">{noticia.resumo}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Ler matéria
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardCorpo>
      </Card>
    );
  }

  return (
    <Card as="article" href={`/noticias/${noticia.slug}`} className="flex gap-4 p-4">
      <ImagemDemo imagem={noticia.imagem} proporcao="1/1" className="w-24 shrink-0 sm:w-28" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Selo tom="neutro">{noticia.categoria}</Selo>
          <time dateTime={noticia.data} className="text-xs text-fg-muted">
            {formatarDataCurta(noticia.data)}
          </time>
        </div>
        <h3 className="clamp-2 mt-2 font-semibold leading-snug transition-colors group-hover:text-accent">
          {noticia.titulo}
        </h3>
        <p className="clamp-2 mt-1.5 text-sm leading-relaxed text-fg-muted">{noticia.resumo}</p>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Evento                                                                      */
/* -------------------------------------------------------------------------- */

export function CardEvento({ evento }: { evento: Evento }) {
  const data = blocoData(evento.dataInicio);

  return (
    <Card as="article" href={`/agenda/${evento.slug}`} className="flex overflow-hidden">
      {/* Bloco de data — leitura imediata na varredura vertical da lista */}
      <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 bg-[var(--mepb-navy-900)] px-2 py-6 text-white sm:w-24">
        <span data-numeric className="font-serif text-3xl font-semibold leading-none">
          {data.dia}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/75">{data.mes}</span>
        <span data-numeric className="mt-1 text-[0.6875rem] text-white/55">
          {data.ano}
        </span>
      </div>

      <div className="min-w-0 flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Selo tom="azul">{evento.tipo}</Selo>
          {evento.inscricoesAbertas && <Selo tom="verde">Inscrições abertas</Selo>}
        </div>

        <h3 className="clamp-2 mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {evento.titulo}
        </h3>

        <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
            {formatarPeriodo(evento.dataInicio, evento.dataFim)}
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
            {evento.cidade}/{evento.uf} — {evento.local}
          </li>
        </ul>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Igreja                                                                      */
/* -------------------------------------------------------------------------- */

const ROTULO_TIPO: Record<Igreja["tipo"], string> = {
  "sede-nacional": "Sede Nacional",
  "sede-estadual": "Sede Estadual",
  igreja: "Igreja",
  congregacao: "Congregação",
};

export function CardIgreja({ igreja }: { igreja: Igreja }) {
  // Mostra apenas os cultos de domingo no cartão; a ficha traz a grade completa.
  const domingo = igreja.cultos.filter((c) => c.dia === "Domingo");

  return (
    <Card as="article" href={`/igrejas/${igreja.slug}`}>
      <CardCorpo>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Selo tom={igreja.tipo === "sede-nacional" ? "primario" : "neutro"}>
            {ROTULO_TIPO[igreja.tipo]}
          </Selo>
          <span className="text-sm font-semibold text-fg-muted">
            {igreja.cidade}/{igreja.uf}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {igreja.nome}
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-fg-muted">
          <li className="flex gap-2.5">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {igreja.endereco} — {igreja.bairro}
            </span>
          </li>
          <li className="flex gap-2.5">
            <Users aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{igreja.pastor.nome}</span>
          </li>
          {domingo.length > 0 && (
            <li className="flex gap-2.5">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Domingo: {domingo.map((c) => c.horario).join(" e ")}</span>
            </li>
          )}
        </ul>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Ver a igreja
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </CardCorpo>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Departamento                                                                */
/* -------------------------------------------------------------------------- */

export function CardDepartamento({
  departamento,
  Icone,
}: {
  departamento: Departamento;
  /** Ícone já resolvido pelo chamador — evita um mapa de ícones no cliente. */
  Icone: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <Card as="article" href={`/departamentos/${departamento.slug}`}>
      <CardCorpo>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-primary-subtle text-primary">
          <Icone aria-hidden className="h-6 w-6" />
        </span>

        <h3 className="mt-5 text-lg font-semibold transition-colors group-hover:text-accent">
          {departamento.nome}
        </h3>

        {departamento.faixaEtaria && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {departamento.faixaEtaria}
          </p>
        )}

        <p className="clamp-3 mt-3 text-sm leading-relaxed text-fg-muted">
          {departamento.descricao}
        </p>
      </CardCorpo>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Mídia (TV MEPB)                                                             */
/* -------------------------------------------------------------------------- */

export function CardMidia({ midia }: { midia: Midia }) {
  return (
    <Card as="article" href={`/tv/${midia.slug}`} className="overflow-hidden">
      <div className="relative">
        <ImagemDemo imagem={midia.capa} proporcao="16/9" className="[&>div]:rounded-b-none" />
        {/* Botão de play sobreposto */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center transition-transform duration-[var(--duration-base)] group-hover:scale-110"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play className="ml-1 h-6 w-6 fill-[var(--mepb-navy-900)] text-[var(--mepb-navy-900)]" />
          </span>
        </span>
        <span className="absolute bottom-3 right-3 rounded bg-[var(--mepb-navy-950)]/85 px-2 py-1 text-xs font-semibold text-white">
          {midia.duracao}
        </span>
      </div>

      <CardCorpo className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Selo tom="azul">{midia.tipo}</Selo>
          <time dateTime={midia.data} className="text-xs text-fg-muted">
            {formatarDataCurta(midia.data)}
          </time>
        </div>
        <h3 className="clamp-2 mt-3 font-semibold leading-snug transition-colors group-hover:text-accent">
          {midia.titulo}
        </h3>
        <p className="mt-2 text-sm text-fg-muted">{midia.preletor}</p>
      </CardCorpo>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Missionário                                                                 */
/* -------------------------------------------------------------------------- */

export function CardMissionario({ missionario }: { missionario: Missionario }) {
  return (
    <Card as="article" href={`/missoes/${missionario.slug}`} className="overflow-hidden">
      <ImagemDemo imagem={missionario.foto} proporcao="4/3" className="[&>div]:rounded-b-none" />
      <CardCorpo className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Selo tom="primario">{missionario.pais}</Selo>
          <span className="text-xs text-fg-muted">desde {missionario.desde}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-accent">
          {missionario.nome}
        </h3>
        <p className="mt-1 text-sm font-medium text-fg-subtle">{missionario.campo}</p>
        <p className="clamp-3 mt-3 text-sm leading-relaxed text-fg-muted">{missionario.resumo}</p>
      </CardCorpo>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Documento (Biblioteca)                                                      */
/* -------------------------------------------------------------------------- */

export function CardDocumento({ documento }: { documento: Documento }) {
  return (
    <Card as="article" interativo className="flex gap-4 p-5">
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)]",
          documento.restrito ? "bg-bg-muted text-fg-muted" : "bg-accent-subtle text-accent",
        )}
      >
        <FileText className="h-6 w-6" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Selo tom="neutro">{documento.formato}</Selo>
          {documento.restrito && <Selo tom="primario">Restrito</Selo>}
        </div>

        <h3 className="mt-2.5 font-semibold leading-snug">{documento.titulo}</h3>
        <p className="clamp-2 mt-1.5 text-sm leading-relaxed text-fg-muted">{documento.descricao}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-fg-subtle">
            {documento.tamanho} · Atualizado em {formatarDataCurta(documento.atualizadoEm)} ·{" "}
            {milhar(documento.downloads)} downloads
          </p>

          <Link
            href={documento.restrito ? "/admin/login" : "#"}
            className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border border-line-strong px-4 text-sm font-semibold transition-colors hover:bg-bg-muted"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {documento.restrito ? "Entrar para baixar" : "Baixar"}
          </Link>
        </div>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Estado (usado na página-índice de igrejas por UF)                           */
/* -------------------------------------------------------------------------- */

export function CardEstado({ uf, quantidade }: { uf: keyof typeof NOMES_UF; quantidade: number }) {
  return (
    <Card href={`/igrejas?uf=${uf}`} className="p-5 text-center">
      <span data-numeric className="font-serif text-2xl font-semibold text-primary">
        {quantidade}
      </span>
      <p className="mt-1 text-sm font-semibold">{NOMES_UF[uf]}</p>
      <p className="text-xs text-fg-muted">{quantidade === 1 ? "igreja" : "igrejas"}</p>
    </Card>
  );
}
