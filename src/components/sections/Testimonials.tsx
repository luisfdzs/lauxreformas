import { getMessages, getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

export default async function Testimonials() {
  const t = await getTranslations("testimonials");
  const messages = await getMessages();
  const items = messages.testimonials.items;

  return (
    <section className="bg-paper pt-14 pb-16 sm:pb-20">
      <div className="container-x">
        <SectionTitle title={t("title")} />
        <ul className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col items-center bg-white px-6 py-7 text-center shadow-sm">
                <div className="flex gap-1 text-gold" role="img" aria-label={t("rating")}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-xs font-semibold text-ink">{item.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
