"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import zhCN from "./locales/zh-CN.json";
import en from "./locales/en.json";

export type Locale = "zh-CN" | "en";

const dictionaries: Record<Locale, Record<string, unknown>> = { "zh-CN": zhCN, en };

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

function get(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path; // fallback: return the key itself
    }
  }
  return typeof cur === "string" ? cur : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-CN");

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bf-locale") as Locale | null;
    if (stored && (stored === "zh-CN" || stored === "en")) {
      queueMicrotask(() => setLocaleState(stored));
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("bf-locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => get(dictionaries[locale], key),
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
