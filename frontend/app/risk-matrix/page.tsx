"use client";

import Link from "next/link";
import { SlidersHorizontal, ShieldAlert, ArrowRight, ChevronRight, Zap, CheckCircle2 } from "lucide-react";
import RiskConfidenceMatrix from "@/components/landing/RiskConfidenceMatrix";

export default function RiskMatrixPage() {
  return (
    <div className="space-y-24 py-16 animate-fade-in-up">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-bold">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-rose-400" />
          <span>TRIAGE METHODOLOGY & SCORING</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          Mathematical Triage: <br />
          <span className="bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-900 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
            Risk Score × Evidence Density.
          </span>
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans mb-8">
          Avoid alert fatigue. BIT-SHIELD plots every transaction lead onto a two-dimensional mathematical matrix combining unsupervised Isolation Forest anomaly indexes with multi-layer data density.
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <Link
            href="/command-center"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md transition"
          >
            <span>LAUNCH TRIAGE MATRIX IN COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/leads"
            className="inline-flex items-center space-x-2 bg-[var(--bg-card)] text-slate-800 dark:text-slate-200 border border-[var(--border-main)] font-bold px-6 py-3 rounded-xl shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition"
          >
            <span>EXPLORE LEADS QUEUE</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Interactive Risk Matrix Component ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RiskConfidenceMatrix />
      </section>

      {/* ── Scoring Mathematics Deep Dive ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">
            MATHEMATICAL SCORING ENGINE
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            How Anomaly Scores & Confidence Indexes Are Calculated
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-3">
              <div className="text-rose-600 dark:text-rose-400 font-bold uppercase text-xs">01 • Anomaly Score (0–100)</div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                Computed via an Isolation Forest ensemble of 100 orthogonal decision trees. Measures how rapidly a transaction vector is isolated from baseline regularities across burst velocity, fan-out ratio, fee density, and locktime.
              </p>
            </div>

            <div className="p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-3">
              <div className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-xs">02 • Evidence Confidence (0–100%)</div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                Measures multi-layer telemetry density. Higher confidence values correspond to corroborating peer IP broadcasts, ASN host matching, historical wallet co-spends, and multi-hop chain evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
