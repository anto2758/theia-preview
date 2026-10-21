import type { ReactNode } from "react";

// The glass hole, outset by 6px. Radius grows by the same amount so the
// screen stays behind the bezel instead of sticking out of the corners.
const screen = {
  left: "6.686%",
  top: "3.296%",
  width: "86.629%",
  height: "93.409%",
};

export function IphoneFrame({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div className={`relative isolate aspect-[1406/2822] ${className}`}>
      <div className="absolute z-0 [container-type:size]" style={screen}>
        <div className="h-full w-full overflow-hidden bg-canvas [border-radius:15.85cqw]">
          {children}
        </div>
      </div>
      <img
        src="/devices/iphone-18-pro.png"
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
