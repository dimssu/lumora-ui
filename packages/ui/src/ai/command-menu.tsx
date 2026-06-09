"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface CommandMenuItem {
  /** Stable identifier, also used for `aria-activedescendant`. */
  id: string;
  label: string;
  /** Secondary text rendered right-aligned (shortcut, route, etc.). */
  hint?: string;
  /** Extra strings the fuzzy matcher may hit besides the label. */
  keywords?: string[];
  /** Section header the item is listed under. @default "Commands" */
  group?: string;
  onSelect: () => void;
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandMenuItem[];
  /** @default "Type a command or search…" */
  placeholder?: string;
  /** @default "No results found." */
  emptyMessage?: string;
}

/* ── fuzzy matching ─────────────────────────────────────────── */

interface FuzzyResult {
  score: number;
  /** Character indices of the haystack that matched (for highlighting). */
  indices: number[];
}

/**
 * Subsequence match with light scoring: consecutive runs and word starts
 * score up, gaps score down. Returns null when the query is not a
 * subsequence of the text.
 */
function fuzzyMatch(query: string, text: string): FuzzyResult | null {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return { score: 0, indices: [] };

  const indices: number[] = [];
  let score = 0;
  let searchFrom = 0;
  let lastMatch = -2;

  for (let qi = 0; qi < q.length; qi++) {
    const ch = q.charAt(qi);
    const found = t.indexOf(ch, searchFrom);
    if (found === -1) return null;

    score += 1;
    if (found === lastMatch + 1) score += 3; // consecutive run
    const prev = found === 0 ? " " : t.charAt(found - 1);
    if (prev === " " || prev === "-" || prev === "/") score += 2; // word start
    score -= Math.min(found - searchFrom, 5) * 0.25; // gap penalty

    indices.push(found);
    lastMatch = found;
    searchFrom = found + 1;
  }
  return { score, indices };
}

interface ScoredItem {
  item: CommandMenuItem;
  score: number;
  indices: number[];
}

function scoreItem(query: string, item: CommandMenuItem): ScoredItem | null {
  const labelMatch = fuzzyMatch(query, item.label);
  let best: ScoredItem | null = labelMatch
    ? { item, score: labelMatch.score + 2, indices: labelMatch.indices }
    : null;
  for (const keyword of item.keywords ?? []) {
    const match = fuzzyMatch(query, keyword);
    if (match && (!best || match.score > best.score)) {
      // Keyword hits rank the item but only label hits get highlighted.
      best = { item, score: match.score, indices: labelMatch?.indices ?? [] };
    }
  }
  return best;
}

/* ── highlight ──────────────────────────────────────────────── */

function Highlight({ text, indices }: { text: string; indices: number[] }) {
  if (indices.length === 0) return <>{text}</>;
  const matched = new Set(indices);
  return (
    <>
      {Array.from(text).map((char, i) =>
        matched.has(i) ? (
          <span key={i} className="font-semibold text-[var(--lm-accent)]">
            {char}
          </span>
        ) : (
          <React.Fragment key={i}>{char}</React.Fragment>
        ),
      )}
    </>
  );
}

/* ── hook ───────────────────────────────────────────────────── */

/**
 * Owns the open state of a `CommandMenu` and binds the global ⌘K / Ctrl-K
 * toggle. Spread `open` and `setOpen` straight onto the menu.
 */
export function useCommandMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggle = React.useCallback(() => setOpen((prev) => !prev), []);
  return { open, setOpen, toggle };
}

/* ── component ──────────────────────────────────────────────── */

/**
 * ⌘K command palette: a centered panel drifts in over a dimmed overlay,
 * fuzzy-filters items as you type, and is fully drivable from the keyboard —
 * arrows move the active row, Enter runs it, Escape closes.
 */
export function CommandMenu({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
}: CommandMenuProps) {
  const reduceMotion = useReducedMotion();
  const baseId = React.useId();
  const listId = `${baseId}-list`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => setMounted(true), []);

  // Focus the input on open, restore focus on close, reset state.
  React.useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      restoreFocusRef.current?.focus?.();
      restoreFocusRef.current = null;
    }
  }, [open]);

  const results = React.useMemo(() => {
    const q = query.trim();
    const scored: ScoredItem[] = [];
    for (const item of items) {
      const match = scoreItem(q, item);
      if (match) scored.push(match);
    }
    if (q) scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [items, query]);

  const groups = React.useMemo(() => {
    const map = new Map<string, ScoredItem[]>();
    for (const result of results) {
      const name = result.item.group ?? "Commands";
      const bucket = map.get(name);
      if (bucket) bucket.push(result);
      else map.set(name, [result]);
    }
    return [...map.entries()];
  }, [results]);

  // Flat list in render order, for arrow-key navigation.
  const flat = React.useMemo(
    () => groups.flatMap(([, groupItems]) => groupItems),
    [groups],
  );

  React.useEffect(() => setActiveIndex(0), [query]);

  const active = flat[activeIndex];
  const activeId = active ? `${baseId}-opt-${active.item.id}` : undefined;

  React.useEffect(() => {
    if (activeId) {
      document
        .getElementById(activeId)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeId]);

  const select = (item: CommandMenuItem) => {
    onOpenChange(false);
    item.onSelect();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => (flat.length ? (i + 1) % flat.length : 0));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) =>
          flat.length ? (i - 1 + flat.length) % flat.length : 0,
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(Math.max(flat.length - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (active) select(active.item);
        break;
      case "Escape":
        event.preventDefault();
        onOpenChange(false);
        break;
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[var(--lm-overlay)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -16, scale: 0.98 }
            }
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }
            }
            transition={springs.drift}
            className={cn(
              "relative flex w-full max-w-lg flex-col overflow-hidden",
              "rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]",
              "bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
            )}
          >
            <input
              ref={inputRef}
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-label="Search commands"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              autoComplete="off"
              spellCheck={false}
              className={cn(
                "h-12 w-full bg-transparent px-4 text-sm outline-none",
                "border-b border-[var(--lm-border)]",
                "text-[var(--lm-fg)] placeholder:text-[var(--lm-fg-faint)]",
              )}
            />

            <div
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="max-h-[40vh] overflow-y-auto p-1.5"
            >
              {flat.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-[var(--lm-fg-muted)]">
                  {emptyMessage}
                </p>
              )}
              {groups.map(([groupName, groupItems]) => (
                <div key={groupName} role="group" aria-label={groupName}>
                  <p
                    aria-hidden
                    className="px-2.5 pb-1 pt-2.5 text-[10px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]"
                  >
                    {groupName}
                  </p>
                  {groupItems.map((result) => {
                    const isActive = active?.item.id === result.item.id;
                    return (
                      <div
                        key={result.item.id}
                        id={`${baseId}-opt-${result.item.id}`}
                        role="option"
                        aria-selected={isActive}
                        onPointerMove={() => {
                          const index = flat.indexOf(result);
                          if (index !== -1) setActiveIndex(index);
                        }}
                        onClick={() => select(result.item)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3",
                          "rounded-[var(--lm-radius-sm)] px-2.5 py-2 text-sm",
                          isActive
                            ? "bg-[var(--lm-surface-2)] text-[var(--lm-fg)]"
                            : "text-[var(--lm-fg-muted)]",
                        )}
                      >
                        <span className="truncate">
                          <Highlight
                            text={result.item.label}
                            indices={result.indices}
                          />
                        </span>
                        {result.item.hint && (
                          <span className="shrink-0 text-xs text-[var(--lm-fg-faint)]">
                            {result.item.hint}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              aria-hidden
              className="flex items-center gap-4 border-t border-[var(--lm-border)] px-4 py-2 text-[11px] text-[var(--lm-fg-faint)]"
            >
              <span className="flex items-center gap-1">
                <kbd className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1 py-0.5">
                  ↑↓
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1 py-0.5">
                  ↵
                </kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1 py-0.5">
                  esc
                </kbd>
                close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
