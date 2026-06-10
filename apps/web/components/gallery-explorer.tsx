"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input, SegmentedControl, springs } from "@lumora/ui";
import { GalleryTile } from "./gallery-tile";

/** Serializable tile data, computed server-side from the registry. */
export interface GalleryEntry {
  slug: string;
  title: string;
  description: string;
  command: string;
  category: "component" | "block" | "ai";
}

export interface GalleryExplorerProps {
  entries: GalleryEntry[];
  /** Section order plus heading copy, keyed by category. */
  sections: { category: GalleryEntry["category"]; label: string; copy: string }[];
}

type Filter = "all" | GalleryEntry["category"];

const filterItems: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "component", label: "Components" },
  { value: "block", label: "Blocks" },
  { value: "ai", label: "AI" },
];

function matches(entry: GalleryEntry, query: string): boolean {
  if (!query) return true;
  const haystack =
    `${entry.title} ${entry.slug} ${entry.description}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/**
 * Client-side gallery state: a sticky toolbar with category chips (gliding
 * pill via SegmentedControl) and a type-to-filter search. Tiles enter and
 * leave through AnimatePresence layout so filtering feels physical. With
 * "All" and an empty query this renders the same grouped layout the page
 * always had.
 */
export function GalleryExplorer({ entries, sections }: GalleryExplorerProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query.trim());

  const visible = React.useMemo(
    () =>
      entries.filter(
        (entry) =>
          (filter === "all" || entry.category === filter) &&
          matches(entry, deferredQuery),
      ),
    [entries, filter, deferredQuery],
  );

  const pristine = filter === "all" && deferredQuery === "";

  const tile = (entry: GalleryEntry) => (
    <motion.div
      key={entry.slug}
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={springs.drift}
    >
      <GalleryTile
        slug={entry.slug}
        title={entry.title}
        description={entry.description}
        command={entry.command}
      />
    </motion.div>
  );

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 mt-10 px-4 sm:-mx-6 sm:px-6">
        <div className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-overlay)] p-3 shadow-[var(--lm-shadow-sm)] backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SegmentedControl
              aria-label="Filter by category"
              items={filterItems}
              value={filter}
              onValueChange={(value) => setFilter(value as Filter)}
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <Input
                label="Search components"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
            </div>
            <p
              aria-live="polite"
              className="shrink-0 text-xs tabular-nums text-[var(--lm-fg-muted)]"
            >
              {pristine
                ? `${entries.length} components`
                : `${visible.length} of ${entries.length}`}
            </p>
          </div>
        </div>
      </div>

      {sections.map(({ category, label, copy }) => {
        const items = visible.filter((entry) => entry.category === category);
        if (items.length === 0) return null;
        return (
          <section
            key={category}
            aria-labelledby={`section-${category}`}
            className="mt-16"
          >
            <div className="flex items-baseline gap-3">
              <h2
                id={`section-${category}`}
                className="text-xl font-semibold text-[var(--lm-fg)]"
              >
                {label}
              </h2>
              {!pristine && (
                <span className="text-xs tabular-nums text-[var(--lm-fg-faint)]">
                  {items.length}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-[var(--lm-fg-muted)]">{copy}</p>
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map(tile)}
              </AnimatePresence>
            </div>
          </section>
        );
      })}

      {visible.length === 0 && (
        <div className="mt-20 rounded-[var(--lm-radius-lg)] border border-dashed border-[var(--lm-border-strong)] px-6 py-16 text-center">
          <p className="text-base font-medium text-[var(--lm-fg)]">
            Nothing matches “{deferredQuery}”
          </p>
          <p className="mt-2 text-sm text-[var(--lm-fg-muted)]">
            Try a different word, or{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="rounded-[var(--lm-radius-sm)] font-medium text-[var(--lm-accent)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
            >
              clear the filters
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
}
