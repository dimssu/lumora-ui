"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Folder, open. The papers tucked behind the back panel peek up and
 * settle back down — a quick glance at what's inside.
 */
export const FolderOpenIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M12.75 8.25v-1.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v1.5"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, -1.8, 0],
            transition: { duration: 0.38, ease: eases.inOut },
          },
        }}
      />
      <path d="M3.75 18.5V6.25A1.75 1.75 0 0 1 5.5 4.5h3.4l1.9 2.4h7.7a1.75 1.75 0 0 1 1.75 1.75v1.6" />
      <path d="M3.75 18.5l2.06-6.07a1.75 1.75 0 0 1 1.66-1.18h13.78l-2.31 6.06a1.75 1.75 0 0 1-1.64 1.19z" />
    </IconBase>
  ),
);
FolderOpenIcon.displayName = "FolderOpenIcon";
