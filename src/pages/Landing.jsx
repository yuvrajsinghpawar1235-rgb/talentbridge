import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 backdrop-blur-md hover:bg-white/10 transition cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Next-Gen Talent Acquisition v2.0 Released</span>
            <span className="text-white/40">→</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Hire faster. Scale smarter with{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI-powered
            </span>{" "}
            pipelines.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            TalentBridge replaces clunky ATS tools with an elegant,
            drag-and-drop recruiter pipeline and transparent candidate
            application tracking.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/recruiter/pipeline"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Open Recruiter Pipeline
            </Link>

            <Link
              to="/candidate/applications"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Candidate Portal
            </Link>
          </div>

          {/* Metrics / Trust Badges */}
          <div className="pt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-xl mx-auto text-center">
            <div>
              <div className="text-2xl font-black text-white">4.2x</div>
              <div className="text-[11px] text-slate-400 font-medium">
                Faster Sourcing
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">99.8%</div>
              <div className="text-[11px] text-slate-400 font-medium">
                Pipeline Accuracy
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">100k+</div>
              <div className="text-[11px] text-slate-400 font-medium">
                Applications Processed
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-3xl p-2.5 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden p-6 sm:p-8 space-y-6">
            {/* Header bar of preview */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-500">
                  talentbridge.app/recruiter/pipeline
                </span>
              </div>
              <div className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Live Interactive Mode
              </div>
            </div>

            {/* Simulated KanBan Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-none opacity-90">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Sourced</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                    12
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-200">
                    Alex Morgan
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Senior Frontend Engineer
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                  <span>In Technical Review</span>
                  <span className="bg-indigo-950 px-2 py-0.5 rounded text-[10px] text-indigo-300">
                    5
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-indigo-500/30 space-y-2 ring-1 ring-indigo-500/20">
                  <div className="text-xs font-bold text-indigo-200">
                    Sarah Chen
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Fullstack Specialist
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Offer Extended</span>
                  <span className="bg-emerald-950 px-2 py-0.5 rounded text-[10px] text-emerald-300">
                    2
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-200">
                    David Miller
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Lead Product Designer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
              Engineered for Speed
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Everything you need to manage hiring workflows seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:border-indigo-500/30 transition group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">
                Drag & Drop Pipeline
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Move candidates effortlessly through customizable stages with
                instant real-time sync across teams.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:border-purple-500/30 transition group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition">
                📄
              </div>
              <h3 className="text-lg font-bold text-white">
                Instant Resume Preview
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Inspect candidate resumes directly within the platform without
                downloading unorganized files.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 hover:border-pink-500/30 transition group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition">
                🎯
              </div>
              <h3 className="text-lg font-bold text-white">
                Candidate Application Portal
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Provide applicants with transparent status updates, timeline
                stages, and upcoming interview schedule info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-slate-900/50 border border-white/10 p-10 sm:p-14 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to transform your recruitment pipeline?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Experience the next level of applicant tracking. No setup fees or
            complex onboarding required.
          </p>
          <div className="pt-2">
            <Link
              to="/recruiter/pipeline"
              className="inline-block px-8 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-sm transition shadow-lg active:scale-95"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
