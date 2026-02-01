import { config } from "dotenv";

config({ path: ".env.local" });

import { db } from "@/db";
import { jobs } from "@/db/schema";
import { jobsData } from "@/app/data/jobs-data";

async function seed() {
  if (jobsData.length === 0) {
    console.log("No jobs to seed.");
    return;
  }

  let inserted = 0;

  for (const job of jobsData) {
    const row = {
      slug: job.slug,
      company: job.company,
      role: job.role,
      location: job.location ?? null,
      industry: job.industry ?? null,
      salary: job.salary ?? null,
      deadline: job.deadline ?? null,
      releaseDate: job.releaseDate ?? null,
      description: job.description ?? null,
      roleSummary: job.roleSummaryHtml ?? null,
      applyUrl: job.applyUrl ?? null,
      logoUrl: job.logoSrc ?? null,
      filterTags: job.filterTags?.length ? job.filterTags : null,
      helpfulLinks: job.helpfulLinks
        ? JSON.stringify(job.helpfulLinks)
        : null,
    };

    await db
      .insert(jobs)
      .values(row)
      .onConflictDoNothing({ target: jobs.slug });

    inserted += 1;
  }

  console.log(`Seeded ${inserted} jobs.`);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
