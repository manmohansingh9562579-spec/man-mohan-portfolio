import Reveal from './Reveal';
import { activities } from '@/lib/site';

export default function Activities() {
  return (
    <section id="activities" className="section">
      <Reveal><h2 className="section-title">Activities &amp; learning</h2></Reveal>
      <ol className="relative mt-10 space-y-8 border-l border-line pl-8">
        {activities.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <li className="relative">
              <span className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-bg" aria-hidden />
              <p className="font-mono text-xs text-muted">{a.date}</p>
              <h3 className="mt-1 text-lg font-semibold">{a.title}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{a.desc}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
