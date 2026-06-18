"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  Line,
  Edges,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CYAN = "#5DFFF3";
const BLACK = "#030505";

function AdaptiveHeroCamera() {
  const { size } = useThree();
  const isMobile = size.width < 640;
  const isTablet = size.width < 900;
  const position: [number, number, number] = isMobile
    ? [0, 1.25, 8.8]
    : isTablet
      ? [0, 1.2, 7.2]
      : [0, 1.15, 6.2];
  const fov = isMobile ? 48 : isTablet ? 40 : 34;

  return (
    <PerspectiveCamera
      makeDefault
      position={position}
      fov={fov}
      onUpdate={(camera) => camera.lookAt(0, 0, 0)}
    />
  );
}

// ============================================
// 倒角八边形几何体
// ============================================
function createChamferedPrismGeometry(
  width: number, depth: number, height: number, chamfer: number, bevel: number
) {
  const w = width / 2, d = depth / 2, c = chamfer;
  const shape = new THREE.Shape();
  const pts: [number, number][] = [
    [-w + c, -d], [w - c, -d], [w, -d + c], [w, d - c],
    [w - c, d], [-w + c, d], [-w, d - c], [-w, -d + c],
  ];
  shape.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 3,
  });
  geometry.center();
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

function useChamferedPrism(w: number, d: number, h: number, c: number, b: number) {
  return useMemo(() => createChamferedPrismGeometry(w, d, h, c, b), [w, d, h, c, b]);
}

// ============================================
// 霓虹轮廓线
// ============================================
function NeonOutline() {
  const points = useMemo(() => {
    const w = 2.575, d = 1.475, c = 0.46, y = -0.12;
    const arr: [number, number, number][] = [
      [-w + c, y, -d], [w - c, y, -d], [w, y, -d + c], [w, y, d - c],
      [w - c, y, d], [-w + c, y, d], [-w, y, d - c], [-w, y, -d + c], [-w + c, y, -d],
    ];
    return arr.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  }, []);
  return <Line points={points} color={CYAN} lineWidth={4} transparent opacity={0.9} />;
}

// ============================================
// 多面体音频节点
// ============================================
function BubblePod({ position, scale = 1, rotation = [0, 0, 0] }: {
  position: [number, number, number]; scale?: number; rotation?: [number, number, number];
}) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshPhysicalMaterial color="#050606" metalness={0.45} roughness={0.28} clearcoat={1} clearcoatRoughness={0.18} />
        <Edges color="#7E8C8C" threshold={24} />
      </mesh>
      <mesh position={[0, 0.18, 0.32]}>
        <boxGeometry args={[0.34, 0.035, 0.018]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.18, 0.33]} color={CYAN} intensity={0.45} />
    </group>
  );
}

// ============================================
// 漂浮节点
// ============================================
function FloatingBubbleNode({ position, scale = 1, speed = 1 }: {
  position: [number, number, number]; scale?: number; speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.7}>
      <group position={position} scale={scale}>
        <mesh scale={1.35}>
          <sphereGeometry args={[0.72, 48, 48]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[0.48, 0]} />
          <meshPhysicalMaterial color="#050606" metalness={0.35} roughness={0.32} clearcoat={1} clearcoatRoughness={0.18} />
          <Edges color="#8D9999" threshold={20} />
        </mesh>
        <mesh position={[0, 0.18, 0.36]}>
          <boxGeometry args={[0.34, 0.035, 0.018]} />
          <meshBasicMaterial color={CYAN} toneMapped={false} />
        </mesh>
        <pointLight color={CYAN} intensity={0.5} distance={2} />
      </group>
    </Float>
  );
}

// ============================================
// 声场波纹环
// ============================================
function SoundRings() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.12;
    group.current.children.forEach((child, i) => {
      (child as THREE.Mesh).scale.setScalar(1 + Math.sin(t * 1.2 + i) * 0.05);
    });
  });
  return (
    <group ref={group} position={[0, 0.14, 0]}>
      {[1.2, 1.7, 2.25].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02 + i * 0.03, 0]}>
          <torusGeometry args={[r, 0.007, 12, 160]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.12 - i * 0.025} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// 设备主体
// ============================================
function BubbleFlowDevice() {
  const bodyGeometry = useChamferedPrism(5, 2.8, 0.62, 0.46, 0.06);
  const topGeometry = useChamferedPrism(5.08, 2.88, 0.12, 0.48, 0.035);

  return (
    <group>
      {/* 底座 */}
      <mesh geometry={bodyGeometry} position={[0, -0.28, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color={BLACK} metalness={0.38} roughness={0.26} clearcoat={1} clearcoatRoughness={0.16} />
      </mesh>
      <NeonOutline />

      {/* 亚克力上盖 */}
      <group position={[0, 0.12, -1.2]} rotation={[THREE.MathUtils.degToRad(-25), 0, 0]}>
        <mesh geometry={topGeometry} position={[0, 0, 1.2]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#9CB7BC" transparent opacity={0.28} roughness={0.06} clearcoat={1} clearcoatRoughness={0.04} transmission={0.45} thickness={0.32} />
        </mesh>
      </group>

      {/* 铰链 */}
      <group position={[0, 0.22, -1.38]}>
        {[-1.9, 1.9].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.08, 0.42, 0.05]} />
              <meshPhysicalMaterial color="#BFD9D9" metalness={0.5} roughness={0.18} clearcoat={1} />
            </mesh>
            <mesh position={[0, 0.24, 0]}>
              <boxGeometry args={[0.14, 0.04, 0.08]} />
              <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Logo */}
      <mesh position={[0, -0.14, 1.43]}>
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} />
      </mesh>
      <pointLight position={[0, -0.12, 1.5]} color={CYAN} intensity={0.8} />

      {/* 6 个音频单元 */}
      <group position={[0, 0.22, 0]}>
        <BubblePod position={[-1.45, 0, -0.45]} rotation={[0.2, 0.4, -0.1]} />
        <BubblePod position={[0, 0.02, -0.5]} rotation={[0.1, -0.2, 0.05]} />
        <BubblePod position={[1.45, 0, -0.45]} rotation={[0.12, 0.35, 0.08]} />
        <BubblePod position={[-1.0, 0, 0.55]} rotation={[0.1, -0.4, 0.05]} />
        <BubblePod position={[0.45, 0.03, 0.55]} rotation={[0.2, 0.2, -0.05]} />
        <BubblePod position={[1.55, 0, 0.45]} rotation={[0.1, -0.15, 0.04]} />
      </group>

      <SoundRings />
    </group>
  );
}

// ============================================
// 产品场景
// ============================================
function ProductScene({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const { size } = useThree();
  const sceneScale = size.width < 640 ? 0.72 : size.width < 900 ? 0.88 : 1;

  useFrame(({ clock, pointer }) => {
    if (!root.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.x * 0.22 + Math.sin(t * 0.22) * 0.08, 0.04);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -0.1 + pointer.y * 0.08, 0.04);
    root.current.position.y = Math.sin(t * 0.8) * 0.035;
  });
  return (
    <group ref={root} scale={sceneScale} rotation={[-0.08, -0.35, 0]} position={[0, -0.15, 0]}>
      <BubbleFlowDevice />
      <FloatingBubbleNode position={[-3.4, 1.45, -1.1]} scale={0.8} speed={1.1} />
      <FloatingBubbleNode position={[3.2, 1.65, -0.6]} scale={1.15} speed={0.9} />
      <FloatingBubbleNode position={[-2.8, -0.25, 1.3]} scale={0.72} speed={1.4} />
      <FloatingBubbleNode position={[2.8, -0.1, 1.2]} scale={0.92} speed={1.2} />
      <Sparkles count={40} scale={[5, 2.5, 3.5]} size={0.8} speed={0.15} opacity={0.15} color={CYAN} />
    </group>
  );
}

// ============================================
// 文案动画
// ============================================
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.8 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const instantVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 0.3 + i * 0.05, duration: 0.01 },
  }),
};

// ============================================
// 主组件
// ============================================
export default function BubbleFlowHero() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? instantVariants : textVariants;

  return (
    <section className="bubbleflow-hero">
      <div className="bubbleflow-canvas">
        <Canvas
          shadows
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <AdaptiveHeroCamera />
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 5, 10]} />
          <ambientLight intensity={0.18} />
          <directionalLight position={[4, 5, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
          <pointLight position={[-3, 1.5, 2]} color={CYAN} intensity={1.5} />
          <pointLight position={[2.5, 2.3, -2]} color="#BFFFFA" intensity={0.9} />
          <Suspense fallback={null}>
            <ProductScene reducedMotion={reducedMotion} />
            <ContactShadows position={[0, -0.75, 0]} opacity={0.35} scale={7} blur={2.4} far={3} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="bubbleflow-copy">
        <motion.p custom={0} initial="hidden" animate="visible" variants={variants} className="bubbleflow-kicker">
          BubbleFlow 汽泡音露
        </motion.p>
        <motion.h1 custom={1} initial="hidden" animate="visible" variants={variants}>
          释放多维感知
        </motion.h1>
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="bubbleflow-desc">
          面向空间计算时代的多维智能音频音乐交互平台，
          让人耳听见方位、距离、运动与空间层次。
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={variants} className="bubbleflow-actions">
          <a href="#product" className="bubbleflow-btn-primary">探索产品</a>
          <a href="#scenes" className="bubbleflow-btn-ghost">查看场景</a>
        </motion.div>
      </div>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="bubbleflow-scroll-indicator"
        >
          <div className="bubbleflow-scroll-dot-container">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="bubbleflow-scroll-dot" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
