'use client';

import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';

type Mode = 'static' | 'lite' | 'full';

/** Lightweight CSS stand-in: shown on phones, with reduced motion, without WebGL, while loading, or if 3D fails. */
export function SceneFallback() {
  return (
    <div className="hero-network-fallback" aria-hidden>
      <svg viewBox="0 0 520 420" className="h-full w-full" fill="none">
        <path d="M75 110 180 60 280 120 415 80 455 215 350 300 240 235 125 320 75 110M180 60 240 235M280 120 350 300M75 110 240 235M415 80 240 235" className="hero-fallback-line" />
        {[ [75,110], [180,60], [280,120], [415,80], [455,215], [350,300], [240,235], [125,320] ].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index === 6 ? 8 : 5} className={index === 6 ? 'hero-fallback-node hero-fallback-node-core' : 'hero-fallback-node'} />)}
        <circle cx="75" cy="110" r="3" className="hero-fallback-packet" />
      </svg>
      <span className="hero-fallback-label">CONNECTED SYSTEMS / 08 NODES</span>
    </div>
  );
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* the fallback is rendered instead */ }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <SceneFallback /> });

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('static');
  const [active, setActive] = useState(true);

  // Pick the 3D quality: static on phones / reduced motion / no WebGL, lite on tablets, full on desktop.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const w = window.innerWidth;
    if (reduce || !hasWebGL() || w < 768) setMode('static');
    else setMode(w < 1100 ? 'lite' : 'full');
  }, []);

  // Pause rendering while the hero is off screen to save battery.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none h-full w-full" aria-hidden>
      {mode === 'static' ? <SceneFallback /> : (
        <Boundary fallback={<SceneFallback />}>
          <Scene quality={mode} active={active} />
        </Boundary>
      )}
    </div>
  );
}
