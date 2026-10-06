import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/config/site";
import { alternates } from "@/lib";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s | ${site.name}` },
    description: t("description"),
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: t("locale"),
      images: [{ url: "/images/hero.jpg", width: 1600, height: 1067 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    image: `${site.url}/images/hero.jpg`,
    logo: `${site.url}/brand/laux-logo-completo.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.town,
      addressRegion: site.province,
      postalCode: site.postalCode,
      addressCountry: "ES",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  };

  return (
    <html lang={locale} className={`${montserrat.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] bg-gold px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1 pt-[4.75rem]">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
