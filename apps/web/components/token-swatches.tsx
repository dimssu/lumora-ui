import * as React from "react";

interface Swatch {
  token: string;
  label: string;
  /** A tone hint so type tokens still read on a dark chip. */
  kind?: "fill" | "type";
}

const SWATCHES: Swatch[] = [
  { token: "--lm-bg", label: "Background", kind: "fill" },
  { token: "--lm-surface", label: "Surface", kind: "fill" },
  { token: "--lm-surface-2", label: "Surface 2", kind: "fill" },
  { token: "--lm-border-strong", label: "Border", kind: "fill" },
  { token: "--lm-fg", label: "Foreground", kind: "type" },
  { token: "--lm-fg-muted", label: "Muted", kind: "type" },
  { token: "--lm-accent", label: "The lumen", kind: "fill" },
  { token: "--lm-accent-2", label: "The dusk", kind: "fill" },
];

/**
 * A live swatch row painted straight from the page's --lm-* variables, so it
 * tracks the active theme (and any retheme) automatically — no duplicated hex.
 */
export function TokenSwatches() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {SWATCHES.map((swatch) => (
        <div
          key={swatch.token}
          className="flex flex-col gap-2 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-2.5"
        >
          <div
            aria-hidden
            className="h-10 w-full rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)]"
            style={{
              background:
                swatch.kind === "type"
                  ? `linear-gradient(135deg, var(--lm-surface-2), var(--lm-surface-2))`
                  : `var(${swatch.token})`,
            }}
          >
            {swatch.kind === "type" && (
              <div
                className="flex h-full w-full items-center justify-center text-lg font-semibold"
                style={{ color: `var(${swatch.token})` }}
              >
                Aa
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-[var(--lm-fg)]">
              {swatch.label}
            </span>
            <span className="font-mono text-[11px] text-[var(--lm-fg-faint)]">
              {swatch.token}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
