"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BatteryCharging, Boxes, Ear, Move3D, Radio, Wifi } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const features = [
  {
    title: "多点协同",
    description: "多个声音节点一起工作，不再让一只音箱承担整个房间的声音。",
    icon: Boxes,
  },
  {
    title: "无线布置",
    description: "根据客厅、卧室或桌面自由安排节点，让系统适应你的空间。",
    icon: Wifi,
  },
  {
    title: "空间层次",
    description: "把方位、远近与移动还给声音，听见更丰富、更真实的细节。",
    icon: Move3D,
  },
  {
    title: "沉浸聆听",
    description: "不必一直盯着屏幕，耳朵会告诉你场景正在身边怎样发生。",
    icon: Ear,
  },
  {
    title: "私人 Live",
    description: "把舞台的包围感带进家里，为喜欢的音乐留下一块专属空间。",
    icon: Radio,
  },
  {
    title: "充电收纳",
    description: "使用后回到底座收纳与充电，让日常使用保持简单整洁。",
    icon: BatteryCharging,
  },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.6;

  return (
    <section id="features" ref={ref} className="section-padding bg-[#030406]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">产品亮点</span>
          <h2 className="section-title">复杂的技术，简单地享受</h2>
          <p className="section-description">从摆放、聆听到收纳，BubbleFlow 希望空间音频不只是一项技术，而是一件每天都愿意使用的产品。</p>
        </motion.div>

        <div className="grid gap-px overflow-hidden border-y border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration, delay: reducedMotion ? 0 : 0.05 + index * 0.05 }}
                className="group min-h-64 bg-[#030406] px-7 py-8 transition-colors hover:bg-white/[0.025] md:px-9 md:py-10"
              >
                <Icon aria-hidden="true" className="h-7 w-7 text-[#5DFFF3]/65" strokeWidth={1.35} />
                <div className="mt-12">
                  <h3 className="text-[18px] font-medium text-white/90">{feature.title}</h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-[1.75] text-white/45">
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
