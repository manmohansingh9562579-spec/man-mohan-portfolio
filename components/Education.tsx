import { GraduationCap, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { education } from '@/lib/site';

export default function Education() {
  return (
    <section id="education" className="section">
      <Reveal><h2 className="section-title">Education</h2></Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {education.map((e) => (
          <Reveal key={e.school}>
            <div className="card flex gap-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><GraduationCap size={24} /></div>
              <div>
                <h3 className="text-lg font-semibold">{e.school}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{e.degree}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted"><MapPin size={13} /> {e.place}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{e.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
