import type { Metadata } from "next";
import { IconsGallery } from "../../components/icons-gallery";
import { iconItems } from "../../lib/registry";

export const metadata: Metadata = {
  title: "Icons",
  description:
    "60 animated icons on the 24px grid. Hover to play, click to copy the install command.",
};

export default function IconsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-5xl">
          Every glyph is an interaction
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] sm:text-lg">
          {iconItems.length} icons on the 24px grid, each with a built-in
          micro-animation. Hover a tile to play it, tune the whole set below,
          and click any icon to copy its install command —{" "}
          <code className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-1.5 py-0.5 font-mono text-sm">
            npx lumora-ui@latest add icon/&lt;name&gt;
          </code>
          .
        </p>
      </header>
      <IconsGallery />
    </div>
  );
}
