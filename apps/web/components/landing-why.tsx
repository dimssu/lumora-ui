"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandMenu,
  FeatureBento,
  StatsBand,
  useCommandMenu,
  type CommandMenuItem,
  type FeatureItem,
  type StatItem,
} from "@lumora/ui";
import {
  DownloadIcon,
  HeartIcon,
  PlayIcon,
  SearchIcon,
  SparkleIcon,
} from "@lumora/icons";

const features: FeatureItem[] = [
  {
    icon: <PlayIcon />,
    title: "Motion as a system",
    body: "Three named springs — snap, drift, glide — power every hover, reveal, and layout shift in the library. Nothing wobbles twice, nothing fights its neighbor: the whole page moves as one body, and overrides exist only for components whose physics genuinely differ.",
  },
  {
    icon: <DownloadIcon />,
    title: "Own the code",
    body: "The CLI installs components as source into your repo. No black-box package, no styling fights — edit anything, keep everything.",
  },
  {
    icon: <SparkleIcon />,
    title: "AI-native surfaces",
    body: "A ⌘K command menu, a streaming chat widget, and a selection toolbar ship as first-class components, not bolt-ons. Open the palette below to feel one live.",
  },
  {
    icon: <HeartIcon />,
    title: "Accessible by default",
    body: "Keyboard paths, focus rings, aria wiring, and reduced-motion fallbacks are built into every component, not patched on.",
  },
];

const stats: StatItem[] = [
  { value: 60, label: "Live components" },
  { value: 60, label: "Animated icons" },
  { value: 15, label: "Composable blocks" },
  { value: 0, label: "Runtime dependencies" },
];

/**
 * "Why Lumora" — merges the former features, stats, and AI ⌘K sections into one
 * calm slab. The lone lumen accent here is the command-menu trigger; the stat
 * numbers render in --lm-fg so they never compete with it.
 */
export function LandingWhy() {
  const router = useRouter();
  const { open, setOpen, toggle } = useCommandMenu();

  const commandItems: CommandMenuItem[] = React.useMemo(
    () => [
      {
        id: "browse",
        label: "Browse components",
        hint: "60 live",
        group: "Navigate",
        onSelect: () => router.push("/components"),
      },
      {
        id: "docs",
        label: "Read the docs",
        hint: "Setup",
        group: "Navigate",
        onSelect: () => router.push("/docs"),
      },
      {
        id: "command-menu",
        label: "Command Menu",
        keywords: ["palette", "search", "cmdk"],
        group: "AI surfaces",
        onSelect: () => router.push("/components/command-menu"),
      },
      {
        id: "chat-widget",
        label: "Chat Widget",
        keywords: ["streaming", "assistant"],
        group: "AI surfaces",
        onSelect: () => router.push("/components/chat-widget"),
      },
      {
        id: "selection-toolbar",
        label: "Selection Toolbar",
        keywords: ["highlight", "actions"],
        group: "AI surfaces",
        onSelect: () => router.push("/components/selection-toolbar"),
      },
    ],
    [router],
  );

  return (
    <section className="py-20">
      <FeatureBento
        className="py-0"
        heading="Built for the unglamorous details"
        subheading="The parts of great interfaces nobody screenshots — handled once, handled well."
        items={features}
      />

      <div className="mx-auto mt-10 flex max-w-6xl justify-center px-4 sm:px-6">
        <button
          type="button"
          onClick={toggle}
          className="group inline-flex items-center gap-3 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-4 py-2 text-sm text-[var(--lm-fg-muted)] outline-none transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
        >
          <SearchIcon size={15} />
          Open the command menu
          <kbd className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-accent-soft)] bg-[var(--lm-accent-soft)] px-1.5 py-0.5 text-[11px] font-medium text-[var(--lm-accent)]">
            ⌘K
          </kbd>
        </button>
      </div>

      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        items={commandItems}
        placeholder="Search components and pages…"
      />

      <StatsBand
        className="py-0 mt-16 text-[var(--lm-fg)]"
        stats={stats}
      />
    </section>
  );
}
