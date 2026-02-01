import { getAllJobs } from "@/app/lib/jobs-db";
import { ApplicationsClient } from "@/app/applications/applications-client";

export default async function ApplicationsPage() {
  const jobs = await getAllJobs();

  return <ApplicationsClient jobs={jobs} />;
}
