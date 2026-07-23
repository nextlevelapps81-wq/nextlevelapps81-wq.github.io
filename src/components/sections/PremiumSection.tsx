"use client";

import { useTranslations } from "next-intl";
import {
  FileText,
  FileSpreadsheet,
  Share2,
  Sparkles,
  Calendar,
  TrendingUp,
  Scale,
  Droplets,
  Trophy,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureCard } from "@/components/ui/FeatureCard";

const PREMIUM_KEYS = [
  "pdfReports",
  "csvExport",
  "shareProfessionals",
  "smartGuidance",
  "calendar",
  "visualization",
  "weightTrends",
  "waterStats",
  "achievements",
  "expertGuides",
] as const;

const PREMIUM_ICONS: Record<(typeof PREMIUM_KEYS)[number], LucideIcon> = {
  pdfReports: FileText,
  csvExport: FileSpreadsheet,
  shareProfessionals: Share2,
  smartGuidance: Sparkles,
  calendar: Calendar,
  visualization: TrendingUp,
  weightTrends: Scale,
  waterStats: Droplets,
  achievements: Trophy,
  expertGuides: BookOpen,
};

export function PremiumSection() {
  const t = useTranslations("premium");
  const tNav = useTranslations("nav");

  return (
    <AnimatedSection id="premium" className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-accent-purple/20 bg-accent-purple/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent-purple">
            {tNav("premium")}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIUM_KEYS.map((key, index) => (
            <FeatureCard
              key={key}
              icon={PREMIUM_ICONS[key]}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              index={index}
            />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
