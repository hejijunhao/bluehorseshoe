import Link from "next/link";
import { Change } from "./change";
import { RemoveButton } from "./remove-button";
import { Sparkline } from "./sparkline";
import { formatPrice } from "@/lib/utils";

export interface StockCardData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  spark: number[];
}

export function StockCard({ ticker, name, price, change, changePct, spark }: StockCardData) {
  const positive = changePct >= 0;
  return (
    <Link
      href={`/stock/${ticker}`}
      className="group relative block rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
    >
      <RemoveButton
        ticker={ticker}
        className="absolute right-2.5 top-2.5 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="pr-6">
        <div className="font-semibold tracking-tight">{ticker}</div>
        <div className="mt-0.5 line-clamp-1 text-xs text-subtle">{name}</div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="nums text-xl font-semibold leading-none">{formatPrice(price)}</div>
          <div className="mt-1.5">
            <Change change={change} changePct={changePct} size="sm" />
          </div>
        </div>
        <Sparkline data={spark} positive={positive} className="h-11 w-[112px] shrink-0" />
      </div>
    </Link>
  );
}
