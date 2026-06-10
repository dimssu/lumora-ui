"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, springs } from "../lib/motion";

interface TrailCard {
  id: number;
  x: number;
  y: number;
  src: string;
  rotate: number;
}

export interface CursorTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URLs cycled in order as cards spawn. */
  images: string[];
  /** Pointer travel (px) between card spawns. @default 28 */
  threshold?: number;
  /** Maximum live cards; the oldest is culled beyond this. @default 8 */
  maxItems?: number;
  /** Card width in px (height follows a 4:5 ratio). @default 96 */
  cardWidth?: number;
}

/**
 * A container whose pointer movement leaves a trail of small image cards:
 * every `threshold` px of travel a card pops in at the cursor with a spring
 * and a slight deterministic rotation, then fades and shrinks away ~700ms
 * later. Cards are decorative (aria-hidden, pointer-events-none) and render
 * beneath the children. Under reduced motion no trail is spawned.
 */
export function CursorTrail({
  images,
  threshold = 28,
  maxItems = 8,
  cardWidth = 96,
  className,
  children,
  ...props
}: CursorTrailProps) {
  const reduceMotion = useReducedMotion();
  const [cards, setCards] = React.useState<TrailCard[]>([]);
  const counter = React.useRef(0);
  const lastPoint = React.useRef<{ x: number; y: number } | null>(null);
  const timers = React.useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  React.useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    props.onPointerMove?.(e);
    if (reduceMotion || images.length === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const last = lastPoint.current;
    if (last && Math.hypot(x - last.x, y - last.y) < threshold) return;
    lastPoint.current = { x, y };
    if (!last) return;

    const id = counter.current++;
    const card: TrailCard = {
      id,
      x,
      y,
      src: images[id % images.length] ?? "",
      // Pseudo-random tilt derived from the counter — deterministic, SSR-safe.
      rotate: ((id * 83) % 25) - 12,
    };
    setCards((prev) => {
      const keep = Math.max(maxItems - 1, 0);
      return [...prev.slice(prev.length - keep), card];
    });

    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setCards((prev) => prev.filter((c) => c.id !== id));
    }, 700);
    timers.current.add(timer);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    props.onPointerLeave?.(e);
    lastPoint.current = null;
  };

  return (
    <div
      {...props}
      className={cn("relative overflow-hidden", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ scale: 0.4, opacity: 0, rotate: card.rotate * 1.6 }}
              animate={{ scale: 1, opacity: 1, rotate: card.rotate }}
              exit={{
                scale: 0.55,
                opacity: 0,
                transition: { duration: durations.base, ease: "easeOut" },
              }}
              transition={springs.snap}
              className={cn(
                "absolute overflow-hidden",
                "rounded-[var(--lm-radius)] border border-[var(--lm-border)]",
                "bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
              )}
              style={{
                left: card.x,
                top: card.y,
                width: cardWidth,
                height: cardWidth * 1.25,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
