import { LOCALES, type Locale } from "./constants";

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  pt: "pt_BR",
  ar: "ar_SA",
};

export function getOpenGraphLocale(locale: Locale): string {
  return OG_LOCALE_MAP[locale];
}

export function buildLocaleRedirectScript(basePath: string): string {
  const locales = LOCALES.map((locale) => `"${locale}"`).join(",");
  const base = basePath.replace(/'/g, "\\'");

  return `(function(){var locales=[${locales}],langs=navigator.languages&&navigator.languages.length?Array.from(navigator.languages):[navigator.language||"en"],locale="en";for(var i=0;i<langs.length;i++){if(!langs[i])continue;var primary=langs[i].toLowerCase().split("-")[0];if(locales.indexOf(primary)>-1){locale=primary;break;}}location.replace("${base}/"+locale+"/");})();`;
}
