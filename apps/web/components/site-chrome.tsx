"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CommandMenu,
  Footer,
  Navbar,
  ScrollProgress,
  useCommandMenu,
  type CommandMenuItem,
  type FooterColumn,
} from "@lumora/ui";
import {
  categoryLabel,
  componentItems,
  iconItems,
} from "../lib/registry";
import { metaFor } from "../lib/content";
import { ThemeToggle } from "./theme-toggle";

function Wordmark() {
  return (
    <Link
      href="/"
      className="flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-[var(--lm-fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
    >
      <span
        aria-hidden
        className="h-2 w-2 rounded-full bg-[var(--lm-accent)] shadow-[0_0_12px_var(--lm-glow)]"
      />
      Lumora
    </Link>
  );
}

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Icons", href: "/icons" },
  { label: "Docs", href: "/docs" },
  { label: "Skill", href: "/skill" },
];

const footerColumns: FooterColumn[] = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/components" },
      { label: "Icons", href: "/icons" },
      { label: "Documentation", href: "/docs" },
      { label: "Agent skill", href: "/skill" },
    ],
  },
  {
    title: "Foundations",
    links: [
      { label: "Tokens & theming", href: "/docs#theming" },
      { label: "Motion language", href: "/docs#motion" },
      { label: "Accessibility", href: "/docs#accessibility" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Hero", href: "/components/hero" },
      { label: "Spotlight Card", href: "/components/spotlight-card" },
      { label: "Command Menu", href: "/components/command-menu" },
      { label: "Dock", href: "/components/dock" },
    ],
  },
  {
    title: "Start",
    links: [
      { label: "Install", href: "/docs#install" },
      { label: "Init the CLI", href: "/docs#init" },
      { label: "AI components", href: "/docs#ai" },
    ],
  },
];

/**
 * Shared shell: scroll progress, navbar, ⌘K command menu, theme toggle,
 * footer. The command menu indexes every component and icon page.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const menu = useCommandMenu();

  const menuItems = React.useMemo<CommandMenuItem[]>(() => {
    const pages: CommandMenuItem[] = [
      {
        id: "page-home",
        label: "Home",
        hint: "/",
        group: "Pages",
        keywords: ["landing", "lumora"],
        onSelect: () => router.push("/"),
      },
      {
        id: "page-components",
        label: "Component gallery",
        hint: "/components",
        group: "Pages",
        keywords: ["gallery", "all"],
        onSelect: () => router.push("/components"),
      },
      {
        id: "page-icons",
        label: "Icon set",
        hint: "/icons",
        group: "Pages",
        keywords: ["icons", "glyphs"],
        onSelect: () => router.push("/icons"),
      },
      {
        id: "page-docs",
        label: "Documentation",
        hint: "/docs",
        group: "Pages",
        keywords: ["install", "theming", "motion"],
        onSelect: () => router.push("/docs"),
      },
      {
        id: "page-skill",
        label: "Agent skill",
        hint: "/skill",
        group: "Pages",
        keywords: ["skill", "agent", "ai", "download", "lumora-builder"],
        onSelect: () => router.push("/skill"),
      },
    ];

    const components: CommandMenuItem[] = componentItems.map((item) => ({
      id: `component-${item.name}`,
      label: metaFor(item.name).title,
      hint: `/components/${item.name}`,
      group: categoryLabel(item.category),
      keywords: [item.name, item.category],
      onSelect: () => router.push(`/components/${item.name}`),
    }));

    const icons: CommandMenuItem[] = iconItems.map((item) => ({
      id: `icon-${item.name}`,
      label: `${item.name} icon`,
      hint: "/icons",
      group: "Icons",
      keywords: [item.name, "icon"],
      onSelect: () => router.push("/icons"),
    }));

    return [...pages, ...components, ...icons];
  }, [router]);

  /**
   * The library's Navbar and Footer render plain anchors; intercept
   * same-origin clicks so navigation stays client-side.
   */
  const interceptLinks = React.useCallback(
    (event: React.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement).closest("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || !href.startsWith("/")) return;
      if (anchor.target && anchor.target !== "_self") return;
      event.preventDefault();
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <ScrollProgress />
      <div onClickCapture={interceptLinks}>
        <Navbar
          logo={<Wordmark />}
          links={navLinks}
          ctaLabel="Get started"
          onCtaClick={() => router.push("/docs")}
        />
      </div>
      <main>{children}</main>
      <div onClickCapture={interceptLinks}>
        <Footer
          logo={<Wordmark />}
          tagline="Interfaces that glow."
          columns={footerColumns}
          smallPrint={`© ${new Date().getFullYear()} Lumora Labs. MIT licensed.`}
        />
      </div>
      <ThemeToggle />
      <CommandMenu
        open={menu.open}
        onOpenChange={menu.setOpen}
        items={menuItems}
        placeholder="Search components, icons, docs…"
      />
    </>
  );
}
