import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ProfileId } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';

/**
 * HERO SCENE — a 3D object behind each lead's portrait, with the hero's info chips
 * pointing at parts of it through leader lines (as on the Techno AI site).
 *   Basit: an "AI brain" — geodesic neural shell, pulsing nodes, data streaming into a glowing core.
 *   Ahram: a film reel turning in a projector beam, with a film strip arcing around it.
 *   Faraz: a growth engine — 3D bars rising behind a climbing arrow, products and coins in orbit.
 * The canvas only animates while the hero is on screen.
 */

export type HeroChip = { text: string; sub: string; x: number; y: number; align: 'left' | 'right' };

const pointer = { x: 0, y: 0 };

/* ------------------------------- Basit: AI brain ------------------------------- */

const VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vV; varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;
const CORE_FRAG = /* glsl */ `
  uniform float uTime; uniform vec3 uA; uniform vec3 uB;
  varying vec3 vN; varying vec3 vV; varying vec2 vUv;
  float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float trace(vec2 uv, float s, float t) {
    vec2 g = uv * vec2(s * 2., s); vec2 id = floor(g); vec2 f = fract(g); float r = h(id);
    float l = max(smoothstep(.07,.0,abs(f.y-.5))*step(.45,r), smoothstep(.07,.0,abs(f.x-.5))*step(r,.35));
    float k = fract(g.x*.07 + g.y*.03 - t*.4 + r);
    return l * (.3 + smoothstep(.0,.25,k)*smoothstep(.5,.25,k)*1.6);
  }
  void main() {
    float fres = pow(1. - max(dot(vN, vV), 0.), 2.2);
    float c = trace(vUv, 14., uTime) + trace(vUv + .37, 26., uTime*1.2)*.5;
    vec3 base = mix(vec3(.04,.01,.02), uA*.25, .6);
    gl_FragColor = vec4(base + mix(uA, uB, vUv.y) * c + uA * fres * 1.2, 1.);
  }`;

function AIBrain({ color, anchors }: { color: THREE.Color; anchors: THREE.Object3D[] }) {
  const accent = useMemo(() => new THREE.Color('#a855f7'), []);
  const core = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: CORE_FRAG, uniforms: { uTime: { value: 0 }, uA: { value: color }, uB: { value: accent } } }),
    [color, accent],
  );
  const shell = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const streams = useRef<THREE.Points>(null);

  const { lineGeo, verts } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.75, 2);
    const pos = ico.getAttribute('position') as THREE.BufferAttribute;
    const unique: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      if (!unique.some((u) => u.distanceToSquared(v) < 1e-4)) unique.push(v);
    }
    const edges = new THREE.EdgesGeometry(ico);
    return { lineGeo: edges, verts: unique };
  }, []);

  useEffect(() => {
    const m = new THREE.Matrix4();
    verts.forEach((v, i) => {
      m.makeTranslation(v.x, v.y, v.z);
      nodes.current?.setMatrixAt(i, m);
    });
    if (nodes.current) nodes.current.instanceMatrix.needsUpdate = true;
  }, [verts]);

  // particles that stream from far away into the core
  const S = 220;
  const { sGeo, seeds } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(S * 3), 3));
    const sd = Array.from({ length: S }, (_, i) => {
      const th = (i * 2.399) % (Math.PI * 2);
      const ph = Math.acos(1 - (2 * ((i * 0.618) % 1)));
      return { dir: new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)), off: (i * 0.37) % 1, speed: 0.12 + ((i * 0.53) % 1) * 0.18 };
    });
    return { sGeo: g, seeds: sd };
  }, []);

  const colAttr = useRef<THREE.Color[]>([]);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    core.uniforms.uTime.value += dt;
    if (shell.current) {
      shell.current.rotation.y += dt * 0.12;
      shell.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (nodes.current) {
      if (!colAttr.current.length) colAttr.current = verts.map(() => new THREE.Color());
      verts.forEach((v, i) => {
        const pulse = Math.max(0, Math.sin(t * 2.2 - v.y * 2 - v.x));
        colAttr.current[i].copy(color).lerp(accent, (i % 5) / 6).multiplyScalar(0.6 + pulse * 2.4);
        nodes.current!.setColorAt(i, colAttr.current[i]);
      });
      if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true;
    }
    const a = sGeo.getAttribute('position') as THREE.BufferAttribute;
    seeds.forEach((s, i) => {
      const f = (t * s.speed + s.off) % 1;
      const r = 4.2 - f * 3.6;
      a.setXYZ(i, s.dir.x * r, s.dir.y * r, s.dir.z * r);
    });
    a.needsUpdate = true;
  });

  return (
    <group>
      <mesh material={core}>
        <sphereGeometry args={[0.72, 64, 64]} />
      </mesh>
      <pointLight color={color} intensity={14} distance={6} />
      <group ref={shell}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color={color} transparent opacity={0.35} />
        </lineSegments>
        <instancedMesh ref={nodes} args={[undefined, undefined, verts.length]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        <object3D ref={(o) => o && (anchors[0] = o)} position={verts[5] ?? [1, 1, 0]} />
      </group>
      {/* orbit of "chat" capsules = chatbots */}
      <Orbit radius={2.35} tilt={[1.25, 0.2, 0]} speed={0.35} color={color} count={7} shape="capsule" anchor={(o) => (anchors[2] = o)} />
      {/* code ring = full-stack */}
      <Orbit radius={2.75} tilt={[1.0, -0.5, 0.3]} speed={-0.22} color={accent} count={10} shape="tile" anchor={(o) => (anchors[1] = o)} />
      <points ref={streams} geometry={sGeo}>
        <pointsMaterial size={0.04} color={color} transparent opacity={0.85} depthWrite={false} />
      </points>
    </group>
  );
}

function Orbit({
  radius,
  tilt,
  speed,
  color,
  count,
  shape,
  anchor,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: THREE.Color;
  count: number;
  shape: 'capsule' | 'tile' | 'box' | 'coin';
  anchor?: (o: THREE.Object3D) => void;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <group ref={g}>
        {Array.from({ length: count }, (_, i) => {
          const a = (i / count) * Math.PI * 2;
          const p: [number, number, number] = [Math.cos(a) * radius, Math.sin(a) * radius, 0];
          return (
            <group key={i} position={p} rotation={[0, 0, a]}>
              {shape === 'capsule' && (
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <capsuleGeometry args={[0.07, 0.22, 4, 12]} />
                  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
                </mesh>
              )}
              {shape === 'tile' && (
                <mesh>
                  <boxGeometry args={[0.22, 0.14, 0.02]} />
                  <meshStandardMaterial color="#14101e" emissive={color} emissiveIntensity={0.9} metalness={0.4} roughness={0.3} />
                </mesh>
              )}
              {shape === 'box' && (
                <mesh>
                  <boxGeometry args={[0.2, 0.2, 0.2]} />
                  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={0.3} roughness={0.35} />
                </mesh>
              )}
              {shape === 'coin' && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.13, 0.13, 0.035, 28]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.25} emissive="#a16207" emissiveIntensity={0.4} />
                </mesh>
              )}
              {i === 0 && anchor && <object3D ref={(o) => o && anchor(o)} />}
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------- Ahram: film reel ------------------------------- */

function FilmReel({ color, anchors }: { color: THREE.Color; anchors: THREE.Object3D[] }) {
  const reel = useRef<THREE.Group>(null);
  const strip = useRef<THREE.Group>(null);
  const beam = useRef<THREE.MeshBasicMaterial>(null);
  const holes = 6;
  useFrame(({ clock }, dt) => {
    if (reel.current) reel.current.rotation.y -= dt * 0.5;
    if (strip.current) strip.current.rotation.y += dt * 0.25;
    if (beam.current) beam.current.opacity = 0.1 + Math.sin(clock.elapsedTime * 9) * 0.015 + Math.sin(clock.elapsedTime * 2.3) * 0.03;
  });
  const frames = 22;
  return (
    <group>
      {/* projector beam */}
      <mesh position={[0.4, 0.2, -1.2]} rotation={[0, 0, -Math.PI / 2 - 0.35]}>
        <coneGeometry args={[2.6, 7, 48, 1, true]} />
        <meshBasicMaterial ref={beam} color={color} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* reel: drawn flat around Y, turned to face the camera */}
      <group position={[0, 0.2, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={reel}>
        <mesh>
          <cylinderGeometry args={[2.05, 2.05, 0.12, 96]} />
          <meshStandardMaterial color="#1b1526" metalness={0.85} roughness={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.05, 0.05, 12, 120]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
        </mesh>
        {Array.from({ length: holes }, (_, i) => {
          const a = (i / holes) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.15, 0.07, Math.sin(a) * 1.15]}>
              <cylinderGeometry args={[0.45, 0.45, 0.02, 40]} />
              <meshBasicMaterial color="#05030a" />
            </mesh>
          );
        })}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.06, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
        </mesh>
        <object3D ref={(o) => o && (anchors[1] = o)} position={[0, 0.1, 0]} />
      </group>
      </group>
      {/* film strip ring */}
      <group ref={strip} rotation={[0.35, 0, 0.25]}>
        <mesh>
          <cylinderGeometry args={[2.75, 2.75, 0.4, 120, 1, true]} />
          <meshStandardMaterial color="#120c1c" metalness={0.5} roughness={0.4} side={THREE.DoubleSide} transparent opacity={0.9} />
        </mesh>
        {Array.from({ length: frames }, (_, i) => {
          const a = (i / frames) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.76, 0, Math.sin(a) * 2.76]} rotation={[0, -a + Math.PI / 2, 0]}>
              <planeGeometry args={[0.6, 0.28]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={i % 4 === 0 ? 1.8 : 0.5} side={THREE.DoubleSide} />
            </mesh>
          );
        })}
        <object3D ref={(o) => o && (anchors[0] = o)} position={[2.76, 0, 0]} />
      </group>
      <object3D ref={(o) => o && (anchors[2] = o)} position={[2.4, -1.4, -1.2]} />
    </group>
  );
}

/* ------------------------------- Faraz: growth engine ------------------------------- */

function GrowthEngine({ color, anchors }: { color: THREE.Color; anchors: THREE.Object3D[] }) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const arrow = useRef<THREE.Group>(null);
  const HEIGHTS = [0.7, 1.1, 1.55, 2.1, 2.8];
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(-2.2, -1.1, 0.6), new THREE.Vector3(-1, -0.4, 0.7), new THREE.Vector3(0.2, -0.2, 0.7), new THREE.Vector3(1.2, 0.7, 0.7), new THREE.Vector3(2.2, 1.6, 0.7)]), []);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.05, 10, false), [curve]);
  const draw = useRef(0);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    bars.current.forEach((b, i) => {
      if (!b) return;
      const grow = Math.min(1, Math.max(0, t * 0.6 - i * 0.18));
      const h = HEIGHTS[i] * (0.92 + Math.sin(t * 1.4 + i) * 0.04) * (0.05 + 0.95 * (1 - Math.pow(1 - grow, 3)));
      b.scale.y = h;
      b.position.y = -1.6 + h / 2;
    });
    draw.current = Math.min(1, draw.current + dt * 0.4);
    tube.setDrawRange(0, Math.floor(tube.index!.count * draw.current));
    if (arrow.current) {
      const p = curve.getPointAt(Math.max(0.001, draw.current));
      const tg = curve.getTangentAt(Math.max(0.001, draw.current));
      arrow.current.position.copy(p);
      arrow.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tg);
    }
  });
  return (
    <group position={[0, 0.2, -0.8]}>
      {HEIGHTS.map((_, i) => (
        <mesh key={i} ref={(m) => (bars.current[i] = m)} position={[-2 + i * 1, -1.6, 0]}>
          <boxGeometry args={[0.6, 1, 0.6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35 + i * 0.12} metalness={0.4} roughness={0.25} transparent opacity={0.85} />
        </mesh>
      ))}
      <object3D ref={(o) => o && (anchors[0] = o)} position={[2, 1.3, 0]} />
      <mesh geometry={tube}>
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.4} />
      </mesh>
      <group ref={arrow}>
        <mesh>
          <coneGeometry args={[0.16, 0.38, 20]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.6} />
        </mesh>
        <object3D ref={(o) => o && (anchors[1] = o)} />
      </group>
      <group position={[0, 0.3, 0]}>
        <Orbit radius={2.9} tilt={[1.3, 0, 0.15]} speed={0.3} color={color} count={8} shape="box" anchor={(o) => (anchors[2] = o)} />
        <Orbit radius={3.2} tilt={[1.3, 0, 0.15]} speed={-0.2} color={color} count={8} shape="coin" />
      </group>
    </group>
  );
}

/* ------------------------------- scene ------------------------------- */

function Rig({ kind, color, anchors, onProject }: { kind: ProfileId; color: THREE.Color; anchors: THREE.Object3D[]; onProject: (p: { x: number; y: number }[]) => void }) {
  const g = useRef<THREE.Group>(null);
  const v = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();
  useFrame((_, dt) => {
    if (!g.current) return;
    const k = 1 - Math.exp(-dt * 3);
    g.current.rotation.y += (pointer.x * 0.3 - g.current.rotation.y) * k;
    g.current.rotation.x += (pointer.y * 0.15 - g.current.rotation.x) * k;
    onProject(
      [0, 1, 2].map((i) => {
        const a = anchors[i];
        if (!a) return { x: -999, y: -999 };
        a.getWorldPosition(v).project(camera);
        return { x: (v.x * 0.5 + 0.5) * size.width, y: (-v.y * 0.5 + 0.5) * size.height };
      }),
    );
  });
  return (
    <group ref={g} position={[0, 1.05, -0.5]} scale={0.85}>
      {kind === 'basit' ? <AIBrain color={color} anchors={anchors} /> : kind === 'ahram' ? <FilmReel color={color} anchors={anchors} /> : <GrowthEngine color={color} anchors={anchors} />}
    </group>
  );
}

export default function HeroScene({ kind, color, chips }: { kind: ProfileId; color: string; chips: HeroChip[] }) {
  const reduced = useReducedMotionPref();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const c = useMemo(() => new THREE.Color(color), [color]);
  const anchors = useMemo<THREE.Object3D[]>(() => [], [kind]); // eslint-disable-line react-hooks/exhaustive-deps
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
    };
  }, []);

  const onProject = (pts: { x: number; y: number }[]) => {
    const el = wrap.current;
    if (!el) return;
    chips.forEach((ch, i) => {
      const p = pts[i];
      const line = lines.current[i];
      const dot = dots.current[i];
      if (!p || !line || !dot) return;
      const lx = (ch.x / 100) * el.clientWidth + (ch.align === 'left' ? 10 : -10);
      const ly = (ch.y / 100) * el.clientHeight;
      line.setAttribute('x1', String(lx));
      line.setAttribute('y1', String(ly));
      line.setAttribute('x2', String(p.x));
      line.setAttribute('y2', String(p.y));
      dot.setAttribute('cx', String(p.x));
      dot.setAttribute('cy', String(p.y));
    });
  };

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0">
      <Canvas
        frameloop={visible && !reduced ? 'always' : 'demand'}
        camera={{ fov: 40, position: [0, 0.4, 9] }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.8} />
        <pointLight position={[-3, 2, 3]} color={c} intensity={20} distance={12} />
        <Rig kind={kind} color={c} anchors={anchors} onProject={onProject} />
      </Canvas>
      {/* leader lines + chips (tablet and desktop) */}
      <div className="absolute inset-0 hidden md:block">
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          {chips.map((ch, i) => (
            <g key={ch.text}>
              <line ref={(el) => (lines.current[i] = el)} stroke={color} strokeWidth={1} strokeOpacity={0.75} strokeDasharray="3 4" />
              <circle ref={(el) => (dots.current[i] = el)} r={4} fill="none" stroke={color} strokeWidth={1.5} />
            </g>
          ))}
        </svg>
        {chips.map((ch) => (
          <div
            key={ch.text}
            className="glass absolute rounded-xl px-3.5 py-2.5 shadow-2xl"
            style={{ left: `${ch.x}%`, top: `${ch.y}%`, transform: `translate(${ch.align === 'left' ? '0' : '-100%'}, -50%)` }}
          >
            <p className="whitespace-nowrap text-sm font-semibold text-bone">{ch.text}</p>
            <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color }}>
              {ch.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
