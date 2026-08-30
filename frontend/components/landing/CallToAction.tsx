"use client";

import Link from "next/link";
import { ArrowRight, Shield, Terminal, HardDrive, List } from "lucide-react";

export default function CallToAction() {
  return (
    <footer className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center overflow-hidden">
      
      <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-slate-800 relative bg-gradient-to-b from-slate-950 via-[#07090e] to-slate-950">
        
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-400 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5 text-slate-300" />
            <span>OPERATIONAL READINESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight leading-tight">
            The blockchain leaves a trail. <br />
            <span className="text-slate-300">BIT-SHIELD helps make sense of it.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-mono tracking-wide max-w-xl mx-auto">
            Explore the intelligence layer. Follow the evidence. Investigate the lead.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/command-center"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm font-mono tracking-wide shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>LAUNCH COMMAND CENTER</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              href="/leads"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 px-6 py-4 rounded-xl text-sm font-mono tracking-wide transition-all"
            >
              <List className="w-4 h-4 text-slate-400" />
              <span>LEADS DATABASE</span>
            </Link>
          </div>

          {/* System Specification Tagline Footer */}
          <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span className="text-white font-semibold">BIT-SHIELD</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">OFFLINE ANALYSIS</span>
            <span className="text-slate-600">•</span>
            <span>NETWORK & CHAIN CORRELATION</span>
            <span className="text-slate-600">•</span>
            <span>SHAP EXPLAINABILITY</span>
            <span className="text-slate-600">•</span>
            <span>ANOMALY DETECTION</span>
          </div>

        </div>

      </div>

      <div className="mt-12 text-center text-xs font-mono text-slate-500">
        BIT-SHIELD • AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic
      </div>

    </footer>
  );
}
