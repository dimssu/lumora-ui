"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface SidebarItem {
  /** Stable identifier used for the active state. */
  id: string;
  label: string;
  /** Leading glyph, sized 20×20 by the item. */
  icon: React.ReactNode;
  /** Renders the item as a link when provided. */
  href?: string;
  /** Renders the item as a button when no `href` is given. */
  onClick?: () => void;
  /** Small count or status pill at the right edge, e.g. "12". */
  badge?: string;
}

export interface SidebarSection {
  /** Optional eyebrow above the section's items. */
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.nav>, "children"> {
  /** Brand slot at the top of the rail. @default the Ondine demo wordmark */
  brand?: React.ReactNode;
  /** Navigation sections in display order. @default two demo sections */
  sections?: SidebarSection[];
  /** Controlled active item id. */
  activeId?: string;
  /** Active item id on mount (uncontrolled). @default first item */
  defaultActiveId?: string;
  /** Called when an item is pressed. */
  onItemSelect?: (item: SidebarItem) => void;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Collapsed on mount (uncontrolled). @default false */
  defaultCollapsed?: boolean;
  /** Called when the collapse toggle is pressed. */
  onCollapsedChange?: (collapsed: boolean) => void;
}

function Glyph({ d }: { d: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={d} />
    </svg>
  );
}

const defaultSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: <Glyph d="M3 3h8v8H3z M13 3h8v8h-8z M3 13h8v8H3z M13 13h8v8h-8z" />,
      },
      {
        id: "activity",
        label: "Activity",
        href: "#activity",
        badge: "12",
        icon: <Glyph d="M22 12h-4l-3 9L9 3l-3 9H2" />,
      },
      {
        id: "reports",
        label: "Reports",
        href: "#reports",
        icon: <Glyph d="M3 3v18h18 M7 15v3 M12 10v8 M17 6v12" />,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        id: "projects",
        label: "Projects",
        href: "#projects",
        icon: (
          <Glyph d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        ),
      },
      {
        id: "members",
        label: "Members",
        href: "#members",
        badge: "New",
        icon: (
          <Glyph d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />
        ),
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
        icon: (
          <Glyph d="M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6" />
        ),
      },
    ],
  },
];

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

/**
 * Dashboard side navigation. The active pill glides between items on a shared
 * layout spring, and the whole rail collapses to icons on a weighty width
 * spring — labels slide out as it narrows, and while collapsed each hovered
 * item floats a small label beside the rail.
 */
export function Sidebar({
  brand,
  sections = defaultSections,
  activeId: activeIdProp,
  defaultActiveId,
  onItemSelect,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
  ...props
}: SidebarProps) {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();

  const firstId = sections[0]?.items[0]?.id;
  const [internalActiveId, setInternalActiveId] = React.useState(
    defaultActiveId ?? firstId,
  );
  const activeId = activeIdProp ?? internalActiveId;

  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultCollapsed);
  const collapsed = collapsedProp ?? internalCollapsed;

  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const setCollapsed = (next: boolean) => {
    if (collapsedProp === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const selectItem = (item: SidebarItem) => {
    if (activeIdProp === undefined) setInternalActiveId(item.id);
    item.onClick?.();
    onItemSelect?.(item);
  };

  const labelTransition = reduceMotion ? { duration: 0 } : springs.snap;

  return (
    <motion.nav
      aria-label="Sidebar"
      initial={false}
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={reduceMotion ? { duration: 0 } : springs.glide}
      className={cn(
        "flex h-full min-h-svh flex-col border-r border-[var(--lm-border)] bg-[var(--lm-surface)] px-3 py-4",
        className,
      )}
      {...props}
    >
      <div className="mb-6 flex h-10 items-center overflow-hidden px-2.5">
        {brand ?? (
          <a
            href="#"
            className="flex items-center text-sm font-semibold tracking-wide text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
          >
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-[var(--lm-accent)] shadow-[0_0_12px_var(--lm-glow)]"
            />
            <motion.span
              animate={
                collapsed ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }
              }
              transition={labelTransition}
              className="ml-3 min-w-0 overflow-hidden whitespace-nowrap"
            >
              Ondine
            </motion.span>
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.title ?? sectionIndex}>
            {section.title && (
              <motion.p
                animate={{ opacity: collapsed ? 0 : 1 }}
                transition={labelTransition}
                className="mb-2 overflow-hidden whitespace-nowrap px-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--lm-fg-faint)]"
              >
                {section.title}
              </motion.p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = item.id === activeId;
                const Tag = item.href ? "a" : "button";
                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Tag
                      href={item.href}
                      type={item.href ? undefined : "button"}
                      aria-current={active ? "page" : undefined}
                      onClick={() => selectItem(item)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      className={cn(
                        "relative flex w-full items-center rounded-[var(--lm-radius)] px-2.5 py-2 text-left text-sm outline-none",
                        "transition-colors duration-[var(--lm-duration-fast)]",
                        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                        active
                          ? "text-[var(--lm-fg)]"
                          : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
                      )}
                    >
                      {active && (
                        <motion.span
                          aria-hidden
                          layoutId={`${uid}-active-pill`}
                          transition={
                            reduceMotion ? { duration: 0 } : springs.snap
                          }
                          className="absolute inset-0 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-accent-soft)]"
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10 shrink-0",
                          active && "text-[var(--lm-accent)]",
                        )}
                      >
                        {item.icon}
                      </span>
                      <motion.span
                        animate={
                          collapsed
                            ? { opacity: 0, x: -8 }
                            : { opacity: 1, x: 0 }
                        }
                        transition={labelTransition}
                        className="relative z-10 ml-3 flex min-w-0 flex-1 items-center justify-between gap-2 overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                        {item.badge && (
                          <span className="shrink-0 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1.5 py-0.5 text-[10px] font-medium leading-none text-[var(--lm-fg-muted)]">
                            {item.badge}
                          </span>
                        )}
                      </motion.span>
                    </Tag>

                    {/* Floating label while collapsed */}
                    <AnimatePresence>
                      {collapsed && hoveredId === item.id && (
                        <motion.span
                          aria-hidden
                          initial={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, x: -6 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          exit={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, x: -6 }
                          }
                          transition={
                            reduceMotion ? { duration: 0 } : springs.drift
                          }
                          className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-2 py-1 text-xs text-[var(--lm-fg)] shadow-[var(--lm-shadow-sm)]"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "mt-6 flex w-full items-center rounded-[var(--lm-radius)] px-2.5 py-2 text-sm text-[var(--lm-fg-muted)] outline-none",
          "transition-colors duration-[var(--lm-duration-fast)] hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
        )}
      >
        <motion.span
          aria-hidden
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : springs.snap}
          className="shrink-0"
        >
          <Glyph d="M15 18l-6-6 6-6" />
        </motion.span>
        <motion.span
          animate={collapsed ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          transition={labelTransition}
          className="ml-3 min-w-0 overflow-hidden whitespace-nowrap"
        >
          Collapse
        </motion.span>
      </button>
    </motion.nav>
  );
}
