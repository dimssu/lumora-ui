"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Badge,
  BorderBeam,
  Button,
  Dock,
  DockItem,
  ElasticStack,
  FlipText,
  Folder,
  GlitchText,
  MagneticZone,
  SpotlightCard,
  springs,
} from "@lumora/ui";
import {
  BellIcon,
  CompassIcon,
  HeartIcon,
  MailIcon,
  SearchIcon,
  SparkleIcon,
  StarIcon,
  ZapIcon,
} from "@lumora/icons";

interface TileProps {
  slug: string;
  caption: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * One showcase tile: a quiet, fixed-height surface holding a live component,
 * with a caption that links to the component's detail page. The whole tile is
 * keyboard reachable via its caption link; the live component inside keeps its
 * own interactions.
 */
function Tile({ slug, caption, className, children }: TileProps) {
  return (
    <div
      className={[
        "group relative flex flex-col overflow-hidden rounded-[var(--lm-radius-lg)]",
        "border border-[var(--lm-border)] bg-[var(--lm-surface)]",
        "transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-8">
        {children}
      </div>
      <Link
        href={`/components/${slug}`}
        className="flex items-center justify-between gap-2 border-t border-[var(--lm-border)] px-4 py-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
      >
        <span className="font-medium uppercase tracking-[0.18em] text-[var(--lm-fg-muted)] transition-colors group-hover:text-[var(--lm-fg)]">
          {caption}
        </span>
        <span
          aria-hidden
          className="text-[var(--lm-fg-faint)] transition-transform duration-[var(--lm-duration-fast)] group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
  );
}

const deckCards = [
  { title: "Snap", body: "Hovers and presses settle in a single, fast beat." },
  { title: "Drift", body: "Reveals breathe in once, then hold perfectly still." },
  { title: "Glide", body: "Layouts move with weight, deliberate and unhurried." },
];

export function LandingShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          Every tile is the real component, live
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
          No screenshots, no mockups. Hover, click, drag — each one is the same
          source the CLI drops into your repo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Spotlight card — wide anchor tile */}
        <Tile
          slug="spotlight-card"
          caption="Spotlight Card"
          className="sm:col-span-2"
        >
          <SpotlightCard className="h-[200px] w-full border-0 bg-transparent">
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <Badge variant="neutral" dot size="sm">
                Live surface
              </Badge>
              <p className="max-w-sm text-base font-medium text-[var(--lm-fg)] sm:text-lg">
                Move your cursor across the card — the lumen follows.
              </p>
              <p className="text-sm text-[var(--lm-fg-muted)]">
                A radial glow and a lit border trail the pointer.
              </p>
            </div>
          </SpotlightCard>
        </Tile>

        {/* Glitch + Flip text headline */}
        <Tile slug="glitch-text" caption="Glitch Text">
          <div className="flex h-[200px] flex-col items-center justify-center gap-4 text-center">
            <GlitchText
              trigger={reduceMotion ? "hover" : "loop"}
              className="text-2xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-3xl"
            >
              Interfaces that glow
            </GlitchText>
            <p className="text-sm text-[var(--lm-fg-muted)]">
              Springs that{" "}
              <FlipText
                words={["snap.", "drift.", "glide."]}
                className="font-medium text-[var(--lm-fg)]"
              />
            </p>
          </div>
        </Tile>

        {/* Border beam card */}
        <Tile slug="border-beam" caption="Border Beam">
          <BorderBeam color="lumen" className="w-full">
            <div className="flex h-[176px] flex-col items-center justify-center gap-2 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-6 text-center">
              <SparkleIcon />
              <p className="text-base font-medium text-[var(--lm-fg)]">
                A traveling lumen edge
              </p>
              <p className="text-sm text-[var(--lm-fg-muted)]">
                One bright head, endlessly lapping the border.
              </p>
            </div>
          </BorderBeam>
        </Tile>

        {/* Magnetic button */}
        <Tile slug="magnetic-button" caption="Magnetic Zone">
          <div className="flex h-[200px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-[var(--lm-fg-muted)]">
              The button leans toward your cursor.
            </p>
            <MagneticZone strength={0.4}>
              <Button variant="glow" size="lg">
                <ZapIcon />
                Pull me
              </Button>
            </MagneticZone>
          </div>
        </Tile>

        {/* Folder */}
        <Tile slug="folder" caption="Folder">
          <div className="flex h-[200px] items-center justify-center">
            <Folder
              label="Drafts"
              items={[
                <div
                  key="a"
                  className="flex h-full w-full items-center justify-center rounded-[var(--lm-radius-sm)] bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]"
                >
                  <StarIcon size={16} />
                </div>,
                <div
                  key="b"
                  className="flex h-full w-full items-center justify-center rounded-[var(--lm-radius-sm)] bg-[var(--lm-surface-2)] text-[var(--lm-fg-muted)]"
                >
                  <HeartIcon size={16} />
                </div>,
                <div
                  key="c"
                  className="flex h-full w-full items-center justify-center rounded-[var(--lm-radius-sm)] bg-[var(--lm-surface-2)] text-[var(--lm-fg-muted)]"
                >
                  <CompassIcon size={16} />
                </div>,
              ]}
            />
          </div>
        </Tile>

        {/* Elastic stack */}
        <Tile slug="elastic-stack" caption="Elastic Stack">
          <div className="flex h-[200px] items-center justify-center">
            <ElasticStack className="w-[200px]">
              {deckCards.map((card) => (
                <div
                  key={card.title}
                  className="flex h-[140px] w-[200px] flex-col justify-between rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] p-4"
                >
                  <span className="text-base font-semibold text-[var(--lm-fg)]">
                    {card.title}
                  </span>
                  <span className="text-xs leading-relaxed text-[var(--lm-fg-muted)]">
                    {card.body}
                  </span>
                </div>
              ))}
            </ElasticStack>
          </div>
        </Tile>

        {/* Dock — wide closing tile */}
        <Tile slug="dock" caption="Dock" className="sm:col-span-2 lg:col-span-3">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={springs.drift}
            className="flex h-[160px] w-full flex-col items-center justify-center gap-5"
          >
            <p className="text-sm text-[var(--lm-fg-muted)]">
              Items swell as the cursor nears them.
            </p>
            <Dock aria-label="Sample dock — every item is live">
              <DockItem label="Search">
                <SearchIcon />
              </DockItem>
              <DockItem label="Inbox">
                <MailIcon />
              </DockItem>
              <DockItem label="Favorites">
                <StarIcon />
              </DockItem>
              <DockItem label="Alerts">
                <BellIcon />
              </DockItem>
              <DockItem label="Sparkle">
                <SparkleIcon />
              </DockItem>
            </Dock>
          </motion.div>
        </Tile>
      </div>
    </section>
  );
}
