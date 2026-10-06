"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={`flex items-center gap-1 text-xs font-semibold ${className}`} role="group" aria-label={t("language")}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          onClick={() =>
            // @ts-expect-error -- params coinciden con la ruta actual
            router.replace({ pathname, params }, { locale: l, scroll: false })
          }
          className={`px-1.5 py-1 uppercase transition-colors ${
            l === locale ? "text-gold" : "text-white/60 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
