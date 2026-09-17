export const ROLES = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
};

export const DEMO_USERS = {
  candidate: {
    id: "u-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: ROLES.CANDIDATE,
  },
  recruiter: {
    id: "u-2",
    name: "Sarah Tech Recruiter",
    email: "sarah@recruiter.com",
    role: ROLES.RECRUITER,
  },
  admin: {
    id: "u-3",
    name: "System Admin",
    email: "admin@talentbridge.com",
    role: ROLES.ADMIN,
  },
};
