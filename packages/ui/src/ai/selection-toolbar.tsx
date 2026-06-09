"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface SelectionAction {
  /** Stable identifier passed back to `onAction`. */
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const DEFAULT_ACTIONS: SelectionAction[] = [
  { id: "ask", label: "Ask" },
  { id: "summarize", label: "Summarize" },
  { id: "rewrite", label: "Rewrite" },
  { id: "code", label: "Code" },
];

export interface SelectionToolbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /**
   * Actions rendered inside the pill.
   * @default Ask / Summarize / Rewrite / Code
   */
  actions?: SelectionAction[];
  /** Called with the action id and the text currently selected. */
  onAction: (actionId: string, selectedText: string) => void;
  /** Content the toolbar listens to selections inside of. */
  children: React.ReactNode;
}

interface ToolbarCoords {
  top: number;
  left: number;
}

/**
 * Wraps content and floats a pill toolbar above any text the user selects
 * inside it — the pill scales in with one soft drift breath, anchored to the
 * selection rect. Collapsing the selection, scrolling, or Escape dismisses it.
 */
export function SelectionToolbar({
  actions = DEFAULT_ACTIONS,
  onAction,
  children,
  className,
  ...props
}: SelectionToolbarProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  // Coords persist while hidden so the exit animation doesn't jump.
  const [coords, setCoords] = React.useState<ToolbarCoords>({ top: 0, left: 0 });
  const selectedTextRef = React.useRef("");

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const hide = () => setVisible(false);

    const update = () => {
      const container = containerRef.current;
      const selection = window.getSelection();
      if (
        !container ||
        !selection ||
        selection.rangeCount === 0 ||
        selection.isCollapsed
      ) {
        hide();
        return;
      }
      const range = selection.getRangeAt(0);
      if (!container.contains(range.commonAncestorContainer)) {
        hide();
        return;
      }
      const text = selection.toString().trim();
      if (!text) {
        hide();
        return;
      }
      const rect = range.getBoundingClientRect();
      selectedTextRef.current = text;
      setCoords({
        top: rect.top,
        left: Math.min(
          Math.max(rect.left + rect.width / 2, 16),
          window.innerWidth - 16,
        ),
      });
      setVisible(true);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };

    document.addEventListener("selectionchange", update);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      document.removeEventListener("selectionchange", update);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, []);

  const runAction = (actionId: string) => {
    onAction(actionId, selectedTextRef.current);
    setVisible(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50"
            style={{
              top: coords.top - 10,
              left: coords.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            <AnimatePresence>
              {visible && (
                <motion.div
                  role="toolbar"
                  aria-label="Selection actions"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.86, y: 8 }
                  }
                  animate={
                    reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.92, y: 6 }
                  }
                  transition={springs.drift}
                  className={cn(
                    "pointer-events-auto flex items-center gap-0.5 p-1",
                    "rounded-[var(--lm-radius-full)] border border-[var(--lm-border)]",
                    "bg-[var(--lm-surface-2)] shadow-[var(--lm-shadow)]",
                  )}
                >
                  {actions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      // Keep the selection alive: a default mousedown would
                      // collapse it before click fires.
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={() => runAction(action.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 whitespace-nowrap select-none",
                        "rounded-[var(--lm-radius-full)] px-2.5 py-1 text-xs font-medium",
                        "text-[var(--lm-fg-muted)] outline-none transition-colors duration-200",
                        "hover:bg-[var(--lm-surface)] hover:text-[var(--lm-fg)]",
                        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                      )}
                    >
                      {action.icon && (
                        <span aria-hidden className="[&>svg]:h-3.5 [&>svg]:w-3.5">
                          {action.icon}
                        </span>
                      )}
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </div>
  );
}
