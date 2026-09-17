const JOBS_STORAGE_KEY = "tb_jobs";
const APPLICATIONS_STORAGE_KEY = "tb_applications";

// Seed Jobs Data
const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "TechCorp Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $155,000",
    description:
      "Lead our frontend team building high-performance React applications with Tailwind CSS and modern state management.",
    postedDate: "2 days ago",
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    company: "Innovate Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $140,000",
    description:
      "Build scalable web tools using Node.js, Express, and React. Work on cutting-edge features end-to-end.",
    postedDate: "5 days ago",
  },
  {
    id: "job-3",
    title: "UI/UX Product Designer",
    company: "PixelCraft Studio",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$110,000 - $135,000",
    description:
      "Design intuitive user journeys, interactive prototypes, and scalable component systems for modern enterprise web apps.",
    postedDate: "1 week ago",
  },
];

// Seed Applications Data
const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer",
    company: "TechCorp Solutions",
    candidateName: "Alex Morgan",
    candidateEmail: "alex.morgan@example.com",
    stage: "Interview",
    appliedDate: "Sep 10, 2026",
    resumeName: "Alex_Morgan_Resume.pdf",
    coverLetter:
      "Excited about scaling React architectures and building intuitive SaaS products.",
    rating: "4.8",
  },
  {
    id: "app-2",
    jobId: "job-2",
    jobTitle: "Full Stack Developer",
    company: "Innovate Labs",
    candidateName: "Sarah Chen",
    candidateEmail: "sarah.chen@example.com",
    stage: "Screening",
    appliedDate: "Sep 12, 2026",
    resumeName: "Sarah_Chen_Dev.pdf",
    coverLetter:
      "Strong background in Node.js microservices and full-stack API integration.",
    rating: "4.6",
  },
];

/**
 * Helper to simulate asynchronous API calls
 */
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const jobService = {
  // ==================== JOBS API ==================== //

  /**
   * Fetch all open job listings
   */
  async getJobs() {
    await delay();
    const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
    if (!storedJobs) {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(storedJobs);
  },

  /**
   * Post a new open role (Admin)
   */
  async createJob(jobData) {
    await delay();
    const jobs = await this.getJobs();
    const newJob = {
      id: `job-${Date.now()}`,
      postedDate: "Just now",
      ...jobData,
    };
    const updatedJobs = [newJob, ...jobs];
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updatedJobs));
    return newJob;
  },

  // ==================== APPLICATIONS API ==================== //

  /**
   * Fetch all applicant entries
   */
  async getApplications() {
    await delay();
    const storedApps = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!storedApps) {
      localStorage.setItem(
        APPLICATIONS_STORAGE_KEY,
        JSON.stringify(INITIAL_APPLICATIONS),
      );
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(storedApps);
  },

  /**
   * Submit a candidate application modal form
   */
  async submitApplication(applicationData) {
    await delay();
    const applications = await this.getApplications();
    const newApplication = {
      id: `app-${Date.now()}`,
      stage: "Applied",
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      rating: "4.5",
      ...applicationData,
    };
    const updatedApps = [newApplication, ...applications];
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updatedApps));
    return newApplication;
  },

  /**
   * Update candidate stage on Kanban pipeline (Recruiter)
   */
  async updateApplicationStatus(applicationId, newStage) {
    await delay();
    const applications = await this.getApplications();
    const updatedApps = applications.map((app) =>
      app.id === applicationId ? { ...app, stage: newStage } : app,
    );
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updatedApps));
    return updatedApps.find((app) => app.id === applicationId);
  },
};
