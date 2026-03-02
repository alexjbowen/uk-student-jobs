import { eq } from "drizzle-orm";

import { db } from "@/db";
import { internships, jobs } from "@/db/schema";
import { type HelpfulLink, type Job } from "@/app/lib/jobs-data";

const parseHelpfulLinks = (value: unknown): HelpfulLink[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value as HelpfulLink[];
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as HelpfulLink[];
    } catch {
      return undefined;
    }
  }
  return undefined;
};

const mapJobRow = (row: typeof jobs.$inferSelect): Job => ({
  slug: row.slug,
  company: row.company,
  role: row.role,
  location: row.location ?? "",
  industry: row.industry ?? "",
  posted: row.releaseDate ?? "",
  salary: row.salary ?? "",
  releaseDate: row.releaseDate ?? "",
  deadline: row.deadline ?? undefined,
  description: row.description ?? undefined,
  applyUrl: row.applyUrl ?? undefined,
  helpfulLinks: parseHelpfulLinks(row.helpfulLinks),
  roleSummaryHtml: row.roleSummary ?? undefined,
  filterTags: row.filterTags ?? [],
  logoSrc: row.logoUrl ?? undefined,
});

export async function getAllJobs(): Promise<Job[]> {
  const rows = await db.select().from(jobs);
  return rows.map(mapJobRow);
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const jobRows = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
  if (jobRows[0]) return mapJobRow(jobRows[0]);

  const internshipRows = await db.select().from(internships).where(eq(internships.slug, slug)).limit(1);
  return internshipRows[0] ? mapInternshipRow(internshipRows[0]) : undefined;
}

const mapInternshipRow = (row: typeof internships.$inferSelect): Job => ({
  slug: row.slug,
  company: row.company,
  role: row.role,
  location: row.location ?? "",
  industry: row.industry ?? "",
  posted: row.releaseDate ?? "",
  salary: row.salary ?? "",
  releaseDate: row.releaseDate ?? "",
  deadline: row.deadline ?? undefined,
  description: row.description ?? undefined,
  applyUrl: row.applyUrl ?? undefined,
  helpfulLinks: parseHelpfulLinks(row.helpfulLinks),
  roleSummaryHtml: row.roleSummary ?? undefined,
  filterTags: row.filterTags ?? [],
  logoSrc: row.logoUrl ?? undefined,
});

export async function getAllInternships(): Promise<Job[]> {
  const rows = await db.select().from(internships);
  return rows.map(mapInternshipRow);
}
