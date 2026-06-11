---
name: lumora-builder
description: Use when building websites, landing pages, dashboards, docs pages, or any screens with Lumora UI components — or when asked to "use Lumora", compose its blocks, wire up its AI components (SelectionToolbar, CommandMenu, ChatWidget), or apply its token/motion system. Covers component discovery, import patterns, theming, the spring-based motion language, and ready-made page recipes.
---

# Lumora Builder

Lumora UI is a premium, motion-first React component library. Tagline:
*Interfaces that glow.* Dark-first surfaces, one champagne accent (**the
lumen**), and three named springs that make every screen move as one body.
This skill teaches you to compose real pages from it.

## Discovering components

Components live in the `@lumora/ui` workspace package, one file each:

| Layer | Path | What lives there |
| --- | --- | --- |
| Components | `packages/ui/src/components/*.tsx` | Primitives & effects (Button, SpotlightCard, Marquee, NumberTicker…) |
| Blocks | `packages/ui/src/blocks/*.tsx` | Full page sections (Navbar, Hero, FeatureBento, Pricing, Testimonials…) |
| AI | `packages/ui/src/ai/*.tsx` | AI-native surfaces (SelectionToolbar, CommandMenu, ChatWidget) |
| Lib | `packages/ui/src/lib/*.ts` | `cn()` class merger and the motion language (`springs`, `eases`, `durations`) |

Before composing, list the directory you need and read the component's
exported `<Name>Props` interface — every file exports one, with `@default`
notes on key props. The full catalog with import paths and key props is in
[references/component-catalog.md](references/component-catalog.md). The CLI
registry (`packages/cli`) mirrors the same names.

## Import patterns

Prefer deep imports — every component is individually addressable:

```tsx
import { Button } from "@lumora/ui/components/button";
import { Hero } from "@lumora/ui/blocks/hero";
import { CommandMenu, useCommandMenu } from "@lumora/ui/ai/command-menu";
import { springs } from "@lumora/ui/lib/motion";
```

The barrel (`import { Button } from "@lumora/ui"`) also works and is
tree-shakable. Apps that installed components as source via the CLI
(`npx lumora-ui@latest add button`) import from their own
`components/lumora/<name>` path instead — same APIs either way.

## The token system (required setup)

Every component styles itself **exclusively** through `--lm-*` CSS variables.
Nothing renders correctly until the app loads the token sheet:

```tsx
import "@lumora/ui/styles.css"; // packages/ui/styles/lumora.css
```

- Dark is the default (`:root`). Opt into light by setting
  `data-theme="light"` on `<html>` or any subtree.
- Key tokens: surfaces (`--lm-bg`, `--lm-surface`, `--lm-surface-2`,
  `--lm-overlay`), strokes (`--lm-border`, `--lm-border-strong`), type
  (`--lm-fg`, `--lm-fg-muted`, `--lm-fg-faint`), the lumen
  (`--lm-accent`, `--lm-accent-fg`, `--lm-accent-soft`, `--lm-glow`),
  radii (`--lm-radius-sm|radius|radius-lg|radius-full`), elevation
  (`--lm-shadow-sm|shadow|shadow-glow`).
- In your own glue markup, reference tokens through Tailwind arbitrary
  values: `bg-[var(--lm-surface)]`, `text-[var(--lm-fg-muted)]`,
  `rounded-[var(--lm-radius)]`. Never write hex values.

## The motion language

All animation flows from `@lumora/ui/lib/motion`:

- `springs.snap` — hovers, presses, magnetic pulls. Fast settle, no wobble.
- `springs.drift` — tooltips, popovers, entrances. One gentle breath.
- `springs.glide` — layout shifts and shared-element moves. Long and weighty.
- `eases` / `durations` for time-based animation (gradients, opacity).
  Micro-interactions stay under 450 ms; ambient loops run ≥ 1.4 s.

Rules of composition:

- **One lumen per viewport.** At most one glowing element on screen at a
  time — a `variant="glow"` Button, a highlighted Pricing tier, or the
  ChatWidget launcher. Never two.
- Entrances breathe once, never wobble twice. Use `springs.drift`.
- Every component already respects `prefers-reduced-motion`; don't add
  custom animation that ignores it.

## Composition recipes

Copy-pasteable JSX for all three lives in
[references/page-recipes.md](references/page-recipes.md).

1. **Full landing page** — `Navbar → Hero → FeatureBento → Pricing →
   Testimonials → Faq → CtaBanner → Footer`. The Hero owns the lumen above
   the fold; the highlighted Pricing tier owns it mid-page.
2. **Dashboard shell** — sidebar + topbar frame, `CommandMenu` on ⌘K,
   stat row of `SpotlightCard` + `NumberTicker`, `AnimatedTabs` for views.
3. **AI-enhanced docs page** — prose wrapped in `SelectionToolbar`,
   `CommandMenu` for navigation/search, `ChatWidget` floating bottom-right.
   All three take handler props; wire them to whatever backend the app uses.

## Rules

- **Dark-first.** Design on `--lm-bg` dark; verify light via
  `data-theme="light"` afterwards.
- **Original copy only.** All demo names, quotes, and stats are fictional.
  Never reference other component libraries or brands in code, comments, or
  copy. AI components stay backend-agnostic — handler props, never a
  hardcoded provider, product, or model name.
- **Accessibility is non-negotiable.** Keep keyboard paths working, leave
  `aria-*` attributes intact, keep `focus-visible:ring-2
  ring-[var(--lm-accent)]` on anything interactive you add.
- **Never hardcode colors,** radii, or shadows — only `var(--lm-*)` tokens.
- One component per concern; pass data through props instead of forking a
  component's internals.
