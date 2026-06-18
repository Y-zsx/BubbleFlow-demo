"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.7;

  return (
    <section id="cta" ref={ref} className="section-padding relative overflow-hidden bg-[#020304]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5DFFF3]/[0.035] blur-[110px]" />
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
          <span className="section-kicker">下一次聆听</span>
          <h2 className="section-title">下一场 Live，就在你的房间</h2>
          <p className="section-description">关注汽泡音露官方渠道，获取产品进展、体验活动与预售信息。</p>

          <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href="https://bubbleflow.cn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#5DFFF3]/35 bg-[#5DFFF3]/[0.09] px-8 text-[14px] font-medium text-[#d5fffc] transition-colors hover:border-[#5DFFF3]/60 hover:bg-[#5DFFF3]/[0.14]"
            >
              前往官方网站
            </a>
            <a
              href="#specs"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] px-8 text-[14px] font-medium text-white/68 transition-colors hover:border-white/[0.22] hover:text-white/90"
            >
              查看购买指南
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration, delay: reducedMotion ? 0 : 0.24 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/25"
        >
          <span>官方网站</span>
          <span>微信小程序</span>
          <span>淘宝官方授权店</span>
          <span>具体活动与权益以官方发布为准</span>
        </motion.div>
      </div>
    </section>
  );
}
