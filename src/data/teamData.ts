export interface TeamMember {
  name: string;
  role: string;
  category: 'faculty' | 'office-bearer' | 'technical' | 'creative';
  imageUrl?: string;
  linkedin?: string;
}

// ==========================================
// 2025-26 TEAM (Current)
// ==========================================

export const facultyMembers: TeamMember[] = [
  {
    name: 'Prof. Arvinder Kaur',
    role: 'Faculty Coordinator',
    category: 'faculty',
    imageUrl: '/team/ARVINDER KAUR.webp',
    linkedin: 'https://www.linkedin.com/in/arvinder-kaur-37b09a62/'
  },
  {
    name: 'Dr. Rahul Johari',
    role: 'Faculty Sponsor',
    category: 'faculty',
    imageUrl: '/team/DR RAHUL JOHARI.webp',
    linkedin: 'https://www.linkedin.com/in/rahuljohari7/'
  },
];

export const officeBearers: TeamMember[] = [
  {
    name: 'Shivam',
    role: 'Chair',
    category: 'office-bearer',
    imageUrl: '/team/shivam Sharma.webp',
    linkedin: 'https://www.linkedin.com/in/shivam-sharma-n7/'
  },
  {
    name: 'Sheelendra',
    role: 'Vice Chair',
    category: 'office-bearer',
    imageUrl: '/team/sheelendra.webp',
    linkedin: 'https://www.linkedin.com/in/sheelendra--'
  },
  {
    name: 'Arsh Ahmad',
    role: 'Secretary',
    category: 'office-bearer',
    imageUrl: '/team/arsh.webp',
    linkedin: 'https://www.linkedin.com/in/arsh-ahmad/'
  },
  {
    name: 'Prabhakar',
    role: 'Treasurer',
    category: 'office-bearer',
    imageUrl: '/team/prabhakar.webp',
    linkedin: 'https://www.linkedin.com/in/prabhakar-jangid-23505a285/'
  },
  {
    name: 'Aniket Kumar',
    role: 'Membership Chair',
    category: 'office-bearer',
    imageUrl: '/team/aniket.webp',
    linkedin: 'https://www.linkedin.com/in/aniket-kumar-775933302/'
  },
  {
    name: 'Abhijith KS',
    role: 'Web Master',
    category: 'office-bearer',
    imageUrl: '/team/abhijeet.webp',
    linkedin: 'https://www.linkedin.com/in/abhijith-ks-8b8290207/'
  },
];

export const technicalTeam: TeamMember[] = [
  {
    name: 'Shantanu Ojha',
    role: 'ML Captain',
    category: 'technical',
    imageUrl: '/team/shantanu.webp',
    linkedin: 'https://www.linkedin.com/in/santanu-ojha-a52354292/'
  },
  {
    name: 'Ritwik Mittal',
    role: 'DSA Captain',
    category: 'technical',
    imageUrl: '/team/ritwik.webp',
    linkedin: 'https://www.linkedin.com/in/ritwikmittal/'
  },
  {
    name: 'To Be Announced',
    role: 'Web Captain',
    category: 'technical',
    imageUrl: '/team/no-image.webp',
  },
  {
    name: 'To Be Announced',
    role: 'Operations Lead',
    category: 'technical',
    imageUrl: '/team/no-image.webp',
  },
];

export const creativeTeam: TeamMember[] = [
  {
    name: 'Utkarsh Yadav',
    role: 'Design Captain',
    category: 'creative',
    imageUrl: '/team/utkarsh.webp',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Shanvi Gulia',
    role: 'Content Captain',
    category: 'creative',
    imageUrl: '/team/shanvi.webp',
    linkedin: 'https://www.linkedin.com/in/shanvi-gulia-7912a9275'
  },
  {
    name: 'To Be Announced',
    role: 'UI/UX Captain',
    category: 'creative',
    imageUrl: '/team/no-image.webp',
  },
  {
    name: 'To Be Announced',
    role: 'Video & Photography',
    category: 'creative',
    imageUrl: '/team/no-image.webp',
  },
  {
    name: 'To Be Announced',
    role: 'Marketing & PR',
    category: 'creative',
    imageUrl: '/team/no-image.webp',
  },
];

// ==========================================
// 2024-25 TEAM (Past/Founding Team)
// ==========================================

export const facultyMembers2024: TeamMember[] = [
  {
    name: 'Prof. Arvinder Kaur',
    role: 'Faculty Coordinator',
    category: 'faculty',
    imageUrl: '/team/ARVINDER KAUR.webp',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Dr. Rahul Johari',
    role: 'Faculty Sponsor',
    category: 'faculty',
    imageUrl: '/team/DR RAHUL JOHARI.webp',
    linkedin: 'https://linkedin.com'
  },
];

export const officeBearers2024: TeamMember[] = [
  {
    name: 'Aditya Kumar',
    role: 'Chair',
    category: 'office-bearer',
    imageUrl: '/team/aditya kumar.webp',
    linkedin: 'https://www.linkedin.com/in/aditya-kumar0612/'
  },
  {
    name: 'Durga Sharma',
    role: 'Vice Chair',
    category: 'office-bearer',
    imageUrl: '/team/durga.webp',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Chirag Khanna',
    role: 'Secretary',
    category: 'office-bearer',
    imageUrl: '/team/chirag.webp',
    linkedin: 'https://www.linkedin.com/in/chiragkhanna16/'
  },
  {
    name: 'Ushnik Nath',
    role: 'Treasurer',
    category: 'office-bearer',
    imageUrl: '/team/ushnik nath.webp',
    linkedin: 'https://www.linkedin.com/in/ushnik-nath/'
  },
  {
    name: 'Sheelendra',
    role: 'Membership Chair',
    category: 'office-bearer',
    imageUrl: '/team/sheelendra.webp',
    linkedin: 'https://www.linkedin.com/in/sheelendra--'
  },
  {
    name: 'Shivam',
    role: 'Web Master',
    category: 'office-bearer',
    imageUrl: '/team/shivam Sharma.webp',
    linkedin: 'https://www.linkedin.com/in/shivam-sharma-n7/'
  },
];

export const technicalTeam2024: TeamMember[] = [];

export const creativeTeam2024: TeamMember[] = [];

// ==========================================
// TEAM DATA BY YEAR
// ==========================================

export type TeamYear = '2024-25' | '2025-26';

export const teamDataByYear = {
  '2024-25': {
    faculty: facultyMembers2024,
    officeBearers: officeBearers2024,
    technical: technicalTeam2024,
    creative: creativeTeam2024,
  },
  '2025-26': {
    faculty: facultyMembers,
    officeBearers: officeBearers,
    technical: technicalTeam,
    creative: creativeTeam,
  },
};
