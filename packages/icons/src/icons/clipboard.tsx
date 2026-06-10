"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Clipboard. The clip presses down onto the board and springs back up —
 * the satisfying snap of a page being pinned.
 */
export const ClipboardIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8.75 4.75H7a1.75 1.75 0 0 0-1.75 1.75v12.25A1.75 1.75 0 0 0 7 20.5h10a1.75 1.75 0 0 0 1.75-1.75V6.5A1.75 1.75 0 0 0 17 4.75h-1.75" />
      <path d="M9 11.5h6M9 15h4" />
      <motion.path
        d="M9.25 4.5A1.25 1.25 0 0 1 10.5 3.25h3a1.25 1.25 0 0 1 1.25 1.25v.75a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1z"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, 1.3, 0],
            transition: { duration: 0.3, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
ClipboardIcon.displayName = "ClipboardIcon";
