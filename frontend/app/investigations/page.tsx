"use client";

import Link from "next/link";
import { Compass, Clock, Network, Cpu, ShieldCheck, ArrowRight, ChevronRight, Eye, AlertTriangle } from "lucide-react";
import { MOCK_LEADS } from "@/components/workspace/MockData";
import { RiskBadge } from "@/components/workspace/ui";

export default function InvestigationsPage() {
  const steps = [
    {
      num: "01",
      title: "Raw Data Ingestion",
      desc: "Parse offline transaction dumps, CSV logs, JSON RPC streams, or raw PCAP packet captures into memory-mapped Apache Arrow format.",
      icon: Clock,
    },
    {
      num: "02",
      title: "Anomaly Isolation",
      desc: "Unsupervised Isolation Forest algorithm scores 100 decision trees across burst velocity, fan-out count, and locktime features.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Multi-Hop Graph Tracing",
      desc: "Construct directional multi-layer graphs linking addresses, IP endpoints, and ASNs. Common-Input-Ownership resolves wallet syndicates.",
      icon: Network,
    },
    {
      num: "04",
      title: "SHAP Explainable Leads",
      desc: "Calculate exact Shapley feature values per anomaly vector, producing transparent, court-admissible leads for analyst triage.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-24 py-16 animate-fade-in-up">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-bold">
          <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-rose-400" />
          <span>INVESTIGATIVE WORKFLOW ARCHITECTURE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          From high-volume traffic <br />
          <span className="bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-900 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
            to court-admissible evidence.
          </span>
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans mb-8">
          BIT-SHIELD automates the complex multi-step forensic pipeline: transforming raw transaction logs into structured entity graphs, explainable risk vectors, and actionable case binders.
        </p>
      </section>

      {/* ── 4-Step Workflow Section ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="ws-card p-6 flex flex-col justify-between space-y-4 relative group">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-rose-400">STEP {step.num}</span>
                  <step.icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Active Investigation Canvases Preview ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest mb-1 font-bold">
              ACTIVE CANVASES
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              Live Investigation Leads Queue
            </h2>
          </div>
          <Link href="/leads" className="flex items-center space-x-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
            <span>View All Leads</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_LEADS.slice(0, 3).map((lead) => (
            <div key={lead.txid} className="ws-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">{lead.txid}</span>
                  <RiskBadge band={lead.priority_band} />
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  Amount: <strong className="text-slate-900 dark:text-white">{lead.amount_btc} BTC</strong> · Fan-out: <strong className="text-slate-900 dark:text-white">{lead.fan_out_ratio}×</strong>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                  {lead.shap_explanation}
                </p>
              </div>

              <Link
                href={`/investigation/${lead.txid}`}
                className="flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-xs font-mono font-bold rounded-xl transition shadow-xs uppercase tracking-wider"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Force Graph Canvas</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
