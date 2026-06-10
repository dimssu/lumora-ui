"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Axis of the rule. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Centered chip label; the gradient fades into it from both sides. */
  label?: React.ReactNode;
  /** Hidden from assistive tech; set false for a semantic `role="separator"`. @default true */
  decorative?: boolean;
}

/**
 * A quiet rule that fades to transparent at both ends, so it never cuts a
 * hard edge into the layout. An optional label sits in a small chip at the
 * center. Purely static — separators should never draw attention.
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { orientation = "horizontal", label, decorative = true, className, ...props },
    ref,
  ) => {
    const horizontal = orientation === "horizontal";
    const semantics = decorative
      ? ({ "aria-hidden": true } as const)
      : ({ role: "separator", "aria-orientation": orientation } as const);

    const line = (
      <span
        aria-hidden
        className={cn(
          "flex-1",
          horizontal
            ? "h-px bg-[linear-gradient(to_right,transparent,var(--lm-border)_30%,var(--lm-border)_70%,transparent)]"
            : "w-px bg-[linear-gradient(to_bottom,transparent,var(--lm-border)_30%,var(--lm-border)_70%,transparent)]",
        )}
      />
    );

    return (
      <div
        ref={ref}
        {...semantics}
        className={cn(
          "flex items-center",
          horizontal ? "w-full flex-row gap-3" : "h-full flex-col gap-3 self-stretch",
          className,
        )}
        {...props}
      >
        {line}
        {label !== undefined && (
          <>
            <span
              className={cn(
                "shrink-0 whitespace-nowrap rounded-[var(--lm-radius-full)] border border-[var(--lm-border)]",
                "bg-[var(--lm-surface)] px-2.5 py-0.5 text-xs text-[var(--lm-fg-muted)]",
                !horizontal && "[writing-mode:vertical-rl]",
              )}
            >
              {label}
            </span>
            {line}
          </>
        )}
      </div>
    );
  },
);
Separator.displayName = "Separator";
