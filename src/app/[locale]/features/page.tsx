import { setRequestLocale } from "next-intl/server";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  getBreadcrumbJsonLd,
} from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return generatePageMetadata(locale as Locale, "features", "features");
}

export default async function FeaturesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "features" });

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd(locale as Locale, [
          { name: "Home", path: "" },
          { name: t("pageTitle"), path: "features" },
        ])}
      />
      <div className="pt-24 lg:pt-32">
        <Container className="pb-8 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {t("pageTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t("pageSubtitle")}
          </p>
        </Container>
      </div>
      <FeaturesSection showAll />
      <CTASection />
    </>
  );
}
