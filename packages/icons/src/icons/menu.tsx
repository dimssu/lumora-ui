"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

const LINES = ["M4 7h16", "M4 12h16", "M4 17h16"] as const;

/**
 * Menu (hamburger). The three lines slide left in a quick top-to-bottom
 * stagger and glide back, hinting that a drawer lives behind them.
 */
export const MenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      {LINES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          variants={{
            idle: { x: 0, transition: springs.snap },
            active: {
              x: [0, -2.5, 0],
              transition: { duration: 0.32, ease: eases.out, delay: i * 0.06 },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
MenuIcon.displayName = "MenuIcon";
