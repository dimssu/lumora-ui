"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/**
 * Save. The disk's write-protect tab presses in and springs back — the
 * satisfying click of committing to storage.
 */
export const SaveIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5.5 4.5h11l3 3v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 3.5 18.5v-12.5A1.5 1.5 0 0 1 5.5 4.5z" />
      <motion.path
        d="M8 4.5v3.5h6.5V4.5"
        style={{ originX: 0.5, originY: 0 }}
        variants={{
          idle: { scaleY: 1, transition: springs.snap },
          active: { scaleY: 0.45, transition: springs.drift },
        }}
      />
      <path d="M7 19.5v-5.25a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V19.5" />
    </IconBase>
  ),
);
SaveIcon.displayName = "SaveIcon";
