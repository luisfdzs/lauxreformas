import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getService, services } from "@/content/services";
import { whatsappHref } from "@/config/site";
import { alternates } from "@/lib";
import PageHeader from "@/components/PageHeader";
import ServiceIcon from "@/components/ServiceIcon";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import WhatsappIcon from "@/components/ui/WhatsappIcon";
import CtaBand from "@/components/sections/CtaBand";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service || !hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t(`items.${service.slug}.name`),
    description: t(`items.${service.slug}.metaDescription`),
    alternates: alternates(locale, `/servicios/${service.slug}`),
    openGraph: { images: [{ url: service.image }] },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  setRequestLocale(locale as Locale);

  const t = await getTranslations();
  const messages = await getMessages();
  const item = messages.services.items[service.slug];

  return (
    <>
      <PageHeader
        eyebrow={t("services.eyebrow")}
        title={item.name}
        intro={item.intro}
        image={service.image}
      />

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="space-y-5 text-base leading-relaxed text-ink/85">
              {item.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="relative mt-10 aspect-[16/10] overflow-hidden">
              <Image
                src={service.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <aside className="flex flex-col gap-8">
            <div className="border border-line bg-white p-7">
              <h2 className="text-lg font-semibold">{t("services.includesTitle")}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-ink p-7 text-white">
              <h2 className="text-lg font-semibold">{t("services.ctaTitle")}</h2>
              <p className="mt-3 text-sm text-white/80">{t("services.ctaText")}</p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/contacto">
                  {t("common.requestQuote")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonA
                  href={whatsappHref(t("common.whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlineLight"
                >
                  {t("common.writeWhatsapp")}
                  <WhatsappIcon className="size-4" />
                </ButtonA>
              </div>
            </div>

            <div>
              <h2 className="eyebrow">{t("services.otherServices")}</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="flex items-center gap-3 py-3 text-sm font-medium hover:text-gold-600"
                      >
                        <ServiceIcon icon={s.icon} className="size-5 text-gold" />
                        {t(`services.items.${s.slug}.name`)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
