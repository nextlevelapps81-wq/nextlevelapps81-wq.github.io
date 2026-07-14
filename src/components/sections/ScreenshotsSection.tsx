import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ScreenshotCarousel } from "@/components/ui/ScreenshotCarousel";
import { SCREENSHOT_CAPTION_KEYS } from "@/lib/features";

export function ScreenshotsSection() {
  const t = useTranslations("screenshots");
  const tImages = useTranslations("images");

  function buildScreenshots(mode: "dark" | "light") {
    const base = `/images/screenshots/${mode}`;

    return SCREENSHOT_CAPTION_KEYS.map((key, i) => ({
      src: `${base}/screenshot-${i + 1}.png`,
      alt: tImages(mode === "dark" ? "screenshotDark" : "screenshotLight", {
        screen: t(`captions.${key}`),
      }),
      captionKey: key,
    }));
  }

  return (
    <AnimatedSection id="screenshots" className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <ScreenshotCarousel
          darkScreenshots={buildScreenshots("dark")}
          lightScreenshots={buildScreenshots("light")}
        />
      </Container>
    </AnimatedSection>
  );
}
