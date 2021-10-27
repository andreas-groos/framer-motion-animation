import React, { ReactElement, useEffect } from "react";
import { EdgeType } from "./pages/index";
import { motion, useMotionValue, useSpring } from "framer-motion";

const duration = 2000;
export default function Edge({ source, target }: EdgeType): ReactElement {
  const x1 = useMotionValue(source.x);
  const sx1 = useSpring(x1, { duration });
  const x2 = useMotionValue(target.x);
  const sx2 = useSpring(x2, { duration });
  const y1 = useMotionValue(source.y);
  const sy1 = useSpring(y1, { duration });
  const y2 = useMotionValue(target.y);
  const sy2 = useSpring(y2, { duration });

  useEffect(() => {
    x1.set(source.x);
    x2.set(target.x);
    y1.set(source.y);
    y2.set(target.y);
  }, [x1, x2, y1, y2, source, target]);

  console.log("rendering Edge");
  return (
    <motion.line
      x1={sx1}
      x2={sx2}
      y1={sy1}
      y2={sy2}
      stroke="#000"
      strokeWidth={4}
    />
  );
}
