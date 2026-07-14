import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_PATH, type Locale, LOCALES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedPath(locale: Locale, path = ""): string {
  const base = BASE_PATH ? `${BASE_PATH}` : "";
  const slug = path ? `/${path}` : "";
  return `${base}/${locale}${slug}`;
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const candidates =
    typeof navigator.languages !== "undefined" && navigator.languages.length > 0
      ? Array.from(navigator.languages)
      : [navigator.language];

  for (const lang of candidates) {
    if (!lang) continue;
    const primary = lang.toLowerCase().split("-")[0];
    if (LOCALES.includes(primary as Locale)) {
      return primary as Locale;
    }
  }

  return "en";
}

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
