"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/** Top-left corners of the four cells, in pop order. */
const CELLS: ReadonlyArray<{ x: number; y: number; i: number }> = [
  { x: 4.5, y: 4.5, i: 0 },
  { x: 13.25, y: 4.5, i: 1 },
  { x: 4.5, y: 13.25, i: 2 },
  { x: 13.25, y: 13.25, i: 3 },
];

/**
 * Grid. The four tiles pop in one after another — a layout assembling
 * itself cell by cell.
 */
export const GridIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      {CELLS.map(({ x, y, i }) => (
        <motion.rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="6.25"
          height="6.25"
          rx="1.25"
          style={{ originX: `${x + 3.125}px`, originY: `${y + 3.125}px` }}
          variants={{
            idle: { scale: 1, transition: springs.snap },
            active: {
              scale: [1, 0.7, 1],
              transition: { duration: 0.32, ease: eases.out, delay: i * 0.06 },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
GridIcon.displayName = "GridIcon";
