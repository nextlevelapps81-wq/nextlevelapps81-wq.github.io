import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Mail, Trash2, AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return generatePageMetadata(
    locale as Locale,
    "deleteAccount",
    "delete-account"
  );
}

export default async function DeleteAccountPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "deleteAccount" });
  const steps = t.raw("steps") as string[];
  const dataItems = t.raw("dataItems") as string[];

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd(locale as Locale, [
          { name: "Home", path: "" },
          { name: t("title"), path: "delete-account" },
        ])}
      />
      <div className="pt-24 pb-24 lg:pt-32">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <Trash2 className="h-8 w-8" aria-hidden />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary break-words sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">{t("subtitle")}</p>
          </div>

          <div className="space-y-8">
            <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-8">
              <h2 className="mb-6 font-display text-xl font-semibold text-text-primary">
                {t("howTitle")}
              </h2>
              <ol className="space-y-4">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-purple text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-text-secondary">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-8">
              <h2 className="mb-4 font-display text-xl font-semibold text-text-primary">
                {t("alternativeTitle")}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {t("alternativeDescription")}
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Account%20Deletion%20Request`}
                className="focus-ring inline-flex min-h-12 max-w-full items-center gap-2 break-all text-sm font-medium text-accent-purple hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {SUPPORT_EMAIL}
              </a>
            </section>

            <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-8">
              <h2 className="mb-4 font-display text-xl font-semibold text-text-primary">
                {t("dataTitle")}
              </h2>
              <ul className="space-y-2">
                {dataItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex min-w-0 items-start gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-6">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                aria-hidden
              />
              <div>
                <h2 className="font-display text-lg font-semibold text-text-primary">
                  {t("retentionTitle")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {t("retentionDescription")}
                </p>
              </div>
            </section>

            <section className="text-center">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                {t("contactTitle")}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                {t("contactDescription")}
              </p>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
