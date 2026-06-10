"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const cardVariants = cva(
  [
    "rounded-[var(--lm-radius-lg)] border bg-[var(--lm-surface)] text-[var(--lm-fg)]",
    "transition-[transform,box-shadow,border-color] duration-[var(--lm-duration)] ease-[var(--lm-ease-out)]",
  ],
  {
    variants: {
      variant: {
        quiet: "border-[var(--lm-border)]",
        lift: [
          "border-[var(--lm-border)] shadow-[var(--lm-shadow-sm)]",
          "hover:-translate-y-[2px] hover:shadow-[var(--lm-shadow)] hover:border-[var(--lm-border-strong)]",
          "motion-reduce:hover:translate-y-0",
        ].join(" "),
        glow: [
          "border-[var(--lm-border)] shadow-[var(--lm-shadow-glow)]",
          "hover:border-[var(--lm-border-strong)]",
        ].join(" "),
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: { variant: "quiet", padding: "md" },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * The Lumora base surface. `quiet` sits flat behind a hairline border,
 * `lift` raises 2px with a deeper shadow on hover, and `glow` carries the
 * lumen and brightens its border when hovered.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/** Top region of a card: title plus optional actions, with breathing room below. */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-4 flex items-start justify-between gap-3", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

/** Card heading set in the library's quiet semibold voice. */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-base font-semibold text-[var(--lm-fg)]", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Main card content, muted by default so the title leads. */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-[var(--lm-fg-muted)]", className)}
      {...props}
    />
  ),
);
CardBody.displayName = "CardBody";

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/** Bottom region of a card, separated by a hairline rule. */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-5 flex items-center gap-3 border-t border-[var(--lm-border)] pt-4",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { cardVariants };
