"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Loader style. @default "orbit" */
  variant?: "orbit" | "pulse" | "bars";
  /** Overall footprint. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label announced to screen readers. @default "Loading" */
  label?: string;
}

const SIZES = { sm: 16, md: 24, lg: 36 } as const;

/**
 * The brand loader. "orbit" sends a lumen comet arc around a quiet ring,
 * "pulse" breathes a single lumen dot, "bars" waves three bars in
 * sequence. Announced via role="status" with sr-only text. Under reduced
 * motion every variant settles into a slow opacity pulse.
 */
export function Spinner({
  variant = "orbit",
  size = "md",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  const reduceMotion = useReducedMotion();
  const px = SIZES[size];
  const ring = Math.max(2, Math.round(px / 12));

  const calmPulse = {
    animate: { opacity: [0.4, 1, 0.4] },
    transition: { duration: 2.4, repeat: Infinity, ease: eases.inOut },
  };

  let visual: React.ReactNode;

  if (variant === "orbit") {
    visual = (
      <span
        aria-hidden
        className="relative block"
        style={{ width: px, height: px }}
      >
        <span
          className="absolute inset-0 rounded-full border border-[var(--lm-border)]"
          style={{ borderWidth: ring }}
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            padding: ring,
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, var(--lm-accent) 360deg)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
          animate={reduceMotion ? calmPulse.animate : { rotate: 360 }}
          transition={
            reduceMotion
              ? calmPulse.transition
              : { duration: durations.ambient, repeat: Infinity, ease: "linear" }
          }
        />
      </span>
    );
  } else if (variant === "pulse") {
    visual = (
      <motion.span
        aria-hidden
        className="block rounded-full bg-[var(--lm-accent)] shadow-[0_0_12px_var(--lm-glow)]"
        style={{ width: px * 0.55, height: px * 0.55 }}
        animate={
          reduceMotion
            ? calmPulse.animate
            : { scale: [1, 1.3, 1], opacity: [0.55, 1, 0.55] }
        }
        transition={
          reduceMotion
            ? calmPulse.transition
            : { duration: durations.ambient, repeat: Infinity, ease: eases.inOut }
        }
      />
    );
  } else {
    visual = (
      <span
        aria-hidden
        className="flex items-end justify-center"
        style={{ height: px, gap: Math.max(2, px / 8) }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block origin-bottom rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)]"
            style={{ width: Math.max(2, px / 6), height: px }}
            animate={
              reduceMotion ? calmPulse.animate : { scaleY: [0.4, 1, 0.4] }
            }
            transition={
              reduceMotion
                ? calmPulse.transition
                : {
                    duration: durations.ambient,
                    repeat: Infinity,
                    ease: eases.inOut,
                    delay: i * 0.18,
                  }
            }
          />
        ))}
      </span>
    );
  }

  return (
    <div
      role="status"
      {...props}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {visual}
      <span className="sr-only">{label}</span>
    </div>
  );
}
