export const site = {
  name: 'Man Mohan Singh',
  role: 'Software Developer · Computer Science',
  location: 'Indore, India',
  university: 'Medi-Caps University',
  email: 'manmohansingh9562579@gmail.com',
  github: 'https://github.com/manmohansingh9562579-spec',
  linkedin: 'https://www.linkedin.com/in/manmohansinghx/',
  resume: '/resume/man-mohan-singh-resume.pdf',
};

export const skillGroups = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { title: 'Frontend', items: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend & Data', items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Supabase'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel'] },
];

export const focusAreas = [
  'Full-stack web development with Next.js and TypeScript',
  'Backend engineering: APIs, authentication and databases',
  'Data structures and algorithms in Java and Python',
  'AI-powered applications and real-world software',
];

export const education = [
  {
    school: 'Medi-Caps University',
    degree: 'B.Tech, Computer Science & Engineering',
    place: 'Indore, India',
    note: 'Undergraduate programme. Building fundamentals in DSA, Java, Python and backend engineering alongside projects.',
  },
];

export const activities = [
  { date: '2026', title: 'Code Canvas', desc: 'Participated in a university-level build and collaboration experience.' },
  { date: '2026', title: 'Smart India Hackathon', desc: 'Preparing around a problem statement focused on email phishing detection.' },
  { date: 'Ongoing', title: 'Independent projects', desc: 'Building full-stack applications and learning through practical implementation.' },
];

export const projects = [
  {
    number: '01', name: 'TeamForge', type: 'Collaboration platform',
    tagline: 'Find people. Build teams. Ship projects.',
    description: 'A collaboration platform focused on helping people discover collaborators, form teams and move ideas into working projects.',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Tailwind CSS'],
    live: 'https://share.google/q5WMgIww7zR12HmSy',
    github: site.github,
  },
  {
    number: '02', name: 'TrodoMiles', type: 'Travel web application',
    tagline: 'A clearer way to explore what is out there.',
    description: 'A travel-focused web application designed to help users explore destinations and access useful travel information.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Axios', 'OpenWeather API', 'Google Places API'],
    live: 'https://trodomiles.vercel.app',
    github: 'https://github.com/manmohansingh9562579-spec/Trodomiles',
  },
];
