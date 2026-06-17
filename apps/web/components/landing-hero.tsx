"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Button,
  SegmentedControl,
  Slider,
  Switch,
  springs,
} from "@lumora/ui";

export interface LandingHeroProps {
  /** Primary CTA — open the component gallery. */
  onBrowse?: () => void;
  /** Secondary CTA — open the docs. */
  onDocs?: () => void;
}

/**
 * Split hero: editorial headline on the left, an interactive "lumen console"
 * on the right. The console is built from real Lumora components — a segmented
 * spring picker, a lumen slider, and a glow switch — that drive a live puck so
 * a first-time visitor literally feels the motion language. Reduced motion
 * keeps every control working; only the fling becomes an instant cut.
 */
export function LandingHero({ onBrowse, onDocs }: LandingHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* ── LEFT: text ───────────────────────────────────────────── */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] py-1.5 pl-2.5 pr-3.5 text-xs font-medium text-[var(--lm-fg-muted)]">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)]"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeOut",
                  }}
                />
              )}
              <span className="relative h-1.5 w-1.5 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)]" />
            </span>
            MIT-licensed · open source
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-5xl leading-[0.98] tracking-[-0.02em] text-[var(--lm-fg)] sm:text-6xl xl:text-7xl">
            Motion-first
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--lm-accent) 0%, var(--lm-fg-muted) 78%)",
              }}
            >
              interactions.
            </span>
          </h1>

          <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-[var(--lm-fg-muted)] sm:text-[15px]">
            // Quiet surfaces, one champagne accent, three springs.
            <br />
            Copy the source, keep the code, ship the glow.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="solid" size="lg" onClick={onBrowse} shimmer>
              Explore components
            </Button>
            <Button variant="outline" size="lg" onClick={onDocs}>
              Read the docs
            </Button>
            <a
              href="https://github.com/dimssu/lumora-ui"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--lm-radius)] border border-[var(--lm-border-strong)] px-6 text-base font-medium text-[var(--lm-fg)] outline-none transition-colors duration-200 hover:bg-[var(--lm-surface-2)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]"
            >
              <GitHubGlyph />
              GitHub
            </a>
          </div>
        </div>

        {/* ── RIGHT: the interactive lumen console ──────────────────── */}
        <LumenConsole reduceMotion={!!reduceMotion} />
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────
   The signature visual: a live console you actually operate.
   ─────────────────────────────────────────────────────────────────── */

type SpringName = "snap" | "drift" | "glide";

const SPRING_ITEMS = [
  { value: "snap", label: "snap" },
  { value: "drift", label: "drift" },
  { value: "glide", label: "glide" },
];

const SPRING_BLURB: Record<SpringName, string> = {
  snap: "fast settle, no overshoot",
  drift: "one soft breath in",
  glide: "long, weighty travel",
};

function LumenConsole({ reduceMotion }: { reduceMotion: boolean }) {
  const [active, setActive] = React.useState<SpringName>("drift");
  const [lumen, setLumen] = React.useState(72);
  const [glow, setGlow] = React.useState(true);
  const [stop, setStop] = React.useState(0);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = React.useState(0);

  React.useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const measure = () => setTrackW(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The puck flings between the two rail ends so the spring is legible.
  const puckW = 132;
  const pad = 14;
  const targets =
    trackW > puckW + pad * 2
      ? [pad, trackW - puckW - pad]
      : [pad, pad];
  const x = targets[stop] ?? pad;

  const fling = React.useCallback(() => setStop((s) => (s === 0 ? 1 : 0)), []);
  const pickSpring = React.useCallback((v: string) => {
    setActive(v as SpringName);
    setStop((s) => (s === 0 ? 1 : 0));
  }, []);

  // Glow intensity 0..1 from the slider, gated by the switch.
  const g = glow ? lumen / 100 : 0;

  return (
    <div className="relative mx-auto w-full max-w-[480px] select-none">
      <CornerFrame />

      <div className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-5 shadow-[var(--lm-shadow)] sm:p-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--lm-fg-faint)]">
            Lumen console
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--lm-fg-muted)]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-[var(--lm-radius-full)]"
              style={{
                background: "var(--lm-positive)",
                boxShadow: "0 0 8px var(--lm-positive)",
              }}
            />
            live
          </span>
        </div>

        {/* ── stage: the puck flings across the rail ─────────────── */}
        <div
          ref={trackRef}
          className="relative mt-4 h-[168px] w-full overflow-hidden rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-bg)]"
        >
          {/* faint grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(var(--lm-border) 1px, transparent 1px), linear-gradient(90deg, var(--lm-border) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(120% 120% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
          {/* dashed baseline + the two rail stops */}
          <div
            aria-hidden
            className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t border-dashed border-[var(--lm-border-strong)]"
          />
          {[0, 1].map((i) => (
            <span
              key={i}
              aria-hidden
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-[var(--lm-radius-full)] border border-[var(--lm-border-strong)]"
              style={{ left: (targets[i] ?? pad) + puckW / 2 - 4 }}
            />
          ))}

          {/* the lumen pool, riding under the puck */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-[120px] w-[160px] -translate-y-1/2 rounded-full"
            style={{
              left: x - 14,
              backgroundImage:
                "radial-gradient(circle, var(--lm-glow) 0%, transparent 70%)",
              opacity: g * 0.9,
            }}
            animate={{ left: x - 14 }}
            transition={reduceMotion ? { duration: 0 } : springs[active]}
          />

          {/* the puck — a faux component card carrying the live glow */}
          <motion.button
            type="button"
            onClick={fling}
            aria-label={`Fling the puck with the ${active} spring`}
            className="absolute top-1/2 -translate-y-1/2 rounded-[var(--lm-radius)] border bg-[var(--lm-surface-2)] px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]"
            style={{
              width: puckW,
              borderColor:
                g > 0
                  ? "color-mix(in oklab, var(--lm-accent) 55%, var(--lm-border))"
                  : "var(--lm-border-strong)",
              boxShadow:
                g > 0
                  ? `0 0 ${14 + 46 * g}px color-mix(in oklab, var(--lm-glow) ${Math.round(
                      55 + 45 * g,
                    )}%, transparent)`
                  : "var(--lm-shadow-sm)",
            }}
            animate={{ left: x }}
            transition={reduceMotion ? { duration: 0 } : springs[active]}
          >
            <span className="block font-mono text-[10px] text-[var(--lm-fg-muted)]">
              springs.{active}
            </span>
            <span
              className="mt-2 block h-1.5 w-full rounded-[var(--lm-radius-full)]"
              style={{
                backgroundImage:
                  g > 0
                    ? `linear-gradient(90deg, var(--lm-accent), color-mix(in oklab, var(--lm-accent) ${Math.round(
                        20 + 60 * g,
                      )}%, var(--lm-fg-faint)))`
                    : "linear-gradient(var(--lm-fg-faint), var(--lm-fg-faint))",
              }}
            />
          </motion.button>
        </div>

        {/* one-line blurb on the active spring */}
        <p className="mt-3 font-mono text-[11px] text-[var(--lm-fg-faint)]">
          {`// ${active} — ${SPRING_BLURB[active]}`}
        </p>

        {/* ── controls: real components ──────────────────────────── */}
        <div className="mt-4 flex flex-col gap-4">
          <SegmentedControl
            items={SPRING_ITEMS}
            value={active}
            onValueChange={pickSpring}
            size="sm"
            aria-label="Pick a spring, then watch the puck fling with it"
            className="w-full justify-between"
          />

          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-3">
              <span className="font-mono text-[11px] text-[var(--lm-fg-muted)]">
                Lumen
              </span>
              <Slider
                value={lumen}
                onValueChange={setLumen}
                bubble
                formatValue={(v) => `${v}%`}
                aria-label="Lumen intensity"
                className="flex-1"
              />
            </div>
            <span className="inline-flex items-center gap-2">
              <span className="font-mono text-[11px] text-[var(--lm-fg-muted)]">
                Glow
              </span>
              <Switch
                checked={glow}
                onCheckedChange={setGlow}
                aria-label="Toggle the lumen glow"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Faint technical corner brackets framing the visual like a spec drawing. */
function CornerFrame() {
  const corner =
    "pointer-events-none absolute h-6 w-6 border-[var(--lm-border-strong)]";
  return (
    <div aria-hidden className="absolute -inset-3 sm:-inset-4">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

function GitHubGlyph() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
