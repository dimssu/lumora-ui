"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatWidgetProps {
  /**
   * Handles an outgoing message. Receives the new text plus the conversation
   * so far (excluding the new message). Return a `Promise<string>` for a
   * single reply, or an `AsyncIterable<string>` to stream chunks — the widget
   * appends them to the assistant bubble as they arrive.
   */
  onSend: (
    text: string,
    history: ChatMessage[],
  ) => Promise<string> | AsyncIterable<string>;
  /** Panel heading and dialog label. @default "Chat" */
  title?: string;
  /** @default "Ask anything…" */
  placeholder?: string;
  /** Seed the conversation, e.g. with a greeting. */
  initialMessages?: ChatMessage[];
  /** Extra classes on the fixed root (launcher + panel live inside). */
  className?: string;
}

function isAsyncIterable(value: unknown): value is AsyncIterable<string> {
  return (
    typeof value === "object" && value !== null && Symbol.asyncIterator in value
  );
}

function TypingIndicator({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      aria-label="Reply in progress"
      className={cn(
        "flex w-fit items-center gap-1 rounded-[var(--lm-radius)] px-3 py-2.5",
        "border border-[var(--lm-border)] bg-[var(--lm-surface-2)]",
      )}
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-[var(--lm-fg-muted)]"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Floating chat launcher (bottom-right, with a slow lumen pulse) that springs
 * open into a panel from its own corner. Streams replies chunk-by-chunk when
 * `onSend` returns an async iterable; a three-dot indicator covers the wait.
 */
export function ChatWidget({
  onSend,
  title = "Chat",
  placeholder = "Ask anything…",
  initialMessages = [],
  className,
}: ChatWidgetProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const idBase = React.useId();
  const counterRef = React.useRef(0);
  const nextId = () => `${idBase}-${counterRef.current++}`;

  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = React.useState("");
  const [pending, setPending] = React.useState(false);

  const launcherRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const wasOpenRef = React.useRef(false);

  // Focus management: input on open, launcher back on close.
  React.useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (wasOpenRef.current) {
      requestAnimationFrame(() => launcherRef.current?.focus());
    }
  }, [open]);

  // Keep the newest message in view.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending, open]);

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const history = messages;
    const userMessage: ChatMessage = { id: nextId(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    const assistantId = nextId();
    const appendAssistant = (content: string) =>
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === assistantId);
        return exists
          ? prev.map((m) => (m.id === assistantId ? { ...m, content } : m))
          : [...prev, { id: assistantId, role: "assistant" as const, content }];
      });

    try {
      const result = onSend(text, history);
      if (isAsyncIterable(result)) {
        let streamed = "";
        for await (const chunk of result) {
          streamed += chunk;
          setPending(false);
          appendAssistant(streamed);
        }
      } else {
        appendAssistant(await result);
      }
    } catch {
      appendAssistant("Something went wrong — please try again.");
    } finally {
      setPending(false);
    }
  };

  const onPanelKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            key="launcher"
            type="button"
            aria-label={`Open ${title.toLowerCase()}`}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            transition={springs.snap}
            className={cn(
              "relative flex h-14 w-14 items-center justify-center",
              "rounded-[var(--lm-radius-full)] border border-[var(--lm-border)]",
              "bg-[var(--lm-surface)] text-[var(--lm-fg)] shadow-[var(--lm-shadow-glow)]",
              "outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            )}
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-[var(--lm-radius-full)] bg-[var(--lm-glow)]"
                animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative h-6 w-6"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.6-.8L3 21l2-5a8.2 8.2 0 0 1-1-4A8.4 8.4 0 0 1 12.5 3.7 8.4 8.4 0 0 1 21 11.5Z" />
            </svg>
          </motion.button>
        )}

        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={title}
            onKeyDown={onPanelKeyDown}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
            transition={springs.drift}
            style={{ transformOrigin: "100% 100%" }}
            className={cn(
              "flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden",
              "rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]",
              "bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
            )}
          >
            <header className="flex items-center justify-between border-b border-[var(--lm-border)] px-4 py-3">
              <h2 className="text-sm font-semibold text-[var(--lm-fg)]">
                {title}
              </h2>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-[var(--lm-radius-sm)]",
                  "text-[var(--lm-fg-muted)] outline-none transition-colors duration-200",
                  "hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                )}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-4 w-4"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3"
            >
              {messages.length === 0 && !pending && (
                <p className="m-auto text-center text-sm text-[var(--lm-fg-faint)]">
                  Start the conversation below.
                </p>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-[var(--lm-radius)] px-3 py-2 text-sm",
                    message.role === "user"
                      ? "self-end bg-[var(--lm-accent-soft)] text-[var(--lm-fg)]"
                      : "self-start border border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-[var(--lm-fg)]",
                  )}
                >
                  {message.content}
                </div>
              ))}
              {pending && <TypingIndicator reduceMotion={reduceMotion} />}
            </div>

            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-[var(--lm-border)] px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={placeholder}
                aria-label="Message"
                autoComplete="off"
                className={cn(
                  "h-9 flex-1 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-transparent px-3 text-sm",
                  "text-[var(--lm-fg)] placeholder:text-[var(--lm-fg-faint)]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                )}
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={pending || input.trim().length === 0}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center",
                  "rounded-[var(--lm-radius)] bg-[var(--lm-accent)] text-[var(--lm-accent-fg)]",
                  "outline-none transition-colors duration-200 hover:brightness-110",
                  "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-surface)]",
                  "disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
