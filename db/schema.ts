import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location"),
  industry: text("industry"),
  salary: text("salary"),
  deadline: text("deadline"),
  releaseDate: text("releaseDate"),
  description: text("description"),
  roleSummary: text("roleSummary"),
  applyUrl: text("applyUrl"),
  logoUrl: text("logoUrl"),
  filterTags: text("filterTags").array(),
  helpfulLinks: json("helpfulLinks"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const internships = pgTable("internships", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location"),
  industry: text("industry"),
  salary: text("salary"),
  deadline: text("deadline"),
  releaseDate: text("releaseDate"),
  description: text("description"),
  roleSummary: text("roleSummary"),
  applyUrl: text("applyUrl"),
  logoUrl: text("logoUrl"),
  filterTags: text("filterTags").array(),
  helpfulLinks: json("helpfulLinks"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const trackedJobs = pgTable(
  "tracked_jobs",
  {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    jobSlug: text("jobSlug").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    dateApplied: timestamp("dateApplied"),
  },
  (table) => ({
    userJobUnique: uniqueIndex("tracked_jobs_user_job_unique").on(
      table.userId,
      table.jobSlug,
    ),
  }),
);

export const applicationGoals = pgTable(
  "application_goals",
  {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    period: text("period").notNull(),
    target: integer("target").notNull(),
    isNoGoal: boolean("isNoGoal").notNull().default(false),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    userUnique: uniqueIndex("application_goals_user_unique").on(table.userId),
  }),
);
