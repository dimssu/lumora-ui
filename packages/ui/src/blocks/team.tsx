"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface TeamMemberLink {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** One short line of personality under the role. */
  bio: string;
  /** Avatar initials. @default derived from the name */
  initials?: string;
  /** Label-only link chips revealed on hover. */
  links?: TeamMemberLink[];
}

export interface TeamGridProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading. @default "The hands on the lighting rig" */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /** People in display order. @default four demo members */
  members?: TeamMember[];
}

const defaultMembers: TeamMember[] = [
  {
    name: "Imara Solenne",
    role: "Founder & principal engineer",
    bio: "Believes most design arguments end at the right spring curve.",
    links: [
      { label: "Site", href: "#" },
      { label: "Posts", href: "#" },
    ],
  },
  {
    name: "Theo Lindqvist",
    role: "Design systems lead",
    bio: "Keeps the token sheet shorter than this sentence wants to be.",
    links: [
      { label: "Site", href: "#" },
      { label: "Talks", href: "#" },
    ],
  },
  {
    name: "Priya Raghunath",
    role: "Motion engineer",
    bio: "Measures interfaces in milliseconds and forgiveness.",
    links: [
      { label: "Posts", href: "#" },
      { label: "Demos", href: "#" },
    ],
  },
  {
    name: "Casper Nwadike",
    role: "Developer experience",
    bio: "Reads error messages out loud until they apologise.",
    links: [
      { label: "Site", href: "#" },
      { label: "Notes", href: "#" },
    ],
  },
];

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Team section. Cards stagger up as they enter the viewport; hovering (or
 * tabbing into) a card lifts it slightly while a row of link chips fades up
 * from the bottom edge.
 */
export function TeamGrid({
  heading = "The hands on the lighting rig",
  subheading = "A small crew, deliberately. Every spring constant in the library has been argued over by these four.",
  members = defaultMembers,
  className,
  ...props
}: TeamGridProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : springs.drift,
    },
  };

  return (
    <section
      className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}
      {...props}
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
            {subheading}
          </p>
        )}
      </div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {members.map((member, i) => {
          const active = activeIndex === i;
          return (
            <motion.li
              key={member.name}
              variants={itemVariants}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={springs.snap}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() =>
                setActiveIndex((v) => (v === i ? null : v))
              }
              onFocusCapture={() => setActiveIndex(i)}
              onBlurCapture={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  setActiveIndex((v) => (v === i ? null : v));
                }
              }}
              className="relative flex flex-col overflow-hidden rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6 pb-14 transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)]"
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] text-sm font-semibold",
                  i % 2 === 0
                    ? "bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]"
                    : "bg-[var(--lm-accent-2-soft)] text-[var(--lm-accent-2)]",
                )}
              >
                {member.initials ?? initialsOf(member.name)}
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--lm-fg)]">
                {member.name}
              </h3>
              <p className="mt-0.5 text-sm text-[var(--lm-fg-muted)]">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--lm-fg-faint)]">
                {member.bio}
              </p>

              {member.links && member.links.length > 0 && (
                <motion.div
                  animate={
                    active
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: reduceMotion ? 0 : 10 }
                  }
                  transition={reduceMotion ? { duration: 0 } : springs.drift}
                  className="absolute inset-x-6 bottom-5 flex gap-2"
                >
                  {member.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--lm-fg-muted)] outline-none",
                        "transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)]",
                        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                      )}
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
