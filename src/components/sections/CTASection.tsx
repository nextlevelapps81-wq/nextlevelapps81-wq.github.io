import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StoreButtons } from "@/components/ui/StoreButtons";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <AnimatedSection className="py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border px-8 py-16 text-center lg:px-16 lg:py-20">
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: "var(--gradient-card)" }}
            aria-hidden
          />
          <div
            className="hero-glow left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 bg-accent-purple/20"
            aria-hidden
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {t("description")}
            </p>
            <div className="mt-8 flex justify-center">
              <StoreButtons size="lg" />
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
