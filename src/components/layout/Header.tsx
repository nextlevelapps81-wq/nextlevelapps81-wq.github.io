"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { GOOGLE_PLAY_URL } from "@/lib/constants";

const navLinks = [
  { href: "/#journey" as const, label: "journey" },
  { href: "/features" as const, label: "features" },
  { href: "/#premium" as const, label: "premium" },
  { href: "/#screenshots" as const, label: "screenshots" },
  { href: "/support" as const, label: "support" },
];

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-clip">
      <div className="glass overflow-x-clip border-b border-border">
        <Container className="flex h-16 items-center justify-between lg:h-[72px]">
          <Link href="/" className="focus-ring min-w-0 shrink rounded-lg" aria-label={t("home")}>
            <Logo size="sm" />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={t("mainNavigation")}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="focus-ring rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="relative hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-12 items-center rounded-full bg-accent-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-purple-dark"
            >
              {t("download")}
            </a>
          </div>

          <button
            type="button"
            className="focus-ring flex h-12 w-12 items-center justify-center rounded-lg text-text-primary lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("close") : t("menu")}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </Container>
      </div>

      <div
        className={cn(
          "glass overflow-hidden border-b border-border transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[min(480px,calc(100dvh-4rem))] overflow-y-auto opacity-100" : "max-h-0 opacity-0 border-none"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="focus-ring flex min-h-12 items-center rounded-lg px-4 py-3 text-sm font-medium text-text-primary hover:bg-bg-card"
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="focus-ring mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-purple px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-purple-dark"
          >
            {t("download")}
          </a>
        </Container>
      </div>
    </header>
  );
}
