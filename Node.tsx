import React, { ReactElement, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NodeType } from "./pages/index";

interface Props {
  x: number;
  y: number;
  r: number;
  moveNodes: () => void;
}

export default function Node({ x, y, r, moveNodes }: Props): ReactElement {
  const cx = useMotionValue(x);
  const sx = useSpring(cx);
  const cy = useMotionValue(y);
  const sy = useSpring(cy);
  const cr = useMotionValue(r);
  const sr = useSpring(r);
  const width = useMotionValue(0);
  const sWidth = useSpring(width);

  useEffect(() => {
    // console.log("EFFECT");
    cx.set(x);
    cy.set(y);
    cr.set(r);
    width.set(Math.random() * 5);
  }, [cr, cy, cx, width, x, y, r]);

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
      transition={{
        duration: 0.8,
      }}
    />
  );
}
