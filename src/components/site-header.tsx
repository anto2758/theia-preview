"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const glassRadius = 18;

const homeLinks = [
  { href: "/#discover", label: "Discover" },
  { href: "/#knows", label: "Yours" },
  { href: "/#names", label: "The names" },
  { href: "/#edit", label: "The point" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onPartners = pathname === "/partners";

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
          borderColor: scrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)",
          boxShadow: scrolled
            ? "0 20px 40px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.04), 0 10px 20px rgba(0,0,0,0.04)"
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

        {/* Liquid glass, lighter frosted wash */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="absolute inset-0 bg-surface/88 backdrop-blur-md" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </motion.div>

        <div
          className={`relative grid w-full grid-cols-[1fr_auto] items-center transition-[padding,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-3 ${
            scrolled ? "px-5 py-3.5" : "px-5 py-5 sm:px-6"
          }`}
        >
          <Link
            href="/"
            className={`font-serif text-[1.7rem] leading-none transition-colors duration-300 ${
              scrolled ? "text-ink" : "text-display"
            }`}
          >
            Lyra
          </Link>
          <p
            className={`hidden justify-self-center text-[11px] tracking-[0.32em] uppercase transition-colors duration-300 sm:block ${
              scrolled ? "text-ink/70" : "text-ink-soft"
            }`}
          >
            {onPartners ? "For partners" : "Autumn 26"}
          </p>
          <nav
            className={`flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 sm:gap-x-7 ${
              scrolled ? "text-ink/80" : "text-ink-soft"
            }`}
          >
            {homeLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
            <Link
              href="/partners"
              className={`hover:text-ink ${onPartners ? "text-ink" : ""}`}
              aria-current={onPartners ? "page" : undefined}
            >
              Partners
            </Link>
          </nav>
        </div>
      </motion.header>
    </motion.div>
  );
}
