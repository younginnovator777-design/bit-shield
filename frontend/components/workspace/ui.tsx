"use client";

import { type Lead } from "./MockData";

// ── RiskBadge ──────────────────────────────────────────────────────────
export function RiskBadge({ band }: { band: Lead["priority_band"] }) {
  const styles: Record<Lead["priority_band"], string> = {
    "Priority Lead":        "bg-red-950/70 text-red-400   border-red-800/80",
    "Investigate Further":  "bg-amber-950/70 text-amber-400 border-amber-800/80",
    "Low Concern":          "bg-emerald-950/70 text-emerald-400 border-emerald-800/80",
    "Insufficient Evidence":"bg-slate-900 text-slate-400 border-slate-700/80",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[band]}`}>
      {band}
    </span>
  );
}

// ── RiskScore ─────────────────────────────────────────────────────────
export function RiskScore({ score }: { score: number }) {
  const color = score >= 80 ? "text-red-400" : score >= 60 ? "text-amber-400" : "text-slate-300";
  return <span className={`font-mono font-black ${color}`}>{score}</span>;
}

// ── ConfidenceScore ───────────────────────────────────────────────────
export function ConfidenceScore({ score }: { score: number }) {
  const color = score >= 75 ? "text-emerald-400" : score >= 50 ? "text-slate-300" : "text-slate-400";
  return <span className={`font-mono font-bold ${color}`}>{score}%</span>;
}

// ── RiskBar ───────────────────────────────────────────────────────────
export function RiskBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-red-600" : score >= 60 ? "bg-amber-500" : "bg-slate-500";
  return (
    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full animate-bar-fill ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

// ── ShapBar ───────────────────────────────────────────────────────────
export function ShapBar({ values }: { values?: Lead["shap_values"] }) {
  if (!values || !Array.isArray(values) || values.length === 0) return null;
  const max = Math.max(...values.map(v => Math.abs(v.value))) || 1;
  return (
    <div className="space-y-2.5">
      {values.map((v, i) => {
        const pct = (Math.abs(v.value) / max) * 100;
        const color = v.direction === "positive" ? "bg-red-600" : "bg-emerald-600";
        const label = v.direction === "positive" ? "text-red-400" : "text-emerald-400";
        return (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-300">{v.feature}</span>
              <span className={`font-bold ${label}`}>
                {v.direction === "positive" ? "+" : ""}{v.value.toFixed(2)}
              </span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${color}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── StatTile ──────────────────────────────────────────────────────────
export function StatTile({
  label, value, sub, accent = "text-white",
}: {
  label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <div className="ws-card p-5 flex flex-col justify-between min-h-[100px]">
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{label}</span>
      <div>
        <div className={`text-3xl font-black font-mono ${accent}`}>{value}</div>
        {sub && <div className="text-[11px] text-slate-500 font-mono mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ── GlassCard ─────────────────────────────────────────────────────────
export function GlassCard({
  children, className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ws-card ${className}`}>
      {children}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────
export function SectionHeader({
  icon: Icon, title, subtitle,
}: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
      <div className="flex items-center gap-2.5">
        <Icon className="w-4 h-4 text-slate-300" />
        <div>
          <h2 className="text-sm font-bold text-slate-100 font-mono tracking-wide uppercase">{title}</h2>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────
export function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <span className="relative group inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-200 font-sans leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-xl">
        {content}
      </span>
    </span>
  );
}
