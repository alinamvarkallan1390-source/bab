'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const mesh = useRef<THREE.Points>(null!);
  const count = 1500;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const hue = 0.12 + Math.random() * 0.08;
      const c = new THREE.Color().setHSL(hue, 1, 0.5 + Math.random() * 0.3);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = Math.sin(time * 0.02) * 0.2;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

export default function NeonBackground() {
  return (
    <div className="absolute inset-0 z-0" style={{ background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
