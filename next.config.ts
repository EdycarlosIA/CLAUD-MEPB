import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Exportação estática opcional: `EXPORT=1 npm run build` gera ./out,
  // permitindo hospedar o protótipo em qualquer servidor de arquivos.
  ...(process.env.EXPORT === "1" ? { output: "export" as const } : {}),

  images: {
    // Assets do protótipo são SVG gerados localmente; em produção com Strapi,
    // adicionar aqui o remotePattern do CMS.
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.EXPORT === "1",
  },
};

export default nextConfig;
