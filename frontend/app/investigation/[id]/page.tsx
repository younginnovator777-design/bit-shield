"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, Network, Cpu, CheckCircle } from "lucide-react";
import { Network as VisNetwork } from "vis-network";

export default function InvestigationWorkspace() {
  const params = useParams();
  const txid = params?.id as string;
  const [alert, setAlert] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const graphContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!txid) return;
    fetch(`http://127.0.0.1:8000/api/alerts/${txid}`).then(res => res.json()).then(setAlert);
    fetch(`http://127.0.0.1:8000/api/graph/${txid}?hops=2`).then(res => res.json()).then(setGraphData);
  }, [txid]);

  useEffect(() => {
    if (graphData && graphContainer.current) {
      const nodes = graphData.nodes.map((n: any) => ({
        id: n.id,
        label: n.label,
        color: n.type === "transaction" ? "#f43f5e" : n.type === "ip" ? "#38bdf8" : "#a855f7",
        font: { color: "#f8fafc", size: 12 }
      }));
      const edges = graphData.edges.map((e: any) => ({
        from: e.source,
        to: e.target,
        label: e.relation,
        color: { color: "#475569" },
        font: { color: "#94a3b8", size: 10 }
      }));

      new VisNetwork(graphContainer.current, { nodes, edges }, {
        physics: { enabled: true },
        nodes: { shape: "dot", size: 16 }
      });
    }
  }, [graphData]);

  if (!alert) return <div className="min-h-screen bg-slate-950 text-slate-100 p-8">Loading Investigation Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <Link href="/command-center" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-mono text-cyan-400">LEAD #{alert.txid}</h1>
            <span className="text-xs text-slate-500">Localized 2-Hop Network Investigation</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="text-right">
            <div className="text-xs text-slate-500">RISK SCORE</div>
            <div className="text-xl font-extrabold text-rose-500">{alert.risk_score} / 100</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">CONFIDENCE</div>
            <div className="text-xl font-extrabold text-emerald-400">{alert.confidence_score}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Evidence Translation */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Behavioral Narrative</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              "{alert.shap_explanation}"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Technical Provenance</span>
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Top SHAP Feature</span>
                <span className="font-mono text-purple-300">{alert.top_feature}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Priority Band</span>
                <span className="font-semibold text-rose-400">{alert.priority_band}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Graph Semantics</span>
                <span className="text-slate-300">OBSERVED_WITH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Panel: Localized Interactive Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Network className="w-4 h-4 text-blue-400" />
              <span>Localized Network Graph (2-Hop Focus)</span>
            </h2>
            <div className="flex space-x-4 text-xs">
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span className="text-slate-400">Transaction</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span><span className="text-slate-400">IP Node</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span className="text-slate-400">Address</span></span>
            </div>
          </div>
          
          <div ref={graphContainer} className="w-full h-96 bg-slate-950 rounded-lg border border-slate-800/80"></div>
        </div>
      </div>
    </div>
  );
}
