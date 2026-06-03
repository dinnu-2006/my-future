import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'synapse-agent',
    title: 'Synapse Core: Cognitive LLM Agent',
    description: 'A multi-agent autonomous framework utilizing semantic chunking, vectors, and hierarchical planning to automate developer operations.',
    category: 'ai',
    tags: ['Next.js', 'Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
    github: 'https://github.com/placeholder/synapse-core',
    demo: 'https://synapse-demo.placeholder.dev',
    performance: 98,
    timeline: 'Q1 2026',
    metrics: [
      { label: 'Latency Red.', value: '-42%' },
      { label: 'Task Success Rate', value: '94.8%' },
      { label: 'Cost Savings', value: '60%' }
    ],
    caseStudy: {
      problem: 'Autonomous developer agents often get stuck in infinite loops, waste API credits, and suffer from shallow context retention when processing complex, multi-directory engineering codebases.',
      solution: 'Developed Synapse Core, a hierarchical task-planning agent. It breaks down complex targets into atomic sub-tasks, utilizes a vector DB for contextual codebase indexing, and performs feedback-guided self-correction before returning results.',
      results: [
        'Reduced code generation loops by 80% through self-healing feedback mechanisms.',
        'Improved semantic recall accuracy using dynamic overlap chunking.',
        'Successfully deployed inside 3 test startups to automate basic git ticket resolution.'
      ]
    }
  },
  {
    id: 'nexus-saas',
    title: 'Nexus: High-Fidelity SaaS Platform',
    description: 'An enterprise SaaS boiler system featuring sub-billing, real-time analytics graphs, and fully customizable dashboard panels.',
    category: 'fullstack',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Stripe'],
    github: 'https://github.com/placeholder/nexus-saas',
    demo: 'https://nexus-saas.placeholder.dev',
    performance: 99,
    timeline: 'Q4 2025',
    metrics: [
      { label: 'Lighthouse Perf.', value: '100%' },
      { label: 'Checkout Conv.', value: '+18%' },
      { label: 'Active Users', value: '1.2k' }
    ],
    caseStudy: {
      problem: 'Typical React boilerplate products load slow, suffer from poor layout shifts during hydration, and lack complete multi-tenant sub-billing frameworks, causing launch delays.',
      solution: 'Created Nexus, a highly optimized Server Components template using Next.js 15. Included Stripe billing tunnels, multi-tenant middleware, and shadcn-inspired glass dashboard panels pre-optimized for mobile layouts.',
      results: [
        'Achieved a perfect 100/100 Lighthouse performance rating by aggressive bundle splitting.',
        'Fully integrated robust webhooks handling for frictionless checkout registration.',
        'Reduced client dashboard loading state flash using React Suspense skeletons.'
      ]
    }
  },
  {
    id: 'flow-automation',
    title: 'AuraFlow: Omnichannel Automation System',
    description: 'Advanced lead enrichment and social publishing pipelines connecting n8n, custom web scrapers, and Slack workspaces.',
    category: 'automation',
    tags: ['n8n', 'Zapier', 'Make', 'Node.js', 'Puppeteer', 'Slack API'],
    github: 'https://github.com/placeholder/auraflow',
    performance: 95,
    timeline: 'Q2 2025',
    metrics: [
      { label: 'Leads Enriched', value: '25k+' },
      { label: 'Weekly Hours Saved', value: '18 hrs' },
      { label: 'Data Accuracy', value: '99.1%' }
    ],
    caseStudy: {
      problem: 'A marketing consultancy was manually scanning local business directory files, resolving contacts via search engines, and typing up email pitches, spending over 20 hours a week on repetitive labor.',
      solution: 'Engineered a multi-stage n8n pipeline. The system listens for new additions, uses Puppeteer to search for contact email networks, classifies business niches using OpenAI GPT-4o, and queues hyper-personalized templates directly in their email pipeline.',
      results: [
        'Automated the lead-generation funnel completely, requiring zero human operations.',
        'Enriched over 25,000 leads with highly accurate email, social handles, and site tech stacks.',
        'Boosted email outreach reply rates by 220% due to contextual OpenAI micro-personalization.'
      ]
    }
  },
  {
    id: 'optima-seo',
    title: 'Optima: AI Organic Traffic Engine',
    description: 'An analytics portal that scans keyword opportunities, computes SERP ranking difficulty, and writes SEO-optimized copy drafts.',
    category: 'marketing',
    tags: ['React', 'Next.js', 'Google Search Console API', 'Python', 'SEO', 'LangChain'],
    github: 'https://github.com/placeholder/optima-seo',
    demo: 'https://optima-seo.placeholder.dev',
    performance: 96,
    timeline: 'Q3 2025',
    metrics: [
      { label: 'Organic Traffic', value: '+340%' },
      { label: 'Keywords Ranked', value: '450+' },
      { label: 'Domain Authority', value: '24 → 38' }
    ],
    caseStudy: {
      problem: 'Acquiring organic traffic is slow and manual, requiring extensive keyword analysis, competitor content auditing, and editing structures to hit search intent.',
      solution: 'Built Optima, a SEO suite that pulls real-time keyword rankings from the Google Search Console API. It compares page indexes against the top 10 search results, maps semantically missing entities, and suggests optimized drafts.',
      results: [
        'Helped an e-commerce brand boost organic search traffic by 340% within 4 months.',
        'Indexed over 450 competitive high-intent buyer terms on Google\'s front page.',
        'Created a dynamic site auditor that isolates internal indexing errors instantly.'
      ]
    }
  }
];

export default projects;
