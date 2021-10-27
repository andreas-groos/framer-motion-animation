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
  const [clicked, setClicked] = useState(false);

  const variants = {
    initial: {
      cx: el.cx,
      cy: el.cy,
      r: el.r,
      fill: "teal",
      strokeWidth: 0,
    },
    final: {
      cx: 70,
      cy: 70,
      r: 70,
      strokeWidth: 2,
      stroke: "red",
    },
  };

  return (
    <div id="app">
      <svg>
        <motion.circle
          onClick={() => setClicked(!clicked)}
          fill="teal"
          initial="initial"
          animate={clicked ? "final" : "initial"}
          variants={variants}
          transition={{
            duration: 0.8,
          }}
        />
      </svg>
    </div>
  );
};

export default Home;
