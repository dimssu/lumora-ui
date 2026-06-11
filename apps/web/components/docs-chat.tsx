"use client";

import * as React from "react";
import { ChatWidget } from "@lumora/ui";

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

function pickReply(text: string): string {
  const q = text.toLowerCase();
  if (q.includes("spring") || q.includes("motion")) {
    return "Lumora ships three named springs. snap (stiffness 480) handles hovers and presses, drift (260) handles entrances and tooltips, and glide (170) handles layout shifts. Import them from @lumora/ui's lib/motion and the whole page moves as one body.";
  }
  if (q.includes("theme") || q.includes("dark") || q.includes("light")) {
    return "Theming is one attribute: dark is the resting :root, and data-theme=\"light\" on any ancestor flips the full token set — surfaces, strokes, type, the lumen, and shadows. Override --lm-accent to retheme the glow.";
  }
  if (q.includes("install") || q.includes("add")) {
    return "Run npx lumora-ui@latest init to wire Tailwind and the tokens, then npx lumora-ui@latest add <component> to copy the source into your repo. No black-box package — you own every line.";
  }
  return "This reply is streaming from a local async generator, word by word — no network, no model. Wire onSend to your own backend and return either a Promise<string> or an AsyncIterable<string>; the widget handles streaming, the typing indicator, and scroll position.";
}

async function* streamReply(text: string): AsyncIterable<string> {
  const reply = pickReply(text);
  await sleep(450);
  const words = reply.split(" ");
  for (let i = 0; i < words.length; i++) {
    await sleep(36);
    yield (words[i] ?? "") + (i < words.length - 1 ? " " : "");
  }
}

/**
 * Live ChatWidget wired to a local async generator. The frame's transform
 * makes it the containing block, so the fixed-position launcher pins to the
 * frame instead of the viewport.
 */
export function DocsChat() {
  return (
    <div
      className="relative h-[440px] overflow-hidden rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-bg)]"
      style={{ transform: "translate(0)" }}
    >
      <div className="max-w-sm p-6">
        <p className="text-sm leading-relaxed text-[var(--lm-fg-faint)]">
          Open the launcher in the corner and ask about springs, theming, or
          installing. Replies stream from a local generator — try it.
        </p>
      </div>
      <ChatWidget
        onSend={streamReply}
        title="Ask Lumora"
        placeholder="Ask about springs, themes, installs…"
        initialMessages={[
          {
            id: "greeting",
            role: "assistant",
            content:
              "Hello — I'm a demo wired to a fake async generator. Ask me about the motion system, theming, or installing components.",
          },
        ]}
      />
    </div>
  );
}
