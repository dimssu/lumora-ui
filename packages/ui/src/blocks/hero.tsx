"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";
import { Button } from "../components/button";
import {
  AnimatedTooltip,
  type AnimatedTooltipItem,
} from "../components/animated-tooltip";

export interface HeroCta {
  label: string;
  onClick?: () => void;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Small pill above the headline. @default "Now in public beta" */
  eyebrow?: string;
  /** Headline; each word staggers up and clears from a blur on mount. */
  headline?: string;
  /** Supporting copy under the headline. */
  subcopy?: string;
  /** Accent call to action. @default "Start building" */
  primaryCta?: HeroCta;
  /** Quiet secondary action. @default "Browse the gallery" */
  secondaryCta?: HeroCta;
  /** Avatar row shown with the trust line. Pass `[]` to hide. */
  avatars?: AnimatedTooltipItem[];
  /** Trust line next to the avatars. @default "Trusted by 4,200+ product teams" */
  trustedBy?: string;
  /** Optional media/preview panel that drifts up into place below the copy. */
  media?: React.ReactNode;
}

const defaultAvatars: AnimatedTooltipItem[] = [
  { id: 1, name: "Mara Voss", hint: "Design lead, Fernhollow" },
  { id: 2, name: "Theo Lindqvist", hint: "Founder, Driftworks" },
  { id: 3, name: "Priya Raman", hint: "Staff engineer, Solfield" },
  { id: 4, name: "Jonas Beck", hint: "Product, Quietloop" },
  { id: 5, name: "Aiko Tanabe", hint: "Frontend, Emberline" },
];

/**
 * Centered landing hero. The headline's words rise and sharpen out of a soft
 * blur one by one, the trust row settles in last, and an optional media panel
 * drifts up into place beneath the copy.
 */
export function Hero({
  eyebrow = "Now in public beta",
  headline = "Interfaces that glow, motion that feels physical",
  subcopy = "Lumora is a component library tuned like an instrument — quiet surfaces, one glowing accent, and springs that settle exactly once. Compose a landing page before your coffee cools.",
  primaryCta = { label: "Start building" },
  secondaryCta = { label: "Browse the gallery" },
  avatars = defaultAvatars,
  trustedBy = "Trusted by 4,200+ product teams",
  media,
  className,
  ...props
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const words = headline.split(" ");

  return (
    <section
      className={cn(
        "relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-32",
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <motion.span
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.drift}
          className="mb-6 inline-flex items-center gap-2 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-3 py-1 text-xs font-medium text-[var(--lm-fg-muted)]"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[var(--lm-accent)]"
          />
          {eyebrow}
        </motion.span>
      )}

      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-6xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...springs.drift, delay: 0.08 + i * 0.06 }}
            className="inline-block will-change-transform"
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </h1>

      {subcopy && (
        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.drift, delay: 0.35 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance] sm:text-lg"
        >
          {subcopy}
        </motion.p>
      )}

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.drift, delay: 0.45 }}
        className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
      >
        <Button
          variant="accent"
          size="lg"
          shimmer
          className="w-full sm:w-auto"
          onClick={primaryCta.onClick}
        >
          {primaryCta.label}
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="w-full sm:w-auto"
          onClick={secondaryCta.onClick}
        >
          {secondaryCta.label}
        </Button>
      </motion.div>

      {avatars.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springs.drift, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <AnimatedTooltip items={avatars} avatarSize={36} className="pr-3" />
          <p className="text-sm text-[var(--lm-fg-faint)]">{trustedBy}</p>
        </motion.div>
      )}

      {media && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.glide, delay: 0.55 }}
          className="mt-16 w-full"
        >
          {media}
        </motion.div>
      )}
    </section>
  );
}
