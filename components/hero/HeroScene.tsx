'use client';

import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';

type Mode = 'static' | 'lite' | 'full';

/** Lightweight CSS stand-in: shown on phones, with reduced motion, without WebGL, while loading, or if 3D fails. */
export function SceneFallback() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-accent/40 via-accent2/30 to-transparent blur-3xl" />
      <div className="float-y absolute inset-[24%] rotate-12 rounded-[36%] border border-ink/10 bg-gradient-to-br from-accent/50 to-accent2/50 shadow-2xl shadow-accent/30 backdrop-blur-xl" />
      <div className="absolute inset-[14%] rounded-full border border-accent/30" />
      <div className="absolute inset-[6%] rounded-full border border-dashed border-accent2/30" />
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
