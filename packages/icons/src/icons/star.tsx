"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Star. Spins one point over (72°, the star's own symmetry) with a pop of
 * scale, landing visually identical to where it started.
 */
export const StarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M12 3.2l2.41 6.08 6.53.42-5.04 4.17 1.63 6.33L12 16.7l-5.53 3.5 1.63-6.33-5.04-4.17 6.53-.42L12 3.2Z"
        variants={{
          idle: {
            rotate: 0,
            scale: 1,
            transition: { duration: durations.fast },
          },
          active: {
            rotate: 72,
            scale: [1, 1.18, 1],
            transition: {
              rotate: springs.snap,
              scale: { duration: 0.4, ease: eases.out },
            },
            transitionEnd: { rotate: 0 },
          },
        }}
      />
    </IconBase>
  ),
);
StarIcon.displayName = "StarIcon";
