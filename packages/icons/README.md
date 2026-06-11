# @lumora/icons

Animated icons for Lumora UI. *Interfaces that glow* — down to the glyph.

## Philosophy

Icons are interactions, not decoration. Every Lumora icon is a complete,
optically balanced glyph at rest, with one purposeful micro-animation
(≤ 450 ms, spring-feel) baked into its `active` state: the mail flap opens,
the bell swings, the trash lid tips. Motion explains what the control does
before you commit to it.

## Usage

```tsx
import { MailIcon } from "@lumora/icons";

<MailIcon animate="hover" />
<MailIcon animate="mount" size={24} />
<SendIcon animate="loop" strokeWidth={1.5} label="Send message" />
```

Icons inherit `currentColor`, so they tint with the surrounding text.

## The four modes

| `animate`  | Behavior                                                       |
| ---------- | -------------------------------------------------------------- |
| `"hover"`  | Plays while hovered, settles back on leave. **Default.**        |
| `"mount"`  | Plays once when the icon enters the tree, then rests.           |
| `"loop"`   | Plays, rests, repeats every ~2.4 s. Ambient — use sparingly.    |
| `"none"`   | Static glyph. Also forced when the user prefers reduced motion. |

## Sizing & stroke

All icons live on a 24 px grid and render at `size={20}` with
`strokeWidth={1.75}` by default. Strokes are `currentColor` with round caps
and joins. At 16 px, nudge `strokeWidth` up to ~2 to hold weight; at 32 px+,
ease it toward 1.5.

## Accessibility

Icons are `aria-hidden` by default (decorative). Pass `label="..."` to get
`role="img"` + `aria-label` when an icon stands alone.

## CLI

Prefer copy-paste ownership? Pull a single icon into your project:

```sh
npx lumora-ui@latest add icon/mail
```
