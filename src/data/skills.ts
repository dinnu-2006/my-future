import { Skill } from '@/types/skill';

export const skills: Skill[] = [
  // AI
  { name: 'Python', category: 'ai', level: 95 },
  { name: 'Machine Learning', category: 'ai', level: 90 },
  { name: 'Deep Learning', category: 'ai', level: 85 },
  { name: 'OpenAI APIs', category: 'ai', level: 95 },
  { name: 'LangChain', category: 'ai', level: 90 },
  { name: 'TensorFlow', category: 'ai', level: 80 },
  { name: 'PyTorch', category: 'ai', level: 82 },

  // Frontend
  { name: 'HTML & CSS', category: 'frontend', level: 95 },
  { name: 'JavaScript', category: 'frontend', level: 92 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'React', category: 'frontend', level: 94 },
  { name: 'Next.js', category: 'frontend', level: 95 },
  { name: 'Tailwind CSS', category: 'frontend', level: 96 },

  // Backend
  { name: 'Node.js', category: 'backend', level: 88 },
  { name: 'Express.js', category: 'backend', level: 90 },
  { name: 'MongoDB', category: 'backend', level: 85 },
  { name: 'PostgreSQL', category: 'backend', level: 87 },
  { name: 'REST APIs', category: 'backend', level: 92 },

  // Marketing
  { name: 'SEO Optimization', category: 'marketing', level: 90 },
  { name: 'Content Marketing', category: 'marketing', level: 85 },
  { name: 'Google Analytics', category: 'marketing', level: 88 },
  { name: 'Growth Hacking', category: 'marketing', level: 84 },

  // Automation
  { name: 'n8n Workflows', category: 'automation', level: 94 },
  { name: 'Zapier Integrations', category: 'automation', level: 92 },
  { name: 'Make.com Pipelines', category: 'automation', level: 88 },
  { name: 'AI Automations', category: 'automation', level: 95 }
];

export default skills;
