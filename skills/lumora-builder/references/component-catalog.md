# Lumora UI — component catalog

Import paths use the workspace package. CLI-installed source maps to
`components/lumora/<file>` with identical APIs. Status **available** means
the file exists in the repo today.

## Components (`packages/ui/src/components/`)

| Component | Import path | Purpose | Key props | Status |
| --- | --- | --- | --- | --- |
| `Accordion` / `AccordionItem` | `@lumora/ui/components/accordion` | Spring-height disclosure list, one item open at a time | `Accordion`: children; `AccordionItem`: `title`, `children` | available |
| `Alert` | `@lumora/ui/components/alert` | Callout with tone glyphs; negative tone announces assertively | `tone: neutral\|accent\|positive\|negative`, `title`, `icon`, `dismissible`, `onDismiss` | available |
| `AnimatedTabs` | `@lumora/ui/components/animated-tabs` | Tab row with a shared pill indicator gliding between tabs | `items: AnimatedTabItem[]`, selection callbacks | available |
| `AnimatedTooltip` | `@lumora/ui/components/animated-tooltip` | Overlapping avatar row; tooltip leans with the cursor | `items: { id, name, hint?, src? }[]`, `avatarSize` (44) | available |
| `AnnouncementBar` | `@lumora/ui/components/announcement` | Slim dismissible top banner; collapses away on dismiss | `id` (persists dismissal in localStorage), `tone: neutral\|accent`, `link: { label, href }`, `dismissible` (true), `onDismiss` | available |
| `AuroraBackground` | `@lumora/ui/components/aurora-background` | Slow ambient gradient wash behind hero content | `children`, ambient opt-in props | available |
| `Avatar` / `AvatarGroup` | `@lumora/ui/components/avatar` | Identity disc with initials fallback crossfade; group overlaps with a +N chip | `Avatar`: `name` (required), `src`, `size: xs\|sm\|md\|lg\|xl`, `shape: circle\|square`, `status: positive\|negative\|away`; `AvatarGroup`: children, `max`, `size` | available |
| `Badge` | `@lumora/ui/components/badge` | Status pill; optional dot can pulse a slow ring | `variant: neutral\|accent\|positive\|negative\|outline`, `size: sm\|md`, `dot`, `pulse` | available |
| `BeamGrid` | `@lumora/ui/components/beam-grid` | Decorative grid with light beams tracing the lines | `children`, density/speed props | available |
| `BorderBeam` | `@lumora/ui/components/border-beam` | Luminous beam traveling around the child's border ring | `duration` (6s/lap), `beamWidth`, `color: lumen\|dusk`; match wrapper radius to child | available |
| `Breadcrumbs` | `@lumora/ui/components/breadcrumbs` | Path trail with a sliding lumen hover underline; middle collapses to an ellipsis | `items: { label, href? }[]`, `maxVisible` (4), `separator` | available |
| `Button` | `@lumora/ui/components/button` | Core button; presses sink with a spring | `variant: solid\|accent\|outline\|ghost\|glow`, `size: sm\|md\|lg\|icon`, `shimmer` | available |
| `Card` + `CardHeader`/`CardTitle`/`CardBody`/`CardFooter` | `@lumora/ui/components/card` | Base surface; quiet, lifting, or glowing | `variant: quiet\|lift\|glow`, `padding: none\|sm\|md\|lg` | available |
| `Carousel` | `@lumora/ui/components/carousel` | Drag-to-snap slide track with elastic edges | children as slides, `itemsPerView` (1, fractions peek), `gap` (16), `showArrows`/`showDots` (true), `onIndexChange` | available |
| `Checkbox` | `@lumora/ui/components/checkbox` | Check stroke draws in as the box fills accent | `checked`/`defaultChecked`, `onCheckedChange`, `indeterminate`, `label`, `description` | available |
| `CursorTrail` | `@lumora/ui/components/cursor-trail` | Pointer travel leaves a popping, fading trail of image cards | `images: string[]`, `threshold` (28px), `maxItems` (8) | available |
| `Dialog` | `@lumora/ui/components/dialog` | Controlled modal over a dimmed overlay; Escape/overlay close | `open`, `onOpenChange(open)`, `title`, `children` | available |
| `Dock` / `DockItem` | `@lumora/ui/components/dock` | macOS-style magnifying icon dock | `Dock`: children; `DockItem`: icon + label | available |
| `Drawer` | `@lumora/ui/components/drawer` | Side sheet with blurred overlay, spring slide, drag-to-dismiss | `side: left\|right\|bottom`, `open`/`onOpenChange`, `title` | available |
| `DropdownMenu` | `@lumora/ui/components/dropdown-menu` | Anchored menu with action/checkbox/destructive items, full keyboard semantics | `trigger`, `items` (kind discriminant), `align: start\|end` | available |
| `ElasticStack` | `@lumora/ui/components/elastic-stack` | Fanned card deck; drag the top card past a threshold to cycle it to the back | children (cards), `threshold`; container needs explicit size | available |
| `FileDropzone` | `@lumora/ui/components/file-dropzone` | Drop zone that glows on dragover; animated accepted-file list | `onFiles(files)`, `accept`, `multiple` (false), `label` | available |
| `FlipText` | `@lumora/ui/components/flip-text` | Words flip in 3D around the X axis with per-character stagger | `words: string[]`, `interval` (2600ms) | available |
| `Folder` | `@lumora/ui/components/folder` | CSS folder whose lid opens to fan up to 3 items out of the slot | `items: ReactNode[]` (max 3), `label`; hover or click toggles | available |
| `GlitchText` | `@lumora/ui/components/glitch-text` | Clean text that briefly glitches with tinted offset slices | `trigger: hover\|loop`, `intensity` (0-1) | available |
| `GradientText` | `@lumora/ui/components/gradient-text` | Headline span with an animated gradient sheen | `children`, speed/colors via tokens | available |
| `HoverLink` | `@lumora/ui/components/hover-link` | Anchor with animated underline variants and optional arrow nudge | `variant: slide\|center\|draw`, `arrow`, anchor props | available |
| `Input` | `@lumora/ui/components/input` | Floating-label text input with accent underline draw | `label` (required), `error`, native input props | available |
| `Kbd` | `@lumora/ui/components/kbd` | Key cap that presses down when the real combo is hit | `combo` (e.g. `"mod+k"`, platform glyphs), `listen` (false), children | available |
| `MagneticZone` | `@lumora/ui/components/magnetic-button` | Wrapper that magnetically pulls its child toward the cursor | `children`, pull strength | available |
| `Marquee` | `@lumora/ui/components/marquee` | Infinite horizontal scroller for logos/quotes | `children`, `speed`, direction, hover-pause | available |
| `MorphText` | `@lumora/ui/components/morph-text` | Words dissolve into each other through blur with a tracking widen | `words: string[]`, `interval` | available |
| `NumberTicker` | `@lumora/ui/components/number-ticker` | Animates a number up from zero when scrolled into view | `value`, formatting props | available |
| `OtpInput` | `@lumora/ui/components/otp-input` | Per-digit code entry; cells pop as they fill, paste distributes | `length` (6), `value`/`defaultValue`, `onChange(code)`, `onComplete(code)`, `label` | available |
| `Pagination` | `@lumora/ui/components/pagination` | Page numbers with a gliding active pill and ellipsis collapse | `count`, `page`/`defaultPage`, `onPageChange`, `siblingCount` | available |
| `Popover` | `@lumora/ui/components/popover` | Anchored panel that breathes out of its trigger; flips on collision | `trigger`, `children`, `side` (bottom), `open`/`defaultOpen`, `onOpenChange` | available |
| `Progress` | `@lumora/ui/components/progress` | Spring-glide fill, or a traveling indeterminate segment | `value` (0–100), `indeterminate`, `gradient` | available |
| `RadioGroup` / `RadioItem` | `@lumora/ui/components/radio-group` | Radios whose dot pops in with a one-shot lumen bloom | group: `value`/`onValueChange`, `orientation`; item: `value`, `label`, `description` | available |
| `Rating` | `@lumora/ui/components/rating` | Star rating with hover sweep and keyboard steps | `count` (5), `value`/`defaultValue`, `onValueChange`, `allowHalf`, `readOnly`, `label` | available |
| `RevealList` | `@lumora/ui/components/reveal-list` | Editorial rows; hover summons a floating preview image trailing the cursor | `items: { title, meta?, src, href? }[]`, `onItemClick` | available |
| `ScrollProgress` | `@lumora/ui/components/scroll-progress` | Thin accent bar tracking page scroll | placement/thickness props | available |
| `SegmentedControl` | `@lumora/ui/components/segmented-control` | Pill segment switcher; raised pill glides as a shared element | `items: { value, label, disabled? }[]`, `value`/`defaultValue`, `onValueChange`, `size: sm\|md` | available |
| `Select` | `@lumora/ui/components/select` | Listbox; options cascade in, full keyboard + typeahead | `options: { value, label, textValue?, disabled? }[]`, `value`/`defaultValue`, `onValueChange`, `placeholder` | available |
| `Separator` | `@lumora/ui/components/separator` | Edge-fading gradient rule, horizontal or vertical | `orientation`, `label`, `decorative` (true) | available |
| `Skeleton` | `@lumora/ui/components/skeleton` | Loading shimmer block, or a paragraph of staggered lines | size via `className`, `lines` | available |
| `Slider` | `@lumora/ui/components/slider` | Range slider; thumb swells while dragged, optional value bubble | `value`/`defaultValue`, `min`/`max`/`step`, `onValueChange`, `bubble`, `formatValue` | available |
| `Spinner` | `@lumora/ui/components/spinner` | Brand loaders: orbiting comet arc, breathing dot, waving bars | `variant: orbit\|pulse\|bars`, `size: sm\|md\|lg`, `label` | available |
| `Spotlight` | `@lumora/ui/components/spotlight` | Page-level radial light that follows the pointer | `children`, radius/strength | available |
| `SpotlightCard` | `@lumora/ui/components/spotlight-card` | Card whose border/glow follows the cursor | `children`, glow radius | available |
| `Stepper` | `@lumora/ui/components/stepper` | Steps whose connectors fill with the lumen; numbers become drawn checks | `steps: { label, description? }[]`, `activeStep` (0), `onStepClick` (makes steps clickable), `orientation: horizontal\|vertical` | available |
| `Switch` | `@lumora/ui/components/switch` | Accessible toggle; knob slides on a snap spring | `checked`, `defaultChecked` (false), `onCheckedChange(checked)` | available |
| `Table` + `TableHeader/TableBody/TableRow/TableHead/TableCell` | `@lumora/ui/components/table` | Quiet data table; sortable heads delegate ordering via `onSort` | `stickyHeader`; head: `sortable`, `sortDirection`, `onSort` | available |
| `Textarea` | `@lumora/ui/components/textarea` | Floating-label multiline that grows with its content | `label`, `autoGrow` (true), `maxRows`, `error` | available |
| `TextReveal` | `@lumora/ui/components/text-reveal` | Per-word reveal as text scrolls into view | `text` | available |
| `TiltCard` | `@lumora/ui/components/tilt-card` | 3D perspective tilt toward the cursor | `children`, max tilt | available |
| `Timeline` | `@lumora/ui/components/timeline` | Vertical events; the spine draws itself on scroll into view | `items: { title, time?, body?, icon? }[]` | available |
| `toast()` + `Toaster` | `@lumora/ui/components/toast` | Global toast stack; `Toaster` portals to body, bottom-right | `toast({ title, description?, variant: default\|positive\|negative, action?, duration? })` returns an id; `toast.dismiss(id)`; mount `Toaster` once near the root | available |
| `ToggleGroup` | `@lumora/ui/components/toggle-group` | Pressed-button group; single mode glides a shared backplate | `type: single\|multiple`, `items: { value, icon?, label? }[]`, `value`/`onValueChange`, `size` | available |
| `Tooltip` | `@lumora/ui/components/tooltip` | Delayed anchored tooltip; flips when the viewport is tight | `content`, single child element, `side` (top), `delay` (300) | available |
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
| `Sidebar` | `@lumora/ui/blocks/sidebar` | Collapsible dashboard rail; active pill, badges, icon tooltips when collapsed | `brand`, `sections: { title?, items: { id, label, icon, href?/onClick?, badge? }[] }[]`, `activeId`/`defaultActiveId`, `onItemSelect`, `collapsed`/`defaultCollapsed`, `onCollapsedChange` | available |
| `Topbar` | `@lumora/ui/blocks/topbar` | Dashboard header: breadcrumb slot, search button, avatar dropdown | `leading`, `searchHint`/`searchShortcut`, `onSearchClick`, `actions`, `userName`/`userDetail`, `menuItems: { label, onClick?, danger? }[]`, `onMenuItemSelect` | available |
| `AuthForm` | `@lumora/ui/blocks/auth-form` | Centered auth card on a lumen glow; sign-in/sign-up toggle | `mode`/`defaultMode`, `onModeChange`, `error`, `ssoProviders: { label, icon? }[]`, `onSubmit({ email, password }, mode)`, `onSsoSelect` | available |
| `StatsBand` | `@lumora/ui/blocks/stats` | Horizontal band of large counting stats with trend hints | `stats: { value, label, prefix?, suffix?, decimals?, trend?: { label, direction } }[]` | available |
| `TeamGrid` | `@lumora/ui/blocks/team` | Team section; link chips reveal on hover | `heading`, `subheading`, `members: { name, role, bio, initials?, links? }[]` | available |
| `Changelog` | `@lumora/ui/blocks/changelog` | Release notes along a hairline spine, newest first | `heading`, `subheading`, `releases: { version, date, title, items, tags?: { label, tone: new\|improved\|fixed }[] }[]` | available |
| `LogoStrip` | `@lumora/ui/blocks/logo-strip` | "Trusted by" belt of fictional text wordmarks | `label`, `logos: { name, className? }[]`, `marquee` (true), `speed` (36), `fade` (true) | available |

## AI (`packages/ui/src/ai/`)

All AI components are backend-agnostic: they receive handler props and never
assume a provider.

| Component | Import path | Purpose | Key props | Status |
| --- | --- | --- | --- | --- |
| `SelectionToolbar` | `@lumora/ui/ai/selection-toolbar` | Floating pill of actions above any text selected inside it | `actions: { id, label, icon? }[]` (default Ask/Summarize/Rewrite/Code), `onAction(actionId, selectedText)`, `children` | available |
| `CommandMenu` + `useCommandMenu()` | `@lumora/ui/ai/command-menu` | ⌘K palette with inline fuzzy match, grouped results, full keyboard nav | `open`, `onOpenChange`, `items: { id, label, hint?, keywords?, group?, onSelect }[]`, `placeholder`; hook returns `{ open, setOpen, toggle }` and binds ⌘K/Ctrl-K | available |
| `ChatWidget` (+ `ChatMessage` type) | `@lumora/ui/ai/chat-widget` | Floating launcher that springs open into a chat panel; streams replies | `onSend(text, history) => Promise<string> \| AsyncIterable<string>`, `title` ("Chat"), `placeholder`, `initialMessages` | available |

## Icons (`packages/icons/src/icons/`)

60 animated icons on the 24px grid, exported from `@lumora/icons` as
`<PascalName>Icon` (e.g. `ArrowRightIcon`, `GitBranchIcon`). All share the
same props via `IconBase`: `size` (20), `strokeWidth` (1.75), and
`animate: "hover" | "mount" | "loop" | "none"` (hover). Icons are
decorative by default; naming one via `aria-label` gives it `role="img"`.
Install standalone copies with `npx lumora-ui@latest add icon/<name>`.

## Lib (`packages/ui/src/lib/`)

| Export | Import path | Purpose |
| --- | --- | --- |
| `cn(...inputs)` | `@lumora/ui/lib/cn` | clsx + tailwind-merge class combiner |
| `springs`, `eases`, `durations` | `@lumora/ui/lib/motion` | The motion language: `snap` / `drift` / `glide` springs, ease curves, standard durations |
