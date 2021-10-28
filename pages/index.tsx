import type { NextPage } from "next";
import { useState, useRef, useLayoutEffect } from "react";
import Head from "next/head";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FPSStats } from "fps-react";

import Node from "../Node";
import Edge from "../Edge";
import Orbit from "../Orbit";
import useResizeObserver from "../useResizeObserver";

export interface NodeType {
  x: number;
  y: number;
  r: number;
  stroke?: string;
  strokeWidth?: number;
  orbit: number;
}

export interface EdgeType {
  source: NodeType;
  target: NodeType;
}

export interface OrbitType {
  orbit: number;
  r: number;
  centerX: number;
  centerY: number;
  width?: number;
}

const nodesOuter = 6;
const nodesMiddle = 6;
const nodesCenter = 6;
const orbitRadii = [0.4, 0.6, 0.8, 1];

function calculatePointOnOrbit(
  angle: number,
  distance: number,
  offset: number,
  centerX: number,
  centerY: number
): { x: number; y: number } {
  const x =
    Math.round(Math.cos(((angle + offset) * Math.PI) / 180) * distance) +
    centerX;
  const y =
    Math.round(Math.sin(((angle + offset) * Math.PI) / 180) * distance) +
    centerY;

  return { x, y };
}

const createNodes = (centerX: number, centerY: number) => {
  const temp: NodeType[] = [];
  for (let index = 0; index < nodesOuter; index++) {
    const { x, y } = calculatePointOnOrbit(
      60 * index,
      Math.min(centerX, centerY) * orbitRadii[2],
      0,
      centerX,
      centerY
    );
    temp.push({
      x,
      y,
      r: 50,
      strokeWidth: 0,
      orbit: 2,
    });
  }
  for (let index = 0; index < nodesMiddle; index++) {
    const { x, y } = calculatePointOnOrbit(
      40 * index,
      Math.min(centerX, centerY) * orbitRadii[1],
      0,
      centerX,
      centerY
    );
    temp.push({
      x,
      y,
      r: 40,
      strokeWidth: 0,
      orbit: 1,
    });
  }
  for (let index = 0; index < nodesCenter; index++) {
    const { x, y } = calculatePointOnOrbit(
      80 * index,
      Math.min(centerX, centerY) * orbitRadii[0],
      0,
      centerX,
      centerY
    );
    temp.push({
      x,
      y,
      r: 20,
      strokeWidth: 0,
      orbit: 0,
    });
  }
  return temp;
};

const createEdges = (nodes: NodeType[]) => {
  const temp: EdgeType[] = [];
  nodes.forEach((n, i) => {
    temp.push({ source: n, target: nodes[(i + 2) % 6] }); // connect every Node with the 2nd node after for demo purposes
  });
  return temp;
};

const createOrbii = (centerX: number, centerY: number): OrbitType[] => {
  return orbitRadii.map((o, i) => ({
    centerX,
    centerY,
    orbit: i,
    r: Math.min(centerX, centerY) * orbitRadii[i],
  }));
};

const Home: NextPage = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [orbii, setOrbii] = useState<OrbitType[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const dimensions = useResizeObserver(wrapperRef);
  const height = dimensions?.height || 1;
  const width = dimensions?.width || 0;
  const centerX = width / 2;
  const centerY = height / 2;
  useLayoutEffect(() => {
    if (!dimensions) return;
    console.log("d", dimensions);
    const calculatedNodes = createNodes(centerX, centerY);
    const calculatedEdges = createEdges(calculatedNodes);
    const calculatedOrbii = createOrbii(centerX, centerY);
    setNodes(calculatedNodes);
    setEdges(calculatedEdges);
    setOrbii(calculatedOrbii);
  }, [dimensions, centerX, centerY]);

  const moveNodes = () => {
    let temp: NodeType[] = [];
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const { x, y } = calculatePointOnOrbit(
        50 * index,
        Math.min(centerX, centerY) * orbitRadii[node.orbit + 1],
        10,
        centerX,
        centerY
      );
      temp.push({
        ...node,
        x,
        y,
        r: node.r + 20,
        strokeWidth: 4,
      });
    }
    setNodes(temp);
    setEdges(createEdges(temp));
    setOrbii(
      orbii.map((o, i) => ({
        ...o,
        r: Math.min(centerX, centerY) * orbitRadii[o.orbit + 1],
      }))
    );
  };

  return (
    <div id="app" ref={wrapperRef}>
      <FPSStats />
      <svg>
        {orbii.map((o, i) => {
          return <Orbit key={i} {...o} />;
        })}
        {edges.map((e, i) => {
          return <Edge key={i} {...e} />;
        })}
        {nodes.map((n, i) => (
          <Node key={i} {...n} moveNodes={moveNodes} />
        ))}
      </svg>
    </div>
  );
};

export default Home;
