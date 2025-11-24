"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type ApplicationStatus,
  type TrackedJob,
} from "@/app/lib/tracker-types";

type TrackerContextValue = {
  trackedJobs: TrackedJob[];
  addTrackedJob: (jobSlug: string) => void;
  removeTrackedJob: (jobSlug: string) => void;
  updateStatus: (jobSlug: string, status: ApplicationStatus) => void;
  isTracked: (jobSlug: string) => boolean;
};

const TrackerContext = createContext<TrackerContextValue | undefined>(undefined);

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);

  const addTrackedJob = useCallback((jobSlug: string) => {
    setTrackedJobs((prev) => {
      if (prev.some((job) => job.jobSlug === jobSlug)) {
        return prev;
      }
      const newEntry: TrackedJob = {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
        jobSlug,
        status: "interested",
        createdAt: new Date().toISOString(),
        dateApplied: undefined,
      };
      return [newEntry, ...prev];
    });
  }, []);

  const removeTrackedJob = useCallback((jobSlug: string) => {
    setTrackedJobs((prev) => prev.filter((job) => job.jobSlug !== jobSlug));
  }, []);

  const updateStatus = useCallback(
    (jobSlug: string, status: ApplicationStatus) => {
      setTrackedJobs((prev) =>
        prev.map((job) =>
          job.jobSlug === jobSlug
            ? {
                ...job,
                status,
                dateApplied:
                  status === "applied"
                    ? new Date().toISOString()
                    : status === "interested"
                      ? undefined
                      : job.dateApplied,
              }
            : job,
        ),
      );
    },
    [],
  );

  const value = useMemo<TrackerContextValue>(
    () => ({
      trackedJobs,
      addTrackedJob,
      removeTrackedJob,
      updateStatus,
      isTracked: (jobSlug: string) =>
        trackedJobs.some((job) => job.jobSlug === jobSlug),
    }),
    [trackedJobs, addTrackedJob, removeTrackedJob, updateStatus],
  );

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) {
    throw new Error("useTracker must be used within TrackerProvider");
  }
  return ctx;
}
