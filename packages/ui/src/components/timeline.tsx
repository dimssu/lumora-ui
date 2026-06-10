"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface TimelineItem {
  title: React.ReactNode;
  /** Timestamp or date string shown beside the title. */
  time?: React.ReactNode;
  body?: React.ReactNode;
  /** Replaces the default dot inside the node. */
  icon?: React.ReactNode;
}

export interface TimelineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: TimelineItem[];
}

/**
 * Vertical event list: the spine draws itself downward as the list
 * scrolls into view, while each node pops and its content drifts in the
 * first time it enters the viewport.
 */
export function Timeline({ items, className, ...props }: TimelineProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.55"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      {/* spine */}
      <span
        aria-hidden
        className="absolute bottom-2 left-[15px] top-2 w-px bg-[var(--lm-border)]"
      />
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-[var(--lm-accent)] opacity-60"
        style={reduceMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
      />

      <ol className="flex flex-col gap-8">
        {items.map((item, index) => (
          <li key={index} className="relative flex gap-4 pl-0">
            <motion.span
              aria-hidden
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }
              }
              whileInView={
                reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true, amount: 0.6 }}
              transition={springs.snap}
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "border border-[var(--lm-border-strong)] bg-[var(--lm-surface)] text-[var(--lm-accent)]",
                "shadow-[0_0_12px_var(--lm-glow)]",
              )}
            >
              {item.icon ?? (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lm-accent)]" />
              )}
            </motion.span>

            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={springs.drift}
              className="min-w-0 pt-1"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="text-sm font-semibold text-[var(--lm-fg)]">
                  {item.title}
                </span>
                {item.time && (
                  <span className="text-xs text-[var(--lm-fg-faint)]">
                    {item.time}
                  </span>
                )}
              </div>
              {item.body && (
                <div className="mt-1.5 text-sm text-[var(--lm-fg-muted)]">
                  {item.body}
                </div>
              )}
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
