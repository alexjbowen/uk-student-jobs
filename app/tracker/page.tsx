import { getAllInternships, getAllJobs } from "@/app/lib/jobs-db";
import { TrackerClient } from "@/app/tracker/tracker-client";

export default async function TrackerPage() {
  const [jobs, internships] = await Promise.all([getAllJobs(), getAllInternships()]);

  return <TrackerClient jobs={jobs} internships={internships} />;
}
