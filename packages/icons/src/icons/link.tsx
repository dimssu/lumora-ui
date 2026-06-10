"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/**
 * Link. The two halves of the chain pull apart by a hair and snap
 * back together — a connection you can feel holding.
 */
export const LinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M13.06 10.94a4 4 0 0 1 0 5.66l-2.62 2.62a4 4 0 0 1-5.66-5.66l1.31-1.31"
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: { x: -0.9, y: 0.9, transition: springs.snap },
        }}
      />
      <motion.path
        d="M10.94 13.06a4 4 0 0 1 0-5.66l2.62-2.62a4 4 0 0 1 5.66 5.66l-1.31 1.31"
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: { x: 0.9, y: -0.9, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
LinkIcon.displayName = "LinkIcon";
