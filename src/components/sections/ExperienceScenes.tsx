"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const scenes = [
  {
    title: "客厅现场",
    description: "让对白、音乐与环境声各有位置。坐在沙发上，也能感到舞台在眼前展开。",
    nodes: [{ x: "22%", y: "25%" }, { x: "78%", y: "25%" }, { x: "25%", y: "75%" }, { x: "75%", y: "75%" }],
    furniture: { x: "35%", y: "35%", width: "30%", height: "22%", label: "沙发" },
    tag: "电影 · 演出",
  },
  {
    title: "卧室私享",
    description: "更贴近、更安静的听觉空间，让喜欢的歌像在房间里只为你演奏。",
    nodes: [{ x: "25%", y: "28%" }, { x: "75%", y: "28%" }, { x: "50%", y: "78%" }],
    furniture: { x: "30%", y: "32%", width: "40%", height: "28%", label: "床" },
    tag: "音乐 · 私人 Live",
  },
  {
    title: "桌面沉浸",
    description: "脚步、飞行和方位变化更清晰，也为音乐与空间内容创作带来新可能。",
    nodes: [{ x: "18%", y: "50%" }, { x: "50%", y: "22%" }, { x: "82%", y: "50%" }, { x: "50%", y: "78%" }],
    furniture: { x: "28%", y: "35%", width: "44%", height: "18%", label: "工作台" },
    tag: "游戏 · 创作",
  },
];

function SceneVisual({
  scene,
  reducedMotion,
}: {
  scene: (typeof scenes)[number];
  reducedMotion: boolean;
}) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden border-b border-white/[0.06] bg-[#06080a]">
      <div className="absolute inset-5 border border-white/[0.05]" />
      <div
        className="absolute rounded-sm border border-white/[0.08] bg-white/[0.02]"
        style={{
          left: scene.furniture.x,
          top: scene.furniture.y,
          width: scene.furniture.width,
          height: scene.furniture.height,
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20">
          {scene.furniture.label}
        </span>
      </div>

      {scene.nodes.map((node, index) => (
        <div
          key={`field-${index}`}
          className="absolute aspect-square w-[36%] rounded-full border border-[#5DFFF3]/[0.07]"
          style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
        >
          <div className="absolute inset-[22%] rounded-full border border-[#5DFFF3]/[0.06]" />
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
          <div className="h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] border border-[#5DFFF3]/30 bg-[#090c0d] shadow-[0_0_18px_rgba(93,255,243,0.08)]">
            <span className="absolute left-1/2 top-1 h-[1.5px] w-2 -translate-x-1/2 rounded-full bg-[#5DFFF3] shadow-[0_0_5px_rgba(93,255,243,0.9)]" />
          </div>
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5DFFF3]/30 bg-[#5DFFF3]/10 shadow-[0_0_18px_rgba(93,255,243,0.16)]" />
    </div>
  );
}

export default function ExperienceScenes() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.7;

  return (
    <section id="scenes" ref={ref} className="section-padding relative overflow-hidden bg-[#030406]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">使用场景</span>
          <h2 className="section-title">一个系统，打开三种日常</h2>
          <p className="section-description">
            节点跟随房间和使用方式灵活布置。你不必改变生活，只会听见生活多出一个维度。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {scenes.map((scene, index) => (
            <motion.article
              key={scene.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration, delay: reducedMotion ? 0 : 0.1 + index * 0.08 }}
              className="overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] transition-colors hover:border-[#5DFFF3]/18"
            >
              <SceneVisual scene={scene} reducedMotion={reducedMotion} />
              <div className="p-6 text-center">
                <span className="text-[10px] font-medium text-[#5DFFF3]/50">{scene.tag}</span>
                <h3 className="mt-2 text-[17px] font-medium text-white/90">{scene.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-white/42">{scene.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
