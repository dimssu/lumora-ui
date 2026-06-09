# Lumora UI — component catalog

Import paths use the workspace package. CLI-installed source maps to
`components/lumora/<file>` with identical APIs. Status **available** means
the file exists in the repo today; **planned** files are scheduled and will
land at the expected path with the listed API surface.

## Components (`packages/ui/src/components/`)

| Component | Import path | Purpose | Key props | Status |
| --- | --- | --- | --- | --- |
| `Accordion` / `AccordionItem` | `@lumora/ui/components/accordion` | Spring-height disclosure list, one item open at a time | `Accordion`: children; `AccordionItem`: `title`, `children` | available |
| `AnimatedTabs` | `@lumora/ui/components/animated-tabs` | Tab row with a shared pill indicator gliding between tabs | `items: AnimatedTabItem[]`, selection callbacks | available |
| `AnimatedTooltip` | `@lumora/ui/components/animated-tooltip` | Overlapping avatar row; tooltip leans with the cursor | `items: { id, name, hint?, src? }[]`, `avatarSize` (44) | available |
| `AuroraBackground` | `@lumora/ui/components/aurora-background` | Slow ambient gradient wash behind hero content | `children`, ambient opt-in props | available |
| `BeamGrid` | `@lumora/ui/components/beam-grid` | Decorative grid with light beams tracing the lines | `children`, density/speed props | available |
| `Button` | `@lumora/ui/components/button` | Core button; presses sink with a spring | `variant: solid\|accent\|outline\|ghost\|glow`, `size: sm\|md\|lg\|icon`, `shimmer` | available |
| `Dialog` | `@lumora/ui/components/dialog` | Controlled modal over a dimmed overlay; Escape/overlay close | `open`, `onOpenChange(open)`, `title`, `children` | available |
| `Dock` / `DockItem` | `@lumora/ui/components/dock` | macOS-style magnifying icon dock | `Dock`: children; `DockItem`: icon + label | available |
| `GradientText` | `@lumora/ui/components/gradient-text` | Headline span with an animated gradient sheen | `children`, speed/colors via tokens | available |
| `Input` | `@lumora/ui/components/input` | Floating-label text input with accent underline draw | `label` (required), `error`, native input props | available |
| `MagneticZone` | `@lumora/ui/components/magnetic-button` | Wrapper that magnetically pulls its child toward the cursor | `children`, pull strength | available |
| `Marquee` | `@lumora/ui/components/marquee` | Infinite horizontal scroller for logos/quotes | `children`, `speed`, direction, hover-pause | available |
| `NumberTicker` | `@lumora/ui/components/number-ticker` | Animates a number up from zero when scrolled into view | `value`, formatting props | available |
| `ScrollProgress` | `@lumora/ui/components/scroll-progress` | Thin accent bar tracking page scroll | placement/thickness props | available |
| `Spotlight` | `@lumora/ui/components/spotlight` | Page-level radial light that follows the pointer | `children`, radius/strength | available |
| `SpotlightCard` | `@lumora/ui/components/spotlight-card` | Card whose border/glow follows the cursor | `children`, glow radius | available |
| `Switch` | `@lumora/ui/components/switch` | Accessible toggle; knob slides on a snap spring | `checked`, `defaultChecked` (false), `onCheckedChange(checked)` | available |
| `TextReveal` | `@lumora/ui/components/text-reveal` | Per-word reveal as text scrolls into view | `text` | available |
| `TiltCard` | `@lumora/ui/components/tilt-card` | 3D perspective tilt toward the cursor | `children`, max tilt | available |
| `Typewriter` | `@lumora/ui/components/typewriter` | Types/erases through a list of strings | strings list, speeds, loop | available |

## Blocks (`packages/ui/src/blocks/`)

| Block | Import path | Purpose | Key props | Status |
| --- | --- | --- | --- | --- |
| `Navbar` | `@lumora/ui/blocks/navbar` | Sticky nav; transparent over hero, blurred after scroll; shared hover underline; mobile drawer | `logo`, `links: { label, href }[]`, `ctaLabel`, `onCtaClick`, `threshold` (24) | available |
| `Hero` | `@lumora/ui/blocks/hero` | Centered hero; words rise from blur, trust row settles last | `eyebrow`, `headline`, `subcopy`, `primaryCta`/`secondaryCta: { label, onClick? }`, `avatars`, `trustedBy`, `media` | available |
| `FeatureBento` | `@lumora/ui/blocks/features` | Bento grid; first item fills the 2×2 cell | `heading`, `subheading`, `items: { icon?, title, body }[]` | available |
| `Pricing` | `@lumora/ui/blocks/pricing` | Three-tier pricing with monthly/yearly toggle; highlighted tier carries the lumen | `heading`, `subheading`, `tiers: PricingTier[]`, `defaultPeriod`, `onSelect(tier, period)` | available |
| `Testimonials` | `@lumora/ui/blocks/testimonials` | Two counter-scrolling marquee rows of quotes | `heading`, `subheading`, `items: { quote, name, role }[]`, `speed` (1.6) | available |
| `Faq` | `@lumora/ui/blocks/faq` | Two-column FAQ with sticky heading and disclosure list | `heading`, `subheading`, `items: { question, answer }[]`, `defaultOpen` (0, `null` = all closed) | available |
| `CtaBanner` | `@lumora/ui/blocks/cta` | Full-width closing band; a lumen glow breathes behind the headline | `headline`, `subcopy`, `ctaLabel`, `onCtaClick` | available |
| `Footer` | `@lumora/ui/blocks/footer` | Multi-column site footer with brand, newsletter form, small print | `logo`, `tagline`, `columns: { title, links: { label, href }[] }[]`, `smallPrint`, `newsletter` (true), `newsletterHeading` | available |
| `Sidebar` | `@lumora/ui/blocks/sidebar` | Collapsible dashboard navigation rail | `items`, `activeId`, `onNavigate` | planned |
| `Topbar` | `@lumora/ui/blocks/topbar` | Dashboard header with breadcrumb + actions slot | `title`, `actions` | planned |

## AI (`packages/ui/src/ai/`)

All AI components are backend-agnostic: they receive handler props and never
assume a provider.

| Component | Import path | Purpose | Key props | Status |
| --- | --- | --- | --- | --- |
| `SelectionToolbar` | `@lumora/ui/ai/selection-toolbar` | Floating pill of actions above any text selected inside it | `actions: { id, label, icon? }[]` (default Ask/Summarize/Rewrite/Code), `onAction(actionId, selectedText)`, `children` | available |
| `CommandMenu` + `useCommandMenu()` | `@lumora/ui/ai/command-menu` | ⌘K palette with inline fuzzy match, grouped results, full keyboard nav | `open`, `onOpenChange`, `items: { id, label, hint?, keywords?, group?, onSelect }[]`, `placeholder`; hook returns `{ open, setOpen, toggle }` and binds ⌘K/Ctrl-K | available |
| `ChatWidget` (+ `ChatMessage` type) | `@lumora/ui/ai/chat-widget` | Floating launcher that springs open into a chat panel; streams replies | `onSend(text, history) => Promise<string> \| AsyncIterable<string>`, `title` ("Chat"), `placeholder`, `initialMessages` | available |

## Lib (`packages/ui/src/lib/`)

| Export | Import path | Purpose |
| --- | --- | --- |
| `cn(...inputs)` | `@lumora/ui/lib/cn` | clsx + tailwind-merge class combiner |
| `springs`, `eases`, `durations` | `@lumora/ui/lib/motion` | The motion language: `snap` / `drift` / `glide` springs, ease curves, standard durations |
