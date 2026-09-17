import React, { useState, useEffect } from "react";
import { jobService } from "../../services/jobService";

const STAGE_STEPS = ["Applied", "Screening", "Interview", "Offer"];

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showResumePreview, setShowResumePreview] = useState(false);

  const loadApplications = async () => {
    try {
      setLoading(true);
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

  const getStageColor = (stage) => {
    switch (stage) {
      case "Offer":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Interview":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
      case "Screening":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200/60";
    }
  };

  const handleDownloadResume = (fileName) => {
    // Simulated resume file download
    const dummyContent = `Resume File: ${fileName}\nCandidate Name: ${selectedApp?.candidateName}\nApplied Role: ${selectedApp?.jobTitle}`;
    const blob = new Blob([dummyContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "All" || app.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const countApplied = applications.filter((a) => a.stage === "Applied").length;
  const countScreening = applications.filter(
    (a) => a.stage === "Screening",
  ).length;
  const countInterview = applications.filter(
    (a) => a.stage === "Interview",
  ).length;
  const countOffer = applications.filter((a) => a.stage === "Offer").length;
  const countRejected = applications.filter(
    (a) => a.stage === "Rejected",
  ).length;
  const total = applications.length || 1;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Header Banner */}
      <div className="relative bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-50/50 via-indigo-50/20 to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 mb-2">
                Candidate Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Applications
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Track your active job applications, interview status, and review
                process in real time.
              </p>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-slate-50/80 border border-slate-200/70 p-3.5 rounded-2xl">
              <span className="text-slate-500 text-[11px] font-semibold block">
                Total Applied
              </span>
              <span className="text-lg font-bold text-slate-900">
                {applications.length}
              </span>
            </div>
            <div className="bg-amber-50/50 border border-amber-200/50 p-3.5 rounded-2xl">
              <span className="text-amber-700 text-[11px] font-semibold block">
                In Screening
              </span>
              <span className="text-lg font-bold text-amber-900">
                {countScreening}
              </span>
            </div>
            <div className="bg-indigo-50/50 border border-indigo-200/50 p-3.5 rounded-2xl">
              <span className="text-indigo-700 text-[11px] font-semibold block">
                In Interview
              </span>
              <span className="text-lg font-bold text-indigo-900">
                {countInterview}
              </span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-200/50 p-3.5 rounded-2xl">
              <span className="text-emerald-700 text-[11px] font-semibold block">
                Offers Received
              </span>
              <span className="text-lg font-bold text-emerald-900">
                {countOffer}
              </span>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div className="mt-6 bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-700">
              <span>Application Pipeline Breakdown</span>
              <span className="text-slate-400 font-normal">
                {applications.length} Total Submissions
              </span>
            </div>

            <div className="h-3.5 w-full bg-slate-200/70 rounded-full overflow-hidden flex gap-0.5 p-0.5">
              <div
                style={{ width: `${(countApplied / total) * 100}%` }}
                className="bg-blue-500 h-full rounded-l-full transition-all duration-500"
              />
              <div
                style={{ width: `${(countScreening / total) * 100}%` }}
                className="bg-amber-500 h-full transition-all duration-500"
              />
              <div
                style={{ width: `${(countInterview / total) * 100}%` }}
                className="bg-indigo-500 h-full transition-all duration-500"
              />
              <div
                style={{ width: `${(countOffer / total) * 100}%` }}
                className="bg-emerald-500 h-full transition-all duration-500"
              />
              <div
                style={{ width: `${(countRejected / total) * 100}%` }}
                className="bg-rose-400 h-full rounded-r-full transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-4 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 outline-none"
            />
          </div>

          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 outline-none"
          >
            <option value="All">All Stages</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">Loading applications...</span>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-md mx-auto my-8">
            <p className="text-xs text-slate-500">
              No applications match your query.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => {
              const currentStepIndex = STAGE_STEPS.indexOf(app.stage);
              const isRejected = app.stage === "Rejected";

              return (
                <div
                  key={app.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/60 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 text-base">
                        {app.company ? app.company.charAt(0) : "J"}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {app.jobTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {app.company} •{" "}
                          <span className="text-slate-400 font-mono">
                            Applied {app.appliedDate}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${getStageColor(
                          app.stage,
                        )}`}
                      >
                        {app.stage}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowResumePreview(false);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                      >
                        View Submission
                      </button>
                    </div>
                  </div>

                  {!isRejected ? (
                    <div className="pt-4">
                      <div className="grid grid-cols-4 gap-2 relative">
                        {STAGE_STEPS.map((step, idx) => {
                          const isPassed = currentStepIndex >= idx;
                          const isCurrent = currentStepIndex === idx;

                          return (
                            <div
                              key={step}
                              className="flex flex-col items-center space-y-1.5 relative"
                            >
                              <div
                                className={`w-full h-1.5 rounded-full transition-colors ${
                                  isPassed ? "bg-blue-600" : "bg-slate-100"
                                }`}
                              />
                              <span
                                className={`text-[10px] font-semibold ${
                                  isCurrent
                                    ? "text-blue-600 font-bold"
                                    : isPassed
                                      ? "text-slate-700"
                                      : "text-slate-400"
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 text-[11px] text-rose-500 font-medium">
                      This application was not selected to move forward.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Application Details Modal with Resume Download & Interactive Preview */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedApp(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl ring-1 ring-slate-900/10 overflow-hidden z-10 p-6 space-y-4 text-xs font-medium">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedApp.jobTitle}
                </h3>
                <p className="text-slate-500">{selectedApp.company}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Applicant Name</span>
                <span className="font-semibold text-slate-800">
                  {selectedApp.candidateName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Applicant Email</span>
                <span className="font-semibold text-slate-800">
                  {selectedApp.candidateEmail}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Current Status</span>
                <span className="font-semibold text-blue-600">
                  {selectedApp.stage}
                </span>
              </div>
            </div>

            {/* Resume Section with Preview & Download Actions */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                    PDF
                  </span>
                  <div>
                    <span className="block font-semibold text-slate-800 truncate max-w-[180px]">
                      {selectedApp.resumeName || "Resume_2026.pdf"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Attached Document • 245 KB
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowResumePreview(!showResumePreview)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-[11px] font-semibold transition"
                  >
                    {showResumePreview ? "Hide" : "Preview"}
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadResume(
                        selectedApp.resumeName || "Resume_2026.pdf",
                      )
                    }
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold transition flex items-center gap-1"
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Collapsible Document Preview Pane */}
              {showResumePreview && (
                <div className="mt-3 p-4 bg-white border border-slate-200/80 rounded-xl space-y-3 shadow-inner">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700">
                      Document Quick Preview
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                      Verified Attachment
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-600 leading-relaxed font-mono bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    <p className="font-bold text-slate-800">
                      {selectedApp.candidateName}
                    </p>
                    <p className="text-slate-400">
                      {selectedApp.candidateEmail}
                    </p>
                    <hr className="my-2 border-slate-200" />
                    <p className="font-sans text-slate-600">
                      Experience with JavaScript, React, Node.js, and modern CSS
                      frameworks. Applied for {selectedApp.jobTitle}.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {selectedApp.coverLetter && (
              <div>
                <span className="block text-slate-500 mb-1 font-semibold">
                  Submitted Cover Note
                </span>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed italic">
                  "{selectedApp.coverLetter}"
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold"
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
