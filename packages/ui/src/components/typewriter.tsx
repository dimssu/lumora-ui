"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { eases } from "../lib/motion";

export interface TypewriterProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Words to cycle through. */
  words: string[];
  /** Milliseconds per character while typing. @default 70 */
  typeSpeed?: number;
  /** Milliseconds per character while deleting. @default 42 */
  deleteSpeed?: number;
  /** Pause on a completed word before deleting. @default 1600 */
  holdMs?: number;
  /** Start over after the last word. @default true */
  loop?: boolean;
}

/**
 * Types each word character by character beside a blinking caret, holds,
 * deletes, and moves to the next. Under reduced motion the first word is
 * shown statically with a steady caret.
 */
export function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 42,
  holdMs = 1600,
  loop = true,
  className,
  ...props
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduceMotion || words.length === 0) return;
    const word = words[wordIndex % words.length] ?? "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && charCount < word.length) {
      timer = setTimeout(() => setCharCount((c) => c + 1), typeSpeed);
    } else if (!deleting) {
      // Word complete: hold, then delete — unless this is the final stop.
      if (loop || wordIndex < words.length - 1) {
        timer = setTimeout(() => setDeleting(true), holdMs);
      }
    } else if (charCount > 0) {
      timer = setTimeout(() => setCharCount((c) => c - 1), deleteSpeed);
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [
    words,
    wordIndex,
    charCount,
    deleting,
    typeSpeed,
    deleteSpeed,
    holdMs,
    loop,
    reduceMotion,
  ]);

  if (words.length === 0) return null;

  const firstWord = words[0] ?? "";
  const display = reduceMotion
    ? firstWord
    : (words[wordIndex % words.length] ?? "").slice(0, charCount);

  return (
    <span
      className={cn("inline-flex items-baseline text-[var(--lm-fg)]", className)}
      {...props}
    >
      <span className="sr-only">{firstWord}</span>
      <span aria-hidden>{display}</span>
      <motion.span
        aria-hidden
        className="ml-[2px] inline-block h-[1em] w-[2px] self-center bg-[var(--lm-accent)]"
        animate={reduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: eases.inOut }}
      />
    </span>
  );
}
