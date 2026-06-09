import registry from "../../../registry/registry.json";

export type RegistryCategory = "component" | "block" | "ai" | "icon";

export interface RegistryItem {
  name: string;
  category: RegistryCategory;
  description: string;
}

const items = registry.items as RegistryItem[];

/** Everything with its own detail page: components, blocks, AI surfaces. */
export const componentItems: RegistryItem[] = items.filter(
  (item) => item.category !== "icon",
);

/** The animated icon set. */
export const iconItems: RegistryItem[] = items.filter(
  (item) => item.category === "icon",
);

export function findComponent(slug: string): RegistryItem | undefined {
  return componentItems.find((item) => item.name === slug);
}

export function addCommand(name: string): string {
  return `npx lumora@latest add ${name}`;
}

export function addIconCommand(name: string): string {
  return `npx lumora@latest add icon/${name}`;
}

export function importPath(item: RegistryItem): string {
  const dir =
    item.category === "block"
      ? "blocks"
      : item.category === "ai"
        ? "ai"
        : "components";
  return `@lumora/ui/${dir}/${item.name}`;
}

export function pascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

const categoryLabels: Record<RegistryCategory, string> = {
  component: "Components",
  block: "Blocks",
  ai: "AI",
  icon: "Icons",
};

export function categoryLabel(category: RegistryCategory): string {
  return categoryLabels[category];
}
