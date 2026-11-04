'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

type Quality = 'full' | 'lite';
type Pointer = MutableRefObject<{ x: number; y: number }>;

/** A glass icosahedron held inside a metallic torus knot, wrapped by two thin light rings. */
function Sculpture({ quality, pointer }: { quality: Quality; pointer: Pointer }) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Entrance: scale up and the camera glides in
    const enter = Math.min(1, t / 1.8);
    const ease = 1 - Math.pow(1 - enter, 3);
    g.scale.setScalar((0.3 + 0.7 * ease) * 0.86);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 7 + (1 - ease) * 3, 4, dt);

    // Cursor-responsive rotation and camera drift
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.8 + t * 0.1, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * 0.45, 3, dt);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, pointer.current.x * 0.6, 2, dt);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, pointer.current.y * 0.35, 2, dt);
    state.camera.lookAt(0, 0, 0);

    if (knot.current) knot.current.rotation.z = t * 0.12;
    if (core.current) { core.current.rotation.y = t * 0.3; core.current.rotation.x = t * 0.18; }
    if (ringA.current) ringA.current.rotation.z = t * 0.2;
    if (ringB.current) ringB.current.rotation.z = -t * 0.14;
  });

  const full = quality === 'full';

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.7}>
      <group ref={group}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.15, 0.26, full ? 260 : 140, full ? 36 : 20, 2, 3]} />
          <meshStandardMaterial color="#7f95ff" metalness={1} roughness={0.22} envMapIntensity={1.35} />
        </mesh>

        <mesh ref={core}>
          <icosahedronGeometry args={[0.62, full ? 5 : 3]} />
          <meshPhysicalMaterial color="#9fb0ff" emissive="#4a5cff" emissiveIntensity={0.7} transparent opacity={0.88} roughness={0.08} metalness={0.05} clearcoat={1} clearcoatRoughness={0.05} iridescence={1} iridescenceIOR={1.4} envMapIntensity={1.6} />
        </mesh>

        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.05, 0.012, 16, 200]} />
          <meshBasicMaterial color="#4f8bff" transparent opacity={0.85} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 2.4, 0.9, 0]}>
          <torusGeometry args={[2.35, 0.01, 16, 200]} />
          <meshBasicMaterial color="#9b6bff" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

/** Blue and violet light panels used as reflections. Built in code so nothing is downloaded. */
function Lighting() {
  return (
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={4.5} color="#4f7bff" position={[-4, 2, 3]} scale={[6, 3, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      <Lightformer form="ring" intensity={3} color="#a07bff" position={[4, -1, 2]} scale={4} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 5, -3]} scale={[8, 2, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 1, 6]} scale={[7, 4, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </Environment>
  );
}

export default function Scene({ quality, active }: { quality: Quality; active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  // The canvas ignores pointer events so it never blocks buttons, so the cursor is tracked on window.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <Canvas
      dpr={quality === 'full' ? [1, 1.5] : 1}
      performance={{ min: 0.6 }}
      camera={{ position: [0, 0, 10], fov: 38 }}
      gl={{ alpha: true, antialias: quality === 'full', powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.35} />
      <Lighting />
      <Sculpture quality={quality} pointer={pointer} />
      {quality === 'full' && <Sparkles count={30} scale={[8, 5, 4]} size={2.2} speed={0.25} opacity={0.6} color="#9fb4ff" />}
    </Canvas>
  );
}
