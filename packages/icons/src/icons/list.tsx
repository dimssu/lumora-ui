"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/** Y positions of the three rows, top to bottom. */
const ROWS = [7, 12, 17] as const;

/**
 * List. The three rows slide in from the left in a staggered cascade —
 * items dropping into a feed.
 */
export const ListIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      {ROWS.map((y, i) => (
        <React.Fragment key={y}>
          <motion.circle
            cx="5.5"
            cy={y}
            r="1.2"
            fill="currentColor"
            stroke="none"
            variants={{
              idle: { x: 0, opacity: 1, transition: { duration: durations.fast } },
              active: {
                x: [-4, 0],
                opacity: [0, 1],
                transition: { duration: durations.base, ease: eases.out, delay: i * 0.07 },
              },
            }}
          />
          <motion.path
            d={`M9.5 ${y}h9`}
            variants={{
              idle: { x: 0, opacity: 1, transition: { duration: durations.fast } },
              active: {
                x: [-4, 0],
                opacity: [0, 1],
                transition: { duration: durations.base, ease: eases.out, delay: i * 0.07 },
              },
            }}
          />
        </React.Fragment>
      ))}
    </IconBase>
  ),
);
ListIcon.displayName = "ListIcon";
