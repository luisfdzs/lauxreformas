import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Solo producción es indexable; el entorno de test queda fuera de buscadores
  const indexable = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: indexable ? `${site.url}/sitemap.xml` : undefined,
  };
}
