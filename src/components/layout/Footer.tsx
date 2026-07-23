import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-x-clip border-t border-border bg-bg-secondary">
      <Container className="py-16">
        <div className="grid min-w-0 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              {t("description")}
            </p>
            <div className="mt-6">
              <StoreButtons size="sm" layout="vertical" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t("product")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-purple"
                >
                  {nav("features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-purple"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-purple"
                >
                  {nav("support")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-purple"
                >
                  {nav("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-purple"
                >
                  {nav("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/delete-account"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-purple"
                >
                  {nav("deleteAccount")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t("connect")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs text-text-muted">{t("theme")}</p>
                <ThemeToggle />
              </div>
              <div>
                <p className="mb-2 text-xs text-text-muted">{t("language")}</p>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-text-muted">
            {t("copyright", { year })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
