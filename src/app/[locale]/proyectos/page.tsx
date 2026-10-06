import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { alternates } from "@/lib";
import PageHeader from "@/components/PageHeader";
import ProjectGallery from "@/components/ProjectGallery";
import CtaBand from "@/components/sections/CtaBand";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale, "/proyectos"),
  };
}

export default async function ProjectsPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();

  const items = projects.map((p) => ({
    id: p.id,
    image: p.image,
    service: p.service,
    caption: `${t(`services.items.${p.service}.name`)} · ${p.town}`,
  }));
  const filters = services
    .filter((s) => projects.some((p) => p.service === s.slug))
    .map((s) => ({ value: s.slug, label: t(`services.items.${s.slug}.name`) }));

  return (
    <>
      <PageHeader eyebrow={t("projects.eyebrow")} title={t("projects.pageTitle")} intro={t("projects.pageIntro")} />
      <section className="py-14 sm:py-16">
        <div className="container-x">
          <ProjectGallery
            items={items}
            filters={filters}
            labels={{
              all: t("projects.filterAll"),
              close: t("projects.close"),
              previous: t("projects.previous"),
              next: t("projects.next"),
            }}
          />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
