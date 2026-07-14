import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  APP_NAME,
  BASE_PATH,
  SITE_URL,
  SUPPORT_EMAIL,
  type Locale,
  LOCALES,
} from "./constants";
import { getOpenGraphLocale } from "./locale-detection";

type PageKey =
  | "home"
  | "features"
  | "privacy"
  | "terms"
  | "support"
  | "deleteAccount";

export async function generatePageMetadata(
  locale: Locale,
  page: PageKey,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const keywords = t(`${page}.keywords`);
  const ogAlt = t("structuredData.ogAlt");
  const canonical = `${SITE_URL}/${locale}${path ? `/${path}` : ""}`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}${path ? `/${path}` : ""}`;
  }
  languages["x-default"] = `${SITE_URL}/en${path ? `/${path}` : ""}`;

  const ogImage = `${SITE_URL}${BASE_PATH}/og-image.png`;

  return {
    title,
    description,
    keywords: keywords.split(", ").filter(Boolean),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: canonical,
      siteName: APP_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: `${BASE_PATH}/favicon.ico`, sizes: "32x32" },
        { url: `${BASE_PATH}/icons/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
        { url: `${BASE_PATH}/icons/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
        { url: `${BASE_PATH}/icons/favicon-48x48.png`, sizes: "48x48", type: "image/png" },
        { url: `${BASE_PATH}/icons/favicon-64x64.png`, sizes: "64x64", type: "image/png" },
      ],
      apple: [
        { url: `${BASE_PATH}/icons/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: `${BASE_PATH}/site.webmanifest`,
  };
}

export function getBreadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path ? `/${item.path}` : ""}`,
    })),
  };
}

export async function getOrganizationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "seo.structuredData" });

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${BASE_PATH}/images/logo/logo.png`,
    description: t("organizationDescription"),
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: t("contactType"),
      email: SUPPORT_EMAIL,
      availableLanguage: LOCALES,
    },
  };
}

export async function getSoftwareApplicationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "seo.structuredData" });

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "HealthApplication",
    operatingSystem: "Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: t("appDescription"),
    featureList: t("appFeatures").split("|").map((item) => item.trim()).filter(Boolean),
    inLanguage: locale,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}${BASE_PATH}/images/logo/app-icon-512.png`,
  };
}

export async function getWebsiteJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "seo.structuredData" });

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: SITE_URL,
    description: t("websiteDescription"),
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/support?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
