"use client";

import { useState } from "react";
import { HelpCircle, Clock, Network, Cpu, Compass, CheckCircle2, ChevronRight, Shield } from "lucide-react";

export default function InvestigatorExperience() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const questions = [
    {
      q: "01 · WHAT HAPPENED?",
      title: "Temporal Burst & Inter-Arrival Analysis",
      icon: Clock,
      answer: "Constructs high-precision timeline intervals between transaction inputs and outputs. Flags rapid multi-hop layering where funds hop across 5 outputs in under 90 milliseconds.",
      snippet: "BURST_BURST_MS: +12ms • OUTPUT_COUNT: 16 • FAN_OUT_RATIO: 14.2x • VELOCITY_PCT: 98.4%",
    },
    {
      q: "02 · WHERE DID IT CONNECT?",
      title: "P2P Network & ASN Mapping",
      icon: Network,
      answer: "Correlates broadcasting peer IP addresses with Autonomous Systems (ASNs). Identifies bulletproof hosting infrastructure, VPN gateways, and cross-border relay sockets.",
      snippet: "RELAY_IP: 203.0.113.88 • ASN: AS45102 (Bulletproof) • PORT: 8333 • GEO: Offshore Relay",
    },
    {
      q: "03 · WHY WAS IT FLAGGED?",
      title: "SHAP Model Feature Attribution",
      icon: Cpu,
      answer: "Displays exact mathematical feature contributions. Shows precisely why the Isolation Forest assigned an anomaly score of 88/100 without black-box opacity.",
      snippet: "SHAP_ATTRIBUTION: +28.4 (High Fan-Out) • +24.1 (Short Burst) • +21.0 (ASN Colocation)",
    },
    {
      q: "04 · WHAT SHOULD HAPPEN?",
      title: "Investigative Triage Protocol",
      icon: Compass,
      answer: "Recommends actionable human steps: expand 2-hop neighborhood, inspect co-spending clusters, generate court-admissible dossier, or file AML suspicious activity lead.",
      snippet: "RECOMMENDED_ACTION: Assign Senior Analyst • Create Case File • Export PDF Dossier",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[var(--border-main)] transition-colors duration-300">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          <span>Investigator Workflows</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Designed around the <br />
          <span className="text-slate-500 dark:text-slate-300">4 core forensic questions.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Instead of overwhelming analysts with raw data tables, BIT-SHIELD structures every lead into four clear, intuitive analytical views.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 4 Tabs Selector */}
        <div className="lg:col-span-5 space-y-3">
          {questions.map((item, idx) => (
            <button
              key={item.q}
              onClick={() => setActiveTab(idx)}
              className={`w-full p-4 rounded-xl border text-left transition-all font-mono flex items-center justify-between ${
                activeTab === idx
                  ? "bg-[var(--bg-card)] border-indigo-500/50 dark:border-slate-500 text-slate-900 dark:text-white shadow-md font-bold"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 shadow-xs"
              }`}
            >
              <span className="flex items-center space-x-3 text-xs">
                <item.icon className={`w-4 h-4 ${activeTab === idx ? "text-indigo-600 dark:text-rose-400" : "text-slate-500"}`} />
                <span>{item.q}</span>
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === idx ? "rotate-90 text-indigo-600 dark:text-white" : "text-slate-400"}`} />
            </button>
          ))}
        </div>

        {/* Question Active Details Display Box */}
        <div className="lg:col-span-7 ws-card p-6 sm:p-8 rounded-2xl space-y-5 shadow-xs">
          
          <div className="flex items-center space-x-3 border-b border-[var(--border-subtle)] pb-4">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white">
              {(() => {
                const IconComponent = questions[activeTab].icon;
                return <IconComponent className="w-5 h-5 text-indigo-600 dark:text-rose-400" />;
              })()}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">{questions[activeTab].q}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">{questions[activeTab].title}</h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {questions[activeTab].answer}
          </p>

          <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 font-bold">SYSTEM OUTPUT READOUT</div>
            <div className="text-[11px] leading-relaxed overflow-x-auto text-slate-900 dark:text-white font-mono font-semibold">
              {questions[activeTab].snippet}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
