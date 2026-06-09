"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  reduceMotion: boolean;
}

const DockContext = React.createContext<DockContextValue | null>(null);

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Peak scale of the item directly under the cursor. @default 1.7 */
  magnification?: number;
}

/**
 * A bottom dock whose items swell as the cursor nears them — each item's
 * size is a transform of the cursor's distance from its center. With
 * reduced motion items keep their resting size and only tooltips remain.
 */
export function Dock({
  magnification = 1.7,
  className,
  children,
  ...props
}: DockProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const mouseX = useMotionValue(Infinity);

  const context = React.useMemo(
    () => ({ mouseX, magnification, reduceMotion }),
    [mouseX, magnification, reduceMotion],
  );

  return (
    <DockContext.Provider value={context}>
      <div
        role="toolbar"
        aria-orientation="horizontal"
        className={cn(
          "flex h-16 items-end gap-2 px-3 pb-2",
          "rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]",
          "bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
          className,
        )}
        {...props}
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export interface DockItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "children"> {
  /** Tooltip label shown above the item on hover or keyboard focus. */
  label: string;
  /** Resting item size in px. @default 40 */
  size?: number;
  children?: React.ReactNode;
}

/**
 * One dock item: a focusable button that magnifies with cursor proximity
 * and reveals its label in a tooltip while hovered or focused.
 */
export function DockItem({
  label,
  size = 40,
  className,
  children,
  style,
  ...props
}: DockItemProps) {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error("DockItem must be rendered inside a Dock.");
  }
  const { mouseX, magnification, reduceMotion } = context;

  const ref = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const distance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || value === Infinity) return Infinity;
    return value - (rect.left + rect.width / 2);
  });

  const target = useTransform(
    distance,
    [-120, 0, 120],
    [size, size * magnification, size],
  );
  const { stiffness, damping, mass } = springs.snap;
  const magnified = useSpring(target, { stiffness, damping, mass });
  const side = reduceMotion ? size : magnified;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center outline-none",
        "rounded-[var(--lm-radius)] border border-[var(--lm-border)]",
        "bg-[var(--lm-surface-2)] text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
        className,
      )}
      style={{ ...style, width: side, height: side }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            transition={springs.drift}
            className={cn(
              "absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap",
              "rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)]",
              "bg-[var(--lm-surface-2)] px-2 py-1 text-xs text-[var(--lm-fg)]",
              "shadow-[var(--lm-shadow-sm)]",
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}
