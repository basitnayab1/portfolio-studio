import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ProfileId } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';

/**
 * PROFILE HALO — a small 3D model orbiting behind each "Who's watching?" avatar.
 * Basit: a neural network ring · Ahram: a film-strip ring · Faraz: products and coins in orbit.
 * All three tilt with the mouse together; the hovered card spins faster and grows a little.
 */

const pointer = { x: 0, y: 0 };
let listening = 0;
function usePointer() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (listening++ === 0) window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (--listening === 0) window.removeEventListener('pointermove', onMove);
    };
  }, []);
}

const R = 1.35;

function NeuralRing({ color }: { color: THREE.Color }) {
  const N = 12;
  const nodes = useMemo(() => Array.from({ length: N }, (_, i) => new THREE.Vector3(Math.cos((i / N) * Math.PI * 2) * R, Math.sin((i / N) * Math.PI * 2) * R, (i % 2 ? 0.18 : -0.18))), []);
  const lines = useMemo(() => {
    const pts: number[] = [];
    nodes.forEach((p, i) => {
      [1, 3].forEach((k) => {
        const q = nodes[(i + k) % N];
        pts.push(p.x, p.y, p.z, q.x, q.y, q.z);
      });
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [nodes]);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => m && m.scale.setScalar(1 + Math.max(0, Math.sin(clock.elapsedTime * 3 - i * 0.7)) * 0.9));
  });
  return (
    <group>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={color} transparent opacity={0.45} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p} ref={(m) => (refs.current[i] = m)}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
        </mesh>
      ))}
    </group>
  );
}

function FilmRing({ color }: { color: THREE.Color }) {
  const N = 18;
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[R, R, 0.42, 96, 1, true]} />
        <meshStandardMaterial color="#1a1028" metalness={0.6} roughness={0.35} side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>
      {Array.from({ length: N }, (_, i) => {
        const a = (i / N) * Math.PI * 2;
        return (
          <group key={i} position={[Math.cos(a) * (R + 0.005), 0, Math.sin(a) * (R + 0.005)]} rotation={[0, -a + Math.PI / 2, 0]}>
            <mesh>
              <planeGeometry args={[0.32, 0.24]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={i % 3 === 0 ? 1.6 : 0.6} side={THREE.DoubleSide} />
            </mesh>
            {[-0.17, 0.17].map((y) => (
              <mesh key={y} position={[0, y, 0.001]}>
                <planeGeometry args={[0.05, 0.03]} />
                <meshBasicMaterial color="#e9e3ff" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

function CommerceOrbit({ color }: { color: THREE.Color }) {
  const N = 10;
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      g.position.y = Math.sin(t * 1.6 + i) * 0.14;
      g.rotation.set(t * 0.8 + i, t * 1.1 + i, 0);
    });
  });
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.008, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {Array.from({ length: N }, (_, i) => {
        const a = (i / N) * Math.PI * 2;
        const coin = i % 2 === 1;
        return (
          <group key={i} position={[Math.cos(a) * R, 0, Math.sin(a) * R]}>
            <group ref={(g) => (refs.current[i] = g)}>
              {coin ? (
                <mesh>
                  <cylinderGeometry args={[0.12, 0.12, 0.035, 28]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.25} emissive="#a16207" emissiveIntensity={0.4} />
                </mesh>
              ) : (
                <mesh>
                  <boxGeometry args={[0.17, 0.17, 0.17]} />
                  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} metalness={0.3} roughness={0.35} />
                </mesh>
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
}

function Rig({ kind, active, color }: { kind: ProfileId; active: boolean; color: THREE.Color }) {
  const tilt = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const s = useRef(1);
  // the neural ring is drawn in the XY plane (faces the camera); film and commerce lie flat in XZ
  const flat = kind !== 'basit';
  const baseX = flat ? 0.38 : -0.95;
  useFrame((_, dt) => {
    if (!tilt.current || !spinner.current) return;
    const k = 1 - Math.exp(-dt * 4);
    tilt.current.rotation.x += (baseX + pointer.y * 0.22 - tilt.current.rotation.x) * k;
    tilt.current.rotation.z += (pointer.x * -0.18 - tilt.current.rotation.z) * k;
    s.current += ((active ? 1.08 : 1) - s.current) * (1 - Math.exp(-dt * 6));
    tilt.current.scale.setScalar(s.current);
    const speed = dt * (active ? 1.6 : 0.45);
    if (flat) spinner.current.rotation.y += speed;
    else spinner.current.rotation.z += speed;
  });
  return (
    <group ref={tilt}>
      <group ref={spinner}>
        {kind === 'basit' ? <NeuralRing color={color} /> : kind === 'ahram' ? <FilmRing color={color} /> : <CommerceOrbit color={color} />}
      </group>
    </group>
  );
}

export default function ProfileHalo({ kind, color, active }: { kind: ProfileId; color: string; active: boolean }) {
  usePointer();
  const reduced = useReducedMotionPref(); // draw once, no animation loop
  const c = useMemo(() => new THREE.Color(color), [color]);
  return (
    <Canvas frameloop={reduced ? 'demand' : 'always'} camera={{ fov: 35, position: [0, 0, 5] }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ position: 'absolute', inset: 0 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={2} />
      <pointLight position={[0, 0, 2]} color={c} intensity={8} distance={6} />
      <Rig kind={kind} active={active} color={c} />
    </Canvas>
  );
}
