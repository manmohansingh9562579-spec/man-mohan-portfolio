'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, GitCommit, Github } from 'lucide-react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { fallbackRepos } from '@/lib/data';
import { site } from '@/lib/site';

type Repo = { name: string; description: string | null; language: string | null; url: string };
type Data = { repos: Repo[]; languages: Record<string, number>; events: { repo: string; commits: number; date: string }[] };

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function GitHubSection() {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('unavailable'))))
      .then((d) => { if (!cancelled) { setData(d); setState('ok'); } })
      .catch(() => { if (!cancelled) setState('error'); });
    return () => { cancelled = true; };
  }, []);

  const repos: Repo[] = state === 'ok' && data ? data.repos : fallbackRepos;
  const langs = state === 'ok' && data ? Object.entries(data.languages).sort((a, b) => b[1] - a[1]) : [];

  return (
    <section id="github" className="section">
      <SectionTitle eyebrow="07 / GitHub" title="Open on GitHub." subtitle="Repositories and recent activity pulled live from my public GitHub profile." />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Public repositories</h3>
          <div className="space-y-3">
            {state === 'loading' && [0, 1, 2].map((i) => <div key={i} className="card h-24 animate-pulse" aria-hidden />)}
            {state !== 'loading' && repos.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noreferrer" className="card card-hover flex items-start justify-between gap-4 !p-5">
                <span>
                  <span className="flex items-center gap-2 font-display text-lg font-semibold"><Github size={16} className="text-accent" /> {r.name}</span>
                  <span className="mt-1 block text-sm text-muted">{r.description ?? 'No description yet.'}</span>
                  {r.language && <span className="chip mt-3">{r.language}</span>}
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-muted" />
              </a>
            ))}
          </div>
          {state === 'error' && <p className="mt-4 text-xs text-muted">Live GitHub data is unavailable right now, so these are my main repositories. <a className="text-accent underline" href={site.github} target="_blank" rel="noreferrer">See the full profile</a>.</p>}
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Recent activity</h3>
          <div className="card">
            {state === 'ok' && data && data.events.length > 0 ? (
              <ul className="space-y-4">
                {data.events.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <GitCommit size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span><span className="font-medium">{e.commits} commit{e.commits === 1 ? '' : 's'}</span> pushed to <span className="font-medium">{e.repo}</span><span className="block text-xs text-muted">{fmt(e.date)}</span></span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">{state === 'loading' ? 'Loading activity…' : 'Recent public activity is not available right now.'}</p>
            )}
          </div>

          {langs.length > 0 && (
            <>
              <h3 className="mb-3 mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Languages across repositories</h3>
              <div className="flex flex-wrap gap-2">{langs.map(([l, n]) => <span key={l} className="chip">{l} · {n}</span>)}</div>
            </>
          )}

          <a href={site.github} target="_blank" rel="noreferrer" className="btn-outline mt-8">View contribution graph on GitHub <ArrowUpRight size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}
