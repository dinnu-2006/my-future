export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'ai' | 'fullstack' | 'automation' | 'marketing';
  tags: string[];
  github: string;
  demo?: string;
  metrics: { label: string; value: string }[];
  performance: number; // 0-100 index
  timeline: string;
  caseStudy?: {
    problem: string;
    solution: string;
    results: string[];
  };
}
