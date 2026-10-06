import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/config/site";

/** URLs canónicas y alternativas hreflang para una ruta (sin prefijo de idioma). */
export function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${site.url}/${l}${path}`]),
  );
  return {
    canonical: `${site.url}/${locale}${path}`,
    languages: { ...languages, "x-default": `${site.url}/${routing.defaultLocale}${path}` },
  };
}
