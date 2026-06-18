"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";

interface SceneNode { x: string; y: string }
interface SceneFurniture { x: string; y: string; width: string; height: string; label: string }
interface SceneData {
  title: string;
  description: string;
  tag: string;
  nodes: SceneNode[];
  furniture: SceneFurniture;
}

function SceneVisual({ scene, reducedMotion }: { scene: SceneData; reducedMotion: boolean }) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden border-b" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-1)" }}>
      <div className="absolute inset-5 border" style={{ borderColor: "var(--line)" }} />
      <div
        className="absolute rounded-sm border"
        style={{
          left: scene.furniture.x,
          top: scene.furniture.y,
          width: scene.furniture.width,
          height: scene.furniture.height,
          borderColor: "var(--line)",
          backgroundColor: "var(--surface-card)",
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[10px]" style={{ color: "var(--text-tertiary)" }}>
          {scene.furniture.label}
        </span>
      </div>

      {scene.nodes.map((node, index) => (
        <div
          key={`field-${index}`}
          className="absolute aspect-square w-[36%] rounded-full"
          style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)", borderColor: "var(--accent-brand-faint)", border: "1px solid var(--accent-brand-faint)" }}
        >
          <div className="absolute inset-[22%] rounded-full" style={{ border: "1px solid var(--accent-brand-faint)" }} />
        </div>
      ))}

      {scene.nodes.map((node, index) => (
        <motion.div
          key={`node-${index}`}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2.8 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px]" style={{ borderColor: "var(--accent-brand-muted)", backgroundColor: "var(--surface-2)", boxShadow: "0 0 18px var(--accent-glow)" }}>
            <span className="absolute left-1/2 top-1 h-[1.5px] w-2 -translate-x-1/2 rounded-full" style={{ backgroundColor: "var(--accent-brand)", boxShadow: "0 0 5px var(--accent-brand)" }} />
          </div>
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ border: "1px solid var(--accent-brand-muted)", backgroundColor: "var(--accent-brand-faint)", boxShadow: "0 0 18px var(--accent-glow)" }} />
    </div>
  );
}

export default function ExperienceScenes() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.7;

  const scenes: SceneData[] = [
    {
      title: t("scenes.scene1Title"),
      description: t("scenes.scene1Desc"),
      tag: t("scenes.scene1Tag"),
      nodes: [{ x: "22%", y: "25%" }, { x: "78%", y: "25%" }, { x: "25%", y: "75%" }, { x: "75%", y: "75%" }],
      furniture: { x: "35%", y: "35%", width: "30%", height: "22%", label: t("scenes.scene1Furniture") },
    },
    {
      title: t("scenes.scene2Title"),
      description: t("scenes.scene2Desc"),
      tag: t("scenes.scene2Tag"),
      nodes: [{ x: "25%", y: "28%" }, { x: "75%", y: "28%" }, { x: "50%", y: "78%" }],
      furniture: { x: "30%", y: "32%", width: "40%", height: "28%", label: t("scenes.scene2Furniture") },
    },
    {
      title: t("scenes.scene3Title"),
      description: t("scenes.scene3Desc"),
      tag: t("scenes.scene3Tag"),
      nodes: [{ x: "18%", y: "50%" }, { x: "50%", y: "22%" }, { x: "82%", y: "50%" }, { x: "50%", y: "78%" }],
      furniture: { x: "28%", y: "35%", width: "44%", height: "18%", label: t("scenes.scene3Furniture") },
    },
  ];

  return (
    <section id="scenes" ref={ref} className="section-padding relative overflow-hidden" style={{ backgroundColor: "var(--surface-1)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">{t("scenes.kicker")}</span>
          <h2 className="section-title">{t("scenes.title")}</h2>
          <p className="section-description">{t("scenes.description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {scenes.map((scene, index) => (
            <motion.article
              key={scene.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration, delay: reducedMotion ? 0 : 0.1 + index * 0.08 }}
              className="overflow-hidden rounded-lg border transition-colors"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--surface-card)" }}
            >
              <SceneVisual scene={scene} reducedMotion={reducedMotion} />
              <div className="p-6 text-center">
                <span className="text-[10px] font-medium" style={{ color: "var(--accent-brand-muted)" }}>{scene.tag}</span>
                <h3 className="mt-2 text-[17px] font-medium" style={{ color: "var(--text-primary)" }}>{scene.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "var(--text-tertiary)" }}>{scene.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
