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
    id: 'cert-1',
    title: 'Introduction to Python Programming (AD141)',
    event: 'Red Hat Training',
    description: 'Mastered foundational Python syntax, data types, control flow structures, and core programming paradigms through the AD141 curriculum.',
    category: 'certification',
    date: 'December 2024',
    valueBadge: 'Red Hat',
    credentialUrl: 'https://drive.google.com/file/d/1B5QOZ0Fe5SIQFjosk8q2RD1gRLuGa_9x/view?usp=drive_link'
  },
  {
    id: 'cert-2',
    title: 'Digital Skills Certification',
    event: 'Microsoft × Tamil Nadu Skill Development Corporation (Naan Mudhalvan Program)',
    description: 'Acquired essential digital and developer competencies under the Naan Mudhalvan joint skill development initiative by Microsoft and TNSDC.',
    category: 'certification',
    date: 'November 2025',
    valueBadge: 'Microsoft × TNSDC',
    credentialUrl: 'https://drive.google.com/file/d/1jRPLOBdDJ6I-10vwolsdWLlTnlhlPXjj/view?usp=drive_link'
  }
];

export default achievements;
