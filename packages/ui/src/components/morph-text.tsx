"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

export interface MorphTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Words to cycle through. */
  words: string[];
  /** Milliseconds each word holds before dissolving. @default 2600 */
  interval?: number;
}

/**
 * Cycles words by dissolving: the outgoing word blurs and fades while the
 * incoming one sharpens out of the same blur with a subtle tracking widen,
 * the two overlapping for ~40% of the transition. A sr-only live region
 * announces each word. Under reduced motion the words simply crossfade.
 */
export function MorphText({
  words,
  interval = 2600,
  className,
  ...props
}: MorphTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  const current = words[index % Math.max(words.length, 1)] ?? "";

  React.useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [words.length, interval]);

  if (words.length === 0) return null;

  return (
    <span
      {...props}
      className={cn("relative inline-grid align-baseline", className)}
    >
      <span aria-live="polite" className="sr-only">
        {current}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          aria-hidden
          className="whitespace-pre [grid-area:1/1]"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, filter: "blur(6px)", letterSpacing: "-0.06em" }
          }
          animate={
            reduceMotion
              ? { opacity: 1, transition: { duration: durations.base } }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  letterSpacing: "0em",
                  transition: {
                    duration: durations.base,
                    ease: eases.out,
                    // Enter once the exit is ~60% done — a 40% overlap.
                    delay: durations.base * 0.6,
                  },
                }
          }
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: durations.base } }
              : {
                  opacity: 0,
                  filter: "blur(6px)",
                  transition: { duration: durations.base, ease: eases.inOut },
                }
          }
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
