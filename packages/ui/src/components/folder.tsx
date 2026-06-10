"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface FolderProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "children"> {
  /** Up to three nodes (thumbnails, mini cards) that rise out of the slot. */
  items?: React.ReactNode[];
  /** Caption rendered underneath the folder. */
  label?: string;
  /** Folder width in px. @default 116 */
  size?: number;
}

/**
 * An interactive folder drawn from CSS shapes: hovering tilts the front
 * lid open on its bottom hinge while up to three items rise out of the
 * slot with a stagger and a slight fan; clicking toggles it held open
 * (button semantics with aria-expanded). Under reduced motion the lid
 * stays put and the items simply fade in.
 */
export function Folder({
  items = [],
  label,
  size = 116,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: FolderProps) {
  const reduceMotion = useReducedMotion();
  const [held, setHeld] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const open = held || hovered;

  const height = Math.round(size * 0.74);
  const shown = items.slice(0, 3);

  return (
    <button
      type="button"
      aria-expanded={open}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        setHeld((h) => !h);
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        setHovered(false);
      }}
      className={cn(
        "group inline-flex flex-col items-center gap-2 outline-none",
        "rounded-[var(--lm-radius)] p-2",
        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative block"
        style={{ width: size, height, perspective: 600 }}
      >
        {/* Back panel */}
        <span
          className={cn(
            "absolute inset-x-0 bottom-0 block rounded-[var(--lm-radius)]",
            "border border-[var(--lm-border)] bg-[var(--lm-surface)]",
          )}
          style={{ height: height * 0.82 }}
        />
        {/* Tab */}
        <span
          className={cn(
            "absolute left-0 top-0 block rounded-t-[var(--lm-radius-sm)]",
            "border border-b-0 border-[var(--lm-border)] bg-[var(--lm-surface)]",
          )}
          style={{ width: size * 0.42, height: height * 0.26 }}
        />

        {/* Items rising out of the slot */}
        {shown.map((item, i) => {
          const fan = (i - (shown.length - 1) / 2) * 14;
          return (
            <motion.span
              key={i}
              className="absolute bottom-[26%] left-1/2 z-[1] block"
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: open ? 1 : 0, x: "-50%" }
                  : open
                    ? {
                        opacity: 1,
                        x: `calc(-50% + ${fan}px)`,
                        y: -(height * 0.34 + i * 7),
                        rotate: fan * 0.55,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        x: "-50%",
                        y: 0,
                        rotate: 0,
                        scale: 0.85,
                      }
              }
              transition={
                reduceMotion
                  ? { duration: 0.2 }
                  : { ...springs.drift, delay: open ? i * 0.06 : 0 }
              }
            >
              {item}
            </motion.span>
          );
        })}

        {/* Front lid, hinged at the bottom */}
        <motion.span
          className={cn(
            "absolute inset-x-0 bottom-0 z-[2] block rounded-[var(--lm-radius)]",
            "border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)]",
            "shadow-[var(--lm-shadow-sm)]",
          )}
          style={{ height: height * 0.62, transformOrigin: "50% 100%" }}
          initial={false}
          animate={reduceMotion ? undefined : { rotateX: open ? -34 : 0 }}
          transition={springs.drift}
        />
      </span>

      {label && (
        <span className="text-xs text-[var(--lm-fg-muted)] transition-colors duration-200 group-hover:text-[var(--lm-fg)]">
          {label}
        </span>
      )}
    </button>
  );
}
