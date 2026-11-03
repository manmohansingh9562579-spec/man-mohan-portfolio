// All portfolio content lives here. Every entry is based on the owner's repositories, their READMEs
// or details supplied by the owner. Nothing here is invented: where a technology has no published
// project yet, the card says so.

export type TechGroup = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools';

export type Tech = { name: string; group: TechGroup; blurb: string; project: string; detail: string };

export const techGroups: TechGroup[] = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools'];

const NONE = 'No published project yet';

export const techStack: Tech[] = [
  { name: 'Java', group: 'Languages', blurb: 'Object-oriented fundamentals and data structures & algorithms.', project: NONE, detail: 'My main language for DSA practice right now. It is part of my learning focus rather than a shipped project.' },
  { name: 'Python', group: 'Languages', blurb: 'Scripting, problem solving and exploring AI-powered applications.', project: NONE, detail: 'Part of my current learning focus, alongside Java and backend engineering.' },
  { name: 'JavaScript', group: 'Languages', blurb: 'The language underneath the web stack I work in.', project: 'TeamForge, TrodoMiles', detail: 'Used every day, mostly through TypeScript and the Next.js toolchain.' },
  { name: 'TypeScript', group: 'Languages', blurb: 'Typed JavaScript for safer, more maintainable code.', project: 'TeamForge, TrodoMiles', detail: 'Both published projects are written in TypeScript. TeamForge keeps shared types in a types/ folder and input schemas in validations/.' },
  { name: 'HTML', group: 'Frontend', blurb: 'Semantic, accessible markup.', project: 'All projects', detail: 'Semantic elements, labelled form fields and alt text. This portfolio follows the same rules.' },
  { name: 'CSS', group: 'Frontend', blurb: 'Responsive layouts and design tokens.', project: 'This portfolio', detail: 'Theme colours are CSS variables, so light and dark mode switch across the whole site without a flash.' },
  { name: 'React', group: 'Frontend', blurb: 'Component-based user interfaces.', project: 'TeamForge, TrodoMiles', detail: 'Reusable components and hooks for interactive interfaces.' },
  { name: 'Next.js', group: 'Frontend', blurb: 'Full-stack React framework.', project: 'TeamForge, TrodoMiles, this portfolio', detail: 'App Router, route handlers, middleware and static generation. TeamForge runs on Next.js 14.' },
  { name: 'Tailwind CSS', group: 'Frontend', blurb: 'Utility-first styling.', project: 'TeamForge, TrodoMiles, this portfolio', detail: 'Design tokens are mapped into the Tailwind config so every component shares one palette.' },
  { name: 'Node.js', group: 'Backend', blurb: 'JavaScript runtime behind server-side code.', project: 'TeamForge, this portfolio', detail: 'Server logic and API route handlers run on Node.js, such as this site\'s /api/contact and /api/github.' },
  { name: 'Express.js', group: 'Backend', blurb: 'Minimal Node web framework.', project: NONE, detail: 'Part of my backend learning path. No published project uses it yet.' },
  { name: 'REST APIs', group: 'Backend', blurb: 'Resource-based HTTP APIs.', project: 'This portfolio', detail: 'The contact endpoint validates input, rate-limits requests and returns meaningful status codes (400, 429, 502, 503).' },
  { name: 'MongoDB', group: 'Database', blurb: 'Document database.', project: 'TeamForge', detail: 'TeamForge stores its data in MongoDB Atlas through Mongoose models.' },
  { name: 'Firebase', group: 'Database', blurb: 'Backend-as-a-service platform.', project: NONE, detail: 'Explored while learning. Not used in a published project yet.' },
  { name: 'Supabase', group: 'Database', blurb: 'Open-source Postgres backend platform.', project: NONE, detail: 'Explored while learning. Not used in a published project yet.' },
  { name: 'Git', group: 'Tools', blurb: 'Version control.', project: 'All projects', detail: 'Branches and focused commits. This redesign lives on its own branch before it reaches main.' },
  { name: 'GitHub', group: 'Tools', blurb: 'Code hosting and collaboration.', project: 'All projects', detail: 'Hosts the repositories for TeamForge, TrodoMiles and this portfolio.' },
  { name: 'VS Code', group: 'Tools', blurb: 'Primary code editor.', project: 'All projects', detail: 'Daily editor for all of the above.' },
  { name: 'Figma', group: 'Tools', blurb: 'Interface planning.', project: 'Layout planning', detail: 'Used for planning interfaces and layouts before building them.' },
  { name: 'Vercel', group: 'Tools', blurb: 'Hosting and deployment.', project: 'TeamForge, TrodoMiles, this portfolio', detail: 'Deployments are triggered from GitHub pushes.' },
];

export type ProjectStatus = 'Live' | 'In progress';

export type Project = {
  slug: string;
  number: number;
  name: string;
  category: string;
  status: ProjectStatus;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  contribution: string;
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    slug: 'teamforge',
    number: 1,
    name: 'TeamForge',
    category: 'Collaboration platform',
    status: 'Live',
    tagline: 'Find people. Build teams. Ship projects.',
    summary: 'A team collaboration platform for hackathons and projects, with developer profiles, team discovery and a built-in task board.',
    problem: 'Developers, students and hackathon participants struggle to find the right teammates and then keep a team organised once it forms.',
    solution: 'TeamForge combines structured developer profiles with team and developer discovery. A deterministic 0 to 100 compatibility score, based on a weighted formula and not on AI, helps rank matches, and teams then manage the work on a shared board.',
    features: [
      'Structured developer profiles',
      'Team and developer discovery',
      'Deterministic 0 to 100 compatibility score (weighted formula, not AI)',
      'Join requests',
      'Kanban task board',
      'Notifications',
      'Daily and weekly coding challenges',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'MongoDB Atlas', 'Mongoose', 'Auth.js', 'Vitest'],
    contribution: 'Repository owner and developer. The repository has 25 commits on main and is organised into app, components, models, services, validations and lib layers.',
    github: 'https://github.com/manmohansingh9562579-spec/TeamForge',
    live: 'https://teamforge-amber.vercel.app',
  },
  {
    slug: 'trodomiles',
    number: 2,
    name: 'TrodoMiles',
    category: 'Travel discovery',
    status: 'Live',
    tagline: 'Explore India smarter.',
    summary: 'A travel discovery website for India with 153+ destinations, popular places, hidden gems and itineraries for the most researched destinations.',
    problem: 'Planning a trip in India usually means piecing together destinations, budgets and itineraries from many scattered sources.',
    solution: 'TrodoMiles puts destinations across states and union territories in one place. Visitors can search any city or state, browse popular destinations and hidden gems, and open budget breakdowns and day-by-day itineraries for the most researched destinations. Photos are loaded live from Wikipedia.',
    features: [
      '153+ destinations across states and union territories',
      'Popular destinations and hidden gems',
      'Search by city or state',
      'Budget breakdowns and itineraries for the most researched destinations',
      'Animated transitions and a responsive layout',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    contribution: 'Creator of the project, credited on the site. The repository has 7 commits on main.',
    github: 'https://github.com/manmohansingh9562579-spec/Trodomiles',
    live: 'https://trodomiles.vercel.app',
  },
];

export type TimelineItem = { date: string; title: string; kind: 'Education' | 'Hackathon' | 'Activity' | 'Project'; desc: string };

export const timeline: TimelineItem[] = [
  { date: 'Ongoing', title: 'B.Tech, Computer Science & Engineering', kind: 'Education', desc: 'Medi-Caps University, Indore. Building fundamentals in data structures, Java, Python and backend engineering alongside projects.' },
  { date: '2026', title: 'Smart India Hackathon', kind: 'Hackathon', desc: 'Preparing around a problem statement focused on email phishing detection.' },
  { date: '2026', title: 'Code Canvas', kind: 'Activity', desc: 'Participated in a university-level build and collaboration experience.' },
  { date: 'Ongoing', title: 'Independent full-stack projects', kind: 'Project', desc: 'Built and deployed TeamForge and TrodoMiles, and keep improving them.' },
];

export const milestones = [
  { title: 'TeamForge deployed', text: 'A full-stack collaboration platform with authentication, a database layer and tests, deployed on Vercel.', href: projects[0].github, label: 'View repository' },
  { title: 'TrodoMiles deployed', text: 'A travel discovery site covering 153+ destinations across India.', href: projects[1].live, label: 'Open live site' },
  { title: 'Code Canvas participant', text: 'Took part in a university-level build and collaboration experience in 2026.', href: '', label: '' },
  { title: 'Smart India Hackathon 2026', text: 'Preparing a solution around email phishing detection.', href: '', label: '' },
];

export type BuildStatus = 'Active' | 'Planned' | 'Completed';

export const building: { status: BuildStatus; title: string; text: string }[] = [
  { status: 'Active', title: 'TeamForge improvements', text: 'Refining the matching, team workflow and overall polish of the platform.' },
  { status: 'Active', title: 'DSA with Java', text: 'Regular problem solving to strengthen algorithms and data structures.' },
  { status: 'Active', title: 'Backend engineering', text: 'APIs, authentication, databases and testing practices.' },
  { status: 'Planned', title: 'Phishing detection prototype', text: 'A solution for the Smart India Hackathon problem statement on email phishing detection.' },
  { status: 'Completed', title: 'TrodoMiles launch', text: 'A live travel discovery site covering 153+ destinations.' },
  { status: 'Completed', title: 'Portfolio 2.0', text: 'This site: a 3D hero, dark and light themes, project pages and a working contact form.' },
];

export type ArchNode = { id: string; label: string; sub: string; x: number; y: number; desc: string };
export type Architecture = { id: string; title: string; caption: string; nodes: ArchNode[]; edges: [string, string][] };

export const architectures: Architecture[] = [
  {
    id: 'teamforge',
    title: 'TeamForge',
    caption: 'Based on the repository structure and README: app, middleware, validations, services, models and MongoDB Atlas.',
    nodes: [
      { id: 'ui', label: 'Frontend', sub: 'Next.js 14 · Tailwind', x: 20, y: 150, desc: 'Pages and components in app/ and components/, styled with Tailwind CSS.' },
      { id: 'mw', label: 'Middleware', sub: 'middleware.ts', x: 215, y: 60, desc: 'A middleware.ts at the project root runs before requests reach the routes.' },
      { id: 'auth', label: 'Authentication', sub: 'Auth.js', x: 215, y: 240, desc: 'Sign-in and sessions are handled with Auth.js.' },
      { id: 'api', label: 'API layer', sub: 'Route handlers', x: 410, y: 150, desc: 'Route handlers receive requests; input is checked against schemas in validations/.' },
      { id: 'svc', label: 'Services', sub: 'services/ · scoring', x: 605, y: 60, desc: 'Business logic lives in services/, including the weighted 0 to 100 compatibility score.' },
      { id: 'db', label: 'Database', sub: 'MongoDB Atlas', x: 605, y: 240, desc: 'Mongoose models in models/ persist data to MongoDB Atlas.' },
    ],
    edges: [['ui', 'mw'], ['ui', 'auth'], ['mw', 'api'], ['auth', 'api'], ['api', 'svc'], ['svc', 'db']],
  },
  {
    id: 'trodomiles',
    title: 'TrodoMiles',
    caption: 'Kept deliberately small: only the parts confirmed from the README and the live site.',
    nodes: [
      { id: 'ui', label: 'Frontend', sub: 'Next.js · Framer Motion', x: 40, y: 150, desc: 'The app router front end, with animated transitions and a responsive layout.' },
      { id: 'app', label: 'Next.js app', sub: 'Destinations · search', x: 330, y: 150, desc: 'Destination pages, popular places, hidden gems and search by city or state.' },
      { id: 'wiki', label: 'Wikipedia', sub: 'Live photos', x: 620, y: 150, desc: 'Destination photos are loaded live from Wikipedia, as stated on the site.' },
    ],
    edges: [['ui', 'app'], ['app', 'wiki']],
  },
];

export const fallbackRepos = [
  { name: 'TeamForge', description: 'Team collaboration platform for hackathons & projects', language: 'TypeScript', url: projects[0].github },
  { name: 'Trodomiles', description: 'Travel discovery website for India', language: 'TypeScript', url: projects[1].github },
  { name: 'man-mohan-portfolio', description: 'This portfolio', language: 'TypeScript', url: 'https://github.com/manmohansingh9562579-spec/man-mohan-portfolio' },
];
