"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldAlert, Cpu, HardDrive, Terminal, Layers } from "lucide-react";
import NetworkBackground from "./NetworkBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden">
      {/* Background Interactive Network Simulation */}
      <NetworkBackground />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* National Intelligence Badges */}
        <div className="inline-flex items-center space-x-2.5 bg-slate-900/90 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 mb-8 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-slate-400">NTRO PS 26146</span>
          <span className="text-slate-600">•</span>
          <span className="font-semibold text-slate-200">BITCOIN TRANSACTION FORENSICS</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-bold">100% OFFLINE</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08] max-w-5xl">
          Money moves in seconds.
          <br />
          <span className="text-slate-300">
            Intelligence shouldn't lag behind.
          </span>
        </h1>

        {/* Platform Identity Title */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-mono tracking-widest text-slate-400 uppercase font-bold">
            BIT-SHIELD
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-400 tracking-wider">
            OFFLINE TRANSACTION INTELLIGENCE PLATFORM
          </span>
        </div>

        {/* Secondary Subtitle Statement */}
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mb-4 leading-relaxed font-normal">
          Offline AI-powered transaction intelligence for tracing anomalous Bitcoin activity across network and blockchain evidence.
        </p>

        {/* Supporting statement */}
        <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
          Turn fragmented transaction traffic into explainable investigative leads — without relying on cloud infrastructure or black-box decisions.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <Link
            href="/command-center"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm font-mono tracking-wide shadow-[0_0_35px_rgba(255,255,255,0.18)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ENTER INVESTIGATION</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>

          <a
            href="#threat"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80 px-7 py-4 rounded-xl text-sm font-mono tracking-wide backdrop-blur-md transition-all"
          >
            <span>HOW IT WORKS</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Live System Operational Specs Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl text-left font-mono">
          <div className="bg-slate-900/50 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-md">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <HardDrive className="w-3 h-3 text-slate-400" />
              <span>Data Ingestion</span>
            </div>
            <div className="text-xs font-bold text-slate-200">Local PCAP / CSV / JSON</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-md">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Cpu className="w-3 h-3 text-slate-400" />
              <span>Anomaly Engine</span>
            </div>
            <div className="text-xs font-bold text-slate-200">Isolation Forest (Local)</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-md">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Layers className="w-3 h-3 text-slate-400" />
              <span>Graph Clustering</span>
            </div>
            <div className="text-xs font-bold text-slate-200">CIOH Multi-Input Heuristics</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-md">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>Runtime Mode</span>
            </div>
            <div className="text-xs font-bold text-emerald-400">Zero Cloud Dependencies</div>
          </div>
        </div>

      </div>
    </section>
  );
}
