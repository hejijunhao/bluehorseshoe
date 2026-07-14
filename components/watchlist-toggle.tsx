"use client";

import { useTransition } from "react";
import { Check, Loader2, Plus } from "lucide-react";
import { addTickerAction, removeTickerAction } from "@/app/actions";
import type { SecurityRef } from "@/lib/market/types";
import { Button } from "./ui/button";

export function WatchlistToggle({
  inWatchlist,
  security,
}: {
  inWatchlist: boolean;
  security: SecurityRef;
}) {
  const [pending, start] = useTransition();

  if (inWatchlist) {
    return (
      <Button
        variant="subtle"
        size="sm"
        disabled={pending}
        onClick={() => start(() => void removeTickerAction(security.ticker))}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4 text-positive" />
        )}
        In watchlist
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      disabled={pending}
      onClick={() =>
        start(() =>
          void addTickerAction({
            ticker: security.ticker,
            name: security.name,
            exchange: security.exchange,
          }),
        )
      }
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      Add to watchlist
    </Button>
  );
}
