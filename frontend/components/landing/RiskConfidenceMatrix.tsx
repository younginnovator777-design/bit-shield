"use client";

import { useState } from "react";
import { AlertTriangle, Search, ShieldCheck, HelpCircle, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function RiskConfidenceMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>("investigate_further");

  const quadrantDetails: Record<string, {
    title: string;
    badge: string;
    risk: string;
    confidence: string;
    color: string;
    border: string;
    bg: string;
    explanation: string;
    investigativeAction: string;
    exampleCase: string;
  }> = {
    priority_lead: {
      title: "PRIORITY LEAD",
      badge: "High Risk • High Confidence",
      risk: "0.85 - 1.00 (Extreme Outlier)",
      confidence: "80% - 100% (Dense Multi-Layer Support)",
      color: "text-rose-400",
      border: "border-rose-500/70",
      bg: "bg-rose-950/20",
      explanation: "Significant multi-feature anomaly confirmed across multiple independent observation layers (e.g., rapid multi-hop fan-out correlated with shared hosting ASN and known co-spending patterns).",
      investigativeAction: "Immediate escalation to senior analyst. Generate full dossier and freeze/trace downstream hops.",
      exampleCase: "TX-401ca: 14 output addresses funded in 18s from 1 wallet, all broadcasting from Russian Bulletproof Host ASN-45102.",
    },
    investigate_further: {
      title: "INVESTIGATE FURTHER",
      badge: "High Risk • Low Confidence (Never Hidden)",
      risk: "0.80 - 1.00 (Extreme Outlier)",
      confidence: "20% - 50% (Sparse / Partial Telemetry)",
      color: "text-amber-400",
      border: "border-amber-500/70",
      bg: "bg-amber-950/20",
      explanation: "Behavior is extremely anomalous, but supporting evidence is sparse (e.g., partial network logs or newly created wallet addresses). Traditional systems multiply Risk × Confidence, which fatally masks these cases.",
      investigativeAction: "Targeted reconnaissance. Correlate with historical peer nodes and collect additional temporal window traffic.",
      exampleCase: "TX-e8b21: 82.5 BTC peeling chain with abnormal locktime, but originating from an ephemeral single-use Tor relay.",
    },
    low_concern: {
      title: "LOW CONCERN",
      badge: "Low Risk • High Confidence",
      risk: "0.05 - 0.25 (Standard Baseline)",
      confidence: "85% - 100% (Well-Attributed Patterns)",
      color: "text-emerald-400",
      border: "border-emerald-500/70",
      bg: "bg-emerald-950/20",
      explanation: "Behavior aligns perfectly with standard commercial exchange consolidation, regular mining pool payouts, or routine peer transfers with complete network and blockchain telemetry.",
      investigativeAction: "Automated logging. No human triage required.",
      exampleCase: "TX-9bf33: Regular exchange batch withdrawal with standard multi-sig inputs and commercial datacenter ASN.",
    },
    insufficient_evidence: {
      title: "INSUFFICIENT EVIDENCE",
      badge: "Low Risk • Low Confidence",
      risk: "0.10 - 0.30 (Normal Range)",
      confidence: "10% - 30% (Incomplete Data)",
      color: "text-slate-400",
      border: "border-slate-700/80",
      bg: "bg-slate-900/30",
      explanation: "Low anomaly score with sparse context. Activity appears unremarkable, but cannot be fully characterized due to missing network propagation telemetry.",
      investigativeAction: "Archived to background buffer. Re-evaluate if subsequent transactions touch linked entities.",
      exampleCase: "TX-109aa: Small value p2p transfer with missing broadcast peer logs and no historical address co-spends.",
    },
  };

  const active = quadrantDetails[selectedQuadrant];

  return (
    <section id="matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-slate-900">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Triage Doctrine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          Not every anomaly is <br />
          <span className="text-slate-300">equally understood.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
          Risk and Confidence are independent, orthogonal dimensions.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Conventional platforms multiply Risk and Confidence into a single flat score. If confidence is low due to incomplete network captures, a critical high-risk transaction drops below alert thresholds. BIT-SHIELD plots them as an explicit 2-axis matrix: <span className="text-white font-semibold">High risk is never hidden simply because confidence is low.</span>
        </p>
      </div>

      {/* Interactive 2D Matrix Grid + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Visual 2D Matrix Grid (5 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative">
          
          <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-400">
            <span className="font-bold text-white uppercase">2D Triage Plane</span>
            <span>CLICK QUADRANT TO INSPECT</span>
          </div>

          <div className="relative pt-6 pl-8 pb-4 pr-2">
            
            {/* Y-Axis Label: RISK */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              ANOMALY RISK ↑
            </div>

            {/* Matrix 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 aspect-square max-w-[420px] mx-auto">
              
              {/* Quadrant: High Risk / Low Conf -> INVESTIGATE FURTHER */}
              <button
                type="button"
                onClick={() => setSelectedQuadrant("investigate_further")}
                className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 border font-mono ${
                  selectedQuadrant === "investigate_further"
                    ? "bg-amber-950/40 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-500"
                    : "bg-slate-950/70 border-amber-900/40 hover:border-amber-600/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">HIGH RISK / LOW CONF</span>
                    <Search className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-sm font-black text-amber-300">INVESTIGATE FURTHER</div>
                </div>
                <div className="text-[10px] text-slate-400">
                  Sparse data, severe anomaly. <br />
                  <span className="text-amber-300 font-semibold">NEVER SUPPRESSED.</span>
                </div>
              </button>

              {/* Quadrant: High Risk / High Conf -> PRIORITY LEAD */}
              <button
                type="button"
                onClick={() => setSelectedQuadrant("priority_lead")}
                className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 border font-mono ${
                  selectedQuadrant === "priority_lead"
                    ? "bg-rose-950/50 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.3)] ring-1 ring-rose-500"
                    : "bg-slate-950/70 border-rose-900/40 hover:border-rose-600/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider">HIGH RISK / HIGH CONF</span>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-sm font-black text-rose-300">PRIORITY LEAD</div>
                </div>
                <div className="text-[10px] text-slate-400">
                  Confirmed multi-layer syndicate signature.
                </div>
              </button>

              {/* Quadrant: Low Risk / Low Conf -> INSUFFICIENT EVIDENCE */}
              <button
                type="button"
                onClick={() => setSelectedQuadrant("insufficient_evidence")}
                className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 border font-mono ${
                  selectedQuadrant === "insufficient_evidence"
                    ? "bg-slate-900 border-slate-500 ring-1 ring-slate-400 shadow-md"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">LOW RISK / LOW CONF</span>
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-300">INSUFFICIENT EVIDENCE</div>
                </div>
                <div className="text-[10px] text-slate-400">
                  Background telemetry gap.
                </div>
              </button>

              {/* Quadrant: Low Risk / High Conf -> LOW CONCERN */}
              <button
                type="button"
                onClick={() => setSelectedQuadrant("low_concern")}
                className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 border font-mono ${
                  selectedQuadrant === "low_concern"
                    ? "bg-emerald-950/40 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500"
                    : "bg-slate-950/70 border-emerald-950/40 hover:border-emerald-800/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">LOW RISK / HIGH CONF</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-sm font-black text-emerald-300">LOW CONCERN</div>
                </div>
                <div className="text-[10px] text-slate-400">
                  Verified benign operational flow.
                </div>
              </button>

            </div>

            {/* X-Axis Label: CONFIDENCE */}
            <div className="text-center mt-4 text-[11px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              EVIDENCE CONFIDENCE →
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Risk asks: How anomalous is it?</span>
            <span>Confidence asks: How strongly supported?</span>
          </div>

        </div>

        {/* Right: Detailed Deep-Dive Inspector (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full border ${active.border} ${active.bg} ${active.color}`}>
                {active.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400">NTRO TRIAGE STANDARD</span>
            </div>

            <h3 className={`text-2xl font-black font-mono tracking-tight mb-3 ${active.color}`}>
              {active.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
              {active.explanation}
            </p>

            <div className="space-y-4 font-mono text-xs mb-6">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  MANDATED INVESTIGATIVE ACTION
                </div>
                <div className="text-white font-sans text-xs leading-relaxed">
                  {active.investigativeAction}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  REPRESENTATIVE FORENSIC CASE
                </div>
                <div className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  {active.exampleCase}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Score Vector: Risk {active.risk}</span>
            <span className="text-white font-semibold">Triage Ready</span>
          </div>

        </div>

      </div>

    </section>
  );
}
