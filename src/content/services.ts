export const services = [
  { slug: "reformas-integrales", icon: "integral", image: "/images/services/reformas-integrales.jpg" },
  { slug: "banos", icon: "bath", image: "/images/services/banos.jpg" },
  { slug: "cocinas", icon: "kitchen", image: "/images/services/cocinas.jpg" },
  { slug: "pladur", icon: "drywall", image: "/images/services/pladur.jpg" },
  { slug: "pintura", icon: "paint", image: "/images/services/pintura.jpg" },
  { slug: "tejados-y-fachadas", icon: "roof", image: "/images/services/tejados-fachadas.jpg" },
] as const;

export type Service = (typeof services)[number];
export type ServiceSlug = Service["slug"];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
