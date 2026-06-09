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
  "aurora-background": {
    title: "Aurora Background",
    exports: "AuroraBackground",
    propsNote:
      "A section wrapper: pass your content as children. animated (default true) drives the slow blob drift and is forced off under reduced motion.",
  },
  "beam-grid": {
    title: "Beam Grid",
    exports: "BeamGrid",
    propsNote:
      "density sets the grid cell size in px (default 56); beamCount controls how many lumen beams travel the lines (default 3). Beams disappear under reduced motion, leaving the quiet grid.",
  },
  button: {
    title: "Button",
    exports: "Button",
    propsNote:
      'variant: solid | accent | outline | ghost | glow; size: sm | md | lg | icon. shimmer sweeps a soft light across on a slow loop. Presses sink physically on the snap spring.',
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
  "scroll-progress": {
    title: "Scroll Progress",
    exports: "ScrollProgress",
    propsNote:
      'position: "top" | "bottom" picks the viewport edge. The 2px fill is smoothed by the glide spring; with reduced motion it tracks scroll directly. This very page mounts one — watch the top edge as you scroll.',
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
  typewriter: {
    title: "Typewriter",
    exports: "Typewriter",
    propsNote:
      "words cycles through your strings; typeSpeed/deleteSpeed are ms per character; holdMs pauses on a completed word; loop starts over after the last. Reduced motion shows the first word statically.",
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
  testimonials: {
    title: "Testimonials",
    exports: "Testimonials",
    propsNote:
      "items ({ quote, name, role }) split evenly across two counter-drifting rows; speed sets the loop pace. Hover pauses the row under the cursor; reduced motion renders a static wrapped grid.",
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
