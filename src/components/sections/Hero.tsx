"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BubbleFlowHero = dynamic(() => import("../three/BubbleFlowHero"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <div aria-hidden="true" className="absolute inset-0">
        <BubbleFlowHero />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.28)_46%,rgba(0,0,0,0.04)_75%)]" />

      <div className="section-container relative z-20 flex min-h-[100svh] items-end pb-20 pt-28 md:items-center md:pb-14">
        <div className="max-w-[620px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mb-5 text-[13px] font-medium text-[#5DFFF3]"
          >
            BubbleFlow 汽泡音露
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.12 }}
            className="text-balance text-[52px] font-semibold leading-[1.05] text-white md:text-[76px] lg:text-[92px]"
          >
            把现场
            <br />
            带回家
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.24 }}
            className="mt-6 max-w-[520px] text-[16px] leading-[1.8] text-white/62 md:text-[17px]"
          >
            多个无线声音节点协同工作，让音乐从前后、远近与四周自然出现。
            不只是听得更清楚，而是第一次真正走进声音里。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.34 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#product" className="hero-primary-action">感受它的不同</a>
            <a href="#scenes" className="hero-secondary-action">看看怎么用</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
