'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** A soft ring that follows the mouse. Only mounted on devices with a fine pointer and no reduced-motion preference. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });

  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(ok);
    if (!ok) return;
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHot(Boolean((e.target as Element | null)?.closest?.('a, button, [data-cursor]')));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] rounded-full border border-accent mix-blend-normal"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hot ? 46 : 18, height: hot ? 46 : 18, backgroundColor: hot ? 'rgb(var(--accent) / 0.15)' : 'rgb(var(--accent) / 0)' }}
      transition={{ duration: 0.2 }}
    />
  );
}
