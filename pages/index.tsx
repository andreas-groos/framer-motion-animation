import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

type El = {
  cx: number;
  cy: number;
  r: number;
};

const Home: NextPage = () => {
  const [el, setEl] = useState<El>({ cx: 200, cy: 200, r: 100 });
  return (
    <div id="app">
      <svg>
        <motion.circle
          cx={el.cx}
          cy={el.cy}
          r={el.r}
          fill="teal"
          animate={{
            cx: 100,
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </svg>
    </div>
  );
};

export default Home;
