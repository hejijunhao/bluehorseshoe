"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { ChartRange } from "@/lib/market/types";

/**
 * Interactive price chart. All ranges are precomputed server-side and passed
 * in, so switching ranges is instant with no round-trip (Phase 1 mock data is
 * tiny). A real provider in Phase 2 can swap to on-demand fetching behind the
 * same component API.
 */
export function PriceChart({
  seriesByRange,
  ranges,
  positive,
  defaultRange = "1M",
}: {
  seriesByRange: Record<string, number[]>;
  ranges: ChartRange[];
  positive: boolean;
  defaultRange?: ChartRange;
}) {
  const gradId = useId();
  const [range, setRange] = useState<ChartRange>(
    ranges.includes(defaultRange) ? defaultRange : ranges[0],
  );
  const data = seriesByRange[range] ?? [];

  const W = 820;
  const H = 260;
  const padY = 12;
  const color = positive ? "var(--positive)" : "var(--negative)";

  let line = "";
  let area = "";
  if (data.length >= 2) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const stepX = W / (data.length - 1);
    const usable = H - padY * 2;
    const pts = data.map((v, i) => {
      const x = i * stepX;
      const y = padY + (usable - ((v - min) / span) * usable);
      return [x, y] as const;
    });
    line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
    area = `${line} L ${W} ${H} L 0 ${H} Z`;
  }

  return (
    <div>
      <div className="mb-4 flex gap-1">
        {ranges.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "nums h-7 rounded-md px-2.5 text-xs font-medium transition-colors",
              r === range
                ? "bg-surface-2 text-fg"
                : "text-subtle hover:bg-surface-hover hover:text-muted",
            )}
          >
            {r}
          </button>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-[240px] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${range} price chart`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {area && <path d={area} fill={`url(#${gradId})`} />}
        {line && (
          <path
            d={line}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
}
