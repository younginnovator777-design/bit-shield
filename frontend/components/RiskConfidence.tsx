import { AlertTriangle, ShieldCheck, Search, Activity } from "lucide-react";

export default function RiskConfidence({ risk, confidence, priority }: { risk: number, confidence: number, priority: string }) {
  const getTheme = () => {
    if (priority === "Priority Lead") return "border-rose-500 bg-rose-950/30 text-rose-400";
    if (priority === "Investigate Further") return "border-amber-500 bg-amber-950/30 text-amber-400";
    if (priority === "Low Concern") return "border-emerald-500 bg-emerald-950/30 text-emerald-400";
    return "border-slate-600 bg-slate-900/30 text-slate-400";
  };

  return (
    <div className={`p-4 rounded-xl border-l-4 backdrop-blur-md ${getTheme()}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold uppercase tracking-wider">{priority}</span>
        {priority === "Priority Lead" && <AlertTriangle className="w-4 h-4" />}
        {priority === "Investigate Further" && <Search className="w-4 h-4" />}
        {priority === "Low Concern" && <ShieldCheck className="w-4 h-4" />}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">Risk (Anomaly)</div>
          <div className="text-2xl font-black">{risk}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">Confidence (Support)</div>
          <div className="text-2xl font-black">{confidence}%</div>
        </div>
      </div>
    </div>
  );
}
