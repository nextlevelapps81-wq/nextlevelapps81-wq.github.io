import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function AboutSection() {
  const t = useTranslations("about");
  const benefits = t.raw("benefits.items") as string[];

  return (
    <AnimatedSection id="about" className="bg-bg-secondary py-24 lg:py-32">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {(["whatIs", "whyFasting", "whyGuidance"] as const).map((section, i) => (
            <AnimatedSection
              key={section}
              delay={i * 0.1}
              className="rounded-2xl border border-border bg-bg-card p-8"
            >
              <h3 className="mb-4 font-display text-xl font-semibold text-text-primary">
                {t(`${section}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(`${section}.description`)}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection
          delay={0.3}
          className="mt-12 rounded-2xl border border-border bg-bg-card p-8 lg:p-12"
        >
          <h3 className="mb-8 text-center font-display text-2xl font-semibold text-text-primary">
            {t("benefits.title")}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-text-secondary">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </AnimatedSection>
  );
}
