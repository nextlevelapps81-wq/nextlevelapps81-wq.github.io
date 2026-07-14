export const FEATURE_KEYS = [
  "smartAssistant",
  "fasting",
  "water",
  "weight",
  "analytics",
  "statistics",
  "history",
  "fastingGuide",
  "achievements",
  "notifications",
  "pdfExport",
  "csvExport",
  "shareReports",
  "darkTheme",
  "lightTheme",
  "languages",
  "privacy",
  "dashboard",
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];

export const SCREENSHOT_COUNT = 8;

export const SCREENSHOT_CAPTION_KEYS = [
  "dashboard",
  "intelligence",
  "fasting",
  "water",
  "weight",
  "analytics",
  "achievements",
  "fastingGuide",
] as const;
