export const APP_NAME = "ZYRCA";
export const APP_TAGLINE = "Smart Fasting Tracker";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nextlevelapps81-wq.github.io";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SUPPORT_EMAIL = "nextlevelapps81@gmail.com";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.vitality.fasting";
export const APP_STORE_URL = "#";

export const LOCALES = [
  "en",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "ar",
] as const;

export type Locale = (typeof LOCALES)[number];

export const RTL_LOCALES: Locale[] = ["ar"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  ar: "العربية",
};

export const PAGES = [
  "",
  "features",
  "privacy",
  "terms",
  "support",
  "delete-account",
] as const;

export type PageSlug = (typeof PAGES)[number];
