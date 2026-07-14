import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { LegalDocument } from "@/components/ui/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return generatePageMetadata(locale as Locale, "privacy", "privacy");
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd(locale as Locale, [
          { name: "Home", path: "" },
          { name: t("title"), path: "privacy" },
        ])}
      />
      <div className="pt-24 pb-24 lg:pt-32">
        <Container className="max-w-3xl">
          <LegalDocument
            title={t("title")}
            lastUpdated={t("lastUpdated")}
            intro={t("intro")}
            sections={t.raw("sections")}
          />
        </Container>
      </div>
    </>
  );
}
