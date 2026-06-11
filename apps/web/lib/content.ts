/** Per-component display metadata for the gallery and detail pages. */
export interface ComponentMeta {
  /** Human title, e.g. "Animated Tabs". */
  title: string;
  /** Comma-separated named exports for the import snippet. */
  exports: string;
  /** One short paragraph on the props that matter. */
  propsNote: string;
}

export const componentMeta: Record<string, ComponentMeta> = {
  accordion: {
    title: "Accordion",
    exports: "Accordion, AccordionItem",
    propsNote:
      "type switches between a single open panel and several at once; defaultValue picks the row(s) open on mount. Compose rows with AccordionItem, each carrying a unique value and a title node.",
  },
  alert: {
    title: "Alert",
    exports: "Alert",
    propsNote:
      'tone: neutral | accent | positive | negative — the negative tone announces assertively via role="alert", the rest stay polite. title bolds the first line and icon overrides the tone glyph. dismissible (default false) adds a close button that collapses the height while it fades; onDismiss fires after.',
  },
  "animated-tabs": {
    title: "Animated Tabs",
    exports: "AnimatedTabs",
    propsNote:
      "items takes { value, label, content } objects; the active pill slides between triggers as a shared element. Works controlled via value/onValueChange or uncontrolled via defaultValue. Arrow keys, Home and End move the selection.",
  },
  "animated-tooltip": {
    title: "Animated Tooltip",
    exports: "AnimatedTooltip",
    propsNote:
      "items is an array of { id, name, hint?, src? } — omit src to fall back to initials. avatarSize sets the avatar diameter in px (default 44). The tooltip leans with your cursor over each avatar.",
  },
  announcement: {
    title: "Announcement Bar",
    exports: "AnnouncementBar",
    propsNote:
      'Give it an id and dismissal sticks across visits via localStorage. tone: "neutral" | "accent"; link adds a trailing link whose arrow nudges forward on hover; dismissible (default true) shows the close button and onDismiss fires after it collapses.',
  },
  "aurora-background": {
    title: "Aurora Background",
    exports: "AuroraBackground",
    propsNote:
      "A section wrapper: pass your content as children. animated (default true) drives the slow blob drift and is forced off under reduced motion.",
  },
  avatar: {
    title: "Avatar",
    exports: "Avatar, AvatarGroup",
    propsNote:
      "name is required and drives the initials fallback, which crossfades in if src errors. size: xs–xl; shape: circle | square; status adds a positive/negative/away dot. AvatarGroup overlaps its children and collapses overflow past max into a +N chip.",
  },
  badge: {
    title: "Badge",
    exports: "Badge",
    propsNote:
      "variant: neutral | accent | positive | negative | outline; size: sm | md. dot leads with a status dot in the variant's tone, and pulse loops a soft expanding ring around it (implying dot). The ring holds still under reduced motion.",
  },
  "beam-grid": {
    title: "Beam Grid",
    exports: "BeamGrid",
    propsNote:
      "density sets the grid cell size in px (default 56); beamCount controls how many lumen beams travel the lines (default 3). Beams disappear under reduced motion, leaving the quiet grid.",
  },
  "border-beam": {
    title: "Border Beam",
    exports: "BorderBeam",
    propsNote:
      'Wrap a single child; the wrapper is rounded at radius-lg by default, so match the child\'s radius (or override via className). duration is seconds per lap (default 6), beamWidth the painted ring in px (default 2), and color picks "lumen" or "dusk". Reduced motion leaves a static gradient ring.',
  },
  breadcrumbs: {
    title: "Breadcrumbs",
    exports: "Breadcrumbs",
    propsNote:
      "items take { label, href? } — the last renders as the current page. maxVisible (default 4) collapses the middle into an ellipsis you can expand; separator swaps the glyph. Hovering a link slides a lumen underline in from the left.",
  },
  button: {
    title: "Button",
    exports: "Button",
    propsNote:
      'variant: solid | accent | outline | ghost | glow; size: sm | md | lg | icon. shimmer sweeps a soft light across on a slow loop. Presses sink physically on the snap spring.',
  },
  card: {
    title: "Card",
    exports: "Card, CardHeader, CardTitle, CardBody, CardFooter",
    propsNote:
      "variant: quiet | lift | glow — quiet sits flat, lift raises 2px with a deeper shadow on hover, glow carries the lumen. padding: none | sm | md | lg (default md). Compose with the header, title, body and footer subcomponents.",
  },
  carousel: {
    title: "Carousel",
    exports: "Carousel",
    propsNote:
      "Each child is a slide. itemsPerView shows several at once — fractions peek the next edge — and gap spaces them in px. Drag to flick with elastic edges, or steer with the arrows, dots and keyboard; showArrows/showDots hide the chrome.",
  },
  checkbox: {
    title: "Checkbox",
    exports: "Checkbox",
    propsNote:
      "Works controlled (checked + onCheckedChange) or uncontrolled (defaultChecked). label and description render beside the box, wired via aria-labelledby and aria-describedby; indeterminate shows a dash and reports mixed to assistive tech. The check stroke draws in along its path.",
  },
  "cursor-trail": {
    title: "Cursor Trail",
    exports: "CursorTrail",
    propsNote:
      "images cycle in order as cards spawn; threshold is pointer travel in px between spawns (default 28). maxItems caps the live cards (default 8) and cardWidth sizes them in px (default 96, 4:5 ratio). Cards are decorative and render beneath the children; reduced motion spawns none.",
  },
  dialog: {
    title: "Dialog",
    exports: "Dialog",
    propsNote:
      "Controlled: pass open and onOpenChange. title labels the dialog for assistive tech. Escape and overlay clicks close it; focus moves into the panel on open and returns to the trigger on close.",
  },
  dock: {
    title: "Dock",
    exports: "Dock, DockItem",
    propsNote:
      "magnification sets the peak scale under the cursor (default 1.7). Each DockItem needs a label (its tooltip) and an optional size in px; items magnify with cursor proximity and hold still under reduced motion.",
  },
  drawer: {
    title: "Drawer",
    exports: "Drawer",
    propsNote:
      'Controlled: pass open and onOpenChange. side: "left" | "right" | "bottom" picks the edge (default right); title heads the panel and labels it for assistive tech. Drag the panel past 30% of its size (or flick) to dismiss; Escape and overlay clicks close it, with focus trapped inside and restored on close.',
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    exports: "DropdownMenu",
    propsNote:
      'trigger fills the built-in button; items mixes plain actions ({ label, icon?, onSelect, destructive?, disabled? }) with { kind: "checkbox" | "separator" | "label" } entries — checkbox items toggle via onCheckedChange and keep the menu open. align: "start" | "end" sets the anchored edge; the menu flips above when space runs out, with arrows, Home/End, typeahead and Enter on the keyboard.',
  },
  "elastic-stack": {
    title: "Elastic Stack",
    exports: "ElasticStack",
    propsNote:
      "Children are the cards, front to back, each filling the container — give the stack an explicit size via className. threshold is the drag distance plus flick momentum needed to fling the top card (default 100); onTopChange reports the original index that lands on top. Arrow keys cycle the deck and the dots jump straight to a card.",
  },
  "file-dropzone": {
    title: "File Dropzone",
    exports: "FileDropzone",
    propsNote:
      'onFiles receives the full accepted list whenever it changes; accept and multiple mirror the native input, and label swaps the prompt. Accepted files stack below in an animated list — removing one collapses its row. Click or press Enter to open the picker.',
  },
  "flip-text": {
    title: "Flip Text",
    exports: "FlipText",
    propsNote:
      "words cycles on a timer; interval is ms each word holds (default 2600). Characters tip away and in around the X axis with an 18ms stagger while the container width glides between words; a sr-only live region announces each word and reduced motion crossfades instead.",
  },
  folder: {
    title: "Folder",
    exports: "Folder",
    propsNote:
      "items takes up to three nodes that rise out of the slot with a stagger and a slight fan; label captions the folder and size sets its width in px (default 116). Hovering tilts the lid open on its bottom hinge; clicking toggles it held open — real button semantics with aria-expanded.",
  },
  "glitch-text": {
    title: "Glitch Text",
    exports: "GlitchText",
    propsNote:
      'children must be a plain string. trigger: "hover" fires a ~350ms burst on mouse enter, "loop" repeats every ~3s; intensity (0–1, default 0.6) scales how far the lumen and dusk copies stray. The text never glitches under reduced motion.',
  },
  "gradient-text": {
    title: "Gradient Text",
    exports: "GradientText",
    propsNote:
      "Wrap any inline text; speed sets seconds per full gradient sweep (default 6). The gradient holds still under reduced motion so the text stays legible.",
  },
  "hover-link": {
    title: "Hover Link",
    exports: "HoverLink",
    propsNote:
      'A real anchor — all native <a> props pass through. variant: "slide" wipes the underline in from the left and out to the right, "center" blooms from the middle, "draw" overshoots past the text on a spring before settling. arrow appends a glyph that nudges up-right; keyboard focus shows the underline too.',
  },
  input: {
    title: "Input",
    exports: "Input",
    propsNote:
      "label is required and floats from the placeholder position on focus or value. error renders a validation message in the negative tone and wires aria-describedby. All native input props pass through.",
  },
  kbd: {
    title: "Kbd",
    exports: "Kbd",
    propsNote:
      'combo like "mod+k" renders platform glyphs — ⌘ on Mac, Ctrl elsewhere — and plain children work too. With listen, the cap physically presses down whenever the real combo is struck.',
  },
  "magnetic-button": {
    title: "Magnetic Zone",
    exports: "MagneticZone",
    propsNote:
      "Wrap anything to make it magnetic. radius is the engage distance from center in px (default 120); strength is the fraction of the cursor offset the child travels (default 0.35). Disabled entirely under reduced motion.",
  },
  marquee: {
    title: "Marquee",
    exports: "Marquee",
    propsNote:
      "speed is travel in px per second (default 48); direction flips the belt; pauseOnHover stops it under the cursor; fade soft-masks both edges; gap spaces the items. The duplicate loop copy is aria-hidden.",
  },
  "morph-text": {
    title: "Morph Text",
    exports: "MorphText",
    propsNote:
      "words cycles on a timer; interval is ms each word holds (default 2600). The outgoing word blurs and fades while the incoming one sharpens out of the same blur with a subtle tracking widen, overlapping ~40% of the transition; a sr-only live region announces each word.",
  },
  "number-ticker": {
    title: "Number Ticker",
    exports: "NumberTicker",
    propsNote:
      "value is the number to land on; from, decimals, prefix and suffix shape the count. Ticks up on a spring once scrolled into view; shows the final value immediately under reduced motion.",
  },
  "otp-input": {
    title: "OTP Input",
    exports: "OtpInput",
    propsNote:
      "length sets the digit count (default 6). onChange fires per keystroke and onComplete once every cell is filled; pasting a full code distributes it across the cells. label names the group for assistive tech.",
  },
  pagination: {
    title: "Pagination",
    exports: "Pagination",
    propsNote:
      'count is the total number of pages; the active pill glides between numbers as a shared element. Works controlled via page/onPageChange or uncontrolled via defaultPage. siblingCount sets how many neighbors stay visible around the current page before the range collapses into ellipses — first and last are always pinned.',
  },
  popover: {
    title: "Popover",
    exports: "Popover",
    propsNote:
      'trigger fills the built-in button and children fill the panel. side picks the preferred edge (default "bottom") and flips when the viewport is tight. Works controlled via open/onOpenChange or uncontrolled via defaultOpen; Escape, outside clicks and focus-out dismiss it.',
  },
  progress: {
    title: "Progress",
    exports: "Progress",
    propsNote:
      "value is completion from 0–100; the fill glides to each new value on the glide spring. indeterminate sends a lumen segment traveling the track instead, and gradient blends the fill from the lumen into the dusk accent.",
  },
  "radio-group": {
    title: "Radio Group",
    exports: "RadioGroup, RadioItem",
    propsNote:
      "RadioGroup works controlled via value/onValueChange or uncontrolled via defaultValue, with orientation switching the layout. Each RadioItem carries a value, a label and an optional description; selecting one pops the dot in and blooms a lumen ring once. Arrow keys move and select in a single gesture.",
  },
  rating: {
    title: "Rating",
    exports: "Rating",
    propsNote:
      "count sets the stars (default 5); works controlled via value/onValueChange or uncontrolled via defaultValue. allowHalf enables half-star steps, readOnly locks it to display, and arrow keys adjust the value from the keyboard.",
  },
  "reveal-list": {
    title: "Reveal List",
    exports: "RevealList",
    propsNote:
      "items take { title, meta?, src, href? } — hovering a row summons a floating preview image that trails the cursor on a soft spring while the other rows dim; keyboard focus pins the preview to the row's right edge. Rows render as links when href is set, otherwise as buttons firing onItemClick.",
  },
  "scroll-progress": {
    title: "Scroll Progress",
    exports: "ScrollProgress",
    propsNote:
      'position: "top" | "bottom" picks the viewport edge. The 2px fill is smoothed by the glide spring; with reduced motion it tracks scroll directly. This very page mounts one — watch the top edge as you scroll.',
  },
  "segmented-control": {
    title: "Segmented Control",
    exports: "SegmentedControl",
    propsNote:
      'items take { value, label, disabled? }; the raised pill glides between segments as a shared element on the snap spring. Controlled via value/onValueChange or uncontrolled via defaultValue; size: "sm" | "md".',
  },
  select: {
    title: "Select",
    exports: "Select",
    propsNote:
      "options take { value, label, textValue?, disabled? }; works controlled via value/onValueChange or uncontrolled via defaultValue, with placeholder on the empty trigger. Arrow keys, Home/End, typeahead and Enter drive it entirely from the keyboard.",
  },
  skeleton: {
    title: "Skeleton",
    exports: "Skeleton",
    propsNote:
      "Size the single block with className, or pass lines for a paragraph of staggered-width rows. Purely decorative — hidden from assistive tech, and a static block under reduced motion.",
  },
  slider: {
    title: "Slider",
    exports: "Slider",
    propsNote:
      "Controlled (value + onValueChange) or uncontrolled (defaultValue); min, max and step bound the range. bubble floats the value above the thumb while it is dragged or focused, and formatValue shapes its text.",
  },
  spinner: {
    title: "Spinner",
    exports: "Spinner",
    propsNote:
      'variant picks the loader: "orbit" (default) circles a comet arc around a quiet ring, "pulse" breathes a lumen dot, "bars" waves three bars. Sizes sm | md | lg. label (default "Loading") names it for screen readers via role="status"; under reduced motion every variant settles into a slow opacity pulse.',
  },
  spotlight: {
    title: "Spotlight",
    exports: "Spotlight",
    propsNote:
      "size sets the light's diameter in px (default 480). Wrap a section; the lumen circle trails the pointer on the drift spring and fades on enter/leave.",
  },
  "spotlight-card": {
    title: "Spotlight Card",
    exports: "SpotlightCard",
    propsNote:
      "radius sets the glow radius in px (default 260). The card supplies surface, border and overflow handling — just pass children. Every tile in this gallery is one.",
  },
  stepper: {
    title: "Stepper",
    exports: "Stepper",
    propsNote:
      'steps take { label, description? }; activeStep is the zero-based step in progress. Connectors fill with the lumen as steps complete and numbers crossfade into a drawn-in check. onStepClick makes steps clickable; orientation: "horizontal" | "vertical".',
  },
  switch: {
    title: "Switch",
    exports: "Switch",
    propsNote:
      "Works controlled (checked + onCheckedChange) or uncontrolled (defaultChecked). Renders a real button with role=switch; Space and Enter toggle it, and the knob slides on the snap spring.",
  },
  table: {
    title: "Table",
    exports: "Table, TableHeader, TableBody, TableRow, TableHead, TableCell",
    propsNote:
      "Composable table pieces with quiet hairline borders and rows that brighten on hover. stickyHeader on Table pins the head inside the scroll wrapper. sortable on a TableHead renders a button cycling asc/desc with a spring-rotated chevron and aria-sort — ordering is delegated through onSort, so your data stays yours.",
  },
  "text-reveal": {
    title: "Text Reveal",
    exports: "TextReveal",
    propsNote:
      "text is the paragraph to reveal; each word brightens and sheds blur as it crosses a band of the viewport. Give the wrapper vertical room so there is scroll to bind to.",
  },
  textarea: {
    title: "Textarea",
    exports: "Textarea",
    propsNote:
      "label floats as the placeholder and rises on focus or value, with the accent underline drawing in from the left — the multiline sibling of Input. autoGrow (default true) resizes to the content, capped by maxRows before it scrolls. error paints the message and underline in the negative tone.",
  },
  "tilt-card": {
    title: "Tilt Card",
    exports: "TiltCard",
    propsNote:
      "maxTilt caps the tilt in degrees at the edges (default 10); glare adds a soft lumen glare that tracks the pointer. preserve-3d is set, so children can pop with their own translateZ.",
  },
  timeline: {
    title: "Timeline",
    exports: "Timeline",
    propsNote:
      "items take { title, time?, body?, icon? }. The spine draws itself downward the first time the list scrolls into view, while each node pops and its content drifts in.",
  },
  toast: {
    title: "Toast",
    exports: "toast, Toaster",
    propsNote:
      "Mount Toaster once near the app root — it portals to document.body and stacks toasts bottom-right. Call toast({ title, description?, variant?, action?, duration? }) from anywhere; it returns an id for toast.dismiss(id). Hovering a toast pauses its auto-dismiss timer.",
  },
  "toggle-group": {
    title: "Toggle Group",
    exports: "ToggleGroup",
    propsNote:
      'type: "single" | "multiple" — single mode glides a backplate between pressed items as a shared element, multiple latches each item independently. items take a value plus an icon and/or label; works controlled via value/onValueChange or uncontrolled via defaultValue. Arrow keys rove, sizes sm | md.',
  },
  tooltip: {
    title: "Tooltip",
    exports: "Tooltip",
    propsNote:
      'Wrap a single element; content fills the bubble. side picks the preferred edge (default "top") and flips automatically when the viewport is tight; delay is the hover wait in ms (default 300).',
  },
  typewriter: {
    title: "Typewriter",
    exports: "Typewriter",
    propsNote:
      "words cycles through your strings; typeSpeed/deleteSpeed are ms per character; holdMs pauses on a completed word; loop starts over after the last. Reduced motion shows the first word statically.",
  },
  "auth-form": {
    title: "Auth Form",
    exports: "AuthForm",
    propsNote:
      "Switches between sign-in and sign-up via the footer toggle — controlled with mode/onModeChange or uncontrolled via defaultMode. onSubmit receives { email, password } plus the mode; ssoProviders and onSsoSelect fill the divider row; error renders above the submit button.",
  },
  changelog: {
    title: "Changelog",
    exports: "Changelog",
    propsNote:
      'releases carry version, date, title, items and optional tags toned "new" (lumen), "improved" (dusk) or "fixed" (positive), listed newest first along the hairline spine. heading and subheading top the section.',
  },
  cta: {
    title: "CTA Banner",
    exports: "CtaBanner",
    propsNote:
      "headline, subcopy and ctaLabel are plain strings; onCtaClick handles the press. A lumen radial glow breathes slowly behind the headline and holds still under reduced motion.",
  },
  faq: {
    title: "FAQ",
    exports: "Faq",
    propsNote:
      "items is an array of { question, answer }; defaultOpen picks the row open on mount (null for all closed). The heading column stays pinned on large screens while disclosures unfold on the right.",
  },
  features: {
    title: "Feature Bento",
    exports: "FeatureBento",
    propsNote:
      "items take { icon?, title, body } in display order — the first fills the large 2×2 anchor cell, the rest flow into small cells. heading and subheading top the section.",
  },
  footer: {
    title: "Footer",
    exports: "Footer",
    propsNote:
      "columns is an array of { title, links }; logo and tagline fill the brand column; newsletter (default true) renders the inline form and onSubscribe receives the entered email.",
  },
  hero: {
    title: "Hero",
    exports: "Hero",
    propsNote:
      "headline staggers word by word out of a blur; eyebrow, subcopy, primaryCta/secondaryCta ({ label, onClick }) and avatars shape the rest. Pass avatars={[]} to hide the trust row, and media for a panel that drifts up beneath the copy.",
  },
  "logo-strip": {
    title: "Logo Strip",
    exports: "LogoStrip",
    propsNote:
      "logos are fictional text wordmarks ({ name, className? }) styled per brand; label sets the muted line above. marquee (default true) scrolls them at speed px per second with soft edge fades — false renders a static grid instead.",
  },
  navbar: {
    title: "Navbar",
    exports: "Navbar",
    propsNote:
      "links is an array of { label, href }; logo replaces the default wordmark; ctaLabel/onCtaClick drive the accent button. threshold sets the scroll distance before the blurred backdrop settles in (default 24).",
  },
  pricing: {
    title: "Pricing",
    exports: "Pricing",
    propsNote:
      "tiers carry name, description, monthly/yearly prices, features and ctaLabel; mark one highlighted for the lumen glow. defaultPeriod picks the billing toggle's start; onTierSelect receives the tier and period.",
  },
  sidebar: {
    title: "Sidebar",
    exports: "Sidebar",
    propsNote:
      "sections group items ({ id, label, icon, href? or onClick?, badge? }); works controlled via activeId/collapsed or uncontrolled with the demo defaults. The bottom toggle collapses the rail to icons with tooltips; onItemSelect receives the pressed item.",
  },
  stats: {
    title: "Stats Band",
    exports: "StatsBand",
    propsNote:
      'stats take { value, label, prefix?, suffix?, decimals?, trend? } — each number ticks up once scrolled into view, and trend tints its hint positive for "up", negative for "down".',
  },
  team: {
    title: "Team Grid",
    exports: "TeamGrid",
    propsNote:
      "members take { name, role, bio, initials?, links? }; initials derive from the name when omitted and link chips reveal on hover. heading and subheading top the section.",
  },
  testimonials: {
    title: "Testimonials",
    exports: "Testimonials",
    propsNote:
      "items ({ quote, name, role }) split evenly across two counter-drifting rows; speed sets the loop pace. Hover pauses the row under the cursor; reduced motion renders a static wrapped grid.",
  },
  topbar: {
    title: "Topbar",
    exports: "Topbar",
    propsNote:
      "leading slots a breadcrumb or page title; searchHint/searchShortcut shape the search button and onSearchClick wires it to your palette. userName/userDetail and menuItems ({ label, onClick?, danger? }) drive the avatar dropdown, with full keyboard navigation.",
  },
  "chat-widget": {
    title: "Chat Widget",
    exports: "ChatWidget",
    propsNote:
      "onSend receives the text and history — return a Promise<string> for one reply or an AsyncIterable<string> to stream chunks into the assistant bubble. title, placeholder and initialMessages seed the panel.",
  },
  "command-menu": {
    title: "Command Menu",
    exports: "CommandMenu, useCommandMenu",
    propsNote:
      "useCommandMenu owns the open state and binds the global ⌘K/Ctrl-K toggle; spread its open/setOpen onto CommandMenu. items take { id, label, hint?, keywords?, group?, onSelect } and are fuzzy-filtered as you type.",
  },
  "selection-toolbar": {
    title: "Selection Toolbar",
    exports: "SelectionToolbar",
    propsNote:
      "Wrap the content to listen to; actions ({ id, label, icon? }) fill the pill, and onAction receives the action id plus the selected text. Collapsing the selection, scrolling, or Escape dismisses it.",
  },
};

export function metaFor(slug: string): ComponentMeta {
  return (
    componentMeta[slug] ?? {
      title: slug,
      exports: "",
      propsNote: "",
    }
  );
}
