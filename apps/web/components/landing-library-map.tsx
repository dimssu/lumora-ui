"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Badge,
  Button,
  Dock,
  DockItem,
  NumberTicker,
  springs,
} from "@lumora/ui";
import {
  ArchiveIcon,
  CheckIcon,
  CodeIcon,
  CompassIcon,
  DownloadIcon,
  SparkleIcon,
  TerminalIcon,
  VolumeIcon,
  ZapIcon,
} from "@lumora/icons";

/** Mono "T" glyph chip — stands in for type/typography signals. */
function TypeGlyph() {
  return (
    <span className="font-mono text-[13px] font-semibold leading-none">T</span>
  );
}
import { CopyButton } from "./copy-button";

export interface LandingLibraryMapProps {
  /** Optional handler for the section's primary "explore" affordances. */
  onExplore?: () => void;
}

const INSTALL_CMD = "npx lumora-ui@latest add [component]";

/** Quiet mono eyebrow used above the section heading. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--lm-fg-faint)]">
      <span
        aria-hidden
        className="h-px w-6 bg-[var(--lm-border-strong)]"
      />
      {children}
    </span>
  );
}

interface StatProps {
  value?: number;
  label: string;
  text?: string;
}

/** One cell of the stats row: a big mono figure (or status word) + label. */
function Stat({ value, label, text }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-2xl font-semibold tabular-nums text-[var(--lm-fg)] sm:text-[28px]">
        {text ? (
          text
        ) : (
          <NumberTicker value={value ?? 0} className="font-mono" />
        )}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lm-fg-muted)]">
        {label}
      </span>
    </div>
  );
}

/** Small square icon chip. `accent` lights exactly one chip per section. */
function IconChip({
  children,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={[
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--lm-radius-sm)] border",
        accent
          ? "border-transparent bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]"
          : "border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-[var(--lm-fg-muted)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

interface FooterChipProps {
  label: string;
  sub: string;
}

/** A 2-up footer chip: bold mono label + tiny muted sub-text. */
function FooterChip({ label, sub }: FooterChipProps) {
  return (
    <div className="rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-3 py-2.5">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--lm-fg)]">
        {label}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-[var(--lm-fg-faint)]">
        {sub}
      </p>
    </div>
  );
}

interface ColumnProps {
  index: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  delay: number;
  reduceMotion: boolean;
  stage: React.ReactNode;
  chips: [FooterChipProps, FooterChipProps];
}

/** One numbered column: header + live stage + 2-up footer chips. */
function Column({
  index,
  title,
  sub,
  icon,
  delay,
  reduceMotion,
  stage,
  chips,
}: ColumnProps) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...springs.drift, delay: reduceMotion ? 0 : delay }}
      className="flex flex-col rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[var(--lm-border)] px-5 py-4">
        <div className="flex items-center gap-3">
          <IconChip>{icon}</IconChip>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--lm-fg)]">
              {title}
            </h3>
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--lm-fg-muted)]">
              {sub}
            </p>
          </div>
        </div>
        <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--lm-fg-faint)]">
          {index}
        </span>
      </div>

      {/* Stage */}
      <div className="relative flex h-[300px] items-center justify-center overflow-hidden px-5">
        {stage}
      </div>

      {/* Footer chips */}
      <div className="grid grid-cols-2 gap-3 border-t border-[var(--lm-border)] px-5 py-4">
        <FooterChip {...chips[0]} />
        <FooterChip {...chips[1]} />
      </div>
    </motion.div>
  );
}

/* ── Stage 1: Interaction Forge ─────────────────────────────────────── */

function ForgeStage({ reduceMotion }: { reduceMotion: boolean }) {
  const checklist = ["Hover glow", "Press sink", "Cursor trail"];
  return (
    <div className="relative w-full">
      {/* faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--lm-border) 1px, transparent 1px), linear-gradient(90deg, var(--lm-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(120% 90% at 50% 30%, #000 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 30%, #000 40%, transparent 80%)",
        }}
      />
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ ...springs.drift, delay: reduceMotion ? 0 : 0.12 }}
        className="relative mx-auto w-[230px] rounded-[var(--lm-radius-lg)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)] p-4 shadow-[var(--lm-shadow)]"
      >
        {/* corner sparkle chip */}
        <IconChip className="absolute -right-3 -top-3 h-7 w-7 shadow-[var(--lm-shadow-sm)]">
          <SparkleIcon size={14} />
        </IconChip>

        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--lm-fg-faint)]">
          Component brief
        </p>
        <p className="mt-1 text-[13px] font-semibold text-[var(--lm-fg)]">
          Button kit
        </p>

        <ul className="mt-3 flex flex-col gap-2">
          {checklist.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-accent)]">
                <CheckIcon size={11} />
              </span>
              <span className="text-xs text-[var(--lm-fg-muted)]">{item}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          tabIndex={-1}
        >
          <ZapIcon size={13} />
          Open kit
        </Button>
      </motion.div>
    </div>
  );
}

/* ── Stage 2: Motion Kernel ─────────────────────────────────────────── */

function KernelStage({ reduceMotion }: { reduceMotion: boolean }) {
  const signals = [
    { icon: <TypeGlyph />, key: "type" },
    { icon: <SparkleIcon size={14} />, key: "sparkle" },
    { icon: <ArchiveIcon size={14} />, key: "layers" },
    { icon: <VolumeIcon size={14} />, key: "music" },
  ];
  return (
    <div className="relative flex w-full items-center justify-center gap-4">
      {/* mini vertical dock */}
      <Dock
        aria-label="Motion surfaces"
        className="h-auto flex-col items-center gap-2 px-2 py-3"
      >
        <DockItem label="Type" size={30} tabIndex={-1}>
          <TypeGlyph />
        </DockItem>
        <DockItem label="Sparkle" size={30} tabIndex={-1}>
          <SparkleIcon size={15} />
        </DockItem>
        <DockItem label="Layers" size={30} tabIndex={-1}>
          <ArchiveIcon size={15} />
        </DockItem>
        <DockItem label="Code" size={30} tabIndex={-1}>
          <CodeIcon size={15} />
        </DockItem>
      </Dock>

      {/* central rotating dial — the section's single lumen focal element */}
      <div className="relative flex h-[120px] w-[120px] items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-[var(--lm-radius-full)]"
          style={{
            padding: 4,
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 230deg, var(--lm-accent) 350deg)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "linear" }
          }
        />
        <span
          aria-hidden
          className="absolute inset-[10px] rounded-[var(--lm-radius-full)] border border-[var(--lm-border)]"
        />
        <div className="relative flex flex-col items-center">
          <span className="font-mono text-[11px] font-medium text-[var(--lm-fg)]">
            indexing
          </span>
          <span
            aria-hidden
            className="font-mono text-[11px] text-[var(--lm-accent)]"
          >
            ···
          </span>
        </div>
      </div>

      {/* floating signal chips */}
      <div className="flex flex-col gap-2.5">
        {signals.map((s, i) => (
          <motion.div
            key={s.key}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              ...springs.drift,
              delay: reduceMotion ? 0 : 0.15 + i * 0.08,
            }}
          >
            <IconChip>{s.icon}</IconChip>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Stage 3: Registry Composer ─────────────────────────────────────── */

function ComposerStage({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes = [
    { label: "Choose layer", cls: "left-0 top-2" },
    { label: "Compose card", cls: "right-0 top-2" },
    { label: "Preview scene", cls: "left-0 bottom-2" },
    { label: "Ship ready", cls: "right-0 bottom-2" },
  ];
  return (
    <div className="relative h-full w-full">
      {/* faint connecting lines */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <line
          x1="22%"
          y1="22%"
          x2="50%"
          y2="50%"
          stroke="var(--lm-border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="78%"
          y1="22%"
          x2="50%"
          y2="50%"
          stroke="var(--lm-border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="22%"
          y1="78%"
          x2="50%"
          y2="50%"
          stroke="var(--lm-border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="78%"
          y1="78%"
          x2="50%"
          y2="50%"
          stroke="var(--lm-border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      </svg>

      {/* labelled nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            ...springs.drift,
            delay: reduceMotion ? 0 : 0.18 + i * 0.07,
          }}
          className={`absolute ${n.cls} flex items-center gap-1.5 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-2.5 py-1`}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-[var(--lm-radius-full)] bg-[var(--lm-fg-faint)]"
          />
          <span className="font-mono text-[10px] tracking-[0.04em] text-[var(--lm-fg-muted)]">
            {n.label}
          </span>
        </motion.div>
      ))}

      {/* center card */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ ...springs.drift, delay: reduceMotion ? 0 : 0.1 }}
        className="absolute left-1/2 top-1/2 w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface)] p-2.5 shadow-[var(--lm-shadow)]"
      >
        <div
          aria-hidden
          className="h-12 w-full rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)]"
          style={{
            background:
              "linear-gradient(135deg, var(--lm-surface-2), var(--lm-accent-2-soft))",
          }}
        />
        <Button
          variant="solid"
          size="sm"
          className="mt-2.5 w-full"
          tabIndex={-1}
        >
          <DownloadIcon size={13} />
          Install
        </Button>
      </motion.div>

      {/* copy CLI node */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-2 py-1">
        <span className="font-mono text-[10px] text-[var(--lm-fg-faint)]">
          Copy CLI
        </span>
        <CopyButton
          text={INSTALL_CMD}
          label="Copy install command"
          className="h-5 w-5"
        />
      </div>
    </div>
  );
}

/**
 * The "Build with Lumora" library map: heading + CLI box + stats, then three
 * numbered columns each holding a live component vignette. A single lumen
 * focal point — the rotating dial in column two — carries the accent; every
 * other surface stays neutral.
 */
export function LandingLibraryMap({ onExplore }: LandingLibraryMapProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
      {/* Top row */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
        {/* Left: heading */}
        <div>
          <Eyebrow>Library map</Eyebrow>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-5xl">
            Build with Lumora.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
            Three focused paths for discovery — forge the interaction, tune the
            motion, and ship it through the registry.
          </p>
        </div>

        {/* Right: CLI box + stats */}
        <div>
          <div className="flex items-center gap-3 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-3 py-2.5">
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-[var(--lm-fg-muted)]"
            >
              <TerminalIcon size={14} />
            </span>
            <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-[var(--lm-fg)]">
              {INSTALL_CMD}
            </code>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--lm-fg-faint)]">
              CLI
            </span>
            <CopyButton text={INSTALL_CMD} label="Copy install command" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[var(--lm-border)] pt-5">
            <Stat value={60} label="Components" />
            <Stat value={15} label="Blocks" />
            <Stat text="Ready" label="CLI status" />
          </div>
        </div>
      </div>

      {/* Three numbered columns */}
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <Column
          index="01 / 03"
          title="Interaction Forge"
          sub="Buttons + input trails"
          icon={<ZapIcon size={16} />}
          delay={0}
          reduceMotion={reduceMotion}
          stage={<ForgeStage reduceMotion={reduceMotion} />}
          chips={[
            { label: "Button Kit", sub: "Hover, glow, press" },
            { label: "Input Effects", sub: "Cursor, trail, keys" },
          ]}
        />
        <Column
          index="02 / 03"
          title="Motion Kernel"
          sub="Type + tooltip signals"
          icon={<SparkleIcon size={16} />}
          delay={0.08}
          reduceMotion={reduceMotion}
          stage={<KernelStage reduceMotion={reduceMotion} />}
          chips={[
            { label: "Motion Type", sub: "Flip, fade, morph" },
            { label: "Tooltip Rails", sub: "Tooltip + marquee" },
          ]}
        />
        <Column
          index="03 / 03"
          title="Registry Composer"
          sub="Layouts + install paths"
          icon={<CompassIcon size={16} />}
          delay={0.16}
          reduceMotion={reduceMotion}
          stage={<ComposerStage reduceMotion={reduceMotion} />}
          chips={[
            { label: "Bento Layouts", sub: "Grid, bento, stack" },
            { label: "Scene Fields", sub: "Rays, grids, lines" },
          ]}
        />
      </div>

      {/* Section footer */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" size="sm" dot>
            60 live components
          </Badge>
          <Badge variant="neutral" size="sm">
            Copy-paste ready
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onExplore}>
          Explore the library
          <span aria-hidden>→</span>
        </Button>
      </div>
    </section>
  );
}
