'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Gentle cursor-following tilt. Eased in a requestAnimationFrame loop so it glides instead of jittering.
// Off on touch devices and for reduced motion.
export default function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, on: false });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const enabled = () => window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  const tick = () => {
    const el = ref.current; if (!el) return;
    const t = target.current; const c = cur.current;
    c.x += (t.x - c.x) * 0.12; c.y += (t.y - c.y) * 0.12;
    el.style.transform = `perspective(1000px) rotateX(${c.y.toFixed(2)}deg) rotateY(${c.x.toFixed(2)}deg)`;
    if (t.on || Math.abs(c.x) > 0.02 || Math.abs(c.y) > 0.02) raf.current = requestAnimationFrame(tick);
    else { el.style.transform = ''; raf.current = 0; }
  };
  const run = () => { if (!raf.current) raf.current = requestAnimationFrame(tick); };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || e.pointerType !== 'mouse' || !enabled()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; const py = (e.clientY - r.top) / r.height;
    target.current = { x: (px - 0.5) * 6, y: (0.5 - py) * 4.5, on: true };
    el.style.setProperty('--mx', `${px * 100}%`); el.style.setProperty('--my', `${py * 100}%`);
    run();
  };
  const leave = () => { target.current = { x: 0, y: 0, on: false }; run(); };

  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt ${className}`}>{children}</div>;
}
