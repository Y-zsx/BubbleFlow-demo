"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const productPoints = [
  {
    title: "听见方向",
    description: "歌声、乐器与环境音不再挤在同一个平面，而是从不同方位自然出现。",
  },
  {
    title: "感受远近",
    description: "声音有了距离和层次，轻声更贴近，场面更开阔，情绪也更真实。",
  },
  {
    title: "跟随运动",
    description: "声音可以在空间中移动，让音乐、游戏与演出拥有更鲜活的现场感。",
  },
];

function ProductDiagram() {
  const centerX = 300;
  const centerY = 200;
  const nodeAngles = [0, 60, 120, 180, 240, 300];
  const nodeRings = [132, 166];

  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="product-glow">
          <stop offset="0%" stopColor="#5DFFF3" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5DFFF3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="device-face" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#111617" />
          <stop offset="1" stopColor="#040606" />
        </linearGradient>
      </defs>

      <ellipse cx={centerX} cy={centerY} rx="250" ry="150" fill="url(#product-glow)" />

      {[76, 110, 144, 178, 212].map((radius, index) => (
        <ellipse
          key={radius}
          cx={centerX}
          cy={centerY}
          rx={radius}
          ry={radius * 0.58}
          stroke="#5DFFF3"
          strokeWidth="0.7"
          strokeOpacity={0.11 - index * 0.015}
        >
          <animate
            attributeName="stroke-opacity"
            values={`${0.04 + index * 0.006};${0.12 - index * 0.012};${0.04 + index * 0.006}`}
            dur={`${3.6 + index * 0.4}s`}
            repeatCount="indefinite"
          />
        </ellipse>
      ))}

      {nodeAngles.map((angle, index) => {
        const ring = nodeRings[index % 2];
        const radians = (angle * Math.PI) / 180;
        const x = centerX + ring * Math.cos(radians);
        const y = centerY + ring * 0.58 * Math.sin(radians);

        return (
          <g key={angle}>
            <line
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="#5DFFF3"
              strokeWidth="0.65"
              strokeOpacity="0.12"
              strokeDasharray="4 6"
            />
            <circle cx={x} cy={y} r="24" fill="#5DFFF3" opacity="0.035">
              <animate attributeName="r" values="20;29;20" dur={`${3 + index * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <g transform={`translate(${x} ${y}) rotate(45)`}>
              <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#080b0c" stroke="#728080" strokeOpacity="0.45" />
              <rect x="-6" y="-8" width="12" height="2" rx="1" fill="#5DFFF3">
                <animate attributeName="opacity" values="0.35;1;0.35" dur={`${2.2 + index * 0.2}s`} repeatCount="indefinite" />
              </rect>
            </g>
          </g>
        );
      })}

      <g>
        <path
          d="M210 171 L232 146 H390 L410 171 V241 L388 256 H232 L210 241 Z"
          fill="url(#device-face)"
          stroke="rgba(255,255,255,0.16)"
        />
        <path
          d="M232 146 H390 L410 171 H210 Z"
          fill="#182023"
          fillOpacity="0.76"
          stroke="#5DFFF3"
          strokeOpacity="0.16"
        />
        <path d="M249 231 H371" stroke="#5DFFF3" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="stroke-opacity" values="0.35;0.95;0.35" dur="2.8s" repeatCount="indefinite" />
        </path>
        <circle cx={310} cy={242} r="4" fill="#5DFFF3">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.7;

  return (
    <section id="product" ref={ref} className="section-padding relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">产品体验</span>
          <h2 className="section-title">不是更响，是更有空间感</h2>
          <p className="section-description">
            BubbleFlow 用多个无线声音节点把声音放进整个房间，让方位、距离、运动和层次都能被听见。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration, delay: reducedMotion ? 0 : 0.08 }}
          className="mx-auto aspect-[3/2] w-full max-w-[1200px]"
        >
          <ProductDiagram />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {productPoints.map((point, index) => (
            <motion.article
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration, delay: reducedMotion ? 0 : 0.16 + index * 0.07 }}
              className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-5 text-center transition-colors hover:border-[#5DFFF3]/20 hover:bg-white/[0.04]"
            >
              <h3 className="text-[16px] font-medium text-white/88">{point.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-white/42">{point.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
