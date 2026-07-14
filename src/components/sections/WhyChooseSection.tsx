"use client";

import { useTranslations } from "next-intl";
import {
  Layers,
  Sparkles,
  FileText,
  Palette,
  Globe,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const REASON_KEYS = [
  "allInOne",
  "smartGuidance",
  "professional",
  "beautiful",
  "global",
  "secure",
] as const;

const REASON_ICONS: Record<(typeof REASON_KEYS)[number], LucideIcon> = {
  allInOne: Layers,
  smartGuidance: Sparkles,
  professional: FileText,
  beautiful: Palette,
  global: Globe,
  secure: Shield,
};

export function WhyChooseSection() {
  const t = useTranslations("whyChoose");
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatedSection className="bg-bg-secondary py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASON_KEYS.map((key, index) => {
            const Icon = REASON_ICONS[key];
            const content = (
              <div
                className={cn(
                  "h-full rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent-purple/30 hover:shadow-lg",
                )}
                style={{ backgroundImage: "var(--gradient-card)" }}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
                  {t(`reasons.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {t(`reasons.${key}.description`)}
                </p>
              </div>
            );

            if (prefersReducedMotion) {
              return <div key={key}>{content}</div>;
            }

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </AnimatedSection>
  );
}
