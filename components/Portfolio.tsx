'use client';

import { useEffect, useState, type FormEvent, type MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Menu, X, MoveUpRight, Code2, Layers3, Sparkles, Send, ExternalLink, MapPin, GraduationCap, ChevronDown } from 'lucide-react';
import { site, projects } from '@/lib/site';

const nav = ['About', 'Skills', 'Projects', 'Journey', 'Contact'];
const skills = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { title: 'Frontend', items: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend & Data', items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Supabase'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel'] },
];
const words = ['thoughtful digital products.', 'reliable software.', 'useful experiences.'];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Portrait() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(sx, [-.5, .5], [-7, 7]);
  const rotateX = useTransform(sy, [-.5, .5], [6, -6]);
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - .5); my.set((e.clientY - r.top) / r.height - .5);
  };
  const reset = () => { mx.set(0); my.set(0); };
  return <div className="portrait-stage" onMouseMove={handleMove} onMouseLeave={reset}>
    <motion.div className="portrait-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="portrait-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 58, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="portrait-halo" animate={{ scale: [1, 1.035, 1], opacity: [.65, .9, .65] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="portrait-card" style={{ rotateX, rotateY }}>
      <Image src="/images/profile.jpg" alt="Portrait of Man Mohan Singh" fill priority sizes="(max-width: 800px) 90vw, 46vw" className="portrait-image" />
      <div className="portrait-index">MM / 01</div>
    </motion.div>
    <motion.div className="float-note note-top" animate={{ y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity }}>BUILDING WITH INTENTION</motion.div>
    <motion.div className="float-note note-bottom" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }}>INDIA · 22°43′ N</motion.div>
    <span className="orbit-point" />
  </div>;
}

function ProjectVisual({ index }: { index: number }) {
  return <div className={`project-visual visual-${index}`}>
    <div className="visual-top"><span>{index === 0 ? 'TEAMFORGE / WORKSPACE' : 'TRODOMILES / DISCOVER'}</span><span>✳</span></div>
    {index === 0 ? <div className="team-ui"><div className="team-side"><i /><i /><i /><i /></div><div className="team-main"><div className="ui-kicker">YOUR NEXT BUILD STARTS HERE</div><div className="ui-head">Find your<br/><em>people.</em></div><div className="ui-lines"><i/><i/><i/></div><div className="ui-pills"><b>Design</b><b>Engineering</b><b>Ideas</b></div></div><div className="team-stamp">TF.</div></div> : <div className="travel-ui"><div className="travel-copy"><span>THE WORLD, OPEN</span><b>Go where<br/><em>curiosity</em><br/>takes you.</b><small>Explore places · Weather · Local discovery</small></div><div className="travel-sun"/><div className="travel-land land-a"/><div className="travel-land land-b"/><div className="travel-pin">⌖</div></div>}
    <div className="visual-foot"><span>CONCEPT PREVIEW</span><span>0{index + 1} — 02</span></div>
  </div>;
}

export default function Portfolio() {
  const [typed, setTyped] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formMessage, setFormMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    let i = 0; let deleting = false; let pause = 0;
    const timer = window.setInterval(() => {
      const word = words[wordIndex];
      if (pause > 0) { pause--; return; }
      if (!deleting) { i++; setTyped(word.slice(0, i)); if (i >= word.length) { deleting = true; pause = 17; } }
      else { i--; setTyped(word.slice(0, i)); if (i <= 0) { deleting = false; setWordIndex(v => (v + 1) % words.length); } }
    }, deleting ? 38 : 72);
    return () => window.clearInterval(timer);
  }, [wordIndex]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
      const sections = nav.map(n => document.getElementById(n.toLowerCase())).filter(Boolean) as HTMLElement[];
      const current = sections.find(s => s.getBoundingClientRect().top <= 150 && s.getBoundingClientRect().bottom > 150);
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) { setFormMessage('Please enter your name, a valid email and a message of at least 10 characters.'); return; }
    setSending(true); setFormMessage('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ name: '', email: '', message: '' }); setFormMessage('Thanks, your message has been sent.'); return; }
      const data = await res.json().catch(() => ({}));
      if (res.status === 503 && site.email) {
        const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setFormMessage('Your email app is opening with the message prepared.');
      } else { setFormMessage(data.error || 'Unable to send your message. Please try again.'); }
    } catch { setFormMessage('Network error. Please try again or connect through GitHub or LinkedIn.'); }
    finally { setSending(false); }
  };

  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${scroll})` }} />
    <header className="nav-wrap"><a href="#home" className="wordmark">MAN MOHAN SINGH<span>✳</span></a><nav className="desktop-nav">{nav.map(n => <a key={n} className={active === n.toLowerCase() ? 'nav-active' : ''} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav><a className="nav-cta" href={site.resume || '#contact'}>{site.resume ? 'Resume' : 'Let’s talk'} <ArrowUpRight size={16}/></a><button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X/> : <Menu/>}</button></header>
    <AnimatePresence>{mobileOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{n}<ArrowUpRight size={15}/></a>)}</motion.nav>}</AnimatePresence>

    <main id="home">
      <section className="hero section-shell">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 }}><span className="status-dot"/> SOFTWARE DEVELOPER <i>/</i> COMPUTER SCIENCE</motion.div>
          <div className="hero-title-wrap"><motion.h1 initial={{ opacity: 0, y: 55, rotateX: -14 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1, ease: [.2,.8,.2,1] }}>Man Mohan<br/><em>Singh.</em></motion.h1><motion.span className="hero-side-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}>A WORK IN PROGRESS<br/>WITH INTENTION.</motion.span></div>
          <motion.p className="hero-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .8 }}>I’m a Computer Science student interested in building <span className="typed-line">{typed}<b className="caret">|</b></span></motion.p>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>Exploring software engineering, full-stack development and AI-powered applications.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}><a className="button-dark" href="#projects">Explore my work <ArrowDownRight size={18}/></a><a className="button-text" href="#contact">Get in touch <ArrowUpRight size={17}/></a></motion.div>
          <motion.div className="social-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a><a href={site.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={13}/></a></motion.div>
        </div>
        <motion.div className="hero-portrait" initial={{ opacity: 0, x: 55 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: .25 }}><Portrait/></motion.div>
        <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><ChevronDown size={15}/><span>01 — 05</span></div>
      </section>

      <section className="intro-strip"><span>IDEAS INTO INTERFACES</span><div className="strip-line"/><span>CODE INTO PRODUCTS</span><div className="strip-line"/><span>ALWAYS IN PROGRESS</span></section>

      <section className="section-shell about-section" id="about"><Reveal><div className="section-label">01 / ABOUT</div></Reveal><div className="about-grid"><Reveal><h2 className="section-heading">Curious by nature.<br/><em>Builder by practice.</em></h2></Reveal><Reveal delay={.12}><div className="about-text"><p>I’m pursuing Computer Science Engineering at <strong>Medi-Caps University</strong>, Indore. I enjoy understanding how products work beneath the surface and turning ideas into useful digital experiences.</p><p>My learning happens through building, experimenting, collaborating and steadily strengthening the fundamentals behind good software.</p><div className="about-facts"><div><span>EDUCATION</span><b>B.Tech · CSE</b></div><div><span>BASED IN</span><b>Indore, India</b></div><div><span>FOCUS</span><b>Software & Product</b></div></div></div></Reveal></div></section>

      <section className="skills-section" id="skills"><div className="section-shell"><Reveal><div className="section-label light-label">02 / TOOLKIT</div><div className="skills-heading-row"><h2 className="section-heading light-heading">Tools I use.<br/><em>Things I’m learning.</em></h2><p className="skills-side-note">A growing toolkit, built through hands-on practice and curiosity. No inflated percentages — just technologies I’m actively exploring.</p></div></Reveal><div className="skill-grid">{skills.map((group, i) => <Reveal key={group.title} delay={i * .08}><div className="skill-group"><div className="skill-number">0{i + 1}</div><h3>{group.title}</h3><div className="skill-list">{group.items.map(item => <span key={item}>{item}<ArrowUpRight size={12}/></span>)}</div></div></Reveal>)}</div></div></section>

      <section className="section-shell projects-section" id="projects"><Reveal><div className="section-label">03 / SELECTED WORK</div><div className="projects-head"><h2 className="section-heading">Made to be<br/><em>used, not just seen.</em></h2><p>Experiments and products that help me learn how thoughtful interfaces connect with real engineering.</p></div></Reveal>
        <div className="project-list">{projects.map((p, i) => <Reveal key={p.name} delay={.08}><article className={`project-row ${i % 2 ? 'reverse' : ''}`}><div className="project-art"><ProjectVisual index={i}/></div><div className="project-info"><div className="project-meta"><span>PROJECT {p.number}</span><span>{p.type}</span></div><h3>{p.name}<sup>↗</sup></h3><h4>{p.tagline}</h4><p>{p.description}</p><div className="tech-list">{p.stack.map(t => <span key={t}>{t}</span>)}</div><div className="project-links">{p.live ? <a href={p.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={15}/></a> : <span className="link-pending">Live link to be added</span>}{p.github ? <a href={p.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/></a> : <span className="link-pending">Repository to be added</span>}</div></div></article></Reveal>)}</div>
      </section>

      <section className="journey-section" id="journey"><div className="section-shell"><Reveal><div className="section-label">04 / THE JOURNEY</div><h2 className="section-heading">Learning in public.<br/><em>Growing through doing.</em></h2></Reveal><div className="journey-grid"><Reveal><div className="journey-card education-card"><GraduationCap size={24}/><span className="journey-kicker">EDUCATION</span><h3>B.Tech — Computer Science & Engineering</h3><p>Medi-Caps University · Indore</p><span className="journey-date">UNDERGRADUATE</span></div></Reveal><div className="journey-timeline">{[{date:'2026',title:'Code Canvas',desc:'Participated in a university-level build and collaboration experience.'},{date:'2026',title:'Smart India Hackathon',desc:'Preparing around a problem statement focused on email phishing detection.'},{date:'ONGOING',title:'Independent projects',desc:'Building full-stack applications and learning through practical implementation.'},{date:'ONGOING',title:'Technical foundations',desc:'Strengthening DSA, Java, Python, backend engineering and product thinking.'}].map((x,i)=><Reveal key={x.title} delay={i*.07}><div className="timeline-item"><span>{x.date}</span><div><h3>{x.title}</h3><p>{x.desc}</p></div></div></Reveal>)}</div></div></div></section>

      <section className="explore-section"><div className="section-shell explore-inner"><Reveal><div className="section-label light-label">IN THE WORKSHOP</div><h2 className="section-heading light-heading">Currently<br/><em>exploring.</em></h2></Reveal><Reveal delay={.1}><div className="explore-tags">{['Data Structures & Algorithms','Java + Python','Full-Stack Engineering','Backend Development','AI-powered applications','Real-world software'].map((x,i)=><span key={x}><small>0{i+1}</small>{x}<ArrowUpRight size={14}/></span>)}</div></Reveal></div></section>

      <section className="contact-section section-shell" id="contact"><Reveal><div className="section-label">05 / CONTACT</div><div className="contact-title"><h2>Have an idea?<br/><em>Let’s make it real.</em></h2><p>Interested in collaborating, discussing technology or building something useful? I’d be glad to connect.</p></div></Reveal><div className="contact-grid"><Reveal><div className="contact-links"><a href={site.linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>Connect professionally</b><ArrowUpRight/></a><a href={site.github} target="_blank" rel="noreferrer"><span>GITHUB</span><b>Explore my code</b><ArrowUpRight/></a><div className="contact-location"><MapPin size={17}/><span>Indore, India</span></div></div></Reveal><Reveal delay={.12}><form className="contact-form" onSubmit={submit}><label>Your name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" required/></label><label>Email address<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required/></label><label>What’s on your mind?<textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me a little about it..." rows={3} required/></label><button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <Send size={15}/></button>{formMessage && <p className="form-message" role="status">{formMessage}</p>}</form></Reveal></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#home" className="wordmark">MAN MOHAN SINGH<span>✳</span></a><span>MADE WITH CURIOSITY · {new Date().getFullYear()}</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MAN MOHAN SINGH</span><span>DESIGNED TO KEEP MOVING.</span><div><a href={site.github}>GITHUB</a><a href={site.linkedin}>LINKEDIN</a></div></div></footer>
  </>;
}
