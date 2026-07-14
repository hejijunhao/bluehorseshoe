import { Bell, Radar, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

/**
 * Phase 1 placeholder for the per-stock monitoring feed. The layout is the real
 * Phase 2 shape — a cadence status line, a triaged updates timeline, and alerts
 * — but the engine (Vercel Cron → worker → Sonar → triage) isn't wired yet.
 */
export function MonitoringPanel({ ticker, cadenceHours = 24 }: { ticker: string; cadenceHours?: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radar className="h-3.5 w-3.5" />
          Monitoring
        </CardTitle>
        <Badge className="border-primary/30 bg-primary-soft text-primary">Phase 2</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-surface-2/50 px-3 py-2.5 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-subtle opacity-60" />
          </span>
          <span className="text-muted">
            Not yet watching {ticker} — the monitor turns on in Phase 2
            <span className="text-subtle"> (planned cadence: every {cadenceHours}h)</span>.
          </span>
        </div>

        {/* Ghost timeline — communicates what will land here. */}
        <ul className="space-y-3">
          {[
            { icon: Sparkles, label: "Material developments", sub: "Cited news, filings & social chatter via Perplexity Sonar" },
            { icon: Bell, label: "Proactive alerts", sub: "Only when something could move the price materially & soon" },
          ].map(({ icon: Icon, label, sub }) => (
            <li key={label} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-subtle">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="text-sm font-medium text-muted">{label}</div>
                <div className="text-xs text-subtle">{sub}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-2 opacity-40" aria-hidden>
          {[70, 52, 61].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2 w-2 shrink-0 rounded-full bg-border-strong" />
              <div className="h-2.5 rounded bg-border-strong" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
