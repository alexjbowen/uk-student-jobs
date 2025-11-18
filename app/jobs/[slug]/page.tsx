// app/jobs/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobBySlug } from "@/app/lib/jobs-data";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const helpfulLinks = [
    {
      label: `${job.company} careers site`,
      href: job.applyUrl || "#",
    },
    {
      label: `${job.company} LinkedIn`,
      href: "#",
    },
    {
      label: "Glassdoor reviews",
      href: "#",
    },
    {
      label: "Interview tips (coming soon)",
      href: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
        
        {/* BACK LINK (solo) */}
        <div className="text-sm text-slate-400 mb-2">
          <Link href="/" className="hover:text-[#00DAEE]">
            ← Back to today&apos;s roles
          </Link>
        </div>

        {/* HEADER WITH BUTTONS INLINE */}
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* TITLE + BADGE */}
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-semibold">{job.role}</h1>
              <span className="rounded-full border border-[#00DAEE]/60 bg-[#00DAEE]/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#00DAEE]">
                {job.posted}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-2">
              {job.applyUrl && (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#00DAEE] px-4 py-2 text-sm font-medium text-slate-950 hover:bg-[#00c6d8]"
                >
                  Apply on company site
                </a>
              )}

              <Link
                href="/"
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-[#00DAEE]"
              >
                Add to tracker (coming soon)
              </Link>

              <Link
                href={`/?tab=ask-ai&job=${job.slug}`}
                className="rounded-full border border-[#00DAEE]/70 bg-slate-900 px-4 py-2 text-sm text-[#00DAEE] hover:bg-slate-800"
              >
                Ask AI about this job
              </Link>
            </div>
          </div>

          {/* COMPANY */}
          <p className="text-slate-300 text-sm">{job.company}</p>
        </header>

        {/* GRID: description left + sidebar right */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.3fr)_minmax(260px,1fr)] mt-2">
          
          {/* LEFT: JOB DESCRIPTION */}
          <div>
            {job.description && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4">
                <h2 className="mb-2 text-sm font-semibold text-slate-100">
                  Job description
                </h2>
                <p className="whitespace-pre-line text-sm text-slate-200">
                  {job.description}
                </p>
              </section>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="space-y-4">
            {/* ROLE SUMMARY */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 text-sm text-slate-200">
              <h2 className="mb-3 text-sm font-semibold text-slate-100">
                Role summary
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Location</span>
                  <span>📍 {job.location}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Industry</span>
                  <span>🏢 {job.industry}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Salary</span>
                  <span>💰 {job.salary}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Deadline</span>
                    <span>⏰ {job.deadline}</span>
                  </div>
                )}
              </div>
            </section>

            {/* USEFUL LINKS */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 text-sm text-slate-200">
              <h2 className="mb-3 text-sm font-semibold text-slate-100">
                Useful links
              </h2>
              <ul className="space-y-2">
                {helpfulLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-200 hover:text-[#00DAEE]"
                    >
                      <span>↗</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
