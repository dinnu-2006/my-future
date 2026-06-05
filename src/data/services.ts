export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string; // Lucide icon identifier
}

export const services: ServiceItem[] = [
  {
    id: 'ai-dev',
    title: 'Intelligent AI Agent Architectures',
    description: 'Deploying autonomous multi-agent networks, high-fidelity retrieval-augmented generation (RAG) databases, and structured semantic memory engines.',
    price: 'Coming in Future',
    features: [
      'Vector Embeddings & Semantic DB Architecting',
      'Multi-LLM Integration (GPT-4o, Claude, Gemini)',
      'Stateful Session & Context Retention Networks',
      'Omnichannel Web & Workspace Deployment'
    ],
    icon: 'Cpu'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Cloud & SaaS Architectures',
    description: 'Engineering responsive, high-throughput cloud portals, secure multi-tenant interfaces, and serverless API backends.',
    price: '50-5000$',
    features: [
      'Next.js App Router & React Server Components',
      'High-Fidelity Responsive Fluid Layouts',
      'PostgreSQL, Prisma, & Database Cluster Tuning',
      'Stripe Billing Tunnels & Unified Auth Protocols'
    ],
    icon: 'Globe'
  },
  {
    id: 'automation',
    title: 'Autonomous Workflow Pipelines',
    description: 'Eliminating repetitive operations by building robust visual scripts, self-correcting data pipelines, and database sync workers.',
    price: 'Coming in Future',
    features: [
      'n8n & Enterprise Automation Pipelines',
      'Intelligent Machine-Guided Lead Scoring',
      'Context-Aware Programmatic Email Funnels',
      'High-Reliability Webhook & API Synchronization'
    ],
    icon: 'GitFork'
  },
  {
    id: 'marketing-seo',
    title: 'SEO Engineering & Growth Mechanics',
    description: 'Deploying organic crawler optimization blueprints, programmatic keyword ranking models, and page-speed latency reductions.',
    price: 'Coming in Future',
    features: [
      'Technical Search Indexing & Crawler Audits',
      'Data-Driven High-Intent Keyword Audits',
      'Unified Search Console & Analytics Portals',
      'Conversion Rate Optimization & Funnel Tuning'
    ],
    icon: 'TrendingUp'
  }
];

export default services;
