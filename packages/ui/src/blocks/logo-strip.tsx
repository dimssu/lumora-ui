"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { Marquee } from "../components/marquee";

export interface LogoWordmark {
  /** Company name rendered as a styled text logo. */
  name: string;
  /** Type treatment for this wordmark — weight, tracking, case, family. */
  className?: string;
}

export interface LogoStripProps extends React.HTMLAttributes<HTMLElement> {
  /** Muted line above the logos. @default "Trusted by teams who ship after dark" */
  label?: string;
  /** Wordmarks in display order. @default eight fictional companies */
  logos?: LogoWordmark[];
  /** Scroll the logos in a marquee; `false` renders a static grid. @default true */
  marquee?: boolean;
  /** Marquee travel speed in px per second. @default 36 */
  speed?: number;
  /** Soft-fade the marquee at both edges. @default true */
  fade?: boolean;
}

const defaultLogos: LogoWordmark[] = [
  { name: "Fernhollow", className: "font-serif text-xl italic" },
  { name: "VANTREMONT", className: "text-sm font-bold tracking-[0.3em]" },
  { name: "kilnware", className: "font-mono text-base tracking-tight" },
  { name: "Octave & Pine", className: "text-xl font-light tracking-wide" },
  { name: "BLUEWICK", className: "text-base font-extrabold tracking-widest" },
  { name: "Statice", className: "text-xl font-semibold tracking-tighter" },
  { name: "MERIDIAN FOUR", className: "text-xs font-medium tracking-[0.35em]" },
  { name: "Lampyric", className: "font-serif text-xl font-bold" },
];

/**
 * A "trusted by" belt of fictional text wordmarks. Each logo sits muted until
 * hovered, when it warms to full foreground. Scrolls as a marquee by default;
 * falls back to a static grid via `marquee={false}` or under reduced motion.
 */
export function LogoStrip({
  label = "Trusted by teams who ship after dark",
  logos = defaultLogos,
  marquee = true,
  speed = 36,
  fade = true,
  className,
  ...props
}: LogoStripProps) {
  const reduceMotion = useReducedMotion();
  const moving = marquee && !reduceMotion;

  const renderLogo = (logo: LogoWordmark) => (
    <span
      key={logo.name}
      className={cn(
        "cursor-default select-none whitespace-nowrap text-[var(--lm-fg-faint)]",
        "transition-colors duration-[var(--lm-duration)] hover:text-[var(--lm-fg)]",
        logo.className,
      )}
    >
      {logo.name}
    </span>
  );

  return (
    <section
      className={cn("mx-auto max-w-6xl px-4 py-14 sm:px-6", className)}
      {...props}
    >
      {label && (
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--lm-fg-faint)]">
          {label}
        </p>
      )}
      {moving ? (
        <Marquee speed={speed} fade={fade} pauseOnHover gap={56}>
          {logos.map(renderLogo)}
        </Marquee>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map(renderLogo)}
        </div>
      )}
    </section>
  );
}
