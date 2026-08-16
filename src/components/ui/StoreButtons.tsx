"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";
import { GOOGLE_PLAY_URL, APP_STORE_URL } from "@/lib/constants";
import { useClientMounted } from "@/lib/useClientMounted";
import { assetPath, cn } from "@/lib/utils";

interface StoreButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
}

const SIZES = {
  sm: {
    shell: "h-10 w-[136px]",
    radius: "rounded-[9px]",
    gap: "gap-2",
    google: "h-[94%] w-auto max-w-[98%]",
    apple: "h-[80%] w-auto max-w-[90%]",
  },
  md: {
    shell: "h-11 w-[152px]",
    radius: "rounded-[10px]",
    gap: "gap-2.5",
    google: "h-[94%] w-auto max-w-[98%]",
    apple: "h-[80%] w-auto max-w-[90%]",
  },
  lg: {
    shell: "h-[52px] w-[168px]",
    radius: "rounded-[11px]",
    gap: "gap-2.5",
    google: "h-[94%] w-auto max-w-[98%]",
    apple: "h-[80%] w-auto max-w-[90%]",
  },
} as const;

function BadgeShell({
  children,
  size,
  interactive = false,
}: {
  children: ReactNode;
  size: keyof typeof SIZES;
  interactive?: boolean;
}) {
  const s = SIZES[size];

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[168px] shrink-0 items-center justify-center overflow-hidden bg-black sm:w-auto",
        s.shell,
        s.radius,
        "ring-1 ring-inset ring-white/[0.08]",
        "shadow-[0_1px_2px_rgba(0,0,0,0.24),0_2px_8px_rgba(0,0,0,0.12)]",
        interactive
          ? "transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(0,0,0,0.28),0_6px_16px_rgba(0,0,0,0.16)] active:translate-y-0"
          : "cursor-not-allowed"
      )}
    >
      {children}
    </div>
  );
}

export function StoreButtons({
  className,
  size = "md",
  layout = "horizontal",
}: StoreButtonsProps) {
  const t = useTranslations("hero");
  const tImages = useTranslations("images");
  const { resolvedTheme } = useTheme();
  const mounted = useClientMounted();

  const s = SIZES[size];

  const appStoreBadge =
    mounted && resolvedTheme === "dark"
      ? assetPath("/images/badges/app-store-badge-white.svg")
      : assetPath("/images/badges/app-store-badge-black.svg");

  return (
    <div
      role="group"
      aria-label={t("storeGroup")}
      className={cn(
        "flex w-full max-w-full min-w-0 items-center justify-center",
        s.gap,
        layout === "vertical"
          ? "flex-col"
          : "flex-col sm:flex-row",
        className
      )}
    >
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring inline-flex min-h-12 shrink-0 items-center rounded-[11px]"
        aria-label={t("ctaPlay")}
      >
        <BadgeShell size={size} interactive>
          <Image
            src={assetPath("/images/badges/google-play-badge.png")}
            alt={tImages("storePlay")}
            width={646}
            height={250}
            className={cn(s.google, "object-contain object-center")}
            priority
          />
        </BadgeShell>
      </a>

      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring inline-flex min-h-12 shrink-0 items-center rounded-[11px]"
        aria-label={tImages("storeAppStore")}
      >
        <BadgeShell size={size} interactive>
          <Image
            src={appStoreBadge}
            alt={tImages("storeAppStore")}
            width={250}
            height={83}
            className={cn(s.apple, "object-contain object-center")}
          />
        </BadgeShell>
      </a>
    </div>
  );
}
