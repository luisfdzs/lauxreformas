import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceIcon from "@/components/ServiceIcon";

export default async function Services() {
  const t = await getTranslations("services");
  return (
    <section id="servicios" className="bg-paper py-16 sm:py-20">
      <div className="container-x">
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex h-full flex-col items-center border border-line bg-white px-5 py-8 xl:px-3 text-center transition hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                <ServiceIcon icon={s.icon} className="size-11 text-gold" />
                <h3 className="mt-5 text-base font-semibold text-ink group-hover:text-gold-600">
                  {t(`items.${s.slug}.name`)}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">{t(`items.${s.slug}.short`)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
