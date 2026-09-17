import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UsersIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

// Extended Mock Dataset with Candidates & Applicants
const mockJobs = [
  {
    id: 1,
    title: "Sr. Frontend Developer",
    company: "TechCorp Solutions",
    poster: "Sarah Jenkins",
    date: "2026-09-11",
    status: "Pending",
    salary: "$140,000 - $165,000",
    location: "Remote (US/Canada)",
    description:
      "Looking for a React + TypeScript expert to lead our dashboard architecture modernizations.",
    applicantsCount: 14,
  },
  {
    id: 2,
    title: "Full Stack Java Engineer",
    company: "CloudScale Inc",
    poster: "Michael Green",
    date: "2026-09-10",
    status: "Pending",
    salary: "$130,000 - $150,000",
    location: "Austin, TX (Hybrid)",
    description:
      "Building microservices infrastructure using Spring Boot, Kafka, and PostgreSQL.",
    applicantsCount: 8,
  },
  {
    id: 3,
    title: "Lead UX/UI Designer",
    company: "Creative Solutions Studio",
    poster: "Emily Lawson",
    date: "2026-09-12",
    status: "Active",
    salary: "$120,000 - $140,000",
    location: "New York, NY",
    description:
      "Lead design systems across web and mobile surfaces for enterprise SaaS products.",
    applicantsCount: 22,
  },
  {
    id: 4,
    title: "Machine Learning Intern",
    company: "AI Innovations Lab",
    poster: "David Wright",
    date: "2026-09-09",
    status: "Rejected",
    rejectionReason:
      "Job description lacks clear mentorship roadmap and wage details.",
    salary: "$45/hr",
    location: "San Francisco, CA",
    description:
      "Assisting in training LLM pipelines and fine-tuning datasets.",
    applicantsCount: 31,
  },
];

const mockCandidates = [
  {
    id: 101,
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    phone: "+1 (555) 382-9102",
    role: "Candidate",
    title: "Senior Frontend Engineer",
    appliedJob: "Sr. Frontend Developer",
    companyApplied: "TechCorp Solutions",
    experience: "6 Years",
    education: "B.S. Computer Science, Stanford University",
    skills: ["React", "TypeScript", "TailwindCSS", "GraphQL", "Next.js"],
    status: "In Review",
    summary:
      "Passionate UI engineer with 6+ years experience shipping performant web applications and design systems at scale.",
    matchScore: "94%",
  },
  {
    id: 102,
    name: "Jessica Vance",
    email: "jessica.v@outlook.com",
    phone: "+1 (555) 921-4401",
    role: "Candidate",
    title: "Java Backend Architect",
    appliedJob: "Full Stack Java Engineer",
    companyApplied: "CloudScale Inc",
    experience: "8 Years",
    education: "M.S. Software Engineering, MIT",
    skills: ["Java 17", "Spring Boot", "Kubernetes", "AWS", "Redis"],
    status: "Shortlisted",
    summary:
      "Distributed systems developer with deep expertise in cloud resilience and real-time streaming architectures.",
    matchScore: "89%",
  },
  {
    id: 103,
    name: "Marcus Chen",
    email: "m.chen@designhub.io",
    phone: "+1 (555) 204-8833",
    role: "Candidate",
    title: "Product Designer",
    appliedJob: "Lead UX/UI Designer",
    companyApplied: "Creative Solutions Studio",
    experience: "4 Years",
    education: "B.A. Interaction Design, RISD",
    skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
    status: "Interview Scheduled",
    summary:
      "Focuses on accessibility, high-fidelity interactive component libraries, and end-to-end user journeys.",
    matchScore: "91%",
  },
];

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  // Active Sidebar Tab State
  const [activeTab, setActiveTab] = useState("Moderation");
  const [searchQuery, setSearchQuery] = useState("");

  // Data States
  const [jobs, setJobs] = useState(mockJobs);
  const [candidates, setCandidates] = useState(mockCandidates);

  // Modal Inspection States
  const [selectedItem, setSelectedItem] = useState(null); // Can be a Job or Candidate
  const [modalType, setModalType] = useState(null); // 'JOB' | 'CANDIDATE' | 'REJECT'
  const [rejectionReason, setRejectionReason] = useState("");

  // Logout Handler
  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/");
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
      case "Shortlisted":
      case "Verified":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Pending":
      case "In Review":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Rejected":
      case "Suspended":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Job Action Handlers
  const handleApproveJob = (id) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status: "Active" } : j)));
  };

  const handleOpenRejectModal = (job) => {
    setSelectedItem(job);
    setRejectionReason("");
    setModalType("REJECT");
  };

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) return;
    setJobs(
      jobs.map((j) =>
        j.id === selectedItem.id
          ? { ...j, status: "Rejected", rejectionReason }
          : j,
      ),
    );
    setModalType(null);
  };

  // Filtering
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.appliedJob.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-8">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-black text-xl text-slate-900 cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black">
              T
            </div>
            TalentBridge
          </div>
          <h1 className="text-sm font-bold text-slate-700 hidden sm:block">
            Admin Governance Portal
          </h1>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden sm:block">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                A
              </div>
              <div className="text-xs text-left hidden md:block">
                <p className="font-bold text-slate-900 leading-none">
                  Jordan Hayes
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  System Admin
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              title="Logout"
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-52 shrink-0 hidden md:block space-y-1">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Control Center
          </div>
          {[
            { name: "Moderation", icon: ShieldCheckIcon },
            { name: "Candidates", icon: UsersIcon },
            { name: "Jobs", icon: BriefcaseIcon },
            { name: "Companies", icon: BuildingOfficeIcon },
            { name: "Settings", icon: Cog6ToothIcon },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setSearchQuery("");
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.name
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.name}
            </button>
          ))}
        </aside>

        {/* Dashboard Dynamic Workspace */}
        <main className="flex-1 space-y-6 min-w-0">
          {/* Key Platform Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Total Applicants
                </p>
                <p className="text-xl font-black text-slate-900">1,248</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <UsersIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Pending Moderation
                </p>
                <p className="text-xl font-black text-amber-600">2 Jobs</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Active Listings
                </p>
                <p className="text-xl font-black text-slate-900">843</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <BriefcaseIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Verified Companies
                </p>
                <p className="text-xl font-black text-slate-900">142</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <BuildingOfficeIcon className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* TAB 1: MODERATION & JOBS */}
          {(activeTab === "Moderation" || activeTab === "Jobs") && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {activeTab} Workflows
                </h3>
                <span className="text-xs text-slate-500">
                  Showing {filteredJobs.length} Job Submissions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                      <th className="py-2.5 px-3">Job Title</th>
                      <th className="py-2.5 px-3">Company</th>
                      <th className="py-2.5 px-3">Recruiter</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-slate-50/80 transition"
                      >
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {job.title}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {job.company}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {job.poster}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(job.status)}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          {job.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApproveJob(job.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-xs"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleOpenRejectModal(job)}
                                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition shadow-xs"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => {
                              setSelectedItem(job);
                              setModalType("JOB");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition inline-flex items-center gap-1"
                          >
                            <EyeIcon className="w-3.5 h-3.5" /> View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CANDIDATES LIST WITH DETAILS */}
          {activeTab === "Candidates" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Registered Candidates & Applications
                </h3>
                <span className="text-xs text-slate-500">
                  Showing {filteredCandidates.length} Active Candidates
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                      <th className="py-2.5 px-3">Candidate Name</th>
                      <th className="py-2.5 px-3">Applied Job</th>
                      <th className="py-2.5 px-3">Experience</th>
                      <th className="py-2.5 px-3">AI Match Score</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-slate-50/80 transition"
                      >
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[10px] text-slate-500">
                            {c.email}
                          </p>
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-medium">
                          {c.appliedJob}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {c.experience}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-extrabold text-[11px]">
                            {c.matchScore}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(c.status)}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedItem(c);
                              setModalType("CANDIDATE");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
                          >
                            <EyeIcon className="w-3.5 h-3.5" /> View Profile &
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COMPANIES */}
          {activeTab === "Companies" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Partner Enterprises
              </h3>
              <p className="text-xs text-slate-500">
                Manage verified tech employers across the platform.
              </p>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === "Settings" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Platform Governance Controls
              </h3>
              <p className="text-xs text-slate-500">
                Adjust automatic job review thresholds and email notifications.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* --- MODALS --- */}

      {/* 1. CANDIDATE PROFILE DETAILS MODAL */}
      {modalType === "CANDIDATE" && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-fadeIn">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-start">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-[10px] uppercase tracking-wide">
                  Candidate Profile Inspection
                </span>
                <h3 className="text-xl font-extrabold mt-2">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-slate-300">{selectedItem.title}</p>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-600">
                  <EnvelopeIcon className="w-4 h-4 text-indigo-600" />{" "}
                  {selectedItem.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <PhoneIcon className="w-4 h-4 text-indigo-600" />{" "}
                  {selectedItem.phone}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <AcademicCapIcon className="w-4 h-4 text-indigo-600" />{" "}
                  {selectedItem.education}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <DocumentTextIcon className="w-4 h-4 text-indigo-600" />{" "}
                  Experience: <strong>{selectedItem.experience}</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Executive Summary
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  {selectedItem.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Verified Skillset
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-[11px] rounded-lg border border-indigo-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. JOB DETAILS INSPECTION MODAL */}
      {modalType === "JOB" && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-start">
              <div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(selectedItem.status)}`}
                >
                  {selectedItem.status}
                </span>
                <h3 className="text-xl font-extrabold mt-2">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedItem.company} • Posted by {selectedItem.poster}
                </p>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p>
                  Location:{" "}
                  <strong className="text-slate-900">
                    {selectedItem.location}
                  </strong>
                </p>
                <p>
                  Compensation:{" "}
                  <strong className="text-slate-900">
                    {selectedItem.salary}
                  </strong>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Description</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  {selectedItem.description}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. REJECTION REASON MODAL */}
      {modalType === "REJECT" && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Reject Posting: {selectedItem.title}
            </h4>
            <textarea
              rows={3}
              placeholder="State the compliance or missing details reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
