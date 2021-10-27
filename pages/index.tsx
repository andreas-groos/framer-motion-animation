import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Node from "../Node";

type El = {
  cx: number;
  cy: number;
  r: number;
};

const Home: NextPage = () => {
  return (
    <div id="app">
      <svg>
        <Node x={100} y={100} r={50} />
      </svg>
    </div>
  );
};

export default Home;
