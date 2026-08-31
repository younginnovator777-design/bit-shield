"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, ShieldAlert, Cpu, List, Network, FolderOpen, Database,
  ArrowUpRight, AlertTriangle, CheckCircle2, ChevronRight, Zap, RefreshCw,
  Clock, Eye, Filter, Sparkles, TrendingUp
} from "lucide-react";
import { MOCK_OVERVIEW, MOCK_LEADS, type OverviewStats, type Lead } from "@/components/workspace/MockData";
import { RiskBadge, RiskBar, StatTile, GlassCard, SectionHeader, Tooltip } from "@/components/workspace/ui";
import ActivityTicker from "@/components/workspace/ActivityTicker";
import { useTheme } from "@/components/ThemeProvider";

// ── Theme-aware SVG Scatter Plot ──────────────────────────────────────────
function RiskMatrixChart({ leads }: { leads: Lead[] }) {
  const [hovered, setHovered] = useState<Lead | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const width  = 440;
  const height = 280;
  const pad    = 40;

  const xScale = (score: number) => pad + (score / 100) * (width  - 2 * pad);
  const yScale = (conf:  number) => height - pad - (conf  / 100) * (height - 2 * pad);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] p-3 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
          ANOMALY RISK × CONFIDENCE MATRIX
        </div>
        <div className="flex gap-3 text-[9px] font-mono">
          <span className="text-red-600 dark:text-rose-400 font-bold">■ Priority (&gt;80)</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">■ Investigate (70–80)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">■ Low (&lt;70)</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        {/* Quadrant dividing lines */}
        <line x1={xScale(80)} y1={pad} x2={xScale(80)} y2={height - pad}
          stroke={isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1"} strokeDasharray="3 3" strokeWidth="1" />
        <line x1={pad} y1={yScale(70)} x2={width - pad} y2={yScale(70)}
          stroke={isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1"} strokeDasharray="3 3" strokeWidth="1" />

        {/* Quadrant labels */}
        <text x={xScale(90)} y={yScale(85)} fill={isDark ? "#f43f5e" : "#dc2626"} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.8">PRIORITY</text>
        <text x={xScale(90)} y={yScale(35)} fill={isDark ? "#fbbf24" : "#d97706"} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.8">INVESTIGATE</text>
        <text x={xScale(40)} y={yScale(85)} fill={isDark ? "#34d399" : "#059669"} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.8">LOW CONCERN</text>
        <text x={xScale(40)} y={yScale(35)} fill={isDark ? "#94a3b8" : "#64748b"} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.8">INSUFFICIENT</text>

        {/* Axes */}
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke={isDark ? "rgba(255,255,255,0.2)" : "#94a3b8"} strokeWidth="1.5" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke={isDark ? "rgba(255,255,255,0.2)" : "#94a3b8"} strokeWidth="1.5" />

        {/* Axis tick labels */}
        <text x={width / 2} y={height - 8} fill={isDark ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="monospace" textAnchor="middle">Risk Score →</text>
        <text x={12} y={height / 2} fill={isDark ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90 12 ${height / 2})`}>Confidence % →</text>

        {/* Scatter dots */}
        {leads.map((l) => {
          const cx = xScale(l.risk_score);
          const cy = yScale(l.confidence_score);
          const isHigh = l.risk_score >= 80;
          const isMid  = l.risk_score >= 70 && l.risk_score < 80;
          const dotColor = isHigh ? "#ef4444" : isMid ? "#f59e0b" : "#10b981";
          const isHovered = hovered?.txid === l.txid;

          return (
            <g key={l.txid} onMouseEnter={() => setHovered(l)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
              {isHigh && (
                <circle cx={cx} cy={cy} r={isHovered ? 12 : 8} fill={dotColor} opacity="0.2" className="animate-ping" />
              )}
              <circle
                cx={cx} cy={cy} r={isHovered ? 7 : 5}
                fill={dotColor}
                stroke={isHovered ? "#ffffff" : isDark ? "#07090e" : "#ffffff"}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-150"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      {hovered && (
        <div className="absolute bottom-3 left-3 bg-slate-900/95 border border-slate-700 text-slate-100 text-[10px] font-mono px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md pointer-events-none">
          <div className="font-bold text-white">{hovered.txid}</div>
          <div className="text-slate-400">Risk: <span className="text-red-400 font-bold">{hovered.risk_score}</span> · Conf: <span className="text-emerald-400 font-bold">{hovered.confidence_score}%</span></div>
        </div>
      )}
    </div>
  );
}

// ── Main Command Center Component ─────────────────────────────────────────
export default function CommandCenter() {
  const [overview, setOverview] = useState<OverviewStats>(MOCK_OVERVIEW);
  const [leads, setLeads]       = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    fetch(`${API_BASE}/api/overview`)
      .then((r) => r.json()).then(setOverview).catch(() => setOverview(MOCK_OVERVIEW));
    fetch(`${API_BASE}/api/alerts`)
      .then((r) => r.json()).then(setLeads).catch(() => setLeads(MOCK_LEADS));
  }, []);

  const priorityLeads = leads.filter(l => l.risk_score >= 80);

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <LayoutDashboard className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h1 className="text-lg font-black text-slate-900 dark:text-white font-mono uppercase tracking-wide">Command Center</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            Real-time Threat Triage · Local Inference Diagnostics · FIU-India Compliance Pipeline
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/ingestion"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-[11px] font-mono font-bold bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-white/10 transition shadow-2xs"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Ingest Data</span>
          </Link>
          <Link
            href="/leads"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-[11px] font-mono font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-lg shadow-sm transition"
          >
            <span>Explorer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Live Ticker */}
      <ActivityTicker />

      {/* ── 4 Key Diagnostic Stat Tiles ──────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatTile
          icon={ShieldAlert}
          label="CRITICAL PRIORITY LEADS"
          value={overview.high_risk_count ?? 5}
          subtext="Requires immediate investigation"
          accentColor="text-red-600 dark:text-red-400 font-bold"
        />
        <StatTile
          icon={Zap}
          label="INGESTION VELOCITY"
          value={`${(overview.records_per_second ?? 2840).toLocaleString()}/s`}
          subtext="Offline Isolation Forest Engine"
          accentColor="text-emerald-600 dark:text-emerald-400 font-bold"
        />
        <StatTile
          icon={Cpu}
          label="MODEL ANOMALY THRESHOLD"
          value={`${overview.anomaly_threshold ?? 0.85}`}
          subtext="Unsupervised Isolation Forest v2.4"
          accentColor="text-slate-900 dark:text-white font-bold"
        />
        <StatTile
          icon={FolderOpen}
          label="ACTIVE CASE BINDERS"
          value={overview.active_cases ?? 3}
          subtext="FIU-India / PMLA Dossiers"
          accentColor="text-indigo-600 dark:text-indigo-400 font-bold"
        />
      </div>

      {/* ── Scatter Plot + Quick Triage Panel ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 ws-card p-5 flex flex-col justify-between">
          <SectionHeader
            icon={TrendingUp}
            title="Risk × Confidence Triage Matrix"
            subtitle="Real-time multi-dimensional vector distribution"
          />
          <RiskMatrixChart leads={leads} />
        </div>

        {/* Quick Lead Drawer / Preview */}
        <div className="lg:col-span-5 ws-card p-5 flex flex-col justify-between">
          <SectionHeader
            icon={ShieldAlert}
            title="Top Priority Lead"
            subtitle={selectedLead ? selectedLead.txid : priorityLeads[0]?.txid || "TXID-SELECT"}
          />

          {(() => {
            const active = selectedLead || priorityLeads[0] || leads[0];
            if (!active) return null;

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <RiskBadge band={active.priority_band} />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 font-bold">
                    Score: {active.risk_score}/100
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-500 mb-1 uppercase font-bold">
                    <span>Anomaly Score</span>
                    <span className={active.risk_score >= 80 ? "text-red-600 dark:text-red-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>
                      {active.risk_score}
                    </span>
                  </div>
                  <RiskBar score={active.risk_score} />
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] font-sans text-slate-800 dark:text-slate-300 leading-relaxed">
                  <strong className="font-mono text-slate-900 dark:text-white">Explanation:</strong> {active.shap_explanation}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-500">Amount:</span> <span className="text-slate-900 dark:text-white font-bold">{active.amount_btc} BTC</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-500">Fan-Out:</span> <span className="text-slate-900 dark:text-white font-bold">{active.fan_out_ratio}×</span>
                  </div>
                </div>

                <Link
                  href={`/investigation/${active.txid}`}
                  className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-xs font-mono font-bold rounded-xl transition shadow-xs uppercase tracking-wider"
                >
                  <span>Investigate Lead Canvas</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Priority Lead Table ────────────────────────────────────────── */}
      <div className="ws-card p-5">
        <SectionHeader
          icon={List}
          title="Critical Forensic Triage Queue"
          subtitle={`${priorityLeads.length} leads requiring immediate investigator action`}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-main)] text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 bg-[var(--bg-surface)]">
                <th className="py-3 px-3">TXID</th>
                <th className="py-3 px-3">Priority Band</th>
                <th className="py-3 px-3">Risk Score</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Value (BTC)</th>
                <th className="py-3 px-3">Fan-Out</th>
                <th className="py-3 px-3">Top Driving Feature</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[11px] font-mono">
              {leads.map((l) => (
                <tr
                  key={l.txid}
                  onClick={() => setSelectedLead(l)}
                  className={`hover:bg-[var(--bg-surface)] transition-colors cursor-pointer ${
                    selectedLead?.txid === l.txid ? "bg-[var(--bg-surface)]" : ""
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-200">{l.txid}</td>
                  <td className="py-3 px-3">
                    <RiskBadge band={l.priority_band} />
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span className={l.risk_score >= 80 ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}>
                      {l.risk_score}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{l.confidence_score}%</td>
                  <td className="py-3 px-3 text-slate-800 dark:text-slate-300 font-semibold">{l.amount_btc} BTC</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{l.fan_out_ratio}×</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400 truncate max-w-[180px]">{l.top_feature}</td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/investigation/${l.txid}`}
                      className="inline-flex items-center space-x-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 px-2.5 py-1 rounded-md transition shadow-2xs"
                    >
                      <span>Canvas</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
