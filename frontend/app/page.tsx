"use client";

import Link from "next/link";
import {
  Shield, ArrowRight, ChevronRight, AlertOctagon, TrendingUp, Landmark,
  Globe, Cpu, Network, Clock, SlidersHorizontal, Compass, HardDrive, CheckCircle2,
  Zap, FileText, Layers, Activity
} from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import LivePipelineStrip from "@/components/landing/LivePipelineStrip";

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-16 animate-fade-in-up">
      
      {/* ── 1. Hero Section ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Live Pipeline Strip ─────────────────────────────────────── */}
      <LivePipelineStrip />

      {/* ── 2. The Problem Statement ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>THE CORE CHALLENGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl">
            Bitcoin transactions are public by design. <br />
            <span className="text-slate-500 dark:text-slate-400">Criminal intent is intentionally obscured.</span>
          </h2>

          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
            A single transfer may look ordinary. Hundreds of transfers connected through wallets, endpoints, timing, and transaction structure can reveal an entirely different pattern. Finding illicit activity is no longer a bulk filtering exercise — it is a signal-to-noise challenge of isolating needles from millions of baseline transactions.
          </p>

          <div className="pt-2 flex items-center space-x-2 text-xs font-mono font-bold text-slate-900 dark:text-white">
            <Link href="/threat-intelligence" className="inline-flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-rose-400 transition-colors">
              <span>EXPLORE THREAT INTELLIGENCE METHODOLOGY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Threat Intelligence Preview ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">PREVIEW</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                Threat Intelligence & Baseline Metrics
              </h2>
            </div>
            <Link href="/threat-intelligence" className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
              <span>Threat Intelligence Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-2">
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase">GLOBAL ILLICIT FLOW</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">$154B+</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Cryptocurrency received by illicit addresses in 2025 according to Chainalysis data baseline.</p>
            </div>

            <div className="p-6 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-2">
              <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">SIGNAL-TO-NOISE RATIO</div>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">&lt; 1%</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Illicit activity is sparse (&lt;1%). Isolation Forest unsupervised AI isolates these vectors.</p>
            </div>

            <div className="p-6 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-2">
              <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase">ENFORCEMENT CASEFILE</div>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">₹640 Cr</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Enforcement Directorate (India) investigated ₹640 crore proceeds layered via 5,000+ mule accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Investigations Workflow Preview ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">WORKFLOW</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                Investigative Methodology & Tracing
              </h2>
            </div>
            <Link href="/investigations" className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
              <span>Investigations Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            {[
              { step: "01", title: "Ingestion", desc: "Parse raw transaction PCAP & CSV logs into Apache Arrow" },
              { step: "02", title: "Detection", desc: "Unsupervised Isolation Forest algorithm scores anomaly vectors" },
              { step: "03", title: "Relational Graph", desc: "Construct 3-hop multi-layer graph connecting addresses & ASNs" },
              { step: "04", title: "Dossier Export", desc: "Export court-admissible JSON/PDF report with SHAP explainability" },
            ].map((st) => (
              <div key={st.step} className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-2">
                <div className="text-[10px] text-indigo-600 dark:text-rose-400 font-bold">STEP {st.step}</div>
                <div className="font-bold text-slate-900 dark:text-white">{st.title}</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Risk Matrix Preview ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">TRIAGE</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                Risk Score × Evidence Density Matrix
              </h2>
            </div>
            <Link href="/risk-matrix" className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
              <span>Risk Matrix Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-rose-300 dark:border-rose-900/40">
              <div className="text-rose-600 dark:text-rose-400 font-bold text-[10px]">QUADRANT I</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">Priority Lead</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">High Risk • High Conf</div>
            </div>

            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-amber-300 dark:border-amber-900/40">
              <div className="text-amber-600 dark:text-amber-400 font-bold text-[10px]">QUADRANT II</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">Investigate Further</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">High Risk • Low Conf</div>
            </div>

            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-slate-300 dark:border-slate-800">
              <div className="text-slate-500 dark:text-slate-400 font-bold text-[10px]">QUADRANT III</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">Insufficient Evidence</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Low Risk • Low Conf</div>
            </div>

            <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-emerald-300 dark:border-emerald-900/40">
              <div className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">QUADRANT IV</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">Low Concern</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Low Risk • High Conf</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Featured Capabilities Preview ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">CAPABILITIES</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                System Core Capabilities
              </h2>
            </div>
            <Link href="/capabilities" className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
              <span>Capabilities Grid</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Cpu, name: "Unsupervised AI", desc: "100 decision trees isolating anomalous transaction vectors." },
              { icon: Network, name: "Multi-Layer Graph", desc: "Connects wallets, IP endpoints, and ASNs into unified topology." },
              { icon: Activity, name: "SHAP Explainer", desc: "Calculates mathematical feature contributions per lead." },
              { icon: HardDrive, name: "100% Offline Runtime", desc: "Air-gapped execution with zero cloud telemetry." },
            ].map((cap) => (
              <div key={cap.name} className="p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] space-y-2">
                <cap.icon className="w-5 h-5 text-indigo-600 dark:text-rose-400" />
                <div className="font-bold text-slate-900 dark:text-white font-mono text-sm">{cap.name}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Architecture Preview ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ws-card p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">ARCHITECTURE</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                100% Air-Gapped Local Pipeline
              </h2>
            </div>
            <Link href="/architecture" className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
              <span>Architecture Specs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Self-Contained Local Execution</div>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-xs">
                Zero external socket requests. Pre-compiled model weights and in-memory Apache Arrow parser execute entirely on your workstation.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>AIR-GAPPED COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Final Call to Action ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl space-y-6 flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
            Ready to explore live threat intelligence?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-xl font-sans">
            Access the operational Command Center to triage leads, inspect force-directed entity graphs, and build court-admissible dossiers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono pt-2">
            <Link
              href="/command-center"
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition"
            >
              <span>LAUNCH COMMAND CENTER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
