// app/jobs/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToTrackerButton } from "@/components/add-to-tracker-button";
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

  const helpfulLinks = job.helpfulLinks ?? [];

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

              <AddToTrackerButton jobSlug={job.slug} />

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
              <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-4">
                {job.roleSummaryHtml && (
                  <div className="mb-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/aiStar.svg"
                        alt="AI summary"
                        width={26}
                        height={26}
                        className="-translate-x-0.5 -translate-y-0.5 opacity-80"
                      />
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        AI summary
                      </p>
                    </div>
                    <div
                      className="mt-2 text-sm leading-relaxed text-slate-100
            [&_p]:mb-5
              [&_h2]:mt-6 [&_h2]:mb-3
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6
              [&_li]:mb-2
              leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: job.roleSummaryHtml,
                      }}
                    />
                  </div>
                )}
                <div
                  className="prose prose-invert max-w-none text-sm text-slate-200
              [&_p]:mb-5
              [&_h2]:mt-6 [&_h2]:mb-3
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6
              [&_li]:mb-2
              leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
                />
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
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Date opened</span>
                  <span>📅 {job.releaseDate}</span>
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
              {helpfulLinks.length > 0 ? (
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
              ) : (
                <p className="text-xs text-slate-400">
                  Useful links coming soon.
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
