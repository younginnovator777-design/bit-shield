"use client";

import { AlertOctagon, TrendingUp, ShieldAlert, FileText, Globe, Landmark, ArrowUpRight } from "lucide-react";

export default function ThreatLandscape() {
  return (
    <section id="threat" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-slate-900">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          <span>The Operational Reality</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
          The trail is public. <br />
          <span className="text-slate-400">The pattern isn't.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
          Bitcoin transactions are visible by design. But visibility does not automatically create intelligence.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          A single transfer may look ordinary. Hundreds of transfers connected through wallets, endpoints, timing, and transaction structure can reveal an entirely different pattern. As digital assets become more deeply integrated into financial ecosystems, the challenge is shifting from finding transactions to understanding relationships between transactions.
        </p>
      </div>

      {/* 3 Core Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Stat 1: Global */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/10 rounded-full blur-2xl group-hover:bg-slate-700/20 transition-all" />
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-4">
              <span className="flex items-center gap-1.5 font-bold text-slate-300">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                GLOBAL ILLICIT FLOW
              </span>
              <span className="text-slate-400">2025 REPORT</span>
            </div>
            <div className="text-5xl font-black text-white font-mono tracking-tight mb-3">
              $154B+
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Cryptocurrency received by illicit addresses in 2025, according to the Chainalysis Crypto Crime Report. This represents a conservative lower-bound estimate based on identified on-chain clusters.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Chainalysis 2026</span>
            <span className="text-slate-400">Lower-Bound Baseline</span>
          </div>
        </div>

        {/* Stat 2: The Needle in the Haystack Caveat */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border-t-2 border-t-amber-500/80">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-amber-400/90 mb-4">
              <span className="flex items-center gap-1.5 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                THE IMPORTANT CAVEAT
              </span>
              <span className="text-slate-400 font-mono">SIGNAL RATIO</span>
            </div>
            <div className="text-5xl font-black text-amber-400 font-mono tracking-tight mb-3">
              &lt; 1%
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Even amid record volumes, illicit activity remains under 1% of overall crypto transaction volume. Detection is not a bulk filtering exercise — it is a signal-to-noise problem of isolating the needles.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-amber-400/80">
            <span>Severe Class Imbalance</span>
            <span>Needs Unsupervised AI</span>
          </div>
        </div>

        {/* Stat 3: India Enforcement */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border-t-2 border-t-rose-500/80">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all" />
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-rose-400/90 mb-4">
              <span className="flex items-center gap-1.5 font-bold">
                <Landmark className="w-3.5 h-3.5" />
                INDIA ENFORCEMENT REALITY
              </span>
              <span className="text-slate-400 font-mono">ED CASEFILE</span>
            </div>
            <div className="text-5xl font-black text-rose-400 font-mono tracking-tight mb-3">
              ₹640 Cr
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Enforcement Directorate investigated ₹640 crore of cyber-fraud proceeds layered through 5,000+ mule bank accounts, with funds subsequently converted into crypto to break the audit trail.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-rose-400/80">
            <span>5,000+ Mule Accounts</span>
            <span>Multi-System Layering</span>
          </div>
        </div>

      </div>

      {/* India Legal & FIU-India Context Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950/80 to-slate-900/90 border border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>FIU-India AML/CFT Compliance Framework</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
              The financial trail is no longer confined to one system. Neither can the investigation.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              India has formally brought Virtual Digital Asset Service Providers (VDA SPs)—including exchanges, peer-to-peer transfers, and custody providers—under the PML Act reporting ecosystem. When digital-asset movements intersect with conventional banking fraud, cross-border infrastructure, and fragmented endpoint logs, investigators need unified forensic correlation.
            </p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/90 font-mono text-xs space-y-2.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-1 font-bold">
              STATUTORY ALIGNMENT
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Regulator:</span>
              <span className="font-semibold text-white">FIU-India</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Framework:</span>
              <span className="font-semibold text-white">PMLA / VDA Guidelines</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Forensics:</span>
              <span className="text-emerald-400 font-semibold">Corroborated Offline</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
