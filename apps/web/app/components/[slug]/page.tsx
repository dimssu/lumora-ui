import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "../../../components/code-block";
import { ComponentDemo } from "../../../components/demos";
import { metaFor } from "../../../lib/content";
import {
  addCommand,
  categoryLabel,
  componentItems,
  findComponent,
  importPath,
} from "../../../lib/registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return componentItems.map((item) => ({ slug: item.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findComponent(slug);
  if (!item) return {};
  return {
    title: metaFor(slug).title,
    description: item.description,
  };
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = findComponent(slug);
  if (!item) notFound();

  const meta = metaFor(slug);
  const command = addCommand(slug);
  const importSnippet = `import { ${meta.exports} } from "${importPath(item)}";\n// or from the barrel:\nimport { ${meta.exports} } from "@lumora/ui";`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link
          href="/components"
          className="rounded-[var(--lm-radius-sm)] text-[var(--lm-fg-muted)] outline-none transition-colors duration-[var(--lm-duration-fast)] hover:text-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
        >
          ← All components
        </Link>
      </nav>

      <header className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
          {categoryLabel(item.category)}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--lm-fg-muted)]">
          {item.description}
        </p>
      </header>

      <section aria-label="Live demo" className="mt-10">
        <div
          className={`min-h-[320px] w-full overflow-hidden rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] ${
            item.category === "block"
              ? "px-2 py-6 sm:px-4"
              : "flex items-center justify-center p-5 sm:p-8"
          }`}
        >
          <ComponentDemo slug={slug} variant="full" />
        </div>
      </section>

      <section aria-labelledby="install-heading" className="mt-12">
        <h2
          id="install-heading"
          className="text-xl font-semibold text-[var(--lm-fg)]"
        >
          Install
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          Copies the component source — plus its small internal deps — into
          your project. You own the code from the first minute.
        </p>
        <CodeBlock className="mt-4" caption="terminal" code={command} />
      </section>

      <section aria-labelledby="import-heading" className="mt-10">
        <h2
          id="import-heading"
          className="text-xl font-semibold text-[var(--lm-fg)]"
        >
          Import
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          Using the workspace package instead? Deep imports keep cold starts
          lean; the barrel is fully tree-shakable either way.
        </p>
        <CodeBlock className="mt-4" caption="app/page.tsx" code={importSnippet} />
      </section>

      <section aria-labelledby="props-heading" className="mt-10">
        <h2
          id="props-heading"
          className="text-xl font-semibold text-[var(--lm-fg)]"
        >
          Props worth knowing
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          {meta.propsNote} Props extend the natural HTML element, so
          className, event handlers, and aria attributes pass straight
          through.
        </p>
      </section>
    </div>
  );
}
