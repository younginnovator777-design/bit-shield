"use client";

import { Shield, Scale, Info, CheckCircle2 } from "lucide-react";

export default function DoctrineDisclaimer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-slate-900">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800/90 relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-[#07090e] to-slate-950/90">
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full">
            <Scale className="w-3.5 h-3.5 text-slate-300" />
            <span>Evidentiary & Legal Doctrine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            Intelligence, not accusation.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl mx-auto">
            BIT-SHIELD identifies anomalous patterns and generates investigative leads. It does not establish criminal intent, legal ownership, real-world identity, or guilt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-xs pt-4">
            
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800/90 space-y-2">
              <div className="flex items-center space-x-2 text-slate-200 font-bold text-[11px] uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Correlation ≠ Ownership</span>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                Network observations (IP broadcasts, ASN routing, and peer latency) are treated as evidence of technical correlation during block propagation, never as direct proof of wallet private-key custody.
              </p>
            </div>

            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800/90 space-y-2">
              <div className="flex items-center space-x-2 text-slate-200 font-bold text-[11px] uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Entity Clustering = Inference</span>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">
                Common-Input-Ownership and multi-input clustering are probabilistic heuristics designed to focus human analyst attention, preserving evidentiary integrity for court proceedings.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
