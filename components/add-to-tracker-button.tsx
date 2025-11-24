"use client";

import { useTracker } from "@/components/tracker-provider";

type AddToTrackerButtonProps = {
  jobSlug: string;
  variant?: "icon" | "pill";
};

export function AddToTrackerButton({
  jobSlug,
  variant = "pill",
}: AddToTrackerButtonProps) {
  const { addTrackedJob, removeTrackedJob, isTracked } = useTracker();
  const alreadyTracked = isTracked(jobSlug);

  const handleClick = () => {
    if (!alreadyTracked) {
      addTrackedJob(jobSlug);
    } else {
      removeTrackedJob(jobSlug);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
          alreadyTracked
            ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
            : "border-slate-700 bg-slate-900 text-slate-200 hover:border-[#00DAEE] hover:text-[#00DAEE]"
        }`}
        title={alreadyTracked ? "Remove from tracker" : "Add to tracker"}
      >
        <span aria-hidden>{alreadyTracked ? "✅" : "➕"}</span>
        <span className="sr-only">
          {alreadyTracked ? "Remove from tracker" : "Add to tracker"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        alreadyTracked
          ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
          : "border-slate-700 text-slate-200 hover:border-[#00DAEE] hover:text-[#00DAEE]"
      }`}
    >
      {alreadyTracked ? "Tracked (click to remove)" : "Add to tracker"}
    </button>
  );
}
