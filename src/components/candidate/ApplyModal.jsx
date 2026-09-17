import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { jobService } from "../../services/jobService";

export default function ApplyModal({ job, onClose, onSuccess }) {
  const { user } = useAuth();

  const [coverLetter, setCoverLetter] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resumeName) {
      setError("Please upload or specify a resume file.");
      return;
    }

    setSubmitting(true);

    try {
      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        candidateId: user?.id || "guest-user",
        candidateName: user?.name || "Anonymous Applicant",
        candidateEmail: user?.email || "applicant@example.com",
        coverLetter,
        resumeName,
        appliedDate: new Date().toISOString().split("T")[0],
      };

      await jobService.submitApplication(applicationData);

      onSuccess(job.title);
      onClose();
    } catch (err) {
      console.error("Failed to submit application:", err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Apply for Position
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {job.title} • {job.company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          {/* User Preview */}
          <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-gray-700">Applicant: </span>
              <span className="text-blue-700 font-bold">
                {user?.name || "Guest User"}
              </span>
              <span className="text-gray-500">
                {" "}
                ({user?.email || "guest@example.com"})
              </span>
            </div>
          </div>

          {/* Resume Upload simulation */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Resume / CV <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition">
              <div className="space-y-1 text-center">
                <span className="text-2xl">📄</span>
                <div className="flex text-xs text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-bold text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-[10px] text-gray-400">PDF, DOC up to 10MB</p>
                {resumeName && (
                  <p className="text-xs font-bold text-emerald-600 mt-2">
                    ✓ Selected: {resumeName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cover Letter Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Cover Letter / Note
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Why are you a great fit for this role?"
              className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
