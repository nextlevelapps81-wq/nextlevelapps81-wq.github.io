"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { assetPath } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");
  const tImages = useTranslations("images");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden pt-16 lg:pt-[72px]">
      <div
        className="hero-glow -top-32 left-1/4 h-[500px] w-[500px] bg-accent-purple/30"
        aria-hidden
      />
      <div
        className="hero-glow -right-32 top-1/3 h-[400px] w-[400px] bg-accent-pink/20"
        aria-hidden
      />

      <Container className="relative flex min-h-[calc(100vh-72px)] min-w-0 flex-col items-center justify-center py-16 sm:py-20 lg:flex-row lg:gap-16">
        <div className="min-w-0 flex-1 text-center lg:text-start">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/10 px-4 py-1.5 text-sm font-medium text-accent-purple">
              <Sparkles className="h-4 w-4" aria-hidden />
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="gradient-text">{t("title")}</span>
          </motion.h1>

          <motion.p
            className="mt-2 font-display text-xl font-semibold text-text-primary sm:text-3xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-secondary lg:mx-0 lg:text-lg"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            id="download"
            className="mt-8 flex w-full min-w-0 justify-center lg:justify-start"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <StoreButtons size="lg" />
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-8 lg:justify-start lg:gap-x-12"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { value: t("statsProtocols"), label: t("statsProtocolsLabel") },
              { value: t("statsLanguages"), label: t("statsLanguagesLabel") },
              { value: t("statsGuides"), label: t("statsGuidesLabel") },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-start">
                <p className="font-display text-2xl font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="max-w-[8.5rem] text-xs text-text-muted sm:max-w-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-12 min-w-0 flex-1 lg:mt-0"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float">
            <PhoneMockup
              src={assetPath("/images/screenshots/light/screenshot-1.png")}
              alt={tImages("heroScreenshot")}
              priority
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
