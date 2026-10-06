import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CircleCheck, Star, Users } from "lucide-react";
import { site } from "@/config/site";

export default async function About() {
  const t = await getTranslations("about");
  const stats = [
    { icon: Users, value: `+${site.stats.years}`, label: t("stats.years") },
    { icon: CircleCheck, value: `+${site.stats.projects}`, label: t("stats.projects") },
    { icon: Star, value: `${site.stats.satisfaction}%`, label: t("stats.satisfaction") },
  ];

  return (
    <section id="nosotros" className="grid bg-paper lg:grid-cols-2">
      <div className="w-full px-4 py-14 sm:px-6 sm:py-16 lg:ml-auto lg:max-w-[40rem] lg:pr-12 lg:pl-10">
        <p className="eyebrow mb-3">{t("eyebrow")}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {t("title", { years: site.stats.years })}
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/80 sm:text-base">{t("text")}</p>
        <dl className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="size-8 shrink-0 text-gold" strokeWidth={1.25} aria-hidden="true" />
              <div className="flex flex-col-reverse">
                <dt className="text-[0.7rem] text-muted">{label}</dt>
                <dd className="text-xl font-semibold text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative min-h-72 lg:min-h-full">
        <Image
          src="/images/about.jpg"
          alt={t("imageAlt")}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
