"use client";

import { useState } from "react";
import { Database, Network, Clock, GitFork, Cpu, ShieldCheck, ArrowDown, ChevronRight, Layers, Sparkles } from "lucide-react";

export default function InsightArchitecture() {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const dimensions = [
    {
      title: "Blockchain Layer",
      subtitle: "On-Chain Ledger Artifacts",
      icon: Database,
      items: ["Wallet Addresses (P2PKH, SegWit, Taproot)", "Transaction Hashes & UTXO Chains", "Satoshi Values & Fee Densities", "Locktime & Script Attributes"],
      detail: "Isolates input/output counts, anomalous fee overpayments, and unspent outputs.",
    },
    {
      title: "Network Layer",
      subtitle: "P2P Propagation Evidence",
      icon: Network,
      items: ["Broadcasting Peer IP Addresses", "Autonomous System Numbers (ASNs)", "Port Heuristics & Relay Nodes", "Cross-Geo Colocation Markers"],
      detail: "Correlates distinct wallet transactions originating from identical server ASNs or VPN gateways.",
    },
    {
      title: "Temporal Layer",
      subtitle: "Velocity & Inter-Arrival Dynamics",
      icon: Clock,
      items: ["Microsecond Burst Compression", "Inter-Transaction Intervals", "Rapid Layering Dispersal Timelines", "Automated Scripting Cadence"],
      detail: "Detects non-human dispersal rates where funds traverse 6 hops in under 90 seconds.",
    },
    {
      title: "Relationship Layer",
      subtitle: "Graph Topology & Heuristics",
      icon: GitFork,
      items: ["Common-Input-Ownership (CIOH)", "Fan-Out Dispersal Patterns", "Peeling Chains & Change Addresses", "Multi-Hop Mule Pathways"],
      detail: "Clusters independent addresses into single-actor entities via co-spending graph models.",
    },
  ];

  return (
    <section id="insights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
          <Layers className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Forensic Methodology</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          A transaction is an event. <br />
          <span className="text-slate-500 dark:text-slate-300">A network is evidence.</span>
        </h2>
        <p className="text-slate-800 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
          Looking at individual Bitcoin transactions in isolation can hide the structure connecting them.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          BIT-SHIELD synthesizes multiple dimensions of the same activity into a unified analytical matrix. Correlating on-chain ledger records with peer-to-peer network observations and temporal execution profiles exposes organized syndicate behavior invisible to conventional single-transaction filters.
        </p>
      </div>

      {/* 4 Multi-Dimensional Input Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {dimensions.map((dim, idx) => (
          <div
            key={dim.title}
            onClick={() => setActiveDimension(idx)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
              activeDimension === idx
                ? "bg-[var(--bg-card)] border-indigo-500/50 dark:border-slate-500 shadow-md"
                : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-slate-400 dark:hover:border-slate-700 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${activeDimension === idx ? "bg-indigo-600 dark:bg-slate-800 text-white" : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"}`}>
                <dim.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">DIM 0{idx + 1}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono mb-1">{dim.title}</h3>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-4">{dim.subtitle}</p>

            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {dim.items.map((item) => (
                <li key={item} className="flex items-start space-x-1.5">
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">•</span>
                  <span className="text-[11px] leading-tight text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Synthesis Flow Arrow & Engine Pipeline */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Unified Relationship Engine
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 dark:border-emerald-800/50 px-2.5 py-0.5 rounded-full font-bold">
            OFFLINE INFERENCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Step 1: Graph Builder */}
          <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-main)] space-y-2 shadow-xs">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">STAGE 01</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">Relational Multi-Graph</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Combines addresses, transactions, and IP/ASNs as interconnected nodes. Applies Common-Input-Ownership to resolve multi-wallet syndicates.
            </p>
          </div>

          {/* Step 2: Isolation Forest */}
          <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-rose-300 dark:border-slate-700/80 space-y-2 relative shadow-xs">
            <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase tracking-wider font-bold">STAGE 02 • AI CORE</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">Isolation Forest Detector</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Constructs 100 orthogonal isolation trees over engineered velocity, fan-out, and graph centrality vectors to isolate sparse outliers.
            </p>
          </div>

          {/* Step 3: SHAP Explainability */}
          <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-main)] space-y-2 shadow-xs">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">STAGE 03</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">SHAP Feature Attribution</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Calculates exact mathematical contributions per feature, transforming raw anomaly scores into transparent, court-admissible leads.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
