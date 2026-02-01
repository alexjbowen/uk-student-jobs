"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/tracker";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <span className="text-sm font-medium text-slate-200">
        Loading...
      </span>
    </div>
  );
}
