"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BASE_PATH, LOCALE_NAMES, LOCALES, type Locale } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DROPDOWN_ESTIMATED_HEIGHT = LOCALES.length * 40 + 16;

interface LanguageSwitcherProps {
  className?: string;
  placement?: "auto" | "above" | "below";
}

export function LanguageSwitcher({
  className,
  placement: placementProp = "auto",
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"above" | "below">("below");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function resolvePlacement() {
    if (placementProp !== "auto") {
      return placementProp;
    }
    if (!ref.current) {
      return "below";
    }
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    return spaceBelow >= DROPDOWN_ESTIMATED_HEIGHT || spaceBelow >= spaceAbove
      ? "below"
      : "above";
  }

  function toggleOpen() {
    if (!open) {
      setPlacement(resolvePlacement());
    }
    setOpen((prev) => !prev);
  }

  function switchLocale(newLocale: Locale) {
    const href = getPathname({ locale: newLocale, href: pathname });
    window.location.assign(`${BASE_PATH}${href}`);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={toggleOpen}
        className="focus-ring flex min-h-12 items-center gap-1.5 rounded-full border border-border bg-bg-card px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={tNav("selectLanguage")}
      >
        <Globe className="h-3.5 w-3.5 text-text-secondary" aria-hidden />
        <span>{LOCALE_NAMES[locale]}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-text-secondary transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={tNav("languageList")}
          className={cn(
            "absolute start-0 z-[100] min-w-[160px] max-w-[min(100vw-2rem,240px)] overflow-hidden rounded-xl border border-border bg-bg-card py-1 shadow-lg",
            placement === "above" ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {LOCALES.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className={cn(
                  "focus-ring flex min-h-12 w-full items-center px-4 py-2.5 text-start text-sm transition-colors hover:bg-bg-secondary",
                  loc === locale
                    ? "font-semibold text-accent-purple"
                    : "text-text-primary"
                )}
              >
                {LOCALE_NAMES[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
