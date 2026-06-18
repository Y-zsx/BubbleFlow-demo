"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const sections = ["product", "scenes", "spatial-audio", "features", "specs", "cta"];

export default function ScrollToNext() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [entered, setEntered] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), reducedMotion ? 0 : 1500);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const getActiveIndex = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const threshold = scrollY + viewportH * 0.4;
    let current = -1;

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= threshold) {
        current = i;
      }
    }

    return current;
  }, []);

  useEffect(() => {
    const update = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setActiveIndex(getActiveIndex());
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [getActiveIndex]);

  const visible = entered && activeIndex >= 0 && activeIndex < sections.length - 1;

  const handleClick = () => {
    const current = getActiveIndex();
    const nextIndex = current + 1;
    if (nextIndex < sections.length) {
      const el = document.getElementById(sections[nextIndex]);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
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
