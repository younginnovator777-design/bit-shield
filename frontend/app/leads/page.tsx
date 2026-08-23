"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ChevronRight, Zap } from "lucide-react";

export default function LeadsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/alerts").then(res => res.json()).then(setAlerts);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-slate-800/80 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Activity className="text-cyan-400 w-7 h-7" /> Leads Explorer
        </h1>
        <p className="text-slate-400 text-xs mt-1">Prioritized network anomalies awaiting analyst review.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.map((a: any) => (
          <div key={a.txid} className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:bg-slate-800/50 hover:border-cyan-800/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">{a.txid}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                  a.priority_band === "Priority Lead" ? 'bg-rose-950/60 text-rose-400 border-rose-800/80' : 'bg-amber-950/60 text-amber-400 border-amber-800/80'
                }`}>
                  {a.priority_band}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5 border-b border-slate-800/60 pb-4 font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1 font-sans"><Zap className="w-3 h-3 text-rose-400"/> Risk</div>
                  <div className="text-2xl font-black text-white">{a.risk_score}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-sans">Confidence</div>
                  <div className="text-2xl font-black text-cyan-400">{a.confidence_score}%</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">{a.shap_explanation}</p>
            </div>

            <Link href={`/investigation/${a.txid}`} className="w-full flex items-center justify-center space-x-2 bg-slate-950 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-800 text-slate-300 hover:text-cyan-400 text-xs font-bold py-3 rounded-xl transition duration-200">
              <span>OPEN INVESTIGATION</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
