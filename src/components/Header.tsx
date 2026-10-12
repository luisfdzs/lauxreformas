"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { site, whatsappHref } from "@/config/site";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";
import WhatsappIcon from "./ui/WhatsappIcon";
import { navItems } from "./nav";

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Con el menú abierto: sin scroll de fondo y Escape lo cierra.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-ink-900/95 backdrop-blur">
        <div className="container-x flex h-[4.75rem] items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label="LAUX Reformas">
            <Logo />
          </Link>

          <nav className="hidden lg:block" aria-label="Principal">
            <ul className="flex items-center gap-7 text-[0.7rem] font-medium tracking-[0.08em] uppercase">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`transition-colors hover:text-gold ${isActive(item.href) ? "text-gold" : "text-white"}`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LocaleSwitcher />
            <a
              href={whatsappHref(t("common.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
            >
              <WhatsappIcon className="size-5" />
              {site.whatsappDisplay}
            </a>
          </div>

          <button
            type="button"
            className="p-2 text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Fuera del header: su backdrop-blur encerraría un hijo fixed en su propia caja. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink-900 pt-[4.75rem] transition-[opacity,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          className="container-x flex min-h-full flex-col items-center justify-center gap-6 pb-16 text-center"
          aria-label="Principal"
        >
          <ul className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-[clamp(1.375rem,1.282rem+0.38vw,1.625rem)] leading-[1.2] tracking-tight transition-colors duration-300 hover:text-white ${isActive(item.href) ? "text-gold" : "text-white/70"}`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-center gap-6 border-t border-white/10 pt-6">
            <LocaleSwitcher />
            <a
              href={whatsappHref(t("common.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
            >
              <WhatsappIcon className="size-5" />
              {site.whatsappDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
