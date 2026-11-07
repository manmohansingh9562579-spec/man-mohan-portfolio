import Image from 'next/image';

export default function ProjectVisual({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative aspect-[2/1] overflow-hidden rounded-2xl border border-line bg-surface ${className}`}>
      <Image src={`/projects/${slug}.webp`} alt={`${slug === 'teamforge' ? 'TeamForge' : 'TrodoMiles'} home page screenshot`} fill sizes="(max-width: 768px) 100vw, 70vw" priority={priority} className="object-cover object-top" />
      <span className="absolute bottom-3 left-4 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] tracking-widest text-muted">LIVE SCREENSHOT</span>
    </div>
  );
}
