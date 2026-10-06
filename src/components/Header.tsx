"use client";

import { useState } from "react";
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


  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
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

      {open ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-ink-900 lg:hidden">
          <nav className="container-x py-4" aria-label="Principal">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm font-medium tracking-[0.08em] uppercase ${isActive(item.href) ? "text-gold" : "text-white"}`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <LocaleSwitcher />
              <a
                href={whatsappHref(t("common.whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-4 py-2.5 text-sm font-semibold text-white"
              >
                <WhatsappIcon className="size-5" />
                {site.whatsappDisplay}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
