import React, { ReactElement, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NodeType } from "./pages/index";

interface Props extends NodeType {
  // x: number;
  // y: number;
  // r: number;
  // w: number;
  moveNodes: () => void;
}

export default function Node({
  x,
  y,
  r,
  strokeWidth,
  moveNodes,
}: Props): ReactElement {
  const cx = useMotionValue(x);
  const sx = useSpring(cx, {
    duration: 2000,
  });
  const cy = useMotionValue(y);
  const sy = useSpring(cy, {
    duration: 2000,
  });
  const cr = useMotionValue(r);
  const sr = useSpring(cr, {
    duration: 3500,
  });
  const width = useMotionValue(strokeWidth);
  const sWidth = useSpring(width, {
    duration: 5000,
  });

  useEffect(() => {
    cx.set(x);
    cy.set(y);
    cr.set(r);
    width.set(strokeWidth);
  }, [cr, cy, cx, width, strokeWidth, x, y, r]);

  console.log("rendering");
  return (
    <motion.circle
      onClick={() => {
        moveNodes();
      }}
      fill="teal"
      cx={sx}
      cy={sy}
      r={sr}
      strokeWidth={sWidth}
      stroke="red"
    />
  );
}
