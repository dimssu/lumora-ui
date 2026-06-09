"use client";

import * as React from "react";
import { cn } from "@lumora/ui";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps {
  code: string;
  /** Quiet caption above the block, e.g. "terminal" or "app/globals.css". */
  caption?: string;
  className?: string;
}

/** Plain mono code block with a copy affordance. No highlighting deps. */
export function CodeBlock({ code, caption, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--lm-border)] px-3 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
          {caption ?? "code"}
        </span>
        <CopyButton text={code} label={`Copy ${caption ?? "code"}`} />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed text-[var(--lm-fg-muted)]">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
