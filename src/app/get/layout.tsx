import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { ReactNode } from "react";

export default function GetLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-bg-primary text-text-primary">{children}</div>
    </ThemeProvider>
  );
}
