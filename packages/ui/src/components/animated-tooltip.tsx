"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface AnimatedTooltipItem {
  id: string | number;
  name: string;
  /** Secondary line under the name (role, handle, etc.) */
  hint?: string;
  /** Image URL. Falls back to initials when omitted. */
  src?: string;
}

export interface AnimatedTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: AnimatedTooltipItem[];
  /** Avatar diameter in px. @default 44 */
  avatarSize?: number;
}

/**
 * Overlapping avatar row where the tooltip leans with your cursor:
 * its tilt and horizontal shift follow where you are over the avatar,
 * so the card feels balanced on your fingertip.
 */
export function AnimatedTooltip({
  items,
  avatarSize = 44,
  className,
  ...props
}: AnimatedTooltipProps) {
  const [active, setActive] = React.useState<AnimatedTooltipItem["id"] | null>(null);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const rotate = useTransform(springX, [-40, 40], [-9, 9]);
  const translateX = useTransform(springX, [-40, 40], [-14, 14]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const half = e.currentTarget.offsetWidth / 2;
    x.set(e.nativeEvent.offsetX - half);
  };

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative -mr-3 transition-transform duration-300 hover:z-10 hover:-translate-y-1"
          onMouseEnter={() => setActive(item.id)}
          onMouseLeave={() => setActive(null)}
          onMouseMove={onMove}
        >
          <AnimatePresence mode="popLayout">
            {active === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.7 }}
                transition={springs.drift}
                style={{ translateX, rotate }}
                className={cn(
                  "absolute -top-14 left-1/2 z-50 -translate-x-1/2",
                  "flex flex-col items-center rounded-[var(--lm-radius)] px-3 py-1.5",
                  "bg-[var(--lm-surface-2)] border border-[var(--lm-border)] shadow-[var(--lm-shadow)]",
                )}
              >
                <span className="text-xs font-semibold text-[var(--lm-fg)] whitespace-nowrap">
                  {item.name}
                </span>
                {item.hint && (
                  <span className="text-[10px] text-[var(--lm-fg-muted)] whitespace-nowrap">
                    {item.hint}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {item.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.name}
              width={avatarSize}
              height={avatarSize}
              className="rounded-full border-2 border-[var(--lm-bg)] object-cover"
              style={{ width: avatarSize, height: avatarSize }}
            />
          ) : (
            <div
              aria-label={item.name}
              className="flex items-center justify-center rounded-full border-2 border-[var(--lm-bg)] bg-[var(--lm-surface-2)] text-xs font-semibold text-[var(--lm-fg)]"
              style={{ width: avatarSize, height: avatarSize }}
            >
              {item.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
