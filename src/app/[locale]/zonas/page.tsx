import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin } from "lucide-react";
import { routing } from "@/i18n/routing";
import { zones } from "@/content/zones";
import { alternates } from "@/lib";
import PageHeader from "@/components/PageHeader";
import ZoneMap from "@/components/ZoneMap";
import CtaBand from "@/components/sections/CtaBand";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "zones" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternates(locale, "/zonas") };
}

export default async function ZonesPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("zones");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">{t("listTitle")}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {zones.map((z) => (
                <li
                  key={z}
                  className="inline-flex items-center gap-1.5 border border-line bg-white px-3 py-2 text-sm"
                >
                  <MapPin className="size-3.5 text-gold" aria-hidden="true" />
                  {z}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">{t("notListed")}</p>
          </div>
          <ZoneMap title={t("mapTitle")} notice={t("mapNotice")} load={t("mapLoad")} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
