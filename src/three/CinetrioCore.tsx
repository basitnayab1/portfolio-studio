import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotionPref } from '../hooks/useMedia';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * CINETRIO CORE — the 3D centrepiece of the studio home.
 * An energy sphere with moving circuit traces inside a glass shell, the three-arc Cinetrio "C" in front,
 * and three orbital rings — one per lead (red = AI & Dev, purple = Video & Motion, green = Business Growth)
 * with a bead travelling on each. Labels outside the canvas point at their ring through leader lines.
 * Everything is procedural; mouse tilts the whole object.
 */

const RED = new THREE.Color('#e5132b');
const PURPLE = new THREE.Color('#a855f7');
const GREEN = new THREE.Color('#10b981');
const INK = new THREE.Color('#0b0710');

export type CoreLabel = { id: string; ring: 0 | 1 | 2; title: string; sub: string; color: string; x: number; y: number; align: 'left' | 'right' };

/* ------------------------------- shaders ------------------------------- */

const VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vV; varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;

// Dark energy sphere: circuit traces in the three Cinetrio colours that pulse along, bright fresnel rim.
const CORE_FRAG = /* glsl */ `
  uniform float uTime; uniform vec3 uInk; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
  varying vec3 vN; varying vec3 vV; varying vec2 vUv;
  float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float trace(vec2 uv, float scale, float t) {
    vec2 g = uv * vec2(scale * 2., scale);
    vec2 id = floor(g); vec2 f = fract(g);
    float r = h(id);
    float lineH = smoothstep(.07, .0, abs(f.y - .5)) * step(.45, r);
    float lineV = smoothstep(.07, .0, abs(f.x - .5)) * step(r, .35);
    float node = smoothstep(.17, .08, length(f - .5)) * step(.8, r);
    float k = fract(g.x * .07 + g.y * .03 - t * .35 + r);
    float pulse = smoothstep(.0, .25, k) * smoothstep(.5, .25, k);
    return max(max(lineH, lineV) * (.3 + pulse * 1.6), node);
  }
  void main() {
    float fres = pow(1. - max(dot(vN, vV), 0.), 2.4);
    float c = trace(vUv, 16., uTime) + trace(vUv + .37, 30., uTime * 1.3) * .55;
    float a = fract(vUv.x + uTime * .02) * 3.;
    vec3 tint = a < 1. ? mix(uA, uB, a) : a < 2. ? mix(uB, uC, a - 1.) : mix(uC, uA, a - 2.);
    vec3 base = mix(uInk, tint * .22, .5 + .5 * (1. - fres));
    gl_FragColor = vec4(base + tint * c * 1.1 + mix(tint, vec3(1.), .35) * fres * 1.1, 1.);
  }`;

/* ------------------------------- shared input ------------------------------- */

const pointer = { x: 0, y: 0 };

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pm.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ------------------------------- parts ------------------------------- */

function EnergySphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: CORE_FRAG,
        uniforms: { uTime: { value: 0 }, uInk: { value: INK }, uA: { value: RED }, uB: { value: PURPLE }, uC: { value: GREEN } },
      }),
    [],
  );
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    mat.uniforms.uTime.value += dt;
    if (ref.current) ref.current.rotation.y += dt * 0.12;
  });
  return (
    <mesh ref={ref} material={mat}>
      <sphereGeometry args={[0.78, 96, 96]} />
    </mesh>
  );
}

function GlassShell() {
  return (
    <mesh>
      <sphereGeometry args={[1.18, 96, 96]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.3}
        roughness={0.03}
        ior={1.32}
        iridescence={0.5}
        envMapIntensity={0.35}
        iridescenceIOR={1.25}
        clearcoat={1}
        color="#ffffff"
      />
    </mesh>
  );
}

/** The three-arc "C" of the Cinetrio mark, floating in front of the sphere. */
function LogoC() {
  const ref = useRef<THREE.Group>(null);
  const arcs = useMemo(() => {
    const r = 0.5;
    const make = (a0: number, a1: number) => {
      const pts = Array.from({ length: 40 }, (_, i) => {
        const a = a0 + ((a1 - a0) * i) / 39;
        return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
      });
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.055, 12, false);
    };
    const d = Math.PI / 180;
    return [
      { geo: make(45 * d, 125 * d), color: PURPLE },
      { geo: make(130 * d, 230 * d), color: RED },
      { geo: make(235 * d, 315 * d), color: GREEN },
    ];
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.25;
  });
  return (
    <group ref={ref} position={[0, 0, 1.32]}>
      {arcs.map((a, i) => (
        <mesh key={i} geometry={a.geo}>
          <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={1.6} metalness={0.3} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

const RINGS = [
  { r: 1.7, color: RED, rot: [1.18, 0.15, 0.1] as const, speed: 0.55 },
  { r: 1.98, color: PURPLE, rot: [1.42, -0.55, 0.45] as const, speed: -0.42 },
  { r: 2.26, color: GREEN, rot: [0.95, 0.62, -0.35] as const, speed: 0.33 },
];
/** Fixed angle on each ring that its label points at. */
const ANCHOR_ANGLE = [2.35, 0.55, -0.75];

function Rings({ anchors }: { anchors: THREE.Object3D[] }) {
  const beads = useRef<(THREE.Mesh | null)[]>([]);
  const spin = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    RINGS.forEach((ring, i) => {
      const b = beads.current[i];
      if (b) {
        const a = t * ring.speed;
        b.position.set(Math.cos(a) * ring.r, Math.sin(a) * ring.r, 0);
      }
      const s = spin.current[i];
      if (s) s.rotation.z = t * 0.05 * (i % 2 ? -1 : 1);
    });
  });
  return (
    <>
      {RINGS.map((ring, i) => (
        <group key={i} rotation={[...ring.rot]}>
          <group ref={(g) => (spin.current[i] = g)}>
            <mesh>
              <torusGeometry args={[ring.r, 0.014, 12, 220]} />
              <meshStandardMaterial color="#d9d6e6" metalness={1} roughness={0.22} />
            </mesh>
            <mesh>
              <torusGeometry args={[ring.r, 0.006, 8, 220]} />
              <meshBasicMaterial color={ring.color} transparent opacity={0.9} />
            </mesh>
            {/* anchor the label line points at */}
            <object3D
              ref={(o) => {
                if (o) anchors[i] = o;
              }}
              position={[Math.cos(ANCHOR_ANGLE[i]) * ring.r, Math.sin(ANCHOR_ANGLE[i]) * ring.r, 0]}
            >
              <mesh>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </object3D>
          </group>
          <mesh ref={(m) => (beads.current[i] = m)}>
            <sphereGeometry args={[0.07, 20, 20]} />
            <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={2.2} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    let seed = 5;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const N = 700;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const palette = [RED, PURPLE, GREEN, new THREE.Color('#ffffff')];
    for (let i = 0; i < N; i++) {
      const r = 2.6 + rnd() * 2.6;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th)], i * 3);
      palette[i % 4].toArray(col, i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Whole object: intro scale-in, slow float, mouse tilt; projects label anchors to screen each frame. */
function Core({ shown, anchors, onProject }: { shown: boolean; anchors: THREE.Object3D[]; onProject: (pts: { x: number; y: number }[]) => void }) {
  const group = useRef<THREE.Group>(null);
  const appear = useRef(0);
  const v = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();
  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g) return;
    // pull the camera back on narrow (phone) screens so the outer ring stays inside the width
    camera.position.z = Math.max(11.6, 5.4 / ((size.width / size.height) * 0.689));
    appear.current += ((shown ? 1 : 0) - appear.current) * (1 - Math.exp(-dt * 2.2));
    const s = 0.4 + appear.current * 0.6;
    g.scale.setScalar(s);
    // sit a little below centre: the studio title lives above the core
    g.position.y = -0.3 + Math.sin(clock.elapsedTime * 0.8) * 0.06;
    g.rotation.y += (pointer.x * 0.45 - g.rotation.y) * (1 - Math.exp(-dt * 3));
    g.rotation.x += (pointer.y * 0.25 - g.rotation.x) * (1 - Math.exp(-dt * 3));
    onProject(
      anchors.map((a) => {
        if (!a) return { x: -999, y: -999 };
        a.getWorldPosition(v).project(camera);
        return { x: (v.x * 0.5 + 0.5) * size.width, y: (-v.y * 0.5 + 0.5) * size.height };
      }),
    );
  });
  return (
    <group ref={group}>
      <EnergySphere />
      <GlassShell />
      <LogoC />
      <Rings anchors={anchors} />
      <Particles />
    </group>
  );
}

/* ------------------------------- component ------------------------------- */

export default function CinetrioCore({ shown, labels, labelsShown }: { shown: boolean; labels: CoreLabel[]; labelsShown: boolean }) {
  const reduced = useReducedMotionPref(); // draw once, no animation loop
  const anchors = useMemo<THREE.Object3D[]>(() => [], []);
  const wrap = useRef<HTMLDivElement>(null);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const onProject = (pts: { x: number; y: number }[]) => {
    const el = wrap.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    labels.forEach((l, i) => {
      const p = pts[l.ring];
      const line = lines.current[i];
      const dot = dots.current[i];
      if (!p || !line || !dot) return;
      const lx = (l.x / 100) * w + (l.align === 'left' ? 8 : -8);
      const ly = (l.y / 100) * h;
      line.setAttribute('x1', String(lx));
      line.setAttribute('y1', String(ly));
      line.setAttribute('x2', String(p.x));
      line.setAttribute('y2', String(p.y));
      dot.setAttribute('cx', String(p.x));
      dot.setAttribute('cy', String(p.y));
    });
  };

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={reduced ? 'demand' : 'always'}
        camera={{ fov: 38, position: [0, 0, 11.6] }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Environment />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-4, 1, 3]} color={RED} intensity={30} distance={14} />
        <pointLight position={[4, -1, 3]} color={PURPLE} intensity={30} distance={14} />
        <pointLight position={[0, -3, 4]} color={GREEN} intensity={18} distance={12} />
        <Core shown={shown} anchors={anchors} onProject={onProject} />
      </Canvas>

      {/* leader lines + labels (desktop and tablet) */}
      <div className="pointer-events-none absolute inset-0 hidden transition-opacity duration-700 md:block" style={{ opacity: labelsShown ? 1 : 0 }}>
        <svg className="absolute inset-0 h-full w-full">
          {labels.map((l, i) => (
            <g key={l.id}>
              <line ref={(el) => (lines.current[i] = el)} stroke={l.color} strokeWidth={1} strokeOpacity={0.7} strokeDasharray="3 4" />
              <circle ref={(el) => (dots.current[i] = el)} r={4} fill="none" stroke={l.color} strokeWidth={1.5} />
            </g>
          ))}
        </svg>
        {labels.map((l) => (
          <div
            key={l.id}
            className="absolute -translate-y-1/2"
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
              textAlign: l.align === 'left' ? 'right' : 'left',
              transform: `translate(${l.align === 'left' ? '-100%' : '0'}, -50%)`,
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: l.color }}>
              {l.sub}
            </p>
            <p className="mt-1 font-display text-2xl leading-none tracking-wide text-bone lg:text-3xl">{l.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
