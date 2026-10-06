import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import SectionTitle from "@/components/ui/SectionTitle";
import { ButtonLink } from "@/components/ui/Button";

export default async function ProjectsStrip() {
  const t = await getTranslations();
  const featured = projects.slice(0, 5);

  return (
    <section id="proyectos" className="bg-ink py-16 sm:py-20">
      <div className="container-x">
        <SectionTitle eyebrow={t("projects.eyebrow")} title={t("projects.title")} dark />
        <ul className="mt-10 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((p, i) => (
            <li
              key={p.id}
              className={`relative aspect-[4/3] overflow-hidden ${i >= 4 ? "hidden lg:block" : ""} ${i === 3 ? "sm:hidden lg:block" : ""}`}
            >
              <Image
                src={p.image}
                alt={`${t(`services.items.${p.service}.name`)} · ${p.town}`}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/proyectos" variant="outlineGold">
            {t("projects.viewAll")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
