import React, { ReactElement, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NodeType } from "./pages/index";

interface Props extends NodeType {
  moveNodes: () => void;
}

export default function Node({
  x,
  y,
  r,
  strokeWidth,
  moveNodes,
}: Props): ReactElement {
  const mx = useMotionValue(x);
  const sx = useSpring(mx, {
    duration: 2000,
  });
  const my = useMotionValue(y);
  const sy = useSpring(my, {
    duration: 2000,
  });
  const mr = useMotionValue(r);
  const sr = useSpring(mr, {
    duration: 3500,
  });
  const mStrokeWidth = useMotionValue(strokeWidth);
  const sWidth = useSpring(mStrokeWidth, {
    duration: 5000,
  });

  useEffect(() => {
    mx.set(x);
    my.set(y);
    mr.set(r);
    mStrokeWidth.set(strokeWidth);
  }, [mr, my, mx, mStrokeWidth, strokeWidth, x, y, r]);

  console.log("rendering Node");
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
