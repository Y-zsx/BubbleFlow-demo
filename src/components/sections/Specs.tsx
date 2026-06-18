"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const questions = [
  {
    question: "它和普通音箱有什么不同？",
    answer: "普通音箱主要从一个位置播放声音。BubbleFlow 通过多个无线节点协同，让声音拥有方向、距离、运动与空间层次。",
  },
  {
    question: "适合放在哪里？",
    answer: "可以根据客厅、卧室、桌面等空间灵活布置，用于音乐、电影、游戏和空间内容体验。",
  },
  {
    question: "日常使用会不会很复杂？",
    answer: "产品以无线多点部署和充电收纳为核心思路，减少线缆与日常整理负担，让空间音频更容易进入家庭。",
  },
  {
    question: "现在可以从哪里了解？",
    answer: "可通过 BubbleFlow 官方网站、微信小程序与淘宝官方授权店关注产品信息和预售进展。",
  },
];

const channels = [
  { name: "官方网站", description: "查看产品介绍与官方动态", href: "https://bubbleflow.cn" },
  { name: "微信小程序", description: "在微信内了解预售信息", href: "#cta" },
  { name: "淘宝官方授权店", description: "通过授权渠道关注购买进展", href: "#cta" },
];

const assurances = ["官方产品信息", "预售动态同步", "使用与服务入口"];

export default function Specs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.6;

  return (
    <section id="specs" ref={ref} className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">购买前，你可能想知道</span>
          <h2 className="section-title">先了解清楚，再决定是否加入</h2>
          <p className="section-description">
            关于产品形态、使用空间与官方渠道，我们把最重要的信息放在这里。
          </p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-20">
          <div className="border-t border-white/[0.12]">
            {questions.map((item, index) => (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration, delay: reducedMotion ? 0 : 0.05 + index * 0.05 }}
                className="grid gap-3 border-b border-white/[0.08] py-7 md:grid-cols-[0.8fr_1.2fr] md:gap-6"
              >
                <h3 className="text-[16px] font-medium leading-[1.6] text-white/85">{item.question}</h3>
                <p className="text-[14px] leading-[1.8] text-white/45">{item.answer}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay: reducedMotion ? 0 : 0.12 }}
            className="flex flex-col justify-between border border-white/[0.09] bg-white/[0.02] p-6 md:p-8"
          >
            <div>
              <p className="text-[12px] font-medium text-[#5DFFF3]/65">官方渠道</p>
              <h3 className="mt-3 text-[24px] font-medium text-white/92">从可信的地方了解产品</h3>
              <div className="mt-8 border-t border-white/[0.09]">
                {channels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-5 border-b border-white/[0.08] py-5"
                  >
                    <div>
                      <p className="text-[15px] font-medium text-white/82">{channel.name}</p>
                      <p className="mt-1 text-[12px] text-white/35">{channel.description}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-[#5DFFF3]/75"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
              {assurances.map((item) => (
                <div key={item} className="flex items-center gap-3 text-[12px] text-white/40">
                  <Check aria-hidden="true" className="h-4 w-4 text-[#5DFFF3]/55" strokeWidth={1.8} />
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
