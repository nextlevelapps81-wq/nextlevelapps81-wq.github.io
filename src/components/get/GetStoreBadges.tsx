import { Apple } from "lucide-react";
import {
  GOOGLE_PLAY_URL,
  IOS_APP_STORE_URL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const BADGE_SHELL =
  "relative flex h-[56px] w-full items-center gap-3 overflow-hidden rounded-[14px] bg-[#0a0a0a] px-4 ring-1 ring-inset ring-white/[0.12] shadow-[0_2px_10px_rgba(0,0,0,0.22)]";

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-9 w-9 shrink-0", className)}
      aria-hidden
    >
      <path
        fill="#EA4335"
        d="M3.6 1.8c-.3.2-.5.6-.5 1v18.4c0 .4.2.8.5 1l10.2-10.2L3.6 1.8z"
      />
      <path
        fill="#FBBC04"
        d="M14.3 12 3.6 22.2c.3.2.7.2 1.1 0l12.6-7.3-3-2.9z"
      />
      <path
        fill="#34A853"
        d="M17.3 10.9 5.7 3.6c-.4-.2-.8-.2-1.1 0L14.3 12l3-1.1z"
      />
      <path
        fill="#4285F4"
        d="M17.3 13.1l-3 1.1 2.9 2.9 2.7-1.6c.8-.5.8-1.4 0-1.9l-2.6-1.5z"
      />
    </svg>
  );
}

function BadgeText({
  small,
  large,
}: {
  small: string;
  large: string;
}) {
  return (
    <div className="min-w-0 flex-1 text-start leading-none text-white">
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/85">
        {small}
      </p>
      <p className="mt-1 font-display text-[17px] font-semibold tracking-tight text-white">
        {large}
      </p>
    </div>
  );
}

function ComingSoonRibbon() {
  return (
    <span
      className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-12 overflow-hidden"
      aria-hidden
    >
      <span className="absolute right-[-22px] top-[9px] w-[88px] rotate-45 bg-accent-purple py-[3px] text-center text-[7px] font-bold uppercase leading-none tracking-[0.12em] text-white shadow-sm">
        Coming Soon
      </span>
    </span>
  );
}

export function GetStoreBadges() {
  const iosLive = IOS_APP_STORE_URL.length > 0;

  return (
    <div className="flex w-full flex-col items-stretch gap-3">
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          BADGE_SHELL,
          "focus-ring transition-transform active:scale-[0.98]"
        )}
        aria-label="Get ZYRCA on Google Play"
      >
        <GooglePlayIcon />
        <BadgeText small="Get it on" large="Google Play" />
      </a>

      {iosLive ? (
        <a
          href={IOS_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            BADGE_SHELL,
            "focus-ring transition-transform active:scale-[0.98]"
          )}
          aria-label="Download ZYRCA on the App Store"
        >
          <Apple className="h-9 w-9 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
          <BadgeText small="Download on the" large="App Store" />
        </a>
      ) : (
        <div
          className={cn(BADGE_SHELL, "cursor-default select-none")}
          aria-label="Coming Soon to the App Store"
          role="img"
        >
          <ComingSoonRibbon />
          <Apple className="h-9 w-9 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
          <BadgeText small="Download on the" large="App Store" />
        </div>
      )}
    </div>
  );
}
