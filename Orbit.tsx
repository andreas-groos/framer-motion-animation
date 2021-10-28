import React, { ReactElement, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { OrbitType } from "./pages/index";

export default function Orbit({
  orbit,
  r,
  centerX,
  centerY,
  width = 5,
}: OrbitType): ReactElement {
  const cr = useMotionValue(r);
  const sr = useSpring(cr, {
    duration: 2000,
  });
  const w = useMotionValue(width);
  const sw = useSpring(w, {
    duration: 2000,
  });

  useEffect(() => {
    cr.set(r);
    w.set(width);
  }, [r, width, cr, w]);

  return (
    <motion.circle
      cx={centerX}
      cy={centerY}
      r={sr}
      strokeWidth={sw}
      stroke="darkgray"
      fill="none"
    />
  );
}
