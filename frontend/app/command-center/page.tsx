"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  AlertTriangle, ChevronRight, Activity, Zap, Shield, LayoutDashboard,
  TrendingUp, Clock, ArrowUpRight, Search, HelpCircle, ShieldCheck, Filter,
} from "lucide-react";
import { MOCK_LEADS, MOCK_OVERVIEW, type Lead } from "@/components/workspace/MockData";
import { RiskBadge, RiskBar, StatTile, GlassCard, SectionHeader, Tooltip } from "@/components/workspace/ui";
import ActivityTicker from "@/components/workspace/ActivityTicker";

// ── Risk × Confidence 2D scatter plot (SVG-based, interactive) ──────────
function RiskConfidenceScatter({
  leads, selected, onSelect,
}: { leads: Lead[]; selected: string | null; onSelect: (band: string | null) => void }) {
  const W = 280; const H = 220; const PAD = 28;

  const quadrants = [
    { x: PAD, y: PAD,        w: (W-PAD*2)/2, h: (H-PAD*2)/2, label: "Investigate Further", color: "rgba(217,119,6,0.12)",  border: "rgba(217,119,6,0.4)" },
    { x: PAD+(W-PAD*2)/2, y: PAD,       w: (W-PAD*2)/2, h: (H-PAD*2)/2, label: "Priority Lead",        color: "rgba(220,38,38,0.12)", border: "rgba(220,38,38,0.4)" },
    { x: PAD, y: PAD+(H-PAD*2)/2,       w: (W-PAD*2)/2, h: (H-PAD*2)/2, label: "Insufficient Evidence", color: "rgba(71,85,105,0.1)",  border: "rgba(71,85,105,0.2)" },
    { x: PAD+(W-PAD*2)/2, y: PAD+(H-PAD*2)/2, w: (W-PAD*2)/2, h: (H-PAD*2)/2, label: "Low Concern", color: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.3)" },
  ];

  const plotX = (confidence: number) => PAD + (confidence / 100) * (W - PAD * 2);
  const plotY = (risk: number)       => H - PAD - (risk / 100) * (H - PAD * 2);

  const dotColor: Record<Lead["priority_band"], string> = {
    "Priority Lead":         "#dc2626",
    "Investigate Further":   "#d97706",
    "Low Concern":           "#10b981",
    "Insufficient Evidence": "#64748b",
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={W} height={H} className="overflow-visible">
        {/* Grid lines */}
        <line x1={PAD+(W-PAD*2)/2} y1={PAD} x2={PAD+(W-PAD*2)/2} y2={H-PAD} stroke="rgba(255,255,255,0.08)" strokeDasharray="4,4" />
        <line x1={PAD} y1={PAD+(H-PAD*2)/2} x2={W-PAD} y2={PAD+(H-PAD*2)/2} stroke="rgba(255,255,255,0.08)" strokeDasharray="4,4" />

        {/* Quadrant fills — clickable */}
        {quadrants.map((q) => (
          <rect key={q.label} x={q.x} y={q.y} width={q.w} height={q.h}
            fill={selected === q.label ? q.color : "transparent"}
            stroke={q.border} strokeWidth={selected === q.label ? 1 : 0.5}
            rx="4" className="cursor-pointer transition-all duration-200"
            onClick={() => onSelect(selected === q.label ? null : q.label)}
          />
        ))}

        {/* Axis labels */}
        <text x={W/2} y={H-4} textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">CONFIDENCE →</text>
        <text x={8} y={H/2} textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace"
          transform={`rotate(-90, 8, ${H/2})`}>RISK ↑</text>

        {/* Data points */}
        {leads.map((lead) => (
          <g key={lead.txid}>
            <circle
              cx={plotX(lead.confidence_score)}
              cy={plotY(lead.risk_score)}
              r={6}
              fill={dotColor[lead.priority_band]}
              opacity={0.85}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
              className="cursor-pointer"
            >
              <title>{`${lead.txid}: Risk ${lead.risk_score}, Conf ${lead.confidence_score}%`}</title>
            </circle>
          </g>
        ))}
      </svg>
      {selected && (
        <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <Filter className="w-2.5 h-2.5" />
          Filtering: <span className="text-white font-semibold">{selected}</span>
          <button onClick={() => onSelect(null)} className="ml-1 text-slate-500 hover:text-white transition">✕</button>
        </div>
      )}
    </div>
  );
}

// ── Main Command Center ────────────────────────────────────────────────
export default function CommandCenter() {
  const [overview, setOverview] = useState<typeof MOCK_OVERVIEW>(MOCK_OVERVIEW);
  const [leads, setLeads]       = useState<Lead[]>(MOCK_LEADS);
  const [scatter, setScatter]   = useState<string | null>(null);

  useEffect(() => {
    // Try API; fall back to mock
    fetch("http://127.0.0.1:8000/api/overview")
      .then(r => r.json()).then(setOverview).catch(() => setOverview(MOCK_OVERVIEW));
    fetch("http://127.0.0.1:8000/api/alerts")
      .then(r => r.json()).then(setLeads).catch(() => setLeads(MOCK_LEADS));
  }, []);

  const filtered = scatter ? leads.filter(l => l.priority_band === scatter) : leads;
  const sorted   = [...filtered].sort((a, b) => b.risk_score - a.risk_score);

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <h1 className="text-lg font-black text-white font-mono tracking-wide uppercase">Command Center</h1>
          </div>
          <p className="text-xs text-slate-400 font-sans">Executive operational summary · Prioritized triage queue · Live feed</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          OFFLINE MODE ACTIVE
        </div>
      </div>

      {/* ── Live ticker ─────────────────────────────────────────── */}
      <ActivityTicker />

      {/* ── KPI Tiles ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile label="TX Processed"     value={overview.transactions_processed.toLocaleString()} sub="current session" />
        <StatTile label="Leads Surfaced"   value={overview.total_leads}   sub="active queue" accent="text-amber-400" />
        <StatTile label="High Priority"    value={overview.high_priority_leads} sub="escalate now" accent="text-red-400" />
        <StatTile label="Avg Confidence"   value={`${overview.avg_confidence}%`} sub="evidence quality" accent="text-emerald-400" />
      </div>

      {/* ── Main 2-column row ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Triage Table (2/3) */}
        <div className="lg:col-span-2 ws-card p-5">
          <SectionHeader icon={AlertTriangle} title="Priority Triage Queue"
            subtitle={`${sorted.length} leads${scatter ? ` (filtered: ${scatter})` : " · all bands"}`} />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase tracking-wider text-[9px]">
                  <th className="py-2.5 px-3">TXID</th>
                  <th className="py-2.5 px-3">
                    <Tooltip content="Isolation Forest anomaly score (0–100). Higher = more anomalous.">
                      <span className="cursor-help flex items-center gap-1">RISK <HelpCircle className="w-2.5 h-2.5" /></span>
                    </Tooltip>
                  </th>
                  <th className="py-2.5 px-3">
                    <Tooltip content="Evidence confidence based on corroboration breadth (0–100%).">
                      <span className="cursor-help flex items-center gap-1">CONF <HelpCircle className="w-2.5 h-2.5" /></span>
                    </Tooltip>
                  </th>
                  <th className="py-2.5 px-3">BAND</th>
                  <th className="py-2.5 px-3">BTC</th>
                  <th className="py-2.5 px-3">
                    <Tooltip content="Fan-out ratio: number of output addresses relative to inputs. High values indicate dispersal.">
                      <span className="cursor-help flex items-center gap-1">FAN-OUT <HelpCircle className="w-2.5 h-2.5" /></span>
                    </Tooltip>
                  </th>
                  <th className="py-2.5 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {sorted.map((lead) => (
                  <tr key={lead.txid}
                    className="hover:bg-white/[0.03] transition-colors duration-150 group">
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">
                      <span className="text-slate-400">{lead.txid.slice(0,6)}</span>
                      <span className="text-slate-500">{lead.txid.slice(6)}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <span className={`font-mono font-black text-sm ${lead.risk_score >= 80 ? "text-red-400" : lead.risk_score >= 60 ? "text-amber-400" : "text-slate-300"}`}>
                          {lead.risk_score}
                        </span>
                        <div className="flex-1"><RiskBar score={lead.risk_score} /></div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span className={lead.confidence_score >= 75 ? "text-emerald-400" : lead.confidence_score >= 50 ? "text-slate-300" : "text-slate-500"}>
                        {lead.confidence_score}%
                      </span>
                    </td>
                    <td className="py-3 px-3"><RiskBadge band={lead.priority_band} /></td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">{lead.amount_btc}</td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span className={lead.fan_out_ratio >= 8 ? "text-red-400 font-bold" : "text-slate-300"}>
                        {lead.fan_out_ratio}×
                      </span>
                      {lead.fan_out_ratio >= 8 && (
                        <Zap className="inline w-2.5 h-2.5 text-amber-400 ml-1" />
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link href={`/investigation/${lead.txid}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold font-mono bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/[0.1] hover:border-white/[0.2] px-2.5 py-1.5 rounded-lg transition-all">
                        INVESTIGATE <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500 text-xs font-mono">
                      No leads match the current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Risk × Confidence Matrix (1/3) */}
        <div className="ws-card p-5 flex flex-col">
          <SectionHeader icon={Activity} title="Risk × Confidence" subtitle="Click quadrant to filter" />
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <RiskConfidenceScatter leads={leads} selected={scatter} onSelect={setScatter} />
          </div>

          <div className="mt-auto pt-4 border-t border-slate-800/60 space-y-2 text-[10px] font-mono">
            <LegendRow color="bg-red-600"    label="Priority Lead" />
            <LegendRow color="bg-amber-500"  label="Investigate Further" />
            <LegendRow color="bg-emerald-500" label="Low Concern" />
            <LegendRow color="bg-slate-500"  label="Insufficient Evidence" />
          </div>
        </div>

      </div>

    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
      {label}
    </div>
  );
}
