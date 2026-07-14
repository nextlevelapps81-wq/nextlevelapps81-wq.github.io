"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import { GOOGLE_PLAY_URL } from "@/lib/constants";
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
        "relative flex shrink-0 items-center justify-center overflow-hidden bg-black",
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const s = SIZES[size];
  const isPlaceholder = GOOGLE_PLAY_URL === "YOUR_GOOGLE_PLAY_URL";

  const appStoreBadge =
    mounted && resolvedTheme === "dark"
      ? assetPath("/images/badges/app-store-badge-white.svg")
      : assetPath("/images/badges/app-store-badge-black.svg");

  return (
    <div
      role="group"
      aria-label="Download ZYRCA"
      className={cn(
        "inline-flex items-center",
        s.gap,
        layout === "vertical"
          ? "flex-col"
          : "flex-col sm:flex-row",
        className
      )}
    >
      <a
        href={isPlaceholder ? "#download" : GOOGLE_PLAY_URL}
        target={isPlaceholder ? undefined : "_blank"}
        rel={isPlaceholder ? undefined : "noopener noreferrer"}
        className="focus-ring shrink-0 rounded-[11px]"
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

      <div
        className="focus-ring shrink-0 rounded-[11px]"
        aria-label={t("ctaAppStore")}
        title={t("ctaAppStore")}
        role="button"
        aria-disabled="true"
      >
        <BadgeShell size={size}>
          <Image
            src={appStoreBadge}
            alt={tImages("storeAppStore")}
            width={250}
            height={83}
            className={cn(s.apple, "object-contain object-center")}
          />
          <span className="pointer-events-none absolute right-1.5 top-1.5 rounded-full bg-accent-purple px-1.5 py-px text-[7px] font-bold uppercase tracking-wider text-white shadow-sm">
            Soon
          </span>
        </BadgeShell>
      </div>
    </div>
  );
}
