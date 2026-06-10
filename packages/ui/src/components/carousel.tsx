"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /** Slides visible at once; fractions work for peeking edges. @default 1 */
  itemsPerView?: number;
  /** Gap between slides in px. @default 16 */
  gap?: number;
  /** Hide the previous/next arrow buttons. @default true */
  showArrows?: boolean;
  /** Hide the dot indicators. @default true */
  showDots?: boolean;
  /** Called whenever the snapped index changes. */
  onIndexChange?: (index: number) => void;
}

function ArrowGlyph({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? <path d="M10 3L5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
    </svg>
  );
}

/**
 * Drag-to-snap carousel: the track follows your pointer with elastic
 * edges and settles on the nearest slide when released. Arrows, dots
 * (with a gliding active indicator) and keyboard arrows all steer it;
 * edges are honest — no looping.
 */
export function Carousel({
  children,
  itemsPerView = 1,
  gap = 16,
  showArrows = true,
  showDots = true,
  onIndexChange,
  className,
  ...props
}: CarouselProps) {
  const reduceMotion = useReducedMotion();
  const dotLayoutId = React.useId();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [step, setStep] = React.useState(0);

  const slides = React.Children.toArray(children);
  const maxIndex = Math.max(0, slides.length - Math.floor(itemsPerView));

  // Measure one slide-advance (slide width + gap) and keep it fresh.
  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => {
      const width = viewport.offsetWidth;
      setStep((width - gap * (itemsPerView - 1)) / itemsPerView + gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [itemsPerView, gap]);

  const goTo = React.useCallback(
    (next: number) => {
      const clamped = Math.min(maxIndex, Math.max(0, next));
      setIndex(clamped);
      onIndexChange?.(clamped);
    },
    [maxIndex, onIndexChange],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    }
  };

  const arrowClass = cn(
    "flex h-8 w-8 items-center justify-center rounded-[var(--lm-radius-full)] outline-none",
    "border border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-fg-muted)]",
    "transition-colors duration-200 hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
    "disabled:pointer-events-none disabled:opacity-40",
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "group/carousel relative outline-none",
        "rounded-[var(--lm-radius-lg)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
        className,
      )}
      {...props}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: -maxIndex * step, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            const flick =
              Math.abs(info.velocity.x) > 320
                ? info.velocity.x < 0
                  ? 1
                  : -1
                : 0;
            const dragged = step > 0 ? Math.round(-info.offset.x / step) : 0;
            goTo(index + (flick !== 0 ? Math.max(Math.abs(dragged), 1) * flick : dragged));
          }}
          animate={{ x: -index * step }}
          transition={reduceMotion ? { duration: 0 } : springs.glide}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className="min-w-0 shrink-0"
              style={{
                flexBasis: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`,
              }}
            >
              {slide}
            </div>
          ))}
        </motion.div>
      </div>

      {(showArrows || showDots) && (
        <div className="mt-4 flex items-center justify-between gap-4">
          {showDots ? (
            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative flex h-5 w-5 items-center justify-center rounded-full outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full bg-[var(--lm-border-strong)]",
                      "transition-colors duration-200",
                    )}
                  />
                  {i === index && (
                    <motion.span
                      layoutId={dotLayoutId}
                      transition={reduceMotion ? { duration: 0 } : springs.snap}
                      className="absolute inset-1 rounded-full bg-[var(--lm-accent)] shadow-[0_0_8px_var(--lm-glow)]"
                    />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}

          {showArrows && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                disabled={index === 0}
                onClick={() => goTo(index - 1)}
                className={arrowClass}
              >
                <ArrowGlyph direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                disabled={index === maxIndex}
                onClick={() => goTo(index + 1)}
                className={arrowClass}
              >
                <ArrowGlyph direction="right" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
