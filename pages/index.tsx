import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Node from "../Node";

export interface NodeType {
  x: number;
  y: number;
  r: number;
  stroke?: string;
  strokeWidth?: number;
}

const createNodes = () => {
  const amount = 6;
  const temp: NodeType[] = [];
  for (let index = 0; index < amount; index++) {
    temp.push({
      x: Math.random() * 1000,
      y: Math.random() * 600,
      r: Math.random() * 50 + 30,
    });
  }
  return temp;
};
const Home: NextPage = () => {
  const [nodes, setNodes] = useState<NodeType[]>(createNodes());

  const moveNodes = () => {
    console.log("moving");
    setNodes(createNodes());
  };

  return (
    <div id="app">
      <svg>
        {nodes.map((n, i) => (
          <Node key={i} {...n} moveNodes={moveNodes} />
        ))}
      </svg>
    </div>
  );
};

export default Home;
