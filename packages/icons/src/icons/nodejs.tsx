"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Node.js — the hexagon with the cut "N". Monochrome. */
export const NodejsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <path
          fill="currentColor"
          stroke="none"
          d="M12 1.85a1.4 1.4 0 0 1 .7.19l8 4.62c.43.25.7.71.7 1.21v8.26c0 .5-.27.96-.7 1.21l-8 4.62a1.4 1.4 0 0 1-1.4 0l-8-4.62a1.4 1.4 0 0 1-.7-1.21V7.87c0-.5.27-.96.7-1.21l8-4.62a1.4 1.4 0 0 1 .7-.19Zm0 1.6L4.4 7.87v8.26L12 20.55l7.6-4.42V7.87L12 3.45Z"
        />
        <path
          d="M9 8.5v7M9 8.5l6 7V8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </IconBase>
  ),
);
NodejsIcon.displayName = "NodejsIcon";
