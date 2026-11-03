import { techStack } from '@/lib/data';

// Infinite scrolling strip of technologies from the real tech-stack list.
export default function Marquee() {
  const items = techStack.map((t) => t.name);
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[...items, ...items].map((n, i) => <span key={i} className="marquee-item">{n}<i /></span>)}
      </div>
    </div>
  );
}
