"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@lumora/icons";

/**
 * Floating light-switch. Dark is the resting state (`:root`); toggling sets
 * `data-theme="light"` on <html> and remembers the choice in localStorage.
 */
export function ThemeToggle() {
  const [light, setLight] = React.useState(false);

  React.useEffect(() => {
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("lumora-theme", next ? "light" : "dark");
    } catch {
      /* private mode — the toggle still works for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className="fixed bottom-5 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-fg-muted)] shadow-[var(--lm-shadow-sm)] transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] outline-none"
    >
      {light ? <MoonIcon size={18} /> : <SunIcon size={18} />}
    </button>
  );
}
