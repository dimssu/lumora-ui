"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * File. The top-right corner fold redraws itself — the page creasing
 * crisply into place, like a fresh dog-ear.
 */
export const FileIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
      <motion.path
        d="M13.5 3.5V9H19"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.32, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
FileIcon.displayName = "FileIcon";
