import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants = {
  gold: "bg-gold text-white hover:bg-gold-600",
  outlineLight: "border border-white/70 text-white hover:bg-white hover:text-ink",
  outlineGold: "border border-gold text-white hover:bg-gold",
  outlineDark: "border border-ink text-ink hover:bg-ink hover:text-white",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClass(variant: ButtonVariant = "gold", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

/** Enlace interno (con prefijo de idioma) con aspecto de botón. */
export function ButtonLink({
  variant = "gold",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Enlace externo (WhatsApp, tel:, mailto:) con aspecto de botón. */
export function ButtonA({
  variant = "gold",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
