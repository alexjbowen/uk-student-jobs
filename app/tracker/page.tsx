import { getAllJobs } from "@/app/lib/jobs-db";
import { TrackerClient } from "@/app/tracker/tracker-client";

export default async function TrackerPage() {
  const jobs = await getAllJobs();

  return <TrackerClient jobs={jobs} />;
}
