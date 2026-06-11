"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BeamGrid,
  CtaBanner,
  Dock,
  DockItem,
  Faq,
  FeatureBento,
  Hero,
  Marquee,
  Pricing,
  Testimonials,
  Typewriter,
  type FaqItem,
  type FeatureItem,
  type PricingTier,
  type Testimonial,
} from "@lumora/ui";
import {
  BellIcon,
  DownloadIcon,
  HeartIcon,
  MailIcon,
  MoonIcon,
  PlayIcon,
  SearchIcon,
  SettingsIcon,
  SparkleIcon,
  StarIcon,
  SunIcon,
} from "@lumora/icons";
import { componentItems } from "../lib/registry";
import { metaFor } from "../lib/content";

const features: FeatureItem[] = [
  {
    icon: <PlayIcon />,
    title: "Motion as a system",
    body: "Three named springs — snap, drift, glide — power every hover, reveal, and layout shift in the library. Nothing wobbles twice, nothing fights its neighbor: the whole page moves as one body, and overrides exist only for components whose physics genuinely differ.",
  },
  {
    icon: <DownloadIcon />,
    title: "Own the code",
    body: "The CLI installs components as source into your repo. No black-box package, no styling fights — edit anything, keep everything.",
  },
  {
    icon: <SparkleIcon />,
    title: "AI-native surfaces",
    body: "A ⌘K command menu, a streaming chat widget, and a selection toolbar ship as first-class components, not bolt-ons.",
  },
  {
    icon: <SunIcon />,
    title: "Light to the leaf",
    body: "sideEffects: false and deep imports mean your bundle carries exactly the components you render — nothing else.",
  },
  {
    icon: <HeartIcon />,
    title: "Accessible by default",
    body: "Keyboard paths, focus rings, aria wiring, and reduced-motion fallbacks are built into every component, not patched on.",
  },
  {
    icon: <MoonIcon />,
    title: "Theming in one attribute",
    body: "Every color, radius, and shadow resolves through CSS variables. Set data-theme=\"light\" on any ancestor and the system follows.",
  },
];

const tiers: PricingTier[] = [
  {
    name: "Open",
    description: "The core library, MIT-licensed forever.",
    monthly: 0,
    yearly: 0,
    features: [
      "All 60 core components",
      "60 animated icons",
      "Dark & light token sets",
      "Community support",
    ],
    ctaLabel: "Install free",
  },
  {
    name: "Pro",
    description: "Every block, kept current as the library grows.",
    monthly: 21,
    yearly: 17,
    features: [
      "Everything in Open",
      "All landing blocks",
      "AI surface components",
      "Token kit for design tools",
      "New blocks every month",
    ],
    ctaLabel: "Go Pro",
    highlighted: true,
  },
  {
    name: "Studio",
    description: "For teams that want us in the room.",
    monthly: 68,
    yearly: 55,
    features: [
      "Everything in Pro",
      "Private component requests",
      "Quarterly motion review",
      "Dedicated support channel",
    ],
    ctaLabel: "Talk to us",
  },
];

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
      "One champagne accent, used once per screen. Clients think we hired a brand studio.",
    name: "Imran Kazi",
    role: "Founder, Latefield",
  },
  {
    quote:
      "I added the command menu before lunch and it felt native by the afternoon. Fuzzy search, focus restore, the lot.",
    name: "Sofia Brandt",
    role: "Product engineer, Hollowav",
  },
  {
    quote:
      "Deep imports kept our marketing bundle under budget without a single config change. It just ships less.",
    name: "Ezra Whitfield",
    role: "Performance engineer, Norhaven",
  },
  {
    quote:
      "The pricing block's billing toggle alone would have taken us a sprint. It was a prop.",
    name: "Camille Roux",
    role: "Engineering manager, Verglas",
  },
  {
    quote:
      "Everything settles exactly once. I didn't know how much the wobble was costing us until it was gone.",
    name: "Anders Lien",
    role: "Staff engineer, Pinefold",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Do I need Tailwind CSS?",
    answer:
      "Yes — the components are styled with Tailwind classes that read Lumora's CSS variables. Import tailwindcss and @lumora/ui/styles.css in your global stylesheet, point a @source at the package, and you're wired.",
  },
  {
    question: "Can I install just one component?",
    answer:
      "That's the intended path. npx lumora-ui@latest add button copies the source file plus its small internal deps (cn, the motion springs) into your project, so you own the code from the first minute.",
  },
  {
    question: "Does Lumora work with React Server Components?",
    answer:
      "Every component is a client component because it animates, but each one drops into a server-rendered tree cleanly. Pass content as plain props from the server; the client boundary stays one component wide.",
  },
  {
    question: "What happens under prefers-reduced-motion?",
    answer:
      "Ambient and looping animation stops entirely — marquees become grids, beams disappear, glows hold still — and interaction feedback falls back to opacity. It's wired into every component.",
  },
  {
    question: "Can I change the accent color?",
    answer:
      "The lumen is one CSS variable (--lm-accent) with three companions for contrast, soft fills, and glow. Override them on :root or any subtree and every component follows, both themes included.",
  },
];

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
        trustedBy="Trusted by teams who sweat the last 2%"
        media={
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
              <Dock aria-label="Sample dock — every item is live">
                <DockItem label="Search">
                  <SearchIcon />
                </DockItem>
                <DockItem label="Inbox">
                  <MailIcon />
                </DockItem>
                <DockItem label="Favorites">
                  <StarIcon />
                </DockItem>
                <DockItem label="Alerts">
                  <BellIcon />
                </DockItem>
                <DockItem label="Settings">
                  <SettingsIcon />
                </DockItem>
              </Dock>
            </div>
          </BeamGrid>
        }
      />

      <section
        aria-label="Component index"
        className="border-y border-[var(--lm-border)] py-9"
      >
        <Marquee speed={40} gap={44} pauseOnHover>
          {componentItems.map((item) => (
            <span
              key={item.name}
              className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-[var(--lm-fg-muted)]"
            >
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-[var(--lm-fg-faint)]"
              />
              {metaFor(item.name).title}
            </span>
          ))}
        </Marquee>
      </section>

      <FeatureBento
        heading="Built for the unglamorous details"
        subheading="The parts of great interfaces nobody screenshots — handled once, handled well."
        items={features}
      />

      <Pricing
        heading="Simple, honest pricing"
        subheading="The core library is free and MIT-licensed. Paid tiers add blocks and people, never license restrictions."
        tiers={tiers}
        onTierSelect={() => router.push("/docs")}
      />

      <Testimonials
        heading="Loved in the quiet hours"
        subheading="Notes from teams shipping with Lumora — occasionally past midnight."
        items={quotes}
      />

      <Faq
        heading="Questions, answered"
        subheading="The things teams ask before they switch the lights on."
        items={faqItems}
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
