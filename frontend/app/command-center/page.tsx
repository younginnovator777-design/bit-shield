"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, ShieldAlert, Cpu, List, Network, FolderOpen, Database,
  ArrowUpRight, AlertTriangle, CheckCircle2, ChevronRight, Zap, RefreshCw,
  Clock, Eye, Filter, Sparkles, TrendingUp, HelpCircle, Activity
} from "lucide-react";
import { MOCK_OVERVIEW, MOCK_LEADS, type OverviewStats, type Lead } from "@/components/workspace/MockData";
import { RiskBadge, RiskBar, StatTile, GlassCard, SectionHeader, Tooltip } from "@/components/workspace/ui";
import ActivityTicker from "@/components/workspace/ActivityTicker";
import { useTheme } from "@/components/ThemeProvider";

type SortField = "txid" | "risk" | "conf" | "band" | "btc" | "fan_out";
type SortDirection = "asc" | "desc";

const BAND_RANK: Record<Lead["priority_band"], number> = {
  "Priority Lead": 4,
  "Investigate Further": 3,
  "Low Concern": 2,
  "Insufficient Evidence": 1,
};

const ROWS_PER_PAGE = 25;

// ── Theme-aware SVG Scatter Plot ──────────────────────────────────────────
function RiskMatrixChart({
  leads,
  selected,
  onSelect,
}: {
  leads: Lead[];
  selected: string | null;
  onSelect: (band: string | null) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const W = 540;
  const H = 240;
  const PAD_LEFT = 48;
  const PAD_RIGHT = 24;
  const PAD_TOP = 20;
  const PAD_BOTTOM = 34;

  const PLOT_W = W - PAD_LEFT - PAD_RIGHT;
  const PLOT_H = H - PAD_TOP - PAD_BOTTOM;
  const HALF_W = PLOT_W / 2;
  const HALF_H = PLOT_H / 2;
  const MID_X = PAD_LEFT + HALF_W;
  const MID_Y = PAD_TOP + HALF_H;

  const quadrants = [
    {
      id: "investigate",
      x: PAD_LEFT,
      y: PAD_TOP,
      w: HALF_W,
      h: HALF_H,
      label: "Investigate Further",
      tag: "INVESTIGATE FURTHER",
      tagX: PAD_LEFT + 8,
      tagY: PAD_TOP + 13,
      bg: isDark ? "rgba(245, 158, 11, 0.08)" : "rgba(245, 158, 11, 0.05)",
      tagColor: isDark ? "#fbbf24" : "#d97706",
    },
    {
      id: "priority",
      x: MID_X,
      y: PAD_TOP,
      w: HALF_W,
      h: HALF_H,
      label: "Priority Lead",
      tag: "PRIORITY LEAD",
      tagX: W - PAD_RIGHT - 8,
      tagY: PAD_TOP + 13,
      tagAnchor: "end",
      bg: isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.06)",
      tagColor: isDark ? "#f43f5e" : "#dc2626",
    },
    {
      id: "insufficient",
      x: PAD_LEFT,
      y: MID_Y,
      w: HALF_W,
      h: HALF_H,
      label: "Insufficient Evidence",
      tag: "INSUFFICIENT EVIDENCE",
      tagX: PAD_LEFT + 8,
      tagY: H - PAD_BOTTOM - 6,
      bg: isDark ? "rgba(148, 163, 184, 0.05)" : "rgba(100, 116, 139, 0.04)",
      tagColor: isDark ? "#94a3b8" : "#64748b",
    },
    {
      id: "low_concern",
      x: MID_X,
      y: MID_Y,
      w: HALF_W,
      h: HALF_H,
      label: "Low Concern",
      tag: "LOW CONCERN",
      tagX: W - PAD_RIGHT - 8,
      tagY: H - PAD_BOTTOM - 6,
      tagAnchor: "end",
      bg: isDark ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.05)",
      tagColor: isDark ? "#34d399" : "#059669",
    },
  ];

  const plotX = (confidence: number) => PAD_LEFT + (Math.max(0, Math.min(100, confidence)) / 100) * PLOT_W;
  const plotY = (risk: number) => (H - PAD_BOTTOM) - (Math.max(0, Math.min(100, risk)) / 100) * PLOT_H;

  const dotColor: Record<Lead["priority_band"], string> = {
    "Priority Lead": isDark ? "#f43f5e" : "#dc2626",
    "Investigate Further": isDark ? "#fbbf24" : "#d97706",
    "Low Concern": isDark ? "#34d399" : "#059669",
    "Insufficient Evidence": isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full flex items-center justify-center relative overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-h-[260px] overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outer Boundary Box */}
          <rect
            x={PAD_LEFT}
            y={PAD_TOP}
            width={PLOT_W}
            height={PLOT_H}
            fill={isDark ? "#07090e" : "#f8fafc"}
            stroke={isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1"}
            strokeWidth="1"
            rx="6"
          />

          {/* Quadrants — Clickable */}
          {quadrants.map((q) => {
            const isSelected = selected === q.label;
            return (
              <g key={q.id} className="cursor-pointer" onClick={() => onSelect(isSelected ? null : q.label)}>
                <rect
                  x={q.x}
                  y={q.y}
                  width={q.w}
                  height={q.h}
                  fill={q.bg}
                  stroke={isSelected ? q.tagColor : "transparent"}
                  strokeWidth={isSelected ? "1.5" : "0"}
                  className="transition-all duration-200"
                />
                <text
                  x={q.tagX}
                  y={q.tagY}
                  textAnchor={(q.tagAnchor as any) ?? "start"}
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                  fill={q.tagColor}
                  opacity={isSelected ? "1" : "0.85"}
                >
                  {q.tag}
                </text>
              </g>
            );
          })}

          {/* Midpoint Dividing Gridlines */}
          <line
            x1={MID_X}
            y1={PAD_TOP}
            x2={MID_X}
            y2={H - PAD_BOTTOM}
            stroke={isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}
            strokeDasharray="4,4"
            strokeWidth="1"
          />
          <line
            x1={PAD_LEFT}
            y1={MID_Y}
            x2={W - PAD_RIGHT}
            y2={MID_Y}
            stroke={isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}
            strokeDasharray="4,4"
            strokeWidth="1"
          />

          {/* Axis Ticks */}
          <text x={PAD_LEFT} y={H - PAD_BOTTOM + 11} textAnchor="middle" fontSize="7" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace">0%</text>
          <text x={MID_X} y={H - PAD_BOTTOM + 11} textAnchor="middle" fontSize="7" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace">50%</text>
          <text x={W - PAD_RIGHT} y={H - PAD_BOTTOM + 11} textAnchor="middle" fontSize="7" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace">100%</text>

          <text x={PAD_LEFT - 6} y={H - PAD_BOTTOM} textAnchor="end" fontSize="7" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace">0</text>
          <text x={PAD_LEFT - 6} y={MID_Y + 3} textAnchor="end" fontSize="7" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace">50</text>
          <text x={PAD_LEFT - 6} y={PAD_TOP + 4} textAnchor="end" fontSize="7" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace">100</text>

          {/* Axis Labels */}
          <text x={MID_X} y={H - 4} textAnchor="middle" fontSize="7" fontWeight="bold" fill={isDark ? "#94a3b8" : "#475569"} fontFamily="monospace">CONFIDENCE LEVEL (CORROBORATION) →</text>
          <text x={12} y={MID_Y} textAnchor="middle" fontSize="7" fontWeight="bold" fill={isDark ? "#94a3b8" : "#475569"} fontFamily="monospace" transform={`rotate(-90, 12, ${MID_Y})`}>ANOMALY RISK ↑</text>

          {/* Data Points */}
          {leads.map((lead) => {
            const cx = plotX(lead.confidence_score);
            const cy = plotY(lead.risk_score);
            const color = dotColor[lead.priority_band];
            const isMatch = !selected || selected === lead.priority_band;

            return (
              <g key={lead.txid} className="cursor-pointer">
                {isMatch && (
                  <circle cx={cx} cy={cy} r={6} fill={color} opacity="0.25" />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isMatch ? 4.5 : 3}
                  fill={color}
                  opacity={isMatch ? 0.95 : 0.3}
                  stroke={isDark ? "#07090e" : "#ffffff"}
                  strokeWidth="1.2"
                  className="transition-all duration-200"
                >
                  <title>{`${lead.txid} (${lead.priority_band})\nRisk: ${lead.risk_score} / 100\nConfidence: ${lead.confidence_score}%`}</title>
                </circle>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

// ── Main Command Center Component ─────────────────────────────────────────
export default function CommandCenter() {
  const [overview, setOverview] = useState<OverviewStats>(MOCK_OVERVIEW);
  const [leads, setLeads]       = useState<Lead[]>(MOCK_LEADS);
  const [scatter, setScatter]   = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("risk");
  const [sortDir, setSortDir]     = useState<SortDirection>("desc");
  const [page, setPage]           = useState<number>(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    // Ingestion safeguard: if custom session dataset is active, DO NOT fetch from backend to prevent overwrite
    const sessionData = typeof window !== "undefined" ? sessionStorage.getItem("bit_shield_session_ingest") : null;
    if (sessionData) {
      try {
        const customLeads = JSON.parse(sessionData) as Lead[];
        if (Array.isArray(customLeads) && customLeads.length > 0) {
          setLeads(customLeads);
          const highPriority = customLeads.filter(
            (l) => l.priority_band === "Priority Lead" || l.risk_score >= 80
          ).length;
          const avgConf = Math.round(
            customLeads.reduce((acc, l) => acc + (l.confidence_score || 0), 0) / customLeads.length
          );
          setOverview({
            transactions_processed: customLeads.length * 125,
            total_leads: customLeads.length,
            high_priority_leads: highPriority,
            high_risk_count: highPriority,
            anomaly_threshold: 0.85,
            active_cases: 3,
            avg_confidence: avgConf,
            engine_status: "ONLINE",
            last_run: new Date().toISOString(),
            model_version: "iso-forest-v2.4.1 (Custom Session)",
            records_per_second: 3200,
            memory_mb: 420,
            tree_depth: 12,
          });
          return;
        }
      } catch (e) {
        console.error("Failed to parse custom session ingest in command center", e);
      }
    }

    fetch(`${API_BASE}/api/overview`)
      .then((r) => r.json()).then(setOverview).catch(() => setOverview(MOCK_OVERVIEW));
    fetch(`${API_BASE}/api/alerts`)
      .then((r) => r.json()).then(setLeads).catch(() => setLeads(MOCK_LEADS));
  }, []);

  const handleSelectScatter = (band: string | null) => {
    setScatter(band);
    setPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  };

  const filtered = scatter ? leads.filter((l) => l.priority_band === scatter) : leads;

  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortField === "txid") {
      diff = a.txid.localeCompare(b.txid);
    } else if (sortField === "risk") {
      diff = a.risk_score - b.risk_score;
    } else if (sortField === "conf") {
      diff = a.confidence_score - b.confidence_score;
    } else if (sortField === "band") {
      diff = (BAND_RANK[a.priority_band] ?? 0) - (BAND_RANK[b.priority_band] ?? 0);
    } else if (sortField === "btc") {
      diff = (a.amount_btc ?? 0) - (b.amount_btc ?? 0);
    } else if (sortField === "fan_out") {
      diff = (a.fan_out_ratio ?? 0) - (b.fan_out_ratio ?? 0);
    }
    return sortDir === "asc" ? diff : -diff;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedLeads = sorted.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="opacity-30 text-[9px]">↕</span>;
    }
    return <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>;
  };

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* Page Header */}
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
            className="flex items-center space-x-1.5 px-3 py-1.5 text-[11px] font-mono font-bold bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 rounded-lg border border-[var(--border-main)] transition shadow-2xs"
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

      {/* 4 Key Diagnostic Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatTile
          icon={ShieldAlert}
          label="CRITICAL PRIORITY LEADS"
          value={overview.high_risk_count ?? overview.high_priority_leads ?? 5}
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

      {/* Scatter Plot Matrix Card */}
      <div className="ws-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-[var(--border-subtle)] pb-3">
          <SectionHeader
            icon={Activity}
            title="Risk × Confidence Matrix"
            subtitle="Click quadrant to filter triage queue · Real-time 2D correlation matrix"
          />
          {scatter && (
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 bg-[var(--bg-surface)] border border-[var(--border-main)] px-3 py-1 rounded-lg self-start sm:self-auto shadow-2xs">
              <Filter className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>Filter: <strong>{scatter}</strong></span>
              <button
                onClick={() => handleSelectScatter(null)}
                className="ml-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition px-1 rounded"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <RiskMatrixChart leads={leads} selected={scatter} onSelect={handleSelectScatter} />

        <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
          <div className="flex flex-wrap gap-4">
            <LegendRow color="bg-red-600 dark:bg-rose-500" label="Priority Lead (≥80 Risk)" />
            <LegendRow color="bg-amber-600 dark:bg-amber-400" label="Investigate Further" />
            <LegendRow color="bg-emerald-600 dark:bg-emerald-400" label="Low Concern (<40 Risk)" />
            <LegendRow color="bg-slate-500 dark:bg-slate-400" label="Insufficient Evidence" />
          </div>
          <span className="text-slate-500 dark:text-slate-400 font-bold text-[9px]">
            Showing {sorted.length} of {leads.length} leads
          </span>
        </div>
      </div>

      {/* Priority Triage Queue Table */}
      <div className="ws-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-[var(--border-subtle)] pb-3">
          <SectionHeader
            icon={List}
            title="Priority Triage Queue"
            subtitle={`${sorted.length} leads${scatter ? ` (filtered: ${scatter})` : " · all bands"}`}
          />
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>Sort:</span>
            <span className="text-slate-900 dark:text-white font-bold uppercase">{sortField} ({sortDir})</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[var(--border-main)] text-[10px] uppercase text-slate-500 dark:text-slate-400 bg-[var(--bg-surface)]">
                <th onClick={() => handleSort("txid")} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition select-none">
                  TXID {getSortIcon("txid")}
                </th>
                <th onClick={() => handleSort("band")} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition select-none">
                  Band {getSortIcon("band")}
                </th>
                <th onClick={() => handleSort("risk")} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition select-none">
                  Risk {getSortIcon("risk")}
                </th>
                <th onClick={() => handleSort("conf")} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition select-none">
                  Conf {getSortIcon("conf")}
                </th>
                <th onClick={() => handleSort("btc")} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition select-none">
                  BTC {getSortIcon("btc")}
                </th>
                <th onClick={() => handleSort("fan_out")} className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition select-none">
                  Fan-Out {getSortIcon("fan_out")}
                </th>
                <th className="py-3 px-3">Top Feature</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[11px]">
              {paginatedLeads.map((l) => (
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
                      className="inline-flex items-center space-x-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-2.5 py-1 rounded-md transition bg-[var(--bg-surface)] shadow-2xs"
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

        {/* Pagination Bar */}
        {sorted.length > ROWS_PER_PAGE && (
          <div className="mt-4 pt-3 border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold">
            <div>
              Showing <strong className="text-slate-900 dark:text-white font-bold">{(currentPage - 1) * ROWS_PER_PAGE + 1}</strong> to{" "}
              <strong className="text-slate-900 dark:text-white font-bold">{Math.min(currentPage * ROWS_PER_PAGE, sorted.length)}</strong> of{" "}
              <strong className="text-slate-900 dark:text-white font-bold">{sorted.length}</strong> leads
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="px-3 py-1 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed text-[10px] uppercase font-bold"
              >
                Previous
              </button>

              <span className="px-2 text-[10px] font-bold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed text-[10px] uppercase font-bold"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
