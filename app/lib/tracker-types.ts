export type ApplicationStatus =
  | "interested"
  | "applied"
  | "online test"
  | "video interview"
  | "first interview"
  | "further interview"
  | "final stage"
  | "offer"
  | "rejected";

export type TrackedJob = {
  id: string;
  jobSlug: string;
  status: ApplicationStatus;
  createdAt: string;
  notes?: string;
  dateApplied?: string;
};

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "interested",
  "applied",
  "online test",
  "video interview",
  "first interview",
  "further interview",
  "final stage",
  "offer",
  "rejected",
];
