import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";
import { site, whatsappHref } from "@/config/site";
import { alternates } from "@/lib";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { ContactList } from "@/components/sections/CtaBand";
import { ButtonA } from "@/components/ui/Button";
import WhatsappIcon from "@/components/ui/WhatsappIcon";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternates(locale, "/contacto") };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} intro={t("contact.intro")} />
      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <ContactForm
              services={services.map((s) => ({ value: s.slug, label: t(`services.items.${s.slug}.name`) }))}
            />
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {t("contact.form.legalNotice", { owner: site.legal.owner })}
            </p>
          </div>
          <aside className="h-fit bg-ink p-7 text-white">
            <h2 className="text-lg font-semibold">{t("contact.infoTitle")}</h2>
            <ContactList area={t("cta.area")} className="mt-6" />
            <ButtonA
              href={whatsappHref(t("common.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlineLight"
              className="mt-8 w-full"
            >
              {t("common.writeWhatsapp")}
              <WhatsappIcon className="size-4" />
            </ButtonA>
          </aside>
        </div>
      </section>
    </>
  );
}
