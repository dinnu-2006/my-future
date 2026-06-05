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
    description: 'Completed comprehensive systems training on python automation, data structures, and object-oriented programming methodologies through the formal AD141 track.',
    category: 'certification',
    date: 'December 2024',
    valueBadge: 'Red Hat',
    credentialUrl: 'https://drive.google.com/file/d/1B5QOZ0Fe5SIQFjosk8q2RD1gRLuGa_9x/view?usp=drive_link'
  },
  {
    id: 'cert-2',
    title: 'Digital Skills Certification',
    event: 'Microsoft × Tamil Nadu Skill Development Corporation (Naan Mudhalvan Program)',
    description: 'Acquired advanced developer competencies, cloud-native workflow integration paradigms, and development best practices under Microsoft joint initiative.',
    category: 'certification',
    date: 'November 2025',
    valueBadge: 'Microsoft × TNSDC',
    credentialUrl: 'https://drive.google.com/file/d/1jRPLOBdDJ6I-10vwolsdWLlTnlhlPXjj/view?usp=drive_link'
  }
];

export default achievements;
