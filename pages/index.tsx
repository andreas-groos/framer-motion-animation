import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { motion, useMotionValue, useSpring } from "framer-motion";

type El = {
  cx: number;
  cy: number;
  r: number;
};

const Home: NextPage = () => {
  const [el, setEl] = useState<El>({ cx: 200, cy: 200, r: 100 });
  const cx = useMotionValue(el.cx);
  const sx = useSpring(cx);
  const cy = useMotionValue(el.cy);
  const sy = useSpring(cy);
  const r = useMotionValue(el.r);
  const sr = useSpring(r);
  const strokeWidth = useMotionValue(0);
  const sstrokeWidth = useSpring(strokeWidth);

  console.log("cx", cx);
  console.log("sx", sx);
  return (
    <div id="app">
      <svg>
        <motion.circle
          onClick={() => {
            cx.set(cx.get() + 100);
            cy.set(cx.get() + 200);
            r.set(r.get() + 200);
            strokeWidth.set(20);
          }}
          fill="teal"
          cx={sx}
          cy={sy}
          r={sr}
          strokeWidth={sstrokeWidth}
          stroke="red"
          transition={{
            duration: 0.8,
          }}
        />
      </svg>
    </div>
  );
};

export default Home;
