'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type Kind = 'kw' | 'key' | 'str' | 'fn' | 'cm' | 'p';
type Seg = [Kind, string];

// Every value below is taken from the rest of the site. Nothing is invented.
const lines: Seg[][] = [
  [['kw', 'const '], ['fn', 'manMohan'], ['p', ' = {']],
  [['p', '  '], ['key', 'role'], ['p', ': '], ['str', '"Software Engineer"'], ['p', ',']],
  [['p', '  '], ['key', 'location'], ['p', ': '], ['str', '"Indore, India"'], ['p', ',']],
  [['p', '  '], ['key', 'university'], ['p', ': '], ['str', '"Medi-Caps University"'], ['p', ',']],
  [['p', '  '], ['key', 'stack'], ['p', ': ['], ['str', '"Next.js"'], ['p', ', '], ['str', '"TypeScript"'], ['p', ', '], ['str', '"MongoDB"'], ['p', '],']],
  [['p', '  '], ['key', 'projects'], ['p', ': ['], ['str', '"TeamForge"'], ['p', ', '], ['str', '"TrodoMiles"'], ['p', '],']],
  [['p', '  '], ['key', 'learning'], ['p', ': ['], ['str', '"DSA in Java"'], ['p', ', '], ['str', '"Backend"'], ['p', ', '], ['str', '"Testing"'], ['p', '],']],
  [['p', '  '], ['key', 'lookingFor'], ['p', ': '], ['str', '"SDE roles"'], ['p', ',']],
  [['p', '};']],
  [['p', '']],
  [['fn', 'manMohan'], ['p', '.'], ['fn', 'build'], ['p', '(); '], ['cm', '// ship real things, keep the claims honest']],
];

const colour: Record<Kind, string> = { kw: 'text-accent2', key: 'text-accent', str: 'text-emerald-500 dark:text-emerald-400', fn: 'text-ink', cm: 'text-muted italic', p: 'text-muted' };
const total = lines.reduce((a, l) => a + l.reduce((b, [, s]) => b + s.length, 0), 0);

export default function CodeWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(total); return; }
    const id = setInterval(() => setN((v) => { if (v >= total) { clearInterval(id); return v; } return v + 2; }), 22);
    return () => clearInterval(id);
  }, [inView]);

  const rendered = useMemo(() => {
    let left = n;
    return lines.map((segs) => segs.map(([k, s]) => { const part = s.slice(0, Math.max(0, left)); left -= s.length; return [k, part] as Seg; }));
  }, [n]);

  const typing = inView && n < total;
  const lastLine = Math.max(0, rendered.findIndex((l) => l.every(([, s]) => s === '')) - 1);

  return (
    <div ref={ref} className="card !p-0 overflow-hidden font-mono text-[12.5px] leading-6 sm:text-sm" role="img" aria-label="Code snippet summarising Man Mohan Singh: Software Engineer in Indore, studying at Medi-Caps University, building with Next.js, TypeScript and MongoDB.">
      <div className="flex items-center gap-2 border-b border-line bg-bg/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-amber-400/80" /><span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs text-muted">manMohan.ts</span>
        <span className="ml-auto text-[10px] tracking-widest text-muted">{typing ? 'TYPING…' : 'READY'}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 sm:px-6" aria-hidden>
        {rendered.map((segs, li) => (
          <div key={li} className="flex min-h-6">
            <span className="mr-4 w-5 shrink-0 select-none text-right text-muted/50">{li + 1}</span>
            <code className="whitespace-pre">
              {segs.map(([k, s], si) => <span key={si} className={colour[k]}>{s}</span>)}
              {typing && li === lastLine && <span className="caret" />}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
}
