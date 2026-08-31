"use client";

import Link from "next/link";
import { AlertOctagon, TrendingUp, ShieldAlert, FileText, Globe, Landmark, ArrowRight, Activity, Zap, CheckCircle2, ChevronRight } from "lucide-react";

export default function ThreatIntelligencePage() {
  return (
    <div className="space-y-24 py-16 animate-fade-in-up">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-bold">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>THREAT INTELLIGENCE DISCIPLINE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          The Bitcoin ledger is public. <br />
          <span className="bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-900 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
            The criminal intent is hidden.
          </span>
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans mb-8">
          A single Bitcoin transaction looks harmless in isolation. Correlating hundreds of transfers across P2P broadcast sockets, wallet co-spending clusters, and temporal burst schedules exposes coordinated illicit syndicates.
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <Link
            href="/investigations"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md transition"
          >
            <span>SEE INVESTIGATION WORKFLOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/command-center"
            className="inline-flex items-center space-x-2 bg-[var(--bg-card)] text-slate-800 dark:text-slate-200 border border-[var(--border-main)] font-bold px-6 py-3 rounded-xl shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition"
          >
            <span>OPEN COMMAND CENTER</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 3 Baseline Reality Cards ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  GLOBAL ILLICIT FLOW
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-bold">2025 REPORT</span>
              </div>
              <div className="text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight mb-3">
                $154B+
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                Cryptocurrency received by illicit addresses in 2025 according to Chainalysis Crypto Crime Report baseline data.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>Chainalysis 2026</span>
              <span>Lower-Bound Baseline</span>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden border-t-2 border-t-amber-500">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4 font-bold">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  SIGNAL-TO-NOISE RATIO
                </span>
                <span>SIGNAL RATIO</span>
              </div>
              <div className="text-5xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight mb-3">
                &lt; 1%
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                Illicit activity represents under 1% of total transaction volume. Static heuristic filtering fails — unsupervised AI is required to isolate outliers.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-amber-700 dark:text-amber-400">
              <span>Class Imbalance</span>
              <span>Needs Unsupervised AI</span>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden border-t-2 border-t-rose-500">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4 font-bold">
                <span className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  INDIA ENFORCEMENT REALITY
                </span>
                <span>ED CASEFILE</span>
              </div>
              <div className="text-5xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight mb-3">
                ₹640 Cr
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                Enforcement Directorate investigated ₹640 crore of cyber-fraud proceeds layered through 5,000+ mule bank accounts converted into crypto.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-rose-700 dark:text-rose-400">
              <span>5,000+ Mule Accounts</span>
              <span>Multi-System Layering</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Visual Storytelling: Signal Extraction Pipeline ────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-8">
          <div>
            <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest mb-2 font-bold">
              SIGNAL EXTRACTION FRAMEWORK
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
              From Raw Packet Telemetry to Threat Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs font-mono">
            {[
              { step: "01", name: "RAW SIGNAL", desc: "Peer IP, Port, Broadcast Offset" },
              { step: "02", name: "TRANSACTION", desc: "UTXO values, Locktime, Script" },
              { step: "03", name: "ENTITY", desc: "CIOH co-spending wallet cluster" },
              { step: "04", name: "RELATIONSHIP", desc: "Multi-hop graph betweenness" },
              { step: "05", name: "ANOMALY RISK", desc: "Isolation Forest vector score" },
              { step: "06", name: "DOSSIER", desc: "Court-admissible SHAP report" },
            ].map((s, idx) => (
              <div key={s.step} className="p-4 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl space-y-2">
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">STEP {s.step}</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">{s.name}</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-sans leading-tight">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIU-India Statutory Alignment ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-slate-900 dark:text-white">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-rose-400" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">STATUTORY & REGULATORY ALIGNMENT</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">PMLA & FIU-India Virtual Digital Asset Compliance</h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            Under India's Prevention of Money Laundering Act (PMLA), Virtual Digital Asset Service Providers (VDA SPs) are mandated to file Suspicious Transaction Reports (STRs) with FIU-India. When cyber-fraud proceeds move through domestic mule accounts and jump onto decentralized networks, BIT-SHIELD correlates peer broadcast nodes with blockchain ledgers offline.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-1">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Regulator</div>
              <div className="font-bold text-slate-900 dark:text-white">FIU-India / ED</div>
            </div>
            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-1">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Framework</div>
              <div className="font-bold text-slate-900 dark:text-white">PMLA / AML-CFT Guidelines</div>
            </div>
            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-1">
              <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Runtime</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">100% Offline Air-Gapped</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
