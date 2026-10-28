"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function span(progress: number, start: number, end: number) {
  if (end <= start) return 0;
  return smooth((progress - start) / (end - start));
}

const phases = [
  { id: "intro", from: 0, index: "01", title: "Once", line: "Size, cloth, brands. Then it knows." },
  { id: "sizes", from: 0.12, index: "02", title: "Sizes", line: "What actually fits." },
  { id: "brands", from: 0.3, index: "03", title: "Houses", line: "Yours, and a few you don’t know yet." },
  { id: "materials", from: 0.48, index: "04", title: "Cloth", line: "What it’s made of." },
  { id: "budget", from: 0.66, index: "05", title: "Spend", line: "What you’ll pay." },
  { id: "done", from: 0.84, index: "06", title: "Ready", line: "The season, already edited." },
] as const;

/** Hold each card, then ease into the next across a visible stretch of scroll. */
const blends = [
  [0.08, 0.16],
  [0.26, 0.34],
  [0.44, 0.52],
  [0.62, 0.7],
  [0.8, 0.88],
] as const;

function screenAt(progress: number) {
  let index = 0;
  for (const [start, end] of blends) {
    if (progress < start) return index;
    if (progress < end) return index + smooth((progress - start) / (end - start));
    index += 1;
  }
  return index;
}

const sizeRows = [
  { label: "Coat", options: ["34", "36", "38", "40"], pick: 2 },
  { label: "Knit", options: ["XS", "S", "M", "L"], pick: 1 },
  { label: "Trouser", options: ["34", "36", "38", "40"], pick: 1 },
  { label: "Boot", options: ["37", "38", "39", "40"], pick: 2 },
] as const;

const brandChoices = [
  { name: "The Row", src: "/brands/row.svg" },
  { name: "Toteme", src: "/brands/toteme.png" },
  { name: "COS", src: "/brands/cos.png" },
  { name: "Arket", src: "/brands/arket.svg" },
  { name: "Acne Studios", src: "/brands/acne.svg" },
  { name: "Lemaire", src: "/brands/lemaire.svg" },
] as const;

const brandOn = [true, true, true, true, true, false] as const;

const materials = [
  { name: "Wool", on: true },
  { name: "Cotton", on: true },
  { name: "Cashmere", on: true },
  { name: "Leather", on: true },
  { name: "Linen", on: true },
  { name: "Polyester", on: false },
] as const;

function phaseFor(progress: number) {
  for (let i = phases.length - 1; i >= 0; i -= 1) {
    if (progress >= phases[i].from) return phases[i];
  }
  return phases[0];
}

export function KnowsYou() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<(typeof phases)[number]>(phases[0]);

  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sizesProgress = useTransform(progress, (p) => span(p, 0.18, 0.25));
  const brandsProgress = useTransform(progress, (p) => span(p, 0.36, 0.43));
  const materialsProgress = useTransform(progress, (p) => span(p, 0.54, 0.61));
  const budgetProgress = useTransform(progress, (p) => span(p, 0.72, 0.79));
  const screenIndex = useTransform(progress, screenAt);

  useMotionValueEvent(progress, "change", (value) => {
    const next = phaseFor(value);
    setPhase((current) => (current.id === next.id ? current : next));
  });

  return (
    <section ref={sectionRef} id="knows" className="relative h-[500vh]">
      <div className="sticky top-[4.5rem] h-[calc(100svh-4.5rem)] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_42%_at_72%_18%,rgba(196,165,116,0.16),transparent_58%)]"
        />

        <div className="relative mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] items-center gap-6 px-6 py-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-16 lg:py-10">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Your profile</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4"
              >
                <p className="font-serif text-sm text-primary">{phase.index}</p>
                <h2 className="text-display mt-2 font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.08]">
                  {phase.title}
                </h2>
                <p className="mt-3 text-base text-ink-soft sm:text-lg">{phase.line}</p>
              </motion.div>
            </AnimatePresence>

            <ol className="mt-8 hidden gap-2.5 lg:flex lg:flex-col">
              {phases.map((item) => {
                const active = item.id === phase.id;
                return (
                  <li key={item.id} className="flex items-baseline gap-3">
                    <span
                      className={`w-6 font-serif text-sm tabular-nums transition-colors duration-500 ${
                        active ? "text-primary" : "text-ink-soft/35"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-500 ${
                        active ? "text-ink" : "text-ink-soft/40"
                      }`}
                    >
                      {item.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex min-h-0 items-center justify-center lg:col-span-7 lg:justify-end">
            <SetupCard>
              <IntroScreen active={screenIndex} />
              <SizesScreen progress={sizesProgress} active={screenIndex} />
              <BrandsScreen progress={brandsProgress} active={screenIndex} />
              <MaterialsScreen progress={materialsProgress} active={screenIndex} />
              <BudgetScreen progress={budgetProgress} active={screenIndex} />
              <DoneScreen active={screenIndex} />
            </SetupCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function SetupCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[min(36rem,72svh)] w-full max-w-[30rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(196,165,116,0.16)_0%,transparent_70%)] blur-2xl"
      />
      <div className="relative h-full overflow-hidden rounded-xl border border-line bg-canvas shadow-[0_24px_50px_rgba(42,36,28,0.07)]">
        {children}
      </div>
    </div>
  );
}

function Screen({
  index,
  active,
  children,
  className = "",
  inset = true,
}: {
  index: number;
  active: MotionValue<number>;
  children: ReactNode;
  className?: string;
  inset?: boolean;
}) {
  const opacity = useTransform(active, (value) => {
    const distance = Math.abs(value - index);
    if (distance >= 1) return 0;
    return 1 - smooth(distance);
  });
  const y = useTransform(active, (value) => (index - value) * 72);

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col ${inset ? "px-8 pt-8 pb-8" : ""} ${className}`}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

function IntroScreen({ active }: { active: MotionValue<number> }) {
  const steps = ["Sizes", "Houses", "Cloth", "Spend"];

  return (
    <Screen index={0} active={active}>
      <p className="text-[11px] tracking-[0.22em] text-ink-soft uppercase">Setup</p>
      <ul className="mt-6 flex flex-1 flex-col">
        {steps.map((step, index) => (
          <li key={step} className="flex flex-1 items-center gap-4 border-b border-line">
            <span className="w-6 font-serif text-sm text-primary">{`0${index + 1}`}</span>
            <span className="font-serif text-[2.4rem] leading-none text-ink">{step}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function SizesScreen({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: MotionValue<number>;
}) {
  return (
    <Screen index={1} active={active}>
      <p className="text-[11px] tracking-[0.22em] text-ink-soft uppercase">Sizes</p>
      <div className="mt-8 flex flex-1 flex-col justify-between">
        {sizeRows.map((row, rowIndex) => (
          <SizeRow key={row.label} row={row} rowIndex={rowIndex} progress={progress} />
        ))}
      </div>
    </Screen>
  );
}

function SizeRow({
  row,
  rowIndex,
  progress,
}: {
  row: (typeof sizeRows)[number];
  rowIndex: number;
  progress: MotionValue<number>;
}) {
  const start = rowIndex * 0.18;
  const reveal = useTransform(progress, (p) => clamp01((p - start) / 0.16));

  return (
    <motion.div style={{ opacity: reveal }}>
      <p className="text-[11px] tracking-[0.18em] text-ink-soft uppercase">{row.label}</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {row.options.map((option, optionIndex) => (
          <SizeChip
            key={option}
            label={option}
            selected={optionIndex === row.pick}
            progress={progress}
            rowStart={start}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SizeChip({
  label,
  selected,
  progress,
  rowStart,
}: {
  label: string;
  selected: boolean;
  progress: MotionValue<number>;
  rowStart: number;
}) {
  const lit = useTransform(progress, (p) => (selected ? clamp01((p - rowStart - 0.06) / 0.14) : 0));
  const backgroundColor = useTransform(lit, (v) => `rgba(42,36,28,${selected ? v : 0})`);
  const color = useTransform(lit, (v) =>
    selected ? `rgb(${mix(122, 250, v)}, ${mix(113, 247, v)}, ${mix(100, 242, v)})` : "rgb(122,113,100)",
  );
  const borderColor = useTransform(lit, (v) =>
    selected ? `rgba(42,36,28,${0.14 + v * 0.86})` : "rgba(224,214,200,1)",
  );

  return (
    <motion.span
      className="grid h-12 place-items-center rounded-full border font-serif text-lg tabular-nums"
      style={{ backgroundColor, color, borderColor }}
    >
      {label}
    </motion.span>
  );
}

function mix(from: number, to: number, t: number) {
  return Math.round(from + (to - from) * t);
}

function BrandsScreen({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: MotionValue<number>;
}) {
  return (
    <Screen index={2} active={active} inset={false} className="pt-8">
      <p className="px-8 text-[11px] tracking-[0.22em] text-ink-soft uppercase">Houses</p>
      <ul className="mt-4 flex flex-1 flex-col">
        {brandChoices.map((brand, index) => (
          <BrandRow key={brand.name} brand={brand} index={index} progress={progress} />
        ))}
      </ul>
    </Screen>
  );
}

function BrandRow({
  brand,
  index,
  progress,
}: {
  brand: (typeof brandChoices)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const on = brandOn[index];
  const lit = useTransform(progress, (p) => (on ? clamp01((p - index * 0.1) / 0.16) : 0));
  const wash = useTransform(lit, (v) => `rgba(243,235,225,${v * 0.95})`);
  const mark = useTransform(lit, (v) => v);

  return (
    <motion.li
      className="flex min-h-14 flex-1 items-center justify-between border-b border-line/80 px-8"
      style={{ backgroundColor: wash }}
    >
      <img
        src={brand.src}
        alt={brand.name}
        draggable={false}
        className="h-6 w-auto max-w-[12rem] object-contain object-left opacity-80 grayscale"
      />
      <motion.span
        aria-hidden
        className="grid size-[1.15rem] place-items-center rounded-full bg-ink text-canvas"
        style={{ opacity: mark, scale: mark }}
      >
        <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
          <path
            d="M2.6 6.2 4.8 8.4 9.4 3.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.li>
  );
}

function MaterialsScreen({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: MotionValue<number>;
}) {
  return (
    <Screen index={3} active={active} inset={false} className="pt-8">
      <p className="px-8 text-[11px] tracking-[0.22em] text-ink-soft uppercase">Cloth</p>
      <ul className="mt-4 flex flex-1 flex-col">
        {materials.map((material, index) => (
          <MaterialRow key={material.name} material={material} index={index} progress={progress} />
        ))}
      </ul>
    </Screen>
  );
}

function MaterialRow({
  material,
  index,
  progress,
}: {
  material: (typeof materials)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const lit = useTransform(progress, (p) => (material.on ? clamp01((p - index * 0.1) / 0.16) : 0));
  const wash = useTransform(lit, (v) => `rgba(243,235,225,${v * 0.95})`);
  const mark = useTransform(lit, (v) => v);

  return (
    <motion.li
      className="flex min-h-14 flex-1 items-center justify-between border-b border-line/80 px-8"
      style={{ backgroundColor: wash }}
    >
      <span className="font-serif text-[1.65rem] leading-none text-ink">{material.name}</span>
      <motion.span
        aria-hidden
        className="grid size-5 place-items-center rounded-full bg-ink text-canvas"
        style={{ opacity: mark, scale: mark }}
      >
        <svg viewBox="0 0 12 12" className="size-3" fill="none">
          <path
            d="M2.6 6.2 4.8 8.4 9.4 3.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.li>
  );
}

function BudgetScreen({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: MotionValue<number>;
}) {
  const high = useTransform(progress, (p) => Math.round(180 + smooth(p) * 200));
  const highText = useTransform(high, (v) => `€${v}`);
  const fill = useTransform(progress, [0, 1], ["8%", "62%"]);
  const handle = useTransform(progress, [0, 1], ["22%", "74%"]);
  const seasonOpacity = useTransform(progress, [0.55, 0.82], [0, 1]);
  const seasonY = useTransform(progress, [0.55, 0.82], [10, 0]);

  return (
    <Screen index={4} active={active}>
      <div>
        <p className="text-[11px] tracking-[0.22em] text-ink-soft uppercase">Per piece</p>
        <p className="mt-5 font-serif text-[3.4rem] leading-none tracking-tight text-ink">
          €80
          <span className="mx-2 text-ink-soft/60">–</span>
          <motion.span>{highText}</motion.span>
        </p>

        <div className="relative mt-8 h-px bg-line">
          <motion.div className="absolute inset-y-0 left-[14%] bg-ink" style={{ width: fill }} />
          <span className="absolute top-1/2 left-[14%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-canvas" />
          <motion.span
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: handle }}
          />
        </div>

        <motion.div className="mt-10" style={{ opacity: seasonOpacity, y: seasonY }}>
          <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">Season</p>
          <p className="mt-2 font-serif text-[2.1rem] leading-none text-ink">€1.100</p>
        </motion.div>
      </div>
    </Screen>
  );
}

function DoneScreen({ active }: { active: MotionValue<number> }) {
  const facts = [
    { label: "Sizes", value: "38 · S · 36 · 39" },
    { label: "Houses", value: "Five names" },
    { label: "Cloth", value: "No polyester" },
    { label: "Spend", value: "€80 – €380" },
  ];

  return (
    <Screen index={5} active={active} className="justify-between">
      <div>
        <p className="text-[11px] tracking-[0.22em] text-ink-soft uppercase">Saved</p>
        <ul className="mt-4">
          {facts.map((fact) => (
            <li key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <span className="text-[11px] tracking-[0.18em] text-ink-soft uppercase">{fact.label}</span>
              <span className="font-serif text-lg text-ink">{fact.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 min-h-0 flex-1 overflow-hidden rounded-[1.15rem]">
        <img
          src="/looks/swipe-gray-coat.jpg"
          alt=""
          draggable={false}
          decoding="async"
          className="h-full w-full object-cover object-[center_30%]"
        />
      </div>
    </Screen>
  );
}
