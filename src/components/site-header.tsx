"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const glassRadius = 18;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useLenis((lenis) => {
    const next = lenis.scroll > 16;
    setScrolled((current) => (current === next ? current : next));
  });

  return (
    <motion.div
      className="sticky top-0 z-40"
      initial={false}
      animate={{
        paddingTop: scrolled ? 10 : 0,
        paddingBottom: scrolled ? 10 : 0,
        paddingLeft: scrolled ? 10 : 0,
        paddingRight: scrolled ? 10 : 0,
      }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.header
        initial={false}
        animate={{
          borderRadius: scrolled ? glassRadius : 0,
          borderColor: scrolled ? "rgba(42,36,28,0.14)" : "rgba(42,36,28,0)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.55) inset, 0 8px 28px rgba(42,36,28,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease }}
        className="relative w-full overflow-hidden border"
        data-scrolled={scrolled ? "true" : "false"}
      >
        {/* Flat top state */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-canvas/75 backdrop-blur-md"
          initial={false}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3, ease }}
        />

        {/* Liquid glass — lighter frosted wash */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(255,253,249,0.52)_0%,rgba(250,247,242,0.34)_50%,rgba(245,238,228,0.4)_100%)] backdrop-blur-md" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </motion.div>

        <div
          className={`relative grid w-full grid-cols-[1fr_auto] items-center transition-[padding,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-3 ${
            scrolled ? "px-5 py-3.5" : "mx-auto max-w-6xl px-6 py-5"
          }`}
        >
          <a
            href="#top"
            className={`font-serif text-[1.7rem] leading-none transition-colors duration-300 ${
              scrolled ? "text-ink" : "text-display"
            }`}
          >
            Lyra
          </a>
          <p
            className={`hidden justify-self-center text-[11px] tracking-[0.32em] uppercase transition-colors duration-300 sm:block ${
              scrolled ? "text-ink/70" : "text-ink-soft"
            }`}
          >
            Autumn 26
          </p>
          <nav
            className={`flex items-center justify-end gap-5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 sm:gap-7 ${
              scrolled ? "text-ink/80" : "text-ink-soft"
            }`}
          >
            <a href="#discover" className="hover:text-ink">
              Discover
            </a>
            <a href="#knows" className="hover:text-ink">
              Yours
            </a>
            <a href="#names" className="hover:text-ink">
              The names
            </a>
            <a href="#edit" className="hover:text-ink">
              The edit
            </a>
          </nav>
        </div>
      </motion.header>
    </motion.div>
  );
}
