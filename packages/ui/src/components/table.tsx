"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

const TableContext = React.createContext<{ stickyHeader: boolean }>({
  stickyHeader: false,
});

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Keep the header row pinned while the body scrolls. @default false */
  stickyHeader?: boolean;
}

/**
 * Quiet data table: hairline borders, a surface-toned header, and rows
 * that brighten gently under the pointer. Purely presentational — pair
 * with `sortable` heads that delegate ordering to the caller.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ stickyHeader = false, className, ...props }, ref) => (
    <TableContext.Provider value={{ stickyHeader }}>
      <div
        className={cn(
          "w-full overflow-auto rounded-[var(--lm-radius)] border border-[var(--lm-border)]",
          stickyHeader && "max-h-96",
        )}
      >
        <table
          ref={ref}
          className={cn(
            "w-full caption-bottom border-collapse text-sm text-[var(--lm-fg)]",
            className,
          )}
          {...props}
        />
      </div>
    </TableContext.Provider>
  ),
);
Table.displayName = "Table";

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Header section; surface-toned, pinned when the table sets `stickyHeader`. */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => {
  const { stickyHeader } = React.useContext(TableContext);
  return (
    <thead
      ref={ref}
      className={cn(
        "bg-[var(--lm-surface)] [&_tr]:border-b [&_tr]:border-[var(--lm-border)]",
        stickyHeader && "sticky top-0 z-10 shadow-[var(--lm-shadow-sm)]",
        className,
      )}
      {...props}
    />
  );
});
TableHeader.displayName = "TableHeader";

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Body section; the last row drops its hairline so the frame stays clean. */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

/** One row; brightens to the raised surface on hover. */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-[var(--lm-border)] transition-colors duration-150",
        "hover:bg-[var(--lm-surface-2)]",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

export type SortDirection = "asc" | "desc";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Make the column orderable; clicking cycles asc/desc. @default false */
  sortable?: boolean;
  /** Controlled sort direction; `null` when this column is not sorted. */
  sortDirection?: SortDirection | null;
  /** Receives the next direction — the table never reorders data itself. */
  onSort?: (direction: SortDirection) => void;
}

/**
 * Header cell. With `sortable`, the cell becomes a button whose chevron
 * rotates between ascending and descending on `springs.snap`, exposing the
 * order via `aria-sort` and delegating the actual sort to `onSort`.
 */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { sortable = false, sortDirection, onSort, className, children, ...props },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const [internal, setInternal] = React.useState<SortDirection | null>(null);
    const direction = sortDirection !== undefined ? sortDirection : internal;

    const cycle = () => {
      const next: SortDirection = direction === "asc" ? "desc" : "asc";
      if (sortDirection === undefined) setInternal(next);
      onSort?.(next);
    };

    return (
      <th
        ref={ref}
        aria-sort={
          sortable && direction
            ? direction === "asc"
              ? "ascending"
              : "descending"
            : undefined
        }
        className={cn(
          "h-11 px-4 text-left align-middle text-xs font-medium uppercase tracking-wide text-[var(--lm-fg-muted)]",
          className,
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={cycle}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-[var(--lm-radius-sm)] outline-none",
              "transition-colors duration-200 hover:text-[var(--lm-fg)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
              direction && "text-[var(--lm-fg)]",
            )}
          >
            {children}
            <motion.svg
              aria-hidden
              viewBox="0 0 12 12"
              className={cn(
                "h-3 w-3 transition-opacity duration-200",
                direction
                  ? "text-[var(--lm-accent)]"
                  : "opacity-0 group-hover:opacity-60",
              )}
              animate={{ rotate: direction === "desc" ? 180 : 0 }}
              transition={reduceMotion ? { duration: 0 } : springs.snap}
            >
              <path
                d="M2.5 7.5 6 4l3.5 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        ) : (
          children
        )}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

/** Body cell with the table's quiet rhythm. */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-4 py-3 align-middle text-[var(--lm-fg)]", className)}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";
