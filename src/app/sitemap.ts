import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";
import { site } from "@/config/site";

const paths = [
  "",
  "/proyectos",
  "/zonas",
  "/contacto",
  ...services.map((s) => `/servicios/${s.slug}`),
  "/aviso-legal",
  "/privacidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
    },
  }));
}
