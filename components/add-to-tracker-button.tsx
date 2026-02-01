"use client";

import { useTracker } from "@/components/tracker-provider";
import { SignInButton, useUser } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";

type AddToTrackerButtonProps = {
  jobSlug: string;
  variant?: "icon" | "pill";
};

export function AddToTrackerButton({
  jobSlug,
  variant = "pill",
}: AddToTrackerButtonProps) {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addTrackedJob, removeTrackedJob, isTracked } = useTracker();
  const alreadyTracked = isTracked(jobSlug);
  const currentUrl = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const handleClick = () => {
    if (!alreadyTracked) {
      addTrackedJob(jobSlug);
    } else {
      removeTrackedJob(jobSlug);
    }
  };

  if (!isSignedIn) {
    if (variant === "icon") {
      return (
        <SignInButton mode="modal" forceRedirectUrl={currentUrl}>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
            title="Add to tracker"
          >
            <span aria-hidden>➕</span>
            <span className="sr-only">Add to tracker</span>
          </button>
        </SignInButton>
      );
    }

    return (
      <SignInButton mode="modal" forceRedirectUrl={currentUrl}>
        <button
          type="button"
          className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
        >
          Add to tracker
        </button>
      </SignInButton>
    );
  }

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
