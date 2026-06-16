"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button, Switch, springs } from "@lumora/ui";

export interface LandingHeroProps {
  /** Primary CTA — open the component gallery. */
  onBrowse?: () => void;
  /** Secondary CTA — open the docs. */
  onDocs?: () => void;
}

/**
 * Split hero: editorial headline on the left, an isometric wireframe "lumen
 * cube" centerpiece on the right. The cube floats on a slow yoyo loop, live
 * Lumora chips parallax over its faces, and the cube's leading edges carry the
 * single lumen glow. Ambient motion stops under reduced-motion; the geometry
 * stays crisp.
 */
export function LandingHero({ onBrowse, onDocs }: LandingHeroProps) {
  const reduceMotion = useReducedMotion();
  const [glowing, setGlowing] = React.useState(true);

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* ── LEFT: text ───────────────────────────────────────────── */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] py-1.5 pl-2.5 pr-3.5 text-xs font-medium text-[var(--lm-fg-muted)]">
            <span
              aria-hidden
              className="relative flex h-1.5 w-1.5"
            >
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
            <Button
              variant="solid"
              size="lg"
              onClick={onBrowse}
              shimmer
            >
              Explore components
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onDocs}
            >
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

        {/* ── RIGHT: the isometric lumen cube ──────────────────────── */}
        <LumenCubeStage
          reduceMotion={!!reduceMotion}
          glowing={glowing}
          onToggleGlow={setGlowing}
        />
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────
   The signature visual.
   ─────────────────────────────────────────────────────────────────── */

interface StageProps {
  reduceMotion: boolean;
  glowing: boolean;
  onToggleGlow: (next: boolean) => void;
}

function LumenCubeStage({ reduceMotion, glowing, onToggleGlow }: StageProps) {
  // Gentle ambient float for the whole cube assembly.
  const float = reduceMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] select-none lg:max-w-[480px]">
      {/* Technical bounding bracket — corner framing lines */}
      <CornerFrame />

      {/* The cube + platform, drawn as one crisp isometric SVG. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: "var(--lm-border-strong)" }}
        {...float}
      >
        <IsoCube glowing={glowing} reduceMotion={reduceMotion} />
      </motion.div>

      {/* Floating live component chips, parallaxing over the cube faces. */}
      <FloatingChip
        reduceMotion={reduceMotion}
        delay={0}
        drift={-7}
        className="left-[6%] top-[18%]"
      >
        <Button variant="glow" size="sm">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)]"
          />
          Glow
        </Button>
      </FloatingChip>

      <FloatingChip
        reduceMotion={reduceMotion}
        delay={0.8}
        drift={6}
        className="right-[2%] top-[34%]"
      >
        <span className="inline-flex items-center gap-2 rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-2.5 py-1.5 text-xs font-medium text-[var(--lm-fg)] shadow-[var(--lm-shadow)]">
          <span
            aria-hidden
            className="font-mono text-[10px] text-[var(--lm-accent)]"
          >
            ⌘K
          </span>
          springs.drift
        </span>
      </FloatingChip>

      <FloatingChip
        reduceMotion={reduceMotion}
        delay={1.4}
        drift={-5}
        className="bottom-[16%] left-[14%]"
      >
        <span className="inline-flex items-center gap-2.5 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] py-1.5 pl-3 pr-1.5 shadow-[var(--lm-shadow)]">
          <span className="text-xs font-medium text-[var(--lm-fg-muted)]">
            Lumen
          </span>
          <Switch
            checked={glowing}
            onCheckedChange={onToggleGlow}
            aria-label="Toggle the cube's lumen edges"
          />
        </span>
      </FloatingChip>
    </div>
  );
}

interface ChipProps {
  reduceMotion: boolean;
  delay: number;
  drift: number;
  className: string;
  children: React.ReactNode;
}

function FloatingChip({
  reduceMotion,
  delay,
  drift,
  className,
  children,
}: ChipProps) {
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }
      }
      animate={
        reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ ...springs.drift, delay: delay * 0.4 }}
    >
      {reduceMotion ? (
        children
      ) : (
        <motion.div
          animate={{ y: [0, drift, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * True isometric cube floating above a dashed platform on a faint grid floor.
 * Built with the standard 2:1 iso projection (every receding edge runs at a
 * 1:2 slope). Thin 1px strokes in currentColor; the cube's three leading
 * (top) edges get the lumen glow via an SVG drop-shadow filter.
 */
function IsoCube({
  glowing,
  reduceMotion,
}: {
  glowing: boolean;
  reduceMotion: boolean;
}) {
  // Iso geometry. Center the cube around (160, 150).
  // Half-width on screen = w; vertical iso step = w/2. Cube edge "size".
  const cx = 160;
  const cy = 150;
  const w = 66; // horizontal half-span of a face
  const h = w / 2; // iso vertical step (2:1)
  const e = 84; // cube vertical edge length

  // Top diamond (cube top face) vertices.
  const top = { x: cx, y: cy - e / 2 - h }; // back-top apex
  const right = { x: cx + w, y: cy - e / 2 }; // right corner
  const front = { x: cx, y: cy - e / 2 + h }; // front apex
  const left = { x: cx - w, y: cy - e / 2 }; // left corner

  // Bottom vertices = top vertices shifted down by e (the vertical edges).
  const fb = { x: front.x, y: front.y + e }; // front-bottom
  const rb = { x: right.x, y: right.y + e }; // right-bottom
  const lb = { x: left.x, y: left.y + e }; // left-bottom

  // Grid floor lines (faint iso grid).
  const floorY = cy + e / 2 + 26;
  const gridLines: React.ReactElement[] = [];
  for (let i = -3; i <= 3; i++) {
    const off = i * 22;
    // two diagonal families forming the iso floor
    gridLines.push(
      <line
        key={`a${i}`}
        x1={cx - 132 + off}
        y1={floorY}
        x2={cx + off}
        y2={floorY + 66}
        stroke="var(--lm-border)"
        strokeWidth={1}
      />,
      <line
        key={`b${i}`}
        x1={cx + 132 + off}
        y1={floorY}
        x2={cx + off}
        y2={floorY + 66}
        stroke="var(--lm-border)"
        strokeWidth={1}
      />,
    );
  }

  // Dashed platform diamond, sitting below the cube.
  const pCx = cx;
  const pCy = cy + e / 2 + 22;
  const pw = 104;
  const ph = pw / 2;
  const platform = `${pCx},${pCy - ph} ${pCx + pw},${pCy} ${pCx},${pCy + ph} ${pCx - pw},${pCy}`;

  return (
    <svg
      viewBox="0 0 320 340"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="An isometric wireframe cube floating above a dashed platform, lit on its leading edges"
    >
      <defs>
        <filter
          id="lumen-edge-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor="var(--lm-accent)"
            floodOpacity="0.9"
          />
        </filter>
        <radialGradient id="lumen-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--lm-glow)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* faint iso grid floor (clipped to a soft fade via opacity) */}
      <g opacity={0.5}>{gridLines}</g>

      {/* dashed-outline platform */}
      <polygon
        points={platform}
        fill="var(--lm-surface)"
        fillOpacity={0.4}
        stroke="var(--lm-border-strong)"
        strokeWidth={1}
        strokeDasharray="5 5"
      />

      {/* soft lumen pool cast on the platform when glowing */}
      {glowing && (
        <ellipse
          cx={pCx}
          cy={pCy}
          rx={70}
          ry={34}
          fill="url(#lumen-pool)"
          opacity={0.7}
        />
      )}

      {/* ── cube body: three visible faces, filled faintly ───────── */}
      <g>
        {/* left face */}
        <polygon
          points={`${left.x},${left.y} ${front.x},${front.y} ${fb.x},${fb.y} ${lb.x},${lb.y}`}
          fill="var(--lm-surface)"
          fillOpacity={0.55}
          stroke="var(--lm-border)"
          strokeWidth={1}
        />
        {/* right face */}
        <polygon
          points={`${front.x},${front.y} ${right.x},${right.y} ${rb.x},${rb.y} ${fb.x},${fb.y}`}
          fill="var(--lm-surface-2)"
          fillOpacity={0.7}
          stroke="var(--lm-border)"
          strokeWidth={1}
        />
        {/* top face */}
        <polygon
          points={`${top.x},${top.y} ${right.x},${right.y} ${front.x},${front.y} ${left.x},${left.y}`}
          fill="var(--lm-surface-2)"
          fillOpacity={0.9}
          stroke="var(--lm-border-strong)"
          strokeWidth={1}
        />
      </g>

      {/* hidden back edges, very faint, for wireframe depth */}
      <g stroke="var(--lm-border)" strokeWidth={1} opacity={0.45}>
        <line x1={top.x} y1={top.y} x2={top.x} y2={top.y + e} />
        <line x1={top.x} y1={top.y} x2={left.x} y2={left.y} />
        <line x1={top.x} y1={top.y} x2={right.x} y2={right.y} />
      </g>

      {/* ── the lumen: the three leading top edges glow ──────────── */}
      <g
        stroke="var(--lm-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        filter={glowing ? "url(#lumen-edge-glow)" : undefined}
        opacity={glowing ? 1 : 0.35}
        style={{
          transition: reduceMotion
            ? undefined
            : "opacity var(--lm-duration) var(--lm-ease-out)",
        }}
      >
        {/* the front vertical leading edge + the two top edges meeting at front */}
        <polyline
          points={`${left.x},${left.y} ${front.x},${front.y} ${right.x},${right.y}`}
        />
        <line x1={front.x} y1={front.y} x2={fb.x} y2={fb.y} />
      </g>

      {/* bright vertex node where leading edges meet */}
      {glowing && (
        <circle
          cx={front.x}
          cy={front.y}
          r={2.6}
          fill="var(--lm-accent)"
          filter="url(#lumen-edge-glow)"
        />
      )}
    </svg>
  );
}

/** Faint technical corner brackets framing the visual like a spec drawing. */
function CornerFrame() {
  const corner =
    "pointer-events-none absolute h-6 w-6 border-[var(--lm-border-strong)]";
  return (
    <div aria-hidden className="absolute inset-0">
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
