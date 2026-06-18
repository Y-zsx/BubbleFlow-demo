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

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), reducedMotion ? 0 : 1500);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

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

  const visible = entered && activeIndex >= 0 && activeIndex < sections.length - 1;

  const handleClick = () => {
    const nextId = sections[activeIndex + 1];
    if (nextId) {
      document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.4 }}
      className="fixed bottom-8 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300"
      style={{
        pointerEvents: visible ? "auto" : "none",
        borderColor: "var(--line)",
        backgroundColor: "var(--nav-bg)",
        color: "var(--text-tertiary)",
      }}
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
