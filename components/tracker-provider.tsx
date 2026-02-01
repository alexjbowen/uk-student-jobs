"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
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
  const { isLoaded, isSignedIn } = useUser();
  const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);

  const refreshTrackedJobs = useCallback(async () => {
    try {
      const response = await fetch("/api/tracker", {
        credentials: "include",
      });
      if (!response.ok) {
        return;
      }
      const payload = (await response.json()) as { data: TrackedJob[] };
      if (payload.data) {
        setTrackedJobs(payload.data);
      }
    } catch {
      // Ignore fetch errors to avoid blocking UI.
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!isSignedIn) {
      setTrackedJobs([]);
      return;
    }
    void refreshTrackedJobs();
  }, [isLoaded, isSignedIn, refreshTrackedJobs]);

  const addTrackedJob = useCallback(
    (jobSlug: string) => {
      if (!isLoaded || !isSignedIn) {
        return;
      }
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
      void fetch("/api/tracker", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobSlug }),
      }).then((response) => {
        if (response.ok) {
          void refreshTrackedJobs();
        }
      });
    },
    [isLoaded, isSignedIn, refreshTrackedJobs],
  );

  const removeTrackedJob = useCallback(
    (jobSlug: string) => {
      if (!isLoaded || !isSignedIn) {
        return;
      }
      setTrackedJobs((prev) => prev.filter((job) => job.jobSlug !== jobSlug));
      void fetch("/api/tracker", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobSlug }),
      }).then((response) => {
        if (response.ok) {
          void refreshTrackedJobs();
        }
      });
    },
    [isLoaded, isSignedIn, refreshTrackedJobs],
  );

  const updateStatus = useCallback(
    (jobSlug: string, status: ApplicationStatus) => {
      if (!isLoaded || !isSignedIn) {
        return;
      }
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
      void fetch("/api/tracker", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobSlug, status }),
      }).then((response) => {
        if (response.ok) {
          void refreshTrackedJobs();
        }
      });
    },
    [isLoaded, isSignedIn, refreshTrackedJobs],
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
