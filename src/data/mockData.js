export const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $140,000',
    experience: 'Senior Level',
    category: 'Engineering',
    description: 'Looking for a React expert to lead our core product team.',
    requirements: ['5+ years React', 'Tailwind CSS', 'TypeScript', 'REST APIs'],
    status: 'ACTIVE',
    createdAt: '2026-09-01',
  },
  {
    id: 'job-2',
    title: 'Full Stack Java Engineer',
    company: 'CloudScale',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $150,000',
    experience: 'Mid-Senior Level',
    category: 'Engineering',
    description: 'Build microservices with Spring Boot and React dashboards.',
    requirements: ['Java Spring Boot', 'MySQL', 'React', 'Docker'],
    status: 'ACTIVE',
    createdAt: '2026-09-05',
  },
];

export const DEMO_USERS = {
  candidate: { id: 'usr-1', name: 'Alex Candidate', email: 'candidate@talentbridge.com', role: 'CANDIDATE' },
  recruiter: { id: 'usr-2', name: 'Sarah Recruiter', email: 'recruiter@talentbridge.com', role: 'RECRUITER', companyId: 'comp-1' },
  admin: { id: 'usr-3', name: 'Jordan Admin', email: 'admin@talentbridge.com', role: 'ADMIN' },
};