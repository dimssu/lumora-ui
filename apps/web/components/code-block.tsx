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

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "const",
  "return",
  "function",
  "async",
  "await",
  "new",
  "type",
  "interface",
]);

/**
 * Minimal hand-rolled tokenizer for the short snippets on this site.
 * One pass, three tints: comments, string literals, common keywords.
 * Anything it doesn't recognize stays plain — no parser, no deps.
 */
const TOKEN_PATTERN = new RegExp(
  [
    String.raw`(\/\/[^\n]*|\/\*[\s\S]*?\*\/)`, // 1: comments
    String.raw`("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|` +
      "`(?:[^`\\\\]|\\\\.)*`)", // 2: strings
    String.raw`\b(${[...KEYWORDS].join("|")})\b`, // 3: keywords
  ].join("|"),
  "g",
);

function tintCode(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  TOKEN_PATTERN.lastIndex = 0;
  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) out.push(code.slice(cursor, index));
    const [text, comment, string, keyword] = match;
    const color = comment
      ? "text-[var(--lm-fg-faint)]"
      : string
        ? "text-[var(--lm-positive)]"
        : keyword
          ? "text-[var(--lm-accent-2)]"
          : undefined;
    out.push(
      color ? (
        <span key={key++} className={color}>
          {text}
        </span>
      ) : (
        text
      ),
    );
    cursor = index + text.length;
  }
  if (cursor < code.length) out.push(code.slice(cursor));
  return out;
}

/** Mono code block with a copy affordance and light token tinting. No deps. */
export function CodeBlock({ code, caption, className }: CodeBlockProps) {
  const tinted = React.useMemo(() => tintCode(code), [code]);
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
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed text-[var(--lm-fg)]">
        <code className="font-mono">{tinted}</code>
      </pre>
    </div>
  );
}
