"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";        // 👈 NEW
import { todaysJobs, type Job } from "@/app/lib/jobs-data";

type Tab = "tracker" | "ask-ai" | "cv-help";

function IconButton({
  emoji,
  label,
  onClick,
}: {
  emoji: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
    >
      <span aria-hidden>{emoji}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

function MetaItem({
  iconSrc,
  fallbackEmoji,
  label,
}: {
  iconSrc: string;
  fallbackEmoji: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-300">
      <Image
        src={iconSrc}
        alt=""
        width={14}
        height={14}
        className="hidden sm:inline-block"
      />
      <span className="sm:hidden" aria-hidden>
        {fallbackEmoji}
      </span>
      <span>{label}</span>
    </span>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("tracker");
  const router = useRouter();                          // 👈 NEW

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header / Tabs */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center justify-between px-6 py-3">
        <div className="text-lg font-semibold">
          UK Grad Jobs{" "}
          <span className="text-xs text-slate-400">
            (better name pending 🚧)
          </span>
        </div>

        <nav className="flex gap-2 text-sm">
          <button
            onClick={() => setActiveTab("tracker")}
            className={`rounded-full px-4 py-2 transition ${
              activeTab === "tracker"
                ? "bg-[#00DAEE] text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Tracker
          </button>
          <button
            onClick={() => setActiveTab("ask-ai")}
            className={`rounded-full px-4 py-2 transition ${
              activeTab === "ask-ai"
                ? "bg-[#00DAEE] text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Ask AI
          </button>
          <button
            onClick={() => setActiveTab("cv-help")}
            className={`rounded-full px-4 py-2 transition ${
              activeTab === "cv-help"
                ? "bg-[#00DAEE] text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            CV Help
          </button>
        </nav>
      </header>

      {/* Page content */}
      <section className="flex-1 px-6 py-6 max-w-4xl mx-auto w-full">
        {activeTab === "tracker" && (
          <div className="space-y-6">
            {/* Top row: title + quick filters */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Application Tracker</h1>
                <p className="text-slate-300 text-sm">
                  Jobs that opened{" "}
                  <span className="text-[#00DAEE] font-medium">today</span>.{"  "}
                  Later we&apos;ll let you sort by deadline, sector, and fit.
                </p>
              </div>

              <div className="flex gap-2 text-xs sm:text-sm">
                <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200 hover:border-[#00DAEE]">
                  All
                </button>
                <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-400 hover:border-[#00DAEE] hover:text-slate-100">
                  IB / Markets
                </button>
                <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-400 hover:border-[#00DAEE] hover:text-slate-100">
                  Consulting
                </button>
              </div>
            </div>

            {/* Today’s new jobs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                  Today&apos;s new roles
                </h2>
                <span className="text-xs text-slate-400">
                  {todaysJobs.length} roles • {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-3">
                {todaysJobs.map((job: Job, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold">
                            {job.company}
                          </span>
                          <span className="text-[10px] rounded-full border border-[#00DAEE]/60 bg-[#00DAEE]/10 px-2 py-0.5 uppercase tracking-wide text-[#00DAEE]">
                            New today
                          </span>
                        </div>

                        <div className="text-sm text-slate-100">
                          {job.role}
                        </div>

                        {/* Meta row: location, industry, salary */}
                        <div className="flex flex-wrap gap-3 items-center pt-1">
                          <MetaItem
                            iconSrc="/icons/location.svg"
                            fallbackEmoji="📍"
                            label={job.location}
                          />
                          <MetaItem
                            iconSrc="/icons/industry.svg"
                            fallbackEmoji="🏢"
                            label={job.industry}
                          />
                          <MetaItem
                            iconSrc="/icons/salary.svg"
                            fallbackEmoji="💰"
                            label={job.salary}
                          />
                        </div>

                        {job.deadline && (
                          <div className="text-xs text-slate-400 pt-1">
                            ⏰ {job.deadline}
                          </div>
                        )}
                      </div>

                      {/* Icon buttons */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <IconButton
                          emoji="ℹ️"
                          label="Learn more"
                          onClick={() => {
                            router.push(`/jobs/${job.slug}`);   // 👈 GO TO DETAIL PAGE
                          }}
                        />
                        <IconButton
                          emoji="🔗"
                          label="Apply"
                          onClick={() => {
                            if (job.applyUrl) {
                              window.open(job.applyUrl, "_blank");
                            }
                          }}
                        />
                        <IconButton
                          emoji="💬"
                          label="Ask a question"
                          onClick={() => {
                            console.log("Ask question about", job.company);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "ask-ai" && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Ask AI</h1>
            <p className="text-slate-300">
              This tab will be for asking AI questions about roles, companies,
              and interview prep. UI only for now.
            </p>
          </div>
        )}

        {activeTab === "cv-help" && (
          <div>
            <h1 className="text-2xl font-bold mb-2">CV Help</h1>
            <p className="text-slate-300">
              This tab will handle CV feedback, bullets, and tailoring to roles.
              We&apos;ll build the tools here later.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
