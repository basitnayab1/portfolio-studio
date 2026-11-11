/**
 * Cinetrio Studios — Team Portfolio Data
 * Central source of truth for Cinetrio Studios and its 3 dedicated leads:
 * 1. Basit Nayab — Full Stack Developer & AI Specialist (AI Chatbots, AI Agents, LLM)
 * 2. Ahram Ali — Video Editor & Motion Graphic Designer (Video Editing, Motion Graphics, AI Content, Graphic Design)
 * 3. Muhammad Faraz — E-Commerce Specialist (TikTok Shop, eBay, Amazon)
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export type ProfileId = 'basit' | 'ahram' | 'faraz';
export type SectionId = 'about' | 'journey' | 'originals' | 'screenings' | 'picks' | 'skills' | 'moments' | 'story';

/** A video hosted on YouTube, shown in the Screenings section. 'short' = vertical 9:16. */
export type Screening = { id: string; title: string; runtime: string; format?: 'wide' | 'short' };
export type ScreeningShelf = { title: string; blurb: string; videos: Screening[] };

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  demo?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants' | 'agent' | 'video' | 'commerce';
};

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export type Certification = { issuer: string; name: string; link?: string };

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export interface MemberProfile {
  id: ProfileId;
  fullName: string;
  displayName: string;
  firstName: string;
  seriesTag: string;
  originalLabel: string;
  role: string;
  badge: string;
  glyph: string;
  color: string;
  tagline: string[];
  intro: string;
  location: string;
  email: string;
  videoSrc?: string;
  avatarImg?: string;
  links: {
    linkedin?: string;
    github?: string;
    youtube?: string;
    behance?: string;
  };
  resumePdf?: string;
  portrait: {
    src: string;
    srcSet: string;
    alt: string;
  };
  interests: string[];
  facts: { k: string; v: string; s: string }[];
  education: {
    school: string;
    place: string;
    degree: string;
    period: string;
    score: string;
  }[];
  experience: {
    company: string;
    role: string;
    place: string;
    period: string;
    points: string[];
  }[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
  skillCategories: SkillCategory[];
  skillEvidence: Record<string, string[]>;
  seasons: Season[];
  topPicks: TopPick[];
  introSlides: IntroSlide[];
  /** Video work rows; the section only appears when the profile order includes 'screenings'. */
  screenings?: ScreeningShelf[];
  order: SectionId[];
}

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const agency = {
  name: 'CINETRIO STUDIOS',
  brandName: 'CINETRIO',
  seriesTag: 'CINETRIO ORIGINAL',
  originalLabel: 'A CINETRIO ORIGINAL',
  tagline: ['Full-Stack & AI Systems', 'Video & Motion Design', 'E-Commerce Growth'],
  intro:
    'A specialized multi-disciplinary agency powered by three dedicated leads: Full Stack & Autonomous AI Engineering, Cinema-Grade Video & Motion Graphics, and Multi-Platform E-Commerce Growth across TikTok Shop, Amazon & eBay.',
  email: 'hello@cinetrio.com',
  services: [
    {
      title: 'Full Stack & AI Development',
      lead: 'Basit Nayab',
      desc: 'Autonomous AI Agents, Enterprise LLM Chatbots, Next.js / React Apps, and Scalable Backend Systems.',
      tags: ['AI Agents', 'LLM', 'Chatbots', 'Full-Stack', 'React', 'Node.js', 'Python'],
    },
    {
      title: 'Video, Motion & AI Content',
      lead: 'Ahram Ali',
      desc: 'Cinematic Video Editing, Motion Graphics, AI Video & Content Generation, and Graphic Design.',
      tags: ['Video Editing', 'Motion Graphics', 'AI Content', 'Graphic Design', 'After Effects', 'Premiere'],
    },
    {
      title: 'E-Commerce Growth & Scaling',
      lead: 'Muhammad Faraz',
      desc: 'End-to-End TikTok Shop, Amazon FBA/FBM, and eBay Store Launch, Sourcing, PPC, and Scaling.',
      tags: ['TikTok Shop', 'Amazon FBA', 'eBay', 'PPC Ads', 'Product Hunting', 'Scaling'],
    },
  ],
};

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  fullName: string;
  role: string;
  badge: string;
  glyph: string;
  blurb: string;
  color: string;
  avatarImg?: string;
  order: SectionId[];
}[] = [
  {
    id: 'basit',
    name: 'Basit Nayab',
    fullName: 'Basit Nayab',
    role: 'Full Stack Developer & AI Specialist',
    badge: 'AI & DEV',
    glyph: '</>',
    blurb: 'Full-Stack, AI Chatbots, AI Agents & LLMs',
    color: '#e5132b',
    avatarImg: '/assets/basit-cutout.webp',
    order: ['about', 'originals', 'skills', 'picks', 'journey', 'moments', 'story'],
  },
  {
    id: 'ahram',
    name: 'Ahram Ali',
    fullName: 'Ahram Ali',
    role: 'Video Editor & Motion Designer',
    badge: 'CREATIVE',
    glyph: '✦',
    blurb: 'Video Editing, Motion Graphics & AI Content',
    color: '#8b5cf6',
    avatarImg: '/assets/ahram-cutout-420.webp',
    order: ['originals', 'screenings', 'about', 'skills', 'picks', 'journey', 'moments', 'story'],
  },
  {
    id: 'faraz',
    name: 'Muhammad Faraz',
    fullName: 'Muhammad Faraz',
    role: 'E-Commerce Specialist & Growth Lead',
    badge: 'ECOMMERCE',
    glyph: '🛒',
    blurb: 'TikTok Shop, eBay & Amazon Scaling',
    color: '#10b981',
    avatarImg: '/assets/faraz-cutout-420.webp',
    order: ['picks', 'originals', 'about', 'skills', 'journey', 'moments', 'story'],
  },
];

export const memberProfiles: Record<ProfileId, MemberProfile> = {
  basit: {
    id: 'basit',
    fullName: 'Basit Nayab',
    displayName: 'Basit Nayab',
    firstName: 'BASIT NAYAB',
    seriesTag: 'AI & FULL-STACK LEAD',
    originalLabel: 'A CINETRIO ORIGINAL',
    role: 'Full Stack Developer & AI Specialist',
    badge: 'AI & DEV',
    glyph: '</>',
    color: '#e5132b',
    tagline: ['Full-Stack Developer', 'AI Chatbots', 'Autonomous AI Agents', 'LLMs'],
    intro:
      'Full Stack Developer & AI Engineer architecting autonomous AI agents, enterprise LLM chatbots, high-throughput microservices, and modern web applications with React, Node.js, Python, and scalable cloud architectures.',
    location: 'Remote / Global',
    email: 'basitnayab@gmail.com',
    videoSrc: '/assets/basit-360.mp4',
    avatarImg: '/assets/basit-cutout.webp',
    links: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    portrait: {
      src: '/assets/basit-cutout.webp',
      srcSet: '/assets/basit-cutout.webp 420w, /assets/basit-cutout.png 720w, /assets/abdul-basit.png 1100w',
      alt: '360° Visual Model of Basit Nayab',
    },
    interests: ['Autonomous AI Agents', 'LLM Fine-tuning & RAG', 'Microservices', 'System Design'],
    facts: [
      { k: 'Domain', v: 'Full-Stack & AI Systems', s: 'AI Chatbots, Autonomous Agents & LLMs' },
      { k: 'Core Stack', v: 'React · Node.js · Python', s: 'TypeScript · FastAPI · Docker' },
      { k: 'AI Focus', v: 'LangChain & RAG Pipelines', s: 'OpenAI, Gemini & Custom LLMs' },
      { k: 'Availability', v: 'Agency Client Projects', s: 'Full-Stack Architecture & AI Automation' },
    ],
    education: [
      {
        school: 'University of Engineering & Technology',
        place: 'Computer Science',
        degree: 'Bachelor of Science — Software Engineering & AI Systems',
        period: '2020 – 2024',
        score: 'First Class Honors',
      },
    ],
    experience: [
      {
        company: 'Cinetrio Studios',
        role: 'Full Stack & AI Lead',
        place: 'Global / Remote',
        period: '2024 – Present',
        points: [
          'Architected and deployed custom AI chatbots and autonomous agentic workflows integrating OpenAI, Gemini, and LangChain.',
          'Built scalable full-stack web applications using React, Next.js, Node.js, PostgreSQL, and Docker.',
          'Integrated secure RESTful APIs, payment systems, and vector databases with sub-100ms response latencies.',
        ],
      },
    ],
    projects: [
      {
        id: 'agentic-ai-orchestrator',
        title: 'Autonomous AI Agent System',
        year: '2026',
        genre: 'AI • Autonomous Agents • LLM',
        logline: 'Multi-agent orchestration platform executing complex multi-step reasoning, tool-calling, and live workflows.',
        stack: ['Python', 'LangChain', 'FastAPI', 'Vector DB', 'OpenAI'],
        build: [
          'Engineered an autonomous multi-agent system executing real-time web research, structured data extraction, and API actions without human intervention.',
          'Reduced complex business workflow time by 75% with self-correcting agent reflection loops.',
        ],
        features: [
          'Multi-agent task decomposition',
          'Autonomous tool-calling & execution',
          'Vector embeddings with semantic retrieval',
          'Real-time streaming agent outputs',
        ],
        metrics: [
          { value: '10+', label: 'agents orchestrated' },
          { value: '75%', label: 'workflow time saved' },
          { value: '99.4%', label: 'execution accuracy' },
          { value: '<1.2s', label: 'average decision latency' },
        ],
        github: 'https://github.com',
        palette: crimson,
        motif: 'agent',
      },
      {
        id: 'enterprise-llm-chatbot',
        title: 'Enterprise LLM Chatbot & RAG',
        year: '2026',
        genre: 'AI • NLP • RAG Systems',
        logline: 'Custom knowledge-base AI chatbot with strict document grounding and low-latency streaming responses.',
        stack: ['React', 'Node.js', 'Python', 'Pinecone', 'Gemini API'],
        build: [
          'Built enterprise-grade customer support chatbot processing 1,000+ customer inquiries daily with 94% zero-hallucination accuracy.',
          'Integrated hybrid search (BM25 + Dense Vectors) for deep semantic document understanding.',
        ],
        features: [
          'Document Q&A with RAG citation links',
          'Multi-turn conversational context memory',
          'Role-based permission gating for sensitive data',
          'Instant deployment widget for client websites',
        ],
        metrics: [
          { value: '1,000+', label: 'daily inquiries answered' },
          { value: '94%', label: 'accuracy' },
          { value: '60%', label: 'support ticket reduction' },
          { value: '24/7', label: 'automated uptime' },
        ],
        palette: amber,
        motif: 'shield',
      },
      {
        id: 'fullstack-saas-platform',
        title: 'Full-Stack SaaS Platform',
        year: '2026',
        genre: 'Full-Stack • Microservices • React',
        logline: 'Production-ready cloud SaaS platform featuring multi-tenant isolation, real-time analytics, and automated billing.',
        stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        build: [
          'Architected end-to-end full-stack web application supporting high-concurrency client teams.',
          'Implemented Docker containerization and CI/CD pipelines enabling zero-downtime rolling deployments.',
        ],
        features: [
          'JWT authentication with role-based access control',
          'Real-time web sockets and notifications',
          'Stripe automated payment subscription flow',
          'Docker Compose one-command orchestration',
        ],
        metrics: [
          { value: '500+', label: 'active accounts' },
          { value: '99.9%', label: 'uptime' },
          { value: '40%', label: 'faster response time' },
          { value: 'Zero', label: 'security breaches' },
        ],
        github: 'https://github.com',
        palette: ocean,
        motif: 'tenants',
      },
    ],
    achievements: [
      {
        id: 'ai-leader',
        title: 'AI Systems Architect',
        org: 'Cinetrio Studios',
        detail: 'Architected multiple autonomous AI agents and enterprise chatbots for high-growth clients.',
        laurel: 'Tech Lead',
      },
      {
        id: 'production-bots',
        title: '10+ AI Bots Deployed',
        org: 'Production Systems',
        detail: 'Shipped production-grade conversational AI platforms with semantic vector search.',
        laurel: 'AI Production',
      },
      {
        id: 'fullstack-pro',
        title: 'Full-Stack Master',
        org: 'Modern Web Engineering',
        detail: 'End-to-end expertise across React, Next.js, Node.js, Python, and PostgreSQL.',
        laurel: 'Full-Stack',
      },
      {
        id: 'cloud-devops',
        title: 'High-Uptime Architect',
        org: 'Cloud & Infrastructure',
        detail: 'Configured containerized Docker microservices maintaining 99.9% uptime SLA.',
        laurel: 'Infrastructure',
      },
    ],
    certifications: [
      { issuer: 'OpenAI / DeepLearning.AI', name: 'Building Systems with the ChatGPT API' },
      { issuer: 'LangChain', name: 'LangChain & Vector Database Engineering' },
      { issuer: 'Meta', name: 'Meta Full-Stack Developer Professional' },
      { issuer: 'Docker', name: 'Docker Containerization & CI/CD Pipelines' },
    ],
    skillCategories: [
      {
        id: 'ai-llm',
        title: 'AI & LLMs',
        subtitle: 'Intelligent automation & conversational agents',
        skills: [
          { name: 'AI Chatbots', mono: 'Cb', note: 'Primary' },
          { name: 'AI Agents', mono: 'Ag', note: 'Autonomous' },
          { name: 'LLM Systems', mono: 'Lm' },
          { name: 'LangChain', mono: 'Lc' },
          { name: 'RAG Pipelines', mono: 'Rg' },
          { name: 'OpenAI / Gemini', mono: 'Ai' },
          { name: 'Prompt Engineering', mono: 'Pe' },
          { name: 'Vector DBs', mono: 'Vb' },
        ],
      },
      {
        id: 'frontend',
        title: 'Frontend',
        subtitle: 'Modern interfaces & responsive applications',
        skills: [
          { name: 'React', mono: 'Re', note: 'Primary' },
          { name: 'Next.js', mono: 'Nx' },
          { name: 'TypeScript', mono: 'Ts' },
          { name: 'Tailwind CSS', mono: 'Tw' },
          { name: 'HTML5 / CSS3', mono: 'Ht' },
          { name: 'JavaScript ES6+', mono: 'Js' },
        ],
      },
      {
        id: 'backend',
        title: 'Backend & APIs',
        subtitle: 'Robust servers, microservices & logic',
        skills: [
          { name: 'Node.js', mono: 'No', note: 'Primary' },
          { name: 'Express.js', mono: 'Ex' },
          { name: 'Python', mono: 'Py' },
          { name: 'FastAPI', mono: 'Fa' },
          { name: 'REST APIs', mono: 'Ap' },
          { name: 'Microservices', mono: 'Ms' },
        ],
      },
      {
        id: 'infra-db',
        title: 'Databases & DevOps',
        subtitle: 'Data storage, containers & deployment',
        skills: [
          { name: 'PostgreSQL', mono: 'Pg' },
          { name: 'MongoDB', mono: 'Mg' },
          { name: 'Redis', mono: 'Rd' },
          { name: 'Docker', mono: 'Dk' },
          { name: 'Docker Compose', mono: 'Dc' },
          { name: 'Git & GitHub', mono: 'Gt' },
        ],
      },
    ],
    skillEvidence: {
      'AI Chatbots': ['Enterprise LLM Chatbot & RAG', 'Customer Support Automation'],
      'AI Agents': ['Autonomous AI Agent System', 'Tool-calling Workflows'],
      'LLM Systems': ['LangChain & Vector Database Engineering', 'OpenAI / Gemini integration'],
      React: ['Full-Stack SaaS Platform', 'Next.js Web Applications'],
      'Node.js': ['Full-Stack SaaS Platform', 'REST Microservices'],
      Python: ['Autonomous AI Agent System', 'FastAPI Backend Engine'],
      Docker: ['Docker Containerization & CI/CD Pipelines', 'Full-Stack SaaS Platform'],
      PostgreSQL: ['Full-Stack SaaS Platform', 'Relational Database Schema Design'],
    },
    seasons: [
      {
        number: 1,
        title: 'The Foundation',
        period: '2020 – 2022',
        synopsis: 'Mastering modern full-stack web engineering, algorithms, and distributed systems.',
        episodes: [
          {
            code: 'S01 E01',
            title: 'Full-Stack Foundations',
            description: 'Intensive engineering across JavaScript, React, Node.js, and relational databases.',
            tags: ['React', 'Node.js', 'Databases'],
            runtime: 'Foundational Years',
            palette: amber,
          },
        ],
      },
      {
        number: 2,
        title: 'The AI Revolution',
        period: '2023 – 2024',
        synopsis: 'Specializing in Large Language Models, prompt engineering, and conversational RAG architectures.',
        episodes: [
          {
            code: 'S02 E01',
            title: 'Enter: Generative AI',
            description: 'Building custom chatbots and RAG semantic search pipelines using vector databases.',
            tags: ['LLM', 'RAG', 'Vector DB', 'Python'],
            runtime: 'AI Era',
            palette: violet,
          },
        ],
      },
      {
        number: 3,
        title: 'Autonomous Agents & Agency Scale',
        period: '2025 – Present',
        synopsis: 'Leading full-stack engineering and multi-agent AI ecosystems for agency clients worldwide.',
        episodes: [
          {
            code: 'S03 E01',
            title: 'The Autonomous Agent',
            description: 'Deploying multi-agent tool execution systems that solve complex end-to-end workflows.',
            tags: ['Agents', 'LangChain', 'Microservices'],
            runtime: 'Now Streaming',
            palette: crimson,
          },
        ],
      },
    ],
    topPicks: [
      { label: 'Core Specialty', title: 'Autonomous AI Agents', detail: 'Tool-calling, reasoning & automation', palette: crimson },
      { label: 'Conversational AI', title: 'Enterprise LLM Chatbots', detail: 'Zero-hallucination RAG pipelines', palette: amber },
      { label: 'Primary Frontend', title: 'React & Next.js', detail: 'High-performance web apps', palette: ocean },
      { label: 'Primary Backend', title: 'Node.js & Python', detail: 'FastAPI, Express & Microservices', palette: violet },
      { label: 'Database Standard', title: 'PostgreSQL & Vectors', detail: 'ACID compliance + semantic search', palette: jade },
      { label: 'DevOps Stack', title: 'Docker Containers', detail: 'Predictable zero-downtime shipping', palette: amber },
    ],
    introSlides: [
      {
        kicker: 'Specialist Lead',
        title: 'Basit Nayab',
        lines: ['Full Stack Developer & AI Specialist', 'Agency Lead for Web & Intelligent Systems'],
        chips: ['Full-Stack', 'AI Agents', 'LLMs'],
      },
      {
        kicker: 'Core Services',
        title: 'AI Chatbots & Agents',
        lines: ['Autonomous tool execution, RAG pipelines', 'OpenAI & Gemini enterprise integrations'],
        chips: ['LangChain', 'Python', 'FastAPI'],
      },
      {
        kicker: 'Web Platform',
        title: 'Full-Stack Web Apps',
        lines: ['React, Next.js, Node.js, PostgreSQL', 'High-throughput microservices & secure APIs'],
        chips: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      },
    ],
    order: ['about', 'originals', 'skills', 'picks', 'journey', 'moments', 'story'],
  },

  ahram: {
    id: 'ahram',
    fullName: 'Ahram Ali',
    displayName: 'Ahram Ali',
    firstName: 'AHRAM ALI',
    seriesTag: 'CREATIVE & VIDEO LEAD',
    originalLabel: 'A CINETRIO ORIGINAL',
    role: 'Video Editor & Motion Graphic Designer',
    badge: 'CREATIVE',
    glyph: '✦',
    color: '#8b5cf6',
    tagline: ['Video Editor', 'Motion Graphic Designer', 'AI Content Creator', 'Graphic Designer'],
    intro:
      'Lead Creative Editor and Motion Designer delivering cinematic video editing, dynamic 2D/3D motion graphics, brand identity systems, and cutting-edge AI-generated content that stops the scroll and drives viral audience retention.',
    location: 'Remote / Global',
    email: 'ahramali@gmail.com',
    avatarImg: '/assets/ahram-cutout-420.webp',
    links: {
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
      behance: 'https://behance.net',
    },
    portrait: {
      src: '/assets/ahram-cutout.webp',
      srcSet: '/assets/ahram-cutout-420.webp 420w, /assets/ahram-cutout.webp 896w',
      alt: 'Portrait of Ahram Ali',
    },
    interests: ['Cinematic Pacing', '3D Motion Typography', 'Generative AI Media', 'Brand Art Direction'],
    facts: [
      { k: 'Domain', v: 'Video & Motion Graphics', s: 'Editing, Motion Design & AI Media' },
      { k: 'Primary Tools', v: 'Premiere Pro · After Effects', s: 'DaVinci Resolve · Photoshop · Illustrator' },
      { k: 'AI Tools', v: 'Runway · Midjourney · ElevenLabs', s: 'AI Avatars & Generative Content' },
      { k: 'Track Record', v: '500+ Videos Edited', s: '10M+ Combined Organic Views' },
    ],
    education: [
      {
        school: 'Institute of Art, Media & Design',
        place: 'Media Arts',
        degree: 'Bachelor of Visual Arts & Digital Media Production',
        period: '2020 – 2024',
        score: 'Excellence in Motion Graphics',
      },
    ],
    experience: [
      {
        company: 'Cinetrio Studios',
        role: 'Lead Video Editor & Motion Designer',
        place: 'Global / Remote',
        period: '2024 – Present',
        points: [
          'Directed and edited high-converting commercial brand videos, YouTube productions, and viral social media campaigns.',
          'Designed bespoke 2D/3D motion graphics, lower thirds, title cards, and broadcast-ready visual identity assets.',
          'Implemented end-to-end AI-powered video pipelines utilizing Runway, Midjourney, and synthetic voice audio.',
        ],
      },
    ],
    projects: [
      {
        id: 'cinematic-commercial-reel',
        title: 'Cinematic Commercial Showreel',
        year: '2026',
        genre: 'Video Production • Sound Design • Color Grading',
        logline: 'High-octane commercial video showreel combining dynamic sound design, precision pacing, and DaVinci color grading.',
        stack: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design', 'Color Grading'],
        build: [
          'Produced and edited commercial showreels for top agency clients, increasing viewer retention to 85% on average.',
          'Mastered cinematic audio with sound effects, foley, and stem mixing for immersive playback across all devices.',
        ],
        features: [
          'Cinematic rhythm & beat-matched transitions',
          'Film emulation & custom LUT color grading',
          'Multi-layered audio soundscaping',
          '4K UHD export optimized for social & web',
        ],
        metrics: [
          { value: '85%', label: 'average retention' },
          { value: '500+', label: 'videos delivered' },
          { value: '10M+', label: 'total views' },
          { value: '4K', label: 'cinematic master output' },
        ],
        palette: violet,
        motif: 'video',
      },
      {
        id: 'motion-graphics-suite',
        title: '3D Motion Graphics & Brand Suite',
        year: '2026',
        genre: 'Motion Design • After Effects • VFX',
        logline: 'Bespoke broadcast motion graphics package with kinetic typography, 3D logo reveals, and UI overlays.',
        stack: ['After Effects', 'Illustrator', 'Cinema 4D', 'Kinetic Typography'],
        build: [
          'Designed full motion graphics packages for brand launches, SaaS explainers, and corporate identity videos.',
          'Created reusable motion graphic templates (MOGRTs) speeding up recurring client edits by 60%.',
        ],
        features: [
          'Kinetic typography & smooth easing curves',
          '3D camera projection & logo animation',
          'Seamless product UI motion mockups',
          'Custom brand transition wipes',
        ],
        metrics: [
          { value: '60%', label: 'faster client turnaround' },
          { value: '50+', label: 'brand suites created' },
          { value: '100%', label: 'vector & lossless assets' },
          { value: '60fps', label: 'fluid motion rendering' },
        ],
        palette: crimson,
        motif: 'flow',
      },
      {
        id: 'viral-ai-content-engine',
        title: 'Viral AI Content & Avatar Campaigns',
        year: '2026',
        genre: 'AI Content • Shorts & Reels • Graphic Design',
        logline: 'Next-gen short-form content pipeline using AI video generation, synthetic voiceover, and high-CTR graphic design.',
        stack: ['Runway Gen-3', 'Midjourney', 'Photoshop', 'ElevenLabs', 'CapCut Pro'],
        build: [
          'Developed an automated AI-assisted content production system delivering 30+ viral TikTok & Instagram Reels weekly.',
          'Crafted high-contrast graphic design thumbnails generating an average 12.8% click-through rate.',
        ],
        features: [
          'AI-generated B-roll & synthetic avatars',
          'Dynamic auto-captions with custom brand styling',
          'Photoshop graphic design & thumbnail mastery',
          'High-hook rate visual pacing',
        ],
        metrics: [
          { value: '30+', label: 'weekly viral shorts produced' },
          { value: '12.8%', label: 'average YouTube/Reels CTR' },
          { value: '5M+', label: 'organic views on single campaign' },
          { value: '3x', label: 'client audience growth' },
        ],
        palette: amber,
        motif: 'agent',
      },
    ],
    achievements: [
      {
        id: 'creative-director',
        title: 'Creative Media Lead',
        org: 'Cinetrio Studios',
        detail: 'Directing post-production, motion graphics, and graphic branding for all agency clients.',
        laurel: 'Creative Lead',
      },
      {
        id: 'views-milestone',
        title: '10M+ Organic Views',
        org: 'Social & Brand Video',
        detail: 'Produced short-form and commercial videos accumulating over ten million views worldwide.',
        laurel: 'Viral Reach',
      },
      {
        id: 'motion-craft',
        title: 'After Effects Specialist',
        org: 'Motion Graphic Guild',
        detail: 'Advanced motion graphics, 3D kinetic typography, and broadcast-ready design systems.',
        laurel: 'Motion Mastery',
      },
      {
        id: 'ai-creator',
        title: 'Pioneer in AI Video',
        org: 'Generative Media',
        detail: 'Early adopter of Runway Gen-3, Midjourney, and AI voice cloning pipelines.',
        laurel: 'AI Video Pioneer',
      },
    ],
    certifications: [
      { issuer: 'Adobe Certified Professional', name: 'Adobe Premiere Pro Video Editing' },
      { issuer: 'Adobe Certified Professional', name: 'Adobe After Effects Motion Graphics' },
      { issuer: 'Blackmagic Design', name: 'DaVinci Resolve Color Grading & Audio' },
      { issuer: 'Adobe Certified Professional', name: 'Visual Design using Adobe Photoshop & Illustrator' },
    ],
    skillCategories: [
      {
        id: 'video-editing',
        title: 'Video Editing',
        subtitle: 'Post-production, pacing & color grading',
        skills: [
          { name: 'Premiere Pro', mono: 'Pr', note: 'Primary' },
          { name: 'DaVinci Resolve', mono: 'Dv', note: 'Color' },
          { name: 'Color Grading', mono: 'Cg' },
          { name: 'Sound Design', mono: 'Sd' },
          { name: 'Multi-Cam Editing', mono: 'Mc' },
          { name: 'Pacing & Rhythm', mono: 'Pc' },
        ],
      },
      {
        id: 'motion-graphics',
        title: 'Motion Graphics',
        subtitle: '2D/3D kinetic animation & VFX',
        skills: [
          { name: 'After Effects', mono: 'Ae', note: 'Primary' },
          { name: 'Kinetic Typography', mono: 'Kt' },
          { name: '2D/3D Motion', mono: '3d' },
          { name: 'Logo Animation', mono: 'La' },
          { name: 'Visual Effects (VFX)', mono: 'Vx' },
          { name: 'MOGRTs', mono: 'Mg' },
        ],
      },
      {
        id: 'ai-content',
        title: 'AI Content Creation',
        subtitle: 'Generative media & synthetic avatars',
        skills: [
          { name: 'Runway Gen-3', mono: 'Rw', note: 'AI Video' },
          { name: 'Midjourney', mono: 'Mj' },
          { name: 'ElevenLabs', mono: 'El' },
          { name: 'Stable Diffusion', mono: 'Sd' },
          { name: 'AI Avatars', mono: 'Av' },
          { name: 'Viral Scripting', mono: 'Vs' },
        ],
      },
      {
        id: 'graphic-design',
        title: 'Graphic Design',
        subtitle: 'Visual identity, branding & thumbnails',
        skills: [
          { name: 'Photoshop', mono: 'Ps', note: 'Primary' },
          { name: 'Illustrator', mono: 'Ai' },
          { name: 'Brand Identity', mono: 'Bi' },
          { name: 'High-CTR Thumbnails', mono: 'Th' },
          { name: 'Social Media Kits', mono: 'Sm' },
          { name: 'Vector Artwork', mono: 'Va' },
        ],
      },
    ],
    skillEvidence: {
      'Premiere Pro': ['Cinematic Commercial Showreel', 'Commercial Ads & Long-Form Video'],
      'After Effects': ['3D Motion Graphics & Brand Suite', 'Broadcast Typography'],
      'DaVinci Resolve': ['Color Grading & Film Emulation', 'Audio Mastering'],
      'AI Content': ['Viral AI Content & Avatar Campaigns', 'Runway Gen-3 Pipelines'],
      Photoshop: ['High-CTR Thumbnails', 'Social Media Branding Asset Packs'],
      Illustrator: ['Brand Identity Suite', 'Vector Logo Animation'],
    },
    seasons: [
      {
        number: 1,
        title: 'The Visual Awakening',
        period: '2020 – 2022',
        synopsis: 'Mastering Adobe Creative Suite, cinematography fundamentals, and color theory.',
        episodes: [
          {
            code: 'S01 E01',
            title: 'Mastering the Cut',
            description: 'Intensive editing in Premiere Pro and learning the rhythm of visual storytelling.',
            tags: ['Premiere Pro', 'Audio', 'Pacing'],
            runtime: 'Formative Years',
            palette: amber,
          },
        ],
      },
      {
        number: 2,
        title: 'Motion & Dimensions',
        period: '2023 – 2024',
        synopsis: 'Diving deep into After Effects, 3D motion design, kinetic type, and commercial VFX.',
        episodes: [
          {
            code: 'S02 E01',
            title: 'The Motion Realm',
            description: 'Building custom title sequences, broadcast packages, and animated brand identity suites.',
            tags: ['After Effects', 'Motion Design', 'VFX'],
            runtime: 'Motion Era',
            palette: violet,
          },
        ],
      },
      {
        number: 3,
        title: 'The AI Content Frontier',
        period: '2025 – Present',
        synopsis: 'Pioneering generative AI video, viral short-form systems, and high-impact agency commercials.',
        episodes: [
          {
            code: 'S03 E01',
            title: 'Next-Gen Media',
            description: 'Merging human creative craft with Runway and Midjourney for limitless visual expression.',
            tags: ['AI Content', 'Runway', 'Viral Reels'],
            runtime: 'Now Streaming',
            palette: crimson,
          },
        ],
      },
    ],
    topPicks: [
      { label: 'Creative Specialization', title: 'Cinematic Video Editing', detail: 'Dynamic pacing, audio & color', palette: violet },
      { label: 'Motion Standard', title: 'After Effects & VFX', detail: 'Kinetic type, 3D logos & overlays', palette: crimson },
      { label: 'AI Media Frontier', title: 'Generative AI Content', detail: 'Runway, Midjourney & AI Avatars', palette: amber },
      { label: 'Visual Design', title: 'Photoshop & Illustrator', detail: 'Thumbnails, branding & vector art', palette: ocean },
      { label: 'Color Grading', title: 'DaVinci Resolve', detail: 'Film emulation & broadcast mastering', palette: jade },
      { label: 'Proven Impact', title: '10M+ Organic Views', detail: 'High retention short-form & commercials', palette: crimson },
    ],
    introSlides: [
      {
        kicker: 'Creative Lead',
        title: 'Ahram Ali',
        lines: ['Video Editor & Motion Graphic Designer', 'Agency Lead for Visual Storytelling & AI Media'],
        chips: ['Video Editing', 'Motion Graphics', 'AI Content'],
      },
      {
        kicker: 'Visual Craft',
        title: 'Cinematic Post-Production',
        lines: ['Commercial video editing, DaVinci color grading', 'Custom sound design & high-retention pacing'],
        chips: ['Premiere Pro', 'After Effects', 'DaVinci'],
      },
      {
        kicker: 'Next Generation',
        title: 'AI Content & Graphic Design',
        lines: ['Runway Gen-3, Midjourney, viral reels', 'Bespoke thumbnails, brand identity & vector assets'],
        chips: ['AI Video', 'Photoshop', 'Illustrator'],
      },
    ],
    screenings: [
      {
        title: 'SaaS Product Videos',
        blurb: 'Launch promos and feature explainers for software products.',
        videos: [
          { id: 'ENsbjiBxBy4', title: 'SaaS Promo 01', runtime: '0:33' },
          { id: 'nnSatLzA5VM', title: 'SaaS Promo 02', runtime: '1:08' },
          { id: '8HmrDvbs-ZI', title: 'SaaS Promo 03', runtime: '0:40' },
          { id: 'WrYtX6qMpOc', title: 'SaaS Promo 04', runtime: '0:46' },
          { id: 'BSxOHECaYDg', title: 'SaaS Promo 05', runtime: '0:19' },
          { id: 'SIe9OOXu7pg', title: 'SaaS Promo 06', runtime: '1:55' },
          { id: 'OERP9r_1PmQ', title: 'SaaS Promo 07', runtime: '0:49' },
          { id: 'K3i_DqyGynU', title: 'SaaS Promo 08', runtime: '1:08' },
        ],
      },
      {
        title: 'AI Video Edits',
        blurb: 'Generative AI visuals cut to pace, sound and story.',
        videos: [
          { id: 'BMqq7xIqmNY', title: 'AI Video Edit 01', runtime: '1:07' },
          { id: 'g9PbSbrkB3s', title: 'AI Video Edit 02', runtime: '4:53' },
          { id: 'pqAG6TgtnC0', title: 'AI Video Edit 03', runtime: '2:27' },
          { id: '-0O_ezpnbSQ', title: 'Brand Promo Sample', runtime: '0:11' },
        ],
      },
      {
        title: 'Shorts & Reels',
        blurb: 'Vertical edits built for TikTok, Reels and Shorts.',
        videos: [
          { id: 'NpnP2KwC9SY', title: 'Reel 01', runtime: 'Short', format: 'short' },
          { id: 'hLaK5-xESVU', title: 'Reel 02', runtime: 'Short', format: 'short' },
          { id: 'JCF-uhfk0b8', title: 'Reel 03', runtime: 'Short', format: 'short' },
          { id: '6p4R5mtmqlM', title: 'Reel 04', runtime: 'Short', format: 'short' },
          { id: 'x2c1tbwXRNc', title: 'Reel 05', runtime: 'Short', format: 'short' },
        ],
      },
      {
        title: 'Documentaries & Podcasts',
        blurb: 'Long-form storytelling and full podcast episode edits.',
        videos: [
          { id: '4Mu8DmEErhw', title: 'Pahalgam 2025 — Documentary Edit', runtime: '8:42' },
          { id: 'ixPibzkhvHA', title: 'Hominids Before Adam — Urdu Documentary', runtime: '12:18' },
          { id: '41101zwP9kE', title: 'Awais Podtalk ft. Dania Shah', runtime: '51:34' },
          { id: 'lHbkzYJkJTc', title: 'Podcast Episode — Creator Talk', runtime: '52:19' },
        ],
      },
    ],
    order: ['originals', 'screenings', 'about', 'skills', 'picks', 'journey', 'moments', 'story'],
  },

  faraz: {
    id: 'faraz',
    fullName: 'Muhammad Faraz',
    displayName: 'Muhammad Faraz',
    firstName: 'MUHAMMAD FARAZ',
    seriesTag: 'E-COMMERCE & GROWTH LEAD',
    originalLabel: 'A CINETRIO ORIGINAL',
    role: 'E-Commerce Specialist & Growth Lead',
    badge: 'ECOMMERCE',
    glyph: '🛒',
    color: '#10b981',
    tagline: ['E-Commerce Growth', 'TikTok Shop Specialist', 'Amazon FBA/FBM', 'eBay Stores'],
    intro:
      'E-Commerce Growth Specialist scaling six and seven-figure online stores across TikTok Shop, Amazon FBA, and eBay through data-driven product hunting, high-converting listing optimization, aggressive PPC management, and automated fulfillment.',
    location: 'Remote / Global',
    email: 'muhammadfaraz@gmail.com',
    avatarImg: '/assets/faraz-cutout-420.webp',
    links: {
      linkedin: 'https://linkedin.com',
    },
    portrait: {
      src: '/assets/faraz-cutout.webp',
      srcSet: '/assets/faraz-cutout-420.webp 420w, /assets/faraz-cutout.webp 1086w',
      alt: 'Portrait of Muhammad Faraz',
    },
    interests: ['Marketplace Algorithms', 'Viral TikTok Shop Commerce', 'Global Supply Chain', 'Brand Scaling'],
    facts: [
      { k: 'Domain', v: 'E-Commerce Scaling', s: 'TikTok Shop, Amazon & eBay Management' },
      { k: 'Marketplaces', v: 'TikTok Shop · Amazon · eBay', s: 'FBA, FBM, Dropship & Wholesale' },
      { k: 'Growth Focus', v: 'PPC & Creator Affiliates', s: 'Listing SEO, Sourcing & Margin Strategy' },
      { k: 'Track Record', v: '$500K+ GMV Scaled', s: 'Top Rated Seller Status & High ROAS' },
    ],
    education: [
      {
        school: 'Faculty of Business & E-Commerce',
        place: 'Business Administration',
        degree: 'Bachelor of Science — E-Commerce & Digital Marketing',
        period: '2020 – 2024',
        score: 'Highest Distinction in Marketplace Strategy',
      },
    ],
    experience: [
      {
        company: 'Cinetrio Studios',
        role: 'E-Commerce Lead & Store Growth Specialist',
        place: 'Global / Remote',
        period: '2024 – Present',
        points: [
          'Scaled client e-commerce stores across TikTok Shop, Amazon FBA, and eBay with full listing optimization and PPC advertising.',
          'Built profitable creator affiliate networks on TikTok Shop resulting in viral multi-product sales spikes.',
          'Conducted deep product research, supplier vetting, and inventory forecasting to protect margins and eliminate stockouts.',
        ],
      },
    ],
    projects: [
      {
        id: 'tiktok-shop-scaling-engine',
        title: 'TikTok Shop Launch & Creator Scaling',
        year: '2026',
        genre: 'E-Commerce • TikTok Shop • Creator Affiliate',
        logline: 'End-to-end TikTok Shop store launch scaling from zero to $100K+ monthly GMV through viral affiliate collaboration.',
        stack: ['TikTok Shop', 'Creator Outreach', 'TikTok Ads', 'Shopify Sync'],
        build: [
          'Onboarded 200+ content creators to the TikTok Shop affiliate program driving viral user-generated video reviews.',
          'Optimized in-app TikTok Shop product listings with high-converting imagery and urgency hooks.',
        ],
        features: [
          'Automated sample request & creator outreach flow',
          'TikTok Shop Ads with targeted ROAS optimization',
          'Live shopping event strategy and scheduling',
          'Multi-warehouse automated order fulfillment',
        ],
        metrics: [
          { value: '$100K+', label: 'monthly GMV achieved' },
          { value: '200+', label: 'creator affiliates partnered' },
          { value: '4.2x', label: 'average TikTok Ads ROAS' },
          { value: '4.9★', label: 'customer shop rating' },
        ],
        palette: jade,
        motif: 'commerce',
      },
      {
        id: 'amazon-fba-brand-launch',
        title: 'Amazon FBA Brand Launch & SEO Ranking',
        year: '2026',
        genre: 'E-Commerce • Amazon FBA • PPC Optimization',
        logline: 'Comprehensive Amazon FBA launch achieving Top 10 organic ranking within 60 days via Helium 10 keyword architecture.',
        stack: ['Amazon FBA', 'Helium 10', 'Amazon PPC', 'A+ Content'],
        build: [
          'Engineered exhaustive keyword strategy and A+ enhanced brand content resulting in a 24% conversion rate.',
          'Managed structured Amazon Sponsored Products and Brands PPC campaigns maintaining strict ACoS targets.',
        ],
        features: [
          'Helium 10 Cerebro reverse-ASIN keyword modeling',
          'A+ Content and high-CTR lifestyle product renders',
          'Review velocity automation with Amazon Vine',
          'Inventory replenishment forecasting alerts',
        ],
        metrics: [
          { value: 'Top 10', label: 'organic keyword ranking' },
          { value: '24%', label: 'listing conversion rate' },
          { value: '<18%', label: 'average ACoS on PPC' },
          { value: '1,500+', label: 'monthly unit sales' },
        ],
        palette: amber,
        motif: 'shield',
      },
      {
        id: 'ebay-multi-category-store',
        title: 'High-Volume eBay Store & Repricing Empire',
        year: '2026',
        genre: 'E-Commerce • eBay Store • Arbitrage & Wholesale',
        logline: 'High-volume eBay multi-category store with automated algorithmic repricing and Top Rated Seller Plus status.',
        stack: ['eBay Store', 'Algorithmic Repricer', 'Terapeak', 'Inventory Hub'],
        build: [
          'Scaled an eBay catalog to 2,000+ active SKU listings with optimized titles and item specifics.',
          'Achieved and maintained Top Rated Seller Plus status with 100% positive feedback and fast dispatch.',
        ],
        features: [
          'Algorithmic real-time competitor repricing',
          'Promoted Listings Standard & Advanced campaigns',
          'Automated return and customer messaging handling',
          'Direct supplier wholesale integration',
        ],
        metrics: [
          { value: '2,000+', label: 'active listings managed' },
          { value: 'Top Rated', label: 'eBay seller status' },
          { value: '100%', label: 'positive feedback rating' },
          { value: '$250K+', label: 'total sales processed' },
        ],
        palette: ocean,
        motif: 'flow',
      },
    ],
    achievements: [
      {
        id: 'ecom-lead',
        title: 'E-Commerce Lead',
        org: 'Cinetrio Studios',
        detail: 'Directing store growth, marketplace optimization, and advertising across all agency accounts.',
        laurel: 'Growth Lead',
      },
      {
        id: 'top-rated-seller',
        title: 'Top Rated Seller',
        org: 'eBay Marketplace',
        detail: 'Achieved Top Rated Seller Plus status with flawless customer satisfaction metrics.',
        laurel: 'Top Rated',
      },
      {
        id: 'amazon-top-rank',
        title: 'Amazon FBA Top 1%',
        org: 'Amazon Marketplace',
        detail: 'Ranked client private label products in competitive categories to top page organic positions.',
        laurel: 'Top Ranker',
      },
      {
        id: 'tiktok-shop-expert',
        title: 'TikTok Shop Pioneer',
        org: 'ByteDance Commerce',
        detail: 'Scaled multiple viral affiliate stores generating six-figure revenues.',
        laurel: 'Shop Specialist',
      },
    ],
    certifications: [
      { issuer: 'TikTok Academy', name: 'TikTok Shop Partner & Merchant Specialist' },
      { issuer: 'Amazon Services', name: 'Amazon Ads Certified: Sponsored Ads & Retail' },
      { issuer: 'Helium 10', name: 'Helium 10 Certified Market Researcher & SEO' },
      { issuer: 'eBay Seller School', name: 'eBay Business Growth & Store Optimization' },
    ],
    skillCategories: [
      {
        id: 'marketplaces',
        title: 'Marketplaces',
        subtitle: 'Core selling channels & platforms',
        skills: [
          { name: 'TikTok Shop', mono: 'Tk', note: 'Primary' },
          { name: 'Amazon FBA / FBM', mono: 'Am', note: 'Primary' },
          { name: 'eBay Store', mono: 'Eb', note: 'Primary' },
          { name: 'Shopify Sync', mono: 'Sh' },
          { name: 'Walmart Marketplace', mono: 'Wm' },
          { name: 'Wholesale & Retail', mono: 'Ws' },
        ],
      },
      {
        id: 'marketing-ads',
        title: 'Marketing & PPC',
        subtitle: 'Paid advertising, affiliates & conversions',
        skills: [
          { name: 'TikTok Ads Manager', mono: 'Ta', note: 'Primary' },
          { name: 'Amazon Sponsored PPC', mono: 'Ap' },
          { name: 'Creator Affiliate Network', mono: 'Cr' },
          { name: 'eBay Promoted Listings', mono: 'Ep' },
          { name: 'ROAS Optimization', mono: 'Ro' },
          { name: 'A/B Price Testing', mono: 'Ab' },
        ],
      },
      {
        id: 'product-research',
        title: 'Product & Sourcing',
        subtitle: 'Winning products & global supplier chain',
        skills: [
          { name: 'Helium 10', mono: 'H1', note: 'Primary' },
          { name: 'Jungle Scout', mono: 'Js' },
          { name: 'Winning Product Hunting', mono: 'Ph' },
          { name: 'Supplier Sourcing', mono: 'Ss' },
          { name: 'Margin & Profit Analysis', mono: 'Ma' },
          { name: 'Terapeak', mono: 'Tp' },
        ],
      },
      {
        id: 'operations-seo',
        title: 'Store Operations',
        subtitle: 'Listing SEO, fulfillment & customer care',
        skills: [
          { name: 'Listing SEO & Copy', mono: 'Ls', note: 'Primary' },
          { name: 'A+ Content Strategy', mono: 'A+' },
          { name: 'Inventory Forecasting', mono: 'If' },
          { name: 'Automated Repricing', mono: 'Ar' },
          { name: 'Review Acceleration', mono: 'Ra' },
          { name: 'Order Fulfillment', mono: 'Of' },
        ],
      },
    ],
    skillEvidence: {
      'TikTok Shop': ['TikTok Shop Launch & Creator Scaling', 'Creator Affiliate Network'],
      'Amazon FBA / FBM': ['Amazon FBA Brand Launch & SEO Ranking', 'Helium 10 Keyword Architecture'],
      'eBay Store': ['High-Volume eBay Store & Repricing Empire', 'Top Rated Seller Status'],
      'TikTok Ads Manager': ['High ROAS TikTok Ad Campaigns', 'Viral Creator Push'],
      'Amazon Sponsored PPC': ['Sponsored Products & Sponsored Brands Optimization'],
      'Helium 10': ['Reverse-ASIN Modeling & Keyword Indexing'],
      'Listing SEO & Copy': ['High-converting product copywriting and A+ enhanced layouts'],
    },
    seasons: [
      {
        number: 1,
        title: 'The Marketplace Spark',
        period: '2020 – 2022',
        synopsis: 'Mastering e-commerce algorithms, supplier negotiations, and eBay high-volume stores.',
        episodes: [
          {
            code: 'S01 E01',
            title: 'Learning Market Dynamics',
            description: 'Building an eBay powerhouse with algorithmic repricing and 100% positive feedback.',
            tags: ['eBay', 'Repricing', 'Top Rated'],
            runtime: 'Formative Years',
            palette: amber,
          },
        ],
      },
      {
        number: 2,
        title: 'The Amazon FBA Ascendancy',
        period: '2023 – 2024',
        synopsis: 'Scaling private label Amazon FBA products to Top 10 rankings with tight PPC management.',
        episodes: [
          {
            code: 'S02 E01',
            title: 'Amazon FBA Ranking',
            description: 'Dominating competitive Amazon niches through Helium 10 SEO and conversion-tuned A+ content.',
            tags: ['Amazon FBA', 'Helium 10', 'PPC'],
            runtime: 'Amazon Era',
            palette: violet,
          },
        ],
      },
      {
        number: 3,
        title: 'The TikTok Shop Revolution',
        period: '2025 – Present',
        synopsis: 'Pioneering TikTok Shop affiliate scaling, live commerce, and multi-channel agency growth.',
        episodes: [
          {
            code: 'S03 E01',
            title: 'TikTok Viral Commerce',
            description: 'Mobilizing hundreds of creators to produce viral commerce sales with 4x+ ROAS.',
            tags: ['TikTok Shop', 'Creator Network', 'Scaling'],
            runtime: 'Now Streaming',
            palette: jade,
          },
        ],
      },
    ],
    topPicks: [
      { label: 'E-Commerce Channel', title: 'TikTok Shop Growth', detail: 'Affiliates, Shop Ads & Live Sales', palette: jade },
      { label: 'Marketplace Pillar', title: 'Amazon FBA / FBM', detail: 'Private label, SEO & low-ACoS PPC', palette: amber },
      { label: 'High-Volume Channel', title: 'eBay Store Empire', detail: 'Top Rated Seller & auto-repricing', palette: ocean },
      { label: 'Revenue Milestone', title: '$500K+ GMV Scaled', detail: 'Multi-channel profitable sales volume', palette: crimson },
      { label: 'Research Tool', title: 'Helium 10 & Jungle Scout', detail: 'Deep niche extraction & keyword data', palette: violet },
      { label: 'Advertising Power', title: 'TikTok & Amazon PPC', detail: 'High-ROAS structured campaigns', palette: jade },
    ],
    introSlides: [
      {
        kicker: 'E-Commerce Lead',
        title: 'Muhammad Faraz',
        lines: ['E-Commerce Specialist & Store Growth Lead', 'Agency Lead for TikTok Shop, Amazon & eBay'],
        chips: ['TikTok Shop', 'Amazon FBA', 'eBay'],
      },
      {
        kicker: 'Key Marketplaces',
        title: 'TikTok Shop, Amazon & eBay',
        lines: ['Product hunting, supplier sourcing, listing SEO', 'Creator affiliate networks & PPC advertising'],
        chips: ['PPC Ads', 'Helium 10', 'Creator Network'],
      },
      {
        kicker: 'Proven Results',
        title: '$500K+ GMV Scaled',
        lines: ['Top Rated Seller status, Top 10 organic rankings', 'Automated multi-channel fulfillment & scaling'],
        chips: ['Store Scaling', 'Top Rated Seller', 'High ROAS'],
      },
    ],
    order: ['picks', 'originals', 'about', 'skills', 'journey', 'moments', 'story'],
  },
};

/** Helper to retrieve a specific member profile, falling back to Basit */
export function getProfile(id?: ProfileId | null): MemberProfile {
  if (id && memberProfiles[id]) {
    return memberProfiles[id];
  }
  return memberProfiles.basit;
}

/** Global default exports for backward compatibility */
export const profile = memberProfiles.basit;
export const projects = memberProfiles.basit.projects;
export const achievements = memberProfiles.basit.achievements;
export const certifications = memberProfiles.basit.certifications;
export const skillCategories = memberProfiles.basit.skillCategories;
export const skillEvidence = memberProfiles.basit.skillEvidence;
export const seasons = memberProfiles.basit.seasons;
export const topPicks = memberProfiles.basit.topPicks;
export const introSlides = memberProfiles.basit.introSlides;
export const education = memberProfiles.basit.education;
export const experience = memberProfiles.basit.experience;

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'Lead Profile', meta: 'Background & Expertise', palette: violet },
  journey: { nav: 'Journey', card: 'Career Journey', meta: 'Career Seasons & Episodes', palette: amber },
  screenings: { nav: 'Screenings', card: 'Now Streaming', meta: 'Edited Videos, Podcasts & Reels', palette: violet },
  originals: { nav: 'Originals', card: 'Client Productions', meta: 'Featured Projects & Case Studies', palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Highlights', meta: 'Proven Results & Key Metrics', palette: jade },
  skills: { nav: 'Skills', card: 'Skill Universe', meta: 'Tools, Tech & Stack', palette: ocean },
  moments: { nav: 'Moments', card: 'Top Milestones', meta: 'Achievements & Credentials', palette: crimson },
  story: { nav: 'Dossier', card: 'Full Dossier', meta: 'Complete Spec Sheet & Bio', palette: violet },
};
