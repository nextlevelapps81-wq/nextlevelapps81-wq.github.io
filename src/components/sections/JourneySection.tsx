"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Activity,
  BarChart3,
  FileOutput,
  Trophy,
  ArrowDown,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const STEP_KEYS = [
  "discover",
  "track",
  "analyze",
  "guidance",
  "export",
  "achieve",
] as const;

const STEP_ICONS: Record<(typeof STEP_KEYS)[number], LucideIcon> = {
  discover: Sparkles,
  track: Activity,
  analyze: BarChart3,
  guidance: BookOpen,
  export: FileOutput,
  achieve: Trophy,
};

export function JourneySection() {
  const t = useTranslations("journey");
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatedSection id="journey" className="bg-bg-secondary py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {STEP_KEYS.map((key, index) => {
            const Icon = STEP_ICONS[key];
            const isLast = index === STEP_KEYS.length - 1;

            return (
              <div key={key} className="relative">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex min-w-0 gap-4 pb-8 sm:gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple ring-1 ring-accent-purple/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    {!isLast && (
                      <div className="mt-2 flex flex-1 flex-col items-center">
                        <div className="h-full w-px bg-gradient-to-b from-accent-purple/40 to-accent-pink/20" />
                      </div>
                    )}
                  </div>

                  <div className={cn("min-w-0 flex-1 pb-2 pt-1", isLast && "pb-0")}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="break-words font-display text-lg font-semibold text-text-primary">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </motion.div>

                {!isLast && !prefersReducedMotion && (
                  <div className="absolute left-6 top-12 -ml-px hidden h-8 w-px sm:block">
                    <ArrowDown className="h-4 w-4 -translate-x-1/2 text-accent-purple/30" aria-hidden />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </AnimatedSection>
  );
}
