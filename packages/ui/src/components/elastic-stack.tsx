"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface ElasticStackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Cards, front to back. Each fills the container (size it via className). */
  children: React.ReactNode;
  /** Drag distance + flick momentum (px) needed to fling the top card. @default 100 */
  threshold?: number;
  /** Called with the original index of the card that lands on top. */
  onTopChange?: (index: number) => void;
}

/**
 * A fanned deck where only the top card is draggable: pull it sideways
 * against elastic constraints — release beyond `threshold` and it flings
 * off with your velocity, then glides back in at the rear while the rest
 * shuffle one step forward; release short of it and it snaps home.
 * ArrowLeft/ArrowRight cycle the deck from the keyboard; dots track the
 * top card. Cycling is infinite.
 */
export function ElasticStack({
  children,
  threshold = 100,
  onTopChange,
  className,
  ...props
}: ElasticStackProps) {
  const reduceMotion = useReducedMotion();
  const cards = React.Children.toArray(children);
  const count = cards.length;

  const [order, setOrder] = React.useState<number[]>(() =>
    Array.from({ length: count }, (_, i) => i),
  );
  const [exiting, setExiting] = React.useState<1 | -1 | null>(null);

  // Keep the order in sync if the number of children changes.
  React.useEffect(() => {
    setOrder((prev) =>
      prev.length === count ? prev : Array.from({ length: count }, (_, i) => i),
    );
  }, [count]);

  const cycleForward = React.useCallback(() => {
    setExiting(null);
    if (order.length < 2) return;
    const next = [...order.slice(1), order[0] ?? 0];
    setOrder(next);
    onTopChange?.(next[0] ?? 0);
  }, [order, onTopChange]);

  const cycleBackward = React.useCallback(() => {
    if (order.length < 2) return;
    const next = [order[order.length - 1] ?? 0, ...order.slice(0, -1)];
    setOrder(next);
    onTopChange?.(next[0] ?? 0);
  }, [order, onTopChange]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(e);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (!exiting) setExiting(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (!exiting) cycleBackward();
    }
  };

  if (count === 0) return null;
  const top = order[0] ?? 0;

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      <div
        role="group"
        aria-label="Card stack"
        aria-roledescription="card stack"
        {...props}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "relative h-full w-full outline-none",
          "rounded-[var(--lm-radius-lg)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
        )}
      >
        <span aria-live="polite" className="sr-only">
          Card {top + 1} of {count}
        </span>

        {order.map((childIndex, pos) => {
          const isTop = pos === 0;
          const flinging = isTop && exiting != null;

          const fan = {
            x: pos * 18,
            y: pos * -10,
            scale: 1 - pos * 0.05,
            rotate: pos * 3,
            opacity: 1,
          };
          const fling = reduceMotion
            ? { ...fan, opacity: 0 }
            : {
                x: (exiting ?? 1) * 560,
                y: 0,
                scale: 1,
                rotate: (exiting ?? 1) * 16,
                opacity: 0,
              };

          return (
            <motion.div
              key={childIndex}
              drag={isTop && !exiting && !reduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                const momentum = info.offset.x + info.velocity.x * 0.2;
                if (Math.abs(momentum) > threshold) {
                  setExiting(momentum > 0 ? 1 : -1);
                }
              }}
              animate={flinging ? fling : fan}
              transition={reduceMotion ? { duration: 0 } : springs.glide}
              onAnimationComplete={() => {
                if (flinging) cycleForward();
              }}
              className={cn(
                "absolute inset-0",
                isTop && !reduceMotion && "cursor-grab active:cursor-grabbing",
              )}
              style={{ zIndex: count - pos }}
              aria-hidden={!isTop}
            >
              {cards[childIndex]}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2" aria-label="Cards">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Bring card ${i + 1} to the front`}
            aria-pressed={i === top}
            onClick={() => {
              if (i === top) return;
              setOrder([i, ...order.filter((idx) => idx !== i)]);
              onTopChange?.(i);
            }}
            className={cn(
              "relative flex h-5 w-5 items-center justify-center rounded-full outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                i === top
                  ? "bg-[var(--lm-accent)] shadow-[0_0_8px_var(--lm-glow)]"
                  : "bg-[var(--lm-border-strong)]",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
