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
    role: 'Full Stack & AI Systems Developer',
    company: 'Open-Source & Freelance Engineering',
    type: 'Freelance',
    duration: '2024 - Present',
    description: [
      'Architecting high-performance responsive web applications, refining end-to-end frontend and backend frameworks.',
      'Implementing autonomous multi-agent networks, vector embeddings, and LLM orchestration layers for intelligent software systems.',
      'Deploying serverless cloud architectures, automated workflows, and high-concurrency database schemas.'
    ],
    skills: ['Web Development', 'Artificial Intelligence', 'React', 'Node.js', 'Python']
  },
  {
    id: 'exp-2',
    role: 'Growth & Search Engine Optimizer',
    company: 'Strategic Consulting & Growth Experiments',
    type: 'Freelance',
    duration: '2025 - Present',
    description: [
      'Formulating advanced SEO blueprints, organic site authority structures, and search algorithm optimization tactics.',
      'Engineering automated outreach strategies, analytics tracking parameters, and high-conversion landing funnels.',
      'Integrating growth metrics and performance analytics directly into web architectures for measurable traffic development.'
    ],
    skills: ['Digital Marketing', 'SEO', 'Web Development']
  },
  {
    id: 'exp-3',
    role: 'B.E. Computer Science & Engineering (L3)',
    company: 'Jaya Engineering College',
    type: 'Education',
    duration: '2024 – 2028 (Expected)',
    description: [
      'Pursuing a Bachelor of Engineering in Computer Science, focusing on object-oriented architectures, compiler logic, and database design.',
      'Specializing in Artificial Intelligence modules, full-stack frameworks, and algorithm design.',
      'Applying theoretical data structures, memory management models, and discrete math algorithms to practical software builds.'
    ],
    skills: ['Python', 'JavaScript', 'HTML & CSS', 'Machine Learning']
  }
];

export default experience;
