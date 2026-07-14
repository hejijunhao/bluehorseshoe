"use client";

import { useTransition } from "react";
import { Loader2, X } from "lucide-react";
import { removeTickerAction } from "@/app/actions";
import { cn } from "@/lib/utils";

export function RemoveButton({ ticker, className }: { ticker: string; className?: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      aria-label={`Remove ${ticker} from watchlist`}
      disabled={pending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        start(() => {
          void removeTickerAction(ticker);
        });
      }}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md text-subtle transition-colors hover:bg-negative/10 hover:text-negative",
        className,
      )}
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
    </button>
  );
}
