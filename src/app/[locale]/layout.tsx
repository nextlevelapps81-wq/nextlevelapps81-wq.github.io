import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import { RTL_LOCALES, type Locale } from "@/lib/constants";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });
  const isRtl = RTL_LOCALES.includes(locale as Locale);

  return (
    <div
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={isRtl ? "font-[family-name:var(--font-arabic)]" : ""}
    >
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
}
