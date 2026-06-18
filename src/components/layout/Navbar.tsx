"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import BrandLogo from "@/components/ui/BrandLogo";

const navLinks = [
  { label: "产品体验", href: "#product" },
  { label: "使用场景", href: "#scenes" },
  { label: "听觉原理", href: "#spatial-audio" },
  { label: "产品亮点", href: "#features" },
  { label: "购买指南", href: "#specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((link) => link.href.slice(1));

      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const element = document.getElementById(sections[i]);
        if (element && element.getBoundingClientRect().top <= 120) {
          setActiveHash(`#${sections[i]}`);
          return;
        }
      }

      setActiveHash("");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/[0.08] bg-[rgba(5,7,10,0.72)] backdrop-blur-2xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-6">
        <a href="#" className="group flex min-h-11 items-center gap-2" aria-label="返回首页">
          <BrandLogo size={32} className="h-8 w-8 transition-transform duration-200 group-hover:scale-[1.04]" />
          <span className="text-[15px] font-medium text-white/85 transition-colors group-hover:text-white">
            BubbleFlow
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex min-h-11 items-center rounded-full px-3.5 text-[14px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-white/[0.09] text-white"
                    : "text-white/55 hover:bg-white/[0.05] hover:text-white/90"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#cta"
            className="ml-3 inline-flex min-h-11 items-center rounded-full border border-[#5DFFF3]/25 bg-[#5DFFF3]/[0.07] px-5 text-[13px] font-medium text-[#bdf9f4] transition-colors hover:border-[#5DFFF3]/45 hover:bg-[#5DFFF3]/[0.12]"
          >
            了解购买
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={mobileOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={mobileOpen}
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[18px] bg-white/75" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] w-[18px] bg-white/75" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[18px] bg-white/75" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
            className="overflow-hidden border-b border-white/[0.06] bg-[rgba(5,7,10,0.96)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-4 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full border border-[#5DFFF3]/25 bg-[#5DFFF3]/[0.07] px-5 text-[14px] font-medium text-[#bdf9f4]"
              >
                了解购买
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
