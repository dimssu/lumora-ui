# Lumora UI — engineering conventions

Read this before adding any component. Consistency is the product.

## Voice & brand

- Library name: **Lumora UI**. Tagline: *Interfaces that glow.*
- The accent color is called **the lumen**. Used sparingly — one glowing element per viewport.
- Premium minimalism: generous spacing, quiet borders, motion that feels physical.

## Files & naming

- One component per file in `packages/ui/src/components/<kebab-name>.tsx`.
- Larger assemblies (navbars, heroes, pricing) live in `packages/ui/src/blocks/`.
- AI-native components live in `packages/ui/src/ai/`.
- Named exports only. PascalCase component, `<Name>Props` interface exported.
- Re-export every new file from `packages/ui/src/index.ts`.

## Code rules

- `"use client"` at the top of every component file (they all animate).
- Style with Tailwind classes referencing **only** CSS variables from
  `packages/ui/styles/lumora.css` — e.g. `bg-[var(--lm-surface)]`,
  `text-[var(--lm-fg-muted)]`. Never hard-code colors, radii, or shadows.
- Animation: `motion/react` (import from `motion/react`, not framer-motion).
  Defaults must come from `src/lib/motion.ts` (`springs.snap|drift|glide`,
  `eases`, `durations`). Custom physics only when a component genuinely needs it.
- Respect `useReducedMotion()` from `motion/react`: ambient/looping animation
  must stop; interaction feedback may fall back to opacity.
- Accessibility is non-negotiable: keyboard operability, focus-visible rings
  (`focus-visible:ring-2 ring-[var(--lm-accent)]`), `aria-*` where applicable,
  `aria-hidden` on decorative layers.
- Strict TypeScript, no `any`. Props extend the natural HTML element's props.
- Every component gets a short JSDoc block describing the interaction in one
  or two sentences (what moves and why), plus `@default` notes on key props.
- No external deps beyond what's already in `packages/ui/package.json`
  (motion, clsx, tailwind-merge, class-variance-authority) without discussion.

## Motion language

- Micro-interactions ≤ 450ms. Hovers settle fast (`springs.snap`).
- Entrances breathe once, never wobble twice (`springs.drift`).
- Ambient loops are slow (≥ 1.4s) and low-contrast.
- Nothing autoplays aggressively; ambient effects are opt-in via props.

## Content rules

- All demo copy, names, testimonials, and stats are fictional and original.
- Never reference other component libraries or brands in code, comments, or copy.

## Reference implementations

- `src/components/button.tsx` — cva variants, whileTap physics, shimmer layer.
- `src/components/animated-tooltip.tsx` — motion values, springs, AnimatePresence.
