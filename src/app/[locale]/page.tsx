import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ProjectsStrip from "@/components/sections/ProjectsStrip";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <>
      <Hero />
      <Services />
      <ProjectsStrip />
      <About />
      <Testimonials />
      <CtaBand />
    </>
  );
}
