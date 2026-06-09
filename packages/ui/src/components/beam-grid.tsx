"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations } from "../lib/motion";

/** Deterministic 0..1 noise so SSR and client render the same beams. */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export interface BeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid cell size in px. @default 56 */
  density?: number;
  /** Number of traveling beams. @default 3 */
  beamCount?: number;
}

/**
 * A faint line grid where occasional beams of lumen travel along random
 * grid lines — horizontal beams slide right, vertical beams fall — on
 * long, staggered loops. Under reduced motion the beams are removed and
 * the quiet grid remains.
 */
export function BeamGrid({
  density = 56,
  beamCount = 3,
  className,
  children,
  ...props
}: BeamGridProps) {
  const reduceMotion = useReducedMotion();

  const beams = React.useMemo(
    () =>
      Array.from({ length: beamCount }, (_, i) => {
        const horizontal = i % 2 === 0;
        const line = 1 + Math.floor(pseudoRandom(i + 1) * 10);
        return {
          horizontal,
          offset: line * density - 1,
          duration: durations.ambient * (2 + pseudoRandom(i + 7) * 2),
          delay: i * 1.7 + pseudoRandom(i + 13) * 2,
          repeatDelay: durations.ambient * (1 + pseudoRandom(i + 29) * 2),
        };
      }),
    [beamCount, density],
  );

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--lm-border) 1px, transparent 1px), linear-gradient(90deg, var(--lm-border) 1px, transparent 1px)",
            backgroundSize: `${density}px ${density}px`,
          }}
        />
        {!reduceMotion &&
          beams.map((beam, i) =>
            beam.horizontal ? (
              <motion.span
                key={i}
                className="absolute left-0 h-px w-1/5"
                style={{
                  top: beam.offset,
                  background:
                    "linear-gradient(90deg, transparent, var(--lm-accent), transparent)",
                }}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: ["-100%", "500%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: beam.duration,
                  delay: beam.delay,
                  repeat: Infinity,
                  repeatDelay: beam.repeatDelay,
                  ease: "linear",
                }}
              />
            ) : (
              <motion.span
                key={i}
                className="absolute top-0 h-1/5 w-px"
                style={{
                  left: beam.offset,
                  background:
                    "linear-gradient(180deg, transparent, var(--lm-accent), transparent)",
                }}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: ["-100%", "500%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: beam.duration,
                  delay: beam.delay,
                  repeat: Infinity,
                  repeatDelay: beam.repeatDelay,
                  ease: "linear",
                }}
              />
            ),
          )}
      </div>
      {children}
    </div>
  );
}
