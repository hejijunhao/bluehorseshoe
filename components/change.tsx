import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn, formatPct } from "@/lib/utils";

export function Change({
  change,
  changePct,
  showAbs = true,
  size = "md",
  className,
}: {
  change: number;
  changePct: number;
  showAbs?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const positive = changePct >= 0;
  const sign = change > 0 ? "+" : change < 0 ? "−" : "";
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "nums inline-flex items-center gap-1 font-medium",
        positive ? "text-positive" : "text-negative",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      {showAbs && <span>{sign}{Math.abs(change).toFixed(2)}</span>}
      <span>({formatPct(changePct)})</span>
    </span>
  );
}
