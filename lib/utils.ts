import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className combiner (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const fmtCompact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});
const fmtInt = new Intl.NumberFormat("en-US");

/** $1.23T / $45.6B / $12.3M style. */
export function formatCompactUsd(n: number | null | undefined): string {
  if (n == null) return "—";
  return "$" + fmtCompact.format(n);
}

/** 12,345,678 */
export function formatInt(n: number | null | undefined): string {
  if (n == null) return "—";
  return fmtInt.format(Math.round(n));
}

/** 45.6M (no currency) */
export function formatCompact(n: number | null | undefined): string {
  if (n == null) return "—";
  return fmtCompact.format(n);
}

export function formatPrice(n: number | null | undefined, currency = "USD"): string {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatPct(n: number | null | undefined, withSign = true): string {
  if (n == null) return "—";
  const sign = withSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}
