// app/tracker/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { todaysJobs, type Job } from "@/app/lib/jobs-data";
import { AddToTrackerButton } from "@/components/add-to-tracker-button";

function IconButton({
  emoji,
  label,
  onClick,
}: {
  emoji: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-[#00DAEE] hover:text-[#00DAEE]"
    >
      <span aria-hidden>{emoji}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

function MetaItem({
  iconSrc,
  fallbackEmoji,
  label,
}: {
  iconSrc: string;
  fallbackEmoji: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-300">
      <Image
        src={iconSrc}
        alt=""
        width={14}
        height={14}
        className="hidden sm:inline-block"
      />
      <span className="sm:hidden" aria-hidden>
        {fallbackEmoji}
      </span>
      <span>{label}</span>
    </span>
  );
}

const FILTER_GROUPS = [
  {
    id: "finance",
    label: "Finance",
    subFilters: [
      { id: "finance-investment-banking", label: "Investment Banking (IB)" },
      { id: "finance-sales-trading", label: "Sales & Trading" },
      { id: "finance-asset-management", label: "Asset Management" },
      { id: "finance-private-equity", label: "Private Equity (PE)" },
      { id: "finance-venture-capital", label: "Venture Capital (VC)" },
      { id: "finance-hedge-funds", label: "Hedge Funds" },
      { id: "finance-wealth-banking", label: "Wealth / Private Banking" },
      { id: "finance-corporate-banking", label: "Corporate Banking" },
      { id: "finance-risk", label: "Risk" },
      { id: "finance-quant-finance", label: "Quantitative Finance / Research" },
      { id: "finance-fintech", label: "Fintech" },
    ],
  },
  {
    id: "consulting",
    label: "Consulting",
    subFilters: [
      { id: "consulting-strategy", label: "Strategy Consulting" },
      { id: "consulting-management", label: "Management Consulting" },
      { id: "consulting-economic", label: "Economic Consulting" },
      { id: "consulting-technology", label: "Technology / Digital Consulting" },
      { id: "consulting-healthcare", label: "Healthcare Consulting" },
      { id: "consulting-public-sector", label: "Public Sector Consulting" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    subFilters: [
      { id: "technology-swe", label: "Software Engineering (SWE)" },
      { id: "technology-data-science", label: "Data Science / ML" },
      { id: "technology-data-analyst", label: "Data Analyst / BI" },
      { id: "technology-cybersecurity", label: "Cybersecurity" },
      { id: "technology-product", label: "Product Management (Tech)" },
      { id: "technology-cloud-devops", label: "Cloud / DevOps / Infrastructure" },
      { id: "technology-quant-engineering", label: "Quant Engineering" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    subFilters: [
      { id: "engineering-mechanical", label: "Mechanical Engineering" },
      { id: "engineering-electrical", label: "Electrical Engineering" },
      { id: "engineering-civil", label: "Civil & Structural Engineering" },
      { id: "engineering-aerospace", label: "Aerospace Engineering" },
      { id: "engineering-automotive", label: "Automotive" },
      { id: "engineering-energy", label: "Energy & Utilities" },
      { id: "engineering-chemical", label: "Chemical Engineering" },
    ],
  },
];

type Segment = "finance" | "technology" | "engineering";

const SEGMENT_GROUPS: Record<Segment, string[]> = {
  finance: ["finance", "consulting"],
  technology: ["technology"],
  engineering: ["engineering"],
};

function filterIdsForSegment(segment: Segment) {
  return FILTER_GROUPS.filter((group) =>
    SEGMENT_GROUPS[segment].includes(group.id),
  ).flatMap((group) => group.subFilters.map((sub) => sub.id));
}

export default function TrackerPage() {
  const router = useRouter();
  const [segment, setSegment] = useState<Segment>("finance");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    () => new Set(filterIdsForSegment("finance")),
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const visibleGroups = useMemo(
    () =>
      FILTER_GROUPS.filter((group) =>
        SEGMENT_GROUPS[segment].includes(group.id),
      ),
    [segment],
  );

  const visibleFilterIds = useMemo(
    () => filterIdsForSegment(segment),
    [segment],
  );

  useEffect(() => {
    setSelectedFilters(new Set(visibleFilterIds));
    setExpandedGroups(new Set());
  }, [visibleFilterIds]);

  const isReleaseToday = (releaseDate: string) => {
    const release = new Date(releaseDate);
    release.setHours(0, 0, 0, 0);
    return release.toDateString() === today.toDateString();
  };

  const filteredJobs = todaysJobs.filter((job) =>
    job.filterTags.some((tag) => selectedFilters.has(tag)),
  );

  const todaysReleases = filteredJobs.filter((job) =>
    isReleaseToday(job.releaseDate),
  );

  const renderJobCard = (job: Job, idx: number, showNewBadge = false) => (
    <div
      key={`${job.slug}-${idx}`}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          {job.logoSrc && (
            <div className="h-[110px] w-[110px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
              <Image
                src={job.logoSrc}
                alt={`${job.company} logo`}
                width={110}
                height={110}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold">{job.role}</span>
              {showNewBadge && (
                <span className="text-[10px] rounded-full border border-[#00DAEE]/60 bg-[#00DAEE]/10 px-2 py-0.5 uppercase tracking-wide text-[#00DAEE]">
                  New today
                </span>
              )}
            </div>

            <div className="text-sm text-slate-100">{job.company}</div>

            {/* Meta row: location, industry, salary */}
            <div className="flex flex-wrap gap-3 items-center pt-1">
              <MetaItem
                iconSrc="/icons/location.svg"
                fallbackEmoji="📍"
                label={job.location}
              />
              <MetaItem
                iconSrc="/icons/industry.svg"
                fallbackEmoji="🏢"
                label={job.industry}
              />
              <MetaItem
                iconSrc="/icons/salary.svg"
                fallbackEmoji="💰"
                label={job.salary}
              />
            </div>

            <div className="text-xs text-slate-400 pt-1 flex flex-wrap items-center gap-2">
              <span>📅 Date opened: {job.releaseDate}</span>
              {job.deadline && (
                <>
                  <span className="text-slate-700">•</span>
                  <span className="text-slate-400">⏰ {job.deadline}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Icon buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <IconButton
            emoji="ℹ️"
            label="Learn more"
            onClick={() => {
              router.push(`/jobs/${job.slug}`);
            }}
          />
          <IconButton
            emoji="🔗"
            label="Apply"
            onClick={() => {
              if (job.applyUrl) {
                window.open(job.applyUrl, "_blank");
              }
            }}
          />
          <IconButton
            emoji="💬"
            label="Ask a question"
            onClick={() => {
              console.log("Ask question about", job.company);
            }}
          />
          <AddToTrackerButton jobSlug={job.slug} variant="icon" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="px-6 py-6 max-w-6xl mx-auto w-full">
      <div className="space-y-6">
        {/* Top row: title + quick filters */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Application Tracker (test)</h1>
            <p className="text-slate-300 text-sm">
              Jobs that opened{" "}
              <span className="text-[#00DAEE] font-medium">today</span>.{"  "}
              Later we&apos;ll let you sort by deadline, sector, and fit.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs sm:text-sm sm:items-end">
            <div className="flex gap-2">
              {(["finance", "technology", "engineering"] as Segment[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSegment(key)}
                    className={`rounded-full border px-4 py-2 transition ${
                      segment === key
                        ? "border-[#00DAEE] text-[#00DAEE]"
                        : "border-slate-700 text-slate-300 hover:border-[#00DAEE]"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ),
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterMenuOpen((prev) => !prev)}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-slate-200 hover:border-[#00DAEE] hover:text-[#00DAEE] flex items-center gap-2"
              >
                <span>Filter sectors</span>
                <span className="text-[11px] text-slate-400">
                  ({selectedFilters.size}/{visibleFilterIds.length})
                </span>
                <span aria-hidden>{isFilterMenuOpen ? "▲" : "▼"}</span>
              </button>

              {isFilterMenuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-xs text-slate-200 shadow-lg space-y-3">
                  <button
                    type="button"
                    className="w-full rounded-lg border border-slate-700 px-3 py-2 text-left text-[11px] uppercase tracking-wide text-slate-300 hover:border-[#00DAEE]"
                    onClick={() => {
                      const allSelected =
                        selectedFilters.size === visibleFilterIds.length;
                      setSelectedFilters(
                        allSelected ? new Set() : new Set(visibleFilterIds),
                      );
                    }}
                  >
                    {selectedFilters.size === visibleFilterIds.length
                      ? "Deselect all"
                      : "Select all"}
                  </button>

                  <div className="space-y-2">
                    {visibleGroups.map((group) => {
                      const selectedInGroup = group.subFilters.filter((sub) =>
                        selectedFilters.has(sub.id),
                      ).length;
                      const allSelected =
                        selectedInGroup === group.subFilters.length;
                      const partiallySelected =
                        selectedInGroup > 0 && !allSelected;
                      const expanded = expandedGroups.has(group.id);
                      const flatten =
                        visibleGroups.length === 1 &&
                        (segment === "technology" || segment === "engineering");

                      if (flatten) {
                        return (
                          <div key={group.id} className="space-y-1">
                            {group.subFilters.map((sub) => {
                              const checked = selectedFilters.has(sub.id);
                              return (
                                <label
                                  key={sub.id}
                                  className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-800/50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-[#00DAEE]"
                                    checked={checked}
                                    onChange={() => {
                                      setSelectedFilters((prev) => {
                                        const next = new Set(prev);
                                        if (next.has(sub.id)) {
                                          next.delete(sub.id);
                                        } else {
                                          next.add(sub.id);
                                        }
                                        return next;
                                      });
                                    }}
                                  />
                                  <span>{sub.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        );
                      }

                      return (
                        <div
                          key={group.id}
                          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-2 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="flex h-5 w-5 items-center justify-center rounded border border-slate-600 text-[12px]"
                              aria-label={`Select ${group.label}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFilters((prev) => {
                                  const next = new Set(prev);
                                  if (allSelected) {
                                    group.subFilters.forEach((sub) =>
                                      next.delete(sub.id),
                                    );
                                  } else {
                                    group.subFilters.forEach((sub) =>
                                      next.add(sub.id),
                                    );
                                  }
                                  return next;
                                });
                              }}
                            >
                              {allSelected ? "✓" : partiallySelected ? "–" : ""}
                            </button>
                            <button
                              type="button"
                              className="flex flex-1 items-center justify-between text-left"
                              onClick={() => {
                                setExpandedGroups((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(group.id)) {
                                    next.delete(group.id);
                                  } else {
                                    next.add(group.id);
                                  }
                                  return next;
                                });
                              }}
                            >
                              <span>{group.label}</span>
                              <span className="text-[10px] text-slate-400">
                                ({selectedInGroup}/{group.subFilters.length}){" "}
                                {expanded ? "▲" : "▼"}
                              </span>
                            </button>
                          </div>

                          {expanded && (
                            <div className="mt-2 space-y-1 pl-7">
                              {group.subFilters.map((sub) => {
                                const checked = selectedFilters.has(sub.id);
                                return (
                                  <label
                                    key={sub.id}
                                    className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-800/50 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-[#00DAEE]"
                                      checked={checked}
                                      onChange={() => {
                                        setSelectedFilters((prev) => {
                                          const next = new Set(prev);
                                          if (next.has(sub.id)) {
                                            next.delete(sub.id);
                                          } else {
                                            next.add(sub.id);
                                          }
                                          return next;
                                        });
                                      }}
                                    />
                                    <span>{sub.label}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Today’s new jobs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Today&apos;s new roles
            </h2>
            <span className="text-xs text-slate-400">
              {todaysReleases.length} roles • {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-3">
            {todaysReleases.length > 0 ? (
              todaysReleases.map((job, idx) => renderJobCard(job, idx, true))
            ) : (
              <p className="text-sm text-slate-400">
                No new roles today — check the full list below.
              </p>
            )}
          </div>
        </div>

        {/* All roles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              All roles
            </h2>
            <span className="text-xs text-slate-400">
              {filteredJobs.length} shown
            </span>
          </div>
          <div className="space-y-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) =>
                renderJobCard(job, idx, isReleaseToday(job.releaseDate)),
              )
            ) : (
              <p className="text-sm text-slate-400">
                No roles match the selected sectors.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
