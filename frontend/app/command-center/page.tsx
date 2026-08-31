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
  const W = 540;
  const H = 220;
  const PAD_LEFT = 48;
  const PAD_RIGHT = 24;
  const PAD_TOP = 20;
  const PAD_BOTTOM = 34;

  const PLOT_W = W - PAD_LEFT - PAD_RIGHT; // 468
  const PLOT_H = H - PAD_TOP - PAD_BOTTOM; // 166
  const HALF_W = PLOT_W / 2;               // 234
  const HALF_H = PLOT_H / 2;               // 83
  const MID_X = PAD_LEFT + HALF_W;         // 282
  const MID_Y = PAD_TOP + HALF_H;          // 103

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
      bg: "rgba(245, 158, 11, 0.07)",
      border: "rgba(245, 158, 11, 0.35)",
      hoverBg: "rgba(245, 158, 11, 0.16)",
      tagColor: "#f59e0b",
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
      bg: "rgba(239, 68, 68, 0.08)",
      border: "rgba(239, 68, 68, 0.35)",
      hoverBg: "rgba(239, 68, 68, 0.18)",
      tagColor: "#ef4444",
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
      bg: "rgba(100, 116, 139, 0.05)",
      border: "rgba(100, 116, 139, 0.25)",
      hoverBg: "rgba(100, 116, 139, 0.12)",
      tagColor: "#94a3b8",
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
      bg: "rgba(16, 185, 129, 0.06)",
      border: "rgba(16, 185, 129, 0.3)",
      hoverBg: "rgba(16, 185, 129, 0.14)",
      tagColor: "#10b981",
    },
  ];

  const plotX = (confidence: number) => PAD_LEFT + (Math.max(0, Math.min(100, confidence)) / 100) * PLOT_W;
  const plotY = (risk: number) => (H - PAD_BOTTOM) - (Math.max(0, Math.min(100, risk)) / 100) * PLOT_H;

  const dotColor: Record<Lead["priority_band"], string> = {
    "Priority Lead": "#ef4444",
    "Investigate Further": "#f59e0b",
    "Low Concern": "#10b981",
    "Insufficient Evidence": "#94a3b8",
  };

  const dotGlow: Record<Lead["priority_band"], string> = {
    "Priority Lead": "rgba(239, 68, 68, 0.4)",
    "Investigate Further": "rgba(245, 158, 11, 0.4)",
    "Low Concern": "rgba(16, 185, 129, 0.4)",
    "Insufficient Evidence": "rgba(148, 163, 184, 0.3)",
  };

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full flex items-center justify-center relative overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-h-[260px] overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow-scatter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Boundary Box */}
          <rect
            x={PAD_LEFT}
            y={PAD_TOP}
            width={PLOT_W}
            height={PLOT_H}
            fill="#080a10"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            rx="6"
          />

          {/* Quadrant Backdrops — Clickable */}
          {quadrants.map((q) => {
            const isSelected = selected === q.label;
            return (
              <g key={q.id} className="cursor-pointer" onClick={() => onSelect(isSelected ? null : q.label)}>
                <rect
                  x={q.x}
                  y={q.y}
                  width={q.w}
                  height={q.h}
                  fill={isSelected ? q.hoverBg : q.bg}
                  stroke={isSelected ? q.tagColor : "transparent"}
                  strokeWidth={isSelected ? "1.5" : "0"}
                  className="transition-all duration-200 hover:opacity-90"
                />
                <text
                  x={q.tagX}
                  y={q.tagY}
                  textAnchor={(q.tagAnchor as any) ?? "start"}
                  fontSize="7"
                  fontWeight="600"
                  fontFamily="monospace"
                  fill={q.tagColor}
                  opacity={isSelected ? "1" : "0.75"}
                  letterSpacing="0.03em"
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
            stroke="rgba(255,255,255,0.18)"
            strokeDasharray="4,4"
            strokeWidth="1"
          />
          <line
            x1={PAD_LEFT}
            y1={MID_Y}
            x2={W - PAD_RIGHT}
            y2={MID_Y}
            stroke="rgba(255,255,255,0.18)"
            strokeDasharray="4,4"
            strokeWidth="1"
          />

          {/* Axis Tick Marks & Values */}
          {/* X ticks */}
          <text x={PAD_LEFT} y={H - PAD_BOTTOM + 11} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="monospace">0%</text>
          <text x={MID_X} y={H - PAD_BOTTOM + 11} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="monospace">50%</text>
          <text x={W - PAD_RIGHT} y={H - PAD_BOTTOM + 11} textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="monospace">100%</text>

          {/* Y ticks */}
          <text x={PAD_LEFT - 6} y={H - PAD_BOTTOM} textAnchor="end" fontSize="7" fill="#64748b" fontFamily="monospace">0</text>
          <text x={PAD_LEFT - 6} y={MID_Y + 3} textAnchor="end" fontSize="7" fill="#64748b" fontFamily="monospace">50</text>
          <text x={PAD_LEFT - 6} y={PAD_TOP + 4} textAnchor="end" fontSize="7" fill="#64748b" fontFamily="monospace">100</text>

          {/* Axis Labels */}
          <text
            x={MID_X}
            y={H - 4}
            textAnchor="middle"
            fontSize="7"
            fontWeight="bold"
            fill="#94a3b8"
            fontFamily="monospace"
            letterSpacing="0.05em"
          >
            CONFIDENCE LEVEL (CORROBORATION) →
          </text>
          <text
            x={12}
            y={MID_Y}
            textAnchor="middle"
            fontSize="7"
            fontWeight="bold"
            fill="#94a3b8"
            fontFamily="monospace"
            letterSpacing="0.05em"
            transform={`rotate(-90, 12, ${MID_Y})`}
          >
            ANOMALY RISK ↑
          </text>

          {/* Scatter Data Points with Glow */}
          {leads.map((lead) => {
            const cx = plotX(lead.confidence_score);
            const cy = plotY(lead.risk_score);
            const color = dotColor[lead.priority_band];
            const isMatch = !selected || selected === lead.priority_band;

            return (
              <g key={lead.txid} className="cursor-pointer transition-transform duration-150">
                {/* Glow ring */}
                {isMatch && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6.5}
                    fill={dotGlow[lead.priority_band]}
                    opacity={0.35}
                  />
                )}
                {/* Core Dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isMatch ? 4.5 : 3}
                  fill={color}
                  opacity={isMatch ? 0.95 : 0.25}
                  stroke="#ffffff"
                  strokeWidth={isMatch ? 1.2 : 0.5}
                  className="transition-all duration-200"
                >
                  <title>{`${lead.txid} (${lead.priority_band})\nRisk: ${lead.risk_score} / 100\nConfidence: ${lead.confidence_score}%\nOutputs: ${lead.output_count} · Fan-out: ${lead.fan_out_ratio}×`}</title>
                </circle>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

type SortField = "txid" | "risk" | "conf" | "band" | "btc" | "fan_out";
type SortDirection = "asc" | "desc";

const BAND_RANK: Record<Lead["priority_band"], number> = {
  "Priority Lead": 4,
  "Investigate Further": 3,
  "Low Concern": 2,
  "Insufficient Evidence": 1,
};

const ROWS_PER_PAGE = 25;

// ── Main Command Center ────────────────────────────────────────────────
export default function CommandCenter() {
  const [overview, setOverview] = useState<typeof MOCK_OVERVIEW>(MOCK_OVERVIEW);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [scatter, setScatter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("risk");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://bit-shield.onrender.com";

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
            avg_confidence: avgConf,
            engine_status: "ONLINE",
            last_run: new Date().toISOString(),
            model_version: "iso-forest-v2.4.1 (Custom Session)",
            records_per_second: 3200,
            memory_mb: 420,
            tree_depth: 12,
          });
          return; // Suppress backend API fetch
        }
      } catch (e) {
        console.error("Failed to parse custom session ingest in command center", e);
      }
    }

    // Try API; fall back to mock
    fetch(`${API_URL}/api/overview`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof window !== "undefined" && sessionStorage.getItem("bit_shield_session_ingest")) return;
        setOverview(data);
      })
      .catch(() => setOverview(MOCK_OVERVIEW));

    fetch(`${API_URL}/api/alerts`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof window !== "undefined" && sessionStorage.getItem("bit_shield_session_ingest")) return;
        setLeads(data);
      })
      .catch(() => setLeads(MOCK_LEADS));
  }, []);

  const handleSelectScatter = (band: string | null) => {
    setScatter(band);
    setPage(1); // Reset page on filter toggle
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1); // Reset page on sort change
  };

  const filtered = scatter ? leads.filter(l => l.priority_band === scatter) : leads;
  
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
    return <span className="text-emerald-400 font-bold text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>;
  };

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
        <StatTile label="TX Processed" value={overview.transactions_processed.toLocaleString()} sub="current session" />
        <StatTile label="Leads Surfaced" value={overview.total_leads} sub="active queue" accent="text-amber-400" />
        <StatTile label="High Priority" value={overview.high_priority_leads} sub="escalate now" accent="text-red-400" />
        <StatTile label="Avg Confidence" value={`${overview.avg_confidence}%`} sub="evidence quality" accent="text-emerald-400" />
      </div>

      {/* ── Full-Width Horizontal Risk × Confidence Quadrant Matrix ── */}
      <div className="ws-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <SectionHeader
            icon={Activity}
            title="Risk × Confidence Matrix"
            subtitle="Click quadrant to filter triage queue · Real-time 2D correlation matrix"
          />
          {scatter && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-slate-900/90 border border-white/10 px-3 py-1 rounded-lg self-start sm:self-auto shadow-sm">
              <Filter className="w-3 h-3 text-amber-400" />
              <span>Active Filter: <strong className="text-white">{scatter}</strong></span>
              <button
                onClick={() => handleSelectScatter(null)}
                className="ml-1 text-slate-400 hover:text-white transition px-1 rounded hover:bg-white/10"
                title="Clear filter"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <RiskConfidenceScatter leads={leads} selected={scatter} onSelect={handleSelectScatter} />

        <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
          <div className="flex flex-wrap gap-4">
            <LegendRow color="bg-red-600" label="Priority Lead (≥80 Risk)" />
            <LegendRow color="bg-amber-500" label="Investigate Further" />
            <LegendRow color="bg-emerald-500" label="Low Concern (<40 Risk)" />
            <LegendRow color="bg-slate-500" label="Insufficient Evidence" />
          </div>
          <span className="text-slate-500 text-[9px]">
            Showing {sorted.length} of {leads.length} leads in matrix
          </span>
        </div>
      </div>

      {/* ── Full-Width Priority Triage Queue Table ──────────────── */}
      <div className="ws-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <SectionHeader
            icon={AlertTriangle}
            title="Priority Triage Queue"
            subtitle={`${sorted.length} leads${scatter ? ` (filtered: ${scatter})` : " · all bands"} · 25 per page`}
          />
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span>Sort:</span>
            <span className="text-white font-bold uppercase">{sortField} ({sortDir})</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase tracking-wider text-[9px]">
                {/* TXID Header */}
                <th
                  onClick={() => handleSort("txid")}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    TXID {getSortIcon("txid")}
                  </span>
                </th>

                {/* RISK Header */}
                <th
                  onClick={() => handleSort("risk")}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition select-none"
                >
                  <Tooltip content="Isolation Forest anomaly score (0–100). Higher = more anomalous. Click to sort.">
                    <span className="cursor-help inline-flex items-center gap-1">
                      RISK <HelpCircle className="w-2.5 h-2.5" /> {getSortIcon("risk")}
                    </span>
                  </Tooltip>
                </th>

                {/* CONF Header */}
                <th
                  onClick={() => handleSort("conf")}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition select-none"
                >
                  <Tooltip content="Evidence confidence based on corroboration breadth (0–100%). Click to sort.">
                    <span className="cursor-help inline-flex items-center gap-1">
                      CONF <HelpCircle className="w-2.5 h-2.5" /> {getSortIcon("conf")}
                    </span>
                  </Tooltip>
                </th>

                {/* BAND Header */}
                <th
                  onClick={() => handleSort("band")}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    BAND {getSortIcon("band")}
                  </span>
                </th>

                {/* BTC Header */}
                <th
                  onClick={() => handleSort("btc")}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    BTC {getSortIcon("btc")}
                  </span>
                </th>

                {/* FAN-OUT Header */}
                <th
                  onClick={() => handleSort("fan_out")}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition select-none"
                >
                  <Tooltip content="Fan-out ratio: number of output addresses relative to inputs. Click to sort.">
                    <span className="cursor-help inline-flex items-center gap-1">
                      FAN-OUT <HelpCircle className="w-2.5 h-2.5" /> {getSortIcon("fan_out")}
                    </span>
                  </Tooltip>
                </th>

                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {paginatedLeads.map((lead) => (
                <tr key={lead.txid}
                  className="hover:bg-white/[0.03] transition-colors duration-150 group">
                  <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">
                    <span className="text-slate-400">{lead.txid.slice(0, 6)}</span>
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
              {paginatedLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500 text-xs font-mono">
                    No leads match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Table Pagination Bar ──────────────────────────────── */}
        {sorted.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
            <div>
              Showing <strong className="text-slate-200">{(currentPage - 1) * ROWS_PER_PAGE + 1}</strong> to{" "}
              <strong className="text-slate-200">{Math.min(currentPage * ROWS_PER_PAGE, sorted.length)}</strong> of{" "}
              <strong className="text-slate-200">{sorted.length}</strong> leads
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-white/[0.03] transition disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-bold uppercase"
              >
                Previous
              </button>

              <span className="px-2 text-[10px] font-bold text-slate-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-white/[0.03] transition disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-bold uppercase"
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

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
      {label}
    </div>
  );
}
