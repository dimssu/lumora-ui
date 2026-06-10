"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Tag. Swings around its eyelet with damped decay — a price tag flicked
 * on its string, settling back to rest.
 */
export const TagIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 0.23, originY: 0.23 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, 12, -8, 4, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      >
        <path d="M12.7 3.95l6.85 6.85a1.9 1.9 0 0 1 0 2.69l-6.06 6.06a1.9 1.9 0 0 1-2.69 0L3.95 12.7a1.9 1.9 0 0 1-.55-1.34V5.3a1.9 1.9 0 0 1 1.9-1.9h6.06a1.9 1.9 0 0 1 1.34.55z" />
        <circle cx="7.6" cy="7.6" r="1.1" />
      </motion.g>
    </IconBase>
  ),
);
TagIcon.displayName = "TagIcon";
