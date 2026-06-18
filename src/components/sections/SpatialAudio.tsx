"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CYAN = "#5DFFF3";

function Listener() {
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.15} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <capsuleGeometry args={[0.25, 0.6, 8, 16]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function SoundNode({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin((clock.elapsedTime + delay) * 0.8) * 0.12;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        <mesh scale={1.5}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial
            color={CYAN}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshPhysicalMaterial
            color="#050606"
            metalness={0.35}
            roughness={0.32}
            clearcoat={1}
            clearcoatRoughness={0.18}
          />
          <Edges color="#8D9999" threshold={20} />
        </mesh>
        <mesh position={[0, 0.12, 0.22]}>
          <boxGeometry args={[0.2, 0.025, 0.012]} />
          <meshBasicMaterial color={CYAN} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function SoundPath({ from, index }: { from: [number, number, number]; index: number }) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const geometry = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(0, 0.3, 0);
    const middle = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    middle.y += 0.3 + index * 0.1;
    const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
  }, [from, index]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.08 + Math.sin(clock.elapsedTime * 1.5 + index) * 0.05;
    }
  });

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial
        ref={materialRef}
        color={CYAN}
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

function SoundField() {
  const positions: [number, number, number][] = [
    [2.2, 0.8, 0],
    [-2.2, 0.6, 0],
    [1.1, 0.4, 1.9],
    [-1.1, 0.6, -1.9],
    [0, 1.2, -2.2],
    [0, 0.2, 2.2],
  ];

  return (
    <group>
      <Listener />
      {positions.map((position, index) => (
        <SoundNode key={index} position={position} delay={index * 0.8} />
      ))}
      {positions.map((position, index) => (
        <SoundPath key={`path-${index}`} from={position} index={index} />
      ))}
      {[1.8, 2.4, 3].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
          <torusGeometry args={[radius, 0.004, 8, 64]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.06 - index * 0.015} />
        </mesh>
      ))}
    </group>
  );
}

const dimensions = [
  { label: "方位", value: "声音从哪里来" },
  { label: "距离", value: "声音离你有多远" },
  { label: "运动", value: "声音如何经过身边" },
];

export default function SpatialAudio() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0.01 : 0.7;

  return (
    <section id="spatial-audio" ref={ref} className="section-padding relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration }}
          className="section-header"
        >
          <span className="section-kicker">听觉原理</span>
          <h2 className="section-title">闭上眼，也知道声音在哪里</h2>
          <p className="section-description">
            人耳天生能判断声音的方向、距离和运动。多个节点围绕听者协同，让这种本能重新回到音乐与内容体验。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration, delay: reducedMotion ? 0 : 0.08 }}
          className="aspect-[16/9] min-h-[360px] overflow-hidden rounded-lg border border-white/[0.07] bg-[#050709]"
        >
          <Canvas
            camera={{ position: [0, 2.5, 6], fov: 45 }}
            dpr={[1, 1.7]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[3, 4, 3]} intensity={0.8} />
              <SoundField />
            </Suspense>
          </Canvas>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {dimensions.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration, delay: reducedMotion ? 0 : 0.16 + index * 0.06 }}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-center"
            >
              <span className="block text-[15px] font-medium text-[#5DFFF3]/72">{item.label}</span>
              <span className="mt-1 block text-[12px] text-white/38">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
