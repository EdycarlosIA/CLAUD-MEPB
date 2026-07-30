import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

/**
 * Pareamento tipográfico do portal:
 *  - Source Serif 4 nos títulos — serifa de leitura com gravidade institucional,
 *    que sustenta o tom reverente sem soar antiquada.
 *  - Inter no texto corrido e na interface — excelente legibilidade em telas
 *    pequenas, onde está a maior parte do público.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nome} — Portal Oficial`,
    template: `%s · ${SITE.sigla}`,
  },
  description: SITE.descricao,
  applicationName: SITE.sigla,
  keywords: [
    "MEPB",
    "Missão Evangélica Pentecostal do Brasil",
    "igreja evangélica",
    "igreja pentecostal",
    "denominação evangélica",
    "missões",
    "Natal RN",
  ],
  authors: [{ name: SITE.nome }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
    title: `${SITE.nome} — Portal Oficial`,
    description: SITE.descricao,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nome} — Portal Oficial`,
    description: SITE.descricao,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1129" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Aplica o tema antes da primeira pintura, evitando a piscada de cor que
 * ocorreria se a decisão ficasse para o React no cliente.
 */
const SCRIPT_TEMA = `
(function () {
  try {
    var salvo = localStorage.getItem("mepb-tema");
    var prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var tema = salvo || (prefereEscuro ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", tema);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
  // Sinaliza que o JS está ativo. As animações de entrada só escondem o
  // conteúdo quando esta classe existe — sem ela, tudo aparece normalmente.
  document.documentElement.classList.add("js");
})();
`;

/** Dados estruturados da instituição — melhora a apresentação nos buscadores. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.nome,
  alternateName: SITE.sigla,
  url: SITE.url,
  foundingDate: String(SITE.fundacao),
  description: SITE.descricao,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.sede.endereco,
    addressLocality: SITE.sede.cidade,
    addressRegion: SITE.sede.uf,
    postalCode: SITE.sede.cep,
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.sede.telefone,
    email: SITE.sede.email,
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
  sameAs: [SITE.redes.instagram, SITE.redes.facebook, SITE.redes.youtube],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${sourceSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      {/* O chrome (navbar/rodapé ou painel administrativo) é definido pelo
          layout de cada grupo de rotas: `(portal)` e `(admin)`. */}
      <body>{children}</body>
    </html>
  );
}
