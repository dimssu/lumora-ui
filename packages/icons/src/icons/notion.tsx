"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Notion — the "N" page mark inside its rounded frame. Monochrome. */
export const NotionIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3.5A1.5 1.5 0 0 0 2.5 5v14A1.5 1.5 0 0 0 4 20.5h16A1.5 1.5 0 0 0 21.5 19V5A1.5 1.5 0 0 0 20 3.5H4Zm4.6 4.3v8.4H6.95V9.42L6.9 9.4v6.8H5.6V7.8h1.7l3.2 4.46V7.8h1.3v8.4h-1.4L8.6 11.6v-3.8h-.05l.05.05V7.8Zm5.05 0h4.7v1.3h-1.7v7.1h-1.3v-7.1h-1.7V7.8Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
NotionIcon.displayName = "NotionIcon";
