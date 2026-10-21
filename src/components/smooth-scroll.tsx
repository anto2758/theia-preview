"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
        wheelMultiplier: 0.92,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
