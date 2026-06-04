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
    role: 'Web Development & AI Enthusiast',
    company: 'Independent Study & Projects',
    type: 'Freelance',
    duration: '2024 - Present',
    description: [
      'Developing responsive web applications and continuously improving frontend and backend development skills.',
      'Exploring AI concepts and machine learning fundamentals through personal projects and hands-on practice.',
      'Currently learning AI development and modern software technologies.'
    ],
    skills: ['Web Development', 'Artificial Intelligence', 'React', 'Node.js', 'Python']
  },
  {
    id: 'exp-2',
    role: 'Digital Marketing Learner',
    company: 'Self-Directed',
    type: 'Freelance',
    duration: '2025 - Present',
    description: [
      'Understanding SEO, content marketing, and online brand growth fundamentals.',
      'Exploring digital marketing strategies and audience engagement techniques.',
      'Applying marketing concepts while building personal and portfolio projects.'
    ],
    skills: ['Digital Marketing', 'SEO', 'Web Development']
  },
  {
    id: 'exp-3',
    role: 'B.E. Computer Science Engineering (3rd Year)',
    company: 'Jaya Engineering College',
    type: 'Education',
    duration: '2024 – 2028 (Expected)',
    description: [
      'Currently pursuing Bachelor of Engineering in Computer Science Engineering.',
      'Interested in Artificial Intelligence, Web Development, and Software Engineering.',
      'Continuously learning modern technologies through projects and self-study.'
    ],
    skills: ['Python', 'JavaScript', 'HTML & CSS', 'Machine Learning']
  }
];

export default experience;
