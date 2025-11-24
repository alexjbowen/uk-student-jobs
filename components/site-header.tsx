"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "@/components/theme-provider";

const tabs = [
  { id: "tracker", href: "/tracker", label: "Tracker" },
  { id: "applications", href: "/applications", label: "Applications" },
  { id: "ask-ai", href: "/ask-ai", label: "Ask AI" },
  { id: "cv-help", href: "/cv-help", label: "CV Help" },
];

function getActiveTab(pathname: string): string {
  if (pathname.startsWith("/ask-ai")) return "ask-ai";
  if (pathname.startsWith("/cv-help")) return "cv-help";
  if (pathname.startsWith("/applications")) return "applications";
  if (pathname.startsWith("/jobs")) return "tracker"; // job pages still highlight Tracker
  return "tracker";
}

export function SiteHeader() {
  const pathname = usePathname();
  const active = getActiveTab(pathname || "/tracker");
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center justify-between px-6 py-3">
      <div className="text-lg font-semibold">
        UK Grad Jobs{" "}
        <span className="text-xs text-slate-400">
          (better name pending 🚧)
        </span>
      </div>

      <nav className="flex gap-2 text-sm">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`rounded-full px-4 py-2 transition ${
                isActive
                  ? "bg-[#00DAEE] text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={toggleTheme}
          className="ml-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200 hover:border-[#00DAEE] hover:text-[#00DAEE]"
          aria-label="Toggle color theme"
        >
          <span>{theme === "light" ? "Light" : "Dark"} mode</span>
          <span
            className={`inline-flex h-5 w-8 items-center rounded-full bg-slate-700 transition ${
              theme === "light" ? "justify-start" : "justify-end"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-white" />
          </span>
        </button>
      </nav>
    </header>
  );
}
