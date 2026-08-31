"use client";

import { useState } from "react";
import { HardDrive, Lock, ShieldCheck, Cpu, Terminal, Database, Server, Check } from "lucide-react";

export default function OfflineArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const layers = [
    {
      id: "01",
      name: "File Ingestion Layer",
      tech: "Python Polars / Rust Parser",
      desc: "Streams multi-gigabyte CSV, JSON, XML, or raw PCAP files directly into memory-mapped Apache Arrow format. Zero network calls or external API dependency.",
    },
    {
      id: "02",
      name: "Graph Construction Engine",
      tech: "Rust NetworkX Core",
      desc: "Constructs in-memory directional multi-graphs linking inputs, outputs, addresses, IP addresses, and ASNs. Resolves Common-Input-Ownership clusters in milliseconds.",
    },
    {
      id: "03",
      name: "Isolation Forest Model",
      tech: "Scikit-Learn C-Optimized",
      desc: "Executes 100 orthogonal isolation trees over engineered feature matrices. Pre-trained model weights are stored locally with zero external API callbacks.",
    },
    {
      id: "04",
      name: "SHAP Explainer Pipeline",
      tech: "TreeSHAP Engine",
      desc: "Calculates exact Shapley values per feature for isolated outliers. Generates mathematical attribution scores explaining precisely why a lead was flagged.",
    },
    {
      id: "05",
      name: "Local FastAPI Dispatcher",
      tech: "Uvicorn / SQLite Storage",
      desc: "Exposes REST endpoints bound strictly to localhost (127.0.0.1). Persists case binders, audit logs, and analyst notes locally in SQLite database.",
    },
    {
      id: "06",
      name: "Next.js UI & Force Graph Canvas",
      tech: "VisNetwork / React 19",
      desc: "Client-side interactive visualization canvas with force-directed graph layouts, timeline scrubbing, and dossier export capabilities.",
    },
  ];

  return (
    <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
          <HardDrive className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Workstation Specifications</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          100% Offline Self-Contained <br />
          <span className="text-slate-500 dark:text-slate-300">System Architecture.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Built from the ground up for classified law enforcement air-gapped workstations and secure intelligence enclaves. Zero data leaves your machine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Layer Buttons Selector */}
        <div className="lg:col-span-6 space-y-3">
          {layers.map((layer, idx) => (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(idx)}
              className={`w-full p-4 rounded-xl border text-left transition-all font-mono flex items-center justify-between ${
                selectedLayer === idx
                  ? "bg-[var(--bg-card)] border-indigo-500/50 dark:border-slate-500 text-slate-900 dark:text-white shadow-md font-bold"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 shadow-xs"
              }`}
            >
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold">{layer.id}</span>
                <span>{layer.name}</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{layer.tech}</span>
            </button>
          ))}
        </div>

        {/* Selected Layer Specification Details */}
        <div className="lg:col-span-6 ws-card p-6 sm:p-8 rounded-2xl space-y-5 shadow-xs">
          
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
                LAYER {layers[selectedLayer].id} SPECIFICATION
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-1">
                {layers[selectedLayer].name}
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 dark:border-emerald-800/50 px-2.5 py-1 rounded-full font-bold">
              OFFLINE LOCAL
            </span>
          </div>

          <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] font-mono text-xs text-slate-800 dark:text-slate-200 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Technology Stack:</span>
            <span className="text-slate-900 dark:text-white font-bold">{layers[selectedLayer].tech}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {layers[selectedLayer].desc}
          </p>

          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">SECURITY GUARANTEES</div>
            <div className="space-y-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero external network socket requests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>All AI models pre-compiled locally</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Court-exportable JSON & PDF dossiers</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
