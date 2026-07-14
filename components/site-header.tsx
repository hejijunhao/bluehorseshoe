import Link from "next/link";
import { LineChart } from "lucide-react";
import { AddEquityButton } from "./add-equity";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-fg">
            <LineChart className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight">Blue Horseshoe</span>
          <span className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-subtle sm:inline">
            watch
          </span>
        </Link>
        <AddEquityButton />
      </div>
    </header>
  );
}
