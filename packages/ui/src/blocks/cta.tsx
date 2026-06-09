"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { eases } from "../lib/motion";
import { Button } from "../components/button";

export interface CtaBannerProps extends React.HTMLAttributes<HTMLElement> {
  /** Closing headline. @default "Give your product its glow" */
  headline?: string;
  /** Supporting line under the headline. */
  subcopy?: string;
  /** Label for the accent button. @default "Start building free" */
  ctaLabel?: string;
  /** Called when the button is pressed. */
  onCtaClick?: () => void;
}

/**
 * Full-width closing banner. A lumen radial glow breathes slowly behind the
 * headline — the one ambient light on the page — and holds still for users
 * who prefer reduced motion.
 */
export function CtaBanner({
  headline = "Give your product its glow",
  subcopy = "One install, a handful of blocks, and a landing page that feels hand-finished. The lumen is waiting.",
  ctaLabel = "Start building free",
  onCtaClick,
  className,
  ...props
}: CtaBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden border-y border-[var(--lm-border)] bg-[var(--lm-surface)]",
        className,
      )}
      {...props}
    >
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.45, 0.85, 0.45], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: eases.inOut }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--lm-glow), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-5xl">
          {headline}
        </h2>
        {subcopy && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance] sm:text-lg">
            {subcopy}
          </p>
        )}
        <Button
          variant="accent"
          size="lg"
          shimmer
          className="mt-9"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
