"use client";

import { useTranslations } from "next-intl";
import {
  Sparkles,
  Timer,
  Droplets,
  Scale,
  BarChart3,
  LineChart,
  Calendar,
  BookOpen,
  Trophy,
  Bell,
  FileText,
  FileSpreadsheet,
  Share2,
  Moon,
  Sun,
  Languages,
  Shield,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FEATURE_KEYS, type FeatureKey } from "@/lib/features";

const FEATURE_ICONS: Record<FeatureKey, LucideIcon> = {
  smartAssistant: Sparkles,
  fasting: Timer,
  water: Droplets,
  weight: Scale,
  analytics: BarChart3,
  statistics: LineChart,
  history: Calendar,
  fastingGuide: BookOpen,
  achievements: Trophy,
  notifications: Bell,
  pdfExport: FileText,
  csvExport: FileSpreadsheet,
  shareReports: Share2,
  darkTheme: Moon,
  lightTheme: Sun,
  languages: Languages,
  privacy: Shield,
  dashboard: LayoutDashboard,
};

const HOME_FEATURE_COUNT = 9;

interface FeaturesSectionProps {
  showAll?: boolean;
}

export function FeaturesSection({ showAll = false }: FeaturesSectionProps) {
  const t = useTranslations("features");
  const keys = showAll ? FEATURE_KEYS : FEATURE_KEYS.slice(0, HOME_FEATURE_COUNT);

  return (
    <AnimatedSection id="features" className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {showAll ? t("pageSubtitle") : t("subtitle")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, index) => (
            <FeatureCard
              key={key}
              icon={FEATURE_ICONS[key]}
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
