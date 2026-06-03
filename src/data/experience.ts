export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: 'Education' | 'Internship' | 'Freelance' | 'Startup' | 'Certification';
  duration: string;
  description: string[];
  skills: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Co-Founder & Lead AI Engineer',
    company: 'Synapse Core Automations (Stealth Builder)',
    type: 'Startup',
    duration: 'Jan 2026 - Present',
    description: [
      'Architected semantic parsing nodes that automatically extract key entities from contract PDFs.',
      'Deployed production n8n workflows that save early-stage clients 10-18 operational hours weekly.',
      'Managed full client relations, delivering custom cognitive agents under tight timelines.'
    ],
    skills: ['LangChain', 'Python', 'n8n', 'Next.js', 'PostgreSQL']
  },
  {
    id: 'exp-2',
    role: 'AI Research & Engineering Intern',
    company: 'Aura AI Solutions Group',
    type: 'Internship',
    duration: 'Nov 2025 - Feb 2026',
    description: [
      'Benchmarked embedding models to identify optimal vectors for high-recall document chats.',
      'Constructed modular Express APIs connecting proprietary agent scripts to a React frontend.',
      'Implemented automated regression tests for LLM outputs using guardrails.'
    ],
    skills: ['Node.js', 'OpenAI API', 'Vector DBs', 'TypeScript', 'Jest']
  },
  {
    id: 'exp-3',
    role: 'Freelance Automation Specialist',
    company: 'Self-Employed (Digital Platforms)',
    type: 'Freelance',
    duration: 'May 2025 - Present',
    description: [
      'Developed custom Google Sheets scraping automations and automated calendar bookers.',
      'Advised local business networks on organic Google Search SEO strategies, yielding 80%+ traffic bumps.',
      'Crafted high-fidelity Framer landing pages converting over 15% of inbound visitors.'
    ],
    skills: ['Zapier', 'SEO Auditing', 'Content Growth', 'Make.com', 'Framer']
  },
  {
    id: 'exp-4',
    role: 'B.Tech in Computer Science Engineering (3rd Year)',
    company: 'State Technical University',
    type: 'Education',
    duration: '2023 - 2027 (Expected)',
    description: [
      'Specializing in Artificial Intelligence and Machine Learning paradigms.',
      'CGPA: 9.1/10 (Top 5% of Department).',
      'Relevant Coursework: Design and Analysis of Algorithms, Databases, Neural Networks, Soft Computing.'
    ],
    skills: ['Data Structures', 'Database Systems', 'Neural Networks', 'Python']
  }
];

export default experience;
