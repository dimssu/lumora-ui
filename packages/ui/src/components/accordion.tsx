"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

interface AccordionContextValue {
  open: string[];
  toggle: (value: string) => void;
  baseId: string;
  reduceMotion: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Allow one open panel, or several at once. @default "single" */
  type?: "single" | "multiple";
  /** Value(s) open on first render. */
  defaultValue?: string | string[];
}

/**
 * A stack of disclosure rows whose panels ease open to their natural height
 * and back to zero, the chevron rotating with the state. With reduced
 * motion the height snaps instantly and only the content fades.
 */
export function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const baseId = React.useId();
  const [open, setOpen] = React.useState<string[]>(() =>
    defaultValue === undefined
      ? []
      : Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue],
  );

  const toggle = React.useCallback(
    (value: string) => {
      setOpen((current) => {
        if (current.includes(value)) {
          return current.filter((entry) => entry !== value);
        }
        return type === "single" ? [value] : [...current, value];
      });
    },
    [type],
  );

  const context = React.useMemo(
    () => ({ open, toggle, baseId, reduceMotion }),
    [open, toggle, baseId, reduceMotion],
  );

  return (
    <AccordionContext.Provider value={context}>
      <div
        className={cn(
          "divide-y divide-[var(--lm-border)] rounded-[var(--lm-radius-lg)]",
          "border border-[var(--lm-border)] bg-[var(--lm-surface)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Unique value identifying this row. */
  value: string;
  /** Trigger content shown in the row's button. */
  title: React.ReactNode;
}

/**
 * One accordion row: a button trigger with `aria-expanded`/`aria-controls`
 * and a height-animated panel beneath it.
 */
export function AccordionItem({
  value,
  title,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be rendered inside an Accordion.");
  }
  const { open, toggle, baseId, reduceMotion } = context;
  const expanded = open.includes(value);

  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <div className={cn("group", className)} {...props}>
      <button
        type="button"
        id={triggerId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => toggle(value)}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left outline-none",
          "text-sm font-medium text-[var(--lm-fg)] transition-colors duration-200",
          "hover:bg-[var(--lm-surface-2)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-inset",
        )}
      >
        {title}
        <motion.span
          aria-hidden
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : springs.snap}
          className="shrink-0 text-[var(--lm-fg-muted)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            role="region"
            id={panelId}
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? {
                    height: { duration: 0 },
                    opacity: { duration: durations.fast },
                  }
                : {
                    height: { duration: durations.base, ease: [...eases.out] },
                    opacity: { duration: durations.base, ease: [...eases.out] },
                  }
            }
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0.5 text-sm text-[var(--lm-fg-muted)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
