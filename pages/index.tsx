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

export interface EdgeType {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  stroke?: number;
}

const amount = 6;
function calculatePointOnOrbit(
  angle: number,
  distance: number,
  offset: number
): { x: number; y: number } {
  const x =
    Math.round(Math.cos(((angle + offset) * Math.PI) / 180) * distance) + 500;
  const y =
    Math.round(Math.sin(((angle + offset) * Math.PI) / 180) * distance) + 400;

  return { x, y };
}

const createNodes = () => {
  const temp: NodeType[] = [];
  for (let index = 0; index < amount; index++) {
    const { x, y } = calculatePointOnOrbit(60 * index, 250, 0);
    temp.push({
      x,
      y,
      r: 50,
      strokeWidth: 0,
    });
  }
  return temp;
};
const Home: NextPage = () => {
  const [nodes, setNodes] = useState<NodeType[]>(createNodes());

  const moveNodes = () => {
    console.log("moving");
    let temp: NodeType[] = [];
    for (let index = 0; index < amount; index++) {
      const { x, y } = calculatePointOnOrbit(30 * index, 400, 40);
      temp.push({
        x,
        y,
        r: 80,
        strokeWidth: 4,
      });
    }
    setNodes(temp);
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
