'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('splash') === '1'; } catch { /* storage unavailable */ }
    if (seen) { setShow(false); return; }
    const timer = window.setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem('splash', '1'); } catch { /* storage unavailable */ }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash fixed inset-0 z-[100] grid place-items-center bg-bg"
          exit={{ opacity: 0, y: -48 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="text-center">
            <div className="flex justify-center gap-1 text-6xl font-bold tracking-tight">
              {['M', 'M'].map((c, i) => (
                <motion.span key={i} initial={{ y: 40, opacity: 0, rotate: i ? 8 : -8 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ delay: 0.1 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>
              ))}
            </div>
            <motion.div className="mx-auto mt-4 h-0.5 bg-accent" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ delay: 0.5, duration: 0.7 }} />
            <motion.p className="mt-4 font-mono text-xs tracking-[0.3em] text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>MAN MOHAN SINGH</motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
