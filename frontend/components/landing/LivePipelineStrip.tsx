"use client";

import { Database, Network, Cpu, Eye, ShieldCheck, ArrowRight, Activity, Radio, Clock, GitBranch } from "lucide-react";

export default function LivePipelineStrip() {
  const stages = [
    {
      id: "01",
      name: "Transactions",
      desc: "Raw TX metadata, multi-input/output values, fees, script types",
      icon: Database,
      tag: "BLOCKCHAIN",
    },
    {
      id: "02",
      name: "Network Observations",
      desc: "Peer IP addresses, Autonomous Systems (ASNs), broadcast ports",
      icon: Radio,
      tag: "NETWORK",
    },
    {
      id: "03",
      name: "Entity Relationships",
      desc: "Common-input-ownership (CIOH), multi-hop chains, temporal clustering",
      icon: GitBranch,
      tag: "TEMPORAL GRAPH",
    },
    {
      id: "04",
      name: "AI Detection",
      desc: "Unsupervised Isolation Forest isolating anomalous vectors",
      icon: Cpu,
      tag: "ANOMALY ENGINE",
    },
    {
      id: "05",
      name: "Explainable Leads",
      desc: "SHAP feature attributions with Risk × Confidence triage",
      icon: ShieldCheck,
      tag: "TRIAGE READY",
      highlight: true,
    },
  ];

  return (
    <div className="w-full border-y border-[var(--border-main)] bg-[var(--bg-surface)] backdrop-blur-xl py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
              BIT-SHIELD INTELLIGENCE LAYER
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
              CONTINUOUS FORENSIC PIPELINE
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            <span>END-TO-END LOCAL PROCESSING PIPELINE</span>
          </div>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all duration-300 relative group ${
                stage.highlight
                  ? "bg-[var(--bg-card)] border-indigo-500/50 dark:border-slate-500 shadow-md"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-indigo-400 dark:hover:border-slate-600 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">
                  {stage.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">
                  {stage.id}
                </span>
              </div>

              <div className="flex items-center space-x-2.5 mb-2">
                <stage.icon className={`w-4 h-4 ${stage.highlight ? "text-indigo-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-300"}`} />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white font-mono tracking-wide">
                  {stage.name}
                </h3>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {stage.desc}
              </p>

              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-400 dark:text-slate-600 font-mono">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
