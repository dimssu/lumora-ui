"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Travel speed in px per second. @default 48 */
  speed?: number;
  /** Direction of travel. @default "left" */
  direction?: "left" | "right";
  /** Pause the loop while the marquee is hovered. @default false */
  pauseOnHover?: boolean;
  /** Soft-fade the content at both edges. @default true */
  fade?: boolean;
  /** Gap between items (and between loop copies), in px. @default 24 */
  gap?: number;
}

/**
 * A seamless infinite belt of content: children are duplicated (the copy is
 * `aria-hidden`) and the track translates exactly one copy's width per loop,
 * so the seam never shows. With reduced motion the loop stops and the first
 * copy sits still.
 */
export function Marquee({
  speed = 48,
  direction = "left",
  pauseOnHover = false,
  fade = true,
  gap = 24,
  className,
  children,
  ...props
}: MarqueeProps) {
  const reduceMotion = useReducedMotion();
  const segmentRef = React.useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    const segment = segmentRef.current;
    if (!segment) return;
    const measure = () => setDuration(segment.offsetWidth / Math.max(speed, 1));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(segment);
    return () => observer.disconnect();
  }, [speed]);

  const animate = !reduceMotion && duration > 0;
  const segmentClass = "flex w-max shrink-0 items-center";

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            }
          : undefined
      }
      {...props}
    >
      <style>{`@keyframes lm-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: animate
            ? `lm-marquee-scroll ${duration}s linear infinite ${direction === "right" ? "reverse" : "normal"}`
            : undefined,
        }}
      >
        <div ref={segmentRef} className={segmentClass} style={{ gap, paddingRight: gap }}>
          {children}
        </div>
        <div aria-hidden className={segmentClass} style={{ gap, paddingRight: gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
