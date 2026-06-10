"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

export interface RevealListItem {
  title: string;
  /** Secondary line on the right edge of the row (year, category, etc.). */
  meta?: string;
  /** Preview image shown while the row is hovered or focused. */
  src: string;
  /** Render the row as a link instead of a button. */
  href?: string;
}

export interface RevealListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  items: RevealListItem[];
  /** Called when a row is activated. */
  onItemClick?: (item: RevealListItem, index: number) => void;
}

const PREVIEW_W = 224;
const PREVIEW_H = 160;

/**
 * Editorial list of large rows: hovering a row summons a floating preview
 * image that trails the cursor on a lagging spring and crossfades as you
 * move between rows, while the other rows dim back. Keyboard focus pins
 * the preview to the row's right edge. Under reduced motion the preview
 * stays pinned and only fades.
 */
export function RevealList({
  items,
  onItemClick,
  className,
  ...props
}: RevealListProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = React.useState<number | null>(null);
  const [pinned, setPinned] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.9 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.9 });

  const pinToRow = React.useCallback(
    (index: number) => {
      const container = containerRef.current;
      const row = rowRefs.current[index];
      if (!container || !row) return;
      x.jump(container.clientWidth - PREVIEW_W / 2 - 24);
      y.jump(row.offsetTop + row.offsetHeight / 2);
    },
    [x, y],
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onMouseMove?.(e);
    if (pinned || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const enterRow = (index: number) => {
    if (reduceMotion) pinToRow(index);
    setPinned(reduceMotion ?? false);
    setActive(index);
  };

  const focusRow = (index: number) => {
    pinToRow(index);
    setPinned(true);
    setActive(index);
  };

  const activeItem = active != null ? items[active] : undefined;

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn("relative", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={(e) => {
        props.onMouseLeave?.(e);
        setActive(null);
      }}
    >
      {items.map((item, i) => {
        const dimmed = active != null && active !== i;
        const rowClass = cn(
          "flex w-full items-baseline justify-between gap-6 text-left outline-none",
          "border-b border-[var(--lm-border)] py-5",
          "transition-colors duration-300",
          dimmed ? "text-[var(--lm-fg-faint)]" : "text-[var(--lm-fg)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
        );
        const rowContent = (
          <>
            <span className="text-2xl font-medium tracking-tight sm:text-3xl">
              {item.title}
            </span>
            {item.meta && (
              <span
                className={cn(
                  "shrink-0 text-sm transition-colors duration-300",
                  dimmed ? "text-[var(--lm-fg-faint)]" : "text-[var(--lm-fg-muted)]",
                )}
              >
                {item.meta}
              </span>
            )}
          </>
        );
        const shared = {
          ref: (el: HTMLElement | null) => {
            rowRefs.current[i] = el;
          },
          className: rowClass,
          onMouseEnter: () => enterRow(i),
          onFocus: () => focusRow(i),
          onBlur: () => setActive(null),
          onClick: () => onItemClick?.(item, i),
        };

        return item.href ? (
          <a key={i} href={item.href} {...shared}>
            {rowContent}
          </a>
        ) : (
          <button key={i} type="button" {...shared}>
            {rowContent}
          </button>
        );
      })}

      <AnimatePresence>
        {activeItem && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: durations.fast, ease: eases.out }}
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-20 overflow-hidden",
              "rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]",
              "bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
            )}
            style={{
              width: PREVIEW_W,
              height: PREVIEW_H,
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={active}
                src={activeItem.src}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: durations.base, ease: eases.out }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
