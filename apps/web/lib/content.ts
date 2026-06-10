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
  "file-dropzone": {
    title: "File Dropzone",
    exports: "FileDropzone",
    propsNote:
      'onFiles receives the full accepted list whenever it changes; accept and multiple mirror the native input, and label swaps the prompt. Accepted files stack below in an animated list — removing one collapses its row. Click or press Enter to open the picker.',
  },
  "gradient-text": {
    title: "Gradient Text",
    exports: "GradientText",
    propsNote:
      "Wrap any inline text; speed sets seconds per full gradient sweep (default 6). The gradient holds still under reduced motion so the text stays legible.",
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
  rating: {
    title: "Rating",
    exports: "Rating",
    propsNote:
      "count sets the stars (default 5); works controlled via value/onValueChange or uncontrolled via defaultValue. allowHalf enables half-star steps, readOnly locks it to display, and arrow keys adjust the value from the keyboard.",
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
  "text-reveal": {
    title: "Text Reveal",
    exports: "TextReveal",
    propsNote:
      "text is the paragraph to reveal; each word brightens and sheds blur as it crosses a band of the viewport. Give the wrapper vertical room so there is scroll to bind to.",
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
