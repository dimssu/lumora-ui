"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "../lib/cn";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialsProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading. @default "Loved in the quiet hours" */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /** Quotes, split evenly across the two rows. @default eight demo quotes */
  items?: Testimonial[];
  /** Marquee speed in percent of one loop per second. @default 1.6 */
  speed?: number;
}

const defaultItems: Testimonial[] = [
  {
    quote:
      "Our landing page went from a weekend chore to an afternoon of arranging blocks. The motion defaults are the real product.",
    name: "Nadia Okafor",
    role: "Head of Product, Driftworks",
  },
  {
    quote:
      "First library where I haven't had to argue with a spring. Everything settles exactly once, like it read our brand brief.",
    name: "Theo Lindqvist",
    role: "Founder, Quietloop",
  },
  {
    quote:
      "The token system survived our rebrand untouched. We changed six variables and the whole site followed.",
    name: "Mara Voss",
    role: "Design lead, Fernhollow",
  },
  {
    quote:
      "Reduced-motion support out of the box closed an accessibility ticket we'd been carrying for two quarters.",
    name: "Priya Raman",
    role: "Staff engineer, Solfield",
  },
  {
    quote:
      "I shipped a pricing page at 1am and it looked deliberate. That has never once happened to me before.",
    name: "Jonas Beck",
    role: "Indie maker, Emberline",
  },
  {
    quote:
      "The glow is doing a lot of quiet work. Clients keep asking what agency did our site. It was one import.",
    name: "Aiko Tanabe",
    role: "Creative director, Northbeam",
  },
  {
    quote:
      "We benchmarked the interactions at under a frame on a five-year-old laptop. Beautiful and boringly fast.",
    name: "Samuel Adeyemi",
    role: "Performance lead, Veldgrove",
  },
  {
    quote:
      "Onboarded two new engineers with zero docs reading. The props are shaped like the content. That's the whole trick.",
    name: "Ines Marchetti",
    role: "Engineering manager, Lanternworks",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex w-72 shrink-0 flex-col justify-between gap-4 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-5 sm:w-80">
      <blockquote className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        “{item.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-xs font-semibold text-[var(--lm-fg)]"
        >
          {initials(item.name)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-[var(--lm-fg)]">
            {item.name}
          </span>
          <span className="text-xs text-[var(--lm-fg-faint)]">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: Testimonial[];
  direction: 1 | -1;
  speed: number;
}) {
  const baseX = useMotionValue(direction === 1 ? -50 : 0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const pausedRef = React.useRef(false);

  useAnimationFrame((_, delta) => {
    if (pausedRef.current) return;
    baseX.set(wrap(-50, 0, baseX.get() + direction * speed * (delta / 1000)));
  });

  return (
    <div
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <motion.div style={{ x }} className="flex w-max gap-4 pr-4">
        {items.map((item) => (
          <QuoteCard key={item.name} item={item} />
        ))}
        <div aria-hidden className="flex gap-4 pr-4">
          {items.map((item) => (
            <QuoteCard key={`dup-${item.name}`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Two rows of quote cards drift past each other in opposite directions on a
 * seamless loop, pausing under the cursor with soft fades at either edge.
 * Under reduced motion the rows become a static wrapped grid.
 */
export function Testimonials({
  heading = "Loved in the quiet hours",
  subheading = "Notes from the teams shipping with Lumora — unedited, occasionally past midnight.",
  items = defaultItems,
  speed = 1.6,
  className,
  ...props
}: TestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const mid = Math.ceil(items.length / 2);
  const top = items.slice(0, mid);
  const bottom = items.slice(mid);

  return (
    <section
      className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}
      {...props}
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
            {subheading}
          </p>
        )}
      </div>

      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item) => (
            <QuoteCard key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <MarqueeRow items={top} direction={-1} speed={speed} />
          <MarqueeRow items={bottom} direction={1} speed={speed} />
        </div>
      )}
    </section>
  );
}
