"use client";

import Link from "next/link";
import { Network, ChevronRight, Zap } from "lucide-react";
import { MOCK_LEADS } from "@/components/workspace/MockData";
import { RiskBadge } from "@/components/workspace/ui";

export default function GraphWorkspaceIndex() {
  const sorted = [...MOCK_LEADS].sort((a, b) => b.risk_score - a.risk_score);
  return (
    <div className="space-y-5 animate-fade-in-up">
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <Network className="w-4 h-4 text-slate-400" />
          <h1 className="text-lg font-black text-white font-mono uppercase tracking-wide">Graph Intelligence Workspace</h1>
        </div>
        <p className="text-xs text-slate-400 font-sans">Select a lead to open its interactive network investigation canvas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.map(lead => (
          <Link key={lead.txid} href={`/investigation/${lead.txid}`}
            className="ws-card ws-card-hover p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-300">{lead.txid}</span>
              <RiskBadge band={lead.priority_band} />
            </div>
            <div className="flex gap-4 text-[11px] font-mono text-slate-400">
              <span className={lead.risk_score >= 80 ? "text-red-400 font-bold" : "text-amber-400"}>Risk {lead.risk_score}</span>
              <span>·</span>
              <span>{lead.neighborhood_nodes.length} nodes</span>
              <span>·</span>
              <span className={lead.fan_out_ratio >= 8 ? "text-red-400" : ""}>{lead.fan_out_ratio}× fan-out</span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2 font-sans">{lead.shap_explanation}</p>
            <div className="flex items-center justify-end gap-1 text-[10px] font-mono text-slate-500">
              Open Investigation Canvas <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
