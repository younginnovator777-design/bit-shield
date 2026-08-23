"use client";

import { useState } from "react";
import { Clock, Network, Cpu, Compass, ArrowRight, UserCheck, Shield, ChevronRight } from "lucide-react";

export default function InvestigatorExperience() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const questions = [
    {
      step: "01",
      question: "WHAT HAPPENED?",
      facet: "Temporal Burst Signature",
      icon: Clock,
      headline: "A burst of activity occurred within an unusually compressed interval.",
      detail: "14 transactions totaling 128.4 BTC were broadcast across 6 distinct peers in 42 seconds. The inter-arrival delta was under 3.1 seconds per hop, ruling out manual human interaction and matching automated syndication peeling scripts.",
      uiSnippet: {
        label: "TEMPORAL TIMELINE SCRUBBER",
        values: ["T+00s: Initial Fan-Out [bc1q99...]", "T+18s: Multi-Hop Layer [tx:401ca...]", "T+42s: Peer Broadcast Consolidation"],
      },
    },
    {
      step: "02",
      question: "WHERE DID IT CONNECT?",
      facet: "Dual-Layer Graph Topology",
      icon: Network,
      headline: "Related wallets, transactions, and observed network endpoints form a localized relationship structure.",
      detail: "Common-Input-Ownership (CIOH) clusters 5 independent funding wallets into a single entity. Concurrently, network packet observations link the transaction broadcasts to 2 bulletproof hosting ASNs located in eastern jurisdictions.",
      uiSnippet: {
        label: "LOCALIZED GRAPH CLUSTER",
        values: ["5 Correlated Input Wallets (CIOH Resolved)", "2 Intercepted Broadcast ASNs (ASN-45102, ASN-13335)", "14 Dispersal Outputs (Fan-Out Degree = 14)"],
      },
    },
    {
      step: "03",
      question: "WHY WAS IT FLAGGED?",
      facet: "SHAP Explainability Waterfall",
      icon: Cpu,
      headline: "Model contributions identify the exact behavioral signals driving the anomaly score.",
      detail: "The local Isolation Forest evaluated 100 decision trees. Rather than a vague percentage, SHAP attribution reveals velocity contributed +0.32, fan-out ratio contributed +0.28, and ASN co-location contributed +0.18 to the final 0.89 anomaly score.",
      uiSnippet: {
        label: "SHAP CONTRIBUTION VECTOR",
        values: ["+0.32 Burst Velocity (Top Factor)", "+0.28 Fan-Out Dispersion Ratio", "+0.18 Bulletproof ASN Network Linkage"],
      },
    },
    {
      step: "04",
      question: "WHAT SHOULD HAPPEN NEXT?",
      facet: "Human-in-the-Loop Triage",
      icon: Compass,
      headline: "The system prioritizes the lead for human investigation — it does not claim attribution.",
      detail: "BIT-SHIELD provides clean evidentiary dossiers for enforcement triage without algorithmic overreach. The investigator tags the entity, exports the correlated PCAP/ledger timeline, and flags related downstream addresses for ongoing local monitoring.",
      uiSnippet: {
        label: "ANALYST ACTION PROTOCOL",
        values: ["Priority 1 Case Assigned to Analyst", "Export Court-Admissible Dossier (JSON/PDF)", "Air-Gapped Local Rule Added for Linked UTXOs"],
      },
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-slate-900">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
          <UserCheck className="w-3.5 h-3.5 text-slate-300" />
          <span>Investigator Workflow</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          One lead. <br />
          <span className="text-slate-300">Four questions.</span>
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed font-sans">
          An alert is useless if an investigator cannot immediately answer why it matters. BIT-SHIELD structures every lead around the four core questions of forensic intelligence.
        </p>
      </div>

      {/* 4 Interactive Tabbed Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {questions.map((q, idx) => (
          <button
            key={q.step}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`p-4 rounded-xl border text-left font-mono transition-all duration-300 ${
              activeStep === idx
                ? "bg-slate-900 border-slate-500 shadow-[0_0_20px_rgba(255,255,255,0.08)] ring-1 ring-slate-400"
                : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-400 font-bold">STEP {q.step}</span>
              <q.icon className={`w-4 h-4 ${activeStep === idx ? "text-white" : "text-slate-500"}`} />
            </div>
            <div className={`text-xs font-black tracking-wide ${activeStep === idx ? "text-white" : "text-slate-300"}`}>
              {q.question}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 truncate">
              {q.facet}
            </div>
          </button>
        ))}
      </div>

      {/* Active Stage Detailed Display Panel */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <span>QUESTION {questions[activeStep].step}</span>
              <span>•</span>
              <span className="text-white font-bold">{questions[activeStep].facet}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono leading-snug">
              {questions[activeStep].headline}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {questions[activeStep].detail}
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800/90 font-mono text-xs space-y-3">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>{questions[activeStep].uiSnippet.label}</span>
              <span className="text-emerald-400 font-bold">CORROBORATED</span>
            </div>

            <div className="space-y-2 pt-1">
              {questions[activeStep].uiSnippet.values.map((v, i) => (
                <div key={i} className="flex items-start space-x-2 p-2 rounded bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-200">
                  <span className="text-slate-400 shrink-0">▸</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
