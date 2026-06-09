"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface ScrollProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  /** Edge of the viewport the bar hugs. @default "top" */
  position?: "top" | "bottom";
}

/**
 * A fixed 2px accent bar that fills as the page scrolls, smoothed by a
 * spring so the fill glides rather than jitters. With reduced motion the
 * bar tracks scroll position directly, without the spring.
 */
export function ScrollProgress({
  position = "top",
  className,
  ...props
}: ScrollProgressProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { stiffness, damping, mass } = springs.glide;
  const smoothed = useSpring(scrollYProgress, { stiffness, damping, mass });

  return (
    <motion.div
      aria-hidden
      className={cn(
        "fixed inset-x-0 z-50 h-[2px] origin-left",
        "bg-[linear-gradient(90deg,var(--lm-accent-soft),var(--lm-accent))]",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      {...props}
    />
  );
}
