"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, Search, SlidersHorizontal, ChevronRight, Zap, ArrowUpRight, Network } from "lucide-react";
import { MOCK_LEADS, type Lead } from "@/components/workspace/MockData";
import { RiskBadge, RiskBar, ShapBar, GlassCard, SectionHeader, Tooltip } from "@/components/workspace/ui";

type SortKey = "risk" | "confidence" | "btc";
type FilterBand = Lead["priority_band"] | "All";

const BAND_OPTIONS: FilterBand[] = ["All", "Priority Lead", "Investigate Further", "Low Concern", "Insufficient Evidence"];

export default function LeadsExplorer() {
  const [leads, setLeads]         = useState<Lead[]>(MOCK_LEADS);
  const [search, setSearch]       = useState("");
  const [sortKey, setSortKey]     = useState<SortKey>("risk");
  const [filterBand, setFilter]   = useState<FilterBand>("All");
  const [expanded, setExpanded]   = useState<string | null>(null);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    fetch(`${API_BASE}/api/alerts`)
      .then(r => r.json()).then(setLeads).catch(() => setLeads(MOCK_LEADS));
  }, []);

  // Keyboard shortcut: '/' to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        document.getElementById("leads-search")?.focus();
      }
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = leads
    .filter(l => filterBand === "All" || l.priority_band === filterBand)
    .filter(l => !search || l.txid.toLowerCase().includes(search.toLowerCase()) || l.shap_explanation.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "risk")       return b.risk_score - a.risk_score;
      if (sortKey === "confidence") return b.confidence_score - a.confidence_score;
      return b.amount_btc - a.amount_btc;
    });

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <List className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h1 className="text-lg font-black text-slate-900 dark:text-white font-mono tracking-wide uppercase">Leads Explorer</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            {filtered.length} leads · Press <kbd className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded px-1 font-mono text-[10px] text-slate-800 dark:text-slate-300 font-bold">/</kbd> to search · <kbd className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded px-1 font-mono text-[10px] text-slate-800 dark:text-slate-300 font-bold">Esc</kbd> to close
          </p>
        </div>
        <Link href="/command-center" className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-semibold">
          <ArrowUpRight className="w-3 h-3" /> Command Center
        </Link>
      </div>

      {/* Filter / Sort toolbar */}
      <div className="ws-card p-3 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500" />
          <input
            id="leads-search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search TXID or explanation…"
            className="w-full pl-8 pr-3 py-1.5 bg-[var(--bg-input)] border border-[var(--border-main)] rounded-lg text-[12px] font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition shadow-2xs"
          />
        </div>

        {/* Band filter */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3 h-3 text-slate-500 dark:text-slate-400" />
          <div className="flex gap-1 flex-wrap">
            {BAND_OPTIONS.map(band => (
              <button key={band} onClick={() => setFilter(band)}
                className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border transition-all ${
                  filterBand === band
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white font-black"
                    : "border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}>
                {band === "Insufficient Evidence" ? "Insuff." : band}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
          <span>Sort:</span>
          {(["risk", "confidence", "btc"] as SortKey[]).map(k => (
            <button key={k} onClick={() => setSortKey(k)}
              className={`px-2 py-0.5 rounded border transition font-bold ${
                sortKey === k ? "border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white bg-[var(--bg-surface)]" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}>
              {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(lead => (
          <div key={lead.txid} className="ws-card ws-card-hover flex flex-col justify-between">
            {/* Card header */}
            <div className="p-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-start justify-between mb-3 gap-2">
                <span className="text-[11px] font-mono text-slate-900 dark:text-slate-200 bg-[var(--bg-surface)] px-2 py-0.5 rounded border border-[var(--border-main)] font-bold truncate">
                  {lead.txid}
                </span>
                <RiskBadge band={lead.priority_band} />
              </div>

              {/* Risk + Confidence bars */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 dark:text-slate-400 mb-1 uppercase font-bold">
                    <span className="flex items-center gap-1"><Zap className="w-2.5 h-2.5 text-red-600 dark:text-red-400" />Risk</span>
                    <span className={lead.risk_score >= 80 ? "text-red-600 dark:text-red-400 font-bold" : "text-amber-600 dark:text-amber-400"}>{lead.risk_score}</span>
                  </div>
                  <RiskBar score={lead.risk_score} />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 dark:text-slate-400 mb-1 uppercase font-bold">
                    <span>Confidence</span>
                    <span className={lead.confidence_score >= 70 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-slate-400"}>{lead.confidence_score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full animate-bar-fill" style={{ width: `${lead.confidence_score}%` }} />
                  </div>
                </div>
              </div>

              {/* Mini stats row */}
              <div className="flex gap-3 text-[10px] font-mono text-slate-600 dark:text-slate-400 font-semibold">
                <span>{lead.amount_btc} BTC</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className={lead.fan_out_ratio >= 8 ? "text-red-600 dark:text-red-400 font-bold" : ""}>{lead.fan_out_ratio}× fan-out</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span>{lead.output_count} outputs</span>
              </div>
            </div>

            {/* Explanation */}
            <div className="px-4 py-3 flex-1">
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3 font-sans">
                {lead.shap_explanation}
              </p>
            </div>

            {/* AI Risk Breakdown toggle */}
            {(() => {
              const hasShap = Boolean(lead.shap_values && Array.isArray(lead.shap_values) && lead.shap_values.length > 0);
              return (
                <div className="mt-auto">
                  {expanded === lead.txid && hasShap && (
                    <div className="px-4 pb-3">
                      <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase mb-2 font-bold tracking-wider">
                        AI RISK BREAKDOWN
                      </div>
                      <ShapBar values={lead.shap_values} />
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="px-4 pb-4 flex gap-2">
                    {hasShap && (
                      <button
                        onClick={() => setExpanded(expanded === lead.txid ? null : lead.txid)}
                        className="flex-1 text-[10px] font-mono font-bold uppercase border border-[var(--border-main)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2 rounded-lg transition bg-[var(--bg-surface)] shadow-2xs"
                      >
                        {expanded === lead.txid ? "HIDE EXPLANATION" : "EXPLAIN RISK"}
                      </button>
                    )}
                    <Link
                      href={`/investigation/${lead.txid}`}
                      className={`${hasShap ? "flex-1" : "w-full"} flex items-center justify-center gap-1 text-[10px] font-mono font-bold uppercase bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 border border-slate-900 dark:border-white py-2 rounded-lg transition-all shadow-2xs`}
                    >
                      INVESTIGATE <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full ws-card p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">No leads match the current filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
