'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';
import { useRef } from 'react';

const BRONZE = '#a9683a';
const DARK_BRONZE = '#3d2115';
const GLASS = '#71909a';

function createDustPositions() {
  const values = new Float32Array(360 * 3);
  let seed = 1390;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < 360; i++) {
    const radius = 2 + random() * 6;
    const angle = random() * Math.PI * 2;
    values[i * 3] = Math.cos(angle) * radius;
    values[i * 3 + 1] = (random() - 0.5) * 10;
    values[i * 3 + 2] = Math.sin(angle) * radius - 1;
  }
  return values;
}

const DUST_POSITIONS = createDustPositions();

function Floor({ index, progress }: { index: number; progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const baseY = index * 0.72 - 3.05;
  const side = index % 2 === 0 ? 1 : -1;

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = THREE.MathUtils.smootherstep(progress.current, 0.12, 0.92);
    const targetY = baseY + p * index * 0.19;
    const targetX = p * side * (0.12 + index * 0.075);
    const targetZ = p * Math.sin(index * 1.7) * 0.3;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 5, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p * side * 0.055, 5, delta);
  });

  return (
    <group ref={group} position={[0, baseY, 0]}>
      <RoundedBox args={[4.7, 0.16, 2.5]} radius={0.035} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color="#25211f" metalness={0.8} roughness={0.27} />
      </RoundedBox>
      <mesh position={[0, 0.34, 0]} castShadow>
        <boxGeometry args={[4.35, 0.56, 2.2]} />
        <meshPhysicalMaterial color={GLASS} metalness={0.25} roughness={0.12} transmission={0.28} transparent opacity={0.58} thickness={0.4} />
      </mesh>
      {[-1.62, -0.54, 0.54, 1.62].map((x) => (
        <mesh key={x} position={[x, 0.34, 1.12]} castShadow>
          <boxGeometry args={[0.055, 0.61, 0.07]} />
          <meshStandardMaterial color={BRONZE} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.34, 1.16]}>
        <boxGeometry args={[4.45, 0.05, 0.05]} />
        <meshStandardMaterial color={BRONZE} emissive={DARK_BRONZE} emissiveIntensity={0.8} metalness={1} />
      </mesh>
      <mesh position={[0, 0.34, -1.13]}>
        <boxGeometry args={[4.45, 0.05, 0.05]} />
        <meshStandardMaterial color={BRONZE} metalness={1} />
      </mesh>
    </group>
  );
}

function Tower({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const tower = useRef<THREE.Group>(null);
  const progress = useRef(0);
  useMotionValueEvent(scrollProgress, 'change', (latest) => { progress.current = latest; });

  useFrame((state, delta) => {
    if (!tower.current) return;
    const targetX = state.pointer.y * 0.09 - 0.05;
    const targetY = state.pointer.x * 0.23 + state.clock.elapsedTime * 0.025;
    tower.current.rotation.x = THREE.MathUtils.damp(tower.current.rotation.x, targetX, 3, delta);
    tower.current.rotation.y = THREE.MathUtils.damp(tower.current.rotation.y, targetY, 3, delta);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.18}>
      <group ref={tower} rotation={[0.04, -0.35, 0]} position={[0.6, 0, 0]}>
        {Array.from({ length: 9 }, (_, index) => <Floor key={index} index={index} progress={progress} />)}
        <mesh position={[0, 3.1, 0]} castShadow>
          <boxGeometry args={[3.3, 0.16, 1.75]} />
          <meshStandardMaterial color={BRONZE} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[0, -3.2, 0]} receiveShadow>
          <cylinderGeometry args={[3.8, 4.4, 0.28, 64]} />
          <meshStandardMaterial color="#12100f" metalness={0.65} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function Dust() {
  const points = useRef<THREE.Points>(null);
  const positions = DUST_POSITIONS;

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.018;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c17a4a" size={0.028} transparent opacity={0.62} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function BuildingScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas dpr={[1, 1.65]} camera={{ position: [7.4, 1.2, 8.5], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} shadows>
      <fog attach="fog" args={['#080807', 10, 22]} />
      <ambientLight intensity={0.3} color="#9f8879" />
      <directionalLight position={[5, 8, 6]} intensity={3.2} color="#ffd2ac" castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-7, 4, 2]} angle={0.5} penumbra={1} intensity={30} color="#8e4828" />
      <pointLight position={[2, -1, 4]} intensity={12} color="#bb6a3d" distance={9} />
      <Tower scrollProgress={scrollProgress} />
      <Dust />
    </Canvas>
  );
}
