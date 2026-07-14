import Script from "next/script";
import { BASE_PATH } from "@/lib/constants";
import { buildLocaleRedirectScript } from "@/lib/locale-detection";

export default function RootPage() {
  const basePath = BASE_PATH;

  return (
    <>
      <Script
        id="locale-redirect"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: buildLocaleRedirectScript(basePath),
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${basePath}/en/`} />
      </noscript>
      <div className="flex min-h-screen items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-accent-purple border-t-transparent"
            role="status"
            aria-label="Loading"
          />
          <p className="text-sm text-text-secondary">Loading ZYRCA...</p>
        </div>
      </div>
    </>
  );
}
