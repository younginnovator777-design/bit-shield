"use client";

import { useState } from "react";
import { SlidersHorizontal, ShieldAlert, AlertTriangle, Info, CheckCircle2, ChevronRight, Zap } from "lucide-react";

export default function RiskConfidenceMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<"priority" | "investigate" | "insufficient" | "low">("priority");

  const quadrants = {
    priority: {
      title: "Priority Lead",
      risk: "High Anomaly (80–100)",
      confidence: "High Evidence (70–100%)",
      badge: "PRIORITY TRIAGE MANDATED",
      badgeColor: "text-red-700 dark:text-rose-400 bg-red-500/10 dark:bg-rose-950/40 border-red-500/30 dark:border-rose-800/50",
      description: "Strong evidence corroborates high structural anomaly. Immediate priority for investigator assignment, case file creation, and dossier export.",
      action: "Assign senior analyst · Open Case File · Prepare Dossier Export",
      indicators: ["Multi-layer ASN colocation", "Fan-out ratio > 8.0×", "Velocity > 95th percentile", "Co-spending entity cluster identified"],
    },
    investigate: {
      title: "Investigate Further",
      risk: "High Anomaly (70–100)",
      confidence: "Low/Medium Evidence (<70%)",
      badge: "SECONDARY REVIEW REQUIRED",
      badgeColor: "text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/40 border-amber-500/30 dark:border-amber-800/50",
      description: "Anomalous behavior detected by Isolation Forest, but network or chain data density is currently sparse. Requires secondary manual graph exploration.",
      action: "Expand 2-hop neighborhood · Ingest additional PCAP telemetry · Monitor address",
      indicators: ["Isolated transaction burst", "Unconfirmed peer IP relay", "Anomalous fee density", "Partial graph evidence"],
    },
    insufficient: {
      title: "Insufficient Evidence",
      risk: "Low/Medium Anomaly (<70)",
      confidence: "Low Evidence (<50%)",
      badge: "LOGGED FOR CONTINUOUS INGESTION",
      badgeColor: "text-slate-700 dark:text-slate-400 bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800",
      description: "Neither behavioral anomaly nor network evidence meets the threshold for active investigation. Maintained in local database for future pattern matching.",
      action: "Retain in local database · Re-evaluate upon new file ingestion",
      indicators: ["Standard wallet transfer", "Known pool behavior", "Normal inter-arrival times", "Single input spend"],
    },
    low: {
      title: "Low Concern",
      risk: "Low Anomaly (<40)",
      confidence: "High Evidence (>70%)",
      badge: "ROUTINE BASELINE",
      badgeColor: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/30 dark:border-emerald-800/50",
      description: "Consistently exhibits normal transaction characteristics with abundant supporting telemetry. Low probability of illicit layering.",
      action: "Archive baseline record · Suppress alert notifications",
      indicators: ["Exchange hot-wallet sweep", "Mining pool payout", "Standard consolidation", "High transaction history"],
    },
  };

  const current = quadrants[selectedQuadrant];

  return (
    <section id="matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Triage Methodology</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Risk × Evidence Confidence <br />
          <span className="text-slate-500 dark:text-slate-300">Triage Matrix.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Not every anomaly is an investigation. BIT-SHIELD plots every lead along two distinct mathematical axes: <strong className="text-slate-900 dark:text-white font-mono">Anomaly Score</strong> (Isolation Forest outlier index) and <strong className="text-slate-900 dark:text-white font-mono">Evidence Confidence</strong> (multi-layer data density).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive 2x2 Matrix Controls */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
          
          <button
            onClick={() => setSelectedQuadrant("priority")}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              selectedQuadrant === "priority"
                ? "bg-[var(--bg-card)] border-rose-500 ring-2 ring-rose-500/20 shadow-md"
                : "bg-[var(--bg-card)] border-rose-300 dark:border-rose-900/40 hover:border-rose-500/60 shadow-xs"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">QUADRANT I</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono mb-1">Priority Lead</div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">High Risk • High Confidence</div>
          </button>

          <button
            onClick={() => setSelectedQuadrant("investigate")}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              selectedQuadrant === "investigate"
                ? "bg-[var(--bg-card)] border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                : "bg-[var(--bg-card)] border-amber-300 dark:border-amber-900/40 hover:border-amber-500/60 shadow-xs"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">QUADRANT II</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono mb-1">Investigate Further</div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">High Risk • Low Confidence</div>
          </button>

          <button
            onClick={() => setSelectedQuadrant("insufficient")}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              selectedQuadrant === "insufficient"
                ? "bg-[var(--bg-card)] border-slate-500 ring-2 ring-slate-500/20 shadow-md"
                : "bg-[var(--bg-card)] border-slate-300 dark:border-slate-800 hover:border-slate-400 shadow-xs"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">QUADRANT III</span>
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono mb-1">Insufficient Evidence</div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Low Risk • Low Confidence</div>
          </button>

          <button
            onClick={() => setSelectedQuadrant("low")}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              selectedQuadrant === "low"
                ? "bg-[var(--bg-card)] border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                : "bg-[var(--bg-card)] border-emerald-300 dark:border-emerald-900/40 hover:border-emerald-500/60 shadow-xs"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">QUADRANT IV</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono mb-1">Low Concern</div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Low Risk • High Confidence</div>
          </button>

        </div>

        {/* Selected Quadrant Inspector Panel */}
        <div className="lg:col-span-6 ws-card p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${current.badgeColor}`}>
                {current.badge}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-3">{current.title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)]">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Risk Axis</div>
              <div className="text-slate-900 dark:text-white font-bold mt-1">{current.risk}</div>
            </div>
            <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)]">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Confidence Axis</div>
              <div className="text-slate-900 dark:text-white font-bold mt-1">{current.confidence}</div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {current.description}
          </p>

          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">Key Indicators</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {current.indicators.map((ind) => (
                <div key={ind} className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-main)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                  <span className="text-[11px] truncate">{ind}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Triage Action:</span>
            <span className="text-slate-900 dark:text-white font-bold">{current.action}</span>
          </div>

        </div>

      </div>

    </section>
  );
}
