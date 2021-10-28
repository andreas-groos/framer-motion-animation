import React, { ReactElement, useEffect } from "react";
import { EdgeType } from "./pages/index";
import { motion, useMotionValue, useSpring } from "framer-motion";

const duration = 2000;
export default function Edge({ source, target }: EdgeType): ReactElement {
  const mx1 = useMotionValue(source.x);
  const sx1 = useSpring(mx1, { duration });
  const mx2 = useMotionValue(target.x);
  const sx2 = useSpring(mx2, { duration });
  const my1 = useMotionValue(source.y);
  const sy1 = useSpring(my1, { duration });
  const my2 = useMotionValue(target.y);
  const sy2 = useSpring(my2, { duration });

  useEffect(() => {
    mx1.set(source.x);
    mx2.set(target.x);
    my1.set(source.y);
    my2.set(target.y);
  }, [mx1, mx2, my1, my2, source, target]);

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
