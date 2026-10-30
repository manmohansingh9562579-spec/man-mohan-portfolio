export const site = {
  name: 'Man Mohan Singh',
  role: 'Software Developer · Computer Science',
  location: 'Indore, India',
  university: 'Medi-Caps University',
  email: '', // Add your public contact email here.
  github: 'https://github.com/manmohansingh9562579-spec',
  linkedin: 'https://www.linkedin.com/in/manmohansinghx/',
  resume: '', // Add /resume/man-mohan-singh.pdf when your PDF is ready.
};

export const projects = [
  {
    number: '01', name: 'TeamForge', type: 'COLLABORATION PLATFORM',
    tagline: 'Find people. Build teams. Ship projects.',
    description: 'A collaboration platform focused on helping people discover collaborators, form teams and move ideas into working projects.',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Tailwind CSS'],
    live: 'https://share.google/q5WMgIww7zR12HmSy',
    github: site.github,
    note: 'Project overview and feature set are presented from the information supplied. Add a dedicated repository URL when available.'
  },
  {
    number: '02', name: 'TrodoMiles', type: 'TRAVEL WEB APPLICATION',
    tagline: 'A clearer way to explore what is out there.',
    description: 'A travel-focused web application designed to help users explore destinations and access useful travel information.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Axios', 'OpenWeather API', 'Google Places API'],
    live: 'https://trodomiles.vercel.app', github: 'https://github.com/manmohansingh9562579-spec/Trodomiles', note: 'Add the verified live demo and repository URLs before publishing.'
  }
];
