import {
  DocsSidebar,
  type DocsSidebarGroup,
} from "../../../components/docs-sidebar";
import { metaFor } from "../../../lib/content";
import { categoryLabel, componentItems } from "../../../lib/registry";

const groupOrder = ["component", "block", "ai"] as const;

/**
 * Detail-page frame: a persistent left index of every component (so the
 * active indicator glides between rows on navigation) beside the page
 * content. The sidebar is data-driven from the registry.
 */
export default function ComponentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groups: DocsSidebarGroup[] = groupOrder.map((category) => ({
    label: categoryLabel(category),
    items: componentItems
      .filter((item) => item.category === category)
      .map((item) => ({ slug: item.name, title: metaFor(item.name).title }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  }));

  return (
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-6 lg:px-6">
      <DocsSidebar groups={groups} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
