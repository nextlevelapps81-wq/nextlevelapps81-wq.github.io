import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
} from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return generatePageMetadata(locale as Locale, "support", "support");
}

export default async function SupportPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "support" });
  const faqs = t.raw("faqs") as { question: string; answer: string }[];

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd(locale as Locale, [
            { name: "Home", path: "" },
            { name: t("title"), path: "support" },
          ]),
          getFaqJsonLd(faqs),
        ]}
      />
      <div className="pt-24 pb-24 lg:pt-32">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary break-words sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">{t("subtitle")}</p>
          </div>

          <div className="mb-16 min-w-0 overflow-hidden rounded-2xl border border-border bg-bg-card p-5 text-center sm:p-8">
            <h2 className="font-display text-xl font-semibold text-text-primary">
              {t("contactTitle")}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t("contactDescription")}
            </p>
            <div className="mt-6 flex w-full min-w-0 justify-center">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="focus-ring mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-full bg-accent-purple px-4 py-3 text-sm font-semibold leading-snug text-white transition-colors hover:bg-accent-purple-dark sm:inline-flex sm:w-auto sm:max-w-none sm:px-6"
                aria-label={t("emailLabel")}
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <span className="min-w-0 break-all text-center sm:break-normal">
                  {t("email")}
                </span>
              </a>
            </div>
          </div>

          <h2 className="mb-6 font-display text-2xl font-semibold text-text-primary">
            {t("faqTitle")}
          </h2>
          <FAQAccordion items={faqs} />
        </Container>
      </div>
    </>
  );
}
