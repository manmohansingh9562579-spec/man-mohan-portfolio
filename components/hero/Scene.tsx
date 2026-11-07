'use client';

import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Quality = 'full' | 'lite';
type Pointer = MutableRefObject<{ x: number; y: number }>;

const points: [number, number, number][] = [
  [-2.6, 1.2, 0.15], [-1.55, 2.0, -0.35], [-0.1, 1.35, 0.35], [1.45, 1.95, -0.2],
  [2.65, 0.85, 0.2], [1.4, 0.1, -0.35], [0.05, -0.55, 0.35], [-1.4, 0.05, -0.25],
  [-0.1, 0.38, 0.55],
];
const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 8], [8, 6], [6, 7], [7, 0],
  [1, 8], [2, 8], [3, 5], [0, 6], [2, 5], [6, 2],
];
const route = [0, 1, 2, 3, 4, 5, 8, 6, 7];

function Network({ quality, pointer }: { quality: Quality; pointer: Pointer }) {
  const group = useRef<THREE.Group>(null);
  const packets = useRef<Array<THREE.Mesh | null>>([]);
  const vectors = useMemo(() => points.map((point) => new THREE.Vector3(...point)), []);
  const linePositions = useMemo(() => new Float32Array(connections.flatMap(([from, to]) => [...points[from], ...points[to]])), []);
  const packetCount = quality === 'full' ? 4 : 2;

  useFrame((state, delta) => {
    const graph = group.current;
    if (!graph) return;
    const time = state.clock.elapsedTime;
    graph.rotation.y = THREE.MathUtils.damp(graph.rotation.y, pointer.current.x * 0.2 + Math.sin(time * 0.16) * 0.045, 2, delta);
    graph.rotation.x = THREE.MathUtils.damp(graph.rotation.x, -pointer.current.y * 0.13, 2, delta);
    graph.position.y = Math.sin(time * 0.42) * 0.07;

    packets.current.forEach((packet, index) => {
      if (!packet) return;
      const progress = (time * (0.12 + index * 0.012) + index / packetCount) % 1;
      const routePosition = progress * (route.length - 1);
      const segment = Math.min(Math.floor(routePosition), route.length - 2);
      const local = routePosition - segment;
      packet.position.lerpVectors(vectors[route[segment]], vectors[route[segment + 1]], local);
    });
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#75bfff" transparent opacity={0.42} />
      </lineSegments>

      {points.map((point, index) => <mesh key={index} position={point}>
        <sphereGeometry args={[index === 2 || index === 8 ? 0.105 : 0.075, 16, 16]} />
        <meshStandardMaterial color={index === 2 ? '#a7f3ff' : '#8cc7ff'} emissive={index === 2 ? '#3bd2e5' : '#276bb1'} emissiveIntensity={index === 2 ? 1.3 : 0.65} roughness={0.24} metalness={0.18} />
      </mesh>)}

      {Array.from({ length: packetCount }, (_, index) => <mesh key={`packet-${index}`} ref={(node) => { packets.current[index] = node; }}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={index % 2 ? '#6fffe9' : '#d8f7ff'} toneMapped={false} />
      </mesh>)}
    </group>
  );
}

export default function Scene({ quality, active }: { quality: Quality; active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <Canvas
      dpr={quality === 'full' ? [1, 1.35] : 1}
      performance={{ min: 0.65 }}
      camera={{ position: [0, 0, 8], fov: 38 }}
      gl={{ alpha: true, antialias: quality === 'full', powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[1, 2, 4]} color="#9cd8ff" intensity={18} distance={12} />
      <pointLight position={[-3, -1, -2]} color="#40e3d0" intensity={10} distance={10} />
      <Network quality={quality} pointer={pointer} />
    </Canvas>
  );
}
