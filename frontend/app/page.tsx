"use client";

import Link from "next/link";
import { Shield, ArrowRight, Network, Cpu, Activity, Database, Lock, Zap, Eye, GitCommit, Layers, Server } from "lucide-react";

export default function BriefingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-900 selection:text-cyan-50">
      
      {/* GLOBAL HEADER */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <Shield className="w-7 h-7 text-cyan-400" />
          <span className="text-xl font-black tracking-widest text-white">BIT-SHIELD</span>
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-full font-bold">AIR-GAPPED v3.0</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-3.5 py-1.5 rounded-full">
          <Lock className="w-3.5 h-3.5" />
          <span>100% OFFLINE WORKSTATION</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-20 text-center flex flex-col items-center justify-center min-h-[75vh]">
        <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-mono text-cyan-400 mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>NTRO PS 26146 • BITCOIN TRANSACTION FORENSICS</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight max-w-5xl">
          Money moves in seconds.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
            Intelligence shouldn't lag behind.
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          A high-performance, offline investigation workstation that correlates multi-layer network captures, temporal transaction bursts, and entity graph topologies to surface explainable leads without external cloud dependencies.
        </p>

        <Link href="/command-center" className="inline-flex items-center space-x-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-9 py-4 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105">
          <span>INITIALIZE COMMAND CENTER</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* LIVE PIPELINE STRIP */}
      <div className="w-full bg-slate-900/60 border-y border-slate-800/80 py-4 mb-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between items-center text-xs font-mono text-slate-400 uppercase tracking-widest gap-4">
          <span className="text-cyan-400 font-bold flex items-center gap-2"><Database className="w-4 h-4"/> Multi-Format Ingestion</span>
          <span>→</span>
          <span className="flex items-center gap-2"><Network className="w-4 h-4"/> Dual-Layer Graph</span>
          <span>→</span>
          <span className="flex items-center gap-2"><Cpu className="w-4 h-4"/> Isolation Forest ML</span>
          <span>→</span>
          <span className="flex items-center gap-2"><Eye className="w-4 h-4"/> SHAP Explainability</span>
          <span>→</span>
          <span className="text-emerald-400 font-bold flex items-center gap-2"><Shield className="w-4 h-4"/> Priority Leads</span>
        </div>
      </div>

      {/* THREAT LANDSCAPE: THE TRAIL IS PUBLIC */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">The trail is public. <span className="text-slate-500">The pattern isn't.</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Bitcoin transfers are visible by design, but visibility does not create intelligence. Finding sophisticated syndicates requires isolating needles in high-density data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-md">
            <div className="text-4xl font-black text-white font-mono mb-2">$154B+</div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">Global Illicit Volume</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Estimated cryptocurrency received by illicit addresses in 2025 (Chainalysis). Automated triage is mandatory to process this volume.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-md border-t-2 border-t-cyan-500">
            <div className="text-4xl font-black text-cyan-400 font-mono mb-2">&lt; 1%</div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">Signal-to-Noise Ratio</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Illicit transfers account for under 1% of total transaction flow. Standard threshold filtering creates massive false positive rates.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-md">
            <div className="text-4xl font-black text-white font-mono mb-2">₹640 Cr</div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">Multi-Hop Layering (India)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Enforcement Directorate investigations revealed cyber-fraud proceeds layered across 5,000+ mule accounts before off-ramping into digital assets.</p>
          </div>
        </div>
      </section>

      {/* LAUNDERING PATTERNS DETECTED */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-t border-slate-900">
        <h2 className="text-2xl font-black text-white tracking-tight mb-8">Detected Threat Topologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-xl">
            <GitCommit className="w-6 h-6 text-cyan-400 mb-3" />
            <h3 className="font-bold text-sm text-slate-200 mb-1">Multi-Hop Mule Chains</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Sequential transfers through intermediary accounts designed to obfuscate origin and bypass single-hop filters.</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-xl">
            <Layers className="w-6 h-6 text-rose-400 mb-3" />
            <h3 className="font-bold text-sm text-slate-200 mb-1">Fan-Out Dispersal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Rapid distribution of funds from a central vault across dozens of unassociated target addresses within seconds.</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-xl">
            <Server className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="font-bold text-sm text-slate-200 mb-1">IP Endpoint Clustering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Correlating distinct blockchain addresses that initiate transactions from identical network endpoints or ASNs.</p>
          </div>
        </div>
      </section>

      {/* 2D RISK vs CONFIDENCE MATRIX */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-t border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-4">Risk & Confidence are Independent Dimensions</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Conventional systems multiply Risk and Confidence, hiding high-risk anomalies if supporting evidence is incomplete. BIT-SHIELD plots them on an explicit 2-axis matrix:
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/60 border-l-4 border-l-rose-500 rounded-r-lg">
                <span className="font-bold text-rose-400 uppercase">Priority Lead:</span> High Anomaly Risk + High Evidence Confidence.
              </div>
              <div className="p-3 bg-slate-900/60 border-l-4 border-l-amber-500 rounded-r-lg">
                <span className="font-bold text-amber-400 uppercase">Investigate Further:</span> High Anomaly Risk + Low Evidence Confidence (Never Hidden).
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/50 border border-slate-800/80 rounded-2xl font-mono text-center text-xs">
            <div className="bg-slate-950 p-6 rounded-tl-xl border border-amber-900/50 text-amber-400">
              <div className="font-bold">INVESTIGATE FURTHER</div>
              <div className="text-[10px] text-slate-500 mt-1">High Risk / Low Conf</div>
            </div>
            <div className="bg-slate-950 p-6 rounded-tr-xl border border-rose-900/50 text-rose-400 shadow-[inset_0_0_20px_rgba(244,63,94,0.1)]">
              <div className="font-bold">PRIORITY LEAD</div>
              <div className="text-[10px] text-slate-500 mt-1">High Risk / High Conf</div>
            </div>
            <div className="bg-slate-950 p-6 rounded-bl-xl border border-slate-800 text-slate-500">
              <div className="font-bold">INSUFFICIENT EVIDENCE</div>
              <div className="text-[10px] text-slate-600 mt-1">Low Risk / Low Conf</div>
            </div>
            <div className="bg-slate-950 p-6 rounded-br-xl border border-emerald-900/50 text-emerald-400">
              <div className="font-bold">LOW CONCERN</div>
              <div className="text-[10px] text-slate-500 mt-1">Low Risk / High Conf</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="border-t border-slate-900 py-16 text-center">
        <h2 className="text-2xl font-black text-white mb-4">The blockchain leaves a trail. BIT-SHIELD makes sense of it.</h2>
        <Link href="/command-center" className="inline-flex items-center space-x-2 text-xs font-bold bg-white text-slate-950 px-6 py-3 rounded-xl hover:bg-slate-200 transition">
          <span>ENTER WORKSTATION</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </footer>
    </div>
  );
}
