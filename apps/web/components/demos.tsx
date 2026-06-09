"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AnimatedTabs,
  AnimatedTooltip,
  AuroraBackground,
  BeamGrid,
  Button,
  ChatWidget,
  CommandMenu,
  CtaBanner,
  Dialog,
  Dock,
  DockItem,
  Faq,
  FeatureBento,
  Footer,
  GradientText,
  Hero,
  Input,
  MagneticZone,
  Marquee,
  Navbar,
  NumberTicker,
  Pricing,
  ScrollProgress,
  SelectionToolbar,
  Spotlight,
  SpotlightCard,
  Switch,
  Testimonials,
  TextReveal,
  TiltCard,
  Typewriter,
  cn,
  type CommandMenuItem,
} from "@lumora/ui";
import {
  BellIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "@lumora/icons";

/* ── helpers ─────────────────────────────────────────────────── */

/**
 * Scaled, non-interactive live preview for full-width blocks. `inert`
 * removes the duplicate content from the tab order and accessibility
 * tree — the tile's own title and description carry the meaning.
 */
function BlockPreview({
  scale = 0.4,
  children,
  className,
}: {
  scale?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      inert
      aria-hidden
      className={cn(
        "pointer-events-none relative h-full w-full overflow-hidden",
        "rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-bg)]",
        className,
      )}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Frame whose transform makes it the containing block for `position: fixed`
 * descendants — so fixed-position components stay inside the demo.
 */
function ContainFixed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[var(--lm-radius)]",
        "border border-[var(--lm-border)] bg-[var(--lm-bg)]",
        className,
      )}
      style={{ transform: "translate(0)" }}
    >
      {children}
    </div>
  );
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/* ── stateful demos ──────────────────────────────────────────── */

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Rename project">
        <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          The panel breathes in from 96% scale while the page dims behind a
          blurred overlay. Escape or the overlay closes it, and focus returns
          to the trigger.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="accent" size="sm" onClick={() => setOpen(false)}>
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
}

function SwitchDemo() {
  const [ambient, setAmbient] = React.useState(true);
  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center justify-between gap-6 text-sm text-[var(--lm-fg-muted)]">
        Ambient motion
        <Switch checked={ambient} onCheckedChange={setAmbient} />
      </label>
      <label className="flex items-center justify-between gap-6 text-sm text-[var(--lm-fg-muted)]">
        Monthly digest
        <Switch defaultChecked={false} />
      </label>
    </div>
  );
}

function SelectionToolbarDemo() {
  const [last, setLast] = React.useState<string | null>(null);
  return (
    <div className="max-w-sm">
      <SelectionToolbar
        onAction={(actionId, text) =>
          setLast(`${actionId}: “${text.slice(0, 40)}${text.length > 40 ? "…" : ""}”`)
        }
      >
        <p className="select-text text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          Select any stretch of this paragraph and a pill toolbar floats in
          above your selection, anchored to its exact rectangle. It scales in
          with one soft breath and leaves when the selection collapses.
        </p>
      </SelectionToolbar>
      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-[var(--lm-fg-faint)]">
        {last ? `Last action — ${last}` : "Try selecting the text above."}
      </p>
    </div>
  );
}

function CommandMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const items = React.useMemo<CommandMenuItem[]>(
    () => [
      { id: "new", label: "New page", hint: "N", group: "Create", onSelect: () => {} },
      { id: "dup", label: "Duplicate block", hint: "⇧D", group: "Create", onSelect: () => {} },
      { id: "theme", label: "Toggle theme", hint: "T", group: "View", onSelect: () => {} },
      { id: "zen", label: "Zen mode", hint: "Z", group: "View", onSelect: () => {} },
      { id: "docs", label: "Search documentation", group: "Help", onSelect: () => {} },
    ],
    [],
  );
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command menu
      </Button>
      <CommandMenu open={open} onOpenChange={setOpen} items={items} />
    </>
  );
}

async function* demoReply(text: string): AsyncIterable<string> {
  const reply = `You said “${text.trim()}”. This reply is streaming from a local async generator — no network involved. Swap onSend for your own model call and the widget handles the rest.`;
  await sleep(420);
  const words = reply.split(" ");
  for (let i = 0; i < words.length; i++) {
    await sleep(38);
    yield (words[i] ?? "") + (i < words.length - 1 ? " " : "");
  }
}

function ChatWidgetDemo({ height = 320 }: { height?: number }) {
  return (
    <ContainFixed className="w-full" >
      <div style={{ height }} className="flex items-start p-4">
        <p className="max-w-[55%] text-xs leading-relaxed text-[var(--lm-fg-faint)]">
          The launcher pins to its corner with a slow lumen pulse, then springs
          open into the panel. Replies stream chunk by chunk.
        </p>
      </div>
      <ChatWidget
        onSend={demoReply}
        title="Ask Lumora"
        placeholder="Say anything…"
        className="!absolute"
      />
    </ContainFixed>
  );
}

function ScrollProgressDemo() {
  return (
    <ContainFixed className="flex h-28 w-full max-w-sm items-center justify-center">
      <ScrollProgress className="!absolute" />
      <p className="px-6 text-center text-xs text-[var(--lm-fg-faint)]">
        Scroll the page — the bar above fills with it, smoothed by the glide
        spring.
      </p>
    </ContainFixed>
  );
}

function DockDemo() {
  return (
    <Dock aria-label="Demo dock">
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
      <DockItem label="Settings">
        <SettingsIcon />
      </DockItem>
    </Dock>
  );
}

/* ── shared demo content ─────────────────────────────────────── */

const tooltipPeople = [
  { id: 1, name: "Mara Voss", hint: "Design lead" },
  { id: 2, name: "Theo Lindqvist", hint: "Founder" },
  { id: 3, name: "Priya Raman", hint: "Staff engineer" },
  { id: 4, name: "Aiko Tanabe", hint: "Frontend" },
];

const marqueeWords = ["Snap", "Drift", "Glide", "Lumen", "Quiet", "Glow"];

function MarqueeDemo() {
  return (
    <Marquee speed={36} gap={36} pauseOnHover className="w-full max-w-sm">
      {marqueeWords.map((word) => (
        <span
          key={word}
          className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[var(--lm-fg-muted)]"
        >
          <span
            aria-hidden
            className="h-1 w-1 rounded-full bg-[var(--lm-fg-faint)]"
          />
          {word}
        </span>
      ))}
    </Marquee>
  );
}

/* ── the demo registry ───────────────────────────────────────── */

export interface DemoEntry {
  /** Compact tile preview for the gallery grid. */
  preview: React.ReactNode;
  /** Larger demo for the detail page. Falls back to `preview`. */
  full?: React.ReactNode;
}

const demos: Record<string, DemoEntry> = {
  accordion: {
    preview: (
      <Accordion type="single" defaultValue="springs" className="w-full max-w-sm text-left">
        <AccordionItem value="springs" title="Why named springs?">
          <p className="text-sm text-[var(--lm-fg-muted)]">
            Three shared springs keep every panel, hover, and reveal moving as
            one body.
          </p>
        </AccordionItem>
        <AccordionItem value="height" title="How does the height animate?">
          <p className="text-sm text-[var(--lm-fg-muted)]">
            Panels ease open to their natural height and back to zero; the
            chevron rotates with the state.
          </p>
        </AccordionItem>
      </Accordion>
    ),
  },
  "animated-tabs": {
    preview: (
      <AnimatedTabs
        className="w-full max-w-sm"
        items={[
          {
            value: "snap",
            label: "Snap",
            content: (
              <p className="text-sm text-[var(--lm-fg-muted)]">
                Hovers and presses. Fast settle, no wobble.
              </p>
            ),
          },
          {
            value: "drift",
            label: "Drift",
            content: (
              <p className="text-sm text-[var(--lm-fg-muted)]">
                Tooltips and reveals. One gentle breath.
              </p>
            ),
          },
          {
            value: "glide",
            label: "Glide",
            content: (
              <p className="text-sm text-[var(--lm-fg-muted)]">
                Layout shifts. Long, weighty, deliberate.
              </p>
            ),
          },
        ]}
      />
    ),
  },
  "animated-tooltip": {
    preview: (
      <div className="py-8">
        <AnimatedTooltip items={tooltipPeople} />
      </div>
    ),
  },
  "aurora-background": {
    preview: (
      <AuroraBackground className="flex h-full min-h-44 w-full items-center justify-center rounded-[var(--lm-radius)]">
        <p className="text-sm font-medium text-[var(--lm-fg)]">
          Three blurred lumen blobs, drifting slowly.
        </p>
      </AuroraBackground>
    ),
    full: (
      <AuroraBackground className="flex min-h-72 w-full items-center justify-center rounded-[var(--lm-radius-lg)]">
        <div className="px-6 text-center">
          <h3 className="text-2xl font-semibold text-[var(--lm-fg)]">
            Quiet, not loud
          </h3>
          <p className="mt-2 text-sm text-[var(--lm-fg-muted)]">
            A faint grain and vignette keep the glow at section depth.
          </p>
        </div>
      </AuroraBackground>
    ),
  },
  "beam-grid": {
    preview: (
      <BeamGrid
        density={44}
        className="flex h-full min-h-44 w-full items-center justify-center rounded-[var(--lm-radius)]"
      >
        <p className="text-sm font-medium text-[var(--lm-fg)]">
          Beams travel the grid lines on long loops.
        </p>
      </BeamGrid>
    ),
    full: (
      <BeamGrid
        density={56}
        beamCount={4}
        className="flex min-h-72 w-full items-center justify-center rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]"
      >
        <p className="text-base font-medium text-[var(--lm-fg)]">
          Wait a moment — the lumen passes through.
        </p>
      </BeamGrid>
    ),
  },
  button: {
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="accent" shimmer>
          Accent
        </Button>
        <Button variant="glow">Glow</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    ),
  },
  dialog: { preview: <DialogDemo /> },
  dock: { preview: <DockDemo /> },
  "gradient-text": {
    preview: (
      <p className="text-2xl font-semibold">
        <GradientText>Interfaces that glow</GradientText>
      </p>
    ),
  },
  input: {
    preview: (
      <div className="w-full max-w-xs">
        <Input label="Work email" type="email" autoComplete="email" />
      </div>
    ),
  },
  "magnetic-button": {
    preview: (
      <MagneticZone radius={140} className="p-10">
        <Button variant="glow">Pull me closer</Button>
      </MagneticZone>
    ),
  },
  marquee: { preview: <MarqueeDemo /> },
  "number-ticker": {
    preview: (
      <div className="flex items-end gap-8">
        <div className="text-center">
          <p className="text-4xl font-semibold tracking-tight text-[var(--lm-fg)]">
            <NumberTicker value={12480} suffix="+" />
          </p>
          <p className="mt-1 text-xs text-[var(--lm-fg-faint)]">installs</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-semibold tracking-tight text-[var(--lm-fg)]">
            <NumberTicker value={99.8} decimals={1} suffix="%" />
          </p>
          <p className="mt-1 text-xs text-[var(--lm-fg-faint)]">frames kept</p>
        </div>
      </div>
    ),
  },
  "scroll-progress": { preview: <ScrollProgressDemo /> },
  spotlight: {
    preview: (
      <Spotlight
        size={360}
        className="flex h-full min-h-44 w-full items-center justify-center rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)]"
      >
        <p className="text-sm font-medium text-[var(--lm-fg)]">
          Move your cursor across this surface.
        </p>
      </Spotlight>
    ),
  },
  "spotlight-card": {
    preview: (
      <SpotlightCard className="w-full max-w-xs p-6">
        <h3 className="text-base font-semibold text-[var(--lm-fg)]">
          Hold the light
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          The border brightens and a radial lumen glow trails your cursor
          across the card.
        </p>
      </SpotlightCard>
    ),
  },
  switch: { preview: <SwitchDemo /> },
  "text-reveal": {
    preview: (
      <TextReveal
        className="max-w-sm text-base font-medium leading-relaxed"
        text="Scroll and each word sharpens out of a faint blur, so the sentence comes into focus as you read."
      />
    ),
  },
  "tilt-card": {
    preview: (
      <TiltCard
        glare
        className="w-64 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6"
      >
        <h3 className="text-base font-semibold text-[var(--lm-fg)]">
          Lean in
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          The card tilts toward your cursor in 3D and drifts flat on leave.
        </p>
      </TiltCard>
    ),
  },
  typewriter: {
    preview: (
      <p className="text-xl font-medium text-[var(--lm-fg)]">
        Springs that{" "}
        <Typewriter
          words={["snap.", "drift.", "glide."]}
          className="text-[var(--lm-accent)]"
        />
      </p>
    ),
  },

  /* blocks */
  hero: {
    preview: (
      <BlockPreview scale={0.32}>
        <Hero
          eyebrow="Now in public beta"
          headline="Interfaces that glow"
          subcopy="Quiet surfaces, one glowing accent, springs that settle exactly once."
          avatars={[]}
        />
      </BlockPreview>
    ),
    full: (
      <Hero
        eyebrow="Block demo"
        headline="Compose a landing in an afternoon"
        subcopy="Each word of the headline rises out of a soft blur; the trust row settles in last."
        primaryCta={{ label: "Primary action" }}
        secondaryCta={{ label: "Secondary" }}
      />
    ),
  },
  navbar: {
    preview: (
      <BlockPreview scale={0.55}>
        <div className="h-40">
          <Navbar threshold={9999} />
        </div>
      </BlockPreview>
    ),
    full: (
      <div className="w-full overflow-hidden rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]">
        <div style={{ transform: "translate(0)" }} className="relative h-48 bg-[var(--lm-bg)]">
          <Navbar threshold={9999} />
          <p className="px-6 py-10 text-sm text-[var(--lm-fg-faint)]">
            On a real page the bar rides transparent over the hero, then
            settles onto a blurred overlay once you scroll past the threshold.
            On mobile the hamburger morphs into an X with a staggered drawer.
          </p>
        </div>
      </div>
    ),
  },
  features: {
    preview: (
      <BlockPreview scale={0.3}>
        <FeatureBento />
      </BlockPreview>
    ),
    full: <FeatureBento />,
  },
  pricing: {
    preview: (
      <BlockPreview scale={0.28}>
        <Pricing />
      </BlockPreview>
    ),
    full: <Pricing />,
  },
  testimonials: {
    preview: (
      <BlockPreview scale={0.35}>
        <Testimonials />
      </BlockPreview>
    ),
    full: <Testimonials />,
  },
  faq: {
    preview: (
      <BlockPreview scale={0.35}>
        <Faq defaultOpen={0} />
      </BlockPreview>
    ),
    full: <Faq />,
  },
  cta: {
    preview: (
      <BlockPreview scale={0.35}>
        <CtaBanner />
      </BlockPreview>
    ),
    full: <CtaBanner headline="The closing argument" ctaLabel="Press me" />,
  },
  footer: {
    preview: (
      <BlockPreview scale={0.3}>
        <Footer />
      </BlockPreview>
    ),
    full: <Footer />,
  },

  /* ai */
  "chat-widget": {
    preview: <ChatWidgetDemo height={250} />,
    full: <ChatWidgetDemo height={420} />,
  },
  "command-menu": { preview: <CommandMenuDemo /> },
  "selection-toolbar": { preview: <SelectionToolbarDemo /> },
};

export function ComponentDemo({
  slug,
  variant = "preview",
}: {
  slug: string;
  variant?: "preview" | "full";
}) {
  const entry = demos[slug];
  if (!entry) return null;
  return <>{variant === "full" ? (entry.full ?? entry.preview) : entry.preview}</>;
}
