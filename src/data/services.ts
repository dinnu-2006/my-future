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
    title: 'AI Development & Chatbots',
    description: 'Custom cognitive agents, LLM integrations, retrieval-augmented generation (RAG) pipelines, and intelligent customer support chatbots.',
    price: 'Starting at $1,200',
    features: [
      'Semantic Search & Vector DB Setup',
      'OpenAI / Anthropic API Integration',
      'Context Retention / Memory Engine',
      'Deploy to Web, Slack, or Discord'
    ],
    icon: 'Cpu'
  },
  {
    id: 'fullstack',
    title: 'Full Stack SaaS Development',
    description: 'Beautiful, high-conversion web applications built from scratch using Next.js 15, React, and serverless architectures.',
    price: 'Starting at $2,000',
    features: [
      'Next.js SSR & Server Components',
      'Tailwind CSS Responsive Design',
      'Database Modeling & PostgreSQL',
      'Stripe Payments & Auth Integration'
    ],
    icon: 'Globe'
  },
  {
    id: 'automation',
    title: 'AI Workflow Automation',
    description: 'Replacing manual data tasks with visual workflow builders, lead qualifiers, scheduling processes, and email sequences.',
    price: 'Starting at $800',
    features: [
      'n8n & Zapier Custom Pipelines',
      'Automated Lead Qualification',
      'Holographic Email Sequencing',
      'API Webhooks Syncing'
    ],
    icon: 'GitFork'
  },
  {
    id: 'marketing-seo',
    title: 'Growth Marketing & SEO',
    description: 'Aggressive organic keyword targeting, domain authority indexing, technical site audits, and conversion rate optimization (CRO).',
    price: 'Starting at $600',
    features: [
      'On-Page & Technical SEO Audits',
      'High-Intent Keyword Research',
      'Google GSC Analytics Setup',
      'Conversion Funnel Optimization'
    ],
    icon: 'TrendingUp'
  }
];

export default services;
