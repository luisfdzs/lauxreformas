"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";

// Área aproximada: Condado, Baixo Miño y área de Vigo
const BBOX = "-8.85,41.95,-8.25,42.30";

/**
 * Mapa de OpenStreetMap que solo se carga cuando el usuario lo pide, para no
 * conectar con terceros sin una acción explícita.
 */
export default function ZoneMap({ title, notice, load }: { title: string; notice: string; load: string }) {
  const [show, setShow] = useState(false);
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${site.geo.lat},${site.geo.lng}`;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink-700">
      {show ? (
        <iframe title={title} src={src} className="absolute inset-0 h-full w-full" loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white">
          <MapPin className="size-10 text-gold" strokeWidth={1.25} aria-hidden="true" />
          <p className="max-w-sm text-sm text-white/75">{notice}</p>
          <button
            type="button"
            onClick={() => setShow(true)}
            className="bg-gold px-5 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase hover:bg-gold-600"
          >
            {load}
          </button>
        </div>
      )}
    </div>
  );
}
