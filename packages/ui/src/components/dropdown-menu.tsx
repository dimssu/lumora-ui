"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface DropdownMenuActionItem {
  kind?: "item";
  label: React.ReactNode;
  /** Plain-text form of the label for typeahead when `label` is not a string. */
  textValue?: string;
  icon?: React.ReactNode;
  /** Paint the item in the negative tone for irreversible actions. */
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuCheckboxItem {
  kind: "checkbox";
  label: React.ReactNode;
  textValue?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface DropdownMenuSeparatorItem {
  kind: "separator";
}

export interface DropdownMenuLabelItem {
  kind: "label";
  label: React.ReactNode;
}

export type DropdownMenuEntry =
  | DropdownMenuActionItem
  | DropdownMenuCheckboxItem
  | DropdownMenuSeparatorItem
  | DropdownMenuLabelItem;

export interface DropdownMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Content of the trigger button. */
  trigger: React.ReactNode;
  items: DropdownMenuEntry[];
  /** Edge of the trigger the menu aligns to. @default "start" */
  align?: "start" | "end";
  disabled?: boolean;
}

const isInteractive = (
  entry: DropdownMenuEntry,
): entry is DropdownMenuActionItem | DropdownMenuCheckboxItem =>
  (entry.kind === undefined || entry.kind === "item" || entry.kind === "checkbox") &&
  !entry.disabled;

const textOf = (
  entry: DropdownMenuActionItem | DropdownMenuCheckboxItem,
): string =>
  entry.textValue ?? (typeof entry.label === "string" ? entry.label : "");

/**
 * Anchored action menu: it drifts open with a slight scale while items
 * cascade in at 12ms intervals, flipping above the trigger when the
 * viewport runs out. Arrows, Home/End, typeahead and Enter drive it from
 * the keyboard; Escape and outside clicks close it and focus returns to
 * the trigger. Checkbox items draw their check stroke in.
 */
export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, items, align = "start", disabled, className, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const baseId = React.useId();
    const menuId = `${baseId}-menu`;

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef(new Map<number, HTMLDivElement>());
    const typeahead = React.useRef({ query: "", at: 0 });

    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<number>(-1);
    const [placement, setPlacement] = React.useState<"bottom" | "top">("bottom");

    const interactiveIndexes = items
      .map((entry, index) => (isInteractive(entry) ? index : -1))
      .filter((index) => index !== -1);

    const close = React.useCallback(
      (restoreFocus: boolean) => {
        setOpen(false);
        if (restoreFocus) triggerRef.current?.focus();
      },
      [],
    );

    const openMenu = () => {
      if (disabled) return;
      setActive(interactiveIndexes[0] ?? -1);
      setPlacement("bottom");
      setOpen(true);
    };

    const moveActive = (delta: 1 | -1) => {
      if (interactiveIndexes.length === 0) return;
      const at = interactiveIndexes.indexOf(active);
      const next =
        at === -1
          ? interactiveIndexes[delta === 1 ? 0 : interactiveIndexes.length - 1]
          : interactiveIndexes[
              (at + delta + interactiveIndexes.length) % interactiveIndexes.length
            ];
      if (next !== undefined) setActive(next);
    };

    const activate = (index: number) => {
      const entry = items[index];
      if (!entry || !isInteractive(entry)) return;
      if (entry.kind === "checkbox") {
        entry.onCheckedChange?.(!entry.checked);
        return; // checkbox items keep the menu open
      }
      entry.onSelect?.();
      close(true);
    };

    const handleTypeahead = (key: string) => {
      const now = Date.now();
      const state = typeahead.current;
      state.query = (now - state.at > 500 ? "" : state.query) + key.toLowerCase();
      state.at = now;
      const match = interactiveIndexes.find((index) => {
        const entry = items[index];
        return (
          entry !== undefined &&
          isInteractive(entry) &&
          textOf(entry).toLowerCase().startsWith(state.query)
        );
      });
      if (match !== undefined) setActive(match);
    };

    const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          moveActive(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          moveActive(-1);
          break;
        case "Home":
          event.preventDefault();
          if (interactiveIndexes[0] !== undefined)
            setActive(interactiveIndexes[0]);
          break;
        case "End": {
          event.preventDefault();
          const last = interactiveIndexes[interactiveIndexes.length - 1];
          if (last !== undefined) setActive(last);
          break;
        }
        case "Enter":
        case " ":
          event.preventDefault();
          if (active !== -1) activate(active);
          break;
        case "Escape":
          event.preventDefault();
          close(true);
          break;
        case "Tab":
          close(false);
          break;
        default:
          if (event.key.length === 1) handleTypeahead(event.key);
      }
    };

    const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (open) return;
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
    };

    // Move focus into the menu and flip vertically if the viewport clips it.
    React.useLayoutEffect(() => {
      if (!open) return;
      const menu = menuRef.current;
      const anchor = triggerRef.current;
      if (menu && anchor) {
        const rect = anchor.getBoundingClientRect();
        const overflowsBelow =
          rect.bottom + 8 + menu.offsetHeight > window.innerHeight;
        const fitsAbove = rect.top - 8 - menu.offsetHeight > 0;
        setPlacement(overflowsBelow && fitsAbove ? "top" : "bottom");
      }
      const frame = requestAnimationFrame(() => menuRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }, [open]);

    React.useEffect(() => {
      if (!open) return;
      const onPointerDown = (e: PointerEvent) => {
        if (e.target instanceof Node && !wrapperRef.current?.contains(e.target)) {
          close(false);
        }
      };
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open, close]);

    React.useEffect(() => {
      if (open && active !== -1) {
        itemRefs.current.get(active)?.scrollIntoView({ block: "nearest" });
      }
    }, [open, active]);

    const activeId = open && active !== -1 ? `${baseId}-item-${active}` : undefined;

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          disabled={disabled}
          onClick={() => (open ? close(false) : openMenu())}
          onKeyDown={onTriggerKeyDown}
          className={cn(
            "inline-flex h-10 items-center gap-2 px-3.5 text-sm font-medium",
            "rounded-[var(--lm-radius)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface)] text-[var(--lm-fg)]",
            "outline-none transition-colors duration-200 hover:bg-[var(--lm-surface-2)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          {trigger}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              id={menuId}
              role="menu"
              tabIndex={-1}
              aria-activedescendant={activeId}
              onKeyDown={onMenuKeyDown}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.97,
                      y: placement === "bottom" ? -6 : 6,
                    }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.97,
                      y: placement === "bottom" ? -6 : 6,
                    }
              }
              transition={springs.drift}
              className={cn(
                "absolute z-50 max-h-72 min-w-44 overflow-auto p-1 outline-none",
                "rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
                placement === "bottom"
                  ? "top-full mt-2 origin-top"
                  : "bottom-full mb-2 origin-bottom",
                align === "start" ? "left-0" : "right-0",
              )}
            >
              {items.map((entry, index) => {
                if (entry.kind === "separator") {
                  return (
                    <div
                      key={index}
                      role="separator"
                      className="mx-2 my-1 h-px bg-[var(--lm-border)]"
                    />
                  );
                }
                if (entry.kind === "label") {
                  return (
                    <div
                      key={index}
                      role="presentation"
                      className="px-2.5 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-[var(--lm-fg-faint)]"
                    >
                      {entry.label}
                    </div>
                  );
                }
                const isActive = index === active;
                const isCheckbox = entry.kind === "checkbox";
                return (
                  <motion.div
                    key={index}
                    ref={(node) => {
                      if (node) itemRefs.current.set(index, node);
                      else itemRefs.current.delete(index);
                    }}
                    id={`${baseId}-item-${index}`}
                    role={isCheckbox ? "menuitemcheckbox" : "menuitem"}
                    aria-checked={isCheckbox ? entry.checked : undefined}
                    aria-disabled={entry.disabled || undefined}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springs.drift, delay: index * 0.012 }}
                    onMouseEnter={() => !entry.disabled && setActive(index)}
                    onClick={() => !entry.disabled && activate(index)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 px-2.5 py-2 text-sm",
                      "rounded-[var(--lm-radius-sm)] transition-colors duration-150",
                      entry.disabled && "pointer-events-none opacity-50",
                      !isCheckbox && entry.destructive
                        ? isActive
                          ? "bg-[var(--lm-surface-2)] text-[var(--lm-negative)]"
                          : "text-[var(--lm-negative)]"
                        : isActive
                          ? "bg-[var(--lm-surface-2)] text-[var(--lm-fg)]"
                          : "text-[var(--lm-fg-muted)]",
                    )}
                  >
                    {isCheckbox ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className="h-3 w-3 shrink-0 text-[var(--lm-accent)]"
                      >
                        <motion.path
                          d="M2 6.5 4.8 9 10 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={false}
                          animate={
                            reduceMotion
                              ? { opacity: entry.checked ? 1 : 0 }
                              : {
                                  pathLength: entry.checked ? 1 : 0,
                                  opacity: entry.checked ? 1 : 0,
                                }
                          }
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { duration: durations.fast, ease: eases.out }
                          }
                        />
                      </svg>
                    ) : (
                      entry.icon && (
                        <span
                          aria-hidden
                          className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5"
                        >
                          {entry.icon}
                        </span>
                      )
                    )}
                    <span className="truncate">{entry.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
DropdownMenu.displayName = "DropdownMenu";
