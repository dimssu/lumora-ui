"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "../lib/cn";

export interface TextRevealProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The paragraph to reveal word by word. */
  text: string;
}

interface RevealWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function RevealWord({ word, progress, range }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const filter = useTransform(progress, range, ["blur(3px)", "blur(0px)"]);

  return (
    <span className="relative inline-block">
      <span className="text-[var(--lm-fg-faint)]">{word}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-[var(--lm-fg)]"
        style={{ opacity, filter }}
      >
        {word}
      </motion.span>
    </span>
  );
}

/**
 * Scroll-linked paragraph reveal: as the text crosses a band of the
 * viewport, each word brightens from faint to full foreground and sheds
 * a slight blur, so the sentence appears to come into focus as you read.
 * Give the wrapper (or its parent) vertical room so there is scroll to bind to.
 */
export function TextReveal({ text, className, ...props }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      {reduceMotion ? (
        <p className="text-[var(--lm-fg)]">{text}</p>
      ) : (
        <p className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
          {words.map((word, i) => (
            <RevealWord
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </p>
      )}
    </div>
  );
}
