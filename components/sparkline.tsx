import { cn } from "@/lib/utils";

/** Minimal, axis-free line chart for cards. Pure SVG — safe in server components. */
export function Sparkline({
  data,
  positive,
  width = 160,
  height = 40,
  className,
}: {
  data: number[];
  positive: boolean;
  width?: number;
  height?: number;
  className?: string;
}) {
  if (!data || data.length < 2) {
    return <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden />;
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pad = 3;
  const usable = height - pad * 2;
  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = pad + (usable - ((v - min) / span) * usable);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const color = positive ? "var(--positive)" : "var(--negative)";
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
