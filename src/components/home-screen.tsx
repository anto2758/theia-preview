"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import { TabBar } from "@/components/tab-bar";

type Tile = {
  id: string;
  title: string;
  meta: string;
  src: string;
  height: string;
  position?: string;
  picked?: boolean;
};

type Rect = { top: number; left: number; width: number; height: number };

/** Pinterest heights + unique images per tile (for-you). */
const leftColumn: Tile[] = [
  {
    id: "fall-brown",
    title: "Brown coat",
    meta: "11 outfits",
    src: "/looks/fall-brown-coat.jpg",
    height: "32cqw",
    position: "object-[center_28%]",
  },
  {
    id: "cashmere",
    title: "Cashmere",
    meta: "New drop",
    src: "/looks/cashmere.jpg",
    height: "26cqw",
    position: "object-center",
  },
  {
    id: "the-walk",
    title: "Autumn in the park",
    meta: "12 outfits",
    src: "/looks/swipe-park.jpg",
    height: "42cqw",
    position: "object-[center_32%]",
    picked: true,
  },
  {
    id: "the-city",
    title: "The city",
    meta: "9 outfits",
    src: "/looks/windowpane.jpg",
    height: "28cqw",
    position: "object-[center_46%]",
  },
  {
    id: "navy",
    title: "Navy",
    meta: "7 outfits",
    src: "/looks/navy-suit.jpg",
    height: "36cqw",
    position: "object-[center_38%]",
  },
  {
    id: "grey-coat",
    title: "Grey wool coat",
    meta: "5 outfits",
    src: "/looks/swipe-gray-coat.jpg",
    height: "30cqw",
    position: "object-[center_28%]",
  },
];

const rightColumn: Tile[] = [
  {
    id: "fall-rain",
    title: "Rain day",
    meta: "Today",
    src: "/looks/fall-rain.jpg",
    height: "26cqw",
    position: "object-[center_35%]",
  },
  {
    id: "black-wool",
    title: "Black wool",
    meta: "9 outfits",
    src: "/looks/black-wool.jpg",
    height: "46cqw",
    position: "object-[center_58%]",
  },
  {
    id: "copenhagen",
    title: "Copenhagen trench",
    meta: "8 outfits",
    src: "/looks/trench.jpg",
    height: "22cqw",
    position: "object-[center_42%]",
  },
  {
    id: "after-six",
    title: "After six",
    meta: "6 outfits",
    src: "/looks/ivory.jpg",
    height: "36cqw",
    position: "object-[center_40%]",
  },
  {
    id: "camel-suit",
    title: "Camel suit",
    meta: "4 outfits",
    src: "/looks/suit.jpg",
    height: "40cqw",
    position: "object-[center_40%]",
  },
  {
    id: "tweed",
    title: "Tweed",
    meta: "6 outfits",
    src: "/looks/tweed.jpg",
    height: "28cqw",
    position: "object-[center_48%]",
  },
];

const savedLeft: Tile[] = [
  {
    id: "saved-milan",
    title: "Tweed coat",
    meta: "6 outfits",
    src: "/looks/tweed.jpg",
    height: "40cqw",
    position: "object-[center_48%]",
  },
  {
    id: "saved-office",
    title: "The office",
    meta: "4 outfits",
    src: "/looks/navy-suit.jpg",
    height: "22cqw",
    position: "object-[center_38%]",
  },
  {
    id: "saved-linen",
    title: "White collar",
    meta: "9 outfits",
    src: "/looks/white-collar.jpg",
    height: "34cqw",
    position: "object-[center_40%]",
  },
  {
    id: "saved-evening",
    title: "Evening",
    meta: "5 outfits",
    src: "/looks/suit.jpg",
    height: "48cqw",
    position: "object-[center_40%]",
  },
];

const savedRight: Tile[] = [
  {
    id: "saved-coats",
    title: "Coats",
    meta: "3 outfits",
    src: "/looks/fall-brown-coat.jpg",
    height: "24cqw",
    position: "object-[center_28%]",
  },
  {
    id: "saved-tailoring",
    title: "Rain day",
    meta: "7 outfits",
    src: "/looks/fall-rain.jpg",
    height: "42cqw",
    position: "object-[center_35%]",
  },
  {
    id: "saved-cashmere",
    title: "Kept cashmere",
    meta: "8 outfits",
    src: "/looks/cashmere.jpg",
    height: "28cqw",
    position: "object-center",
  },
  {
    id: "saved-stripes",
    title: "Black wool",
    meta: "11 outfits",
    src: "/looks/black-wool.jpg",
    height: "36cqw",
    position: "object-[center_55%]",
  },
];

type BoardId = "for-you" | "saved";

const boards: Record<BoardId, { left: Tile[]; right: Tile[] }> = {
  "for-you": { left: leftColumn, right: rightColumn },
  saved: { left: savedLeft, right: savedRight },
};

const boardTabs: { id: BoardId; label: string }[] = [
  { id: "for-you", label: "For you" },
  { id: "saved", label: "Saved" },
];

const storyTile = leftColumn.find((tile) => tile.picked) ?? leftColumn[2];

function CollectionTile({
  tile,
  tileRef,
  hidden,
  onOpen,
}: {
  tile: Tile;
  tileRef?: RefObject<HTMLButtonElement | null>;
  hidden?: boolean;
  onOpen: (el: HTMLButtonElement) => void;
}) {
  return (
    <article style={{ opacity: hidden ? 0 : 1 }}>
      <button
        ref={tile.picked ? tileRef : undefined}
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        className="block w-full overflow-hidden rounded-[3.2cqw] bg-muted text-left"
        style={{ height: tile.height }}
      >
        <img
          src={tile.src}
          alt=""
          draggable={false}
          decoding="async"
          className={`h-full w-full object-cover ${tile.position ?? "object-center"}`}
        />
      </button>
      <h3 className="mt-[1.5cqw] font-serif text-[3.5cqw] leading-tight text-ink">{tile.title}</h3>
      <p className="mt-[0.5cqw] text-[2.55cqw] text-ink-soft">{tile.meta}</p>
    </article>
  );
}

function ExpandCover({
  tile,
  progress,
  origin,
  screen,
}: {
  tile: Tile;
  progress: MotionValue<number>;
  origin: Rect;
  screen: { width: number; height: number };
}) {
  const top = useTransform(progress, (p) => origin.top + (0 - origin.top) * p);
  const left = useTransform(progress, (p) => origin.left + (0 - origin.left) * p);
  const width = useTransform(progress, (p) => origin.width + (screen.width - origin.width) * p);
  const height = useTransform(progress, (p) => origin.height + (screen.height - origin.height) * p);
  const radius = useTransform(progress, [0, 1], [14, 0]);
  const opacity = useTransform(progress, [0, 0.02, 1], [0, 1, 1]);
  const chromeOpacity = useTransform(progress, [0.55, 0.9], [0, 1]);
  const shadeOpacity = useTransform(progress, [0.35, 0.75], [0, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute z-40 overflow-hidden will-change-[top,left,width,height]"
      style={{ top, left, width, height, borderRadius: radius, opacity }}
    >
      <img
        src={tile.src}
        alt=""
        draggable={false}
        decoding="async"
        className={`h-full w-full object-cover ${tile.position ?? "object-center"}`}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgba(42,36,28,0.88)] via-[rgba(42,36,28,0.35)] to-transparent"
        style={{ opacity: shadeOpacity }}
      />
      <motion.div
        className="absolute right-[6.4cqw] bottom-[20cqw] left-[6.4cqw] text-canvas"
        style={{ opacity: chromeOpacity }}
      >
        <p className="text-[2.8cqw] text-canvas/80">Collection</p>
        <h3 className="mt-[1cqw] font-serif text-[7cqw] leading-none">{tile.title}</h3>
        <p className="mt-[1.6cqw] text-[2.9cqw] text-canvas/85">{tile.meta}</p>
      </motion.div>
    </motion.div>
  );
}

function SearchInput({
  query,
  onChange,
  onClear,
}: {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <label className="relative flex h-full items-center">
      <span className="pointer-events-none absolute top-1/2 left-[3.4cqw] z-10 flex -translate-y-1/2 text-ink/70">
        <svg viewBox="0 0 20 20" className="h-[3.8cqw] w-[3.8cqw]" aria-hidden="true">
          <circle cx="8.6" cy="8.6" r="5.15" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12.6 12.6 16.5 16.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <input
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search"
        aria-label="Search"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className="h-full w-full bg-transparent pr-[9cqw] pl-[8.6cqw] text-[3.5cqw] text-ink outline-none placeholder:text-ink/55"
      />
      {query ? (
        <button
          type="button"
          aria-label="Clear search"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onClear}
          className="absolute top-1/2 right-[2.2cqw] z-10 grid size-[4.4cqw] -translate-y-1/2 place-items-center rounded-full bg-ink/20 text-ink"
        >
          <svg viewBox="0 0 12 12" className="size-[2.1cqw]" aria-hidden="true">
            <path d="M3.1 3.1 8.9 8.9M8.9 3.1 3.1 8.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </label>
  );
}

function SearchField({ visible, opacity }: { visible: boolean; opacity?: MotionValue<number> }) {
  const [query, setQuery] = useState("");

  return (
    <motion.div
      className="absolute top-[37cqw] right-[3.2cqw] left-[3.2cqw] z-20 h-[9.2cqw]"
      style={{
        opacity,
        pointerEvents: visible ? "auto" : "none",
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-full border border-line/70 bg-canvas/80 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-xl">
        <SearchInput query={query} onChange={setQuery} onClear={() => setQuery("")} />
      </div>
    </motion.div>
  );
}

function BoardSwitch({ board, onChange }: { board: BoardId; onChange: (board: BoardId) => void }) {
  return (
    <div role="tablist" aria-label="Collections" className="mt-[3.2cqw] flex h-[5.8cqw] shrink-0 items-end gap-[5.4cqw]">
      {boardTabs.map((tab) => {
        const active = tab.id === board;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`relative border-0 bg-transparent pb-[1.25cqw] text-[3.9cqw] leading-none outline-none ${active ? "font-medium text-ink" : "text-ink-soft"}`}
          >
            {tab.label}
            <span className={`absolute inset-x-0 bottom-0 h-[0.38cqw] ${active ? "bg-ink" : "bg-transparent"}`} />
          </button>
        );
      })}
    </div>
  );
}

function CollectionBoard({
  board,
  pickedRef,
  hiddenId,
  onOpen,
}: {
  board: BoardId;
  pickedRef: RefObject<HTMLButtonElement | null>;
  hiddenId?: string;
  onOpen: (tile: Tile, el: HTMLButtonElement) => void;
}) {
  const columns = boards[board];

  return (
    <div className="flex items-start gap-[1.6cqw]">
      <div className="flex min-w-0 flex-1 flex-col gap-[1.6cqw]">
        {columns.left.map((tile) => (
          <CollectionTile
            key={tile.id}
            tile={tile}
            tileRef={tile.picked ? pickedRef : undefined}
            hidden={hiddenId === tile.id}
            onOpen={(el) => onOpen(tile, el)}
          />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[1.6cqw] pt-[5cqw]">
        {columns.right.map((tile) => (
          <CollectionTile
            key={tile.id}
            tile={tile}
            hidden={hiddenId === tile.id}
            onOpen={(el) => onOpen(tile, el)}
          />
        ))}
      </div>
    </div>
  );
}

function readRect(screen: HTMLElement, card: HTMLElement): Rect {
  const s = screen.getBoundingClientRect();
  const c = card.getBoundingClientRect();
  return {
    top: c.top - s.top,
    left: c.left - s.left,
    width: c.width,
    height: c.height,
  };
}

export function HomeScreen({
  boardScroll,
  selected,
}: {
  boardScroll?: MotionValue<number>;
  selected?: MotionValue<number>;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const pickedRef = useRef<HTMLButtonElement>(null);
  const [board, setBoard] = useState<BoardId>("for-you");
  const [expandTile, setExpandTile] = useState<Tile>(storyTile);
  const [origin, setOrigin] = useState<Rect>({ top: 180, left: 14, width: 150, height: 200 });
  const [screenSize, setScreenSize] = useState({ width: 320, height: 690 });
  const [expanding, setExpanding] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const fallbackScroll = useMotionValue(0);
  const fallbackSelected = useMotionValue(0);
  const clickExpand = useMotionValue(0);
  const scroll = boardScroll ?? fallbackScroll;
  const storyExpand = selected ?? fallbackSelected;
  const expand = useTransform([storyExpand, clickExpand], (latest) => {
    const [story, click] = latest as number[];
    return Math.max(story, click);
  });
  const boardY = useTransform(scroll, [0, 1], ["0cqw", "-62cqw"]);
  const boardFade = useTransform(expand, [0, 0.45], [1, 0]);
  const headerFade = useTransform(expand, [0, 0.35], [1, 0]);

  const measureFrom = (card: HTMLElement | null) => {
    const screen = screenRef.current;
    if (!screen || !card) return;
    setScreenSize({ width: screen.clientWidth, height: screen.clientHeight });
    setOrigin(readRect(screen, card));
  };

  useEffect(() => {
    measureFrom(pickedRef.current);
  }, []);

  useMotionValueEvent(scroll, "change", () => {
    if (expand.get() < 0.04) measureFrom(pickedRef.current);
  });

  useMotionValueEvent(expand, "change", (value) => {
    setExpanding(value > 0.02);
    setSearchVisible(value < 0.2);
    if (value > 0.02 && value < 0.08 && expandTile.id === storyTile.id) {
      measureFrom(pickedRef.current);
    }
  });

  useMotionValueEvent(storyExpand, "change", (value) => {
    if (value > 0.02) {
      setExpandTile(storyTile);
      if (clickExpand.get() > 0) clickExpand.set(0);
      measureFrom(pickedRef.current);
    }
  });

  const openTile = (tile: Tile, el: HTMLButtonElement) => {
    if (storyExpand.get() > 0.02) return;
    measureFrom(el);
    setExpandTile(tile);
    void animate(clickExpand, 1, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
  };

  return (
    <div ref={screenRef} className="relative h-full overflow-hidden bg-canvas text-ink">
      <p className="absolute left-[7cqw] top-[7.4cqw] z-10 text-[3.15cqw] font-medium">9:41</p>
      <div className="flex h-full flex-col overflow-hidden px-[3.2cqw] pt-[16cqw]">
        <motion.div style={{ opacity: headerFade }}>
          <h2 className="shrink-0 font-serif text-[7.2cqw] leading-none">Your collections</h2>
          <BoardSwitch board={board} onChange={setBoard} />
          <div className="mt-[4.8cqw] h-[9.2cqw] shrink-0" />
        </motion.div>
        <div className="mt-[4.8cqw] min-h-0 flex-1 overflow-hidden">
          <motion.div className="will-change-transform" style={{ y: boardY, opacity: boardFade }}>
            <CollectionBoard
              board={board}
              pickedRef={pickedRef}
              hiddenId={expanding ? expandTile.id : undefined}
              onOpen={openTile}
            />
          </motion.div>
        </div>
      </div>
      <SearchField visible={searchVisible} opacity={headerFade} />
      <ExpandCover tile={expandTile} progress={expand} origin={origin} screen={screenSize} />
      <div className="pointer-events-none absolute inset-0 z-50">
        <TabBar active="collections" />
      </div>
    </div>
  );
}
