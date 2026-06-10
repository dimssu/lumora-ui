"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Folder. The lid tilts up a few degrees from its left hinge and eases
 * shut again — the folder cracking open to show it holds something.
 */
export const FolderIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3.5 9.5h17V18a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
      <motion.path
        d="M3.5 9.5V6.25A1.75 1.75 0 0 1 5.25 4.5h3.9l2 2.5h7.6a1.75 1.75 0 0 1 1.75 1.75v.75"
        style={{ originX: 0, originY: 1 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, -8, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
FolderIcon.displayName = "FolderIcon";
