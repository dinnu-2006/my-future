export interface Skill {
  name: string;
  category: 'ai' | 'frontend' | 'backend' | 'marketing' | 'automation';
  level: number; // 0-100 proficiency
}
