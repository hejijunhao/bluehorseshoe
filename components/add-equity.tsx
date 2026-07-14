"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Check, Loader2, Plus, Search } from "lucide-react";
import { addTickerAction } from "@/app/actions";
import type { SecurityRef } from "@/lib/market/types";
import { Button } from "./ui/button";

export function AddEquityButton({ label = "Add equity" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        {label}
      </Button>
      {open && <AddEquityDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function AddEquityDialog({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SecurityRef[]>([]);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const query = q.trim();
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: ctrl.signal,
        });
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        /* aborted or offline — ignore */
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  function add(ref: SecurityRef) {
    setAdded(ref.ticker);
    start(async () => {
      await addTickerAction(ref);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
      <button
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-3.5">
          <Search className="h-4 w-4 shrink-0 text-subtle" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ticker or company…"
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
          />
          {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-subtle" />}
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {!q.trim() && (
            <p className="px-3 py-6 text-center text-sm text-subtle">
              Start typing to search — try{" "}
              <span className="text-muted">AAPL</span>,{" "}
              <span className="text-muted">NVDA</span>, or{" "}
              <span className="text-muted">“Tesla”</span>.
            </p>
          )}
          {q.trim() && !loading && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-subtle">
              No matches in the Phase 1 universe.
            </p>
          )}
          {results.map((r) => (
            <button
              key={r.ticker}
              type="button"
              disabled={pending}
              onClick={() => add(r)}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-hover disabled:opacity-60"
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-semibold">{r.ticker}</span>
                  <span className="text-[11px] text-subtle">{r.exchange}</span>
                </span>
                <span className="line-clamp-1 text-xs text-muted">{r.name}</span>
              </span>
              {added === r.ticker ? (
                <Check className="h-4 w-4 shrink-0 text-positive" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-subtle" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
