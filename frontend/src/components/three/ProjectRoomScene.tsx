'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const themes = [
  { wall: '#554a40', floor: '#201b18', fabric: '#b7a492', accent: '#a9683a', glass: '#779096', layout: 0 },
  { wall: '#313638', floor: '#17191a', fabric: '#9b9b91', accent: '#8c5f43', glass: '#789ba5', layout: 1 },
  { wall: '#4a453e', floor: '#201d19', fabric: '#a7a194', accent: '#9d6a42', glass: '#78928b', layout: 2 },
  { wall: '#464038', floor: '#191715', fabric: '#b7aa95', accent: '#b0764c', glass: '#879ba0', layout: 3 },
  { wall: '#292d2d', floor: '#131515', fabric: '#8f9794', accent: '#96613f', glass: '#6f8f98', layout: 4 },
  { wall: '#403a36', floor: '#1b1817', fabric: '#a99a8f', accent: '#a86d48', glass: '#718c91', layout: 5 },
];

function Sofa({ color, position = [0, 0, 0], rotation = 0 }: { color: string; position?: [number, number, number]; rotation?: number }) {
  return <group position={position} rotation-y={rotation}>
    <RoundedBox args={[2.5, .38, .82]} radius={.12} smoothness={3} position={[0, .42, 0]} castShadow><meshStandardMaterial color={color} roughness={.85} /></RoundedBox>
    <RoundedBox args={[2.35, .72, .25]} radius={.11} smoothness={3} position={[0, .86, .33]} castShadow><meshStandardMaterial color={color} roughness={.9} /></RoundedBox>
    {[-1.08, 1.08].map(x => <RoundedBox key={x} args={[.28, .56, .82]} radius={.1} position={[x, .65, 0]} castShadow><meshStandardMaterial color={color} roughness={.85} /></RoundedBox>)}
    {[-.72, 0, .72].map(x => <RoundedBox key={x} args={[.66, .18, .7]} radius={.08} position={[x, .66, -.03]} castShadow><meshStandardMaterial color={new THREE.Color(color).multiplyScalar(.88)} /></RoundedBox>)}
  </group>;
}

function Table({ accent }: { accent: string }) {
  return <group position={[.1, .05, 1.15]}>
    <mesh position={[0, .46, 0]} castShadow><cylinderGeometry args={[.72, .72, .09, 48]} /><meshStandardMaterial color="#181614" metalness={.7} roughness={.25} /></mesh>
    <mesh position={[0, .23, 0]} castShadow><cylinderGeometry args={[.07, .18, .46, 24]} /><meshStandardMaterial color={accent} metalness={.9} roughness={.2} /></mesh>
    <mesh position={[0, .53, 0]}><torusGeometry args={[.32,.018,8,48]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.3} /></mesh>
  </group>;
}

function Plant({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => { if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * .35) * .08; });
  return <group ref={group} position={position}>
    <mesh position={[0,.35,0]} castShadow><cylinderGeometry args={[.25,.18,.7,20]} /><meshStandardMaterial color="#3a2a21" roughness={.8} /></mesh>
    {[[-.18,.95,0],[.18,1.18,.05],[-.08,1.42,.08],[.28,1.55,0]].map((p,i)=><mesh key={i} position={p as [number,number,number]} rotation-z={(i-1.5)*.45} castShadow><sphereGeometry args={[.16,.22,.4,16,12]} /><meshStandardMaterial color={i%2?'#334b38':'#283d2f'} roughness={.9} /></mesh>)}
  </group>;
}

function Pendant({ x, accent, delay }: { x: number; accent: string; delay: number }) {
  const light = useRef<THREE.Group>(null);
  useFrame((state) => { if(light.current) light.current.position.y = 2.85 + Math.sin(state.clock.elapsedTime * .8 + delay) * .035; });
  return <group ref={light} position={[x,2.85,.8]}>
    <mesh position={[0,.65,0]}><cylinderGeometry args={[.008,.008,1.3,8]} /><meshStandardMaterial color="#332a24" /></mesh>
    <mesh><coneGeometry args={[.22,.26,32,1,true]} /><meshStandardMaterial color={accent} metalness={.85} roughness={.22} side={THREE.DoubleSide} /></mesh>
    <pointLight position={[0,-.15,0]} color="#ffc08f" intensity={2.7} distance={3.5} />
  </group>;
}

function Kitchen({ accent }: { accent:string }) {
  return <group position={[0,0,.1]}>
    <RoundedBox args={[3.8,.88,.72]} radius={.06} position={[0,.48,-1.75]} castShadow><meshStandardMaterial color="#292725" roughness={.45} /></RoundedBox>
    {[-1.4,-.7,0,.7,1.4].map(x=><mesh key={x} position={[x,.48,-2.12]}><boxGeometry args={[.012,.72,.02]} /><meshStandardMaterial color={accent} /></mesh>)}
    <RoundedBox args={[2.45,.82,.82]} radius={.08} position={[.2,.45,.4]} castShadow><meshStandardMaterial color="#51483f" roughness={.34} /></RoundedBox>
    <mesh position={[.2,.89,.4]}><boxGeometry args={[2.55,.07,.9]} /><meshStandardMaterial color="#b3a899" roughness={.22} /></mesh>
  </group>;
}

function Room({ project }: { project: number }) {
  const root = useRef<THREE.Group>(null);
  const theme = themes[project % themes.length];
  useFrame((state, delta) => {
    if (!root.current) return;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, state.pointer.x * .055, 3, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -state.pointer.y * .025, 3, delta);
  });
  const kitchen = theme.layout === 3;
  const office = theme.layout === 2 || theme.layout === 4;
  return <group ref={root} position={[0,-1.15,0]}>
    <mesh position={[0,-.06,0]} receiveShadow><boxGeometry args={[7,.12,5.6]} /><meshStandardMaterial color={theme.floor} metalness={.15} roughness={.5} /></mesh>
    <mesh position={[0,1.75,-2.75]} receiveShadow><boxGeometry args={[7,3.6,.12]} /><meshStandardMaterial color={theme.wall} roughness={.8} /></mesh>
    <mesh position={[-3.45,1.75,0]} receiveShadow><boxGeometry args={[.12,3.6,5.6]} /><meshStandardMaterial color={theme.wall} roughness={.82} /></mesh>
    <mesh position={[3.47,1.8,-1.35]}><boxGeometry args={[.08,3.35,2.55]} /><meshPhysicalMaterial color={theme.glass} transmission={.48} transparent opacity={.42} roughness={.13} metalness={.2} /></mesh>
    {[.5,1.45,2.4].map(y=><mesh key={y} position={[3.52,y,-1.35]}><boxGeometry args={[.06,.035,2.6]} /><meshStandardMaterial color={theme.accent} metalness={.9} /></mesh>)}
    {kitchen ? <Kitchen accent={theme.accent} /> : <><Sofa color={theme.fabric} position={office?[-.7,0,-.7]:[-.45,0,-.85]} rotation={office?.15:0}/><Table accent={theme.accent} /></>}
    {office && <group position={[1.6,0,-1.15]}><mesh position={[0,.75,0]} castShadow><boxGeometry args={[1.5,.08,.68]} /><meshStandardMaterial color="#544438" /></mesh><mesh position={[0,1.22,-.08]}><boxGeometry args={[.86,.52,.04]} /><meshStandardMaterial color="#101415" emissive="#1f4b54" emissiveIntensity={.35} /></mesh></group>}
    <Plant position={[-2.75,0,-1.85]} />
    <Pendant x={-.55} accent={theme.accent} delay={0} /><Pendant x={.35} accent={theme.accent} delay={1.4} />
    <mesh position={[0,1.95,-2.65]}><boxGeometry args={[2.4,1.1,.04]} /><meshStandardMaterial color="#121313" /></mesh>
    <mesh position={[0,1.95,-2.61]}><planeGeometry args={[2.1,.8]} /><meshStandardMaterial color={theme.accent} emissive={theme.accent} emissiveIntensity={.13} /></mesh>
  </group>;
}

export default function ProjectRoomScene({ project }: { project: number }) {
  return <Canvas dpr={[1,1.5]} shadows camera={{ position:[6,3.4,7.4], fov:38 }} gl={{antialias:true,powerPreference:'high-performance'}}>
    <fog attach="fog" args={['#080807',10,18]} /><ambientLight intensity={.42} color="#c4b5a8" />
    <directionalLight position={[4,7,5]} intensity={2.8} color="#ffe0c4" castShadow shadow-mapSize={[1024,1024]} />
    <spotLight position={[-4,5,4]} angle={.5} penumbra={.8} intensity={22} color={themes[project%themes.length].accent} />
    <Room key={project} project={project} /><OrbitControls enablePan={false} minDistance={6.5} maxDistance={10} minPolarAngle={.7} maxPolarAngle={1.35} target={[0,.4,0]} autoRotate autoRotateSpeed={.22} />
  </Canvas>;
}
