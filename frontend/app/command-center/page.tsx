"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronRight, Activity, Shield, Cpu } from "lucide-react";

export default function MissionControl() {
  const [overview, setOverview] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/overview").then(res => res.json()).then(setOverview);
    fetch("http://127.0.0.1:8000/api/alerts").then(res => res.json()).then(setAlerts);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Activity className="text-cyan-400 w-7 h-7" /> MISSION CONTROL
          </h1>
          <p className="text-slate-400 text-xs mt-1">Real-time operational summary and investigative lead triage.</p>
        </div>
        <Link href="/" className="text-xs text-slate-400 hover:text-cyan-400 font-mono transition">← Briefing Landing</Link>
      </div>

      {/* KPI Cards */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Transactions Captured</span>
            <div className="text-3xl font-black text-slate-100 mt-2 font-mono">{overview.transactions_processed}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Leads Surfaced</span>
            <div className="text-3xl font-black text-cyan-400 mt-2 font-mono">{overview.total_leads}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">High Priority Leads</span>
            <div className="text-3xl font-black text-rose-500 mt-2 font-mono">{overview.high_priority_leads}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Avg Evidence Quality</span>
            <div className="text-3xl font-black text-emerald-400 mt-2 font-mono">{overview.avg_confidence}%</div>
          </div>
        </div>
      )}

      {/* Ranked Queue Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-base font-bold text-slate-200 mb-5 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Ranked Investigative Lead Queue</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Priority Band</th>
                <th className="py-3 px-4">Primary Trigger</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {alerts.map((a: any) => (
                <tr key={a.txid} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-cyan-300">{a.txid}</td>
                  <td className="py-3.5 px-4 font-bold text-rose-400 font-mono">{a.risk_score} / 100</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">{a.confidence_score}%</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                      a.priority_band === "Priority Lead" ? "bg-rose-950/60 text-rose-400 border-rose-800/80" :
                      a.priority_band === "Investigate Further" ? "bg-amber-950/60 text-amber-400 border-amber-800/80" :
                      "bg-slate-800/80 text-slate-400 border-slate-700/80"
                    }`}>
                      {a.priority_band}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">{a.shap_explanation}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/investigation/${a.txid}`} className="inline-flex items-center space-x-1 text-xs bg-cyan-950/80 text-cyan-400 border border-cyan-800/80 hover:bg-cyan-900 px-3 py-1.5 rounded-lg transition font-semibold">
                      <span>Investigate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
