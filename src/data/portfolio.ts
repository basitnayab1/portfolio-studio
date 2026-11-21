/**
 * Cinetrio Studios — Team Portfolio Data
 * Central source of truth for Cinetrio Studios and its 3 dedicated leads:
 * 1. Basit Nayab — Full Stack Developer & AI Specialist (AI Chatbots, AI Agents, LLM)
 * 2. Ahram Ali — Video Editor & Motion Graphic Designer (Video Editing, Motion Graphics, AI Content, Graphic Design)
 * 3. Muhammad Faraz — E-Commerce Specialist (TikTok Shop, eBay, Amazon)
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export type ProfileId = 'basit' | 'ahram' | 'faraz' | 'mubashir';
export type SectionId = 'about' | 'journey' | 'originals' | 'screenings' | 'picks' | 'skills' | 'moments' | 'story';

/** A video hosted on YouTube, shown in the Screenings section. 'short' = vertical 9:16. */
export type Screening = { id: string; title: string; runtime: string; format?: 'wide' | 'short' };
export type ScreeningShelf = { title: string; blurb: string; videos: Screening[] };
export const thumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export type Metric = { value: string; label: string };

/** Transparent 360° image sequence: frames at `${base}00.webp` … ; frame 0 faces the camera. */
export type Turntable = { base: string; count: number };

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
  /** YouTube ids from the profile's screenings; the first one is the featured reel. */
  videos?: string[];
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
  /** Drag-to-rotate 360° model shown instead of the still portrait. */
  turntable?: Turntable;
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
    /** Grade or honours; left out until there is a real one to show. */
    score?: string;
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
      title: 'Business Development & E-Commerce Growth',
      lead: 'Muhammad Faraz',
      desc: 'Client Acquisition, Strategic Partnerships, and End-to-End TikTok Shop, Amazon FBA/FBM, and eBay Growth.',
      tags: ['Business Development', 'Client Acquisition', 'Partnerships', 'TikTok Shop', 'Amazon FBA', 'eBay'],
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
    role: 'Business Development & Growth Strategist',
    badge: 'BIZ DEV',
    glyph: '🛒',
    blurb: 'Client Acquisition, Partnerships & E-Commerce Growth',
    color: '#10b981',
    avatarImg: '/assets/faraz-cutout-420.webp',
    order: ['picks', 'originals', 'about', 'skills', 'journey', 'moments', 'story'],
  },
];

/** Dedicated profile metadata for Muhammad Mubashir (separate from core agency viewer selection) */
export const mubashirViewerProfile = {
  id: 'mubashir' as ProfileId,
  name: 'Muhammad Mubashir',
  fullName: 'Muhammad Mubashir Muneer',
  role: 'Head of Procurement & Certified Drone Pilot',
  badge: 'PROCUREMENT & UAV',
  glyph: '🛩️',
  blurb: 'Strategic Sourcing, DJI Enterprise UAV & Logistics',
  color: '#0284c7',
  avatarImg: '/assets/mubashir-cutout-420.webp',
  order: ['about', 'originals', 'skills', 'picks', 'journey', 'moments', 'story'] as SectionId[],
};

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
    turntable: { base: '/assets/basit-360/', count: 48 },
    avatarImg: '/assets/basit-cutout.webp',
    links: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com/basitnayab1',
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
        school: 'University of the Punjab',
        place: 'Lahore',
        degree: 'BS Data Science',
        period: '2023 – Present',
        score: 'Focus: AI & Large Language Models (LLMs)',
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
        github: 'https://github.com/basitnayab1',
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
        github: 'https://github.com/basitnayab1',
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
        school: 'Bahauddin Zakariya University (BZU)',
        place: 'Institute of Media Communication Studies, Multan',
        degree: 'BS Mass Communication',
        period: '2021 – Present',
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
        title: 'Podcasts & Documentaries',
        year: '2026',
        genre: 'Podcast Editing • Documentary • Sound Design',
        logline: 'Full-length podcast episodes and documentary edits with multi-cam cutting, clean dialogue audio, story-driven pacing, and DaVinci color grading.',
        stack: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design', 'Color Grading'],
        build: [
          'Edited full-length podcast episodes and Urdu documentaries for creators, keeping 50-minute conversations tight and watchable.',
          'Mastered cinematic audio with sound effects, foley, and stem mixing for immersive playback across all devices.',
        ],
        features: [
          'Multi-cam podcast cutting & speaker switching',
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
        videos: ['41101zwP9kE', 'lHbkzYJkJTc', 'ixPibzkhvHA', '4Mu8DmEErhw'],
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
        videos: ['SIe9OOXu7pg', 'ENsbjiBxBy4', 'nnSatLzA5VM', '8HmrDvbs-ZI', 'WrYtX6qMpOc', 'BSxOHECaYDg', 'OERP9r_1PmQ', 'K3i_DqyGynU', '-0O_ezpnbSQ'],
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
        videos: ['g9PbSbrkB3s', 'BMqq7xIqmNY', 'pqAG6TgtnC0', 'NpnP2KwC9SY', 'hLaK5-xESVU', 'JCF-uhfk0b8', '6p4R5mtmqlM', 'x2c1tbwXRNc'],
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
      'Premiere Pro': ['Podcasts & Documentaries', 'Commercial Ads & Long-Form Video'],
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
    seriesTag: 'BUSINESS DEVELOPMENT & GROWTH',
    originalLabel: 'A CINETRIO ORIGINAL',
    role: 'Business Development & Growth Strategist',
    badge: 'BIZ DEV',
    glyph: '🛒',
    color: '#10b981',
    tagline: ['Business Development', 'Client Acquisition', 'Digital Commerce', 'Strategic Partnerships'],
    intro:
      'Business Development & Growth Strategist helping businesses find growth opportunities, build client and partner relationships, and connect commercial goals with practical digital solutions, backed by nearly five years of hands-on e-commerce across TikTok Shop, Amazon, and eBay.',
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
    interests: ['Strategic Partnerships', 'Client Relationships', 'Marketplace Algorithms', 'Brand Scaling'],
    facts: [
      { k: 'Domain', v: 'Business Development & Growth', s: 'Client Acquisition & Strategic Partnerships' },
      { k: 'Experience', v: '~5 Years', s: 'E-Commerce & Digital Business' },
      { k: 'Marketplaces', v: 'TikTok Shop · Amazon · eBay', s: 'FBA, FBM, Dropship & Wholesale' },
      { k: 'Track Record', v: '$500K+ GMV Scaled', s: 'Top Rated Seller Status & High ROAS' },
    ],
    education: [
      {
        school: 'Bahauddin Zakariya University (BZU)',
        place: 'Multan',
        degree: 'BS Entrepreneurship',
        period: '2021 – Present',
      },
    ],
    experience: [
      {
        company: 'Cinetrio Studios',
        role: 'Business Development & Growth Lead',
        place: 'Global / Remote',
        period: '2024 – Present',
        points: [
          'Identify business opportunities and develop new client relationships, from first conversation to agreed next steps.',
          'Support proposal preparation, commercial discussions, negotiations, and follow-ups with prospective and existing clients.',
          'Coordinate with the creative and technology leads to match client requirements with the right delivery capabilities.',
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
        id: 'business-development',
        title: 'Business Development',
        subtitle: 'Clients, proposals & partnerships',
        skills: [
          { name: 'Lead Research & Qualification', mono: 'Lq', note: 'Primary' },
          { name: 'Client Relationship Building', mono: 'Cr', note: 'Primary' },
          { name: 'Proposal & Commercial Coordination', mono: 'Pc' },
          { name: 'Sales & Negotiation Support', mono: 'Sn' },
          { name: 'Strategic Partnerships', mono: 'Sp' },
          { name: 'Requirement Gathering', mono: 'Rg' },
        ],
      },
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
      'Lead Research & Qualification': ['Finding and qualifying new client opportunities for Cinetrio Studios'],
      'Client Relationship Building': ['Client conversations, expectation management and follow-through'],
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
      { label: 'Core Focus', title: 'Business Development', detail: 'Client acquisition & strategic partnerships', palette: violet },
      { label: 'E-Commerce Channel', title: 'TikTok Shop Growth', detail: 'Affiliates, Shop Ads & Live Sales', palette: jade },
      { label: 'Marketplace Pillar', title: 'Amazon FBA / FBM', detail: 'Private label, SEO & low-ACoS PPC', palette: amber },
      { label: 'High-Volume Channel', title: 'eBay Store Empire', detail: 'Top Rated Seller & auto-repricing', palette: ocean },
      { label: 'Revenue Milestone', title: '$500K+ GMV Scaled', detail: 'Multi-channel profitable sales volume', palette: crimson },
      { label: 'Research Tool', title: 'Helium 10 & Jungle Scout', detail: 'Deep niche extraction & keyword data', palette: violet },
      { label: 'Advertising Power', title: 'TikTok & Amazon PPC', detail: 'High-ROAS structured campaigns', palette: jade },
    ],
    introSlides: [
      {
        kicker: 'Business Development Lead',
        title: 'Muhammad Faraz',
        lines: ['Business Development & Growth Strategist', 'Client acquisition, partnerships & digital commerce'],
        chips: ['Business Development', 'Client Acquisition', 'E-Commerce'],
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
  mubashir: {
    id: 'mubashir',
    fullName: 'Muhammad Mubashir Muneer',
    displayName: 'Muhammad Mubashir',
    firstName: 'MUBASHIR',
    seriesTag: 'PROCUREMENT & ENTERPRISE UAV',
    originalLabel: 'A SPECIAL DOSSIER',
    role: 'Head of Procurement & Certified Drone Pilot',
    badge: 'PROCUREMENT & UAV',
    glyph: '🛩️',
    color: '#0284c7',
    tagline: ['Strategic Sourcing & RFQs', 'DJI Enterprise UAV Pilot', 'UAE Semi-Gov Tenders', 'Global Logistics & Customs'],
    intro:
      'Head of Procurement and Certified DJI Enterprise Drone Pilot based in Dubai, UAE. Experienced in leading procurement teams achieving AED 20M in sales, securing high-value semi-government tenders with a 70–80% win rate, and deploying enterprise UAV solutions for public safety, mapping, and inspections.',
    location: 'Al Karama, Dubai, UAE',
    email: 'mubashirmuneer1228@gmail.com',
    avatarImg: '/assets/mubashir-cutout-420.webp',
    links: {
      linkedin: 'https://linkedin.com/in/muhammad-mubashir-muneer',
    },
    resumePdf: '/assets/resumes/mubashir-procurement.pdf',
    portrait: {
      src: '/assets/mubashir-cutout.webp',
      srcSet: '/assets/mubashir-cutout-420.webp 420w, /assets/mubashir-cutout.webp 765w, /assets/mubashir-cutout.png 765w',
      alt: 'Portrait of Muhammad Mubashir Muneer',
    },
    interests: ['Strategic Sourcing', 'DJI Enterprise Drones', 'Public Safety Tech', 'Customs & SIRA Compliance', 'Odoo ERP Workflows'],
    facts: [
      { k: 'Domain', v: 'Procurement & Enterprise UAV', s: 'Strategic Sourcing, Tenders & DJI Drones' },
      { k: 'Sales Impact', v: 'AED 20M', s: 'Procurement team sales delivered in 2026' },
      { k: 'Tender Win Rate', v: '70% – 80%', s: 'Semi-government clients in Dubai, UAE' },
      { k: 'Enterprise UAV', v: 'DJI Certified', s: 'Dock 3 & Public Safety Solutions Engineer' },
    ],
    education: [
      {
        school: 'City H.S.S College Shujaabad',
        place: 'District Multan, Pakistan',
        degree: 'Intermediate in Computer Science',
        period: '2018 – 2020',
      },
      {
        school: 'Govt. High School Shujaabad',
        place: 'District Multan, Pakistan',
        degree: 'Matric in Computer Science',
        period: '2016 – 2018',
      },
    ],
    experience: [
      {
        company: 'Technoai FZE LLC',
        role: 'Head of Procurement',
        place: 'Dubai, UAE',
        period: 'June 2026 – Present',
        points: [
          'Lead a high-performing procurement team of 6 that achieved AED 20M in sales in 2026.',
          'Manage the complete procurement cycle from initial RFQ to final delivery, including day-to-day and project-based purchasing.',
          'Source international and local suppliers, managing competitive tenders, RFQs, and RFPs for semi-government clients in Dubai with a 70–80% win rate.',
          'Coordinate with logistics, warehousing, and finance on delivery milestones, payment terms, and import/export compliance using Odoo ERP.',
          'Maintain live RFQ logs, procurement trackers, and supplier performance scorecards ensuring strict adherence to internal approval workflows.',
        ],
      },
      {
        company: 'Technoai FZE LLC / Aerotel FZCO',
        role: 'Procurement Officer & DJI Enterprise Sales Representative',
        place: 'Dubai, UAE',
        period: 'Feb 2024 – May 2026',
        points: [
          'Worked as an Authorized ASC Dealer Partner for DJI Enterprise drones, executing client demonstrations, product positioning, and technical support.',
          'Delivered consultative drone solutions for public safety, thermal mapping, surveillance, and industrial inspection sectors.',
          'Prepared, issued, and analyzed complex RFQs/RFPs to select best-value suppliers and negotiated high-value equipment supply contracts.',
          'Coordinated international air and sea shipments, customs clearance, and regulatory product approvals from SIRA, MOFA, MOIAT, DCAA, and GCAA.',
          'Created and tracked Purchase Orders (POs) and inventory movement in Odoo ERP, driving cost control and eliminating shipment bottlenecks.',
        ],
      },
      {
        company: 'Aerotel FZCO',
        role: 'Logistics Coordinator',
        place: 'Dubai, UAE',
        period: 'Aug 2023 – Dec 2023',
        points: [
          'Prepared Bills of Entry (BOE) with precision verification of item weights, values, quantities, HS codes, POL, POD, and AWB/BOL for customs clearance.',
          'Handled specialized government approvals (SIRA, MOFA, MOIAT, DCAA, GCAA) and End-User Letters for restricted electronic and UAV goods.',
          'Managed air and sea freight forwarding companies for heavy-cargo consignments, negotiating rates and securing proactive delivery tracking.',
          'Monitored stock levels and storage layouts to prevent stockouts and streamline warehouse dispatch.',
        ],
      },
      {
        company: 'Dukkantek LLC',
        role: 'Data Operator & Procurement Support',
        place: 'Dubai, UAE',
        period: 'Dec 2022 – July 2023',
        points: [
          'Accurately entered and audited high volumes of item data for machine learning detection models with rigorous quality benchmarks.',
          'Procured project-related hardware, managed supplier coordination, and processed POs, SOs, invoices, and delivery notes.',
        ],
      },
    ],
    projects: [
      {
        id: 'semi-gov-tender-procurement',
        title: 'AED 20M Semi-Gov Tender Engine',
        year: '2026',
        genre: 'Strategic Sourcing • Semi-Gov Tenders • Odoo ERP',
        logline: 'Directed multi-million AED procurement operations and achieved a 70–80% win rate across competitive Dubai semi-government tenders.',
        stack: ['Odoo Enterprise ERP', 'Tender Operations', 'RFQ / RFP Management', 'Vendor Negotiation', 'Cost Control'],
        build: [
          'Engineered a structured RFQ-to-delivery pipeline managing AED 20M in client sales across Dubai semi-government sectors.',
          'Established strategic supplier vetting that drove cost reductions while maintaining 100% compliance with client specifications.',
        ],
        features: [
          'Semi-government competitive tender qualification & bidding',
          'Automated Odoo ERP purchase order and invoice verification',
          'Supplier risk assessment, performance tracking & SLA monitoring',
          'Contract negotiation securing high-margin payment milestones',
        ],
        metrics: [
          { value: 'AED 20M', label: 'procurement team sales in 2026' },
          { value: '70%–80%', label: 'tender win rate' },
          { value: 'AED 3.5M', label: 'largest single tender won' },
          { value: '6 Staff', label: 'procurement specialists led' },
        ],
        palette: ocean,
        motif: 'shield',
      },
      {
        id: 'dji-enterprise-uav-operations',
        title: 'DJI Enterprise UAV Solutions',
        year: '2025',
        genre: 'Enterprise UAV • Dock 3 • Public Safety',
        logline: 'Authorized ASC Dealer Partner operations for DJI Enterprise drones, autonomous Dock 3 installations, and public safety consultative engineering.',
        stack: ['DJI Enterprise', 'Dock 3 Autonomous System', 'Thermal & LiDAR Sensors', 'Public Safety Tech', 'DCAA Compliance'],
        build: [
          'Conducted high-profile enterprise drone live demonstrations and consultative presentations for security, mapping, and industrial inspection.',
          'Spearheaded client onboarding, technical operator training, and post-sales maintenance workflows as an authorized DJI partner.',
        ],
        features: [
          'DJI Dock 3 automated flight scheduling & remote mission planning',
          'Public safety thermal inspection and emergency response solutions',
          'Payload integration including high-zoom optical and thermal cameras',
          'Full DCAA/GCAA airspace clearance and flight safety compliance',
        ],
        metrics: [
          { value: 'Authorized', label: 'DJI ASC Dealer Partner' },
          { value: 'Dock 3', label: 'certified autonomous UAV pilot' },
          { value: 'Certified', label: 'Public Safety Solutions Engineer' },
          { value: '100%', label: 'regulatory flight compliance' },
        ],
        palette: crimson,
        motif: 'agent',
      },
      {
        id: 'global-logistics-customs-hub',
        title: 'Global Logistics & Customs Hub',
        year: '2024',
        genre: 'Air & Sea Freight • SIRA & DCAA Clearance',
        logline: 'End-to-end import/export logistics and regulatory approvals covering SIRA, MOFA, MOIAT, DCAA, and GCAA for sensitive high-tech shipments.',
        stack: ['Customs Clearance (BOE)', 'HS Codes', 'SIRA & MOFA Approvals', 'DCAA / GCAA Clearance', 'Air & Sea Freight'],
        build: [
          'Managed Bill of Entry (BOE) preparation, value assessments, and customs clearances across Dubai mainland and Free Zone ports.',
          'Secured complex security clearances from SIRA, MOFA, and aviation regulators (DCAA/GCAA) with End-User Undertaking letters.',
        ],
        features: [
          'Comprehensive air & sea freight forwarding and route optimization',
          'Sensitive tech & UAV regulatory clearance with zero port delays',
          'Real-time inventory and delivery tracking through Odoo ERP',
          'Warehouse organization with dedicated high-security fragile goods zones',
        ],
        metrics: [
          { value: '5+ Agencies', label: 'cleared (SIRA, MOFA, DCAA, GCAA, MOIAT)' },
          { value: 'Zero Delay', label: 'customs clearance accuracy' },
          { value: 'Air & Sea', label: 'multi-modal freight forwarding' },
          { value: '100%', label: 'documentation and audit compliance' },
        ],
        palette: jade,
        motif: 'flow',
      },
    ],
    achievements: [
      {
        id: 'procurement-leadership',
        title: 'Head of Procurement',
        org: 'Technoai FZE LLC',
        detail: 'Directing a 6-member procurement unit achieving AED 20M in sales and winning 70–80% of semi-government tenders in Dubai.',
        laurel: 'AED 20M Leadership',
      },
      {
        id: 'dji-dock-cert',
        title: 'DJI Dock 3 Certified Specialist',
        org: 'DJI Enterprise / ASC Partner',
        detail: 'Official certification in autonomous drone dock operations, remote flight missions, and drone nest deployment.',
        laurel: 'Autonomous UAV Specialist',
      },
      {
        id: 'public-safety-engineer',
        title: 'Public Safety Solutions Engineer',
        org: 'Enterprise Drone Solutions',
        detail: 'Certified in public safety consultative solutions, thermal search & rescue, and aerial infrastructure inspections.',
        laurel: 'Solutions Engineer',
      },
      {
        id: 'uae-driving-license',
        title: 'Valid UAE Driving License & Residency',
        org: 'Dubai RTA / UAE Government',
        detail: 'Licensed driver in the UAE with complete mobility across Dubai and the Northern Emirates.',
        laurel: 'UAE Licensed',
      },
    ],
    certifications: [
      { issuer: 'DJI Enterprise', name: 'DJI Dock 3 Training Certificate' },
      { issuer: 'Enterprise Solutions', name: 'Public Safety Solutions Engineer' },
      { issuer: 'Government of Dubai / RTA', name: 'Valid UAE Driving License' },
      { issuer: 'UAE Authorities', name: 'UAE Verified Employment Visa' },
    ],
    skillCategories: [
      {
        id: 'procurement',
        title: 'Procurement & Strategic Sourcing',
        subtitle: 'Sourcing, Tenders & Supply Chain',
        skills: [
          { name: 'Strategic Sourcing', mono: 'SRC', note: 'Vetting' },
          { name: 'Semi-Gov Tenders', mono: 'TND', note: 'Dubai Gov' },
          { name: 'RFQ & RFP Operations', mono: 'RFQ', note: 'Bidding' },
          { name: 'Vendor Management', mono: 'VND', note: 'SLAs' },
          { name: 'Contract Negotiation', mono: 'CTR', note: 'Margins' },
          { name: 'Cost Control & POs', mono: 'CST', note: 'Budget' },
        ],
      },
      {
        id: 'drone-uav',
        title: 'Drone & UAV Operations',
        subtitle: 'DJI Enterprise & Flight Systems',
        skills: [
          { name: 'DJI Enterprise Drones', mono: 'DJI', note: 'Partner' },
          { name: 'DJI Dock 3 Certified', mono: 'DCK', note: 'Dock 3' },
          { name: 'Public Safety Solutions', mono: 'SAF', note: 'Security' },
          { name: 'Thermal & LiDAR Payloads', mono: 'PLD', note: 'Sensors' },
          { name: 'Flight Demos & Training', mono: 'DEM', note: 'Support' },
          { name: 'DCAA / GCAA Regulations', mono: 'AIR', note: 'Airspace' },
        ],
      },
      {
        id: 'logistics',
        title: 'Logistics & Customs Clearance',
        subtitle: 'Cross-Border Supply Chain',
        skills: [
          { name: 'Customs Clearance (BOE)', mono: 'BOE', note: 'Clearance' },
          { name: 'SIRA & MOFA Approvals', mono: 'SRA', note: 'SIRA / MOFA' },
          { name: 'DCAA & GCAA Clearance', mono: 'DCA', note: 'Permits' },
          { name: 'Air & Sea Freight', mono: 'FRT', note: 'Forwarding' },
          { name: 'Inventory & Warehousing', mono: 'INV', note: 'Stock' },
          { name: 'Import / Export Compliance', mono: 'TRD', note: 'Free Zone' },
        ],
      },
      {
        id: 'systems',
        title: 'Enterprise Systems & Software',
        subtitle: 'Tools & Technical Foundations',
        skills: [
          { name: 'Odoo Enterprise ERP', mono: 'ERP', note: 'Odoo' },
          { name: 'Advanced MS Excel', mono: 'XLS', note: 'Modeling' },
          { name: 'Basic 3D Blender', mono: 'BLN', note: '3D Content' },
          { name: 'CorelDRAW', mono: 'CDR', note: 'Vector' },
          { name: 'Windows Administration', mono: 'WIN', note: 'Sysadmin' },
          { name: 'Data Analysis & Audit', mono: 'AUD', note: 'Audits' },
        ],
      },
    ],
    skillEvidence: {
      'Strategic Sourcing': [
        'Directly managed AED 20M sales procurement operations with Dubai semi-government entities.',
        'Secured single largest tender of AED 3.5M with comprehensive supplier cost modeling.',
      ],
      'DJI Enterprise Drones': [
        'Served as authorized ASC Dealer Partner specialist for enterprise UAV positioning.',
        'Official DJI Dock 3 training and certified Public Safety Solutions Engineer.',
      ],
      'Customs Clearance (BOE)': [
        'Handled high-value import/export shipments with complete BOE, HS code, and End-User letter accuracy.',
        'Zero customs detention rate across SIRA, MOFA, DCAA, and GCAA regulated cargo.',
      ],
      'Odoo Enterprise ERP': [
        'End-to-end tracking of purchase requisitions, POs, vendor bills, and real-time inventory counts.',
      ],
    },
    seasons: [
      {
        number: 1,
        title: 'Technical Foundation & Computer Science',
        period: '2016 – 2020',
        synopsis: 'Building a rigorous grounding in computer science, data structures, and computer operations in Pakistan.',
        episodes: [
          {
            code: 'S01 E01',
            title: 'Computer Science Matriculation',
            description: 'Acquired foundational skills in data structures, algorithms, and technical problem-solving at Govt. High School Shujaabad.',
            tags: ['Computer Science', 'Data Structures', 'Foundations'],
            runtime: '2016 – 2018',
            palette: crimson,
          },
          {
            code: 'S01 E02',
            title: 'Intermediate in Computer Science',
            description: 'Advanced technical education at City H.S.S College Shujaabad, enhancing analytical thinking and software systems understanding.',
            tags: ['Analytical Thinking', 'Systems', 'Computer Science'],
            runtime: '2018 – 2020',
            palette: ocean,
          },
        ],
      },
      {
        number: 2,
        title: 'Dubai Entry & High-Precision Operations',
        period: '2022 – 2023',
        synopsis: 'Relocating to Dubai and executing data validation for AI systems and comprehensive warehouse inventory logistics.',
        episodes: [
          {
            code: 'S02 E01',
            title: 'Data Operations at Dukkantek',
            description: 'Auditing high-volume item datasets for computer vision models, managing project procurement, and cross-referencing commercial documents.',
            tags: ['Data Integrity', 'ML Datasets', 'Procurement Support'],
            runtime: 'Dec 2022 – Jul 2023',
            palette: violet,
          },
          {
            code: 'S02 E02',
            title: 'Warehouse & Inventory Mastery',
            description: 'Directing end-to-end inventory management and Odoo ERP tracking at City Commerce to maintain optimal stock levels.',
            tags: ['Inventory Management', 'Odoo ERP', 'Warehousing'],
            runtime: 'Aug 2023 – Dec 2023',
            palette: jade,
          },
        ],
      },
      {
        number: 3,
        title: 'DJI Enterprise UAV & Global Logistics',
        period: '2024 – 2025',
        synopsis: 'Pioneering DJI Enterprise drone sales, consultative engineering, and high-stakes customs clearance for Aerotel and Technoai.',
        episodes: [
          {
            code: 'S03 E01',
            title: 'Air & Sea Logistics Operations',
            description: 'Securing complex import/export documentation, Bills of Entry (BOE), and regulatory approvals at Aerotel FZCO.',
            tags: ['Customs Clearance', 'SIRA & MOFA', 'DCAA Approvals'],
            runtime: 'Feb 2024 – Feb 2025',
            palette: amber,
          },
          {
            code: 'S03 E02',
            title: 'DJI Enterprise UAV Specialist',
            description: 'Authorized ASC Dealer Partner operations: conducted enterprise client demos, public safety consultative solutions, and Dock 3 deployments.',
            tags: ['DJI Enterprise', 'Dock 3 Certified', 'Public Safety'],
            runtime: '2024 – 2025',
            palette: ocean,
          },
        ],
      },
      {
        number: 4,
        title: 'Head of Procurement & Semi-Gov Tenders',
        period: '2026 – Present',
        synopsis: 'Directing a 6-member procurement department at Technoai FZE LLC, achieving AED 20M in sales and 70-80% tender win rates.',
        episodes: [
          {
            code: 'S04 E01',
            title: 'Leading the Procurement Division',
            description: 'Managing end-to-end procurement cycles, supplier scorecards, and multi-million AED tender negotiations for semi-government clients in Dubai.',
            tags: ['AED 20M Sales', 'Tender Win Rate', 'Team Leadership'],
            runtime: 'June 2026 – Present',
            palette: jade,
          },
        ],
      },
    ],
    topPicks: [
      {
        label: 'TENDER ENGINE',
        title: 'AED 20M Sales & Tenders',
        detail: '70–80% semi-gov win rate in Dubai',
        palette: ocean,
      },
      {
        label: 'ENTERPRISE UAV',
        title: 'DJI Dock 3 Certified',
        detail: 'Enterprise UAV Pilot & Public Safety',
        palette: crimson,
      },
      {
        label: 'SUPPLY CHAIN',
        title: 'Customs & Logistics Hub',
        detail: 'SIRA, DCAA clearance & Odoo ERP',
        palette: jade,
      },
    ],
    introSlides: [
      {
        kicker: 'DUBAI, UAE',
        title: 'Muhammad Mubashir Muneer',
        lines: ['Head of Procurement & Certified Drone Pilot', 'Managing AED 20M sales cycles & semi-government tenders in Dubai.'],
        chips: ['Head of Procurement', 'DJI Enterprise Pilot', 'Dubai, UAE'],
      },
      {
        kicker: 'STRATEGIC SOURCING',
        title: '70%–80% Tender Win Rate',
        lines: ['Led procurement team of 6 with verified UAE experience.', 'Largest single tender won: AED 3.5M.'],
        chips: ['Semi-Gov Tenders', 'Odoo ERP', 'Vendor Sourcing'],
      },
      {
        kicker: 'ENTERPRISE UAV',
        title: 'DJI Dock 3 & Public Safety Engineer',
        lines: ['Authorized ASC Dealer Partner for DJI Enterprise.', 'Regulatory compliance across SIRA, MOFA, DCAA, and GCAA.'],
        chips: ['DJI Enterprise', 'Dock 3 Certified', 'Public Safety'],
      },
    ],
    order: ['about', 'originals', 'skills', 'picks', 'journey', 'moments', 'story'],
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

/** The profile a project belongs to (falls back to Basit). */
export function ownerOfProject(projectId: string): MemberProfile {
  return Object.values(memberProfiles).find((m) => m.projects.some((p) => p.id === projectId)) ?? memberProfiles.basit;
}

/** Resolve a project's video ids to the screenings they refer to. */
export function projectVideos(project: Project): Screening[] {
  const all = ownerOfProject(project.id).screenings?.flatMap((s) => s.videos) ?? [];
  return (project.videos ?? []).map((id) => all.find((v) => v.id === id)).filter((v): v is Screening => Boolean(v));
}
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
