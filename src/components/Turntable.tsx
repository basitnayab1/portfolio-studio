import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { Turntable as TurntableData } from '../data/portfolio';

/** URL of one turntable frame (frames are named 00.webp, 01.webp, …). */
export const turntableFrame = (t: TurntableData, i: number) => `${t.base}${String(i).padStart(2, '0')}.webp`;

/** Pixels of horizontal drag per frame step. */
const PX_PER_FRAME = 12;

/**
 * 360° model built from a transparent image sequence.
 * It rests on the front-facing frame and only turns when the visitor drags it
 * (mouse, touch or arrow keys); a flick keeps it spinning briefly, then it stops wherever it lands.
 */
export default function Turntable({ data, alt, className = '' }: { data: TurntableData; alt: string; className?: string }) {
  const { count } = data;
  const [frame, setFrame] = useState(0);
  const pos = useRef(0); // fractional frame position
  const drag = useRef<{ x: number; start: number; lastX: number; lastT: number; v: number } | null>(null);
  const raf = useRef(0);

  // Decoded frames, drawn to a canvas: swapping frames is then instant and never blanks out.
  const images = useRef<HTMLImageElement[]>([]);
  const loaded = useRef<boolean[]>([]);
  const canvas = useRef<HTMLCanvasElement>(null);
  const started = useRef(false);

  const loadFrame = useCallback(
    (i: number) => {
      const img = new Image();
      img.src = turntableFrame(data, i);
      images.current[i] = img;
      return img
        .decode()
        .then(() => {
          loaded.current[i] = true;
        })
        .catch(() => undefined);
    },
    [data],
  );

  const preload = useCallback(() => {
    if (started.current) return;
    started.current = true;
    for (let i = 1; i < count; i++) loadFrame(i);
  }, [count, loadFrame]);

  // draw the current frame
  useEffect(() => {
    const c = canvas.current;
    const img = images.current[frame];
    if (!c || !img || !loaded.current[frame]) return;
    if (c.width !== img.naturalWidth) {
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
    }
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0);
  }, [frame]);

  // front frame first
  const [ready, setReady] = useState(false);
  useEffect(() => {
    loadFrame(0).then(() => {
      setReady(true);
      setFrame(0);
    });
  }, [loadFrame]);
  useEffect(() => {
    if (!ready) return;
    const c = canvas.current;
    const img = images.current[0];
    if (!c || !img) return;
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext('2d')?.drawImage(img, 0, 0);
  }, [ready]);

  const show = useCallback(
    (p: number) => {
      pos.current = p;
      const want = ((Math.round(p) % count) + count) % count;
      if (loaded.current[want]) {
        setFrame(want);
        return;
      }
      for (let d = 1; d < count; d++) {
        for (const j of [want - d, want + d]) {
          const k = ((j % count) + count) % count;
          if (loaded.current[k]) {
            setFrame(k);
            return;
          }
        }
      }
    },
    [count],
  );

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(preload);
    else window.setTimeout(preload, 1200);
  }, [preload]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(raf.current);
    preload();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, start: pos.current, lastX: e.clientX, lastT: performance.now(), v: 0 };
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.v = (e.clientX - d.lastX) / dt; // px per ms
    d.lastX = e.clientX;
    d.lastT = now;
    show(d.start + (e.clientX - d.x) / PX_PER_FRAME);
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || Math.abs(d.v) < 0.2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // gentle inertia after a flick
    let v = (d.v * 16) / PX_PER_FRAME / 2; // frames per ~frame
    const step = () => {
      v *= 0.88;
      if (Math.abs(v) < 0.05) return;
      show(pos.current + v);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    preload();
    if (e.key === 'ArrowRight') show(pos.current + 1);
    else if (e.key === 'ArrowLeft') show(pos.current - 1);
    else if (e.key === 'Home') show(0);
    else return;
    e.preventDefault();
  };

  return (
    <div
      role="img"
      aria-label={`${alt}. Drag or use the arrow keys to rotate.`}
      tabIndex={0}
      data-cursor="drag"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={onKey}
      onDoubleClick={() => show(0)}
      className={`cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing ${className}`}
    >
      {/* the static front frame shows instantly (and without JS); the canvas takes over once frames are decoded */}
      {!ready && (
        <img
          src={turntableFrame(data, 0)}
          alt=""
          draggable={false}
          fetchPriority="high"
          className="pointer-events-none h-full w-auto max-w-none object-contain object-bottom"
        />
      )}
      <canvas
        ref={canvas}
        width={720}
        height={594}
        className={`pointer-events-none h-full w-auto max-w-none ${ready ? '' : 'hidden'}`}
      />
    </div>
  );
}
