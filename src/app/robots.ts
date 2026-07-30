import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/** A Área Administrativa fica fora do índice dos buscadores. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
