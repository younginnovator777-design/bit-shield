"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, AlertTriangle, ArrowUpRight, Cpu, Activity, ChevronRight } from "lucide-react";

export default function MissionControl() {
  const [overview, setOverview] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/overview").then(res => res.json()).then(setOverview);
    fetch("http://127.0.0.1:8000/api/alerts").then(res => res.json()).then(setAlerts);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      {/* Top Navbar */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center space-x-3">
          <Shield className="w-7 h-7 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-wider">MISSION CONTROL</h1>
        </div>
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">← Back to Briefing</Link>
      </div>

      {/* KPI Row */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Transactions Captured</span>
            <div className="text-3xl font-extrabold text-slate-100 mt-2">{overview.transactions_processed}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Leads Surfaced</span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-2">{overview.total_leads}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">High Priority Leads</span>
            <div className="text-3xl font-extrabold text-rose-500 mt-2">{overview.high_priority_leads}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Avg Evidence Quality</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">{overview.avg_confidence}%</div>
          </div>
        </div>
      )}

      {/* Ranked Alert Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Ranked Investigative Lead Queue</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Priority Classification</th>
                <th className="py-3 px-4">Primary Trigger</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {alerts.map((a: any) => (
                <tr key={a.txid} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-medium text-cyan-300">{a.txid}</td>
                  <td className="py-3 px-4 font-bold text-rose-400">{a.risk_score} / 100</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">{a.confidence_score}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      a.priority_band === "Priority Lead" ? "bg-rose-950 text-rose-400 border border-rose-800" :
                      a.priority_band === "Investigate Further" ? "bg-amber-950 text-amber-400 border border-amber-800" :
                      "bg-slate-800 text-slate-400"
                    }`}>
                      {a.priority_band}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 text-xs max-w-xs truncate">{a.shap_explanation}</td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/investigation/${a.txid}`} className="inline-flex items-center space-x-1 text-xs bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-cyan-900 px-3 py-1.5 rounded-lg transition font-semibold">
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
