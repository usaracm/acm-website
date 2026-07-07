"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── 4D Hypercube Math ───────────────────────────────────── */

/** Generate all 16 vertices of a 4D unit hypercube (±1, ±1, ±1, ±1) */
function generateVertices4D(): number[][] {
  const verts: number[][] = [];
  for (let i = 0; i < 16; i++) {
    verts.push([
      i & 1 ? 1 : -1,
      i & 2 ? 1 : -1,
      i & 4 ? 1 : -1,
      i & 8 ? 1 : -1,
    ]);
  }
  return verts;
}

/** Find all 32 edges – vertex pairs differing in exactly one coordinate */
function generateEdges(verts: number[][]): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      let diff = 0;
      for (let k = 0; k < 4; k++) {
        if (verts[i][k] !== verts[j][k]) diff++;
      }
      if (diff === 1) edges.push([i, j]);
    }
  }
  return edges;
}

/** Rotate in the XW plane (creates the "morphing" effect) */
function rotateXW(v: number[], a: number): number[] {
  const c = Math.cos(a),
    s = Math.sin(a);
  return [v[0] * c - v[3] * s, v[1], v[2], v[0] * s + v[3] * c];
}

/** Rotate in the YZ plane */
function rotateYZ(v: number[], a: number): number[] {
  const c = Math.cos(a),
    s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c, v[3]];
}

/** Rotate in the XZ plane */
function rotateXZ(v: number[], a: number): number[] {
  const c = Math.cos(a),
    s = Math.sin(a);
  return [v[0] * c - v[2] * s, v[1], v[0] * s + v[2] * c, v[3]];
}

/* ── Tesseract Wireframe Mesh ────────────────────────────── */

function TesseractMesh() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const { pointer } = useThree();
  const attrRef = useRef<THREE.BufferAttribute | null>(null);

  const { vertices4D, edges } = useMemo(() => {
    const vertices4D = generateVertices4D();
    const edges = generateEdges(vertices4D);
    return { vertices4D, edges };
  }, []);

  // Pre-allocate ALL reusable objects outside the render loop
  const linePositions = useMemo(() => new Float32Array(edges.length * 6), [edges]);
  const nodeMatrix = useMemo(() => new THREE.Matrix4(), []);
  const nodeScale = useMemo(() => new THREE.Vector3(0.03, 0.03, 0.03), []);
  const projected = useMemo(() => vertices4D.map(() => new THREE.Vector3()), [vertices4D]);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;

    const t = clock.getElapsedTime() * 0.25;
    const mx = pointer.x * 0.4;
    const my = pointer.y * 0.3;
    const projDist = 2.5;

    // Transform each 4D vertex → 3D (reuse Vector3 objects)
    vertices4D.forEach((v, i) => {
      let r = rotateXW(v, t + mx);
      r = rotateYZ(r, t * 0.6 + my);
      r = rotateXZ(r, t * 0.3);
      const w = projDist / (projDist - r[3]);
      projected[i].set(r[0] * w, r[1] * w, r[2] * w);
    });

    // Fill line positions
    for (let i = 0; i < edges.length; i++) {
      const pa = projected[edges[i][0]];
      const pb = projected[edges[i][1]];
      const off = i * 6;
      linePositions[off] = pa.x;
      linePositions[off + 1] = pa.y;
      linePositions[off + 2] = pa.z;
      linePositions[off + 3] = pb.x;
      linePositions[off + 4] = pb.y;
      linePositions[off + 5] = pb.z;
    }

    // Set BufferAttribute once, then just flag needsUpdate
    const geo = linesRef.current.geometry;
    if (!attrRef.current) {
      attrRef.current = new THREE.BufferAttribute(linePositions, 3);
      attrRef.current.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute("position", attrRef.current);
    }
    attrRef.current.needsUpdate = true;

    // Update instanced nodes
    if (nodesRef.current) {
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        nodeMatrix.makeTranslation(p.x, p.y, p.z);
        nodeMatrix.scale(nodeScale);
        nodesRef.current.setMatrixAt(i, nodeMatrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Wireframe edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#0085ca" transparent opacity={0.5} />
      </lineSegments>

      {/* Vertex nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, 16]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#0085ca" transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
}

/* ── Floating Particles ──────────────────────────────────── */

function Particles({ count = 60 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Matrix4(), []);
  const scaleVec = useMemo(() => new THREE.Vector3(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 4 - 2,
      speed: 0.1 + Math.random() * 0.3,
      scale: 0.003 + Math.random() * 0.008,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const y = p.y + Math.sin(t * p.speed + i) * 0.5;
      const x = p.x + Math.cos(t * p.speed * 0.5 + i) * 0.3;
      dummy.makeTranslation(x, y, p.z);
      scaleVec.set(p.scale, p.scale, p.scale);
      dummy.scale(scaleVec);
      meshRef.current.setMatrixAt(i, dummy);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#0085ca" transparent opacity={0.25} />
    </instancedMesh>
  );
}

/* ── Exported Canvas Scene ───────────────────────────────── */

interface TesseractSceneProps {
  className?: string;
}

export default function TesseractScene({ className }: TesseractSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent context loss warnings
  useEffect(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());
    }
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <TesseractMesh />
        <Particles />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={1.2}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
