import { getAllInternships, getAllJobs } from "@/app/lib/jobs-db";
import { ApplicationsClient } from "@/app/applications/applications-client";

export default async function ApplicationsPage() {
  const [jobs, internships] = await Promise.all([getAllJobs(), getAllInternships()]);

  return <ApplicationsClient jobs={[...jobs, ...internships]} />;
}
