"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";
import { Button } from "../components/button";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand slot at the left edge. @default the Lumora wordmark */
  logo?: React.ReactNode;
  /** Primary navigation links. @default four demo links */
  links?: NavbarLink[];
  /** Label for the call-to-action button. @default "Start free" */
  ctaLabel?: string;
  /** Called when the CTA button is pressed. */
  onCtaClick?: () => void;
  /** Scroll distance in px before the bar gains its blurred backdrop. @default 24 */
  threshold?: number;
}

const defaultLinks: NavbarLink[] = [
  { label: "Components", href: "#components" },
  { label: "Motion", href: "#motion" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const drawerVariants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
} as const;

const drawerItemVariants = {
  closed: { opacity: 0, y: 10 },
  open: { opacity: 1, y: 0, transition: springs.drift },
} as const;

/**
 * Sticky top navigation that rides transparent over the hero, then settles
 * onto a blurred overlay with a hairline border once you scroll past the
 * threshold. Hovering links slides a single shared underline between them;
 * on mobile the hamburger morphs into an X and a full-width drawer staggers
 * its links into view.
 */
export function Navbar({
  logo,
  links = defaultLinks,
  ctaLabel = "Start free",
  onCtaClick,
  threshold = 24,
  className,
  ...props
}: NavbarProps) {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const drawerId = `${uid}-drawer`;

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > threshold);
  });
  React.useEffect(() => {
    setScrolled(scrollY.get() > threshold);
  }, [scrollY, threshold]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-[var(--lm-duration)]",
        scrolled || open
          ? "border-[var(--lm-border)] bg-[var(--lm-overlay)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
        className,
      )}
      {...props}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {logo ?? (
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
          >
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-[var(--lm-accent)] shadow-[0_0_12px_var(--lm-glow)]"
            />
            Lumora
          </a>
        )}

        {/* Desktop links */}
        <ul
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link, i) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="relative block px-3 py-2 text-sm text-[var(--lm-fg-muted)] transition-colors duration-[var(--lm-duration-fast)] hover:text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
              >
                {link.label}
                {hovered === i && (
                  <motion.span
                    aria-hidden
                    layoutId={`${uid}-underline`}
                    transition={reduceMotion ? { duration: 0 } : springs.snap}
                    className="absolute inset-x-3 -bottom-px h-px bg-[var(--lm-fg)]"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="accent" size="sm" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </div>

        {/* Mobile hamburger → X */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={drawerId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[var(--lm-radius)] text-[var(--lm-fg)] outline-none hover:bg-[var(--lm-surface-2)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] md:hidden"
        >
          <motion.span
            aria-hidden
            animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.snap}
            className="block h-px w-5 bg-current"
          />
          <motion.span
            aria-hidden
            animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.snap}
            className="block h-px w-5 bg-current"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={drawerId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: durations.base, ease: eases.out }}
            className="overflow-hidden border-t border-[var(--lm-border)] md:hidden"
          >
            <motion.ul
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-1 px-4 py-4"
            >
              {links.map((link) => (
                <motion.li key={link.href} variants={drawerItemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[var(--lm-radius)] px-3 py-3 text-base text-[var(--lm-fg-muted)] transition-colors duration-[var(--lm-duration-fast)] hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={drawerItemVariants} className="px-3 pt-2 pb-1">
                <Button
                  variant="accent"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    onCtaClick?.();
                  }}
                >
                  {ctaLabel}
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
