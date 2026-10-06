import { getTranslations } from "next-intl/server";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappHref } from "@/config/site";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import WhatsappIcon from "@/components/ui/WhatsappIcon";

export default async function CtaBand() {
  const t = await getTranslations();
  return (
    <section className="bg-ink py-12 text-white">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="eyebrow mb-2">{t("cta.eyebrow")}</p>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("cta.title")}</h2>
          <p className="mt-3 max-w-sm text-sm text-white/80">{t("cta.text")}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contacto">
            {t("common.requestQuoteShort")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonA
            href={whatsappHref(t("common.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlineLight"
          >
            {t("common.whatsapp")}
            <WhatsappIcon className="size-4" />
          </ButtonA>
        </div>
        <ContactList area={t("cta.area")} />
      </div>
    </section>
  );
}

export function ContactList({ area, className = "" }: { area: string; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3 text-sm ${className}`}>
      <li>
        <a href={site.phoneHref} className="flex items-center gap-3 hover:text-gold">
          <Phone className="size-4 text-gold" aria-hidden="true" />
          {site.phone}
        </a>
      </li>
      <li>
        <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold">
          <Mail className="size-4 text-gold" aria-hidden="true" />
          {site.email}
        </a>
      </li>
      <li className="flex items-center gap-3">
        <MapPin className="size-4 text-gold" aria-hidden="true" />
        {area}
      </li>
    </ul>
  );
}
