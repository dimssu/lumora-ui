"use client";

import * as React from "react";
import * as LumoraIcons from "@lumora/icons";
import type { IconAnimateMode, IconProps } from "@lumora/icons";
import { cn } from "@lumora/ui";
import { addIconCommand, iconItems, pascalCase } from "../lib/registry";

const MODES: IconAnimateMode[] = ["hover", "mount", "loop", "none"];

function iconComponentFor(
  name: string,
): React.ComponentType<IconProps> | undefined {
  const exportName = `${pascalCase(name)}Icon`;
  const mod = LumoraIcons as unknown as Record<
    string,
    React.ComponentType<IconProps> | undefined
  >;
  return mod[exportName];
}

/**
 * The full icon set with shared size / stroke / animation controls.
 * Clicking a tile copies its CLI install command.
 */
export function IconsGallery() {
  const [size, setSize] = React.useState(24);
  const [strokeWidth, setStrokeWidth] = React.useState(1.75);
  const [mode, setMode] = React.useState<IconAnimateMode>("hover");
  const [copied, setCopied] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(addIconCommand(name));
      setCopied(name);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      {/* Controls */}
      <div className="mt-10 flex flex-col gap-6 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-5 sm:flex-row sm:items-end sm:gap-10">
        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="icon-size"
            className="flex justify-between text-xs font-medium text-[var(--lm-fg-muted)]"
          >
            Size <span className="font-mono text-[var(--lm-fg-faint)]">{size}px</span>
          </label>
          <input
            id="icon-size"
            type="range"
            min={16}
            max={48}
            step={1}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="icon-stroke"
            className="flex justify-between text-xs font-medium text-[var(--lm-fg-muted)]"
          >
            Stroke{" "}
            <span className="font-mono text-[var(--lm-fg-faint)]">
              {strokeWidth.toFixed(2)}
            </span>
          </label>
          <input
            id="icon-stroke"
            type="range"
            min={1}
            max={3}
            step={0.25}
            value={strokeWidth}
            onChange={(event) => setStrokeWidth(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span
            id="icon-mode-label"
            className="text-xs font-medium text-[var(--lm-fg-muted)]"
          >
            Animate
          </span>
          <div
            role="group"
            aria-labelledby="icon-mode-label"
            className="flex w-fit items-center gap-1 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] p-1"
          >
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-[var(--lm-radius-full)] px-3 py-1 text-xs font-medium capitalize outline-none",
                  "transition-colors duration-[var(--lm-duration-fast)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                  mode === m
                    ? "bg-[var(--lm-surface)] text-[var(--lm-fg)] border border-[var(--lm-border-strong)]"
                    : "border border-transparent text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? `Copied install command for ${copied}` : ""}
      </p>

      {/* Grid */}
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {iconItems.map((item) => {
          const Icon = iconComponentFor(item.name);
          if (!Icon) return null;
          const isCopied = copied === item.name;
          return (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => copy(item.name)}
                aria-label={`Copy install command for the ${item.name} icon`}
                className={cn(
                  "group flex w-full flex-col items-center gap-3 rounded-[var(--lm-radius)] border px-3 py-6 outline-none",
                  "border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-fg)]",
                  "transition-colors duration-[var(--lm-duration-fast)]",
                  "hover:border-[var(--lm-border-strong)] hover:bg-[var(--lm-surface-2)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                )}
              >
                <span
                  className="flex items-center justify-center"
                  style={{ height: 48 }}
                >
                  <Icon
                    key={`${item.name}-${mode}-${size}-${strokeWidth}`}
                    size={size}
                    strokeWidth={strokeWidth}
                    animate={mode}
                  />
                </span>
                <span
                  className={cn(
                    "font-mono text-xs",
                    isCopied
                      ? "text-[var(--lm-positive)]"
                      : "text-[var(--lm-fg-muted)] group-hover:text-[var(--lm-fg)]",
                  )}
                >
                  {isCopied ? "copied" : item.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
