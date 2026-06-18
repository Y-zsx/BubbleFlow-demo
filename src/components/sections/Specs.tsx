"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";

export default function Specs() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.6;

  const questions = [
    { question: t("specs.q1"), answer: t("specs.a1") },
    { question: t("specs.q2"), answer: t("specs.a2") },
    { question: t("specs.q3"), answer: t("specs.a3") },
    { question: t("specs.q4"), answer: t("specs.a4") },
  ];

  const channels = [
    { name: t("specs.ch1Name"), description: t("specs.ch1Desc"), href: "https://bubbleflow.cn" },
    { name: t("specs.ch2Name"), description: t("specs.ch2Desc"), href: "#cta" },
    { name: t("specs.ch3Name"), description: t("specs.ch3Desc"), href: "#cta" },
  ];

  const assurances = [t("specs.check1"), t("specs.check2"), t("specs.check3")];

  return (
    <section id="specs" ref={ref} className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">{t("specs.kicker")}</span>
          <h2 className="section-title">{t("specs.title")}</h2>
          <p className="section-description">{t("specs.description")}</p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-20">
          <div style={{ borderTop: "1px solid var(--line-strong)" }}>
            {questions.map((item, index) => (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration, delay: reducedMotion ? 0 : 0.05 + index * 0.05 }}
                className="grid gap-3 py-7 md:grid-cols-[0.8fr_1.2fr] md:gap-6"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <h3 className="text-[16px] font-medium leading-[1.6]" style={{ color: "var(--text-primary)" }}>{item.question}</h3>
                <p className="text-[14px] leading-[1.8]" style={{ color: "var(--text-tertiary)" }}>{item.answer}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay: reducedMotion ? 0 : 0.12 }}
            className="flex flex-col justify-between border p-6 md:p-8"
            style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-card)" }}
          >
            <div>
              <p className="text-[12px] font-medium" style={{ color: "var(--accent-brand-muted)" }}>{t("specs.channelLabel")}</p>
              <h3 className="mt-3 text-[24px] font-medium" style={{ color: "var(--text-primary)" }}>{t("specs.channelTitle")}</h3>
              <div className="mt-8" style={{ borderTop: "1px solid var(--line)" }}>
                {channels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-5 py-5"
                    style={{ borderBottom: "1px solid var(--line)" }}
                  >
                    <div>
                      <p className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>{channel.name}</p>
                      <p className="mt-1 text-[12px]" style={{ color: "var(--text-tertiary)" }}>{channel.description}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-colors"
                      style={{ color: "var(--text-tertiary)" }}
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 space-y-3 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
              {assurances.map((item) => (
                <div key={item} className="flex items-center gap-3 text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                  <Check aria-hidden="true" className="h-4 w-4" style={{ color: "var(--accent-brand-muted)" }} strokeWidth={1.8} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
