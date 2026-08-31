"use client";

import Link from "next/link";
import { HardDrive, Lock, ShieldCheck, Cpu, Terminal, Database, Server, Check, ArrowRight, ChevronRight, Layers } from "lucide-react";
import OfflineArchitecture from "@/components/landing/OfflineArchitecture";

export default function ArchitecturePage() {
  const pipelineLayers = [
    {
      layer: "LAYER 01",
      title: "Data Source & Telemetry Ingestion",
      tech: "Python Polars / Rust PCAP Parser",
      desc: "Ingests raw Bitcoin block dumps, transaction CSV/JSON exports, and network socket PCAP packet captures.",
    },
    {
      layer: "LAYER 02",
      title: "Memory-Mapped Normalization",
      tech: "Apache Arrow Memory-Mapped Buffer",
      desc: "Converts heterogeneous inputs into zero-copy in-memory tabular structures for high-velocity scoring.",
    },
    {
      layer: "LAYER 03",
      title: "Relational Multi-Graph Construction",
      tech: "Rust NetworkX Core Engine",
      desc: "Builds directional multi-graphs connecting inputs, outputs, addresses, IP sockets, and ASNs. Executes Common-Input-Ownership clustering.",
    },
    {
      layer: "LAYER 04",
      title: "Unsupervised Anomaly Isolation",
      tech: "Isolation Forest v2.4 (C-Optimized)",
      desc: "Constructs 100 decision trees isolating sparse outlier vectors without requiring historical labeled training data.",
    },
    {
      layer: "LAYER 05",
      title: "SHAP Explainability Engine",
      tech: "TreeSHAP Local Engine",
      desc: "Computes exact Shapley feature contributions per anomalous lead, eliminating black-box decision opacity.",
    },
    {
      layer: "LAYER 06",
      title: "Local Database & Dispatcher",
      tech: "Uvicorn FastAPI / Local SQLite",
      desc: "Exposes REST endpoints bound strictly to localhost (127.0.0.1). Stores case files, audit trails, and investigator notes locally.",
    },
    {
      layer: "LAYER 07",
      title: "Analyst Workstation Interface",
      tech: "Next.js App Router / VisNetwork Canvas",
      desc: "Interactive visual UI displaying force-directed graph topologies, timeline scrubbing, and PDF/JSON dossier export.",
    },
  ];

  return (
    <div className="space-y-24 py-16 animate-fade-in-up">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-bold">
          <HardDrive className="w-3.5 h-3.5 text-indigo-600 dark:text-rose-400" />
          <span>SYSTEM ARCHITECTURE & SECURITY GUARANTEES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          100% Offline Air-Gapped <br />
          <span className="bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-900 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
            Local Workstation Runtime.
          </span>
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans mb-8">
          Designed specifically for secure law enforcement enclaves and classified intelligence environments. Model weights, graph processing algorithms, and parsing engines execute 100% locally with zero external network telemetry.
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <Link
            href="/ingestion"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md transition"
          >
            <span>INGEST LOCAL DATASETS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Interactive Architecture Component ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OfflineArchitecture />
      </section>

      {/* ── 7-Layer Visual Pipeline Architecture ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-1">
            END-TO-END PIPELINE SPECIFICATION
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            7-Layer System Execution Flow
          </h2>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {pipelineLayers.map((layer) => (
            <div key={layer.layer} className="ws-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] font-bold text-indigo-600 dark:text-rose-400 text-[10px] shrink-0">
                  {layer.layer}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">{layer.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5">{layer.desc}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-[var(--bg-surface)] px-3 py-1.5 rounded-lg border border-[var(--border-main)] font-bold shrink-0 self-start md:self-auto">
                {layer.tech}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
