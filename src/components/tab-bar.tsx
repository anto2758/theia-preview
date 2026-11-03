type TabId = "collections" | "discover" | "profile";

const tabs: { id: TabId; label: string }[] = [
  { id: "collections", label: "Collections" },
  { id: "discover", label: "Discover" },
  { id: "profile", label: "Profile" },
];

/** Matches LyraTabBar: frosted capsule + black selected pill. */
export function TabBar({ active }: { active: TabId }) {
  return (
    <div className="absolute right-[5.2cqw] bottom-[4.6cqw] left-[5.2cqw] z-30">
      <div className="rounded-full border-[0.5px] border-black/[0.08] bg-surface/92 p-[1.1cqw] soft-shadow backdrop-blur-xl">
        <div className="relative flex items-stretch">
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <div
                key={tab.id}
                className={`relative z-10 flex flex-1 flex-col items-center gap-[0.55cqw] rounded-full px-[1cqw] py-[1.45cqw] ${
                  selected ? "bg-primary text-on-primary mini-soft-shadow" : "text-ink-soft"
                }`}
              >
                <TabIcon id={tab.id} selected={selected} />
                <span className={`text-[2.35cqw] leading-none ${selected ? "font-medium" : ""}`}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TabIcon({ id, selected }: { id: TabId; selected: boolean }) {
  const color = selected ? "#FFFFFF" : "#8A8A8A";
  if (id === "collections") {
    return (
      <svg viewBox="0 0 24 24" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
        <rect
          x="3.2"
          y="3.2"
          width="7"
          height="7"
          rx="1.6"
          fill={selected ? color : "none"}
          stroke={color}
          strokeWidth="1.6"
        />
        <rect
          x="13.8"
          y="3.2"
          width="7"
          height="7"
          rx="1.6"
          fill={selected ? color : "none"}
          stroke={color}
          strokeWidth="1.6"
        />
        <rect
          x="3.2"
          y="13.8"
          width="7"
          height="7"
          rx="1.6"
          fill={selected ? color : "none"}
          stroke={color}
          strokeWidth="1.6"
        />
        <rect
          x="13.8"
          y="13.8"
          width="7"
          height="7"
          rx="1.6"
          fill={selected ? color : "none"}
          stroke={color}
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (id === "discover") {
    return (
      <svg viewBox="0 0 24 24" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
        <rect x="6.2" y="5.2" width="13" height="10.2" rx="2" fill="none" stroke={color} strokeWidth="1.7" />
        <rect
          x="4.2"
          y="8.4"
          width="13"
          height="10.4"
          rx="2.1"
          fill={selected ? "rgba(255,255,255,0.18)" : "#FFFFFF"}
          stroke={color}
          strokeWidth="1.7"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
      <circle cx="12" cy="12" r="8.1" fill="none" stroke={color} strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.15" fill={color} />
      <path
        d="M7.7 16.8c.9-1.7 2.3-2.5 4.3-2.5s3.4.8 4.3 2.5"
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
