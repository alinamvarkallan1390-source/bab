'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Float, OrbitControls, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function BlueprintModel() {
  const root = useRef<THREE.Group>(null);
  const slabs = useRef<(THREE.Group|null)[]>([]);
  useFrame((state, delta) => {
    if(root.current) root.current.rotation.y += delta * .055;
    slabs.current.forEach((slab,i)=>{ if(slab) slab.position.y = i*.62-1.7 + Math.sin(state.clock.elapsedTime*.65+i*.55)*.06; });
  });
  return <Float speed={1.1} floatIntensity={.18} rotationIntensity={.05}>
    <group ref={root} rotation={[.05,-.6,0]}>
      {Array.from({length:7},(_,i)=><group key={i} ref={el=>{slabs.current[i]=el}} position={[0,i*.62-1.7,0]}>
        <RoundedBox args={[3.8,.12,2.55]} radius={.025} smoothness={2}><meshStandardMaterial color={i%2?'#24211f':'#1a1918'} metalness={.65} roughness={.28}/><Edges color="#a9683a" threshold={15}/></RoundedBox>
        {[-1.55,1.55].map(x=><mesh key={x} position={[x,.29,0]}><boxGeometry args={[.07,.58,2.2]}/><meshStandardMaterial color="#554033" metalness={.8}/></mesh>)}
        <mesh position={[0,.3,-1.05]}><boxGeometry args={[3.05,.54,.05]}/><meshPhysicalMaterial color="#718b91" transparent opacity={.4} transmission={.35} roughness={.12}/></mesh>
      </group>)}
      <mesh position={[0,2.2,0]}><boxGeometry args={[2.4,.1,1.6]}/><meshStandardMaterial color="#a9683a" metalness={.9} roughness={.2}/></mesh>
    </group>
  </Float>;
}
function Rings(){const r=useRef<THREE.Group>(null);useFrame((_,d)=>{if(r.current){r.current.rotation.x+=d*.05;r.current.rotation.z-=d*.035}});return <group ref={r}>{[3.2,4.1,5].map((s,i)=><mesh key={s} rotation={[Math.PI/2,i*.5,0]}><torusGeometry args={[s,.008,8,96]}/><meshBasicMaterial color="#a9683a" transparent opacity={.25-i*.05}/></mesh>)}</group>}
export default function ServiceBlueprintScene(){return <Canvas dpr={[1,1.5]} camera={{position:[6,3.5,7],fov:38}} gl={{antialias:true,alpha:true}}><ambientLight intensity={.45}/><directionalLight position={[5,7,5]} intensity={3} color="#ffd6b6"/><pointLight position={[-4,0,3]} intensity={14} color="#a9683a"/><BlueprintModel/><Rings/><OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={.35}/></Canvas>}
