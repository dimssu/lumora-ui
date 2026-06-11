"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  Alert,
  AnimatedTabs,
  AnimatedTooltip,
  AnnouncementBar,
  AuroraBackground,
  AuthForm,
  Avatar,
  AvatarGroup,
  Badge,
  BeamGrid,
  BorderBeam,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  Changelog,
  ChatWidget,
  Checkbox,
  CommandMenu,
  CtaBanner,
  CursorTrail,
  Dialog,
  Dock,
  DockItem,
  Drawer,
  DropdownMenu,
  ElasticStack,
  Faq,
  FeatureBento,
  FileDropzone,
  FlipText,
  Folder,
  Footer,
  GlitchText,
  GradientText,
  Hero,
  HoverLink,
  Input,
  Kbd,
  LogoStrip,
  MagneticZone,
  Marquee,
  MorphText,
  Navbar,
  NumberTicker,
  OtpInput,
  Pagination,
  Popover,
  Pricing,
  Progress,
  RadioGroup,
  RadioItem,
  Rating,
  RevealList,
  ScrollProgress,
  SegmentedControl,
  Select,
  SelectionToolbar,
  Separator,
  Sidebar,
  Skeleton,
  Slider,
  Spinner,
  Spotlight,
  SpotlightCard,
  StatsBand,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TeamGrid,
  Testimonials,
  Textarea,
  TextReveal,
  TiltCard,
  Timeline,
  Toaster,
  ToggleGroup,
  Tooltip,
  Topbar,
  Typewriter,
  cn,
  toast,
  type CommandMenuItem,
  type SortDirection,
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

/**
 * Tiny token-tinted gradient SVG encoded as a data URI, so image-driven
 * demos (cursor trail, reveal list) work fully offline.
 */
function placeholderImage(from: string, to: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="448" height="320"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="448" height="320" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Lumen golds, dusk violets and quiet surfaces from the token palette. */
const previewImages = [
  placeholderImage("#dcc28a", "#17171c"),
  placeholderImage("#9a8bd0", "#101014"),
  placeholderImage("#17171c", "#dcc28a"),
  placeholderImage("#101014", "#9a8bd0"),
];

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

function ToastDemo() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast({
              title: "Draft saved",
              description: "Synced to your workspace just now.",
            })
          }
        >
          Default
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast({ title: "Deploy complete", variant: "positive" })}
        >
          Positive
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast({
              title: "Connection lost",
              variant: "negative",
              action: { label: "Retry", onClick: () => {} },
            })
          }
        >
          Negative
        </Button>
      </div>
      {/* Toaster portals to document.body, so toasts stack at the
          viewport's bottom-right corner rather than inside this tile. */}
      <Toaster />
    </>
  );
}

function SliderDemo() {
  const [glow, setGlow] = React.useState(40);
  return (
    <div className="w-full max-w-xs">
      <Slider
        value={glow}
        onValueChange={setGlow}
        bubble
        formatValue={(v) => `${v}%`}
        aria-label="Glow intensity"
      />
      <p className="mt-4 text-xs text-[var(--lm-fg-faint)]">
        Glow intensity — {glow}%. Drag and the bubble rides the thumb.
      </p>
    </div>
  );
}

function ProgressDemo() {
  const [value, setValue] = React.useState(62);
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Progress value={value} gradient aria-label="Render progress" />
      <Progress indeterminate aria-label="Indexing" />
      <Button
        variant="outline"
        size="sm"
        className="self-center"
        onClick={() => setValue(Math.floor(Math.random() * 91) + 5)}
      >
        New value
      </Button>
    </div>
  );
}

function OtpDemo() {
  const [done, setDone] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <OtpInput
        length={4}
        onComplete={() => setDone(true)}
        onChange={(code) => {
          if (code.length < 4) setDone(false);
        }}
      />
      <p aria-live="polite" className="min-h-4 text-xs text-[var(--lm-fg-faint)]">
        {done ? "Code accepted — welcome back." : "Type or paste any 4 digits."}
      </p>
    </div>
  );
}

function RatingDemo() {
  const [stars, setStars] = React.useState(3.5);
  return (
    <div className="flex flex-col items-center gap-2">
      <Rating value={stars} onValueChange={setStars} allowHalf label="Rate the glow" />
      <p className="text-xs text-[var(--lm-fg-faint)]">
        {stars} of 5 — hover sweeps, halves count.
      </p>
    </div>
  );
}

function StepperDemo() {
  const [step, setStep] = React.useState(1);
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Stepper
        steps={[{ label: "Account" }, { label: "Workspace" }, { label: "Invite" }]}
        activeStep={step}
        onStepClick={setStep}
      />
      <div className="flex justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>
        <Button
          variant="accent"
          size="sm"
          disabled={step === 3}
          onClick={() => setStep(step + 1)}
        >
          {step >= 2 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}

function AnnouncementDemo() {
  const [run, setRun] = React.useState(0);
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <AnnouncementBar
        key={run}
        tone="accent"
        link={{ label: "See what changed", href: "#" }}
      >
        Lumora phase two — 20 new components
      </AnnouncementBar>
      <Button variant="ghost" size="sm" onClick={() => setRun((n) => n + 1)}>
        Replay the slide-in
      </Button>
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      {/* The drawer portals to document.body and glides in from the right. */}
      <Drawer open={open} onOpenChange={setOpen} title="Quiet settings">
        <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          The panel glides in over a blurred overlay. Drag it back toward its
          edge — past 30% of its width, or with a flick — and it dismisses.
          Escape and the overlay work too, and focus returns to the trigger.
        </p>
        <div className="mt-5 flex justify-end">
          <Button variant="accent" size="sm" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </Drawer>
    </>
  );
}

function DropdownMenuDemo() {
  const [pinned, setPinned] = React.useState(true);
  return (
    <DropdownMenu
      trigger="Project actions"
      items={[
        { kind: "label", label: "Night shift" },
        { label: "Rename project", onSelect: () => {} },
        { label: "Duplicate", onSelect: () => {} },
        {
          kind: "checkbox",
          label: "Pin to sidebar",
          checked: pinned,
          onCheckedChange: setPinned,
        },
        { kind: "separator" },
        { label: "Delete project", destructive: true, onSelect: () => {} },
      ]}
    />
  );
}

const tableRows = [
  { motion: "Aurora wash", spring: "Drift", uses: 412 },
  { motion: "Dock magnify", spring: "Snap", uses: 388 },
  { motion: "Drawer glide", spring: "Glide", uses: 351 },
  { motion: "Toast settle", spring: "Snap", uses: 274 },
];

function TableDemo() {
  const [direction, setDirection] = React.useState<SortDirection>("desc");
  const rows = [...tableRows].sort((a, b) =>
    direction === "asc" ? a.uses - b.uses : b.uses - a.uses,
  );
  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Motion</TableHead>
            <TableHead>Spring</TableHead>
            <TableHead
              sortable
              sortDirection={direction}
              onSort={setDirection}
            >
              Uses
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.motion}>
              <TableCell>{row.motion}</TableCell>
              <TableCell className="text-[var(--lm-fg-muted)]">
                {row.spring}
              </TableCell>
              <TableCell>{row.uses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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

const carouselSlides = [
  { title: "Snap", copy: "Fast settle, no wobble." },
  { title: "Drift", copy: "One gentle breath." },
  { title: "Glide", copy: "Long, weighty, deliberate." },
];

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
  alert: {
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Alert tone="accent" title="Phase three is live">
          Twenty new components just landed in the gallery.
        </Alert>
        <Alert tone="negative" title="Sync interrupted" dismissible>
          Dismiss me — the row collapses as it fades.
        </Alert>
      </div>
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
  announcement: { preview: <AnnouncementDemo /> },
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
  avatar: {
    preview: (
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <Avatar name="Mara Voss" size="lg" status="positive" />
          <Avatar name="Theo Lindqvist" size="lg" shape="square" />
          <Avatar name="Priya Raman" size="lg" status="away" />
        </div>
        <AvatarGroup max={3}>
          <Avatar name="Mara Voss" />
          <Avatar name="Theo Lindqvist" />
          <Avatar name="Priya Raman" />
          <Avatar name="Aiko Tanabe" />
          <Avatar name="Jonas Eriksen" />
        </AvatarGroup>
      </div>
    ),
  },
  badge: {
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Draft</Badge>
        <Badge variant="accent">Beta</Badge>
        <Badge variant="positive" pulse>
          Live
        </Badge>
        <Badge variant="negative" dot>
          Degraded
        </Badge>
        <Badge variant="outline">v2.4.0</Badge>
      </div>
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
  "border-beam": {
    preview: (
      <BorderBeam className="w-full max-w-xs">
        <div className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6">
          <h3 className="text-base font-semibold text-[var(--lm-fg)]">
            Always in transit
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            A lumen head with a fading tail laps the border ring once every
            six seconds — only the ring ever lights up.
          </p>
        </div>
      </BorderBeam>
    ),
  },
  breadcrumbs: {
    preview: (
      <Breadcrumbs
        items={[
          { label: "Ondine", href: "#" },
          { label: "Workspaces", href: "#" },
          { label: "Night shift", href: "#" },
          { label: "Lighting", href: "#" },
          { label: "Lumen curve" },
        ]}
      />
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
  card: {
    preview: (
      <Card variant="lift" className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Night shift</CardTitle>
          <Badge variant="accent" size="sm">
            New
          </Badge>
        </CardHeader>
        <CardBody>
          Hover the card — the lift variant raises it 2px on a deeper shadow.
        </CardBody>
        <CardFooter>
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
          <Button variant="accent" size="sm">
            Enable
          </Button>
        </CardFooter>
      </Card>
    ),
  },
  carousel: {
    preview: (
      <Carousel className="w-full max-w-xs" aria-label="The three springs">
        {carouselSlides.map((slide) => (
          <div
            key={slide.title}
            className="flex h-28 flex-col items-center justify-center rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-4"
          >
            <p className="text-base font-semibold text-[var(--lm-fg)]">
              {slide.title}
            </p>
            <p className="mt-1 text-xs text-[var(--lm-fg-muted)]">{slide.copy}</p>
          </div>
        ))}
      </Carousel>
    ),
  },
  checkbox: {
    preview: (
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Checkbox
          defaultChecked
          label="Ambient previews"
          description="Play hover motion inside gallery tiles."
        />
        <Checkbox label="Monthly digest" />
        <Checkbox
          indeterminate
          label="Workspace access"
          description="3 of 7 members selected."
        />
      </div>
    ),
  },
  "cursor-trail": {
    preview: (
      <CursorTrail
        images={previewImages}
        className="flex h-full min-h-44 w-full items-center justify-center rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-bg)]"
      >
        <p className="text-sm font-medium text-[var(--lm-fg)]">
          Sweep your cursor across this surface.
        </p>
      </CursorTrail>
    ),
  },
  dialog: { preview: <DialogDemo /> },
  dock: { preview: <DockDemo /> },
  drawer: { preview: <DrawerDemo /> },
  "dropdown-menu": { preview: <DropdownMenuDemo /> },
  "elastic-stack": {
    preview: (
      <ElasticStack className="h-44 w-56" aria-label="The three springs">
        {carouselSlides.map((slide) => (
          <div
            key={slide.title}
            className="flex h-full w-full flex-col items-center justify-center rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-4 text-center"
          >
            <p className="text-base font-semibold text-[var(--lm-fg)]">
              {slide.title}
            </p>
            <p className="mt-1 text-xs text-[var(--lm-fg-muted)]">
              {slide.copy}
            </p>
          </div>
        ))}
      </ElasticStack>
    ),
  },
  "file-dropzone": {
    preview: (
      <FileDropzone
        multiple
        className="w-full max-w-xs"
        label="Drop files here, or click to browse"
      />
    ),
  },
  "flip-text": {
    preview: (
      <p className="text-xl font-medium text-[var(--lm-fg)]">
        Built to{" "}
        <FlipText
          words={["launch.", "iterate.", "endure."]}
          className="text-[var(--lm-accent)]"
        />
      </p>
    ),
  },
  folder: {
    preview: (
      <Folder
        label="Night shift assets"
        items={[
          <span
            key="a"
            className="block h-12 w-10 rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-gradient-to-br from-[var(--lm-accent-soft)] to-[var(--lm-surface-2)]"
          />,
          <span
            key="b"
            className="block h-12 w-10 rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-gradient-to-br from-[var(--lm-surface-2)] to-[var(--lm-accent-soft)]"
          />,
          <span
            key="c"
            className="block h-12 w-10 rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)]"
          />,
        ]}
      />
    ),
  },
  "glitch-text": {
    preview: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-semibold tracking-tight text-[var(--lm-fg)]">
          <GlitchText>SIGNAL RESTORED</GlitchText>
        </p>
        <p className="text-xs text-[var(--lm-fg-faint)]">
          Hover the words — they tear for 350ms, then settle clean.
        </p>
      </div>
    ),
  },
  "gradient-text": {
    preview: (
      <p className="text-2xl font-semibold">
        <GradientText>Interfaces that glow</GradientText>
      </p>
    ),
  },
  "hover-link": {
    preview: (
      <div className="flex flex-col items-start gap-4 text-sm">
        <HoverLink href="#" variant="slide">
          Slide — in from the left, out to the right
        </HoverLink>
        <HoverLink href="#" variant="center">
          Center — blooms from the middle
        </HoverLink>
        <HoverLink href="#" variant="draw" arrow>
          Draw — overshoots, then settles
        </HoverLink>
      </div>
    ),
  },
  input: {
    preview: (
      <div className="w-full max-w-xs">
        <Input label="Work email" type="email" autoComplete="email" />
      </div>
    ),
  },
  kbd: {
    preview: (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Kbd combo="mod+k" listen />
          <Kbd combo="shift+enter" listen />
          <Kbd>?</Kbd>
        </div>
        <p className="text-xs text-[var(--lm-fg-faint)]">
          Press the real combo — the cap sinks with it.
        </p>
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
  "morph-text": {
    preview: (
      <p className="text-xl font-medium text-[var(--lm-fg)]">
        Designed for{" "}
        <MorphText
          words={["clarity", "quiet", "focus"]}
          className="text-[var(--lm-accent)]"
        />
      </p>
    ),
  },
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
  "otp-input": { preview: <OtpDemo /> },
  pagination: {
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Pagination count={12} defaultPage={4} aria-label="Demo pages" />
        <p className="text-xs text-[var(--lm-fg-faint)]">
          The pill glides between numbers; long ranges fold into ellipses.
        </p>
      </div>
    ),
  },
  popover: {
    preview: (
      <Popover trigger="Share project">
        <p className="text-sm font-medium text-[var(--lm-fg)]">Invite by link</p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--lm-fg-muted)]">
          Anyone with the link can view. The panel breathes out of its anchor
          side and flips when space runs short.
        </p>
      </Popover>
    ),
  },
  progress: { preview: <ProgressDemo /> },
  "radio-group": {
    preview: (
      <RadioGroup
        defaultValue="drift"
        aria-label="Pick a spring"
        className="w-full max-w-xs"
      >
        <RadioItem value="snap" description="Fast settle, no wobble.">
          Snap
        </RadioItem>
        <RadioItem value="drift" description="One gentle breath.">
          Drift
        </RadioItem>
        <RadioItem value="glide" description="Long, weighty, deliberate.">
          Glide
        </RadioItem>
      </RadioGroup>
    ),
  },
  rating: { preview: <RatingDemo /> },
  "reveal-list": {
    preview: (
      <RevealList
        className="w-full max-w-sm"
        items={[
          { title: "Nocturne", meta: "2026", src: previewImages[0]! },
          { title: "Halflight", meta: "2025", src: previewImages[1]! },
          { title: "Ondine", meta: "2024", src: previewImages[2]! },
        ]}
      />
    ),
  },
  "scroll-progress": { preview: <ScrollProgressDemo /> },
  "segmented-control": {
    preview: (
      <SegmentedControl
        defaultValue="board"
        items={[
          { value: "list", label: "List" },
          { value: "board", label: "Board" },
          { value: "timeline", label: "Timeline" },
        ]}
      />
    ),
  },
  select: {
    preview: (
      <div className="w-full max-w-[220px]">
        <Select
          placeholder="Pick a spring"
          options={[
            { value: "snap", label: "Snap — fast settle" },
            { value: "drift", label: "Drift — one breath" },
            { value: "glide", label: "Glide — long and weighty" },
          ]}
        />
      </div>
    ),
  },
  separator: {
    preview: (
      <div className="w-full max-w-xs text-sm text-[var(--lm-fg-muted)]">
        <p>Both ends fade to nothing,</p>
        <Separator className="my-4" />
        <p>so the rule never cuts a hard edge.</p>
        <Separator label="or" className="my-4" />
        <p>A chip label can sit at the center.</p>
      </div>
    ),
  },
  skeleton: {
    preview: (
      <div className="flex w-full max-w-xs items-start gap-4">
        <Skeleton className="h-10 w-10 shrink-0 rounded-[var(--lm-radius-full)]" />
        <Skeleton lines={3} />
      </div>
    ),
  },
  slider: { preview: <SliderDemo /> },
  spinner: {
    preview: (
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <Spinner variant="orbit" size="lg" label="Loading, orbit style" />
          <span className="text-xs text-[var(--lm-fg-faint)]">orbit</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Spinner variant="pulse" size="lg" label="Loading, pulse style" />
          <span className="text-xs text-[var(--lm-fg-faint)]">pulse</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Spinner variant="bars" size="lg" label="Loading, bars style" />
          <span className="text-xs text-[var(--lm-fg-faint)]">bars</span>
        </div>
      </div>
    ),
  },
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
  stepper: { preview: <StepperDemo /> },
  switch: { preview: <SwitchDemo /> },
  table: { preview: <TableDemo /> },
  textarea: {
    preview: (
      <div className="w-full max-w-xs">
        <Textarea label="Release notes" maxRows={5} />
        <p className="mt-3 text-xs text-[var(--lm-fg-faint)]">
          Type a few lines — the field grows with you, capped at five rows.
        </p>
      </div>
    ),
  },
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
  timeline: {
    preview: (
      <Timeline
        className="w-full max-w-xs"
        items={[
          {
            title: "Beam shipped",
            time: "Just now",
            body: "v2.4 rolls out to every workspace.",
          },
          {
            title: "Dock magnified",
            time: "2d ago",
            body: "Cursor-distance scaling lands.",
          },
          {
            title: "First lumen",
            time: "May 2026",
            body: "The accent finds its glow.",
          },
        ]}
      />
    ),
  },
  toast: { preview: <ToastDemo /> },
  "toggle-group": {
    preview: (
      <div className="flex flex-col items-center gap-4">
        <ToggleGroup
          defaultValue="center"
          aria-label="Alignment"
          items={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]}
        />
        <ToggleGroup
          type="multiple"
          size="sm"
          defaultValue={["grid"]}
          aria-label="Canvas helpers"
          items={[
            { value: "grid", label: "Grid" },
            { value: "rulers", label: "Rulers" },
            { value: "guides", label: "Guides" },
          ]}
        />
      </div>
    ),
  },
  tooltip: {
    preview: (
      <Tooltip content="Drifts in after 300ms, leaning toward its anchor.">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
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
  sidebar: {
    preview: (
      <BlockPreview scale={0.45}>
        <div className="h-[560px]">
          <Sidebar className="min-h-0" />
        </div>
      </BlockPreview>
    ),
    full: (
      <div className="w-full overflow-hidden rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]">
        <div className="flex h-[480px] bg-[var(--lm-bg)]">
          <Sidebar className="min-h-0" />
          <p className="flex-1 px-6 py-8 text-sm text-[var(--lm-fg-faint)]">
            Click items to move the active pill, then press the chevron at the
            bottom — the rail narrows to icons and labels fade out, with
            tooltips taking over.
          </p>
        </div>
      </div>
    ),
  },
  topbar: {
    preview: (
      <BlockPreview scale={0.55}>
        <div className="h-44">
          <Topbar />
        </div>
      </BlockPreview>
    ),
    full: (
      <div className="w-full overflow-hidden rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]">
        <div className="h-64 bg-[var(--lm-bg)]">
          <Topbar />
          <p className="px-6 py-8 text-sm text-[var(--lm-fg-faint)]">
            Open the avatar menu — entries cascade in and arrow keys walk them.
            Wire onSearchClick to your command palette.
          </p>
        </div>
      </div>
    ),
  },
  "auth-form": {
    preview: (
      <BlockPreview scale={0.35}>
        <AuthForm />
      </BlockPreview>
    ),
    full: <AuthForm />,
  },
  stats: {
    preview: (
      <BlockPreview scale={0.35}>
        <StatsBand />
      </BlockPreview>
    ),
    full: <StatsBand />,
  },
  team: {
    preview: (
      <BlockPreview scale={0.3}>
        <TeamGrid />
      </BlockPreview>
    ),
    full: <TeamGrid />,
  },
  changelog: {
    preview: (
      <BlockPreview scale={0.3}>
        <Changelog />
      </BlockPreview>
    ),
    full: <Changelog />,
  },
  "logo-strip": {
    preview: (
      <BlockPreview scale={0.45}>
        <LogoStrip />
      </BlockPreview>
    ),
    full: <LogoStrip />,
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
