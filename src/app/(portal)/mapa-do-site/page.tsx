import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/Pagina";
import { IGREJAS } from "@/content/igrejas";
import { DEPARTAMENTOS } from "@/content/departamentos";
import { NOTICIAS_RECENTES } from "@/content/noticias";
import { EVENTOS_ORDENADOS } from "@/content/eventos";
import { MISSIONARIOS } from "@/content/missoes";
import { MIDIAS } from "@/content/midia";

export const metadata: Metadata = {
  title: "Mapa do Site",
  description:
    "Todas as páginas do portal da Missão Evangélica Pentecostal do Brasil, organizadas por seção.",
};

/**
 * Mapa do site.
 * Serve a dois públicos: usuários que preferem uma visão geral em texto — comum
 * entre quem navega por leitor de tela — e mecanismos de busca, que ganham uma
 * página com links internos para todo o conteúdo dinâmico.
 */
const SECOES = [
  {
    titulo: "Institucional",
    links: [
      { rotulo: "Página inicial", href: "/" },
      { rotulo: "Sobre a MEPB", href: "/sobre" },
      { rotulo: "Nossa História", href: "/sobre/historia" },
      { rotulo: "Missão, Visão e Valores", href: "/sobre/missao-visao-valores" },
      { rotulo: "Nossa Fé", href: "/sobre/nossa-fe" },
      { rotulo: "Liderança", href: "/sobre/lideranca" },
    ],
  },
  {
    titulo: "Área do Visitante",
    links: [
      { rotulo: "Conheça Jesus", href: "/conheca-jesus" },
      { rotulo: "Quero Participar", href: "/participe" },
      { rotulo: "Pedido de Oração", href: "/oracao" },
      { rotulo: "Contato", href: "/contato" },
      { rotulo: "Perguntas Frequentes", href: "/faq" },
    ],
  },
  {
    titulo: "Recursos",
    links: [
      { rotulo: "TV MEPB", href: "/tv" },
      { rotulo: "Galeria", href: "/galeria" },
      { rotulo: "Biblioteca", href: "/biblioteca" },
      { rotulo: "Agenda Nacional", href: "/agenda" },
      { rotulo: "Notícias", href: "/noticias" },
      { rotulo: "Missões", href: "/missoes" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { rotulo: "Política de Privacidade", href: "/privacidade" },
      { rotulo: "LGPD — Portal do Titular", href: "/lgpd" },
      { rotulo: "Mapa do Site", href: "/mapa-do-site" },
    ],
  },
  {
    titulo: "Área Administrativa",
    links: [
      { rotulo: "Login", href: "/admin/login" },
      { rotulo: "Dashboard", href: "/admin" },
      { rotulo: "Igrejas", href: "/admin/igrejas" },
      { rotulo: "Pastores", href: "/admin/pastores" },
      { rotulo: "Eventos", href: "/admin/eventos" },
      { rotulo: "Notícias", href: "/admin/noticias" },
      { rotulo: "Missionários", href: "/admin/missionarios" },
      { rotulo: "Mídia", href: "/admin/midia" },
      { rotulo: "Permissões", href: "/admin/permissoes" },
    ],
  },
];

/** Blocos gerados a partir do conteúdo dinâmico. */
const DINAMICAS = [
  {
    titulo: `Igrejas (${IGREJAS.length})`,
    links: IGREJAS.map((i) => ({
      rotulo: `${i.nome} — ${i.cidade}/${i.uf}`,
      href: `/igrejas/${i.slug}`,
    })),
  },
  {
    titulo: `Departamentos (${DEPARTAMENTOS.length})`,
    links: DEPARTAMENTOS.map((d) => ({ rotulo: d.nome, href: `/departamentos/${d.slug}` })),
  },
  {
    titulo: `Missionários (${MISSIONARIOS.length})`,
    links: MISSIONARIOS.map((m) => ({
      rotulo: `${m.nome} — ${m.pais}`,
      href: `/missoes/${m.slug}`,
    })),
  },
  {
    titulo: `Eventos (${EVENTOS_ORDENADOS.length})`,
    links: EVENTOS_ORDENADOS.map((e) => ({ rotulo: e.titulo, href: `/agenda/${e.slug}` })),
  },
  {
    titulo: `Notícias (${NOTICIAS_RECENTES.length})`,
    links: NOTICIAS_RECENTES.map((n) => ({ rotulo: n.titulo, href: `/noticias/${n.slug}` })),
  },
  {
    titulo: `TV MEPB (${MIDIAS.length})`,
    links: MIDIAS.map((m) => ({ rotulo: m.titulo, href: `/tv/${m.slug}` })),
  },
];

function Bloco({
  titulo,
  links,
}: {
  titulo: string;
  links: { rotulo: string; href: string }[];
}) {
  return (
    <section aria-labelledby={`mapa-${titulo}`}>
      <h2
        id={`mapa-${titulo}`}
        className="rule-accent text-lg font-semibold"
      >
        {titulo}
      </h2>
      <ul className="mt-6 space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex min-h-10 items-center rounded px-1 text-sm text-fg-muted transition-colors hover:text-primary hover:underline"
            >
              {link.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MapaDoSitePage() {
  const totalPaginas =
    SECOES.reduce((t, s) => t + s.links.length, 0) +
    DINAMICAS.reduce((t, s) => t + s.links.length, 0);

  return (
    <>
      <PageHero
        compacto
        titulo="Mapa do Site"
        subtitulo={`Todas as ${totalPaginas} páginas do portal, organizadas por seção.`}
        trilha={[{ rotulo: "Mapa do Site" }]}
      />

      <section className="section-y">
        <div className="container-portal">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {SECOES.map((secao) => (
              <Bloco key={secao.titulo} {...secao} />
            ))}
          </div>

          <div className="mt-20 grid gap-12 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {DINAMICAS.map((secao) => (
              <Bloco key={secao.titulo} {...secao} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
