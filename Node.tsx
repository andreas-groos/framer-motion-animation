import React, { ReactElement, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  x: number;
  y: number;
  r: number;
}

interface NodeType {
  cx: number;
  cy: number;
  r: number;
  stroke?: string;
  strokeWidth?: number;
}

export default function Node({ x, y, r }: Props): ReactElement {
  const cx = useMotionValue(x);
  const sx = useSpring(cx);
  const cy = useMotionValue(y);
  const sy = useSpring(cy);
  const cr = useMotionValue(r);
  const sr = useSpring(r);
  const width = useMotionValue(0);
  const sWidth = useSpring(width);

  console.log("cx", cx);
  console.log("sx", sx);
  return (
    <motion.circle
      onClick={() => {
        cx.set(cx.get() + 100);
        cy.set(cx.get() + 200);
        cr.set(cr.get() + Math.random() * 10 + 10);
        width.set(20);
      }}
      fill="teal"
      cx={sx}
      cy={sy}
      r={sr}
      strokeWidth={sWidth}
      stroke="red"
      transition={{
        duration: 0.8,
      }}
    />
  );
}
