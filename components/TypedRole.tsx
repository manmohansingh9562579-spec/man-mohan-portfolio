'use client';

import { useEffect, useState } from 'react';

const roles = ['Software Engineer', 'Full-Stack Developer', 'Learning DSA in Java', 'Building in public'];

// Types and deletes a code-style line: const role = "…";  Shows the first role statically for reduced motion.
export default function TypedRole() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  useEffect(() => {
    if (still) return;
    const word = roles[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && n < word.length) t = setTimeout(() => setN(n + 1), 70);
    else if (!del) t = setTimeout(() => setDel(true), 1500);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 35);
    else { setDel(false); setI((i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [n, del, i, still]);

  const text = still ? roles[0] : roles[i].slice(0, n);
  return (
    <p className="mt-6 inline-flex max-w-full items-center overflow-hidden rounded-lg border border-line bg-surface/70 px-4 py-2 font-mono text-sm backdrop-blur" aria-label={`Role: ${roles[0]}`}>
      <span className="text-accent2">const</span>&nbsp;<span className="text-ink">role</span>&nbsp;<span className="text-muted">=</span>&nbsp;
      <span className="text-accent">&quot;{text}</span><span className="caret" aria-hidden />
      <span className="text-accent">&quot;</span><span className="text-muted">;</span>
    </p>
  );
}
