import { ArrowUpRight, Github } from 'lucide-react';
import Reveal from './Reveal';
import { projects } from '@/lib/site';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <h2 className="section-title">Projects</h2>
        <p className="mt-3 max-w-2xl text-muted">Products I am building to learn how thoughtful interfaces connect with real engineering.</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <article className="card flex h-full flex-col">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-mono">PROJECT {p.number}</span>
                <span>{p.type}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{p.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="mt-auto flex gap-3 pt-6">
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-solid !px-5 !py-2.5">Live project <ArrowUpRight size={15} /></a>}
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline !px-5 !py-2.5">GitHub <Github size={15} /></a>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
