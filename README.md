# Lumora UI

**Interfaces that glow.**

Lumora is a premium, motion-first React component library for products that
want to feel expensive. Every component ships with physical, spring-driven
interaction out of the box — magnetic pulls, leaning tooltips, scroll-bound
reveals — built on Tailwind CSS and Motion, dark-first, fully typed, and
tree-shakable down to the single component.

## Why Lumora

- **Motion as a system, not a garnish.** Three named springs (`snap`, `drift`,
  `glide`) drive the entire library, so every screen moves as one body.
- **Own the code.** Install components as source via the CLI — no black-box
  package, no styling fights.
- **AI-native.** Selection toolbars, contextual chat surfaces, and semantic
  component search are first-class components, not bolt-ons.
- **Light by default.** Zero-dependency philosophy beyond `motion`,
  `clsx`, `tailwind-merge`, and `class-variance-authority`. Everything is
  `sideEffects: false` and deep-importable.
- **Accessible and calm.** Keyboard-first, `prefers-reduced-motion` respected
  everywhere, focus rings on everything interactive.

## Quick start

```bash
npx lumora@latest init        # wires Tailwind + tokens into your app
npx lumora@latest add button animated-tooltip
```

Or use the workspace packages directly:

```tsx
import { Button } from "@lumora/ui";
import "@lumora/ui/styles.css";

<Button variant="glow" shimmer>Get started</Button>
```

## Repository layout

```
packages/ui      Component library (components, blocks, ai, lib, styles)
packages/icons   Animated icon system
packages/cli     `lumora` CLI + component registry
apps/web         Docs & live playground (Next.js)
skills/          Claude Skill for AI-assisted page composition
```

## Design language

Dark-first surfaces, warm off-white type, and a single champagne accent —
**the lumen** — used at most once per viewport. Squared-soft radii, quiet
1px borders, and shadows that glow instead of drop.

## Status

Phase one. APIs may shift until `0.2.0`.

## License

MIT
