"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface HoverLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  /**
   * Underline behavior: "slide" wipes in from the left and continues out
   * to the right on leave, "center" grows from the middle, "draw" sketches
   * a thicker line with a spring overshoot. @default "slide"
   */
  variant?: "slide" | "center" | "draw";
  /** Append an arrow glyph that nudges up-right on hover. @default false */
  arrow?: boolean;
}

/**
 * An anchor with an animated lumen underline. "slide" is direction-aware
 * (in from the left, out to the right, as if the line keeps traveling),
 * "center" blooms outward, and "draw" overshoots past the text on a spring
 * before settling. The optional arrow nudges up-right with the hover.
 * Under reduced motion the underline simply fades.
 */
export const HoverLink = React.forwardRef<HTMLAnchorElement, HoverLinkProps>(
  (
    {
      variant = "slide",
      arrow = false,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = React.useState(false);

    const lineBase =
      "pointer-events-none absolute -bottom-0.5 left-0 right-0 block bg-[var(--lm-accent)]";

    let underline: React.ReactNode;
    if (reduceMotion) {
      underline = (
        <span
          aria-hidden
          className={cn(
            lineBase,
            "h-px transition-opacity duration-[var(--lm-duration-fast)]",
            hovered ? "opacity-100" : "opacity-0",
          )}
        />
      );
    } else if (variant === "draw") {
      underline = (
        <motion.span
          aria-hidden
          className={cn(lineBase, "h-[2px] origin-left rounded-[var(--lm-radius-full)]")}
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0 }}
          // Underdamped on purpose: the line overshoots past the text, then settles.
          transition={{ type: "spring", stiffness: 320, damping: 13, mass: 0.8 }}
        />
      );
    } else {
      underline = (
        <span
          aria-hidden
          className={cn(
            lineBase,
            "h-px scale-x-0 transition-transform duration-[var(--lm-duration)] ease-[var(--lm-ease-out)]",
            variant === "center"
              ? "origin-center"
              : hovered
                ? "origin-left"
                : "origin-right",
            hovered && "scale-x-100",
          )}
        />
      );
    }

    return (
      <a
        ref={ref}
        {...props}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          setHovered(false);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setHovered(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setHovered(false);
        }}
        className={cn(
          "relative inline-flex items-center gap-1 text-[var(--lm-fg)] outline-none",
          "rounded-[var(--lm-radius-sm)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
          className,
        )}
      >
        <span className="relative">
          {children}
          {underline}
        </span>
        {arrow && (
          <motion.span
            aria-hidden
            className="inline-flex"
            initial={false}
            animate={
              reduceMotion ? undefined : { x: hovered ? 2 : 0, y: hovered ? -2 : 0 }
            }
            transition={springs.snap}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
            </svg>
          </motion.span>
        )}
      </a>
    );
  },
);
HoverLink.displayName = "HoverLink";
