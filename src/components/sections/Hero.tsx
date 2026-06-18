"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";

const BubbleFlowHero = dynamic(() => import("../three/BubbleFlowHero"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ backgroundColor: "var(--surface-0)" }} />,
});

export default function Hero() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="relative min-h-[100svh] overflow-hidden" style={{ backgroundColor: "var(--surface-0)" }}>
      <div aria-hidden="true" className="absolute inset-0">
        <BubbleFlowHero />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10" style={{ background: "var(--hero-gradient)" }} />

      <div className="section-container relative z-20 flex min-h-[100svh] items-end pb-20 pt-28 md:items-center md:pb-14">
        <div className="max-w-[620px]" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.3)" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mb-5 text-[13px] font-medium"
            style={{ color: "var(--accent-brand)" }}
          >
            {t("hero.kicker")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.12 }}
            className="text-balance text-[52px] font-semibold leading-[1.05] md:text-[76px] lg:text-[92px]"
            style={{ color: "var(--text-primary)" }}
          >
            {t("hero.headline1")}
            <br />
            {t("hero.headline2")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.24 }}
            className="mt-6 max-w-[520px] text-[16px] leading-[1.8] md:text-[17px]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.34 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#product" className="hero-primary-action">{t("hero.btnPrimary")}</a>
            <a href="#scenes" className="hero-secondary-action">{t("hero.btnSecondary")}</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
