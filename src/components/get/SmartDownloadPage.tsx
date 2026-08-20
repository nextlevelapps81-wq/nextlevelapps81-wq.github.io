import Image from "next/image";
import Link from "next/link";
import { Timer, Droplets, BarChart3, Apple } from "lucide-react";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import {
  APP_NAME,
  GOOGLE_PLAY_URL,
  IOS_APP_STORE_URL,
} from "@/lib/constants";
import { assetPath, cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Timer,
    title: "Smart Fasting",
    description: "Track flexible fasting schedules and build consistency.",
  },
  {
    icon: Droplets,
    title: "Complete Wellness Tracking",
    description:
      "Track water, weight, sleep, meals and activity in one place.",
  },
  {
    icon: BarChart3,
    title: "Personal Insights",
    description:
      "Understand your progress with statistics, history and Wellness Score.",
  },
] as const;

export function SmartDownloadPage() {
  const iosLive = IOS_APP_STORE_URL.length > 0;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div
        className="hero-glow pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[320px] -translate-x-1/2 bg-accent-purple/25"
        aria-hidden
      />
      <div
        className="hero-glow pointer-events-none absolute -right-20 top-1/3 h-[240px] w-[240px] bg-accent-pink/15"
        aria-hidden
      />

      <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-10 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2.5">
            <Image
              src={assetPath("/images/logo/logo.png")}
              alt={`${APP_NAME} logo`}
              width={40}
              height={40}
              className="shrink-0"
              priority
            />
            <span className="font-display text-2xl font-bold tracking-tight text-text-primary">
              {APP_NAME}
            </span>
          </div>

          <PhoneMockup
            src={assetPath("/images/screenshots/light/screenshot-1.png")}
            alt="ZYRCA wellness dashboard with fasting timer and health tracking"
            className="mb-8"
            priority
          />

          <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl">
            Your Smarter Fasting &amp; Wellness Companion
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary sm:text-base">
            Track fasting, hydration, weight, sleep and daily wellness — all in
            one simple app.
          </p>

          <div className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-4">
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-[52px] items-center justify-center rounded-[11px] bg-black ring-1 ring-inset ring-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-transform active:scale-[0.98]"
              aria-label="Get ZYRCA on Google Play"
            >
              <Image
                src={assetPath("/images/badges/google-play-badge.png")}
                alt="Get ZYRCA on Google Play"
                width={646}
                height={250}
                className="h-[46px] w-auto max-w-[92%] object-contain"
                priority
              />
            </a>

            {iosLive ? (
              <a
                href={IOS_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex min-h-[52px] items-center justify-center rounded-[11px] bg-black ring-1 ring-inset ring-white/[0.08]"
                aria-label="Download ZYRCA on the App Store"
              >
                <Image
                  src={assetPath("/images/badges/app-store-badge-black.svg")}
                  alt="Download on the App Store"
                  width={250}
                  height={83}
                  className="h-[38px] w-auto max-w-[85%] object-contain dark:hidden"
                />
                <Image
                  src={assetPath("/images/badges/app-store-badge-white.svg")}
                  alt="Download on the App Store"
                  width={250}
                  height={83}
                  className="hidden h-[38px] w-auto max-w-[85%] object-contain dark:block"
                />
              </a>
            ) : (
              <div
                className={cn(
                  "flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border border-border bg-bg-card px-4",
                  "text-sm font-medium text-text-secondary"
                )}
                aria-label="Coming Soon to the App Store"
              >
                <Apple className="h-5 w-5 shrink-0 text-text-muted" aria-hidden />
                <span>Coming Soon to the App Store</span>
              </div>
            )}
          </div>
        </div>

        <ul className="mt-10 space-y-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex gap-3 rounded-2xl border border-border bg-bg-card/60 p-4"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple"
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 text-start">
                <p className="text-sm font-semibold text-text-primary">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <Link
            href="/en/"
            className="focus-ring text-sm font-medium text-accent-purple underline-offset-2 hover:underline"
          >
            Explore ZYRCA
          </Link>
        </p>
      </main>

      <footer className="border-t border-border px-5 py-5 text-center">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
