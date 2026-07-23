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
    <div className={cn("flex w-full min-w-0 max-w-full flex-col items-center", className)}>
      <div
        className="mb-8 inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full border border-border bg-bg-card p-1"
        role="tablist"
        aria-label={t("themeTabs")}
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
              "focus-ring min-h-12 rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-5",
              mode === m
                ? "bg-accent-purple text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {m === "dark" ? t("darkMode") : t("lightMode")}
          </button>
        ))}
      </div>

      <div className="relative flex w-full min-w-0 max-w-full items-center justify-center gap-2 px-1 sm:gap-4">
        <button
          type="button"
          onClick={prev}
          className="focus-ring absolute start-0 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-card text-text-primary transition-colors hover:bg-bg-secondary sm:flex"
          aria-label={t("prev")}
        >
          <ChevronLeft className="h-5 w-5 rtl-flip" aria-hidden />
        </button>

        <div className="relative min-h-[min(580px,70dvh)] w-full max-w-[min(100%,300px)] min-w-0">
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
              <p className="mt-5 max-w-full px-2 text-center font-display text-sm font-semibold text-text-primary break-words">
                {t(`captions.${screenshots[index].captionKey}`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={next}
          className="focus-ring absolute end-0 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-card text-text-primary transition-colors hover:bg-bg-secondary sm:flex"
          aria-label={t("next")}
        >
          <ChevronRight className="h-5 w-5 rtl-flip" aria-hidden />
        </button>
      </div>

      <div className="mt-6 flex w-full min-w-0 max-w-full items-center justify-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={prev}
          className="focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg-card"
          aria-label={t("prev")}
        >
          <ChevronLeft className="h-5 w-5 rtl-flip" aria-hidden />
        </button>
        <div className="flex min-w-0 flex-1 flex-wrap justify-center gap-1">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full"
              aria-label={t("slideLabel", { number: i + 1 })}
              aria-current={i === index ? "true" : undefined}
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-accent-purple"
                    : "w-2 bg-border"
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg-card"
          aria-label={t("next")}
        >
          <ChevronRight className="h-5 w-5 rtl-flip" aria-hidden />
        </button>
      </div>

      <div className="mt-4 hidden flex-wrap justify-center gap-1 sm:flex">
        {screenshots.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="focus-ring flex h-12 w-12 items-center justify-center rounded-full"
            aria-label={t("slideLabel", { number: i + 1 })}
            aria-current={i === index ? "true" : undefined}
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all",
                i === index
                  ? "w-6 bg-accent-purple"
                  : "w-2 bg-border hover:bg-text-muted"
              )}
              aria-hidden
            />
          </button>
        ))}
      </div>
    </div>
  );
}
