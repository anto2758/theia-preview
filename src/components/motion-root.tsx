"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

import { SmoothScroll } from "@/components/smooth-scroll";

export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
