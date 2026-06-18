"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/i18n/I18nProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
