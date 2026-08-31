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
import { useTheme } from "@/components/ThemeProvider";

// ── Timeline Visualizer ─────────────────────────────────────────────────
function TimelineView({ events }: { events: Lead["timeline_events"] }) {
  const safeEvents = events || [];
  const maxBtc = safeEvents.length > 0 ? Math.max(...safeEvents.map(e => e.amount_btc ?? 0)) : 0;
  return (
    <div className="space-y-3">
      <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
        BURST TIMELINE — offsets in milliseconds
      </div>
      {safeEvents.map((ev, i) => {
        const barPct = maxBtc > 0 ? ((ev.amount_btc ?? 0) / maxBtc) * 100 : 0;
        const typeColor = ev.type === "input" ? "text-slate-700 dark:text-slate-300" : ev.type === "hop" ? "text-amber-600 dark:text-amber-400 font-bold" : "text-red-600 dark:text-red-400 font-bold";
        const barColor  = ev.type === "input" ? "bg-slate-500 dark:bg-slate-600" : ev.type === "hop" ? "bg-amber-500 dark:bg-amber-600" : "bg-red-600 dark:bg-red-700";
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-16 text-right shrink-0">
              +{ev.offset_ms}ms
            </span>
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 border border-slate-500 shrink-0" />
            <div className="flex-1 space-y-0.5">
              <div className={`text-[11px] font-mono ${typeColor}`}>{ev.label}</div>
              {ev.amount_btc !== undefined && (
                <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden w-full">
                  <div className={`h-full rounded-full ${barColor} transition-all duration-700`}
                    style={{ width: `${barPct}%` }} />
                </div>
              )}
            </div>
            {ev.amount_btc !== undefined && (
              <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 shrink-0 w-18 text-right font-semibold">
                {ev.amount_btc} BTC
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}


// ── Smart Multi-Layer Force-Directed Graph ──────────────────────────────
function SmartNeighborhoodGraph({
  lead,
  graphData,
  onSelectNode,
  selectedNode,
}: {
  lead: Lead;
  graphData: any;
  onSelectNode: (node: any | null) => void;
  selectedNode: any | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<any>(null);
  const [physicsActive, setPhysicsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    import("vis-network/standalone").then(({ Network }) => {
      if (!isMounted || !containerRef.current) return;

      let rawNodes: any[] = [];
      let rawEdges: any[] = [];

      if (graphData && graphData.nodes && graphData.nodes.length > 0) {
        rawNodes = graphData.nodes;
        rawEdges = graphData.edges || [];
      } else {
        const mainTx = {
          id: lead.txid,
          label: `TX: ${lead.txid.slice(0, 8)}…`,
          fullId: lead.txid,
          type: "transaction",
          risk: lead.risk_score,
          meta: `Value: ${lead.amount_btc} BTC · Fan-out: ${lead.fan_out_ratio}×`,
        };

        const ipNode = {
          id: lead.ip || "203.0.113.88",
          label: `IP: ${lead.ip || "203.0.113.88"}`,
          fullId: lead.ip || "203.0.113.88",
          type: "ip",
          risk: 78,
          meta: "Broadcasting Relay Node",
        };

        const asnClean = lead.asn ? lead.asn.split(" ")[0] : "AS45102";
        const asnNode = {
          id: asnClean,
          label: `ASN: ${asnClean}`,
          fullId: lead.asn || "AS45102 (Bulletproof)",
          type: "asn",
          risk: 82,
          meta: "Autonomous System Routing",
        };

        const portNode = {
          id: `${lead.ip || "203.0.113.88"}:8333`,
          label: "PORT: 8333",
          fullId: `${lead.ip || "203.0.113.88"}:8333 (Bitcoin P2P)`,
          type: "port",
          risk: 45,
          meta: "P2P Propagation Port",
        };

        const extraNodes = (lead.neighborhood_nodes || []).map((n) => ({
          id: n.id,
          label: n.type === "wallet" ? `WALLET: ${n.id.slice(0, 8)}…` : `${n.type.toUpperCase()}: ${n.id}`,
          fullId: n.id,
          type: n.type,
          risk: n.risk ?? (n.type === "wallet" ? 40 : 65),
          meta: `Entity: ${n.type.toUpperCase()}`,
        }));

        const nodeMap = new Map<string, any>();
        [mainTx, ipNode, asnNode, portNode, ...extraNodes].forEach((n) => {
          nodeMap.set(n.id, n);
        });
        rawNodes = Array.from(nodeMap.values());

        const edgeList: any[] = [
          { from: ipNode.id, to: mainTx.id, relation: "P2P_BROADCAST", anomalous: true },
          { from: ipNode.id, to: asnNode.id, relation: "ASN_ROUTING", anomalous: true },
          { from: ipNode.id, to: portNode.id, relation: "SOCKET_BIND", anomalous: false },
        ];

        (lead.neighborhood_edges || []).forEach((e) => {
          if (nodeMap.has(e.from) && nodeMap.has(e.to)) {
            edgeList.push({
              from: e.from,
              to: e.to,
              relation: e.anomalous ? "CORRELATED_FLOW" : "TRANSFER",
              anomalous: e.anomalous,
              weight: e.weight,
            });
          }
        });

        extraNodes.forEach((n) => {
          if (n.id !== mainTx.id) {
            const isInput = n.id.includes("7a") || n.id.includes("99") || n.id.includes("88");
            edgeList.push({
              from: isInput ? n.id : mainTx.id,
              to: isInput ? mainTx.id : n.id,
              relation: isInput ? "INPUT_SPEND" : "OUTPUT_DISPERSAL",
              anomalous: (n.risk || 0) > 70,
            });
          }
        });

        rawEdges = edgeList;
      }

      const getNodeConfig = (type: string, risk: number = 50) => {
        switch (type.toLowerCase()) {
          case "transaction":
          case "tx":
            return {
              color: {
                background: isDark ? "#3b1d04" : "#fef3c7",
                border: isDark ? "#f59e0b" : "#d97706",
                highlight: { background: isDark ? "#78350f" : "#fde68a", border: "#fbbf24" },
                hover: { background: isDark ? "#78350f" : "#fde68a", border: "#fbbf24" },
              },
              size: 22,
              font: { color: isDark ? "#fef3c7" : "#78350f", size: 10, face: "monospace", bold: "bold" },
            };
          case "ip":
          case "endpoint":
            return {
              color: {
                background: isDark ? "#1e1b4b" : "#e0e7ff",
                border: isDark ? "#6366f1" : "#4f46e5",
                highlight: { background: isDark ? "#312e81" : "#c7d2fe", border: "#818cf8" },
                hover: { background: isDark ? "#312e81" : "#c7d2fe", border: "#818cf8" },
              },
              size: 16,
              font: { color: isDark ? "#c7d2fe" : "#312e81", size: 9, face: "monospace" },
            };
          case "port":
            return {
              color: {
                background: isDark ? "#083344" : "#cffafe",
                border: isDark ? "#06b6d4" : "#0891b2",
                highlight: { background: isDark ? "#164e63" : "#a5f3fc", border: "#22d3ee" },
                hover: { background: isDark ? "#164e63" : "#a5f3fc", border: "#22d3ee" },
              },
              size: 13,
              font: { color: isDark ? "#cffafe" : "#164e63", size: 8, face: "monospace" },
            };
          case "asn":
            return {
              color: {
                background: isDark ? "#2e1065" : "#f3e8ff",
                border: isDark ? "#a855f7" : "#9333ea",
                highlight: { background: isDark ? "#581c87" : "#e9d5ff", border: "#c084fc" },
                hover: { background: isDark ? "#581c87" : "#e9d5ff", border: "#c084fc" },
              },
              size: 15,
              font: { color: isDark ? "#e9d5ff" : "#581c87", size: 9, face: "monospace" },
            };
          case "exchange":
            return {
              color: {
                background: isDark ? "#064e3b" : "#d1fae5",
                border: isDark ? "#10b981" : "#059669",
                highlight: { background: isDark ? "#065f46" : "#a7f3d0", border: "#34d399" },
                hover: { background: isDark ? "#065f46" : "#a7f3d0", border: "#34d399" },
              },
              size: 16,
              font: { color: isDark ? "#a7f3d0" : "#064e3b", size: 9, face: "monospace" },
            };
          case "mixer":
            return {
              color: {
                background: isDark ? "#500724" : "#fce7f3",
                border: isDark ? "#ec4899" : "#db2777",
                highlight: { background: isDark ? "#831843" : "#fbcfe8", border: "#f472b6" },
                hover: { background: isDark ? "#831843" : "#fbcfe8", border: "#f472b6" },
              },
              size: 18,
              font: { color: isDark ? "#fbcfe8" : "#831843", size: 9, face: "monospace" },
            };
          case "wallet":
          default:
            return {
              color: {
                background: risk >= 75 ? (isDark ? "#450a0a" : "#fee2e2") : (isDark ? "#1e293b" : "#f1f5f9"),
                border: risk >= 75 ? (isDark ? "#ef4444" : "#dc2626") : (isDark ? "#94a3b8" : "#64748b"),
                highlight: { background: risk >= 75 ? (isDark ? "#7f1d1d" : "#fca5a5") : (isDark ? "#334155" : "#e2e8f0"), border: "#000000" },
                hover: { background: risk >= 75 ? (isDark ? "#7f1d1d" : "#fca5a5") : (isDark ? "#334155" : "#e2e8f0"), border: "#000000" },
              },
              size: risk >= 75 ? 16 : 13,
              font: { color: risk >= 75 ? (isDark ? "#fca5a5" : "#991b1b") : (isDark ? "#f1f5f9" : "#0f172a"), size: 9, face: "monospace" },
            };
        }
      };

      const nodes = rawNodes.map((n) => {
        const conf = getNodeConfig(n.type, n.risk);
        return {
          id: n.id,
          label: n.label || n.id,
          title: `Entity: ${n.fullId || n.id}\nType: ${n.type.toUpperCase()}\nRisk Score: ${n.risk ?? 'N/A'}\n${n.meta || ''}`,
          shape: "dot",
          borderWidth: 2,
          borderWidthSelected: 3.5,
          shadow: {
            enabled: true,
            color: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.12)",
            size: 8,
            x: 0,
            y: 3,
          },
          ...conf,
        };
      });

      const edges = rawEdges.map((e, idx) => ({
        id: `e-${idx}`,
        from: e.from || e.source,
        to: e.to || e.target,
        label: e.relation || "",
        font: { align: "middle", size: 7.5, color: isDark ? "#94a3b8" : "#334155", face: "monospace", background: isDark ? "rgba(11,13,17,0.85)" : "rgba(255,255,255,0.95)" },
        color: {
          color: e.anomalous ? (isDark ? "rgba(239, 68, 68, 0.65)" : "rgba(220, 38, 38, 0.75)") : (isDark ? "rgba(148, 163, 184, 0.28)" : "rgba(100, 116, 139, 0.4)"),
          highlight: e.anomalous ? "#ef4444" : "#000000",
          hover: "#475569",
        },
        width: e.anomalous ? 2.2 : 1.2,
        dashes: e.anomalous ? [4, 4] : false,
        arrows: {
          to: { enabled: true, scaleFactor: 0.5 },
        },
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.15,
        },
      }));

      const options = {
        autoResize: true,
        height: "100%",
        width: "100%",
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -30000,
            centralGravity: 0.3,
            springLength: 130,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0.85,
          },
          stabilization: {
            enabled: true,
            iterations: 160,
            updateInterval: 25,
            fit: true,
          },
        },
        interaction: {
          hover: true,
          tooltipDelay: 60,
          hideEdgesOnDrag: false,
          zoomView: true,
          dragView: true,
        },
      };

      const network = new Network(containerRef.current, { nodes, edges }, options);
      networkRef.current = network;

      network.on("stabilizationIterationsDone", () => {
        if (isMounted) setLoading(false);
        network.fit({ animation: { duration: 400, easingFunction: "easeInOutQuad" } });
      });

      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const clickedId = params.nodes[0];
          const matched = rawNodes.find((n) => n.id === clickedId);
          onSelectNode(matched || { id: clickedId, type: "node" });
        } else {
          onSelectNode(null);
        }
      });

      setTimeout(() => {
        if (isMounted && network) {
          network.redraw();
          network.fit();
          setLoading(false);
        }
      }, 80);
    });

    return () => {
      isMounted = false;
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [lead, graphData, isDark]);

  const handleZoomIn = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 1.35, animation: { duration: 250 } });
    }
  };

  const handleZoomOut = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 0.75, animation: { duration: 250 } });
    }
  };

  const handleResetFit = () => {
    if (networkRef.current) {
      networkRef.current.fit({ animation: { duration: 400, easingFunction: "easeInOutQuad" } });
    }
  };

  const handleTogglePhysics = () => {
    if (networkRef.current) {
      const next = !physicsActive;
      networkRef.current.setOptions({ physics: { enabled: next } });
      setPhysicsActive(next);
    }
  };

  return (
    <div className="relative w-full h-[450px] min-h-[450px] bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-main)] overflow-hidden flex flex-col shadow-inner transition-colors duration-300">
      {/* Graph Floating Controls Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-main)] p-1 rounded-xl backdrop-blur-xl shadow-md">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-[var(--bg-surface)] transition text-xs font-mono font-bold"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-[var(--bg-surface)] transition text-xs font-mono font-bold"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={handleResetFit}
          className="px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-[var(--bg-surface)] transition text-[10px] font-mono font-bold"
          title="Center & Fit Canvas"
        >
          FIT
        </button>
        <button
          onClick={handleTogglePhysics}
          className={`px-2 py-1 rounded-lg transition text-[10px] font-mono font-bold ${
            physicsActive ? "text-emerald-700 bg-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-950/40 border border-emerald-500/40 dark:border-emerald-800/50" : "text-slate-600 dark:text-slate-400 hover:bg-[var(--bg-surface)]"
          }`}
          title="Toggle Physics Simulation"
        >
          {physicsActive ? "PHYSICS: ON" : "FROZEN"}
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SOLVING MULTI-LAYER FORCE GRAPH…</span>
          </div>
        </div>
      )}

      {/* Canvas Container */}
      <div id="neighborhood-graph" ref={containerRef} className="w-full h-full flex-1" />

      {/* Selected Node Status Bar */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl backdrop-blur-xl flex items-center justify-between text-xs font-mono shadow-xl">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[10px] font-bold uppercase text-slate-800 dark:text-slate-200 border border-[var(--border-main)]">
              {selectedNode.type}
            </span>
            <span className="text-slate-900 dark:text-white font-bold">{selectedNode.fullId || selectedNode.id}</span>
            {selectedNode.risk !== undefined && (
              <span className={`text-[11px] font-bold ${selectedNode.risk >= 70 ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
                Risk: {selectedNode.risk}/100
              </span>
            )}
          </div>
          <button
            onClick={() => onSelectNode(null)}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition px-2 py-0.5 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Investigation page ─────────────────────────────────────────────
export default function InvestigationWorkspace() {
  const txid  = useParams()?.id as string;
  const [lead, setLead] = useState<Lead | null>(null);
  const [tab,  setTab]  = useState<0|1|2|3>(0);
  const [graphData, setGraphData] = useState<any>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<any | null>(null);

  useEffect(() => {
    if (!txid) return;
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const mock = MOCK_LEADS.find(l => l.txid === txid) ?? MOCK_LEADS[0];
    
    fetch(`${API_BASE}/api/alerts/${txid}`)
      .then(r => r.json())
      .then(d => setLead({ ...mock, ...d }))
      .catch(() => setLead(mock));

    fetch(`${API_BASE}/api/graph/${txid}?hops=3`)
      .then(r => r.json())
      .then(setGraphData)
      .catch(() => setGraphData(null));
  }, [txid]);

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

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/leads"
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition shrink-0 shadow-2xs">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">LEAD INVESTIGATION</span>
              <RiskBadge band={lead.priority_band} />
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white font-mono">{lead.txid}</h1>
          </div>
        </div>

        <div className="flex gap-3 font-mono shrink-0">
          <div className="ws-card px-4 py-2.5 text-right shadow-2xs">
            <div className="text-[8px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">ANOMALY RISK</div>
            <div className={`text-2xl font-black ${lead.risk_score >= 80 ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
              {lead.risk_score}
            </div>
          </div>
          <div className="ws-card px-4 py-2.5 text-right shadow-2xs">
            <div className="text-[8px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">CONFIDENCE</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{lead.confidence_score}%</div>
          </div>
        </div>
      </div>

      {/* 4-Question Tab Bar */}
      <div className="ws-card p-1 flex gap-1">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i as 0|1|2|3)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
              tab === i
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black border border-slate-900 dark:border-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-[var(--bg-surface)]"
            }`}>
            <t.icon className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="inline sm:hidden">0{i+1}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
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
                  accent={lead.fan_out_ratio >= 8 ? "text-red-600 dark:text-red-400 font-bold" : undefined} />
                <InfoRow label="Velocity Percentile" value={`${lead.velocity_percentile}th`}
                  accent={lead.velocity_percentile >= 95 ? "text-red-600 dark:text-red-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"} />
                <InfoRow label="Timestamp"          value={new Date(lead.timestamp).toUTCString()} />
                <InfoRow label="ASN"               value={lead.asn} />
              </div>
              <div className="mt-5 p-3 bg-red-500/10 dark:bg-red-950/20 border border-red-500/30 dark:border-red-900/40 rounded-xl text-[11px] font-sans text-red-700 dark:text-red-300 leading-relaxed font-medium">
                <strong className="font-mono">Assessment:</strong> {lead.shap_explanation}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: WHERE DID IT CONNECT? */}
        {tab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 ws-card p-5 flex flex-col">
              <SectionHeader
                icon={Network}
                title="Multi-Layer Correlation Graph"
                subtitle="Interactive force-directed topology · drag, zoom & inspect nodes"
              />
              
              <div className="flex-1 w-full">
                <SmartNeighborhoodGraph
                  lead={lead}
                  graphData={graphData}
                  onSelectNode={setSelectedGraphNode}
                  selectedNode={selectedGraphNode}
                />
              </div>

              {/* Node Type Legend */}
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] ring-2 ring-[#f59e0b]/30" />
                  Transaction (TXID)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] ring-2 ring-[#ef4444]/30" />
                  Wallet Entity
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1] ring-2 ring-[#6366f1]/30" />
                  Peer IP Endpoint
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] ring-2 ring-[#06b6d4]/30" />
                  Port
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] ring-2 ring-[#a855f7]/30" />
                  Autonomous System (ASN)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] ring-2 ring-[#10b981]/30" />
                  Exchange Hop
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899] ring-2 ring-[#ec4899]/30" />
                  Mixer
                </span>
              </div>
            </div>

            {/* Entity Index Sidebar */}
            <div className="ws-card p-5 flex flex-col">
              <SectionHeader icon={Info} title="Entity Provenance Index" subtitle="Correlated Network & Chain Nodes" />
              <div className="space-y-2 flex-1 overflow-y-auto max-h-[460px] pr-1">
                {(lead.neighborhood_nodes || []).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => setSelectedGraphNode(n)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-[10px] font-mono ${
                      selectedGraphNode?.id === n.id
                        ? "bg-[var(--bg-surface)] border-slate-400 dark:border-slate-500 font-bold shadow-md"
                        : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-slate-400 shadow-2xs"
                    }`}
                  >
                    <div>
                      <div className="text-slate-900 dark:text-slate-200 font-semibold">{n.id}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[9px] uppercase tracking-wider">{n.type}</div>
                    </div>
                    {n.risk !== undefined && (
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          n.risk >= 70
                            ? "text-red-700 dark:text-red-400 bg-red-500/10 dark:bg-red-950/40 border border-red-500/30 dark:border-red-800/50"
                            : n.risk >= 40
                            ? "text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 dark:border-amber-800/50"
                            : "text-slate-700 dark:text-slate-300 bg-[var(--bg-surface)] border border-[var(--border-main)]"
                        }`}
                      >
                        Risk {n.risk}
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
              <SectionHeader icon={Cpu} title="AI Risk Breakdown"
                subtitle="Mathematical contribution per feature to anomaly score" />
              {lead.shap_values && Array.isArray(lead.shap_values) && lead.shap_values.length > 0 ? (
                <>
                  <ShapBar values={lead.shap_values} />
                  <div className="mt-5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[10px] font-mono text-slate-600 dark:text-slate-400 space-y-1">
                    <div><span className="text-red-600 dark:text-red-400 font-bold">Positive contribution (+)</span> = pushes score toward anomaly</div>
                    <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">Negative contribution (−)</span> = pushes score toward baseline</div>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-slate-500 dark:text-slate-400 font-mono text-xs">
                  Feature contribution breakdown not available for this record.
                </div>
              )}
            </div>
            <div className="ws-card p-5">
              <SectionHeader icon={AlertTriangle} title="Driving Feature Deep-Dive" />
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 dark:bg-red-950/20 border border-red-500/30 dark:border-red-900/40 rounded-xl">
                  <div className="text-[9px] font-mono text-red-600 dark:text-red-400 uppercase mb-1 font-bold">PRIMARY TRIGGER</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">{lead.top_feature}</div>
                </div>
                <div className="space-y-2 text-[11px] font-mono text-slate-800 dark:text-slate-200">
                  <InfoRow label="Anomaly Score" value={`${lead.risk_score} / 100`}
                    accent={lead.risk_score >= 80 ? "text-red-600 dark:text-red-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"} />
                  <InfoRow label="Evidence Confidence" value={`${lead.confidence_score}%`} />
                  <InfoRow label="Graph Centrality" value={(lead.graph_centrality || 0).toFixed(2)} />
                  <InfoRow label="Velocity Percentile" value={`${lead.velocity_percentile || 0}th`} />
                </div>
                <div className="mt-3 p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl text-[11px] text-slate-800 dark:text-slate-300 leading-relaxed font-sans font-medium">
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
                {(lead.investigator_actions || []).map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl shadow-2xs">
                    <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5 w-5 font-bold">{String(i+1).padStart(2,"0")}</span>
                    <span className="text-[12px] text-slate-800 dark:text-slate-200 font-sans leading-snug">{action}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ws-card p-5">
              <SectionHeader icon={Shield} title="Intelligence Doctrine" />
              <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  BIT-SHIELD provides investigative leads — it does <strong className="text-slate-900 dark:text-white">not</strong> establish criminal intent, legal ownership, real-world identity, or guilt. All SHAP attributions are evidence of behavioral correlation, not proof of ownership.
                </div>
                <div className="flex gap-2">
                  <Link href="/case-binder"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 border border-slate-900 dark:border-white text-[10px] font-mono font-bold uppercase py-2.5 rounded-xl transition-all shadow-2xs">
                    Add to Case Binder <ChevronRight className="w-3 h-3" />
                  </Link>
                  <button className="flex-1 flex items-center justify-center gap-1.5 border border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[10px] font-mono font-bold uppercase py-2.5 rounded-xl transition-all shadow-2xs">
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
    <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-subtle)]">
      <span className="text-slate-500 dark:text-slate-400 font-semibold">{label}</span>
      <span className={accent ?? "text-slate-800 dark:text-slate-200 font-bold"}>{value}</span>
    </div>
  );
}
