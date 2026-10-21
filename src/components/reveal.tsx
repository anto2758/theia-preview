"use client";

import { motion, stagger, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Viewport = {
  once: true;
  amount: number;
  margin: string;
};

function viewport(amount: number): Viewport {
  return { once: true, amount, margin: "0px 0px -8% 0px" };
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.35,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport(amount)}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export function RevealGroup({
  children,
  className,
  step = 0.1,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport(amount)}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: stagger(step) } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
