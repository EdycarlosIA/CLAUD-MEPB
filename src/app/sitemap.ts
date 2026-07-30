import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { IGREJAS } from "@/content/igrejas";
import { DEPARTAMENTOS } from "@/content/departamentos";
import { NOTICIAS } from "@/content/noticias";
import { EVENTOS } from "@/content/eventos";
import { MISSIONARIOS } from "@/content/missoes";
import { MIDIAS } from "@/content/midia";

/**
 * Sitemap gerado a partir do próprio conteúdo — ao cadastrar uma nova igreja ou
 * notícia no CMS, a URL entra no sitemap automaticamente, sem edição manual.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const agora = new Date();

  const estaticas: { rota: string; prioridade: number; frequencia: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { rota: "", prioridade: 1, frequencia: "daily" },
    { rota: "/igrejas", prioridade: 0.95, frequencia: "weekly" },
    { rota: "/sobre", prioridade: 0.8, frequencia: "monthly" },
    { rota: "/sobre/historia", prioridade: 0.7, frequencia: "yearly" },
    { rota: "/sobre/missao-visao-valores", prioridade: 0.7, frequencia: "yearly" },
    { rota: "/sobre/nossa-fe", prioridade: 0.7, frequencia: "yearly" },
    { rota: "/sobre/lideranca", prioridade: 0.7, frequencia: "monthly" },
    { rota: "/missoes", prioridade: 0.85, frequencia: "weekly" },
    { rota: "/noticias", prioridade: 0.9, frequencia: "daily" },
    { rota: "/agenda", prioridade: 0.9, frequencia: "weekly" },
    { rota: "/departamentos", prioridade: 0.8, frequencia: "monthly" },
    { rota: "/biblioteca", prioridade: 0.8, frequencia: "monthly" },
    { rota: "/tv", prioridade: 0.85, frequencia: "weekly" },
    { rota: "/galeria", prioridade: 0.6, frequencia: "weekly" },
    { rota: "/conheca-jesus", prioridade: 0.9, frequencia: "yearly" },
    { rota: "/participe", prioridade: 0.8, frequencia: "yearly" },
    { rota: "/oracao", prioridade: 0.8, frequencia: "yearly" },
    { rota: "/contato", prioridade: 0.7, frequencia: "yearly" },
    { rota: "/faq", prioridade: 0.7, frequencia: "monthly" },
    { rota: "/privacidade", prioridade: 0.3, frequencia: "yearly" },
    { rota: "/lgpd", prioridade: 0.3, frequencia: "yearly" },
    { rota: "/mapa-do-site", prioridade: 0.4, frequencia: "monthly" },
  ];

  return [
    ...estaticas.map((p) => ({
      url: `${base}${p.rota}`,
      lastModified: agora,
      changeFrequency: p.frequencia,
      priority: p.prioridade,
    })),

    ...IGREJAS.map((i) => ({
      url: `${base}/igrejas/${i.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...DEPARTAMENTOS.map((d) => ({
      url: `${base}/departamentos/${d.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...NOTICIAS.map((n) => ({
      url: `${base}/noticias/${n.slug}`,
      lastModified: new Date(n.data),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    ...EVENTOS.map((e) => ({
      url: `${base}/agenda/${e.slug}`,
      lastModified: agora,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),

    ...MISSIONARIOS.map((m) => ({
      url: `${base}/missoes/${m.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),

    ...MIDIAS.map((m) => ({
      url: `${base}/tv/${m.slug}`,
      lastModified: new Date(m.data),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
