"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface KbdProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  /**
   * Shortcut like `"mod+k"` or `"shift+enter"`. `mod` renders ⌘ on Mac
   * platforms and Ctrl elsewhere. Plain children work too.
   */
  combo?: string;
  /** Press the cap down whenever the real combo is hit. @default false */
  listen?: boolean;
  children?: React.ReactNode;
}

const MAC_GLYPHS: Record<string, string> = {
  mod: "⌘",
  meta: "⌘",
  cmd: "⌘",
  ctrl: "⌃",
  alt: "⌥",
  shift: "⇧",
  enter: "↵",
  escape: "Esc",
  esc: "Esc",
  space: "Space",
  backspace: "⌫",
  tab: "⇥",
};

const PC_GLYPHS: Record<string, string> = {
  mod: "Ctrl",
  meta: "Win",
  cmd: "Ctrl",
  ctrl: "Ctrl",
  alt: "Alt",
  shift: "Shift",
  enter: "↵",
  escape: "Esc",
  esc: "Esc",
  space: "Space",
  backspace: "⌫",
  tab: "Tab",
};

function renderCombo(combo: string, isMac: boolean) {
  const glyphs = isMac ? MAC_GLYPHS : PC_GLYPHS;
  return combo
    .split("+")
    .map((part) => {
      const key = part.trim().toLowerCase();
      return glyphs[key] ?? (key.length === 1 ? key.toUpperCase() : part.trim());
    })
    .join(isMac ? "" : "+");
}

function comboMatches(combo: string, e: KeyboardEvent, isMac: boolean) {
  const parts = combo.split("+").map((p) => p.trim().toLowerCase());
  const mods = {
    mod: isMac ? e.metaKey : e.ctrlKey,
    meta: e.metaKey,
    cmd: e.metaKey,
    ctrl: e.ctrlKey,
    alt: e.altKey,
    shift: e.shiftKey,
  };
  return parts.every((part) => {
    if (part in mods) return mods[part as keyof typeof mods];
    if (part === "space") return e.key === " ";
    if (part === "esc" || part === "escape") return e.key === "Escape";
    return e.key.toLowerCase() === part;
  });
}

/**
 * A keyboard key cap with a raised bottom edge. With `listen` on, the cap
 * physically presses down — translating 1px and flattening its base —
 * whenever the real key combo is struck.
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ combo, listen = false, className, children, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const [isMac, setIsMac] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);

    React.useEffect(() => {
      setIsMac(/mac|iphone|ipad/i.test(navigator.platform));
    }, []);

    React.useEffect(() => {
      if (!listen || !combo) return;
      const down = (e: KeyboardEvent) => {
        if (comboMatches(combo, e, isMac)) setPressed(true);
      };
      const up = () => setPressed(false);
      window.addEventListener("keydown", down);
      window.addEventListener("keyup", up);
      window.addEventListener("blur", up);
      return () => {
        window.removeEventListener("keydown", down);
        window.removeEventListener("keyup", up);
        window.removeEventListener("blur", up);
      };
    }, [listen, combo, isMac]);

    return (
      <motion.kbd
        ref={ref}
        animate={
          reduceMotion
            ? undefined
            : { y: pressed ? 1 : 0, borderBottomWidth: pressed ? 1 : 2 }
        }
        transition={springs.snap}
        className={cn(
          "inline-flex h-6 min-w-6 items-center justify-center px-1.5",
          "rounded-[var(--lm-radius-sm)] border border-[var(--lm-border-strong)] border-b-2",
          "bg-[var(--lm-surface-2)] font-mono text-[11px] font-medium leading-none",
          "select-none text-[var(--lm-fg-muted)]",
          pressed && "bg-[var(--lm-accent-soft)] text-[var(--lm-fg)]",
          className,
        )}
        {...props}
      >
        {combo ? renderCombo(combo, isMac) : children}
      </motion.kbd>
    );
  },
);
Kbd.displayName = "Kbd";
