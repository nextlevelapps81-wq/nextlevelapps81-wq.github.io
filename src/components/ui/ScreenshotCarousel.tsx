"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";
import { assetPath, cn } from "@/lib/utils";

interface Screenshot {
  src: string;
  alt: string;
  captionKey: string;
}

interface ScreenshotCarouselProps {
  darkScreenshots: Screenshot[];
  lightScreenshots: Screenshot[];
  className?: string;
}

export function ScreenshotCarousel({
  darkScreenshots,
  lightScreenshots,
  className,
}: ScreenshotCarouselProps) {
  const t = useTranslations("screenshots");
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const screenshots = mode === "dark" ? darkScreenshots : lightScreenshots;

  function prev() {
    setIndex((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === screenshots.length - 1 ? 0 : i + 1));
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className="mb-8 inline-flex rounded-full border border-border bg-bg-card p-1"
        role="tablist"
        aria-label="Screenshot theme"
      >
        {(["dark", "light"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setIndex(0);
            }}
            className={cn(
              "focus-ring rounded-full px-5 py-2 text-sm font-medium transition-all",
              mode === m
                ? "bg-accent-purple text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {m === "dark" ? t("darkMode") : t("lightMode")}
          </button>
        ))}
      </div>

      <div className="relative flex w-full items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="focus-ring absolute left-0 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-text-primary transition-colors hover:bg-bg-secondary sm:flex"
          aria-label={t("prev")}
        >
          <ChevronLeft className="h-5 w-5 rtl-flip" aria-hidden />
        </button>

        <div className="relative min-h-[580px] w-full max-w-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${index}`}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <PhoneMockup
                src={assetPath(screenshots[index].src)}
                alt={screenshots[index].alt}
                priority={index === 0}
              />
              <p className="mt-5 text-center font-display text-sm font-semibold text-text-primary">
                {t(`captions.${screenshots[index].captionKey}`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={next}
          className="focus-ring absolute right-0 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-text-primary transition-colors hover:bg-bg-secondary sm:flex"
          aria-label={t("next")}
        >
          <ChevronRight className="h-5 w-5 rtl-flip" aria-hidden />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={prev}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card"
          aria-label={t("prev")}
        >
          <ChevronLeft className="h-5 w-5 rtl-flip" aria-hidden />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Screenshot pages">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index
                  ? "w-6 bg-accent-purple"
                  : "w-2 bg-border hover:bg-text-muted"
              )}
              aria-label={`Screenshot ${i + 1}`}
              aria-selected={i === index}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card"
          aria-label={t("next")}
        >
          <ChevronRight className="h-5 w-5 rtl-flip" aria-hidden />
        </button>
      </div>

      <div className="mt-4 hidden gap-2 sm:flex" role="tablist">
        {screenshots.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index
                ? "w-6 bg-accent-purple"
                : "w-2 bg-border hover:bg-text-muted"
            )}
            aria-label={`Screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
