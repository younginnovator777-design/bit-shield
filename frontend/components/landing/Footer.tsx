"use client";

import Link from "next/link";
import { Shield, ArrowUpRight, Lock, HardDrive, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)] bg-[var(--bg-surface)] pt-16 pb-12 transition-colors duration-300 font-mono text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] shadow-xs">
                <Shield className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-surface)]" />
              </div>
              <span className="text-base font-black tracking-widest text-slate-900 dark:text-white uppercase">BIT-SHIELD</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-sm">
              AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic — correlating P2P network telemetry with on-chain blockchain records for air-gapped forensic workstations.
            </p>

            <div className="flex items-center space-x-2 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 dark:border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit font-bold">
              <Lock className="w-3 h-3" />
              <span>AIR-GAPPED WORKSTATION RUNTIME</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
              PRODUCT
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/threat-intelligence" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Threat Intelligence
                </Link>
              </li>
              <li>
                <Link href="/investigations" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Investigations Workflow
                </Link>
              </li>
              <li>
                <Link href="/risk-matrix" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Risk × Confidence Matrix
                </Link>
              </li>
              <li>
                <Link href="/command-center" className="hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-slate-900 dark:text-slate-200">
                  Command Center →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
              PLATFORM
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/capabilities" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Capabilities Grid
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link href="/leads" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Leads Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Workstation */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">
              WORKSTATION
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ingestion" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Ingestion Portal
                </Link>
              </li>
              <li>
                <Link href="/case-binder" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Case Binder
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600">
                  FIU-India / PMLA Dossier
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} BIT-SHIELD • Bitcoin Traffic Intelligence Workstation
          </div>
          <div className="flex items-center space-x-4">
            <span>OFFLINE LOCAL INFERENCE ONLY</span>
            <span>•</span>
            <span>NO CLOUD TELEMETRY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
