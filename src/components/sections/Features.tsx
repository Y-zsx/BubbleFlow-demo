"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BatteryCharging, Boxes, Ear, Move3D, Radio, Wifi } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";

const featureIcons = [Boxes, Wifi, Move3D, Ear, Radio, BatteryCharging];

export default function Features() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.6;

  const features = [
    { title: t("features.feat1Title"), description: t("features.feat1Desc") },
    { title: t("features.feat2Title"), description: t("features.feat2Desc") },
    { title: t("features.feat3Title"), description: t("features.feat3Desc") },
    { title: t("features.feat4Title"), description: t("features.feat4Desc") },
    { title: t("features.feat5Title"), description: t("features.feat5Desc") },
    { title: t("features.feat6Title"), description: t("features.feat6Desc") },
  ];

  return (
    <section id="features" ref={ref} className="section-padding" style={{ backgroundColor: "var(--surface-1)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">{t("features.kicker")}</span>
          <h2 className="section-title">{t("features.title")}</h2>
          <p className="section-description">{t("features.description")}</p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration, delay: reducedMotion ? 0 : 0.05 + index * 0.05 }}
                className="group rounded-lg border p-8 transition-colors md:p-10"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-card)" }}
              >
                <Icon aria-hidden="true" className="h-7 w-7" style={{ color: "var(--accent-brand-muted)" }} strokeWidth={1.35} />
                <div className="mt-10">
                  <h3 className="text-[18px] font-medium" style={{ color: "var(--text-primary)" }}>{feature.title}</h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-[1.75]" style={{ color: "var(--text-tertiary)" }}>
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
