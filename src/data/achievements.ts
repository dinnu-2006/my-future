export interface Achievement {
  id: string;
  title: string;
  event: string;
  description: string;
  category: 'certification' | 'hackathon' | 'competition' | 'internship' | 'award' | 'milestone';
  date: string;
  credentialUrl?: string;
  valueBadge?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'hack-1',
    title: '1st Place Winner',
    event: 'National AI Frontier Hackathon 2026',
    description: 'Built an autonomous AI legal agent that parses complex contract filings and flags high-risk boilerplate clauses automatically.',
    category: 'hackathon',
    date: 'March 2026',
    valueBadge: 'Winner'
  },
  {
    id: 'cert-1',
    title: 'Deep Learning Specialization',
    event: 'DeepLearning.AI / Coursera',
    description: 'Five-course series covering convolutional networks, sequence models (RNNs/LSTMs), transformers, and hyperparameter tuning.',
    category: 'certification',
    date: 'January 2026',
    credentialUrl: 'https://coursera.org/verify/placeholder'
  },
  {
    id: 'intern-1',
    title: 'AI Engineering Intern',
    event: 'Aura AI Startups Inc.',
    description: 'Integrated custom LLM agents into an n8n dashboard pipeline, reducing business onboarding time by 35%.',
    category: 'internship',
    date: 'Nov 2025 - Feb 2026',
    valueBadge: 'Industry Experience'
  },
  {
    id: 'comp-1',
    title: 'Global Top 5% Ranker',
    event: 'Kaggle Machine Learning Cup 2025',
    description: 'Optimized gradient boosted ensembles (XGBoost/LightGBM) to forecast pricing dynamics across global supply chain networks.',
    category: 'competition',
    date: 'September 2025',
    valueBadge: 'Top 5%'
  },
  {
    id: 'award-1',
    title: 'Future Tech Founder Grant',
    event: 'Venture Capital Startup Accelerator Hub',
    description: 'Awarded equity-free bootstrap funding of $5,000 to construct an MVP for cognitive AI operations pipelines.',
    category: 'award',
    date: 'June 2025',
    valueBadge: '$5,000 Grant'
  },
  {
    id: 'milestone-1',
    title: 'Open Source Core Contributor',
    event: 'LangChain Community Project',
    description: 'Contributed structured output extraction templates and custom integrations for serverless vector indexes.',
    category: 'milestone',
    date: 'Ongoing'
  }
];

export default achievements;
