"use client";

import Link from "next/link";
import { Shield, Cpu, Activity, ArrowRight, Lock, Database, Network } from "lucide-react";

export default function BriefingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans border-t-4 border-cyan-600">
      {/* Header */}
      <header className="flex justify-between items-center max-w-7xl mx-auto w-full p-6 border-b border-slate-900">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-cyan-500" />
          <span className="text-2xl font-black tracking-widest text-slate-100">BIT-SHIELD <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded ml-2">OFFLINE WORKSTATION</span></span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-emerald-500 font-mono bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50">
          <Lock className="w-4 h-4" />
          <span>AIR-GAPPED DEPLOYMENT ACTIVE</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Pitch & Solution */}
        <div>
          <div className="inline-flex items-center space-x-2 bg-rose-950/30 border border-rose-900/50 px-3 py-1 rounded-full text-xs text-rose-400 mb-6 font-mono">
            <Activity className="w-4 h-4" />
            <span>CRITICAL THREAT LANDSCAPE</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-50 mb-6 leading-tight">
            Cryptocurrency Threat Intelligence & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Network Forensics</span>
          </h1>
          
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-10">
            <p>
              <strong className="text-slate-200">The Problem:</strong> Traditional blockchain analysis relies on cloud APIs and simple heuristics, failing to detect sophisticated, multi-hop laundering syndicates in highly restricted, air-gapped defense environments.
            </p>
            <p>
              <strong className="text-slate-200">The Solution:</strong> BIT-SHIELD is a localized, high-performance intelligence engine. It fuses temporal transaction velocity, structural network graphs, and unsupervised machine learning to surface high-priority anomalies with zero external dependencies.
            </p>
          </div>

          <Link href="/command-center" className="inline-flex items-center space-x-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] transition duration-200">
            <span>INITIALIZE MISSION CONTROL</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Right Column: Technical Architecture */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-200 border-b border-slate-800 pb-3">Technical Architecture & Capabilities</h3>
           
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-start space-x-4 hover:border-cyan-900 transition">
             <Database className="w-8 h-8 text-cyan-400 mt-1 shrink-0" />
             <div>
               <h4 className="font-bold text-slate-200">High-Throughput Ingestion (Polars)</h4>
               <p className="text-sm text-slate-400 mt-1">Multi-threaded vectorized processing handles massive transaction ledgers locally, bypassing standard memory bottlenecks.</p>
             </div>
           </div>

           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-start space-x-4 hover:border-blue-900 transition">
             <Network className="w-8 h-8 text-blue-400 mt-1 shrink-0" />
             <div>
               <h4 className="font-bold text-slate-200">Dual-Layer Graph Inference (NetworkX)</h4>
               <p className="text-sm text-slate-400 mt-1">Simultaneous modeling of deterministic blockchain transfers and probabilistic IP/endpoint observations via CIOH clustering.</p>
             </div>
           </div>

           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-start space-x-4 hover:border-purple-900 transition">
             <Cpu className="w-8 h-8 text-purple-400 mt-1 shrink-0" />
             <div>
               <h4 className="font-bold text-slate-200">Unsupervised ML & Explainability</h4>
               <p className="text-sm text-slate-400 mt-1">Isolation Forest anomaly detection coupled with SHAP (SHapley Additive exPlanations) for mathematically rigorous feature attribution.</p>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}
