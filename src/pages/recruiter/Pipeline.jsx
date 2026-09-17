import React, { useState, useEffect } from "react";
import { jobService } from "../../services/jobService";

const STAGES = [
  { id: "Applied", label: "Applied", color: "bg-blue-500" },
  { id: "Screening", label: "Screening", color: "bg-amber-500" },
  { id: "Interview", label: "Interview", color: "bg-indigo-500" },
  { id: "Offer", label: "Offer Sent", color: "bg-emerald-500" },
  { id: "Rejected", label: "Rejected", color: "bg-rose-500" },
];

export default function Pipeline() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedAppId, setDraggedAppId] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

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

  // HTML5 Drag & Drop Handlers
  const handleDragStart = (e, id) => {
    setDraggedAppId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetStage) => {
    e.preventDefault();
    if (!draggedAppId) return;

    // Optimistic state update
    setApplications((prev) =>
      prev.map((app) =>
        app.id === draggedAppId ? { ...app, stage: targetStage } : app,
      ),
    );

    try {
      await jobService.updateApplicationStatus(draggedAppId, targetStage);
    } catch (err) {
      console.error("Failed to update stage:", err);
      loadApplications(); // Revert on error
    } finally {
      setDraggedAppId(null);
    }
  };

  const moveStage = async (appId, newStage) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, stage: newStage } : app)),
    );
    await jobService.updateApplicationStatus(appId, newStage);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-12">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                Recruiter Workspace
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                Drag and drop candidates across stages
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Candidate Pipeline
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold text-slate-600">
              <span className="px-3 py-1.5 bg-white text-slate-900 rounded-lg shadow-xs">
                Kanban
              </span>
              <span className="px-3 py-1.5 text-slate-400 cursor-not-allowed">
                List
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">
              Loading candidate pipeline...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
            {STAGES.map((stage) => {
              const stageApps = applications.filter(
                (app) => app.stage === stage.id,
              );

              return (
                <div
                  key={stage.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.id)}
                  className="bg-slate-100/70 border border-slate-200/70 rounded-2xl p-3 flex flex-col min-h-[500px]"
                >
                  {/* Stage Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 px-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${stage.color}`}
                      />
                      <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                        {stage.label}
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded-full text-[11px] font-bold">
                      {stageApps.length}
                    </span>
                  </div>

                  {/* Candidate Cards Column */}
                  <div className="space-y-3 flex-1">
                    {stageApps.length === 0 ? (
                      <div className="h-32 border-2 border-dashed border-slate-200/80 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-medium">
                        Drop candidate here
                      </div>
                    ) : (
                      stageApps.map((app) => (
                        <div
                          key={app.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, app.id)}
                          onClick={() => setSelectedApp(app)}
                          className={`bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs hover:shadow-md transition cursor-grab active:cursor-grabbing group ${
                            draggedAppId === app.id ? "opacity-40 scale-95" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-slate-900 text-xs group-hover:text-purple-600 transition">
                              {app.candidateName}
                            </h3>
                            {app.rating && (
                              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                ★ {app.rating}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                            {app.jobTitle}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-2 font-mono">
                            {app.appliedDate}
                          </p>

                          {/* Quick Stage Controls */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-medium">
                              {app.company}
                            </span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                              {stage.id !== "Interview" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveStage(app.id, "Interview");
                                  }}
                                  className="px-1.5 py-0.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded font-semibold"
                                >
                                  Interview
                                </button>
                              )}
                              {stage.id !== "Offer" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveStage(app.id, "Offer");
                                  }}
                                  className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded font-semibold"
                                >
                                  Offer
                                </button>
                              )}
                            </div>
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
      </div>

      {/* Candidate Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedApp(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl ring-1 ring-slate-900/10 overflow-hidden z-10 p-6 space-y-4 text-xs font-medium">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedApp.candidateName}
                </h3>
                <p className="text-slate-500">{selectedApp.candidateEmail}</p>
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
                <span className="text-slate-500">Applying For</span>
                <span className="font-semibold text-slate-800">
                  {selectedApp.jobTitle}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Current Stage</span>
                <span className="font-semibold text-purple-600">
                  {selectedApp.stage}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Resume Attached</span>
                <span className="font-mono text-blue-600 underline cursor-pointer">
                  {selectedApp.resumeName || "Resume.pdf"}
                </span>
              </div>
            </div>

            {selectedApp.coverLetter && (
              <div>
                <span className="block text-slate-500 mb-1 font-semibold">
                  Cover Note
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
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
