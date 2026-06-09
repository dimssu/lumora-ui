"use client";

import * as React from "react";
import Link from "next/link";
import { SpotlightCard } from "@lumora/ui";
import { ComponentDemo } from "./demos";
import { CopyButton } from "./copy-button";

export interface GalleryTileProps {
  slug: string;
  title: string;
  description: string;
  command: string;
}

/** One gallery tile: live preview, name, blurb, and the CLI command. */
export function GalleryTile({
  slug,
  title,
  description,
  command,
}: GalleryTileProps) {
  return (
    <SpotlightCard className="flex h-full flex-col">
      <div className="flex h-64 items-center justify-center overflow-hidden border-b border-[var(--lm-border)] p-5">
        <ComponentDemo slug={slug} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h2 className="text-base font-semibold text-[var(--lm-fg)]">
          <Link
            href={`/components/${slug}`}
            className="rounded-[var(--lm-radius-sm)] outline-none transition-colors duration-[var(--lm-duration-fast)] hover:text-[var(--lm-accent)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
          >
            {title}
          </Link>
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          {description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <code className="min-w-0 flex-1 truncate rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-2.5 py-1.5 font-mono text-xs text-[var(--lm-fg-muted)]">
            {command}
          </code>
          <CopyButton text={command} label={`Copy install command for ${title}`} />
        </div>
      </div>
    </SpotlightCard>
  );
}
