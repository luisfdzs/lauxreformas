"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryItem = { id: string; image: string; service: string; caption: string };

export default function ProjectGallery({
  items,
  filters,
  labels,
}: {
  items: GalleryItem[];
  filters: { value: string; label: string }[];
  labels: { all: string; close: string; previous: string; next: string };
}) {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = filter === "all" ? items : items.filter((i) => i.service === filter);

  const go = useCallback(
    (delta: number) =>
      setOpen((o) => (o === null ? o : (o + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const current = open === null ? null : visible[open];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="group">
        {[{ value: "all", label: labels.all }, ...filters].map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
              filter === f.value
                ? "border-gold bg-gold text-white"
                : "border-line bg-white text-ink hover:border-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-ink text-left"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setOpen(null)}
        >
          <figure className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[3/2] w-full">
              <Image src={current.image} alt={current.caption} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/80">{current.caption}</figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-gold"
            aria-label={labels.close}
          >
            <X className="size-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 p-2 text-white hover:text-gold sm:left-6"
            aria-label={labels.previous}
          >
            <ChevronLeft className="size-9" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 p-2 text-white hover:text-gold sm:right-6"
            aria-label={labels.next}
          >
            <ChevronRight className="size-9" />
          </button>
        </div>
      ) : null}
    </>
  );
}
