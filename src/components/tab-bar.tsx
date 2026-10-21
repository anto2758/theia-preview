type TabId = "collections" | "discover" | "profile";

const tabs: { id: TabId; label: string }[] = [
  { id: "collections", label: "Collections" },
  { id: "discover", label: "Discover" },
  { id: "profile", label: "Profile" },
];

export function TabBar({ active }: { active: TabId }) {
  return (
    <div className="absolute right-[5.2cqw] bottom-[4.6cqw] left-[5.2cqw] z-30 rounded-[7.2cqw] bg-canvas px-[1.2cqw] py-[1.1cqw] shadow-[0_10px_24px_rgba(42,36,28,0.16)]">
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <div
              key={tab.id}
              className={`flex flex-1 flex-col items-center gap-[0.7cqw] rounded-[6cqw] px-[1cqw] py-[1.5cqw] ${selected ? "bg-muted" : ""}`}
            >
              <TabIcon id={tab.id} selected={selected} />
              <span className={`text-[2.45cqw] leading-none ${selected ? "font-medium text-ink" : "text-ink"}`}>
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabIcon({ id, selected }: { id: TabId; selected: boolean }) {
  const color = selected ? "#8A7349" : "#2A241C";
  if (id === "collections") {
    return (
      <svg viewBox="0 0 24 24" className="h-[5.1cqw] w-[5.1cqw]" aria-hidden="true">
        <rect x="3.2" y="3.2" width="7" height="7" rx="1.6" fill={selected ? color : "none"} stroke={color} strokeWidth="1.6" />
        <rect x="13.8" y="3.2" width="7" height="7" rx="1.6" fill={selected ? color : "none"} stroke={color} strokeWidth="1.6" />
        <rect x="3.2" y="13.8" width="7" height="7" rx="1.6" fill={selected ? color : "none"} stroke={color} strokeWidth="1.6" />
        <rect x="13.8" y="13.8" width="7" height="7" rx="1.6" fill={selected ? color : "none"} stroke={color} strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "discover") {
    return (
      <svg viewBox="0 0 24 24" className="h-[5.1cqw] w-[5.1cqw]" aria-hidden="true">
        <rect x="6.2" y="5.2" width="13" height="10.2" rx="2" fill="none" stroke={color} strokeWidth="1.7" />
        <rect x="4.2" y="8.4" width="13" height="10.4" rx="2.1" fill="#FAF7F2" stroke={color} strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[5.1cqw] w-[5.1cqw]" aria-hidden="true">
      <circle cx="12" cy="12" r="8.1" fill="none" stroke={color} strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.15" fill={color} />
      <path d="M7.7 16.8c.9-1.7 2.3-2.5 4.3-2.5s3.4.8 4.3 2.5" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
