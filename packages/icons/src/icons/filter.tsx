"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Filter. The funnel's three layers shuffle sideways in opposite
 * directions and slide back into alignment — results, refined.
 */
export const FilterIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      {(
        [
          { d: "M4.5 6.5h15", shift: -1.6, delay: 0 },
          { d: "M7.5 12h9", shift: 1.6, delay: 0.06 },
          { d: "M10.5 17.5h3", shift: -1.2, delay: 0.12 },
        ] as const
      ).map(({ d, shift, delay }) => (
        <motion.path
          key={d}
          d={d}
          variants={{
            idle: { x: 0 },
            active: {
              x: [0, shift, 0],
              transition: { duration: durations.base, ease: eases.out, delay },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
FilterIcon.displayName = "FilterIcon";
