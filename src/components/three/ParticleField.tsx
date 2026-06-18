"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 8000;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const { viewport, gl } = useThree();

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const colorCyan = new THREE.Color("#5DFFF3");
    const colorSoftCyan = new THREE.Color("#BFFFFA");
    const colorSmoke = new THREE.Color("#6F7D7D");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const theta = seededRandom(i * 5 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 5 + 2) - 1);
      const r = 3 + seededRandom(i * 5 + 3) * 5;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Gradient color mix — cyan family only
      const t = seededRandom(i * 5 + 4);
      const color = new THREE.Color();
      if (t < 0.4) color.copy(colorCyan);
      else if (t < 0.75) color.copy(colorSoftCyan);
      else color.copy(colorSmoke);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = seededRandom(i * 5 + 5) * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: 1 },
    }),
    []
  );

  const vertexShader = useMemo(
    () => `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uPixelRatio;
          attribute float aSize;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vColor = color;
            vec3 pos = position;

            // Orbital rotation
            float angle = uTime * 0.15;
            float cosA = cos(angle);
            float sinA = sin(angle);
            pos.xz = mat2(cosA, sinA, -sinA, cosA) * pos.xz;

            // Breathing effect
            float breath = sin(uTime * 0.5 + length(pos) * 0.3) * 0.15;
            pos *= 1.0 + breath;

            // Mouse interaction - ripple
            float dist = length(pos.xy - uMouse * 3.0);
            float ripple = sin(dist * 2.0 - uTime * 3.0) * exp(-dist * 0.5) * 0.3;
            pos.z += ripple;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            // Size attenuation
            gl_PointSize = aSize * uPixelRatio * (80.0 / -mvPosition.z);

            vAlpha = 0.4 + 0.6 * (1.0 - smoothstep(0.0, 8.0, length(pos)));
          }
        `,
    []
  );

  const fragmentShader = useMemo(
    () => `
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;

            float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
    []
  );

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const material = materialRef.current;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2);

    // Track mouse (reuse ref to avoid per-frame allocation)
    const mx = (state.pointer.x * viewport.width) / 2;
    const my = (state.pointer.y * viewport.height) / 2;
    targetMouse.current.set(mx, my);
    material.uniforms.uMouse.value.lerp(targetMouse.current, 0.05);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[4, 0.015, 16, 100]} />
      <meshBasicMaterial
        color="#5DFFF3"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <GlowRing />
      </Canvas>
    </div>
  );
}
