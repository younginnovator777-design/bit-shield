"use client";

import Link from "next/link";
import { Shield, Lock, Terminal, ArrowRight, Activity } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/70 shadow-inner">
            <Shield className="w-5 h-5 text-slate-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-[#07090e]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-black tracking-widest text-white uppercase">BIT-SHIELD</span>
              <span className="text-[10px] font-mono tracking-wider bg-slate-800 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded font-semibold">
                PS 26146
              </span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 tracking-wider hidden sm:block">
              OFFLINE TRANSACTION INTELLIGENCE PLATFORM
            </p>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono uppercase tracking-wider text-slate-400">
          <a href="#threat" className="hover:text-white transition-colors">Threat Gap</a>
          <a href="#insights" className="hover:text-white transition-colors">Multi-Layer Graph</a>
          <a href="#capabilities" className="hover:text-white transition-colors">Intelligence Workflow</a>
          <a href="#matrix" className="hover:text-white transition-colors">Risk × Confidence</a>
          <a href="#architecture" className="hover:text-white transition-colors">Offline Core</a>
        </nav>

        {/* Status Badge & Enter Button */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>AIR-GAPPED SYSTEM</span>
          </div>

          <Link
            href="/command-center"
            className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-wider bg-slate-100 hover:bg-white text-slate-950 px-4 py-2 rounded-lg shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>COMMAND CENTER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </header>
  );
}
