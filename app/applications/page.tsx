"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTracker } from "@/components/tracker-provider";
import { todaysJobs } from "@/app/lib/jobs-data";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/app/lib/tracker-types";

const formatOptionLabel = (status: ApplicationStatus) =>
  status
    .split(" ")
    .map((word) =>
      word.length > 2
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toUpperCase(),
    )
    .join(" ");

export default function ApplicationsPage() {
  const {
    trackedJobs,
    removeTrackedJob,
    updateStatus,
  } = useTracker();

  const jobsBySlug = useMemo(() => {
    const map = new Map(todaysJobs.map((job) => [job.slug, job]));
    return map;
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header>
          <p className="text-sm text-slate-400">
            Track your open applications and interviews.
          </p>
        </header>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-100">
              My applications
            </h1>
            <span className="text-xs text-slate-400">
              {trackedJobs.length} tracked
            </span>
          </div>

          {trackedJobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-8 text-center">
              <p className="text-sm text-slate-300">
                You haven&apos;t added any jobs to your tracker yet.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Head back to the{" "}
                <Link href="/tracker" className="text-[#00DAEE] underline">
                  tracker
                </Link>{" "}
                and tap the ➕ icon on roles you care about.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-300 dark:border-slate-800/50 bg-slate-900/60">
              {/* ONE SHARED DIVIDER FOR HEADER + ROWS */}
              <div className="divide-y divide-slate-300/50 dark:divide-slate-800/50">
                
                {/* HEADER ROW — NO BORDER */}
                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_80px] gap-3 px-4 py-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span>Role</span>
                  <span>Company</span>
                  <span>Stage</span>
                  <span>Date applied</span>
                  <span className="text-right">Actions</span>
                </div>

                {/* DATA ROWS */}
                {trackedJobs.map((tracked) => {
                  const job = jobsBySlug.get(tracked.jobSlug);
                  const appliedOn = tracked.dateApplied
                    ? new Date(tracked.dateApplied).toLocaleDateString()
                    : "—";

                  return (
                    <div
                      key={tracked.id}
                      className="grid grid-cols-[1.6fr_1fr_1fr_1fr_80px] items-center gap-3 px-4 py-3 text-sm text-slate-200"
                    >
                      <div>
                        {job ? (
                          <Link
                            href={`/jobs/${job.slug}`}
                            className="font-medium text-[#00DAEE] underline-offset-4 hover:underline"
                          >
                            {job.role}
                          </Link>
                        ) : (
                          <p className="font-medium">{tracked.jobSlug}</p>
                        )}
                        <p className="text-xs text-slate-500">
                          {job?.location ?? "Unknown location"}
                        </p>
                      </div>

                      <div>{job?.company ?? "Unknown company"}</div>

                      <div className="space-y-1">
                        <label className="sr-only" htmlFor={`status-${tracked.id}`}>
                          Status
                        </label>
                        <select
                          id={`status-${tracked.id}`}
                          value={tracked.status}
                          onChange={(event) =>
                            updateStatus(
                              tracked.jobSlug,
                              event.target.value as ApplicationStatus,
                            )
                          }
                          className="w-40 rounded-lg border border-slate-700 bg-slate-900/60 px-2 py-1 text-xs text-slate-100 focus:border-[#00DAEE] focus:outline-none"
                        >
                          {APPLICATION_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {formatOptionLabel(status)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-xs text-slate-400">{appliedOn}</div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeTrackedJob(tracked.jobSlug)}
                          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
