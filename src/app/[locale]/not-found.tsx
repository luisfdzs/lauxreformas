import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations();
  return (
    <section className="container-x flex flex-col items-center py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold">{t("notFound.title")}</h1>
      <p className="mt-4 text-muted">{t("notFound.text")}</p>
      <ButtonLink href="/" className="mt-8">
        {t("common.backHome")}
      </ButtonLink>
    </section>
  );
}
