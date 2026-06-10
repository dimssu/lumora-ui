"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";
import { Button } from "../components/button";
import { Input } from "../components/input";

export type AuthMode = "sign-in" | "sign-up";

export interface AuthFormValues {
  email: string;
  password: string;
}

export interface AuthSsoProvider {
  label: string;
  icon?: React.ReactNode;
}

export interface AuthFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "onError"> {
  /** Controlled mode. */
  mode?: AuthMode;
  /** Mode on mount (uncontrolled). @default "sign-in" */
  defaultMode?: AuthMode;
  /** Called when the footer toggle link switches mode. */
  onModeChange?: (mode: AuthMode) => void;
  /** Form-level error rendered above the submit button. */
  error?: string;
  /** Neutral single-sign-on buttons under the divider. @default two demo providers */
  ssoProviders?: AuthSsoProvider[];
  /** Called with the field values on submit. */
  onSubmit?: (values: AuthFormValues, mode: AuthMode) => void;
  /** Called when an SSO button is pressed. */
  onSsoSelect?: (provider: AuthSsoProvider) => void;
}

const defaultProviders: AuthSsoProvider[] = [
  {
    label: "Continue with passkey",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M15 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z M10.5 12v9l2-2-1.5-1.5L13 16l-1.5-1.5 1.5-1.5" />
      </svg>
    ),
  },
  {
    label: "Continue with workspace SSO",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M3.6 9h16.8 M3.6 15h16.8 M12 3a13.5 13.5 0 0 1 0 18 M12 3a13.5 13.5 0 0 0 0 18" />
      </svg>
    ),
  },
];

const copy: Record<AuthMode, { heading: string; sub: string; cta: string }> = {
  "sign-in": {
    heading: "Welcome back",
    sub: "Sign in and pick up right where the light left off.",
    cta: "Sign in",
  },
  "sign-up": {
    heading: "Create your account",
    sub: "Two fields between you and a warmer dashboard.",
    cta: "Create account",
  },
};

/**
 * Centered auth card resting on a faint lumen glow. Switching between
 * sign-in and sign-up crossfades the heading and subcopy on a soft drift
 * spring while the fields stay put.
 */
export function AuthForm({
  mode: modeProp,
  defaultMode = "sign-in",
  onModeChange,
  error,
  ssoProviders = defaultProviders,
  onSubmit,
  onSsoSelect,
  className,
  ...props
}: AuthFormProps) {
  const reduceMotion = useReducedMotion();
  const [internalMode, setInternalMode] = React.useState<AuthMode>(defaultMode);
  const mode = modeProp ?? internalMode;

  const toggleMode = () => {
    const next: AuthMode = mode === "sign-in" ? "sign-up" : "sign-in";
    if (modeProp === undefined) setInternalMode(next);
    onModeChange?.(next);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.(
      {
        email: String(data.get("email") ?? ""),
        password: String(data.get("password") ?? ""),
      },
      mode,
    );
  };

  const crossfade = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
    transition: reduceMotion ? { duration: 0 } : springs.drift,
  } as const;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md px-4 py-16 sm:px-0",
        className,
      )}
      {...props}
    >
      {/* The lumen, resting beneath the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--lm-glow), transparent 70%)`,
        }}
      />

      <div className="relative rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-8 shadow-[var(--lm-shadow)]">
        <div className="mb-8 text-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h2
              key={`${mode}-heading`}
              {...crossfade}
              className="text-2xl font-semibold tracking-tight text-[var(--lm-fg)]"
            >
              {copy[mode].heading}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={`${mode}-sub`}
              {...crossfade}
              className="mt-2 text-sm text-[var(--lm-fg-muted)]"
            >
              {copy[mode].sub}
            </motion.p>
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete={
              mode === "sign-in" ? "current-password" : "new-password"
            }
            required
          />

          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                role="alert"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={reduceMotion ? { duration: 0 } : springs.drift}
                className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-3 py-2 text-sm text-[var(--lm-negative)]"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button variant="accent" size="md" type="submit" className="w-full">
            {copy[mode].cta}
          </Button>
        </form>

        <div
          aria-hidden
          className="my-6 flex items-center gap-3 text-xs text-[var(--lm-fg-faint)]"
        >
          <span className="h-px flex-1 bg-[var(--lm-border)]" />
          or
          <span className="h-px flex-1 bg-[var(--lm-border)]" />
        </div>

        <div className="flex flex-col gap-2.5">
          {ssoProviders.map((provider) => (
            <Button
              key={provider.label}
              variant="outline"
              size="md"
              type="button"
              className="w-full"
              onClick={() => onSsoSelect?.(provider)}
            >
              {provider.icon}
              {provider.label}
            </Button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--lm-fg-muted)]">
          {mode === "sign-in" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="font-medium text-[var(--lm-fg)] underline decoration-[var(--lm-border-strong)] underline-offset-4 outline-none transition-colors duration-[var(--lm-duration-fast)] hover:decoration-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
          >
            {mode === "sign-in" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
