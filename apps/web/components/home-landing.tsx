"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BeamGrid,
  BorderBeam,
  CtaBanner,
  Hero,
  Testimonials,
  Typewriter,
  type Testimonial,
} from "@lumora/ui";
import { CopyButton } from "./copy-button";
import { LandingShowcase } from "./landing-showcase";
import { LandingWhy } from "./landing-why";
import { LandingInstall } from "./landing-install";

const quotes: Testimonial[] = [
  {
    quote:
      "We replaced four animation utilities and a folder of one-off easings with three springs. The site finally moves like one product.",
    name: "Linnea Hart",
    role: "Design engineer, Tidemark",
  },
  {
    quote:
      "The CLI dropped the source into our repo and that was the whole migration. Two weeks later we'd themed it beyond recognition.",
    name: "Dario Ferreyra",
    role: "Frontend lead, Casavela",
  },
  {
    quote:
      "Reduced motion isn't an afterthought here — the marquee literally becomes a grid. Our audit passed on the first run.",
    name: "Greta Nylund",
    role: "Accessibility lead, Murmur",
  },
  {
    quote:
      "I added the command menu before lunch and it felt native by the afternoon. Fuzzy search, focus restore, the lot.",
    name: "Sofia Brandt",
    role: "Product engineer, Hollowav",
  },
];

const installCommand = "npx lumora-ui@latest add button";

export function HomeLanding() {
  const router = useRouter();

  return (
    <>
      <Hero
        eyebrow="Lumora UI 0.1 — press ⌘K to search"
        headline="Motion-first components for products that feel finished"
        subcopy="Quiet surfaces, one champagne accent, and three springs that settle exactly once. Install the source, keep the code, ship the glow."
        primaryCta={{
          label: "Browse components",
          onClick: () => router.push("/components"),
        }}
        secondaryCta={{
          label: "Read the docs",
          onClick: () => router.push("/docs"),
        }}
        avatars={[]}
        media={
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-2 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] py-1.5 pl-4 pr-1.5">
              <span
                aria-hidden
                className="select-none text-[var(--lm-fg-faint)]"
              >
                $
              </span>
              <code className="font-mono text-sm text-[var(--lm-fg)]">
                {installCommand}
              </code>
              <CopyButton text={installCommand} label="Copy install command" />
            </div>

            <BorderBeam color="lumen" className="w-full">
              <BeamGrid
                density={48}
                beamCount={3}
                className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)]"
              >
                <div className="flex flex-col items-center gap-10 px-6 py-14 sm:py-16">
                  <p className="text-xl font-medium text-[var(--lm-fg)] sm:text-2xl">
                    Springs that{" "}
                    <Typewriter
                      words={[
                        "snap into place.",
                        "drift in once.",
                        "glide between layouts.",
                      ]}
                      className="text-[var(--lm-fg-muted)]"
                    />
                  </p>
                </div>
              </BeamGrid>
            </BorderBeam>
          </div>
        }
      />

      <LandingShowcase />

      <LandingWhy />

      <LandingInstall />

      <Testimonials
        heading="Loved in the quiet hours"
        subheading="Notes from teams shipping with Lumora — occasionally past midnight."
        items={quotes}
      />

      <CtaBanner
        headline="Turn the lights on"
        subcopy="Install the library, open the gallery, and ship a page that glows tonight."
        ctaLabel="Browse components"
        onCtaClick={() => router.push("/components")}
      />
    </>
  );
}
