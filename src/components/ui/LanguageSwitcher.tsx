"use client";

import { Globe } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const toggle = () => {
    setLocale(locale === "zh-CN" ? "en" : "zh-CN");
  };

  return (
    <button
      onClick={toggle}
      className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
      <span>{locale === "zh-CN" ? "中/EN" : "EN/中"}</span>
    </button>
  );
}
