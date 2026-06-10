"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface TopbarMenuItem {
  label: string;
  onClick?: () => void;
  /** Renders the item in the negative tone, e.g. for sign out. */
  danger?: boolean;
}

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Left slot for a breadcrumb or page title. @default a demo breadcrumb */
  leading?: React.ReactNode;
  /** Placeholder text inside the search button. @default "Search…" */
  searchHint?: string;
  /** Keyboard hint rendered like a keycap. @default "⌘K" */
  searchShortcut?: string;
  /** Called when the search button is pressed. */
  onSearchClick?: () => void;
  /** Right-side slot for icon buttons, rendered before the avatar. */
  actions?: React.ReactNode;
  /** Display name behind the avatar initials. @default "Maren Voss" */
  userName?: string;
  /** Secondary line in the menu header, e.g. an email. */
  userDetail?: string;
  /** Dropdown entries under the avatar. @default profile/preferences/sign out */
  menuItems?: TopbarMenuItem[];
  /** Called when any dropdown entry is selected. */
  onMenuItemSelect?: (item: TopbarMenuItem) => void;
}

const defaultMenuItems: TopbarMenuItem[] = [
  { label: "Profile" },
  { label: "Preferences" },
  { label: "Sign out", danger: true },
];

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Dashboard top bar. The centred search affordance is a button dressed as an
 * input with a keycap hint, and the avatar opens a menu that drifts in on a
 * soft spring — Escape, outside clicks, and arrow keys all behave like a
 * native menu.
 */
export function Topbar({
  leading,
  searchHint = "Search…",
  searchShortcut = "⌘K",
  onSearchClick,
  actions,
  userName = "Maren Voss",
  userDetail = "maren@ondine.app",
  menuItems = defaultMenuItems,
  onMenuItemSelect,
  className,
  ...props
}: TopbarProps) {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const menuId = `${uid}-menu`;

  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Close on outside pointer presses.
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Move focus into the menu once it opens.
  React.useEffect(() => {
    if (open) itemRefs.current[0]?.focus();
  }, [open]);

  const closeAndRefocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean);
    const index = items.findIndex((el) => el === document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRefocus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const selectMenuItem = (item: TopbarMenuItem) => {
    closeAndRefocus();
    item.onClick?.();
    onMenuItemSelect?.(item);
  };

  return (
    <header
      className={cn(
        "flex h-16 w-full items-center gap-4 border-b border-[var(--lm-border)] bg-[var(--lm-bg)] px-4 sm:px-6",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center">
        {leading ?? (
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2 text-sm">
              <li className="hidden text-[var(--lm-fg-faint)] sm:block">
                Ondine
              </li>
              <li aria-hidden className="hidden text-[var(--lm-fg-faint)] sm:block">
                /
              </li>
              <li className="truncate font-medium text-[var(--lm-fg)]">
                Overview
              </li>
            </ol>
          </nav>
        )}
      </div>

      {/* Search affordance */}
      <button
        type="button"
        onClick={onSearchClick}
        className={cn(
          "flex h-9 w-full max-w-[260px] items-center gap-2 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-3 text-sm text-[var(--lm-fg-faint)] outline-none",
          "transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg-muted)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
        )}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="h-4 w-4 shrink-0"
        >
          <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
        </svg>
        <span className="flex-1 truncate text-left">{searchHint}</span>
        <span
          aria-hidden
          className="hidden rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1.5 py-0.5 text-[10px] font-medium leading-none text-[var(--lm-fg-muted)] sm:block"
        >
          {searchShortcut}
        </span>
      </button>

      <div className="flex flex-1 items-center justify-end gap-1">
        {actions}

        {/* Avatar + menu */}
        <div ref={containerRef} className="relative ml-1">
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            aria-label={`Account menu for ${userName}`}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && !open) {
                event.preventDefault();
                setOpen(true);
              }
            }}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-xs font-semibold text-[var(--lm-fg)] outline-none",
              "transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
            )}
          >
            {initialsOf(userName)}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                id={menuId}
                role="menu"
                aria-label={userName}
                onKeyDown={onMenuKeyDown}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, scale: 0.97 }
                }
                transition={reduceMotion ? { duration: 0 } : springs.drift}
                className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-1 shadow-[var(--lm-shadow)]"
              >
                <div className="border-b border-[var(--lm-border)] px-3 py-2.5">
                  <p className="text-sm font-medium text-[var(--lm-fg)]">
                    {userName}
                  </p>
                  {userDetail && (
                    <p className="mt-0.5 truncate text-xs text-[var(--lm-fg-faint)]">
                      {userDetail}
                    </p>
                  )}
                </div>
                <div className="pt-1">
                  {menuItems.map((item, i) => (
                    <button
                      key={item.label}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      type="button"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => selectMenuItem(item)}
                      className={cn(
                        "flex w-full items-center rounded-[var(--lm-radius-sm)] px-3 py-2 text-left text-sm outline-none",
                        "transition-colors duration-[var(--lm-duration-fast)]",
                        item.danger
                          ? "text-[var(--lm-negative)] hover:bg-[var(--lm-surface-2)] focus-visible:bg-[var(--lm-surface-2)]"
                          : "text-[var(--lm-fg-muted)] hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)] focus-visible:bg-[var(--lm-surface-2)] focus-visible:text-[var(--lm-fg)]",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
