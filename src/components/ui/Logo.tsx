"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { assetPath } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
};

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const t = useTranslations("images");
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={assetPath("/images/logo/logo.png")}
        alt={t("logo")}
        width={s.icon}
        height={s.icon}
        sizes={`${s.icon}px`}
        className="shrink-0"
        priority
      />
      {showText && (
        <span
          className={cn(
            "font-display font-bold tracking-tight text-text-primary",
            s.text
          )}
        >
          ZYRCA
        </span>
      )}
    </div>
  );
}
