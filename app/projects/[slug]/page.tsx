import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import ProjectVisual from '@/components/ProjectVisual';
import { projects } from '@/lib/data';
import { siteUrl } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.category}`,
    description: p.summary,
    alternates: { canonical: `${siteUrl}/projects/${p.slug}` },
    openGraph: { title: `${p.name} by Man Mohan Singh`, description: p.summary, url: `${siteUrl}/projects/${p.slug}`, type: 'article' },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const index = projects.findIndex((x) => x.slug === params.slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-32">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"><ArrowLeft size={15} /> All projects</Link>

        <Reveal>
          <p className="eyebrow mt-8">{p.category}</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">{p.name}</h1>
          <p className="mt-4 text-lg text-accent">{p.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Status: {p.status}</span>
            <a href={p.live} target="_blank" rel="noreferrer" className="btn-solid !px-5 !py-2.5">Live demo <ArrowUpRight size={15} /></a>
            <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline !px-5 !py-2.5">GitHub <Github size={15} /></a>
          </div>
        </Reveal>

        <div className="mt-12"><ProjectVisual slug={p.slug} priority /></div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal><h2 className="eyebrow">The problem</h2><p className="mt-3 leading-relaxed text-muted">{p.problem}</p></Reveal>
          <Reveal delay={0.08}><h2 className="eyebrow">The solution</h2><p className="mt-3 leading-relaxed text-muted">{p.solution}</p></Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="eyebrow">What it does</h2>
            <ul className="mt-4 space-y-3">
              {p.features.map((f) => <li key={f} className="flex gap-3 text-sm text-muted"><Check size={16} className="mt-0.5 shrink-0 text-accent" /> {f}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="eyebrow">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">{p.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <h2 className="eyebrow mt-10">My contribution</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.contribution}</p>
          </Reveal>
        </div>

        <Reveal>
          <Link href={`/projects/${next.slug}`} className="card card-hover mt-20 flex items-center justify-between">
            <span><span className="eyebrow block">Next project</span><span className="mt-1 block font-display text-2xl font-semibold">{next.name}</span></span>
            <ArrowRight className="text-accent" />
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
