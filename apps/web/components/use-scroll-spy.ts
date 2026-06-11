"use client";

import * as React from "react";

/**
 * Tracks which section is currently in view using a single
 * IntersectionObserver. Returns the id of the section nearest the top of the
 * viewport. The rootMargin biases the active line toward the upper third so a
 * heading lights up as it crosses into reading position, and the last section
 * still wins once you reach the bottom of the page.
 */
export function useScrollSpy(ids: string[]): string | undefined {
  const [activeId, setActiveId] = React.useState<string | undefined>(ids[0]);
  // Stable key so the effect only re-runs when the section set truly changes.
  const key = ids.join("|");

  React.useEffect(() => {
    const sectionIds = key ? key.split("|") : [];
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size > 0) {
          // Pick the first visible section in document order.
          const next = sectionIds.find((id) => visible.has(id));
          if (next) setActiveId(next);
          return;
        }

        // Nothing intersecting (between sections or past the end): fall back to
        // the last section whose top has scrolled above the activation line.
        const line = window.innerHeight * 0.3;
        let candidate: string | undefined;
        for (const el of elements) {
          if (el.getBoundingClientRect().top <= line) candidate = el.id;
        }
        if (candidate) setActiveId(candidate);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
