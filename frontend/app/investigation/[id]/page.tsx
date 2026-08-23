"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Shield, Cpu, Info, ArrowLeft, GitCommit, AlertTriangle, Layers } from "lucide-react";
import { Network as VisNetwork } from "vis-network";

export default function InvestigationWorkspace() {
  const txid = useParams()?.id as string;
  const [alert, setAlert] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const graphContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!txid) return;
    fetch(`http://127.0.0.1:8000/api/alerts/${txid}`).then(res => res.json()).then(setAlert);
    fetch(`http://127.0.0.1:8000/api/graph/${txid}?hops=3`).then(res => res.json()).then(setGraphData);
  }, [txid]);

  useEffect(() => {
    if (graphData && graphContainer.current) {
      const nodes = graphData.nodes.map((n: any) => ({
        id: n.id,
        label: n.id.length > 14 ? n.id.substring(0, 12) + "..." : n.id,
        title: `Entity: ${n.id}\nType: ${n.type}`,
        shape: "dot",
        size: n.type === "transaction" ? 18 : 12,
        color: {
          background: n.type === "transaction" ? "#f43f5e" : n.type === "ip" ? "#0ea5e9" : "#8b5cf6",
          border: "#1e293b",
          hover: { background: "#ffffff" }
        },
        font: { color: "#cbd5e1", size: 10, face: "monospace" }
      }));

      const edges = graphData.edges.map((e: any) => ({
        from: e.source,
        to: e.target,
        label: e.relation,
        font: { align: "middle", size: 8, color: "#64748b" },
        color: { color: "rgba(148, 163, 184, 0.25)" },
        arrows: { to: { enabled: true, scaleFactor: 0.5 } }
      }));

      new VisNetwork(graphContainer.current, { nodes, edges }, {
        physics: { barnesHut: { gravitationalConstant: -3000, springLength: 120 } },
        interaction: { hover: true, tooltipDelay: 100 }
      });
    }
  }, [graphData]);

  if (!alert) return <div className="text-slate-400 font-mono text-xs p-8">Loading intelligence report...</div>;

  const isMuleChain = alert.txid.includes("mule") || alert.shap_explanation.includes("reuse");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
        <div className="flex items-center space-x-4">
          <Link href="/command-center" className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-100 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyan-500 font-mono tracking-widest uppercase">Lead Investigation</span>
              {isMuleChain && (
                <span className="text-[9px] font-bold font-mono bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <GitCommit className="w-3 h-3"/> MULE CHAIN DETECTED
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-white font-mono">{alert.txid}</h1>
          </div>
        </div>
        <div className="flex gap-4 font-mono">
          <div className="bg-slate-900/60 border border-slate-800 px-5 py-2.5 rounded-xl text-right">
            <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest font-sans">Anomaly Risk</div>
            <div className="text-xl font-black text-rose-500">{alert.risk_score} / 100</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 px-5 py-2.5 rounded-xl text-right">
            <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest font-sans">Confidence</div>
            <div className="text-xl font-black text-emerald-400">{alert.confidence_score}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: HUMAN INTELLIGENCE BRIEFING */}
        <div className="col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-mono">
              <Shield className="w-4 h-4 text-cyan-400" /> Human Assessment
            </h2>
            <div className="space-y-3">
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/60">
                <span className="font-bold text-cyan-400 block mb-1">What the Analyst Needs to Know:</span>
                "{alert.shap_explanation}"
              </div>
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/60 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex justify-between"><span>Classification:</span> <strong className="text-slate-200">{alert.priority_band}</strong></div>
                <div className="flex justify-between"><span>Graph Pattern:</span> <strong className="text-purple-300">{isMuleChain ? "Layered Mule Chain" : "Rapid Dispersal"}</strong></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-mono">
              <Cpu className="w-4 h-4 text-purple-400" /> Technical Provenance
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-500">Driving Feature</span>
                <span className="font-mono text-purple-300 font-semibold">{alert.top_feature}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-500">Semantics</span>
                <span className="font-mono text-slate-300">OBSERVED_WITH</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GRAPH CANVAS WITH HOVER DETAILS */}
        <div className="col-span-3 bg-slate-950 border border-slate-800/80 rounded-2xl h-[540px] flex flex-col relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg flex gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
             <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Transaction</span>
             <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500"></span> IP Endpoint</span>
             <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Wallet / Entity</span>
          </div>

          <div ref={graphContainer} className="flex-1 w-full h-full"></div>

          <div className="absolute bottom-3 left-4 text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
            <Info className="w-3 h-3" /> Hover over nodes to inspect wallet addresses & IP parameters.
          </div>
        </div>

      </div>
    </div>
  );
}
