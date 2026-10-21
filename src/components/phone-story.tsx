"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { DiscoverScreen } from "@/components/discover-screen";
import { HomeScreen } from "@/components/home-screen";
import { IphoneFrame } from "@/components/iphone-frame";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Smoothstep — each beat eases instead of scrubbing linearly. */
function smooth(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function span(progress: number, start: number, end: number) {
  if (end <= start) return 0;
  return smooth((progress - start) / (end - start));
}

const phases = [
  { id: "board", from: 0.12, index: "01", title: "Your collections", line: "A quiet board of the season." },
  { id: "open", from: 0.26, index: "02", title: "Open one", line: "The park look. The one that fits today." },
  { id: "swipe", from: 0.38, index: "03", title: "Pass, then keep", line: "One finished look at a time." },
  { id: "pieces", from: 0.62, index: "04", title: "Every piece", line: "Coat, knit, bag, heel — priced." },
  { id: "kept", from: 0.76, index: "05", title: "Into the bag", line: "The coat is ready to keep." },
] as const;

const bagItem = {
  src: "/looks/swipe-gray-coat.jpg",
  brand: "COS",
  name: "Wool coat",
  price: "€470",
  size: "M",
} as const;

function phaseFor(progress: number) {
  for (let i = phases.length - 1; i >= 0; i -= 1) {
    if (progress >= phases[i].from) return phases[i];
  }
  return phases[0];
}

function CheckoutPanel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.12, 0.42], [0, 1]);
  const x = useTransform(progress, [0, 1], [56, 0]);
  const y = useTransform(progress, [0, 1], [18, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  return (
    <motion.aside
      className="pointer-events-none absolute top-1/2 right-[max(1rem,calc((100%-72rem)/2))] z-30 w-[min(22rem,34vw)] -translate-y-1/2 max-lg:right-4 max-lg:w-[min(18rem,42vw)]"
      style={{ opacity, x, y, scale }}
    >
      <div className="overflow-hidden rounded-[1.6rem] border border-line/80 bg-canvas/90 shadow-[0_24px_60px_rgba(42,36,28,0.12)] backdrop-blur-xl">
        <div className="border-b border-line/70 px-5 py-4">
          <p className="text-[10px] tracking-[0.28em] text-primary uppercase">Your bag</p>
          <p className="mt-1 font-serif text-2xl text-ink">Ready to keep</p>
        </div>

        <div className="flex gap-4 px-5 py-5">
          <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-[1rem] bg-muted">
            <img
              src={bagItem.src}
              alt=""
              draggable={false}
              decoding="async"
              className="h-full w-full object-cover object-[center_28%]"
            />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <p className="font-serif text-[0.95rem] tracking-[0.2em] text-ink uppercase">{bagItem.brand}</p>
            <p className="mt-2 text-sm text-ink-soft">{bagItem.name}</p>
            <p className="mt-3 font-serif text-xl text-ink">{bagItem.price}</p>
            <div className="mt-4 flex gap-1.5">
              {["XS", "S", "M", "L"].map((size) => (
                <span
                  key={size}
                  className={`grid h-8 w-8 place-items-center rounded-full text-[11px] ${
                    size === bagItem.size
                      ? "bg-ink text-canvas"
                      : "border border-line text-ink-soft"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-line/70 px-5 py-4">
          <div className="flex items-center justify-between text-sm text-ink-soft">
            <span>Subtotal</span>
            <span className="tabular-nums text-ink">{bagItem.price}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-ink-soft">
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="mt-1 flex h-11 w-full items-center justify-center rounded-full bg-ink text-[12px] tracking-[0.18em] text-canvas uppercase"
          >
            Place order
          </button>
          <p className="pb-1 text-center text-[11px] leading-5 text-ink-soft">
            Ships in 2–4 days · Free returns
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

function StoryHero({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <>
      <motion.p
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-[6%] z-0 hidden font-serif text-[clamp(7rem,18vw,16rem)] leading-none text-ink/[0.045] select-none lg:block"
        style={{ opacity }}
      >
        26
      </motion.p>

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-4 sm:pt-6"
        style={{ opacity }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[11px] tracking-[0.28em] text-primary uppercase">The season · A/W 26</p>
          <h1 className="text-display mt-5 max-w-[14ch] font-serif text-[clamp(3.4rem,8vw,6.6rem)] leading-[0.94] text-balance">
            Lyra will know what you want to wear.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-ink-soft sm:text-lg">
            A short edit for the season you are in, and the brands you already wear.
          </p>
        </div>
      </motion.div>
    </>
  );
}

function StoryMarkers({
  phase,
  opacity,
}: {
  phase: (typeof phases)[number];
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div className="pointer-events-none absolute inset-0 z-20" style={{ opacity }}>
      <div className="absolute top-1/2 left-6 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {phases.map((item) => {
          const active = item.id === phase.id;
          return (
            <div key={item.id} className="flex items-center gap-3">
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${active ? "bg-primary" : "bg-line"}`}
              />
              <span
                className={`font-serif text-sm transition-colors duration-500 ${active ? "text-ink" : "text-ink-soft/50"}`}
              >
                {item.index}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function StoryCaption({
  phase,
  opacity,
}: {
  phase: (typeof phases)[number];
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-40 flex-col items-center justify-end px-6 pb-7 text-center"
      style={{ opacity }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <p className="text-[11px] text-primary">{phase.index}</p>
          <p className="text-display-soft mt-2 font-serif text-2xl leading-none sm:text-3xl">{phase.title}</p>
          <p className="mt-2 text-sm text-ink-soft">{phase.line}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export function PhoneStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const wide = useMotionValue(1);
  const [phase, setPhase] = useState<(typeof phases)[number]>(phases[0]);
  const [showHome, setShowHome] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Entrance first: oversized phone peeks, then the board story begins.
  const boardScroll = useTransform(progress, (p) => span(p, 0.14, 0.26));
  const selected = useTransform(progress, (p) => span(p, 0.26, 0.34));
  // Discover stays mounted underneath, so the cut never reveals the empty screen.
  const discoverOpacity = useTransform(progress, (p) => (p >= 0.34 ? 1 : 0));
  const collectionsOpacity = useTransform(discoverOpacity, (value) => 1 - value);
  const swipe = useTransform(progress, (p) => span(p, 0.4, 0.5) + span(p, 0.52, 0.62));
  const detail = useTransform(progress, (p) => span(p, 0.62, 0.7));
  const checkout = useTransform(progress, (p) => span(p, 0.76, 0.92));

  const heroOpacity = useTransform(progress, (p) => 1 - span(p, 0, 0.08));
  const chromeOpacity = useTransform(progress, (p) => span(p, 0.14, 0.22));

  // Grow from the crown so extra scale falls off the bottom — a peek, not a crop.
  const phoneScale = useTransform(progress, (p) => {
    const enter = span(p, 0.06, 0.18);
    const settle = span(p, 0.78, 0.95);
    return 1.22 - enter * 0.22 - settle * 0.06;
  });
  const phoneY = useTransform(progress, (p) => {
    const enter = span(p, 0.06, 0.18);
    const settle = span(p, 0.78, 0.95);
    return `${(1 - enter) * 38 - settle * 1.2}vh`;
  });
  const phoneX = useTransform([checkout, wide], (latest) => {
    const [t, isWide] = latest as number[];
    const distance = isWide > 0.5 ? -22 : -14;
    return `${smooth(t) * distance}vw`;
  });
  const phoneRotateX = useTransform(progress, (p) => (1 - span(p, 0.06, 0.18)) * 5);
  const phoneOpacity = useTransform(progress, (p) => 0.95 + span(p, 0, 0.05) * 0.05);
  const glowOpacity = useTransform(
    progress,
    (p) => 0.35 + span(p, 0, 0.14) * 0.4 + span(p, 0.74, 0.9) * 0.2,
  );

  useMotionValueEvent(progress, "change", (value) => {
    const next = phaseFor(value);
    setPhase((current) => (current.id === next.id ? current : next));
    setShowHome((current) => {
      const home = value < 0.4;
      return current === home ? current : home;
    });
    setShowCheckout((current) => {
      const on = value > 0.72;
      return current === on ? current : on;
    });
  });

  useEffect(() => {
    const update = () => wide.set(window.innerWidth >= 1024 ? 1 : 0);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [wide]);

  return (
    <section ref={sectionRef} id="discover" className="relative h-[900vh]">
      <div className="sticky top-[4.5rem] h-[calc(100svh-4.5rem)] overflow-x-clip overflow-y-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: glowOpacity }}
        >
          <div className="absolute top-[-10%] left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(196,165,116,0.26)_0%,rgba(138,115,73,0.1)_42%,rgba(250,247,242,0)_70%)]" />
          <div className="absolute top-[18%] left-[12%] h-[28vmax] w-[28vmax] rounded-full bg-[radial-gradient(circle,rgba(243,235,225,0.95)_0%,rgba(250,247,242,0)_70%)] blur-2xl" />
          <div className="absolute top-[22%] right-[10%] h-[24vmax] w-[24vmax] rounded-full bg-[radial-gradient(circle,rgba(232,214,186,0.55)_0%,rgba(250,247,242,0)_72%)] blur-2xl" />
        </motion.div>

        <StoryHero opacity={heroOpacity} />
        <StoryMarkers phase={phase} opacity={chromeOpacity} />

        {/* Air above the crown, air below for the caption — the phone never kisses a clip. */}
        <div className="absolute inset-x-0 top-10 bottom-40 z-10 flex items-end justify-center px-4 [perspective:1400px] sm:items-center">
          <motion.div
            className="aspect-[1406/2822] h-full max-h-full w-auto max-w-[min(88vw,26rem)] origin-top will-change-transform"
            style={{
              x: phoneX,
              y: phoneY,
              rotateX: phoneRotateX,
              scale: phoneScale,
              opacity: phoneOpacity,
            }}
          >
            <IphoneFrame className="h-full w-full" label="Lyra, from collections to a kept look">
              <div className="relative h-full bg-ink">
                <motion.div className="absolute inset-0" style={{ opacity: discoverOpacity }}>
                  <DiscoverScreen offset={swipe} detail={detail} />
                </motion.div>
                {showHome ? (
                  <motion.div className="absolute inset-0" style={{ opacity: collectionsOpacity }}>
                    <HomeScreen boardScroll={boardScroll} selected={selected} />
                  </motion.div>
                ) : null}
              </div>
            </IphoneFrame>
          </motion.div>
        </div>

        {showCheckout ? <CheckoutPanel progress={checkout} /> : null}

        <StoryCaption phase={phase} opacity={chromeOpacity} />
      </div>
    </section>
  );
}
