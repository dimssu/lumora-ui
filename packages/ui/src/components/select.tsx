"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  /** Plain-text form of the label, used for typeahead when `label` is not a string. */
  textValue?: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Trigger text when nothing is selected. @default "Select…" */
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Single-select listbox: the menu drifts open with a slight scale while
 * options cascade in at 15ms intervals; the chosen option carries a check
 * glyph. Arrow keys, Home/End, typeahead and Enter drive it entirely from
 * the keyboard; Escape and outside clicks close it.
 */
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Select…",
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const baseId = React.useId();
    const listId = `${baseId}-listbox`;

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const optionRefs = React.useRef(new Map<string, HTMLLIElement>());
    const typeahead = React.useRef({ query: "", at: 0 });

    const [open, setOpen] = React.useState(false);
    const [internal, setInternal] = React.useState(defaultValue);
    const selected = value ?? internal;
    const [active, setActive] = React.useState<string | undefined>(selected);

    const enabled = options.filter((o) => !o.disabled);
    const selectedOption = options.find((o) => o.value === selected);
    const activeId =
      open && active !== undefined ? `${baseId}-option-${active}` : undefined;

    const select = (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
      setOpen(false);
    };

    const openMenu = () => {
      if (disabled) return;
      setActive(selected ?? enabled[0]?.value);
      setOpen(true);
    };

    const moveActive = (delta: 1 | -1) => {
      if (enabled.length === 0) return;
      const index = enabled.findIndex((o) => o.value === active);
      const next =
        index === -1
          ? enabled[delta === 1 ? 0 : enabled.length - 1]
          : enabled[
              (index + delta + enabled.length) % enabled.length
            ];
      if (next) setActive(next.value);
    };

    const textOf = (option: SelectOption) =>
      option.textValue ??
      (typeof option.label === "string" ? option.label : option.value);

    const handleTypeahead = (key: string) => {
      const now = Date.now();
      const state = typeahead.current;
      state.query = (now - state.at > 500 ? "" : state.query) + key.toLowerCase();
      state.at = now;
      const match = enabled.find((o) =>
        textOf(o).toLowerCase().startsWith(state.query),
      );
      if (match) {
        if (open) setActive(match.value);
        else select(match.value);
      }
    };

    const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!open) {
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          openMenu();
        } else if (event.key.length === 1 && event.key !== " ") {
          handleTypeahead(event.key);
        }
        return;
      }
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
          if (enabled[0]) setActive(enabled[0].value);
          break;
        case "End": {
          event.preventDefault();
          const last = enabled[enabled.length - 1];
          if (last) setActive(last.value);
          break;
        }
        case "Enter":
        case " ":
          event.preventDefault();
          if (active !== undefined) select(active);
          break;
        case "Escape":
          event.preventDefault();
          setOpen(false);
          break;
        case "Tab":
          setOpen(false);
          break;
        default:
          if (event.key.length === 1) handleTypeahead(event.key);
      }
    };

    React.useEffect(() => {
      if (!open) return;
      const onPointerDown = (e: PointerEvent) => {
        if (
          e.target instanceof Node &&
          !wrapperRef.current?.contains(e.target)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    React.useEffect(() => {
      if (open && active !== undefined) {
        optionRefs.current.get(active)?.scrollIntoView({ block: "nearest" });
      }
    }, [open, active]);

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative", className)}
        {...props}
      >
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={activeId}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onTriggerKeyDown}
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 px-3 text-sm",
            "rounded-[var(--lm-radius)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface)]",
            "outline-none transition-colors duration-200 hover:bg-[var(--lm-surface-2)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            "disabled:pointer-events-none disabled:opacity-50",
            selectedOption ? "text-[var(--lm-fg)]" : "text-[var(--lm-fg-muted)]",
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <motion.svg
            aria-hidden
            viewBox="0 0 12 12"
            className="h-3 w-3 shrink-0 text-[var(--lm-fg-muted)]"
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.snap}
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={listId}
              role="listbox"
              aria-label={typeof placeholder === "string" ? placeholder : undefined}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: -6 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: -6 }
              }
              transition={springs.drift}
              className={cn(
                "absolute left-0 top-full z-50 mt-2 max-h-64 w-full origin-top overflow-auto p-1",
                "rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
              )}
            >
              {options.map((option, index) => {
                const isSelected = option.value === selected;
                const isActive = option.value === active;
                return (
                  <motion.li
                    key={option.value}
                    ref={(node) => {
                      if (node) optionRefs.current.set(option.value, node);
                      else optionRefs.current.delete(option.value);
                    }}
                    id={`${baseId}-option-${option.value}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    initial={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springs.drift, delay: index * 0.015 }}
                    onMouseEnter={() =>
                      !option.disabled && setActive(option.value)
                    }
                    onClick={() => !option.disabled && select(option.value)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 px-2.5 py-2 text-sm",
                      "rounded-[var(--lm-radius-sm)] transition-colors duration-150",
                      option.disabled && "pointer-events-none opacity-50",
                      isActive
                        ? "bg-[var(--lm-surface-2)] text-[var(--lm-fg)]"
                        : "text-[var(--lm-fg-muted)]",
                      isSelected && "text-[var(--lm-fg)]",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className="h-3 w-3 shrink-0 text-[var(--lm-accent)]"
                      >
                        <path
                          d="M2 6.5 4.8 9 10 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
Select.displayName = "Select";
