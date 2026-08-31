"use client";

import { ShieldCheck, Check, Cpu, Shield, HardDrive, Lock, Eye, AlertOctagon, Terminal } from "lucide-react";

export default function Differentiation() {
  const pillars = [
    {
      title: "Unsupervised AI",
      sub: "No Static Heuristic Limits",
      icon: Cpu,
      desc: "Traditional tools rely on known address blacklists and fixed rules. BIT-SHIELD isolates unknown anomaly structures using multidimensional Isolation Forests without requiring labeled crime datasets.",
    },
    {
      title: "Offline Self-Contained",
      sub: "Zero Third-Party Leaks",
      icon: HardDrive,
      desc: "Designed specifically for secure intelligence environments. Operates 100% offline — model weights, graph processing, and data parsing execute entirely on your workstation with zero external telemetry.",
    },
    {
      title: "Explainable Attribution",
      sub: "Court-Admissible SHAP Leads",
      icon: ShieldCheck,
      desc: "Black-box AI is unusable for law enforcement. Every BIT-SHIELD lead includes SHAP feature contributions detailing exactly which temporal, volume, or graph signals drove the risk score.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
          <Shield className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Core Differentiators</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Built for secure, high-stakes <br />
          <span className="text-slate-500 dark:text-slate-300">forensic environments.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Why BIT-SHIELD stands apart from standard cloud-based blockchain analytics portals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="ws-card p-8 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-xs">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">{pillar.title}</h3>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{pillar.sub}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center space-x-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>ENTERPRISE GRADE STANDARD</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
