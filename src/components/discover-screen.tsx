"use client";

import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

import { TabBar } from "@/components/tab-bar";

export type LookItem = {
  name: string;
  price: string;
  src: string;
};

export type Look = {
  src: string;
  position: string;
  brand: string;
  title: string;
  pieces: string;
  price: string;
  items: LookItem[];
};

export const LOOKS: Look[] = [
  {
    src: "/looks/swipe-park.jpg",
    position: "object-[center_32%]",
    brand: "The Row",
    title: "Autumn in the park",
    pieces: "Coat · Knit · Trouser · Boot",
    price: "€1.180",
    items: [
      { name: "Wool coat", price: "€650", src: "/looks/swipe-park.jpg" },
      { name: "Red knit", price: "€110", src: "/looks/pieces/piece-red-knit.jpg" },
      { name: "Wide trouser", price: "€250", src: "/looks/pieces/piece-beige-pants.jpg" },
      { name: "Ankle boot", price: "€170", src: "/looks/pieces/piece-red-shoe.jpg" },
    ],
  },
  {
    src: "/looks/suit.jpg",
    position: "object-[center_40%]",
    brand: "Toteme",
    title: "Tan tailored suit",
    pieces: "Blazer · Trouser · Blouse · Heel",
    price: "€1.350",
    items: [
      { name: "Blazer", price: "€680", src: "/looks/suit.jpg" },
      { name: "Wide trouser", price: "€340", src: "/looks/pieces/piece-beige-pants-suit.jpg" },
      { name: "Lace blouse", price: "€170", src: "/looks/pieces/piece-black-lace.jpg" },
      { name: "Pointed heel", price: "€160", src: "/looks/pieces/piece-maroon-wedge.jpg" },
    ],
  },
  {
    src: "/looks/swipe-gray-coat.jpg",
    position: "object-[center_28%]",
    brand: "COS",
    title: "Grey wool coat",
    pieces: "Coat · Knit · Trouser · Boot",
    price: "€870",
    items: [
      { name: "Wool coat", price: "€470", src: "/looks/swipe-gray-coat.jpg" },
      { name: "Wool knit", price: "€140", src: "/looks/pieces/piece-beige-turtleneck.jpg" },
      { name: "Straight trouser", price: "€150", src: "/looks/pieces/piece-beige-pants.jpg" },
      { name: "Ankle boot", price: "€110", src: "/looks/pieces/piece-black-boot.jpg" },
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function LookPhoto({ look, index, offset }: { look: Look; index: number; offset: MotionValue<number> }) {
  const x = useTransform(offset, (value) => {
    if (index === 0) return `${-clamp(value, 0, 1) * 125}%`;
    if (index === 1) return value < 1 ? "0%" : `${clamp(value - 1, 0, 1) * 125}%`;
    return "0%";
  });
  const rotate = useTransform(offset, (value) => {
    if (index === 0) return -clamp(value, 0, 1) * 13;
    if (index === 1) return value < 1 ? 0 : clamp(value - 1, 0, 1) * 13;
    return 0;
  });
  const opacity = useTransform(offset, (value) => {
    if (index === 0) return clamp(value, 0, 1) > 0.96 ? 0 : 1;
    if (index === 1) return value >= 1 && clamp(value - 1, 0, 1) > 0.96 ? 0 : 1;
    return value > 0.72 ? 1 : 0;
  });
  const zIndex = index === 0 ? 3 : index === 1 ? 2 : 1;

  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ x, rotate, opacity, zIndex }}>
      <img
        src={look.src}
        alt=""
        draggable={false}
        decoding="async"
        className={`h-full w-full object-cover ${look.position}`}
      />
    </motion.div>
  );
}

function LookCaption({
  look,
  active,
  detail,
  held = false,
}: {
  look: Look;
  active: boolean;
  detail: MotionValue<number>;
  /** First card keeps the collection caption so the handoff is one block of text. */
  held?: boolean;
}) {
  const open = useTransform(detail, (value) => (active ? value : 0));
  // Blur + title climb higher when the piece list opens.
  const panelHeight = useTransform(open, [0, 1], ["46%", "100%"]);
  const contentBottom = useTransform(open, [0, 1], ["20cqw", "19cqw"]);
  const contentY = useTransform(open, [0, 1], ["0cqw", "-6cqw"]);
  const lineOpacity = useTransform(open, [0, 0.28], [1, 0]);
  const listOpacity = useTransform(open, [0.1, 0.45], [0, 1]);
  const listHeight = useTransform(open, [0.05, 1], ["0cqw", "70cqw"]);
  const shadeOpacity = useTransform(open, [0, 1], [0.74, 0.94]);
  const actionsOpacity = useTransform(open, [0.18, 0.5], [0, 1]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <motion.div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: panelHeight }}>
        <div className="gradient-blur absolute inset-0" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(42,36,28,0.96)] from-15% via-[rgba(42,36,28,0.62)] via-55% to-transparent"
          style={{ opacity: shadeOpacity }}
        />
      </motion.div>
      <motion.div
        className="absolute right-[5.6cqw] left-[5.6cqw] text-canvas"
        style={{ bottom: contentBottom, y: contentY }}
      >
        <p className="text-[2.8cqw] text-canvas/80">{held ? "Collection" : look.brand}</p>
        <div className="mt-[1cqw] flex items-end justify-between gap-[2.8cqw]">
          <h3 className="min-w-0 flex-1 font-serif text-[6.4cqw] leading-[0.95]">{look.title}</h3>
          <motion.button
            type="button"
            className="pointer-events-auto mb-[0.4cqw] shrink-0 rounded-full border border-canvas/45 bg-canvas/14 px-[2.8cqw] py-[1.4cqw] text-[2.2cqw] font-medium tracking-wide text-canvas backdrop-blur-sm"
            style={{ opacity: actionsOpacity }}
            tabIndex={-1}
          >
            Save to collection
          </motion.button>
        </div>
        <motion.p className="mt-[1.4cqw] text-[2.9cqw] text-canvas/85" style={{ opacity: lineOpacity }}>
          {held ? "12 outfits" : look.pieces}
        </motion.p>
        <motion.div className="overflow-hidden" style={{ height: listHeight, opacity: listOpacity }}>
          <div className="pt-[1.6cqw]">
            {look.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-[2.8cqw] border-b border-canvas/20 py-[1.5cqw]"
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  decoding="async"
                  className="h-[14.5cqw] w-[12cqw] shrink-0 rounded-[1.8cqw] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[3.3cqw] leading-none">{item.name}</p>
                  <p className="mt-[1cqw] text-[2.6cqw] tabular-nums text-canvas/80">{item.price}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Add ${item.name}`}
                  tabIndex={-1}
                  className="pointer-events-auto grid size-[5.4cqw] shrink-0 place-items-center rounded-full border border-canvas/55 text-canvas"
                >
                  <svg viewBox="0 0 12 12" className="size-[2.6cqw]" aria-hidden="true">
                    <path
                      d="M6 2.4v7.2M2.4 6h7.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.15"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <p className="mt-[1.6cqw] text-[3.1cqw] tabular-nums">{look.price}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function DiscoverScreen({
  offset,
  detail,
}: {
  offset: MotionValue<number>;
  detail?: MotionValue<number>;
}) {
  const idleDetail = useMotionValue(0);
  const open = detail ?? idleDetail;
  const [front, setFront] = useState(() => Math.min(LOOKS.length - 1, Math.round(offset.get())));
  const [step, setStep] = useState(() => Math.min(LOOKS.length, Math.floor(offset.get()) + 1));

  const passOpacity = useTransform(offset, (value) => {
    const pass = value < 1 ? clamp(value, 0, 1) : 0;
    return pass > 0.12 && pass < 0.82 ? Math.min(1, (pass - 0.12) * 3) : 0;
  });
  const keepOpacity = useTransform(offset, (value) => {
    const keep = value >= 1 ? clamp(value - 1, 0, 1) : 0;
    return keep > 0.12 && keep < 0.82 ? Math.min(1, (keep - 0.12) * 3) : 0;
  });

  const syncOffset = (value: number) => {
    const nextFront = Math.min(LOOKS.length - 1, Math.round(value));
    const nextStep = Math.min(LOOKS.length, Math.floor(value) + 1);
    setFront((current) => (current === nextFront ? current : nextFront));
    setStep((current) => (current === nextStep ? current : nextStep));
  };

  useEffect(() => {
    syncOffset(offset.get());
  }, [offset]);

  useMotionValueEvent(offset, "change", syncOffset);

  return (
    <div className="relative h-full overflow-hidden bg-ink text-canvas">
      {LOOKS.map((look, index) => (
        <LookPhoto key={look.title} look={look} index={index} offset={offset} />
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[22%] bg-gradient-to-b from-[rgba(42,36,28,0.28)] to-transparent" />

      <LookCaption look={LOOKS[front]} active detail={open} held={front === 0} />

      <p className="absolute left-[7cqw] top-[7.4cqw] z-30 text-[3.15cqw] font-medium text-canvas drop-shadow-[0_1px_2px_rgba(42,36,28,0.35)]">
        9:41
      </p>
      <p className="absolute top-[7.6cqw] right-[7cqw] z-30 text-[2.8cqw] text-canvas/90">
        {step} / {LOOKS.length}
      </p>

      <motion.p
        className="absolute top-[28cqw] left-[7cqw] z-30 rounded-full border border-canvas/40 px-[3.2cqw] py-[1.2cqw] text-[3cqw] text-canvas"
        style={{ opacity: passOpacity }}
      >
        Pass
      </motion.p>
      <motion.p
        className="absolute top-[28cqw] right-[7cqw] z-30 rounded-full bg-primary px-[3.2cqw] py-[1.2cqw] text-[3cqw] text-canvas"
        style={{ opacity: keepOpacity }}
      >
        Keep
      </motion.p>

      <TabBar active="discover" />
    </div>
  );
}
