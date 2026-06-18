"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";

export default function CTA() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.7;

  return (
    <section id="cta" ref={ref} className="section-padding relative overflow-hidden" style={{ backgroundColor: "var(--surface-2)" }}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]" style={{ backgroundColor: "var(--accent-glow)" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[10vw] font-medium"
        style={{ color: "rgba(93,255,243,0.018)" }}
      >
        BUBBLEFLOW
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">{t("cta.kicker")}</span>
          <h2 className="section-title">{t("cta.title")}</h2>
          <p className="section-description">{t("cta.description")}</p>

          <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href="https://bubbleflow.cn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg px-8 text-[14px] font-medium transition-colors"
              style={{
                color: "var(--accent-brand)",
                backgroundColor: "var(--accent-brand-faint)",
                border: "1px solid var(--accent-brand-faint)",
              }}
            >
              {t("cta.btnPrimary")}
            </a>
            <a
              href="#specs"
              className="inline-flex min-h-12 items-center justify-center rounded-lg px-8 text-[14px] font-medium transition-colors"
              style={{
                color: "var(--text-secondary)",
                backgroundColor: "var(--surface-card)",
                border: "1px solid var(--line)",
              }}
            >
              {t("cta.btnSecondary")}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration, delay: reducedMotion ? 0 : 0.24 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          <span>{t("cta.tag1")}</span>
          <span>{t("cta.tag2")}</span>
          <span>{t("cta.tag3")}</span>
          <span>{t("cta.tag4")}</span>
        </motion.div>
      </div>
    </section>
  );
}
