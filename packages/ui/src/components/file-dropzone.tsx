"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface FileDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  /** Called with the full accepted list whenever it changes. */
  onFiles?: (files: File[]) => void;
  /** Native accept filter, e.g. "image/*,.pdf". */
  accept?: string;
  /** Allow multiple files. @default false */
  multiple?: boolean;
  /** Prompt shown inside the zone. */
  label?: React.ReactNode;
}

interface TrackedFile {
  id: number;
  file: File;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Drop zone whose dashed border brightens into a soft lumen glow while a
 * file hovers over it, the upload glyph nudging upward in anticipation.
 * Accepted files stack below in an animated list; removing one collapses
 * its row. Click or press Enter to open the picker.
 */
export function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  label,
  className,
  ...props
}: FileDropzoneProps) {
  const reduceMotion = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const nextId = React.useRef(0);
  const dragDepth = React.useRef(0);
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<TrackedFile[]>([]);

  const commit = React.useCallback(
    (update: (current: TrackedFile[]) => TrackedFile[]) => {
      setFiles((current) => {
        const next = update(current);
        onFiles?.(next.map((entry) => entry.file));
        return next;
      });
    },
    [onFiles],
  );

  const addFiles = React.useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      const tracked = Array.from(incoming).map((file) => ({
        id: nextId.current++,
        file,
      }));
      commit((current) =>
        multiple ? [...current, ...tracked] : tracked.slice(0, 1),
      );
    },
    [commit, multiple],
  );

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          dragDepth.current += 1;
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          dragDepth.current = 0;
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        animate={
          dragging && !reduceMotion
            ? { boxShadow: "0 0 0 1px var(--lm-border-strong), 0 8px 40px var(--lm-glow)" }
            : { boxShadow: "0 0 0 0px transparent" }
        }
        transition={springs.drift}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 px-6 py-10 outline-none",
          "rounded-[var(--lm-radius-lg)] border border-dashed",
          "transition-colors duration-[var(--lm-duration)]",
          dragging
            ? "border-[var(--lm-accent)] bg-[var(--lm-accent-soft)]"
            : "border-[var(--lm-border-strong)] bg-[var(--lm-surface)] hover:bg-[var(--lm-surface-2)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
        )}
      >
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { y: dragging ? -4 : 0 }}
          transition={springs.snap}
          className={cn(
            "text-[var(--lm-fg-muted)]",
            dragging && "text-[var(--lm-accent)]",
          )}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16V4m0 0L7 9m5-5l5 5" />
            <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
          </svg>
        </motion.span>
        <span className="text-sm font-medium text-[var(--lm-fg)]">
          {label ?? (dragging ? "Release to add" : "Drop files or click to browse")}
        </span>
        <span className="text-xs text-[var(--lm-fg-faint)]">
          {accept ? accept.replace(/,/g, " · ") : "Any file type"}
        </span>
      </motion.button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <AnimatePresence initial={false}>
        {files.length > 0 && (
          <motion.ul
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast }}
            className="flex flex-col gap-2"
          >
            <AnimatePresence initial={false}>
              {files.map((entry) => (
                <motion.li
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={
                    reduceMotion
                      ? { height: { duration: 0 }, opacity: { duration: durations.fast } }
                      : { duration: durations.base, ease: [...eases.out] }
                  }
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-[var(--lm-radius)] px-3 py-2",
                      "border border-[var(--lm-border)] bg-[var(--lm-surface)]",
                    )}
                  >
                    <span className="min-w-0 truncate text-sm text-[var(--lm-fg)]">
                      {entry.file.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-[var(--lm-fg-faint)]">
                        {formatSize(entry.file.size)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${entry.file.name}`}
                        onClick={() =>
                          commit((current) =>
                            current.filter((f) => f.id !== entry.id),
                          )
                        }
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-[var(--lm-radius-sm)] outline-none",
                          "text-[var(--lm-fg-muted)] transition-colors duration-200",
                          "hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)]",
                          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                        )}
                      >
                        <svg
                          aria-hidden
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <path d="M4 4l8 8M12 4l-8 8" />
                        </svg>
                      </button>
                    </span>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
