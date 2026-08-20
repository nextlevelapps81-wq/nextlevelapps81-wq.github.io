import type { Metadata } from "next";
import { SmartDownloadPage } from "@/components/get/SmartDownloadPage";
import { APP_NAME, BASE_PATH, SITE_URL } from "@/lib/constants";

const title = "ZYRCA — Get the App";
const description =
  "Download ZYRCA, your smarter fasting and wellness companion.";
const ogImage = `${SITE_URL}${BASE_PATH}/og-image.png`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/get`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/get`,
    siteName: APP_NAME,
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GetPage() {
  return <SmartDownloadPage />;
}
