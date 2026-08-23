"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Clock, Network, Cpu, Compass, Shield, AlertTriangle,
  GitCommit, ChevronRight, Info, HelpCircle, Download,
} from "lucide-react";
import { MOCK_LEADS, type Lead } from "@/components/workspace/MockData";
import { RiskBadge, ShapBar, GlassCard, SectionHeader, Tooltip } from "@/components/workspace/ui";

// ── Timeline Visualizer ─────────────────────────────────────────────────
function TimelineView({ events }: { events: Lead["timeline_events"] }) {
  const maxBtc = Math.max(...events.map(e => e.amount_btc ?? 0));
  return (
    <div className="space-y-3">
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
        BURST TIMELINE — offsets in milliseconds
      </div>
      {events.map((ev, i) => {
        const barPct = maxBtc > 0 ? ((ev.amount_btc ?? 0) / maxBtc) * 100 : 0;
        const typeColor = ev.type === "input" ? "text-slate-300" : ev.type === "hop" ? "text-amber-400" : "text-red-400";
        const barColor  = ev.type === "input" ? "bg-slate-600" : ev.type === "hop" ? "bg-amber-600" : "bg-red-700";
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 w-16 text-right shrink-0">
              +{ev.offset_ms}ms
            </span>
            <div className="w-2 h-2 rounded-full bg-slate-700 border border-slate-600 shrink-0" />
            <div className="flex-1 space-y-0.5">
              <div className={`text-[11px] font-mono ${typeColor}`}>{ev.label}</div>
              {ev.amount_btc !== undefined && (
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden w-full">
                  <div className={`h-full rounded-full ${barColor} transition-all duration-700`}
                    style={{ width: `${barPct}%` }} />
                </div>
              )}
            </div>
            {ev.amount_btc !== undefined && (
              <span className="text-[10px] font-mono text-slate-400 shrink-0 w-18 text-right">
                {ev.amount_btc} BTC
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Neighborhood mini-graph (SVG-based) ────────────────────────────────
function NeighborhoodMap({ nodes, edges }: {
  nodes: Lead["neighborhood_nodes"];
  edges: Lead["neighborhood_edges"];
}) {
  const W = 440; const H = 280; const CX = W/2; const CY = H/2;
  const angles = nodes.map((_, i) => (2 * Math.PI * i) / nodes.length);
  const R = 110;
  const positions = nodes.map((_, i) => ({
    x: CX + R * Math.cos(angles[i] - Math.PI/2),
    y: CY + R * Math.sin(angles[i] - Math.PI/2),
  }));

  const nodeColor: Record<string, string> = {
    wallet:   "#dc2626",
    tx:       "#f59e0b",
    ip:       "#6366f1",
    asn:      "#8b5cf6",
    exchange: "#10b981",
    mixer:    "#ec4899",
  };

  const findIdx = (id: string) => nodes.findIndex(n => n.id === id);

  return (
    <svg width={W} height={H} className="overflow-visible w-full" viewBox={`0 0 ${W} ${H}`}>
      {/* Edges */}
      {edges.map((e, i) => {
        const fi = findIdx(e.from); const ti = findIdx(e.to);
        if (fi < 0 || ti < 0) return null;
        const fp = positions[fi]; const tp = positions[ti];
        return (
          <line key={i} x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
            stroke={e.anomalous ? "rgba(220,38,38,0.6)" : "rgba(148,163,184,0.2)"}
            strokeWidth={e.anomalous ? e.weight * 0.6 : e.weight * 0.3}
            strokeDasharray={e.anomalous ? "4,4" : undefined}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const p = positions[i];
        const col = nodeColor[node.type] ?? "#64748b";
        const r = node.type === "tx" ? 10 : node.type === "mixer" ? 9 : 7;
        return (
          <g key={node.id}>
            <circle cx={p.x} cy={p.y} r={r} fill={col} opacity={0.85}
              stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
            <text x={p.x} y={p.y + r + 10} textAnchor="middle"
              fontSize="7.5" fill="#94a3b8" fontFamily="monospace">
              {node.id.length > 14 ? node.id.slice(0, 12) + "…" : node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Main Investigation page ─────────────────────────────────────────────
export default function InvestigationWorkspace() {
  const txid  = useParams()?.id as string;
  const [lead, setLead] = useState<Lead | null>(null);
  const [tab,  setTab]  = useState<0|1|2|3>(0);
  const [graphData, setGraphData] = useState<any>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!txid) return;
    const mock = MOCK_LEADS.find(l => l.txid === txid) ?? MOCK_LEADS[0];
    fetch(`http://127.0.0.1:8000/api/alerts/${txid}`)
      .then(r => r.json())
      .then(d => setLead({ ...mock, ...d }))
      .catch(() => setLead(mock));

    fetch(`http://127.0.0.1:8000/api/graph/${txid}?hops=3`)
      .then(r => r.json()).then(setGraphData).catch(() => setGraphData(null));
  }, [txid]);

  // vis-network initialisation for graph from API (when available)
  useEffect(() => {
    if (!graphData || !graphRef.current) return;
    import("vis-network").then(({ Network: VisNetwork }) => {
      const nodes = graphData.nodes.map((n: any) => ({
        id: n.id, label: n.id.slice(0, 12) + "…",
        title: `${n.id}\nType: ${n.type}`,
        shape: "dot", size: n.type === "transaction" ? 16 : 10,
        color: {
          background: n.type === "transaction" ? "#dc2626" : n.type === "ip" ? "#6366f1" : "#f59e0b",
          border: "#1e293b", hover: { background: "#f1f5f9" },
        },
        font: { color: "#94a3b8", size: 9, face: "monospace" },
      }));
      const edges = graphData.edges.map((e: any) => ({
        from: e.source, to: e.target, label: e.relation,
        font: { align: "middle", size: 7, color: "#475569" },
        color: { color: "rgba(148,163,184,0.2)" },
        arrows: { to: { enabled: true, scaleFactor: 0.4 } },
      }));
      new VisNetwork(graphRef.current!, { nodes, edges }, {
        physics: { barnesHut: { gravitationalConstant: -3200, springLength: 100 } },
        interaction: { hover: true, tooltipDelay: 80 },
      });
    });
  }, [graphData]);

  // Keyboard shortcuts
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTab(0);
      if (e.key === "1") setTab(0);
      if (e.key === "2") setTab(1);
      if (e.key === "3") setTab(2);
      if (e.key === "4") setTab(3);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 font-mono text-xs animate-pulse">LOADING INTELLIGENCE BRIEF…</div>
      </div>
    );
  }

  const tabs = [
    { label: "01 · WHAT HAPPENED?",         icon: Clock    },
    { label: "02 · WHERE DID IT CONNECT?",  icon: Network  },
    { label: "03 · WHY WAS IT FLAGGED?",    icon: Cpu      },
    { label: "04 · WHAT SHOULD HAPPEN?",    icon: Compass  },
  ];

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/leads"
            className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white transition shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">LEAD INVESTIGATION</span>
              <RiskBadge band={lead.priority_band} />
            </div>
            <h1 className="text-xl font-black text-white font-mono">{lead.txid}</h1>
          </div>
        </div>

        <div className="flex gap-3 font-mono shrink-0">
          <div className="ws-card px-4 py-2.5 text-right">
            <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">ANOMALY RISK</div>
            <div className={`text-2xl font-black ${lead.risk_score >= 80 ? "text-red-400" : "text-amber-400"}`}>
              {lead.risk_score}
            </div>
          </div>
          <div className="ws-card px-4 py-2.5 text-right">
            <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">CONFIDENCE</div>
            <div className="text-2xl font-black text-emerald-400">{lead.confidence_score}%</div>
          </div>
        </div>
      </div>

      {/* ── 4-Question Tab Bar ──────────────────────────────────── */}
      <div className="ws-card p-1 flex gap-1">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i as 0|1|2|3)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
              tab === i
                ? "bg-white/[0.1] text-white border border-white/[0.1]"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
            }`}>
            <t.icon className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="inline sm:hidden">0{i+1}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ─────────────────────────────────────────── */}
      <div className="animate-fade-in-up">

        {/* TAB 0: WHAT HAPPENED? */}
        {tab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="ws-card p-5">
              <SectionHeader icon={Clock} title="Temporal Burst Signature"
                subtitle="Transaction velocity and inter-event timing" />
              <TimelineView events={lead.timeline_events} />
            </div>
            <div className="ws-card p-5">
              <SectionHeader icon={AlertTriangle} title="Burst Summary"
                subtitle="Statistical context" />
              <div className="space-y-4 text-xs font-mono">
                <InfoRow label="Total Value"        value={`${lead.amount_btc} BTC`} />
                <InfoRow label="Output Count"       value={`${lead.output_count} addresses`} />
                <InfoRow label="Fan-Out Ratio"      value={`${lead.fan_out_ratio}×`}
                  accent={lead.fan_out_ratio >= 8 ? "text-red-400" : undefined} />
                <InfoRow label="Velocity Percentile" value={`${lead.velocity_percentile}th`}
                  accent={lead.velocity_percentile >= 95 ? "text-red-400" : "text-amber-400"} />
                <InfoRow label="Timestamp"          value={new Date(lead.timestamp).toUTCString()} />
                <InfoRow label="ASN"               value={lead.asn} />
              </div>
              <div className="mt-5 p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-[11px] font-sans text-red-300 leading-relaxed">
                <strong className="font-mono">Assessment:</strong> {lead.shap_explanation}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: WHERE DID IT CONNECT? */}
        {tab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 ws-card p-5">
              <SectionHeader icon={Network} title="Neighborhood Graph"
                subtitle="2-hop entity topology · click to expand" />
              <div className="w-full flex justify-center overflow-hidden">
                {graphData ? (
                  <div ref={graphRef} className="w-full h-64" />
                ) : (
                  <NeighborhoodMap nodes={lead.neighborhood_nodes} edges={lead.neighborhood_edges} />
                )}
              </div>
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 text-[9px] font-mono text-slate-500">
                {[["bg-red-600","Wallet"],["bg-amber-500","TX"],["bg-indigo-500","IP"],["bg-purple-500","ASN"],["bg-emerald-600","Exchange"],["bg-pink-500","Mixer"]].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1"><span className={`w-2 h-2 rounded-full ${c}`}/>{l}</span>
                ))}
              </div>
            </div>
            <div className="ws-card p-5">
              <SectionHeader icon={Info} title="Entity Index" />
              <div className="space-y-2">
                {lead.neighborhood_nodes.map(n => (
                  <div key={n.id} className="flex items-center justify-between p-2 bg-slate-950/60 rounded-lg border border-slate-800/60 text-[10px] font-mono">
                    <div>
                      <div className="text-slate-200">{n.id}</div>
                      <div className="text-slate-600 uppercase">{n.type}</div>
                    </div>
                    {n.risk !== undefined && (
                      <span className={`font-bold ${n.risk >= 70 ? "text-red-400" : n.risk >= 40 ? "text-amber-400" : "text-slate-400"}`}>
                        {n.risk}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHY WAS IT FLAGGED? */}
        {tab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="ws-card p-5">
              <SectionHeader icon={Cpu} title="SHAP Feature Attribution"
                subtitle="Mathematical contribution per feature to anomaly score" />
              <ShapBar values={lead.shap_values} />
              <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
                <div><span className="text-red-400">Positive contribution (+)</span> = pushes score toward anomaly</div>
                <div><span className="text-emerald-400">Negative contribution (−)</span> = pushes score toward baseline</div>
              </div>
            </div>
            <div className="ws-card p-5">
              <SectionHeader icon={AlertTriangle} title="Driving Feature Deep-Dive" />
              <div className="space-y-3">
                <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl">
                  <div className="text-[9px] font-mono text-red-400 uppercase mb-1">PRIMARY TRIGGER</div>
                  <div className="text-sm font-bold text-white font-mono">{lead.top_feature}</div>
                </div>
                <div className="space-y-2 text-[11px] font-mono text-slate-300">
                  <InfoRow label="Anomaly Score" value={`${lead.risk_score} / 100`}
                    accent={lead.risk_score >= 80 ? "text-red-400" : "text-amber-400"} />
                  <InfoRow label="Evidence Confidence" value={`${lead.confidence_score}%`} />
                  <InfoRow label="Graph Centrality" value={lead.graph_centrality.toFixed(2)} />
                  <InfoRow label="Velocity Percentile" value={`${lead.velocity_percentile}th`} />
                </div>
                <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-[11px] text-slate-300 leading-relaxed font-sans">
                  {lead.shap_explanation}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WHAT SHOULD HAPPEN? */}
        {tab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="ws-card p-5">
              <SectionHeader icon={Compass} title="Mandated Investigative Actions"
                subtitle="Human-in-the-loop triage protocol" />
              <div className="space-y-2.5">
                {lead.investigator_actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5 w-5">{String(i+1).padStart(2,"0")}</span>
                    <span className="text-[12px] text-slate-200 font-sans leading-snug">{action}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ws-card p-5">
              <SectionHeader icon={Shield} title="Intelligence Doctrine" />
              <div className="space-y-4">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-[11px] text-slate-300 leading-relaxed font-sans">
                  BIT-SHIELD provides investigative leads — it does <strong className="text-white">not</strong> establish criminal intent, legal ownership, real-world identity, or guilt. All SHAP attributions are evidence of behavioral correlation, not proof of ownership.
                </div>
                <div className="flex gap-2">
                  <Link href="/case-binder"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 border border-white/[0.12] text-[10px] font-mono font-bold uppercase py-2.5 rounded-xl transition-all">
                    Add to Case Binder <ChevronRight className="w-3 h-3" />
                  </Link>
                  <button className="flex-1 flex items-center justify-center gap-1.5 border border-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono font-bold uppercase py-2.5 rounded-xl transition-all">
                    <Download className="w-3 h-3" /> Export Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/40">
      <span className="text-slate-500">{label}</span>
      <span className={accent ?? "text-slate-200"}>{value}</span>
    </div>
  );
}
