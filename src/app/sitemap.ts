import type { MetadataRoute } from "next";
import { LOCALES, PAGES, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: new Date("2026-07-14"),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "features" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [
              loc,
              `${SITE_URL}/${loc}${page ? `/${page}` : ""}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
