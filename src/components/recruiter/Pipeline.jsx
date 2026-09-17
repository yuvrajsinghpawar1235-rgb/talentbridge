import React, { useState, useEffect, useMemo } from "react";
import { jobService } from "../../services/jobService";

const STAGES = ["Applied", "Screening", "Interview", "Offered"];

export default function Pipeline() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");

  // Load applications from jobService
  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await jobService.getApplications();
      setApplications(data);
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // Extract unique job titles for filter dropdown
  const uniqueRoles = useMemo(() => {
    const roles = applications.map((app) => app.jobTitle).filter(Boolean);
    return ["ALL", ...new Set(roles)];
  }, [applications]);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        (app.candidateName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (app.candidateEmail || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesRole =
        selectedRole === "ALL" || app.jobTitle === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [applications, searchTerm, selectedRole]);

  // Move candidate stage
  const handleMoveCandidate = async (id, direction) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;

    const currentIndex = STAGES.indexOf(app.stage || "Applied");
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < STAGES.length) {
      const nextStage = STAGES[newIndex];

      // Optimistic update
      setApplications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, stage: nextStage } : item,
        ),
      );

      try {
        await jobService.updateApplicationStatus(id, nextStage);
      } catch (err) {
        console.error("Failed to update stage:", err);
        loadApplications();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="p-8 flex-1 overflow-x-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Candidate Pipeline
            </h1>
            <p className="text-xs text-gray-500">
              Manage candidate status across hiring stages in real time
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadApplications}
              className="px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-1 flex-col md:flex-row gap-3 w-full">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search candidate by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Role Filter Dropdown */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role === "ALL" ? "All Job Roles" : role}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedRole !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedRole("ALL");
              }}
              className="text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Kanban Board */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">
              Loading pipeline applications...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-w-[900px]">
            {STAGES.map((stage) => {
              const stageApps = filteredApplications.filter(
                (app) => (app.stage || "Applied") === stage,
              );

              return (
                <div
                  key={stage}
                  className="bg-gray-100/70 border border-gray-200 rounded-xl p-4 flex flex-col h-[70vh]"
                >
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                    <h3 className="font-bold text-sm text-gray-700">{stage}</h3>
                    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                    {stageApps.length === 0 ? (
                      <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        No candidates
                      </div>
                    ) : (
                      stageApps.map((app) => (
                        <div
                          key={app.id}
                          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-gray-900">
                              {app.candidateName || "Applicant"}
                            </h4>
                            <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
                              ★ {app.rating || "4.5"}
                            </span>
                          </div>

                          <p className="text-xs text-gray-700 font-medium">
                            {app.jobTitle}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {app.company}
                          </p>

                          <button
                            onClick={() => setSelectedApp(app)}
                            className="text-[11px] font-medium text-blue-600 hover:text-blue-800 underline block"
                          >
                            View details
                          </button>

                          <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs font-semibold">
                            <button
                              onClick={() =>
                                handleMoveCandidate(app.id, "prev")
                              }
                              disabled={STAGES.indexOf(stage) === 0}
                              className="text-gray-500 hover:text-gray-800 disabled:opacity-30"
                            >
                              ← Back
                            </button>
                            <button
                              onClick={() =>
                                handleMoveCandidate(app.id, "next")
                              }
                              disabled={
                                STAGES.indexOf(stage) === STAGES.length - 1
                              }
                              className="text-blue-600 hover:text-blue-800 disabled:opacity-30"
                            >
                              Advance →
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900">
                  {selectedApp.candidateName || "Applicant"}
                </h3>
                <p className="text-xs text-gray-600">
                  {selectedApp.candidateEmail}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p>
                <strong>Applying for:</strong> {selectedApp.jobTitle} (
                {selectedApp.company})
              </p>
              <p>
                <strong>Current Stage:</strong> {selectedApp.stage || "Applied"}
              </p>
              <p>
                <strong>Applied Date:</strong> {selectedApp.appliedDate}
              </p>
              <p>
                <strong>Resume File:</strong> {selectedApp.resumeName || "N/A"}
              </p>
              {selectedApp.coverLetter && (
                <div className="mt-3">
                  <p className="font-semibold mb-1">Cover Letter Note:</p>
                  <p className="bg-gray-50 p-3 rounded-lg border text-gray-600 italic">
                    "{selectedApp.coverLetter}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t text-right">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
