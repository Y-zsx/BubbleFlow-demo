"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const navSectionIds = ["product", "scenes", "spatial-audio", "features", "specs"];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const reducedMotion = useReducedMotion();

  const navLinks = [
    { label: t("nav.product"), href: "#product" },
    { label: t("nav.scenes"), href: "#scenes" },
    { label: t("nav.audio"), href: "#spatial-audio" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.guide"), href: "#specs" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      for (let i = navSectionIds.length - 1; i >= 0; i -= 1) {
        const element = document.getElementById(navSectionIds[i]);
        if (element && element.getBoundingClientRect().top <= 120) {
          setActiveHash(`#${navSectionIds[i]}`);
          return;
        }
      }

      setActiveHash("");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-2xl"
          : "border-transparent bg-transparent"
      }`}
      style={{
        borderColor: scrolled ? "var(--line)" : "transparent",
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-6">
        <a href="#" className="group flex min-h-11 items-center gap-2" aria-label="Home">
          <BrandLogo size={32} className="h-8 w-8 transition-transform duration-200 group-hover:scale-[1.04]" />
          <span className="text-[15px] font-medium transition-colors" style={{ color: "var(--text-primary)" }}>
            BubbleFlow
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center rounded-full px-3.5 text-[14px] font-medium transition-colors duration-200"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--surface-card)" : "transparent",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mx-2 flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <a
            href="#cta"
            className="inline-flex min-h-11 items-center rounded-full px-5 text-[13px] font-medium transition-colors"
            style={{
              borderColor: "var(--accent-brand-faint)",
              backgroundColor: "var(--accent-brand-faint)",
              color: "var(--accent-brand)",
              border: "1px solid var(--accent-brand-faint)",
            }}
          >
            {t("nav.cta")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[18px]" style={{ backgroundColor: "var(--text-secondary)" }} />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] w-[18px]" style={{ backgroundColor: "var(--text-secondary)" }} />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[18px]" style={{ backgroundColor: "var(--text-secondary)" }} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
            className="overflow-hidden backdrop-blur-2xl md:hidden"
            style={{ borderColor: "var(--line)", backgroundColor: "var(--nav-bg)" }}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-4 text-[15px] font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[14px] font-medium"
                style={{
                  color: "var(--accent-brand)",
                  backgroundColor: "var(--accent-brand-faint)",
                  border: "1px solid var(--accent-brand-faint)",
                }}
              >
                {t("nav.cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
