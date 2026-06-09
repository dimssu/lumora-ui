"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface AuroraBlob {
  className: string;
  background: string;
  drift: { x: number[]; y: number[]; scale: number[] };
  /** Multiplier on `durations.ambient`. */
  tempo: number;
}

const BLOBS: AuroraBlob[] = [
  {
    className: "left-[-14%] top-[-22%] h-[38rem] w-[38rem] opacity-50",
    background: "radial-gradient(closest-side, var(--lm-glow), transparent 72%)",
    drift: { x: [0, 110, -50, 0], y: [0, 60, 130, 0], scale: [1, 1.12, 0.95, 1] },
    tempo: 10,
  },
  {
    className: "right-[-18%] top-[6%] h-[44rem] w-[44rem] opacity-40",
    background:
      "radial-gradient(closest-side, var(--lm-accent-soft), transparent 70%)",
    drift: { x: [0, -130, 40, 0], y: [0, 90, -60, 0], scale: [1, 0.94, 1.1, 1] },
    tempo: 13,
  },
  {
    className: "bottom-[-26%] left-[22%] h-[34rem] w-[34rem] opacity-35",
    background: "radial-gradient(closest-side, var(--lm-glow), transparent 68%)",
    drift: { x: [0, 80, -90, 0], y: [0, -70, 40, 0], scale: [1, 1.08, 0.96, 1] },
    tempo: 16,
  },
];

export interface AuroraBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Render the slow ambient drift. Forced off under reduced motion. @default true */
  animated?: boolean;
}

/**
 * Section wrapper bathed in three huge, heavily blurred lumen blobs that
 * drift on very slow loops behind the content, finished with a faint grain
 * and vignette so the glow reads quiet rather than loud. Under reduced
 * motion the blobs hold still; content is never obscured.
 */
export function AuroraBackground({
  animated = true,
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const drift = animated && !reduceMotion;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[var(--lm-bg)]",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className={cn("absolute rounded-full blur-3xl", blob.className)}
            style={{ background: blob.background }}
            animate={drift ? blob.drift : undefined}
            transition={{
              duration: durations.ambient * blob.tempo,
              repeat: Infinity,
              ease: eases.inOut,
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, var(--lm-bg) 125%)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
