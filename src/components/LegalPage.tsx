import { getMessages, getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import PageHeader from "./PageHeader";

/** Fecha de la última revisión de los textos legales. */
const LEGAL_UPDATED = "2026-10-06";

export default async function LegalPage({ doc, locale }: { doc: "notice" | "privacy"; locale: string }) {
  const t = await getTranslations("legal");
  const messages = await getMessages();
  const sections = messages.legal[doc].sections;

  const values: Record<string, string> = {
    owner: site.legal.owner,
    taxId: site.legal.taxId,
    address: site.legal.address,
    registry: site.legal.registry,
    email: site.email,
    phone: site.phone,
  };
  // Sustituye los {placeholders} de los textos legales por los datos de site.ts
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? `{${k}}`);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(LEGAL_UPDATED));

  return (
    <>
      <PageHeader title={t(`${doc}.title`)} />
      <section className="py-14 sm:py-16">
        <div className="container-x max-w-3xl">
          <p className="text-sm text-muted">{t("updated", { date })}</p>
          {sections.map((s) => (
            <div key={s.h} className="mt-10">
              <h2 className="text-xl font-semibold">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-4 text-sm leading-relaxed text-ink/85 sm:text-base">
                  {fill(p)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
