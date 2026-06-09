"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";

export interface GradientTextProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.span>, "children"> {
  children?: React.ReactNode;
  /** Seconds for one full gradient sweep. @default 6 */
  speed?: number;
}

/**
 * Inline text painted by a slow lumen gradient that sweeps left to right
 * on a seamless loop — accent into foreground and back. Under reduced
 * motion the gradient holds still, so the text stays fully legible.
 */
export function GradientText({
  speed = 6,
  className,
  children,
  ...props
}: GradientTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--lm-accent), var(--lm-fg), var(--lm-accent))",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
      }}
      animate={
        reduceMotion
          ? undefined
          : { backgroundPosition: ["0% 50%", "200% 50%"] }
      }
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
