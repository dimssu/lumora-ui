"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Download. The arrow lifts, then drops onto the tray with gravity; the
 * tray gives a small bounce on impact — the file has landed.
 */
export const DownloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, -3.5, 0],
            transition: {
              duration: 0.32,
              times: [0, 0.4, 1],
              ease: ["easeOut", "easeIn"],
            },
          },
        }}
      >
        <path d="M12 3.5v11.25" />
        <path d="M7.5 10.25L12 14.75l4.5-4.5" />
      </motion.g>
      <motion.path
        d="M4.25 16.5v2.25a2 2 0 0 0 2 2h11.5a2 2 0 0 0 2-2V16.5"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, 1.4, 0],
            transition: { duration: 0.16, ease: eases.out, delay: 0.29 },
          },
        }}
      />
    </IconBase>
  ),
);
DownloadIcon.displayName = "DownloadIcon";
