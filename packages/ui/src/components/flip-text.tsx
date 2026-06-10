"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface FlipTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Words to cycle through. */
  words: string[];
  /** Milliseconds each word holds before flipping. @default 2600 */
  interval?: number;
}

const CHAR_STAGGER = 0.018;

/**
 * Cycles words by flipping them around the X axis: the current word's
 * characters tip away (rotateX → -90°) while the next word's tip in
 * (90° → 0°) under shared perspective, each character 18ms behind the
 * last, and the container's width glides between word widths. A sr-only
 * live region announces each word. Under reduced motion the words simply
 * crossfade.
 */
export function FlipText({
  words,
  interval = 2600,
  className,
  ...props
}: FlipTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  const current = words[index % Math.max(words.length, 1)] ?? "";

  React.useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Measure the incoming word (hidden twin) so the container can glide.
  React.useLayoutEffect(() => {
    const el = measureRef.current;
    if (el) setWidth(el.offsetWidth);
  }, [current]);

  if (words.length === 0) return null;

  return (
    <span
      {...props}
      className={cn("relative inline-flex align-baseline", className)}
      style={{ perspective: 500, ...props.style }}
    >
      <span aria-live="polite" className="sr-only">
        {current}
      </span>
      <span
        ref={measureRef}
        aria-hidden
        className="invisible absolute left-0 top-0 whitespace-pre"
      >
        {current}
      </span>

      <motion.span
        aria-hidden
        className="inline-flex whitespace-pre"
        animate={width == null ? undefined : { width }}
        transition={reduceMotion ? { duration: 0 } : springs.glide}
        style={width == null ? undefined : { width }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            className="inline-flex whitespace-pre"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from(current).map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={
                  reduceMotion ? { opacity: 0 } : { rotateX: 90, opacity: 0 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1, transition: { duration: durations.base } }
                    : {
                        rotateX: 0,
                        opacity: 1,
                        transition: { ...springs.drift, delay: i * CHAR_STAGGER },
                      }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: durations.base } }
                    : {
                        rotateX: -90,
                        opacity: 0,
                        transition: {
                          duration: durations.base,
                          ease: eases.inOut,
                          delay: i * CHAR_STAGGER,
                        },
                      }
                }
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
