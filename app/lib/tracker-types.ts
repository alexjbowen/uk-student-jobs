export type ApplicationStatus =
  | "interested"
  | "applied"
  | "online test - to do"
  | "online test - complete"
  | "video interview - to do"
  | "video interview - complete"
  | "first interview - pending"
  | "first interview - complete"
  | "further interview - pending"
  | "further interview - complete"
  | "final stage - pending"
  | "final stage - complete"
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
  "online test - to do",
  "online test - complete",
  "video interview - to do",
  "video interview - complete",
  "first interview - pending",
  "first interview - complete",
  "further interview - pending",
  "further interview - complete",
  "final stage - pending",
  "final stage - complete",
  "offer",
  "rejected",
];
