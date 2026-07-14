import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PremiumSection } from "@/components/sections/PremiumSection";
import { ScreenshotsSection } from "@/components/sections/ScreenshotsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  getOrganizationJsonLd,
  getSoftwareApplicationJsonLd,
  getWebsiteJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/lib/constants";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  return generatePageMetadata(locale as Locale, "home", "");
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const structuredData = await Promise.all([
    getOrganizationJsonLd(locale as Locale),
    getSoftwareApplicationJsonLd(locale as Locale),
    getWebsiteJsonLd(locale as Locale),
  ]);

  return (
    <>
      <JsonLd data={structuredData} />
      <HeroSection />
      <JourneySection />
      <FeaturesSection />
      <PremiumSection />
      <ScreenshotsSection />
      <AboutSection />
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
