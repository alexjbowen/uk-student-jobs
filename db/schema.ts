import {
  json,
  pgTable,
  serial,
  text,
  timestamp,
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
