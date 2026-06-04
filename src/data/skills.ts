import { Skill } from '@/types/skill';

export const skills: Skill[] = [
  // AI
  { name: 'Python', category: 'ai', level: 95 },
  { name: 'Artificial Intelligence', category: 'ai', level: 90 },
  { name: 'Machine Learning', category: 'ai', level: 85 },

  // Frontend
  { name: 'JavaScript', category: 'frontend', level: 92 },
  { name: 'HTML & CSS', category: 'frontend', level: 95 },
  { name: 'React', category: 'frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'frontend', level: 92 },
  { name: 'Web Development', category: 'frontend', level: 94 },

  // Backend
  { name: 'Node.js', category: 'backend', level: 88 },
  { name: 'Express.js', category: 'backend', level: 85 },
  { name: 'MongoDB', category: 'backend', level: 82 },

  // Marketing
  { name: 'Digital Marketing', category: 'marketing', level: 88 }
];

export default skills;
