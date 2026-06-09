"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { Button } from "../components/button";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand slot in the leading column. @default the Lumora wordmark */
  logo?: React.ReactNode;
  /** Quiet line under the brand. @default "Interfaces that glow." */
  tagline?: string;
  /** Link columns. @default four demo columns */
  columns?: FooterColumn[];
  /** Bottom small print. @default a fictional copyright line */
  smallPrint?: string;
  /** Render the newsletter form in the brand column. @default true */
  newsletter?: boolean;
  /** Label above the newsletter input. @default "Get the changelog, monthly." */
  newsletterHeading?: string;
  /** Decorative subscribe handler; receives the entered email. */
  onSubscribe?: (email: string) => void;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#components" },
      { label: "Blocks", href: "#blocks" },
      { label: "Theming", href: "#theming" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Motion guide", href: "#motion" },
      { label: "Token reference", href: "#tokens" },
      { label: "Gallery", href: "#gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Journal", href: "#journal" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "License", href: "#license" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

/**
 * Quiet closing footer: four link columns beside the brand, links resting at
 * the faintest type tone and brightening on hover, with an optional inline
 * newsletter form and a small-print baseline.
 */
export function Footer({
  logo,
  tagline = "Interfaces that glow.",
  columns = defaultColumns,
  smallPrint = `© ${new Date().getFullYear()} Lumora Labs. All rights reserved.`,
  newsletter = true,
  newsletterHeading = "Get the changelog, monthly.",
  onSubscribe,
  className,
  ...props
}: FooterProps) {
  const uid = React.useId();
  const inputId = `${uid}-newsletter-email`;
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe?.(email.trim());
      setEmail("");
    }
  };

  return (
    <footer
      className={cn(
        "w-full border-t border-[var(--lm-border)] bg-[var(--lm-bg)]",
        className,
      )}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:grid-cols-6">
        {/* Brand column */}
        <div className="col-span-2 flex flex-col gap-4">
          {logo ?? (
            <a
              href="#"
              className="flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
            >
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-[var(--lm-accent)] shadow-[0_0_12px_var(--lm-glow)]"
              />
              Lumora
            </a>
          )}
          <p className="text-sm text-[var(--lm-fg-faint)]">{tagline}</p>

          {newsletter && (
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
              <label
                htmlFor={inputId}
                className="text-xs font-medium text-[var(--lm-fg-muted)]"
              >
                {newsletterHeading}
              </label>
              <div className="flex w-full max-w-xs gap-2">
                <input
                  id={inputId}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.dev"
                  autoComplete="email"
                  className={cn(
                    "h-10 min-w-0 flex-1 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-3 text-sm",
                    "text-[var(--lm-fg)] placeholder:text-[var(--lm-fg-faint)] outline-none",
                    "transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)]",
                    "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                  )}
                />
                <Button type="submit" variant="outline" size="md">
                  Subscribe
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Link columns */}
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--lm-fg-muted)]">
              {column.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--lm-fg-faint)] transition-colors duration-[var(--lm-duration-fast)] hover:text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-[var(--lm-border)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-[var(--lm-fg-faint)]">{smallPrint}</p>
          <p className="text-xs text-[var(--lm-fg-faint)]">
            Crafted slowly in the quiet hours.
          </p>
        </div>
      </div>
    </footer>
  );
}
