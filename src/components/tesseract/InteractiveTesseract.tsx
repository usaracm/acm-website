"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ── 4D Hypercube Math ───────────────────────────────────── */

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

function rotateXW(v: number[], a: number): number[] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[3] * s, v[1], v[2], v[0] * s + v[3] * c];
}

function rotateYZ(v: number[], a: number): number[] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c, v[3]];
}

function rotateXZ(v: number[], a: number): number[] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[2] * s, v[1], v[0] * s + v[2] * c, v[3]];
}

function rotateYW(v: number[], a: number): number[] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[3] * s, v[2], v[1] * s + v[3] * c];
}

/* ── Tesseract Mesh with Scroll-Reactive Props ───────────── */

interface TesseractMeshProps {
  scale: number;
  positionX: number;
  positionY: number;
  rotationSpeed: number;
  morphIntensity: number;
  color: string;
  wireOpacity: number;
  nodeOpacity: number;
  explode: number;
}

function TesseractMesh({
  scale,
  positionX,
  positionY,
  rotationSpeed,
  morphIntensity,
  color,
  wireOpacity,
  nodeOpacity,
  explode,
}: TesseractMeshProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const attrRef = useRef<THREE.BufferAttribute | null>(null);

  const { vertices4D, edges } = useMemo(() => {
    const vertices4D = generateVertices4D();
    const edges = generateEdges(vertices4D);
    return { vertices4D, edges };
  }, []);

  const linePositions = useMemo(() => new Float32Array(edges.length * 6), [edges]);
  const nodeMatrix = useMemo(() => new THREE.Matrix4(), []);
  const nodeScale = useMemo(() => new THREE.Vector3(), []);
  const projected = useMemo(() => vertices4D.map(() => new THREE.Vector3()), [vertices4D]);

  // Smooth interpolation for values
  const smoothValues = useRef({
    scale: 1,
    positionX: 0,
    positionY: 0,
    rotationSpeed: 0.25,
    morphIntensity: 1,
    explode: 0,
  });

  useFrame(({ clock }) => {
    if (!linesRef.current || !groupRef.current) return;

    // Smooth interpolation (slower for subtler movement)
    const lerp = 0.04;
    smoothValues.current.scale += (scale - smoothValues.current.scale) * lerp;
    smoothValues.current.positionX += (positionX - smoothValues.current.positionX) * lerp;
    smoothValues.current.positionY += (positionY - smoothValues.current.positionY) * lerp;
    smoothValues.current.rotationSpeed += (rotationSpeed - smoothValues.current.rotationSpeed) * lerp;
    smoothValues.current.morphIntensity += (morphIntensity - smoothValues.current.morphIntensity) * lerp;
    smoothValues.current.explode += (explode - smoothValues.current.explode) * lerp;

    const sv = smoothValues.current;

    // Update group transform
    groupRef.current.scale.setScalar(sv.scale);
    groupRef.current.position.x = sv.positionX;
    groupRef.current.position.y = sv.positionY;

    const t = clock.getElapsedTime() * sv.rotationSpeed;
    const mx = pointer.x * 0.15 * sv.morphIntensity;
    const my = pointer.y * 0.1 * sv.morphIntensity;
    const projDist = 2.5;

    // Transform each 4D vertex → 3D
    vertices4D.forEach((v, i) => {
      let r = rotateXW(v, t + mx);
      r = rotateYZ(r, t * 0.4 + my);
      r = rotateXZ(r, t * 0.2);
      r = rotateYW(r, t * 0.25 * sv.morphIntensity);
      const w = projDist / (projDist - r[3]);
      
      // Apply explode effect (reduced intensity)
      const explodeFactor = 1 + sv.explode * 0.3;
      projected[i].set(r[0] * w * explodeFactor, r[1] * w * explodeFactor, r[2] * w * explodeFactor);
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

    const geo = linesRef.current.geometry;
    if (!attrRef.current) {
      attrRef.current = new THREE.BufferAttribute(linePositions, 3);
      attrRef.current.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute("position", attrRef.current);
    }
    attrRef.current.needsUpdate = true;

    // Update instanced nodes
    if (nodesRef.current) {
      const baseNodeSize = 0.03;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        nodeMatrix.makeTranslation(p.x, p.y, p.z);
        nodeScale.setScalar(baseNodeSize * (1 + sv.explode * 0.3));
        nodeMatrix.scale(nodeScale);
        nodesRef.current.setMatrixAt(i, nodeMatrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const parsedColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color={parsedColor} transparent opacity={wireOpacity} />
      </lineSegments>

      <instancedMesh ref={nodesRef} args={[undefined, undefined, 16]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={parsedColor} transparent opacity={nodeOpacity} />
      </instancedMesh>
    </group>
  );
}

/* ── Floating Particles ──────────────────────────────────── */

function Particles({ count = 80, color = "#0085ca", spread = 8 }: { count?: number; color?: string; spread?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Matrix4(), []);
  const scaleVec = useMemo(() => new THREE.Vector3(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: (Math.random() - 0.5) * 4 - 2,
      speed: 0.1 + Math.random() * 0.3,
      scale: 0.002 + Math.random() * 0.006,
    }));
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const y = p.y + Math.sin(t * p.speed * 0.5 + i) * 0.3;
      const x = p.x + Math.cos(t * p.speed * 0.25 + i) * 0.2;
      dummy.makeTranslation(x, y, p.z);
      scaleVec.setScalar(p.scale);
      dummy.scale(scaleVec);
      meshRef.current.setMatrixAt(i, dummy);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} />
    </instancedMesh>
  );
}

/* ── Main Interactive Scene ───────────────────────────────── */

export interface TesseractState {
  scale: number;
  positionX: number;
  positionY: number;
  rotationSpeed: number;
  morphIntensity: number;
  color: string;
  wireOpacity: number;
  nodeOpacity: number;
  explode: number;
  bloomIntensity: number;
  chromaticAberration: number;
}

interface InteractiveTesseractProps {
  state: TesseractState;
  className?: string;
}

export default function InteractiveTesseract({ state, className }: InteractiveTesseractProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());
    }
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <TesseractMesh
          scale={state.scale}
          positionX={state.positionX}
          positionY={state.positionY}
          rotationSpeed={state.rotationSpeed}
          morphIntensity={state.morphIntensity}
          color={state.color}
          wireOpacity={state.wireOpacity}
          nodeOpacity={state.nodeOpacity}
          explode={state.explode}
        />
        
        <Particles color={state.color} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={state.bloomIntensity}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(
              state.chromaticAberration * 0.002,
              state.chromaticAberration * 0.002
            )}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
