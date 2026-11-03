'use client';

import { useRef, type ReactNode } from 'react';

// Cursor-following 3D tilt with a soft light spot. Disabled on touch and for reduced motion.
export default function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el || !ok()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateZ(0)`;
    el.style.setProperty('--mx', `${px * 100}%`); el.style.setProperty('--my', `${py * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };

  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt ${className}`}>{children}</div>;
}
