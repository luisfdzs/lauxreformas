/**
 * Datos de la empresa. TODOS son provisionales (placeholders) hasta que el
 * cliente facilite los reales: cámbialos aquí y se actualizan en toda la web.
 */
export const site = {
  name: "LAUX Reformas",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lauxreformas.vercel.app",

  phone: "644 123 456",
  phoneHref: "tel:+34644123456",
  whatsapp: "34644123456",
  email: "info@lauxreformas.es",
  town: "Salvaterra de Miño",
  province: "Pontevedra",
  postalCode: "36450",
  geo: { lat: 42.0833, lng: -8.5 },

  stats: { years: 10, projects: 350, satisfaction: 100 },

  // Titular de la web (aviso legal / privacidad)
  legal: {
    owner: "[NOMBRE O RAZÓN SOCIAL DEL TITULAR]",
    taxId: "[NIF/CIF]",
    address: "[DIRECCIÓN POSTAL COMPLETA]",
    registry: "[DATOS REGISTRALES, si es sociedad]",
  },
} as const;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
