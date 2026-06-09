"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface NumberTickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Final value to land on. */
  value: number;
  /** Starting value. @default 0 */
  from?: number;
  /** Fraction digits to render while ticking. @default 0 */
  decimals?: number;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  /** Rendered after the number, e.g. "%". */
  suffix?: string;
}

/**
 * A number that counts up on a spring once it scrolls into view, settling
 * on `value`. Digits stay steady via tabular figures. With reduced motion
 * the final value is shown immediately.
 */
export function NumberTicker({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  ...props
}: NumberTickerProps) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  const [display, setDisplay] = React.useState(() => formatter.format(from));

  React.useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(formatter.format(value));
      return;
    }
    const controls = animate(from, value, {
      ...springs.glide,
      onUpdate: (latest) => setDisplay(formatter.format(latest)),
    });
    return () => controls.stop();
  }, [inView, value, from, reduceMotion, formatter]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums text-[var(--lm-fg)]", className)}
      {...props}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
