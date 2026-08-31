"use client";

import { Shield, AlertTriangle, FileText, Scale, CheckCircle2 } from "lucide-react";

export default function DoctrineDisclaimer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      <div className="glass-panel p-8 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] relative overflow-hidden">
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white">
            <Scale className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">INTELLIGENCE DOCTRINE & EVIDENTIARY BOUNDARIES</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
              Intelligence Leads vs. Legal Proof
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          <div className="space-y-3 p-5 bg-[var(--bg-card)] rounded-xl border border-[var(--border-main)] shadow-xs">
            <div className="flex items-center space-x-2 font-mono font-bold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WHAT BIT-SHIELD PROVIDES</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              BIT-SHIELD surfaces explainable investigative leads by identifying statistical anomalies across transaction velocity, graph topology, and P2P network co-location. It narrows down millions of records into prioritized targets for human investigator review.
            </p>
          </div>

          <div className="space-y-3 p-5 bg-[var(--bg-card)] rounded-xl border border-[var(--border-main)] shadow-xs">
            <div className="flex items-center space-x-2 font-mono font-bold text-slate-900 dark:text-white">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>WHAT REQUIRES HUMAN CORROBORATION</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              BIT-SHIELD outputs do not independently prove criminal intent, real-world identity, or legal guilt. All SHAP feature attributions and co-spending clusters represent behavioral correlation and require statutory subpoena, exchange KYC matching, or law enforcement corroboration.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 gap-2">
          <span>HUMAN-IN-THE-LOOP MANDATE</span>
          <span>PMLA / FIU-INDIA COMPLIANT LEADS</span>
          <span>OFFLINE LOCAL AUDIT TRAIL</span>
        </div>

      </div>

    </section>
  );
}
