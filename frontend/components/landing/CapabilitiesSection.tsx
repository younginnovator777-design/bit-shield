"use client";

import { useState } from "react";
import { Network, ShieldAlert, Cpu, Search, Activity, ArrowRight, CheckCircle2, Sliders, Layers } from "lucide-react";

export default function CapabilitiesSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const capabilities = [
    {
      step: "01",
      title: "CONNECT",
      tagline: "Bring fragmented evidence together.",
      description: "Transaction records, wallets, network observations, ports, timing, and geographic/ASN context are synthesized into one unified analytical view. Isolated data streams become an interconnected graph topology.",
      visualType: "connect",
    },
    {
      step: "02",
      title: "DETECT",
      tagline: "Find behavior that doesn't look normal.",
      description: "BIT-SHIELD uses unsupervised anomaly detection to isolate unusual transaction and network behavior without requiring a predefined list of static heuristics or known blacklisted addresses.",
      visualType: "detect",
    },
    {
      step: "03",
      title: "EXPLAIN",
      tagline: "Don't just flag it. Show why.",
      description: "Every lead is supported by contributing behavioral, temporal, graph, and network signals with model-level SHAP explainability. Zero black-box decisions; full transparency for human investigators.",
      visualType: "explain",
    },
    {
      step: "04",
      title: "INVESTIGATE",
      tagline: "Follow the evidence.",
      description: "Select a lead. Expand its 2-hop neighborhood. Trace connected transactions. Focus the microsecond timeline. Inspect supporting evidence, peer ASNs, and co-spending clusters interactively.",
      visualType: "investigate",
    },
  ];

  return (
    <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
          <Activity className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          From raw traffic to an <br />
          <span className="text-slate-500 dark:text-slate-300">investigative picture.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Four continuous investigative stages that turn high-volume, fragmented network logs and raw Bitcoin ledger blocks into prioritized, court-admissible forensic leads.
        </p>
      </div>

      {/* 4 Interactive Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {capabilities.map((cap, idx) => (
          <div
            key={cap.step}
            onMouseEnter={() => setActiveTab(idx)}
            className={`glass-panel p-8 rounded-2xl flex flex-col justify-between border transition-all duration-300 relative group cursor-pointer ${
              activeTab === idx
                ? "bg-[var(--bg-card)] border-indigo-500/50 dark:border-slate-500 shadow-md"
                : "bg-[var(--bg-card)] border-[var(--border-main)] hover:bg-[var(--bg-card-hover)] shadow-xs"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400">
                  STAGE {cap.step}
                </span>
                <span className="text-sm font-mono font-black text-slate-900 dark:text-white px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/80">
                  {cap.title}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono mb-3">
                {cap.tagline}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                {cap.description}
              </p>
            </div>

            {/* Visual simulation for each card */}
            <div className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-main)] font-mono text-xs shadow-xs">
              {cap.visualType === "connect" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 border-b border-[var(--border-subtle)] pb-1.5 font-bold">
                    <span>EVIDENTIARY CONVERGENCE</span>
                    <span className="text-slate-500 dark:text-slate-400">GRAPH RESOLVED</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--border-main)]">
                      <div className="text-slate-500 dark:text-slate-400">TX Records</div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">38,420</div>
                    </div>
                    <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--border-main)]">
                      <div className="text-slate-500 dark:text-slate-400">IP/ASN Pairs</div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">1,248</div>
                    </div>
                    <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--border-main)]">
                      <div className="text-slate-500 dark:text-slate-400">CIOH Entities</div>
                      <div className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">312</div>
                    </div>
                  </div>
                </div>
              )}

              {cap.visualType === "detect" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 border-b border-[var(--border-subtle)] pb-1.5 font-bold">
                    <span>ISOLATION SCORE DISTRIBUTION</span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold">OUTLIER ISOLATED</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px]">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-900 h-3 rounded-full overflow-hidden flex">
                      <div className="w-4/5 bg-slate-400 dark:bg-slate-700/60" title="Normal baseline (99%)"></div>
                      <div className="w-1/5 bg-rose-500" title="Anomalous outlier (<1%)"></div>
                    </div>
                    <span className="text-rose-600 dark:text-rose-400 font-bold font-mono">0.897</span>
                  </div>
                </div>
              )}

              {cap.visualType === "explain" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 border-b border-[var(--border-subtle)] pb-1.5 font-bold">
                    <span>SHAP FEATURE ATTRIBUTION</span>
                    <span className="text-slate-500 dark:text-slate-400">CONTRIBUTIONS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex justify-between p-1.5 bg-[var(--bg-card)] rounded border border-rose-300 dark:border-rose-900/40 text-rose-700 dark:text-rose-300">
                      <span>HIGH VELOCITY</span>
                      <span className="font-bold">+28</span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-[var(--bg-card)] rounded border border-rose-300 dark:border-rose-900/40 text-rose-700 dark:text-rose-300">
                      <span>HIGH FAN-OUT</span>
                      <span className="font-bold">+24</span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-[var(--bg-card)] rounded border border-amber-300 dark:border-amber-900/40 text-amber-700 dark:text-amber-300">
                      <span>GRAPH ANOMALY</span>
                      <span className="font-bold">+21</span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-[var(--bg-card)] rounded border border-[var(--border-main)] text-slate-700 dark:text-slate-300">
                      <span>NET CORRELATION</span>
                      <span className="font-bold">+13</span>
                    </div>
                  </div>
                </div>
              )}

              {cap.visualType === "investigate" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 border-b border-[var(--border-subtle)] pb-1.5 font-bold">
                    <span>INTERACTIVE INVESTIGATOR ACTIONS</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">ACTIONABLE</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className="bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 px-2 py-1 rounded border border-[var(--border-main)]">
                      Expand 2-Hop Graph
                    </span>
                    <span className="bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 px-2 py-1 rounded border border-[var(--border-main)]">
                      Filter ASN Clusters
                    </span>
                    <span className="bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 px-2 py-1 rounded border border-[var(--border-main)]">
                      Scrub Timeline Bursts
                    </span>
                    <span className="bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 px-2 py-1 rounded border border-[var(--border-main)]">
                      Export Case Dossier
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
