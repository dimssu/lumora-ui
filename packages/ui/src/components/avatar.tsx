"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
} as const;

const STATUS_COLOR = {
  positive: "var(--lm-positive)",
  negative: "var(--lm-negative)",
  away: "var(--lm-accent)",
} as const;

export type AvatarSize = keyof typeof SIZES;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Image URL. Initials take over if it's missing or fails to load. */
  src?: string;
  /** Person's name — used for alt text and the initials fallback. */
  name: string;
  /** @default "md" */
  size?: AvatarSize;
  /** @default "circle" */
  shape?: "circle" | "square";
  /** Optional presence dot in the bottom-right corner. */
  status?: "positive" | "negative" | "away";
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Identity disc with a graceful fallback: if the image errors, initials
 * crossfade in so the swap never flashes. An optional status dot sits on
 * the rim in the library's status tones.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { src, name, size = "md", shape = "circle", status, className, ...props },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const [failed, setFailed] = React.useState(false);
    const px = SIZES[size];
    const showImage = Boolean(src) && !failed;

    React.useEffect(() => setFailed(false), [src]);

    const radiusClass =
      shape === "circle" ? "rounded-full" : "rounded-[var(--lm-radius)]";

    return (
      <span
        ref={ref}
        className={cn("relative inline-block shrink-0 select-none", className)}
        style={{ width: px, height: px }}
        {...props}
      >
        <AnimatePresence initial={false}>
          {showImage ? (
            <motion.img
              key="image"
              src={src}
              alt={name}
              width={px}
              height={px}
              onError={() => setFailed(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : durations.fast,
                ease: [...eases.out],
              }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                "border border-[var(--lm-border)]",
                radiusClass,
              )}
            />
          ) : (
            <motion.span
              key="initials"
              role="img"
              aria-label={name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : durations.fast,
                ease: [...eases.out],
              }}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "border border-[var(--lm-border)] bg-[var(--lm-surface-2)]",
                "font-semibold text-[var(--lm-fg)]",
                radiusClass,
              )}
              style={{ fontSize: Math.max(10, Math.round(px * 0.34)) }}
            >
              {initialsOf(name)}
            </motion.span>
          )}
        </AnimatePresence>

        {status && (
          <span
            aria-hidden
            className="absolute bottom-0 right-0 block rounded-full border-2 border-[var(--lm-bg)]"
            style={{
              width: Math.max(8, Math.round(px * 0.28)),
              height: Math.max(8, Math.round(px * 0.28)),
              backgroundColor: STATUS_COLOR[status],
            }}
          />
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Show at most this many avatars; the rest collapse into a "+N" chip. */
  max?: number;
  /** Sizes the overflow chip to match its siblings. @default "md" */
  size?: AvatarSize;
}

/**
 * Overlapping avatar row: the hovered avatar lifts above its siblings so
 * faces never stay buried. Beyond `max`, the remainder collapses into a
 * quiet "+N" chip.
 */
export function AvatarGroup({
  max,
  size = "md",
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const all = React.Children.toArray(children);
  const visible = max !== undefined && max < all.length ? all.slice(0, max) : all;
  const hidden = all.length - visible.length;
  const px = SIZES[size];

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {visible.map((child, index) => (
        <span
          key={index}
          className={cn(
            "relative -mr-2 rounded-full transition-transform duration-300",
            "hover:z-10 hover:-translate-y-1 motion-reduce:hover:translate-y-0",
            "[&_img]:border-2 [&_img]:border-[var(--lm-bg)]",
          )}
        >
          {child}
        </span>
      ))}
      {hidden > 0 && (
        <span
          className={cn(
            "relative z-0 flex items-center justify-center rounded-full",
            "border-2 border-[var(--lm-bg)] bg-[var(--lm-surface-2)]",
            "font-medium text-[var(--lm-fg-muted)]",
          )}
          style={{
            width: px,
            height: px,
            fontSize: Math.max(10, Math.round(px * 0.3)),
          }}
        >
          +{hidden}
        </span>
      )}
    </div>
  );
}
