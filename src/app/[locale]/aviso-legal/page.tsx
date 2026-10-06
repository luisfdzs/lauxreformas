import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { alternates } from "@/lib";
import LegalPage from "@/components/LegalPage";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("notice.title"), alternates: alternates(locale, "/aviso-legal") };
}

export default async function NoticePage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LegalPage doc="notice" locale={locale} />;
}
