import Image from "next/image";
import Link from "next/link";
import { Timer, Droplets, BarChart3 } from "lucide-react";
import { GetStoreBadges } from "@/components/get/GetStoreBadges";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { APP_NAME } from "@/lib/constants";
import { assetPath } from "@/lib/utils";

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

          <div className="mt-8 w-full max-w-xs">
            <GetStoreBadges />
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
