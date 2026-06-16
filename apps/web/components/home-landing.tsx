"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CtaBanner, Testimonials, type Testimonial } from "@lumora/ui";
import { LandingHero } from "./landing-hero";
import { LandingTech } from "./landing-tech";
import { LandingLibraryMap } from "./landing-library-map";
import { LandingBento } from "./landing-bento";
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

export function HomeLanding() {
  const router = useRouter();
  const browse = React.useCallback(() => router.push("/components"), [router]);
  const docs = React.useCallback(() => router.push("/docs"), [router]);

  return (
    <>
      <LandingHero onBrowse={browse} onDocs={docs} />

      <LandingTech />

      <LandingLibraryMap onExplore={browse} />

      <LandingBento onBrowse={browse} />

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
        onCtaClick={browse}
      />
    </>
  );
}
