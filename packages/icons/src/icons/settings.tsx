"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

const GEAR =
  "M10.48 5.89L10.75 3.09A9 9 0 0 1 13.25 3.09L13.52 5.89A6.3 6.3 0 0 1 15.24 6.6" +
  "L17.42 4.81A9 9 0 0 1 19.19 6.58L17.4 8.76A6.3 6.3 0 0 1 18.11 10.48" +
  "L20.91 10.75A9 9 0 0 1 20.91 13.25L18.11 13.52A6.3 6.3 0 0 1 17.4 15.24" +
  "L19.19 17.42A9 9 0 0 1 17.42 19.19L15.24 17.4A6.3 6.3 0 0 1 13.52 18.11" +
  "L13.25 20.91A9 9 0 0 1 10.75 20.91L10.48 18.11A6.3 6.3 0 0 1 8.76 17.4" +
  "L6.58 19.19A9 9 0 0 1 4.81 17.42L6.6 15.24A6.3 6.3 0 0 1 5.89 13.52" +
  "L3.09 13.25A9 9 0 0 1 3.09 10.75L5.89 10.48A6.3 6.3 0 0 1 6.6 8.76" +
  "L4.81 6.58A9 9 0 0 1 6.58 4.81L8.76 6.6Z";

/**
 * Settings. The eight-tooth gear rotates 30° with snap physics and returns
 * to rest on release — one click of an imaginary ratchet.
 */
export const SettingsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: { rotate: 30, transition: springs.snap },
        }}
      >
        <path d={GEAR} />
      </motion.g>
      <circle cx="12" cy="12" r="2.9" />
    </IconBase>
  ),
);
SettingsIcon.displayName = "SettingsIcon";
