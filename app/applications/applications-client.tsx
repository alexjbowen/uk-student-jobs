"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTracker } from "@/components/tracker-provider";
import { type Job } from "@/app/lib/jobs-data";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/app/lib/tracker-types";

const formatOptionLabel = (status: ApplicationStatus) =>
  status
    .split(" ")
    .map((word) => 
      // Just capitalize the first letter of EVERY word
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

type GoalPeriod = "daily" | "weekly" | "monthly" | "all-time";

const GOAL_PERIOD_LABELS: Record<GoalPeriod, string> = {
  daily: "today",
  weekly: "this week",
  monthly: "this month",
  "all-time": "all time",
};

const GOAL_PRESETS = [5, 10, 20, 50];

const startOfDay = (date: Date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const isSameDay = (value: Date, reference: Date) =>
  startOfDay(value).getTime() === startOfDay(reference).getTime();

const getWeekRange = (reference: Date) => {
  const start = startOfDay(reference);
  const day = start.getDay();
  const diffToMonday = (day + 6) % 7;
  start.setDate(start.getDate() - diffToMonday);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const isInWeekRange = (value: Date, reference: Date) => {
  const { start, end } = getWeekRange(reference);
  return value >= start && value <= end;
};

const isInMonth = (value: Date, reference: Date) =>
  value.getFullYear() === reference.getFullYear() &&
  value.getMonth() === reference.getMonth();

const formatCountLabel = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

const formatGoalPeriodTitle = (period: GoalPeriod) =>
  period === "all-time"
    ? "All Time"
    : `${period.charAt(0).toUpperCase()}${period.slice(1)}`;

type ApplicationsClientProps = {
  jobs: Job[];
};

export function ApplicationsClient({ jobs }: ApplicationsClientProps) {
  const { isSignedIn } = useUser();
  const {
    trackedJobs,
    removeTrackedJob,
    updateStatus,
  } = useTracker();
  const applicationStageOptions = useMemo(
    () => APPLICATION_STATUSES.filter((status) => status !== "interested"),
    [],
  );
  const [goalPeriod, setGoalPeriod] = useState<GoalPeriod>("weekly");
  const [goalCount, setGoalCount] = useState(5);
  const [isGoalEditorOpen, setIsGoalEditorOpen] = useState(false);
  const [isNoGoal, setIsNoGoal] = useState(false);
  const [selectedStages, setSelectedStages] = useState<Set<ApplicationStatus>>(
    () => new Set(applicationStageOptions),
  );
  const [isStageFilterOpen, setIsStageFilterOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!isSignedIn) {
      return;
    }

    const loadGoal = async () => {
      try {
        const response = await fetch("/api/goals", {
          credentials: "include",
        });
        if (!response.ok) {
          return;
        }
        const payload = (await response.json()) as {
          data?: { period: GoalPeriod; target: number; isNoGoal: boolean };
        };
        if (isActive && payload.data) {
          setGoalPeriod(payload.data.period);
          setGoalCount(payload.data.target);
          setIsNoGoal(payload.data.isNoGoal);
        }
      } catch {
        // Ignore fetch errors to avoid blocking UI.
      }
    };

    loadGoal();

    return () => {
      isActive = false;
    };
  }, [isSignedIn]);

  const jobsBySlug = useMemo(() => {
    const map = new Map(jobs.map((job) => [job.slug, job]));
    return map;
  }, [jobs]);
  const todoJobs = useMemo(
    () => trackedJobs.filter((job) => job.status === "interested"),
    [trackedJobs],
  );
  const appliedJobs = useMemo(
    () => trackedJobs.filter((job) => job.status !== "interested"),
    [trackedJobs],
  );
  const visibleAppliedJobs = useMemo(
    () => appliedJobs.filter((job) => selectedStages.has(job.status)),
    [appliedJobs, selectedStages],
  );
  const areFiltersApplied =
    selectedStages.size !== applicationStageOptions.length;
  const progressCount = useMemo(() => {
    const today = new Date();
    return appliedJobs.filter((job) => {
      if (!job.dateApplied) {
        return false;
      }
      const appliedDate = new Date(job.dateApplied);
      if (goalPeriod === "all-time") {
        return true;
      }
      if (goalPeriod === "daily") {
        return isSameDay(appliedDate, today);
      }
      if (goalPeriod === "weekly") {
        return isInWeekRange(appliedDate, today);
      }
      return isInMonth(appliedDate, today);
    }).length;
  }, [appliedJobs, goalPeriod]);
  const progressPercent =
    goalCount > 0 ? Math.min(100, (progressCount / goalCount) * 100) : 0;
  const actionPlanItems = useMemo(() => {
    const counts = {
      interested: 0,
      onlineTestTodo: 0,
      videoInterviewTodo: 0,
      interviewPrep: 0,
    };

    trackedJobs.forEach((job) => {
      if (job.status === "interested") {
        counts.interested += 1;
      }
      if (job.status === "online test - to do") {
        counts.onlineTestTodo += 1;
      }
      if (job.status === "video interview - to do") {
        counts.videoInterviewTodo += 1;
      }
      if (
        job.status === "first interview - pending" ||
        job.status === "further interview - pending" ||
        job.status === "final stage - pending"
      ) {
        counts.interviewPrep += 1;
      }
    });

    return [
      {
        key: "roles-to-apply",
        label: formatCountLabel(
          counts.interested,
          "Role to apply for",
          "Roles to apply for",
        ),
        count: counts.interested,
      },
      {
        key: "online-assessments",
        label: formatCountLabel(
          counts.onlineTestTodo,
          "Online assessment to do",
          "Online assessments to do",
        ),
        count: counts.onlineTestTodo,
      },
      {
        key: "video-interviews",
        label: formatCountLabel(
          counts.videoInterviewTodo,
          "Video interview to do",
          "Video interviews to do",
        ),
        count: counts.videoInterviewTodo,
      },
      {
        key: "interviews-to-prepare",
        label: formatCountLabel(
          counts.interviewPrep,
          "Interview to prepare for",
          "Interviews to prepare for",
        ),
        count: counts.interviewPrep,
      },
    ].filter((item) => item.count > 0);
  }, [trackedJobs]);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">

        <section className="rounded-2xl border border-slate-300 bg-slate-900/60 p-6 text-slate-100 dark:border-slate-800/50 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                {isNoGoal ? (
                  <span className="text-xl font-semibold">
                    {progressCount}{" "}
                    {formatCountLabel(
                      progressCount,
                      "Application",
                      "Applications",
                    )}{" "}
                    {GOAL_PERIOD_LABELS[goalPeriod]}
                  </span>
                ) : (
                  <span className="text-xl font-semibold">
                    {progressCount} / {goalCount} applications{" "}
                    {GOAL_PERIOD_LABELS[goalPeriod]}
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  {formatGoalPeriodTitle(goalPeriod)} goal
                </span>
              </div>
              {!isNoGoal && (
                <div className="h-2 w-full rounded-full bg-slate-800/80">
                  <div
                    className="h-2 rounded-full bg-[#00DAEE] transition-[width]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}

              {actionPlanItems.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {actionPlanItems.map((item) => (
                    <span
                      key={item.key}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200"
                    >
                      {item.count} {item.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="pt-1 text-xs text-slate-400">
                  You are all caught up! Great work.
                </p>
              )}
            </div>

            {!isSignedIn ? (
              <SignInButton mode="modal" forceRedirectUrl="/applications">
                <button
                  type="button"
                  className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
                >
                  Edit goal
                </button>
              </SignInButton>
            ) : (
              <button
                type="button"
                onClick={() => setIsGoalEditorOpen((prev) => !prev)}
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
              >
                Edit goal
              </button>
            )}
          </div>

          {isGoalEditorOpen && (
            <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-900/80 p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Frequency
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["daily", "weekly", "monthly", "all-time"] as GoalPeriod[]
                    ).map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setGoalPeriod(period)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                          goalPeriod === period
                            ? "border-[#00DAEE] text-[#00DAEE]"
                            : "border-slate-700 text-slate-300 hover:border-[#00DAEE] hover:text-[#00DAEE]"
                        }`}
                      >
                        {formatGoalPeriodTitle(period)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Target
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsNoGoal((prev) => !prev)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        isNoGoal
                          ? "border-[#00DAEE] text-[#00DAEE]"
                          : "border-slate-700 text-slate-300 hover:border-[#00DAEE] hover:text-[#00DAEE]"
                      }`}
                    >
                      No goal
                    </button>
                    {GOAL_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setGoalCount(preset);
                          setIsNoGoal(false);
                        }}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                          goalCount === preset
                            ? "border-[#00DAEE] text-[#00DAEE]"
                            : "border-slate-700 text-slate-300 hover:border-[#00DAEE] hover:text-[#00DAEE]"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                    <label className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300">
                      <span>Custom</span>
                      <input
                        type="number"
                        min={1}
                        value={goalCount}
                        onChange={(event) => {
                          const nextValue = Number(event.target.value);
                          if (!Number.isNaN(nextValue) && nextValue >= 1) {
                            setGoalCount(nextValue);
                            setIsNoGoal(false);
                          }
                        }}
                        className="w-16 border-0 bg-transparent p-0 text-xs text-slate-100 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={async () => {
                      setIsGoalEditorOpen(false);
                      if (!isSignedIn) {
                        return;
                      }
                      await fetch("/api/goals", {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          period: goalPeriod,
                          target: goalCount,
                          isNoGoal,
                        }),
                      });
                    }}
                    className="rounded-full bg-[#00DAEE] px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-[#7EF2FF]"
                  >
                    Save goal
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {trackedJobs.length === 0 ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-slate-100">
                My applications (0)
              </h1>
            </div>
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
          </section>
        ) : (
          <>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-slate-100">
                  To-do list ({todoJobs.length})
                </h1>
              </div>

              {todoJobs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-6 text-center text-sm text-slate-400">
                  No roles to apply to right now.
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-300 dark:border-slate-800/50 bg-slate-900/60">
                  <div className="divide-y divide-slate-300/50 dark:divide-slate-800/50">
                    <div className="grid grid-cols-[1.6fr_1fr_180px] gap-3 px-4 py-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <span>Role</span>
                      <span>Company</span>
                      <span className="text-right">Action</span>
                    </div>

                    {todoJobs.map((tracked) => {
                      const job = jobsBySlug.get(tracked.jobSlug);

                      return (
                        <div
                          key={tracked.id}
                          className="grid grid-cols-[1.6fr_1fr_180px] items-center gap-3 px-4 py-3 text-sm text-slate-200"
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

                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(tracked.jobSlug, "applied")
                              }
                              className="rounded-full bg-[#00DAEE] px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-[#7EF2FF]"
                            >
                              Mark as applied
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-100">
                  My applications ({visibleAppliedJobs.length}){" "}
                  {areFiltersApplied && (
                    <span className="text-xs font-medium text-slate-400">
                      - Filters Applied
                    </span>
                  )}
                </h2>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStageFilterOpen((prev) => !prev)}
                    className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
                  >
                    Filter by stage
                  </button>

                  {isStageFilterOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-slate-800/70 bg-slate-900 p-4 text-xs text-slate-200 shadow-lg">
                      <div className="flex items-center justify-between pb-2">
                        <button
                          type="button"
                          className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 hover:border-[#00DAEE] hover:text-[#00DAEE]"
                          onClick={() =>
                            setSelectedStages(new Set(applicationStageOptions))
                          }
                        >
                          Select all
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 hover:border-[#00DAEE] hover:text-[#00DAEE]"
                          onClick={() => setSelectedStages(new Set())}
                        >
                          Clear
                        </button>
                      </div>

                      <div className="space-y-1">
                        {applicationStageOptions.map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-800/60"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-[#00DAEE]"
                              checked={selectedStages.has(status)}
                              onChange={() => {
                                setSelectedStages((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(status)) {
                                    next.delete(status);
                                  } else {
                                    next.add(status);
                                  }
                                  return next;
                                });
                              }}
                            />
                            <span>{formatOptionLabel(status)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {appliedJobs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-6 text-center text-sm text-slate-400">
                  Nothing applied yet. Mark a role above to get started.
                </div>
              ) : visibleAppliedJobs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-6 text-center text-sm text-slate-400">
                  No applications match the selected stages.
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-300 dark:border-slate-800/50 bg-slate-900/60">
                  <div className="divide-y divide-slate-300/50 dark:divide-slate-800/50">
                    <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_80px] gap-3 px-4 py-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <span>Role</span>
                      <span>Company</span>
                      <span>Stage</span>
                      <span>Date applied</span>
                      <span className="text-right">Actions</span>
                    </div>

                    {visibleAppliedJobs.map((tracked) => {
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
                            <label
                              className="sr-only"
                              htmlFor={`status-${tracked.id}`}
                            >
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
                              {applicationStageOptions.map((status) => (
                                <option key={status} value={status}>
                                  {formatOptionLabel(status)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="text-xs text-slate-400">
                            {appliedOn}
                          </div>

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
          </>
        )}
      </div>
    </main>
  );
}
