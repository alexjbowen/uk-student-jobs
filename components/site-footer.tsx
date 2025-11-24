export function SiteFooter() {
    return (
      <footer className="w-full border-t border-slate-800 bg-slate-900/80 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} UK Grad Jobs (prototype)</span>
        <span className="text-slate-600">
          hello.
        </span>
      </footer>
    );
  }
  