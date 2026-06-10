"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";

export interface GlitchTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The text to glitch. */
  children: string;
  /** Glitch on hover, or fire automatically every ~3s. @default "hover" */
  trigger?: "hover" | "loop";
  /** 0–1 scale on the offset distance of the glitch copies. @default 0.6 */
  intensity?: number;
}

const GLITCH_MS = 350;
const LOOP_MS = 3000;

/**
 * Text that rests perfectly clean, then glitches for ~350ms when hovered
 * (or on a loop): two aria-hidden copies tinted lumen and dusk flicker in
 * with small horizontal offsets and sliced clip-paths, then everything
 * settles. `intensity` scales how far the copies stray. Under reduced
 * motion the text never glitches.
 */
export function GlitchText({
  children,
  trigger = "hover",
  intensity = 0.6,
  className,
  ...props
}: GlitchTextProps) {
  const reduceMotion = useReducedMotion();
  const [glitching, setGlitching] = React.useState(false);
  const settleTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const burst = React.useCallback(() => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    setGlitching(true);
    settleTimer.current = setTimeout(() => setGlitching(false), GLITCH_MS);
  }, []);

  React.useEffect(() => {
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  React.useEffect(() => {
    if (trigger !== "loop" || reduceMotion) return;
    const interval = setInterval(burst, LOOP_MS);
    return () => clearInterval(interval);
  }, [trigger, reduceMotion, burst]);

  const amp = Math.max(0, Math.min(1, intensity)) * 7;
  const active = glitching && !reduceMotion;

  const copyTransition = {
    duration: GLITCH_MS / 1000,
    times: [0, 0.25, 0.7, 1],
    ease: "linear" as const,
  };
  const settled = { opacity: 0, x: 0 };

  return (
    <span
      {...props}
      className={cn("relative inline-block", className)}
      onMouseEnter={(e) => {
        props.onMouseEnter?.(e);
        if (trigger === "hover" && !reduceMotion) burst();
      }}
    >
      <span className="relative z-10">{children}</span>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 text-[var(--lm-accent)]"
        initial={false}
        animate={
          active
            ? {
                opacity: [0, 1, 1, 0],
                x: [0, -amp, amp * 0.6, 0],
                clipPath: [
                  "inset(0 0 100% 0)",
                  "inset(8% 0 58% 0)",
                  "inset(64% 0 6% 0)",
                  "inset(0 0 100% 0)",
                ],
              }
            : settled
        }
        transition={active ? copyTransition : { duration: 0.1 }}
      >
        {children}
      </motion.span>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 text-[var(--lm-accent-2)]"
        initial={false}
        animate={
          active
            ? {
                opacity: [0, 1, 1, 0],
                x: [0, amp, -amp * 0.8, 0],
                clipPath: [
                  "inset(100% 0 0 0)",
                  "inset(38% 0 34% 0)",
                  "inset(12% 0 74% 0)",
                  "inset(100% 0 0 0)",
                ],
              }
            : settled
        }
        transition={active ? copyTransition : { duration: 0.1 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
