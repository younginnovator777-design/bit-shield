"use client";

import Link from "next/link";
import { Shield, Lock, Terminal, ArrowRight, Activity } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900/90 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.04)]">
            <Shield className="w-4.5 h-4.5 text-slate-100" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-[#07090e]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black tracking-widest text-white uppercase">BIT-SHIELD</span>
              <span className="text-[9px] font-mono tracking-widest bg-white/[0.06] text-slate-300 border border-white/10 px-2 py-0.5 rounded-md font-semibold">
                TRAFFIC INTEL
              </span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 tracking-wider hidden sm:block">
              OFFLINE BITCOIN TRAFFIC INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Professional Navigation Anchors */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-wider text-slate-400">
          <a href="#threat" className="hover:text-white transition-colors duration-200">Threat Intelligence</a>
          <a href="#insights" className="hover:text-white transition-colors duration-200">Multi-Layer Graph</a>
          <a href="#capabilities" className="hover:text-white transition-colors duration-200">Capabilities</a>
          <a href="#matrix" className="hover:text-white transition-colors duration-200">Risk Matrix</a>
          <a href="#architecture" className="hover:text-white transition-colors duration-200">Architecture</a>
        </nav>

        {/* Enter Button */}
        <div className="flex items-center space-x-3">
          <Link
            href="/command-center"
            className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-wider bg-white hover:bg-slate-100 text-slate-950 px-4 py-2 rounded-lg shadow-[0_0_25px_rgba(255,255,255,0.18)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>COMMAND CENTER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </header>
  );
}
