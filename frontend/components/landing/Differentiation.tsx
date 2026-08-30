"use client";

import { Shield, Layers, HelpCircle, HardDrive, Cpu, CheckCircle } from "lucide-react";

export default function Differentiation() {
  const pillars = [
    {
      title: "OFFLINE INTELLIGENCE CORE",
      subtitle: "Local Evidentiary Isolation",
      description: "Sensitive analytical workloads and high-security forensics execute completely locally. Bulk metadata ingestion, graph generation, unsupervised ML inference, and visualization operate on-premises without dependency on external intelligence APIs or cloud runtime endpoints.",
      icon: HardDrive,
      points: [
        "No telemetry or analytical records leave the local workstation",
        "Operates on isolated forensic workstations or on-premises Linux servers",
        "Deterministic local models guarantee reproducible evidentiary trails",
      ],
    },
    {
      title: "MULTI-LAYER INTELLIGENCE",
      subtitle: "Cross-Correlated Signals",
      description: "Blockchain activity is analyzed alongside network propagation observations, temporal burst velocity, and graph topology. A single transaction that looks completely ordinary in isolation is exposed when cross-referenced against synchronized P2P endpoint broadcasts.",
      icon: Layers,
      points: [
        "Correlates raw TX bytes with peer IP addresses and ASN prefixes",
        "Discovers temporal clustering and non-human burst velocities",
        "Resolves multi-wallet syndicates via Common-Input-Ownership graph heuristics",
      ],
    },
    {
      title: "EXPLAINABLE BY DEFAULT",
      subtitle: "Evidentiary Transparency",
      description: "An alert is not the conclusion. BIT-SHIELD mathematically presents the concrete behavioral, network, and graph features that drove the anomaly score. Human analysts receive a transparent, court-admissible briefing rather than an unverified black-box verdict.",
      icon: Cpu,
      points: [
        "Exact SHAP feature contribution breakdowns for every lead",
        "Explicit 2D Risk vs Confidence scoring prevents hidden anomalies",
        "Clear demarcation between algorithmic correlation and human attribution",
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-slate-900">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
          <Shield className="w-3.5 h-3.5 text-slate-300" />
          <span>Architectural Philosophy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          Built for the investigation, <br />
          <span className="text-slate-300">not the spreadsheet.</span>
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed font-sans">
          Most transaction tools produce static tables with millions of rows or rely on external cloud scoring models that cannot be deployed in sensitive forensic environments. BIT-SHIELD was engineered from the ground up for active cyber-investigators.
        </p>
      </div>

      {/* 3 Heavyweight Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="glass-panel p-8 rounded-2xl flex flex-col justify-between border border-slate-800/80 hover:border-slate-700 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  {pillar.subtitle}
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-mono mb-3 tracking-wide">
                {pillar.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-6">
                {pillar.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
              {pillar.points.map((pt) => (
                <div key={pt} className="flex items-start space-x-2 text-[11px] text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span className="leading-snug">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
