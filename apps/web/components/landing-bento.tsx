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

/* ── Card 2 visual — isometric framework tiles (neutral) ─────────────── */

interface IsoTile {
  label: string;
  /** Diamond layout offsets, in px, from cluster center. */
  x: number;
  y: number;
  glyph: React.ReactNode;
}

function CardFrameworks({ reduceMotion }: { reduceMotion: boolean | null }) {
  // Loose diamond: top, left, right, center, bottom.
  const tiles: IsoTile[] = [
    { label: "Next", x: 0, y: -58, glyph: <GlyphN /> },
    { label: "React", x: -82, y: 0, glyph: <GlyphAtom /> },
    { label: "Motion", x: 82, y: 0, glyph: <GlyphM /> },
    { label: "TypeScript", x: 0, y: 4, glyph: <GlyphTS /> },
    { label: "Tailwind", x: 0, y: 62, glyph: <GlyphWave /> },
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
            className="absolute grid h-16 w-16 place-items-center rounded-[var(--lm-radius)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface)] text-[var(--lm-fg-muted)] shadow-[var(--lm-shadow)]"
            style={{
              left: tile.x,
              top: tile.y,
              marginLeft: -32,
              marginTop: -32,
            }}
            animate={
              reduceMotion
                ? undefined
                : { translateZ: [0, 14, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.5,
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

/* ── Card 3 visual — node graph (center node carries the only glow) ──── */

function CardNodeGraph({
  reduceMotion,
  viewport,
}: {
  reduceMotion: boolean | null;
  viewport: { once: boolean; amount: number };
}) {
  const cx = 160;
  const cy = 130;
  // Five surrounding component nodes around the lumen core.
  const nodes = [
    { x: 160, y: 36, glyph: "spotlight" as const },
    { x: 272, y: 92, glyph: "grid" as const },
    { x: 244, y: 210, glyph: "bars" as const },
    { x: 76, y: 210, glyph: "dot" as const },
    { x: 48, y: 92, glyph: "rings" as const },
  ];

  return (
    <motion.svg
      viewBox="0 0 320 260"
      className="h-[260px] w-full"
      role="img"
      aria-label="A central node connected by faint lines to five component nodes"
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
    >
      {/* connector lines — faint, neutral */}
      <g stroke="var(--lm-border-strong)" strokeWidth={1} fill="none">
        {nodes.map((n, i) => (
          <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* surrounding component nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          variants={reveal}
          transition={springs.drift}
        >
          <rect
            x={n.x - 22}
            y={n.y - 18}
            width={44}
            height={36}
            rx={9}
            fill="var(--lm-surface-2)"
            stroke="var(--lm-border-strong)"
            strokeWidth={1}
          />
          <NodeGlyph kind={n.glyph} cx={n.x} cy={n.y} />
        </motion.g>
      ))}

      {/* central lumen node — the only glow in this visual */}
      <motion.g variants={reveal} transition={springs.drift}>
        <circle cx={cx} cy={cy} r={30} fill="var(--lm-accent-soft)" />
        <circle
          cx={cx}
          cy={cy}
          r={18}
          fill="var(--lm-surface)"
          stroke="var(--lm-accent)"
          strokeWidth={1.5}
        />
        <circle cx={cx} cy={cy} r={5} fill="var(--lm-accent)" />
      </motion.g>
    </motion.svg>
  );
}

function NodeGlyph({
  kind,
  cx,
  cy,
}: {
  kind: "spotlight" | "grid" | "bars" | "dot" | "rings";
  cx: number;
  cy: number;
}) {
  const stroke = "var(--lm-fg-faint)";
  switch (kind) {
    case "spotlight":
      return (
        <circle cx={cx} cy={cy} r={6} fill="none" stroke={stroke} strokeWidth={1.5} />
      );
    case "grid":
      return (
        <g fill={stroke}>
          <rect x={cx - 6} y={cy - 6} width={5} height={5} rx={1} />
          <rect x={cx + 1} y={cy - 6} width={5} height={5} rx={1} />
          <rect x={cx - 6} y={cy + 1} width={5} height={5} rx={1} />
          <rect x={cx + 1} y={cy + 1} width={5} height={5} rx={1} />
        </g>
      );
    case "bars":
      return (
        <g fill={stroke}>
          <rect x={cx - 7} y={cy - 1} width={3} height={6} rx={1} />
          <rect x={cx - 1.5} y={cy - 5} width={3} height={10} rx={1} />
          <rect x={cx + 4} y={cy - 3} width={3} height={8} rx={1} />
        </g>
      );
    case "dot":
      return <circle cx={cx} cy={cy} r={4} fill={stroke} />;
    case "rings":
      return (
        <g fill="none" stroke={stroke} strokeWidth={1.5}>
          <circle cx={cx} cy={cy} r={3} />
          <circle cx={cx} cy={cy} r={7} />
        </g>
      );
  }
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

/* ── Monochrome framework glyphs ─────────────────────────────────────── */

function GlyphAtom() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={2.2} fill="currentColor" />
      <g stroke="currentColor" strokeWidth={1.4} fill="none">
        <ellipse cx={12} cy={12} rx={10} ry={4} />
        <ellipse cx={12} cy={12} rx={10} ry={4} transform="rotate(60 12 12)" />
        <ellipse cx={12} cy={12} rx={10} ry={4} transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function GlyphN() {
  return (
    <span className="font-display text-lg font-semibold leading-none text-current">
      N
    </span>
  );
}

function GlyphTS() {
  return (
    <span className="font-mono text-[13px] font-semibold leading-none tracking-tight text-current">
      TS
    </span>
  );
}

function GlyphWave() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 14c2-4 4-4 6 0s4 4 6 0 4-4 6 0"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function GlyphM() {
  return (
    <span className="font-display text-lg font-semibold leading-none text-current">
      M
    </span>
  );
}
