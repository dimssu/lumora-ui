"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge, SpotlightCard, Skeleton, springs } from "@lumora/ui";

export interface LandingBentoProps {
  /** Invoked by the quiet "Browse all components" link at the foot of the section. */
  onBrowse?: () => void;
}

/* Reveal preset shared by every card and visual — one gentle drift on enter. */
const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
} as const;

/**
 * "Why Lumora?" — a centered intro over an asymmetric bento of four feature
 * cards, each anchored by a bespoke visual. Exactly one element glows (the live
 * SpotlightCard in card 1); every other visual stays neutral. Ambient float and
 * reveals stop under reduced motion.
 */
export function LandingBento({ onBrowse }: LandingBentoProps) {
  const reduceMotion = useReducedMotion();
  const viewport = { once: true, amount: 0.3 } as const;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Intro */}
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={viewport}
        variants={reveal}
        transition={springs.drift}
      >
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--lm-fg-faint)]">
          Why Lumora
        </p>
        <h2 className="mt-4 font-display text-3xl tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-5xl">
          Built to feel finished.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--lm-fg-muted)] sm:text-base">
          Motion-first interaction patterns you won&rsquo;t pull out of a
          templated kit — every surface composed, every gesture deliberate.
        </p>
      </motion.div>

      {/* Bento — asymmetric 2-col on lg */}
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Card 1 — tall, the section's one lumen focal element */}
        <BentoCard
          className="lg:row-span-2"
          reduceMotion={reduceMotion}
          viewport={viewport}
          title="Components you won&rsquo;t find templated"
          body="Live, cursor-aware surfaces with motion baked into the primitive — not bolted on after."
        >
          <CardInteractive />
        </BentoCard>

        {/* Card 2 — wide framework cluster */}
        <BentoCard
          reduceMotion={reduceMotion}
          viewport={viewport}
          title="Built with modern frameworks"
          body="A stack you already reach for, wired together so the pieces just click."
        >
          <CardFrameworks reduceMotion={reduceMotion} />
        </BentoCard>

        {/* Card 3 — node graph */}
        <BentoCard
          reduceMotion={reduceMotion}
          viewport={viewport}
          title="Own the code, keep the glow"
          body="Every component is yours as source — fork it, theme it, ship it."
        >
          <CardNodeGraph reduceMotion={reduceMotion} viewport={viewport} />
        </BentoCard>

        {/* Card 4 — skeleton wireframe, spans both columns to close the grid */}
        <BentoCard
          className="lg:col-span-2"
          reduceMotion={reduceMotion}
          viewport={viewport}
          title="Ship landing pages faster"
          body="Compose pre-built blocks and ship a polished page in an afternoon."
        >
          <CardWireframe />
        </BentoCard>
      </div>

      {onBrowse && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onBrowse}
            className="group inline-flex items-center gap-1.5 rounded-[var(--lm-radius-sm)] font-mono text-xs uppercase tracking-[0.18em] text-[var(--lm-fg-muted)] outline-none transition-colors hover:text-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]"
          >
            Browse all components
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

/* ── Card shell ──────────────────────────────────────────────────────── */

interface BentoCardProps {
  title: string;
  body: string;
  className?: string;
  reduceMotion: boolean | null;
  viewport: { once: boolean; amount: number };
  children: React.ReactNode;
}

function BentoCard({
  title,
  body,
  className,
  reduceMotion,
  viewport,
  children,
}: BentoCardProps) {
  return (
    <motion.article
      className={[
        "flex flex-col rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6 sm:p-8",
        className ?? "",
      ].join(" ")}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      variants={reveal}
      transition={springs.drift}
    >
      <h3
        className="font-display text-xl tracking-tight text-[var(--lm-fg)] sm:text-2xl"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="mt-2 max-w-md text-sm leading-relaxed text-[var(--lm-fg-muted)]"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="mt-6 flex flex-1 items-center">{children}</div>
    </motion.article>
  );
}

/* ── Card 1 visual — live Interactive Core (the one lumen) ───────────── */

function CardInteractive() {
  return (
    <SpotlightCard
      radius={220}
      className="w-full bg-[var(--lm-surface-2)] p-6"
    >
      <div className="flex items-center justify-between">
        <Badge variant="accent" size="sm" pulse>
          LIVE
        </Badge>
        <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--lm-fg-faint)]">
          v1.0
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="h-2.5 w-3/4 rounded-[var(--lm-radius-full)] bg-[var(--lm-border-strong)]" />
        <div className="h-2.5 w-1/2 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
        <div className="h-2.5 w-2/3 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[var(--lm-border)] pt-4">
        <span className="text-sm font-medium text-[var(--lm-fg)]">
          Interactive Core
        </span>
        <span className="font-mono text-[11px] text-[var(--lm-fg-muted)]">
          Hover to expand &rarr;
        </span>
      </div>
    </SpotlightCard>
  );
}

/* ── Card 2 visual — isometric framework tiles (real, recognizable logos) ─ */

interface IsoTile {
  label: string;
  /** Diamond layout offsets, in px, from cluster center. */
  x: number;
  y: number;
  /** Brand color for the glyph — the one place third-party marks appear. */
  color: string;
  glyph: React.ReactNode;
}

function CardFrameworks({ reduceMotion }: { reduceMotion: boolean | null }) {
  // Clean 1-2-2 diamond, no overlap; each tile carries its real brand mark.
  const tiles: IsoTile[] = [
    { label: "Next.js", x: 0, y: -74, color: "var(--lm-fg)", glyph: <GlyphNext /> },
    { label: "React", x: -96, y: -6, color: "#61DAFB", glyph: <GlyphReact /> },
    { label: "TypeScript", x: 96, y: -6, color: "#4d8fd6", glyph: <GlyphTS /> },
    { label: "Tailwind", x: -52, y: 70, color: "#38BDF8", glyph: <GlyphTailwind /> },
    { label: "Motion", x: 52, y: 70, color: "var(--lm-fg)", glyph: <GlyphMotion /> },
  ];

  return (
    <div
      className="relative grid h-[260px] w-full place-items-center"
      aria-hidden
    >
      <div className="relative h-0 w-0 [transform:rotateX(54deg)_rotateZ(45deg)] [transform-style:preserve-3d]">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            title={tile.label}
            className="absolute grid h-16 w-16 place-items-center rounded-[var(--lm-radius)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)] shadow-[var(--lm-shadow)] ring-1 ring-inset ring-white/[0.04]"
            style={{
              left: tile.x,
              top: tile.y,
              marginLeft: -32,
              marginTop: -32,
              color: tile.color,
            }}
            animate={reduceMotion ? undefined : { translateZ: [0, 14, 0] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.45,
                  }
            }
          >
            {/* Counter-rotate the glyph so it reads flat on the iso tile. */}
            <span className="[transform:rotateZ(-45deg)_rotateX(-54deg)]">
              {tile.glyph}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 3 visual — real source files flowing into your repo ─────────── */

function CardNodeGraph({
  reduceMotion,
  viewport,
}: {
  reduceMotion: boolean | null;
  viewport: { once: boolean; amount: number };
}) {
  const cx = 180;
  const cy = 142;
  // Real Lumora source files the CLI drops into the consumer's repo.
  const files = [
    { x: 180, y: 38, name: "button.tsx" },
    { x: 66, y: 104, name: "tooltip.tsx" },
    { x: 294, y: 104, name: "slider.tsx" },
    { x: 104, y: 236, name: "dialog.tsx" },
    { x: 256, y: 236, name: "dock.tsx" },
  ];

  return (
    <svg
      viewBox="0 0 360 280"
      className="h-[264px] w-full"
      role="img"
      aria-label="Five Lumora source files — button, tooltip, slider, dialog, dock — flowing as code into your repository"
    >
      {/* static connector lines — faint, neutral */}
      <g stroke="var(--lm-border-strong)" strokeWidth={1} fill="none">
        {files.map((f, i) => (
          <line key={i} x1={f.x} y1={f.y} x2={cx} y2={cy} />
        ))}
      </g>

      {/* flow toward the repo — neutral dashes drifting inward (off when reduced) */}
      {!reduceMotion && (
        <g
          stroke="var(--lm-fg-muted)"
          strokeWidth={1}
          fill="none"
          opacity={0.4}
          strokeDasharray="2 10"
          strokeLinecap="round"
        >
          {files.map((f, i) => (
            <motion.line
              key={i}
              x1={f.x}
              y1={f.y}
              x2={cx}
              y2={cy}
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.18,
              }}
            />
          ))}
        </g>
      )}

      {/* filename nodes */}
      {files.map((f, i) => (
        <motion.g
          key={i}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ ...springs.drift, delay: i * 0.06 }}
          style={{ transformOrigin: `${f.x}px ${f.y}px` }}
        >
          <rect
            x={f.x - 52}
            y={f.y - 15}
            width={104}
            height={30}
            rx={8}
            fill="var(--lm-surface-2)"
            stroke="var(--lm-border-strong)"
            strokeWidth={1}
          />
          <text
            x={f.x}
            y={f.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize={11.5}
            fill="var(--lm-fg-muted)"
          >
            {f.name}
          </text>
        </motion.g>
      ))}

      {/* central repo node — a folder carrying the lone, restrained glow */}
      <g>
        <circle cx={cx} cy={cy} r={34} fill="var(--lm-accent-soft)" />
        <circle
          cx={cx}
          cy={cy}
          r={23}
          fill="var(--lm-surface)"
          stroke="var(--lm-accent)"
          strokeWidth={1.5}
        />
        <path
          d="M171 150 V137 a1 1 0 0 1 1-1 H176 l2 2 H188 a1 1 0 0 1 1 1 V150 a1 1 0 0 1-1 1 H172 a1 1 0 0 1-1-1 Z"
          fill="none"
          stroke="var(--lm-accent)"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <text
          x={cx}
          y={cy + 44}
          textAnchor="middle"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize={11}
          fill="var(--lm-fg-faint)"
        >
          your repo
        </text>
      </g>
    </svg>
  );
}

/* ── Card 4 visual — skeleton wireframe in a browser frame (neutral) ──── */

function CardWireframe() {
  return (
    <div className="w-full overflow-hidden rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)]">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-[var(--lm-border)] px-4 py-2.5">
        <span className="h-2 w-2 rounded-[var(--lm-radius-full)] bg-[var(--lm-border-strong)]" />
        <span className="h-2 w-2 rounded-[var(--lm-radius-full)] bg-[var(--lm-border-strong)]" />
        <span className="h-2 w-2 rounded-[var(--lm-radius-full)] bg-[var(--lm-border-strong)]" />
        <span className="ml-3 h-3 w-40 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
      </div>

      {/* wireframe body — dashed placeholders + real shimmer bars */}
      <div className="space-y-3 p-4">
        {/* nav row */}
        <div className="flex items-center justify-between rounded-[var(--lm-radius-sm)] border border-dashed border-[var(--lm-border-strong)] px-3 py-2">
          <span className="h-2.5 w-16 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
          <div className="flex gap-2">
            <span className="h-2.5 w-8 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
            <span className="h-2.5 w-8 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
            <span className="h-2.5 w-8 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
          </div>
        </div>

        {/* hero block with live shimmer copy */}
        <div className="rounded-[var(--lm-radius-sm)] border border-dashed border-[var(--lm-border-strong)] p-4">
          <Skeleton lines={3} />
        </div>

        {/* two columns */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2.5 rounded-[var(--lm-radius-sm)] border border-dashed border-[var(--lm-border-strong)] p-3">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="space-y-2.5 rounded-[var(--lm-radius-sm)] border border-dashed border-[var(--lm-border-strong)] p-3">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>

        {/* footer row */}
        <div className="flex items-center justify-center rounded-[var(--lm-radius-sm)] border border-dashed border-[var(--lm-border-strong)] py-2.5">
          <span className="h-2 w-24 rounded-[var(--lm-radius-full)] bg-[var(--lm-border)]" />
        </div>
      </div>
    </div>
  );
}

/* ── Real, recognizable framework marks (brand color via currentColor) ─── */

function GlyphReact() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={2} fill="currentColor" />
      <g stroke="currentColor" strokeWidth={1.3} fill="none">
        <ellipse cx={12} cy={12} rx={10} ry={3.9} />
        <ellipse cx={12} cy={12} rx={10} ry={3.9} transform="rotate(60 12 12)" />
        <ellipse cx={12} cy={12} rx={10} ry={3.9} transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

/** Next.js: the circle mark with the diagonal "N". */
function GlyphNext() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={10.5} stroke="currentColor" strokeWidth={1.1} opacity={0.45} />
      <path
        d="M8.4 8v8M8.4 8l8 9.2"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.6 8v5.4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

function GlyphTS() {
  return (
    <span className="font-mono text-[13px] font-bold leading-none tracking-tight text-current">
      TS
    </span>
  );
}

/** Tailwind: the twin overlapping waves. */
function GlyphTailwind() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none">
        <path d="M4 11c1.3-2.7 2.9-4 4.9-4 3 0 3.3 3 5.6 3 1.5 0 2.5-.8 3.4-2.4-1.3 2.7-2.9 4-4.9 4-3 0-3.3-3-5.6-3-1.5 0-2.5.8-3.4 2.4Z" />
        <path d="M4 16c1.3-2.7 2.9-4 4.9-4 3 0 3.3 3 5.6 3 1.5 0 2.5-.8 3.4-2.4-1.3 2.7-2.9 4-4.9 4-3 0-3.3-3-5.6-3-1.5 0-2.5.8-3.4 2.4Z" />
      </g>
    </svg>
  );
}

/** Motion: an ease curve arcing up to a leading dot. */
function GlyphMotion() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3.5 17.5C7 17.5 9 6.5 13.5 6.5c1.8 0 2.8 1.4 4 1.4"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <circle cx={18.5} cy={8} r={2.1} fill="currentColor" />
    </svg>
  );
}
