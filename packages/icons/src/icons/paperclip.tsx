"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/**
 * Paperclip. The clip tilts in on its anchor and rocks back to plumb —
 * an attachment clicking into place.
 */
export const PaperclipIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M19 11.25l-7.6 7.6a4.5 4.5 0 0 1-6.36-6.36l8.13-8.13a3 3 0 0 1 4.24 4.24l-8.13 8.13a1.5 1.5 0 0 1-2.12-2.12l7.07-7.07"
        style={{ originX: "16px", originY: "5.5px" }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: { rotate: [0, -10, 0], transition: springs.drift },
        }}
      />
    </IconBase>
  ),
);
PaperclipIcon.displayName = "PaperclipIcon";
