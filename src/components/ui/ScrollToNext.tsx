"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const sections = ["product", "scenes", "spatial-audio", "features", "specs", "cta"];

export default function ScrollToNext() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [entered, setEntered] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Delay entrance so the hero has time to load
  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Track which section is in view
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  // Hide on last section or before any section is in view
  const visible = entered && activeIndex >= 0 && activeIndex < sections.length - 1;

  const handleClick = () => {
    const nextId = sections[activeIndex + 1];
    if (nextId) {
      document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Scroll to next section"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.4 }}
      className="fixed bottom-8 left-1/2 z-40 flex h-10 w-10 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-white/[0.10] bg-[rgba(5,7,10,0.6)] text-white/40 backdrop-blur-md transition-colors duration-300 hover:border-[#5DFFF3]/30 hover:text-[#5DFFF3]/80"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <motion.span
        animate={reducedMotion || !visible ? {} : { y: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
      </motion.span>
    </motion.button>
  );
}
