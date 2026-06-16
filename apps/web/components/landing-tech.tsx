"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@lumora/ui";

export interface LandingTechProps {
  /** Unused here, kept for a uniform landing-section signature. */
  onBrowse?: () => void;
  /** Unused here, kept for a uniform landing-section signature. */
  onDocs?: () => void;
}

interface Tile {
  label: string;
  glyph: React.ReactNode;
}

/**
 * "Built on" strip: a row of embossed key-cap tiles for the stack Lumora sits
 * on. Each cap reads physical — an inset top highlight over a soft drop shadow.
 * On hover it lifts on a snappy spring and a faint lumen pools beneath it.
 * The lift is suppressed under reduced motion; the glow falls back to opacity.
 */
export function LandingTech(_props: LandingTechProps) {
  const tiles: Tile[] = [
    { label: "React", glyph: <ReactGlyph /> },
    { label: "Next.js", glyph: <NextGlyph /> },
    { label: "TypeScript", glyph: <TsGlyph /> },
    { label: "Tailwind CSS", glyph: <TailwindGlyph /> },
    { label: "Motion", glyph: <MotionGlyph /> },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.32em] text-[var(--lm-fg-faint)]">
        Built on a stack you already know
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
        {tiles.map((tile) => (
          <KeyCap key={tile.label} label={tile.label}>
            {tile.glyph}
          </KeyCap>
        ))}
      </ul>
    </section>
  );
}

function KeyCap({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <li className="flex flex-col items-center gap-3">
      <motion.div
        className="group relative"
        whileHover={reduceMotion ? undefined : { y: -5 }}
        transition={springs.snap}
      >
        {/* lumen pool beneath the cap, revealed on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-[var(--lm-radius-lg)] opacity-0 blur-md transition-opacity duration-[var(--lm-duration)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 80%, var(--lm-glow), transparent 70%)",
          }}
        />

        <div
          className="relative flex h-[68px] w-[68px] items-center justify-center rounded-[var(--lm-radius-lg)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)] text-[var(--lm-fg)] shadow-[var(--lm-shadow)] transition-colors duration-[var(--lm-duration-fast)] group-hover:border-[var(--lm-border-strong)]"
          style={{
            // embossed keycap: inset highlight on top, inset shade at the base
            boxShadow:
              "inset 0 1px 0 var(--lm-border-strong), inset 0 -2px 6px rgba(0,0,0,0.35), var(--lm-shadow)",
          }}
        >
          <span aria-hidden className="flex items-center justify-center">
            {children}
          </span>
          <span className="sr-only">{label}</span>
        </div>
      </motion.div>

      <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--lm-fg-muted)]">
        {label}
      </span>
    </li>
  );
}

/* ───────────────────────────────────────────────────────────────────
   Restrained, original brand glyphs — drawn monochrome in --lm-fg with a
   single accent touch, so they sit inside Lumora's palette rather than
   shouting their own brand colors.
   ─────────────────────────────────────────────────────────────────── */

function ReactGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2.4" fill="var(--lm-accent)" />
      <g
        stroke="var(--lm-fg)"
        strokeWidth="1.4"
        fill="none"
        opacity="0.9"
      >
        <ellipse cx="16" cy="16" rx="11" ry="4.4" />
        <ellipse
          cx="16"
          cy="16"
          rx="11"
          ry="4.4"
          transform="rotate(60 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="11"
          ry="4.4"
          transform="rotate(120 16 16)"
        />
      </g>
    </svg>
  );
}

function NextGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle
        cx="16"
        cy="16"
        r="12.5"
        stroke="var(--lm-fg)"
        strokeWidth="1.4"
        opacity="0.9"
      />
      <path
        d="M11 22V10.5M11 10.5l11 13.5M21 10v8"
        stroke="var(--lm-fg)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TsGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect
        x="4.5"
        y="4.5"
        width="23"
        height="23"
        rx="4"
        stroke="var(--lm-fg)"
        strokeWidth="1.4"
        opacity="0.9"
      />
      <path
        d="M11 14h6M14 14v6"
        stroke="var(--lm-fg)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 20.5c.7.7 1.7 1 2.6 1 1.3 0 2.4-.7 2.4-1.9 0-2.3-4.6-1.4-4.6-3.7 0-1 .9-1.8 2.2-1.8.8 0 1.6.3 2.1.8"
        stroke="var(--lm-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function TailwindGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M6 17c1-4 3.5-6 7.5-6 6 0 6.75 4.5 9.75 5.25 2 .5 3.75-.25 5.25-2.25-1 4-3.5 6-7.5 6-6 0-6.75-4.5-9.75-5.25C8.25 13.5 6.5 14.25 5 16.25"
        stroke="var(--lm-fg)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.92"
      />
    </svg>
  );
}

function MotionGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M6 9h6l4 14L20 9h6"
        stroke="var(--lm-fg)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="16" cy="23" r="1.8" fill="var(--lm-accent)" />
    </svg>
  );
}
