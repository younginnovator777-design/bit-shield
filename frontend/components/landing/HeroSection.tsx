"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldAlert, Cpu, HardDrive, Terminal, Layers } from "lucide-react";
import NetworkBackground from "./NetworkBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden">
      {/* Precision Geometric Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-overlay pointer-events-none z-0" />
      
      {/* Background Interactive Network Simulation */}
      <NetworkBackground />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Enterprise Intelligence Badges */}
        <div className="inline-flex items-center space-x-2.5 bg-slate-900/80 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 mb-8 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-semibold tracking-wider">AI-POWERED BITCOIN FORENSICS</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-medium">NETWORK & CHAIN CORRELATION</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-bold">OFFLINE ANALYSIS</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08] max-w-5xl">
          Money moves in seconds.
          <br />
          <span className="bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 bg-clip-text text-transparent">
            Intelligence shouldn't lag behind.
          </span>
        </h1>

        {/* Platform Identity Title */}
        <div className="flex items-center space-x-2.5 mb-5">
          <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase font-bold">
            BIT-SHIELD
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-400 tracking-wider">
            OFFLINE BITCOIN TRAFFIC INTELLIGENCE
          </span>
        </div>

        {/* Secondary Subtitle Statement */}
        <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto mb-3 leading-relaxed font-normal">
          AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic — correlating P2P network telemetry with on-chain blockchain records.
        </p>

        {/* Supporting statement */}
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
          Ingest bulk transaction metadata, correlate peer network layer data with blockchain ledger data, and surface explainable investigative leads.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link
            href="/command-center"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm font-mono tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.22)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>LAUNCH COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>

          <a
            href="#threat"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900/70 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 px-7 py-4 rounded-xl text-sm font-mono tracking-wide backdrop-blur-xl transition-all"
          >
            <span>SYSTEM ARCHITECTURE</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Live System Operational Specs Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-4xl text-left font-mono">
          <div className="bg-slate-900/60 border border-white/[0.08] p-4 rounded-2xl backdrop-blur-xl hover:border-white/15 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>Bulk Metadata Ingestion</span>
            </div>
            <div className="text-xs font-bold text-slate-200">PCAP / CSV / JSON Ingestion</div>
          </div>

          <div className="bg-slate-900/60 border border-white/[0.08] p-4 rounded-2xl backdrop-blur-xl hover:border-white/15 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>AI Anomaly Engine</span>
            </div>
            <div className="text-xs font-bold text-slate-200">Isolation Forest & SHAP</div>
          </div>

          <div className="bg-slate-900/60 border border-white/[0.08] p-4 rounded-2xl backdrop-blur-xl hover:border-white/15 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Multi-Layer Graph</span>
            </div>
            <div className="text-xs font-bold text-slate-200">Network & Chain Correlation</div>
          </div>

          <div className="bg-slate-900/60 border border-white/[0.08] p-4 rounded-2xl backdrop-blur-xl hover:border-white/15 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Analysis Mode</span>
            </div>
            <div className="text-xs font-bold text-emerald-400">Offline Local Execution</div>
          </div>
        </div>

      </div>
    </section>
  );
}
