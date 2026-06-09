"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

const WAVES = [
  "M15 9.75a3.25 3.25 0 0 1 0 4.5",
  "M17.75 7a7 7 0 0 1 0 10",
] as const;

/**
 * Volume. The two sound waves draw outward from the speaker in a quick
 * stagger — audio rippling into the room.
 */
export const VolumeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M11.5 5L7 8.75H4.25a.75.75 0 0 0-.75.75v5c0 .41.34.75.75.75H7L11.5 19V5Z" />
      {WAVES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          variants={{
            idle: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: durations.fast },
            },
            active: {
              pathLength: [0, 1],
              opacity: [0, 1],
              transition: { duration: 0.3, ease: eases.out, delay: i * 0.1 },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
VolumeIcon.displayName = "VolumeIcon";
