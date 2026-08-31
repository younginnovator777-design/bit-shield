"use client";

import Link from "next/link";
import { ArrowRight, Shield, Terminal, HardDrive, Cpu, CheckCircle2 } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 transition-colors duration-300">
      
      <div className="glass-panel p-8 sm:p-14 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-main)] relative overflow-hidden text-center flex flex-col items-center">
        
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-2 bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-slate-800 dark:text-slate-300 mb-6 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
            <span className="font-bold">READY FOR FORENSIC DEPLOYMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Turn high-volume traffic into <br />
            <span className="bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-900 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
              court-admissible intelligence.
            </span>
          </h2>

          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
            Launch the offline intelligence workstation to ingest transaction metadata, run unsupervised anomaly detection, visualize multi-layer graphs, and generate case binders.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <Link
              href="/command-center"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold px-8 py-4 rounded-xl text-sm font-mono tracking-wide shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>LAUNCH COMMAND CENTER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ingestion"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[var(--bg-card)] text-slate-800 dark:text-slate-300 dark:hover:text-white border border-[var(--border-main)] px-7 py-4 rounded-xl text-sm font-mono tracking-wide backdrop-blur-xl transition-all shadow-xs"
            >
              <HardDrive className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>INGEST DATASET</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-500 dark:text-slate-400 border-t border-[var(--border-subtle)] pt-6 w-full">
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              100% LOCAL WORKSTATION RUNTIME
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ZERO THIRD-PARTY CLOUD LEAKS
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              SHAP EXPLAINABLE ANOMALIES
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
