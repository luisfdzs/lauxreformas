import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import Logo from "./Logo";
import { navItems } from "./nav";

export default async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900 text-white/70">
      <div className="container-x flex flex-col gap-6 py-6 text-xs lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" aria-label="LAUX Reformas" className="self-start lg:self-auto">
          <Logo size="sm" />
        </Link>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-gold">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-2 lg:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link href="/aviso-legal" className="hover:text-gold">
                {t("footer.legalNotice")}
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="hover:text-gold">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
          <p className="text-white/50">
            © {year} {site.name}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
