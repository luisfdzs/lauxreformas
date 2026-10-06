import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Gem, HardHat, ShieldCheck } from "lucide-react";
import { whatsappHref } from "@/config/site";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import WhatsappIcon from "@/components/ui/WhatsappIcon";

export default async function Hero() {
  const t = await getTranslations();
  const badges = [
    { icon: ShieldCheck, label: t("hero.badges.commitment") },
    { icon: Gem, label: t("hero.badges.materials") },
    { icon: HardHat, label: t("hero.badges.professionals") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink/85 to-ink/20 lg:via-ink/75" />

      <div className="container-x py-20 sm:py-24 lg:py-28">
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-4 text-sm tracking-[0.1em]">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {t("hero.eyebrow")}
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </p>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-md text-base text-white/85 sm:text-lg">{t("hero.subtitle")}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contacto" variant="gold">
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

        <ul className="mt-12 flex flex-col gap-4 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:gap-x-10">
          {badges.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="size-6 text-white" strokeWidth={1.25} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
