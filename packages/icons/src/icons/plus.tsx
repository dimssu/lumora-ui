"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, springs, type IconProps } from "../lib/icon";

/**
 * Plus. Spins a quarter turn with snap physics; since the glyph is
 * 90°-symmetric it lands looking identical — pure motion, zero displacement.
 */
export const PlusIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { rotate: 0, transition: { duration: durations.fast } },
          active: {
            rotate: 90,
            transition: springs.snap,
            transitionEnd: { rotate: 0 },
          },
        }}
      >
        <path d="M12 4.5v15" />
        <path d="M4.5 12h15" />
      </motion.g>
    </IconBase>
  ),
);
PlusIcon.displayName = "PlusIcon";
