import Image from "next/image";

/** Cabecera oscura de las páginas interiores. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20">
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/75" />
        </>
      ) : null}
      <div className="container-x">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{intro}</p> : null}
      </div>
    </section>
  );
}
