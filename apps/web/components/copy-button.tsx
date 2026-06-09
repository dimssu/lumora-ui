"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@lumora/icons";
import { cn } from "@lumora/ui";

export interface CopyButtonProps {
  /** Text written to the clipboard on press. */
  text: string;
  /** Accessible name while idle. @default "Copy to clipboard" */
  label?: string;
  className?: string;
}

/** Small icon button that copies `text` and confirms with a check. */
export function CopyButton({
  text,
  label = "Copy to clipboard",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — nothing useful to do */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--lm-radius-sm)]",
        "border border-[var(--lm-border)] bg-[var(--lm-surface-2)] outline-none",
        "transition-colors duration-[var(--lm-duration-fast)]",
        "hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
        copied ? "text-[var(--lm-positive)]" : "text-[var(--lm-fg-muted)]",
        className,
      )}
    >
      {copied ? (
        <CheckIcon size={14} animate="mount" />
      ) : (
        <CopyIcon size={14} />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
