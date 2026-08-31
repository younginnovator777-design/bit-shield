"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Network, ChevronRight, Zap } from "lucide-react";
import { MOCK_LEADS, type Lead } from "@/components/workspace/MockData";
import { RiskBadge } from "@/components/workspace/ui";

export default function GraphWorkspaceIndex() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [page, setPage] = useState<number>(1);
  const LEADS_PER_PAGE = 10;

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const sessionData = typeof window !== "undefined" ? sessionStorage.getItem("bit_shield_session_ingest") : null;
    if (sessionData) {
      try {
        const stored = JSON.parse(sessionData);
        if (Array.isArray(stored) && stored.length > 0) {
          setLeads(stored as Lead[]);
          return;
        }
      } catch { /* keep mock default */ }
    }
    fetch(`${API_BASE}/api/alerts`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof window !== "undefined" && sessionStorage.getItem("bit_shield_session_ingest")) return;
        setLeads(data);
      })
      .catch(() => setLeads(MOCK_LEADS));
  }, []);

  const sorted = [...leads].sort((a, b) => b.risk_score - a.risk_score);
  const totalPages = Math.max(1, Math.ceil(sorted.length / LEADS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedLeads = sorted.slice((currentPage - 1) * LEADS_PER_PAGE, currentPage * LEADS_PER_PAGE);

  return (
    <div className="space-y-5 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Network className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h1 className="text-lg font-black text-slate-900 dark:text-white font-mono uppercase tracking-wide">Graph Intelligence Workspace</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">Select a lead to open its interactive network investigation canvas (10 per page).</p>
        </div>
        <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-[var(--bg-surface)] border border-[var(--border-main)] px-3 py-1.5 rounded-xl font-bold self-start sm:self-auto shadow-2xs">
          {sorted.length} Total Targets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginatedLeads.map(lead => (
          <Link key={lead.txid} href={`/investigation/${lead.txid}`}
            className="ws-card ws-card-hover p-4 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-900 dark:text-slate-200">{lead.txid}</span>
              <RiskBadge band={lead.priority_band} />
            </div>
            <div className="flex gap-4 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <span className={lead.risk_score >= 80 ? "text-red-600 dark:text-red-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>Risk {lead.risk_score}</span>
              <span>·</span>
              <span>{lead.neighborhood_nodes?.length || 0} nodes</span>
              <span>·</span>
              <span className={lead.fan_out_ratio >= 8 ? "text-red-600 dark:text-red-400 font-bold" : ""}>{lead.fan_out_ratio}× fan-out</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 font-sans">{lead.shap_explanation}</p>
            <div className="flex items-center justify-end gap-1 text-[10px] font-mono text-slate-700 dark:text-slate-300 font-bold">
              Open Investigation Canvas <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {sorted.length > LEADS_PER_PAGE && (
        <div className="ws-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold">
          <div>
            Showing <strong className="text-slate-900 dark:text-white">{(currentPage - 1) * LEADS_PER_PAGE + 1}</strong> to{" "}
            <strong className="text-slate-900 dark:text-white">{Math.min(currentPage * LEADS_PER_PAGE, sorted.length)}</strong> of{" "}
            <strong className="text-slate-900 dark:text-white">{sorted.length}</strong> targets
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-bold uppercase shadow-2xs"
            >
              Previous
            </button>

            <span className="px-2 text-[10px] font-bold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-bold uppercase shadow-2xs"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
