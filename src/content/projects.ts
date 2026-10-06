import type { ServiceSlug } from "./services";

/** Proyectos de la galería. Fotos provisionales de Unsplash (ver public/images/CREDITS.md). */
export const projects: { id: string; image: string; service: ServiceSlug; town: string }[] = [
  { id: "p01", image: "/images/projects/proyecto-01.jpg", service: "cocinas", town: "Ponteareas" },
  { id: "p02", image: "/images/projects/proyecto-02.jpg", service: "banos", town: "Tui" },
  { id: "p03", image: "/images/projects/proyecto-03.jpg", service: "reformas-integrales", town: "Vigo" },
  { id: "p04", image: "/images/projects/proyecto-04.jpg", service: "tejados-y-fachadas", town: "Salvaterra de Miño" },
  { id: "p05", image: "/images/projects/proyecto-05.jpg", service: "reformas-integrales", town: "O Porriño" },
  { id: "p06", image: "/images/projects/proyecto-06.jpg", service: "banos", town: "Mos" },
  { id: "p07", image: "/images/projects/proyecto-07.jpg", service: "tejados-y-fachadas", town: "Salceda de Caselas" },
  { id: "p08", image: "/images/projects/proyecto-08.jpg", service: "pladur", town: "As Neves" },
  { id: "p09", image: "/images/projects/proyecto-09.jpg", service: "pintura", town: "Tomiño" },
  { id: "p10", image: "/images/projects/proyecto-10.jpg", service: "banos", town: "Ponteareas" },
  { id: "p11", image: "/images/projects/proyecto-11.jpg", service: "cocinas", town: "Vigo" },
  { id: "p12", image: "/images/projects/proyecto-12.jpg", service: "pintura", town: "Salvaterra de Miño" },
];
