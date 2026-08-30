"use client";

import { useState } from "react";
import { HardDrive, Database, Network, Cpu, Eye, LayoutDashboard, Shield, Lock, Terminal, CheckCircle2, ArrowRight } from "lucide-react";

export default function OfflineArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const layers = [
    {
      id: "LAYER 01",
      name: "TRANSACTION DATA INGESTION",
      tech: "Polars • Streaming IO • Schema Normalizer",
      icon: Database,
      input: "Raw Bitcoin Block dumps, CSV metadata, JSON dumps, PCAP network captures",
      processing: "High-throughput parallel parsing without socket leaks or cloud ETL pipelines.",
      output: "Normalized tabular stream of inputs, outputs, timestamps, fee rates, and peer IPs.",
    },
    {
      id: "LAYER 02",
      name: "OFFLINE ENRICHMENT & METRICS",
      tech: "Local MaxMind GeoIP DB • Local ASN Registry",
      icon: HardDrive,
      input: "Normalized transaction records + Raw IP addresses",
      processing: "Resolves autonomous systems, broadcast ports, and geographical routing entirely from local embedded databases.",
      output: "Enriched event vectors with IP/ASN provenance and latency deltas.",
    },
    {
      id: "LAYER 03",
      name: "DUAL-LAYER GRAPH & HEURISTICS",
      tech: "NetworkX • CIOH Heuristics • Peeling Resolvers",
      icon: Network,
      input: "Multi-input/output transactions and enriched network records",
      processing: "Applies Common-Input-Ownership heuristics to cluster distinct wallet addresses into single syndicate entities; constructs directed multi-hop graphs.",
      output: "Relational graph topology with degree centrality, fan-out ratios, and peeling scores.",
    },
    {
      id: "LAYER 04",
      name: "AI ANOMALY ENGINE",
      tech: "Scikit-Learn Isolation Forest (Local Deterministic)",
      icon: Cpu,
      input: "Engineered feature matrix (velocity, fan-out, graph degree, ASN rarity)",
      processing: "Builds 100 orthogonal isolation trees locally to isolate anomalous transaction structures in high-dimensional feature space.",
      output: "Continuous Anomaly Scores [0.0 - 1.0] indicating structural divergence from baseline.",
    },
    {
      id: "LAYER 05",
      name: "MODEL EXPLAINABILITY CORE",
      tech: "TreeSHAP Local Explainer",
      icon: Eye,
      input: "Trained Isolation Forest model + Anomaly candidate vectors",
      processing: "Computes exact Shapley feature attributions to mathematically determine why an anomaly was flagged.",
      output: "Granular feature impact vectors (e.g. Velocity: +0.32, Fan-out: +0.28).",
    },
    {
      id: "LAYER 06",
      name: "FORENSIC COMMAND WORKSPACE",
      tech: "Next.js • Vis.js • WebGL Accelerated Canvas",
      icon: LayoutDashboard,
      input: "Prioritized leads, SHAP explanations, and relational graphs",
      processing: "Renders interactive multi-hop graph neighborhoods, timeline burst playback, and dossier generation.",
      output: "Court-admissible investigative intelligence dossiers.",
    },
  ];

  return (
    <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-slate-900">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Offline Execution Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          Designed for environments where <br />
          <span className="text-slate-300">data cannot leave the room.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
          BIT-SHIELD is engineered as a self-contained, Linux-deployable intelligence platform.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Data ingestion, feature engineering, anomaly detection, graph clustering, and explainability all execute locally — without relying on cloud inference, remote LLM endpoints, or external telemetry leaks.
        </p>
      </div>

      {/* Offline System Status Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16 font-mono text-xs">
        <div className="bg-slate-950 p-4 rounded-xl border border-white/[0.08] flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase">SYSTEM STATE</span>
          <div className="text-emerald-400 font-bold flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>OFFLINE CORE</span>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-white/[0.08] flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase">EXTERNAL NETWORK</span>
          <div className="text-slate-300 font-bold mt-2">DISCONNECTED</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-white/[0.08] flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase">AI ENGINE</span>
          <div className="text-white font-bold mt-2">LOCAL ISOLATION</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-white/[0.08] flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase">STORAGE ENGINE</span>
          <div className="text-white font-bold mt-2">LOCAL DUCKDB/PARQUET</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-white/[0.08] flex flex-col justify-between col-span-2 md:col-span-1">
          <span className="text-[10px] text-slate-400 uppercase">TELEMETRY LEAKAGE</span>
          <div className="text-emerald-400 font-bold mt-2">ZERO (0.00%)</div>
        </div>
      </div>

      {/* Under the Surface: 6-Stage Pipeline Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: 6-Stage Interactive Vertical Flow (5 cols) */}
        <div className="lg:col-span-5 space-y-2 font-mono">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
            UNDER THE SURFACE • EXECUTION STACK
          </div>
          
          {layers.map((layer, idx) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setSelectedLayer(idx)}
              className={`w-full p-4 rounded-xl text-left border transition-all duration-300 flex items-center justify-between ${
                selectedLayer === idx
                  ? "bg-slate-900 border-slate-500 shadow-[0_0_20px_rgba(255,255,255,0.08)] ring-1 ring-slate-400"
                  : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center space-x-3">
                <layer.icon className={`w-4 h-4 ${selectedLayer === idx ? "text-white" : "text-slate-500"}`} />
                <div>
                  <div className="text-[10px] text-slate-400">{layer.id}</div>
                  <div className={`text-xs font-bold tracking-wide ${selectedLayer === idx ? "text-white" : "text-slate-300"}`}>
                    {layer.name}
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-500">→</span>
            </button>
          ))}
        </div>

        {/* Right column: Layer Deep Dive Inspector (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                {layers[selectedLayer].id} SPECIFICATION
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {layers[selectedLayer].name}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
              {(() => {
                const IconComponent = layers[selectedLayer].icon;
                return <IconComponent className="w-5 h-5" />;
              })()}
            </div>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                STACK & ENGINE
              </span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-slate-200">
                {layers[selectedLayer].tech}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                INPUT SOURCES
              </span>
              <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                {layers[selectedLayer].input}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                OFFLINE EXECUTION LOGIC
              </span>
              <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                {layers[selectedLayer].processing}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                OUTPUT PRODUCT
              </span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-slate-200">
                {layers[selectedLayer].output}
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
