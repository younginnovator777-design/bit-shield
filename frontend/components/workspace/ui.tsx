"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ShieldAlert, Info, HelpCircle } from "lucide-react";

export function StatTile({
  icon: Icon,
  label,
  value,
  subtext,
  accentColor = "text-slate-900 dark:text-white",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  accentColor?: string;
}) {
  return (
    <div className="ws-card ws-card-hover p-4 flex flex-col justify-between shadow-xs transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <div className="p-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)]">
          <Icon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
        </div>
      </div>
      <div className={`text-2xl font-black font-mono ${accentColor} my-0.5`}>
        {value}
      </div>
      {subtext && (
        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
          {subtext}
        </div>
      )}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ws-card p-5 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon?: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start space-x-3 mb-4 pb-3 border-b border-[var(--border-subtle)]">
      {Icon && (
        <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] shrink-0">
          <Icon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </div>
      )}
      <div>
        <h2 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export function RiskBadge({ band }: { band: string }) {
  let badgeStyle = "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

  if (band === "Priority Lead") {
    badgeStyle = "bg-red-500/10 text-red-700 border-red-500/30 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50";
  } else if (band === "Investigate Further") {
    badgeStyle = "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50";
  } else if (band === "Low Concern") {
    badgeStyle = "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50";
  }

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${badgeStyle}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{band}</span>
    </span>
  );
}

export function RiskBar({ score }: { score: number }) {
  const isHigh = score >= 80;
  const isMid = score >= 70 && score < 80;

  return (
    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          isHigh ? "bg-red-600 dark:bg-red-500" : isMid ? "bg-amber-600 dark:bg-amber-500" : "bg-emerald-600 dark:bg-emerald-500"
        }`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function ShapBar({ values }: { values: Array<{ feature: string; value?: number; shap_value?: number; direction?: string }> }) {
  if (!values || !Array.isArray(values) || values.length === 0) return null;

  const maxVal = Math.max(...values.map(v => Math.abs(v.value ?? v.shap_value ?? 0)), 0.001);

  return (
    <div className="space-y-2 font-mono text-[10px]">
      {values.map((v, i) => {
        const val = v.value ?? v.shap_value ?? 0;
        const isPos = val >= 0;
        const pct = Math.min(100, (Math.abs(val) / maxVal) * 100);

        return (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold">
              <span className="truncate max-w-[200px]">{v.feature}</span>
              <span className={isPos ? "text-red-600 dark:text-red-400 font-bold" : "text-emerald-600 dark:text-emerald-400 font-bold"}>
                {isPos ? `+${val.toFixed(2)}` : val.toFixed(2)}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div
                className={`h-full rounded-full ${
                  isPos ? "bg-red-600 dark:bg-red-500" : "bg-emerald-600 dark:bg-emerald-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 px-2.5 py-1 text-[10px] font-mono text-white bg-slate-900 rounded-lg shadow-xl backdrop-blur-sm whitespace-nowrap pointer-events-none border border-slate-700">
          {text}
        </div>
      )}
    </div>
  );
}
