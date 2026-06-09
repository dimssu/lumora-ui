# Lumora UI — page recipes

Three copy-pasteable skeletons. Each assumes the app already loads the token
sheet once (e.g. in the root layout):

```tsx
import "@lumora/ui/styles.css";
// dark is default; <html data-theme="light"> for light mode
```

Components marked `// planned` are not in the repo yet — check
[component-catalog.md](component-catalog.md) for current status and swap in
an existing primitive if needed.

## 1. Full landing page

Order: Navbar → Hero → FeatureBento → Pricing → Testimonials → Faq →
CtaBanner → Footer. The Hero owns the lumen above the fold; the highlighted
Pricing tier owns it mid-page — never both on screen at once.

```tsx
"use client";

import { Navbar } from "@lumora/ui/blocks/navbar";
import { Hero } from "@lumora/ui/blocks/hero";
import { FeatureBento } from "@lumora/ui/blocks/features";
import { Pricing } from "@lumora/ui/blocks/pricing";
import { Testimonials } from "@lumora/ui/blocks/testimonials";
import { Faq } from "@lumora/ui/blocks/faq";
import { CtaBanner } from "@lumora/ui/blocks/cta";
import { Footer } from "@lumora/ui/blocks/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--lm-bg)] text-[var(--lm-fg)]">
      <Navbar
        links={[
          { label: "Product", href: "#product" },
          { label: "Pricing", href: "#pricing" },
          { label: "Stories", href: "#stories" },
          { label: "Docs", href: "/docs" },
        ]}
        ctaLabel="Start free"
        onCtaClick={() => {}}
      />

      <Hero
        eyebrow="Now in public beta"
        headline="Ship interfaces that feel expensive"
        subcopy="Quiet surfaces, one glowing accent, and springs that settle exactly once."
        primaryCta={{ label: "Start building", onClick: () => {} }}
        secondaryCta={{ label: "Browse the gallery", onClick: () => {} }}
      />

      <section id="product">
        <FeatureBento
          heading="Built for the details"
          subheading="Five reasons the polish holds up under a loupe."
          items={[
            { title: "Motion as a system", body: "Three springs drive every interaction, so screens move as one body." },
            { title: "Own the code", body: "Install components as source. No black box, no styling fights." },
            { title: "Dark-first tokens", body: "One variable sheet, two themes, zero hardcoded hex." },
            { title: "Keyboard everything", body: "Focus rings, roving tab stops, reduced-motion fallbacks." },
            { title: "Tree-shakable", body: "Deep imports keep cold starts lean." },
          ]}
        />
      </section>

      <section id="pricing">
        <Pricing
          defaultPeriod="monthly"
          onSelect={(tier, period) => console.log(tier.name, period)}
        />
      </section>

      <section id="stories">
        <Testimonials heading="Loved in the quiet hours" />
      </section>

      <Faq
        heading="Questions, answered"
        items={[
          { question: "Does it work with my stack?", answer: "Any React 18+ app with Tailwind." },
          { question: "Can I theme it?", answer: "Override any --lm-* token; light mode is one attribute." },
        ]}
      />

      <CtaBanner
        headline="Make your product glow"
        subcopy="Start free. Upgrade when the compliments start."
        ctaLabel="Get started"
        onCtaClick={() => {}}
      />

      <Footer
        tagline="Interfaces that glow."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Components", href: "#components" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Docs", href: "/docs" },
              { label: "Changelog", href: "/changelog" },
            ],
          },
        ]}
      />
    </main>
  );
}
```

## 2. Dashboard shell

Sidebar + topbar frame around a stat row and tabbed content. `CommandMenu`
rides on ⌘K. The lumen lives in the active stat card only.

```tsx
"use client";

import { Sidebar } from "@lumora/ui/blocks/sidebar"; // planned
import { Topbar } from "@lumora/ui/blocks/topbar"; // planned
import { AnimatedTabs } from "@lumora/ui/components/animated-tabs";
import { SpotlightCard } from "@lumora/ui/components/spotlight-card";
import { NumberTicker } from "@lumora/ui/components/number-ticker";
import { CommandMenu, useCommandMenu } from "@lumora/ui/ai/command-menu";

export default function DashboardShell() {
  const menu = useCommandMenu(); // binds ⌘K / Ctrl-K

  return (
    <div className="flex min-h-screen bg-[var(--lm-bg)] text-[var(--lm-fg)]">
      <Sidebar
        items={[
          { id: "overview", label: "Overview" },
          { id: "reports", label: "Reports" },
          { id: "settings", label: "Settings" },
        ]}
        activeId="overview"
        onNavigate={(id) => console.log(id)}
      />

      <div className="flex flex-1 flex-col">
        <Topbar title="Overview" actions={null} />

        <main className="flex flex-1 flex-col gap-6 p-6">
          {/* Stat row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Active teams", value: 4218 },
              { label: "Sessions today", value: 96210 },
              { label: "Avg. settle time", value: 312 },
            ].map((stat) => (
              <SpotlightCard key={stat.label} className="p-5">
                <p className="text-xs text-[var(--lm-fg-muted)]">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold">
                  <NumberTicker value={stat.value} />
                </p>
              </SpotlightCard>
            ))}
          </div>

          <AnimatedTabs
            items={[
              { id: "traffic", label: "Traffic" },
              { id: "revenue", label: "Revenue" },
              { id: "retention", label: "Retention" },
            ]}
          />

          {/* …charts / tables for the active tab… */}
        </main>
      </div>

      <CommandMenu
        open={menu.open}
        onOpenChange={menu.setOpen}
        items={[
          { id: "go-overview", label: "Go to Overview", group: "Navigate", keywords: ["home"], onSelect: () => {} },
          { id: "go-reports", label: "Go to Reports", group: "Navigate", onSelect: () => {} },
          { id: "new-report", label: "New report", hint: "⇧N", group: "Actions", onSelect: () => {} },
          { id: "toggle-theme", label: "Toggle theme", group: "Actions", keywords: ["dark", "light"], onSelect: () => {} },
        ]}
      />
    </div>
  );
}
```

## 3. AI-enhanced docs page

Prose wrapped in `SelectionToolbar`, `CommandMenu` for search, `ChatWidget`
floating bottom-right. All handlers are app-supplied — wire them to whatever
backend you use; nothing here assumes a provider.

```tsx
"use client";

import { SelectionToolbar } from "@lumora/ui/ai/selection-toolbar";
import { CommandMenu, useCommandMenu } from "@lumora/ui/ai/command-menu";
import { ChatWidget, type ChatMessage } from "@lumora/ui/ai/chat-widget";

// App-supplied: stream an answer from your own endpoint.
async function* streamAnswer(prompt: string): AsyncIterable<string> {
  const res = await fetch("/api/answer", { method: "POST", body: prompt });
  const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield value;
  }
}

export default function DocsPage() {
  const menu = useCommandMenu();

  return (
    <main className="min-h-screen bg-[var(--lm-bg)] text-[var(--lm-fg)]">
      <SelectionToolbar
        // Defaults are Ask / Summarize / Rewrite / Code; override as needed.
        onAction={(actionId, selectedText) =>
          console.log(actionId, selectedText)
        }
      >
        <article className="prose mx-auto max-w-2xl px-6 py-16">
          <h1>Getting started</h1>
          <p>
            Select any passage on this page to ask about it, summarize it,
            rewrite it, or turn it into code.
          </p>
          {/* …docs content… */}
        </article>
      </SelectionToolbar>

      <CommandMenu
        open={menu.open}
        onOpenChange={menu.setOpen}
        placeholder="Search the docs…"
        items={[
          { id: "install", label: "Installation", group: "Guides", keywords: ["setup", "tailwind"], onSelect: () => {} },
          { id: "theming", label: "Theming & tokens", group: "Guides", keywords: ["dark", "light", "css"], onSelect: () => {} },
          { id: "motion", label: "Motion language", group: "Guides", keywords: ["springs", "animation"], onSelect: () => {} },
          { id: "button", label: "Button", group: "Components", onSelect: () => {} },
        ]}
      />

      <ChatWidget
        title="Docs helper"
        placeholder="Ask about the docs…"
        onSend={(text: string, history: ChatMessage[]) =>
          streamAnswer(text) // or return a Promise<string> for one-shot replies
        }
      />
    </main>
  );
}
```
