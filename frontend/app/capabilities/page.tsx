"use client";

import Link from "next/link";
import { Activity, Cpu, Network, ShieldCheck, Database, ArrowRight, ChevronRight, CheckCircle2, HardDrive, FileText } from "lucide-react";
import CapabilitiesSection from "@/components/landing/CapabilitiesSection";

export default function CapabilitiesPage() {
  const categories = [
    {
      title: "Detection Engine",
      icon: Cpu,
      desc: "Unsupervised anomaly isolation across high-volume transaction telemetry",
      items: [
        { name: "Isolation Forest Outlier Scoring", detail: "100 orthogonal isolation trees scoring velocity, fan-out, and fee density." },
        { name: "Burst Velocity Isolation", detail: "Flags multi-hop transactions traversing outputs in under 90 milliseconds." },
        { name: "Peeling Chain Detection", detail: "Identifies automated small-value peeling chains from main consolidation wallets." },
      ],
    },
    {
      title: "Investigation Suite",
      icon: Network,
      desc: "Relational multi-graph topology and entity resolution models",
      items: [
        { name: "Common-Input-Ownership (CIOH)", detail: "Clusters independent addresses into single-actor entities via co-spending graph algorithms." },
        { name: "2-Hop & 3-Hop Neighborhood Expansion", detail: "Renders interactive VisNetwork force graphs displaying connected UTXO hops." },
        { name: "Peers & ASN Colocation Mapping", detail: "Correlates broadcasting IP sockets with Autonomous System Numbers." },
      ],
    },
    {
      title: "Explainable Intelligence",
      icon: ShieldCheck,
      desc: "Transparent Shapley feature contributions for analyst review",
      items: [
        { name: "SHAP Feature Attribution", detail: "Provides mathematical breakdown of positive/negative feature drivers per lead." },
        { name: "Risk × Confidence Matrix Triage", detail: "Plots leads onto 4 operational quadrants to eliminate alert fatigue." },
        { name: "Bulletproof ASN Matching", detail: "Cross-references offshore bulletproof host registries offline." },
      ],
    },
    {
      title: "Casework & Reporting",
      icon: FileText,
      desc: "Court-admissible dossier generation and evidence management",
      items: [
        { name: "Immutable Chain of Custody", detail: "Maintains local audit log of analyst actions, graph expansions, and notes." },
        { name: "Court-Admissible Dossier Export", detail: "Exports standardized JSON and PDF reports for official FIU-India submission." },
        { name: "Offline Workstation Mode", detail: "100% local execution with zero network socket transmissions or cloud leaks." },
      ],
    },
  ];

  return (
    <div className="space-y-24 py-16 animate-fade-in-up">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-bold">
          <Activity className="w-3.5 h-3.5 text-indigo-600 dark:text-rose-400" />
          <span>ENTERPRISE SYSTEM CAPABILITIES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          Engineered for high-stakes <br />
          <span className="bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-900 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
            blockchain forensic investigations.
          </span>
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans mb-8">
          Explore the complete suite of analytical capabilities embedded in the BIT-SHIELD workstation — categorized into Detection, Investigation, Intelligence, and Casework.
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <Link
            href="/command-center"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md transition"
          >
            <span>TEST CAPABILITIES IN COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Interactive Capabilities Component ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CapabilitiesSection />
      </section>

      {/* ── Categorized Capability Grid ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div key={cat.title} className="ws-card p-8 rounded-2xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-[var(--border-subtle)] pb-4">
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-slate-900 dark:text-white">
                  <cat.icon className="w-5 h-5 text-indigo-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">{cat.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">{cat.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-1">
                    <div className="flex items-center space-x-2 font-mono font-bold text-slate-900 dark:text-white text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed pl-5">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
