import type { Metadata } from "next";
import { GalleryTile } from "../../components/gallery-tile";
import { metaFor } from "../../lib/content";
import { addCommand, categoryLabel, componentItems } from "../../lib/registry";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Every Lumora component, live. Hover, press, and scroll the demos — then copy one command to own the source.",
};

const sections = ["component", "block", "ai"] as const;

const sectionCopy: Record<(typeof sections)[number], string> = {
  component: "The core set. Every demo below is the real component, live.",
  block: "Full landing sections that take arrays in and ship polish out.",
  ai: "Command menus, chat, and selection surfaces — AI as a first-class citizen.",
};

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-5xl">
          The gallery
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] sm:text-lg">
          {componentItems.length} components, each one live on this page.
          Hover the cards, open the dialogs, drag your cursor through the
          docks — then copy one command to install the source.
        </p>
      </header>

      {sections.map((category) => {
        const items = componentItems.filter(
          (item) => item.category === category,
        );
        if (items.length === 0) return null;
        return (
          <section
            key={category}
            aria-labelledby={`section-${category}`}
            className="mt-16"
          >
            <h2
              id={`section-${category}`}
              className="text-xl font-semibold text-[var(--lm-fg)]"
            >
              {categoryLabel(category)}
            </h2>
            <p className="mt-1.5 text-sm text-[var(--lm-fg-muted)]">
              {sectionCopy[category]}
            </p>
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <GalleryTile
                  key={item.name}
                  slug={item.name}
                  title={metaFor(item.name).title}
                  description={item.description}
                  command={addCommand(item.name)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
