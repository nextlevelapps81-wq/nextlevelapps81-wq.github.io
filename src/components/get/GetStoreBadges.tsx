"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { GOOGLE_PLAY_URL, IOS_APP_STORE_URL } from "@/lib/constants";
import { useClientMounted } from "@/lib/useClientMounted";
import { assetPath } from "@/lib/utils";

/** Official Google Play badge: 646×250 */
const GOOGLE_PLAY_BADGE = {
  width: 646,
  height: 250,
  src: "/images/badges/google-play-badge.png",
} as const;

/** Official App Store badge SVG: ~120×40 */
const APP_STORE_BADGE = {
  width: 120,
  height: 40,
  black: "/images/badges/app-store-badge-black.svg",
  white: "/images/badges/app-store-badge-white.svg",
} as const;

function ComingSoonRibbon() {
  return (
    <span
      className="pointer-events-none absolute -top-3 right-1 z-10 rounded-full bg-accent-purple px-2.5 py-1 text-[9px] font-bold uppercase leading-none tracking-[0.14em] text-white shadow-md"
      aria-hidden
    >
      Coming Soon
    </span>
  );
}

export function GetStoreBadges() {
  const { resolvedTheme } = useTheme();
  const mounted = useClientMounted();
  const iosLive = IOS_APP_STORE_URL.length > 0;

  const appStoreBadgeSrc =
    mounted && resolvedTheme === "dark"
      ? assetPath(APP_STORE_BADGE.white)
      : assetPath(APP_STORE_BADGE.black);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring block w-full max-w-[280px] transition-transform active:scale-[0.98]"
        aria-label="Get ZYRCA on Google Play"
      >
        <Image
          src={assetPath(GOOGLE_PLAY_BADGE.src)}
          alt="Get it on Google Play"
          width={GOOGLE_PLAY_BADGE.width}
          height={GOOGLE_PLAY_BADGE.height}
          className="h-auto w-full"
          priority
        />
      </a>

      {iosLive ? (
        <a
          href={IOS_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring block w-full max-w-[270px] transition-transform active:scale-[0.98]"
          aria-label="Download ZYRCA on the App Store"
        >
          <Image
            src={appStoreBadgeSrc}
            alt="Download on the App Store"
            width={APP_STORE_BADGE.width}
            height={APP_STORE_BADGE.height}
            className="h-auto w-full"
          />
        </a>
      ) : (
        <div
          className="relative w-full max-w-[270px]"
          aria-label="Coming Soon to the App Store"
        >
          <ComingSoonRibbon />
          <Image
            src={appStoreBadgeSrc}
            alt="Download on the App Store — Coming Soon"
            width={APP_STORE_BADGE.width}
            height={APP_STORE_BADGE.height}
            className="h-auto w-full"
            aria-hidden={false}
          />
        </div>
      )}
    </div>
  );
}
