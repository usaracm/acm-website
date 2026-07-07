"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function StarField(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useMemo(() => [generateSpherePoints(5000, 1.5)], []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#0085ca"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function TeamsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
}
