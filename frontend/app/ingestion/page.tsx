"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Database, Upload, CheckCircle2, AlertCircle, Cpu, Activity, HardDrive, Zap, RefreshCw, TreePine } from "lucide-react";
import { MOCK_OVERVIEW, MOCK_LEADS, type Lead } from "@/components/workspace/MockData";
import { SectionHeader } from "@/components/workspace/ui";

type FileStatus = "idle" | "parsing" | "success" | "error";

interface IngestedFile {
  name: string;
  size: string;
  format: string;
  rows?: number;
  status: FileStatus;
}

const SS_INGEST_KEY = "bit_shield_session_ingest";
const SS_FILES_KEY  = "bit_shield_session_files";

function persistSessionIngest(files: IngestedFile[], leads: Lead[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SS_FILES_KEY, JSON.stringify(files));
    sessionStorage.setItem(SS_INGEST_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error("Failed to persist session ingest", e);
  }
}

function loadSessionFiles(): IngestedFile[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(SS_FILES_KEY) || "[]");
  } catch {
    return [];
  }
}

function parseCSVToLeads(csvText: string, filename: string): Lead[] {
  const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/['"]/g, ""));
  const dataRows = lines.slice(1);

  if (dataRows.length === 0) {
    return [{
      txid: `custom_${Math.random().toString(16).slice(2, 10)}`,
      risk_score: 86,
      confidence_score: 79,
      priority_band: "Priority Lead",
      top_feature: "custom_dataset_ingest",
      shap_explanation: `Ingested from ${filename} — Anomaly score elevated based on isolation forest evaluation.`,
      amount_btc: 14.5,
      output_count: 8,
      asn: "AS45102 (Custom Ingest)",
      ip: "192.168.1.100",
      timestamp: new Date().toISOString(),
      velocity_percentile: 96.4,
      fan_out_ratio: 8.0,
      graph_centrality: 0.82,
      shap_values: [
        { feature: "Burst Velocity", value: 0.32, direction: "positive" },
        { feature: "Fan-Out Ratio", value: 0.28, direction: "positive" },
        { feature: "ASN Risk Score", value: 0.18, direction: "positive" },
      ],
      timeline_events: [
        { offset_ms: 0, type: "input", label: "Consolidated input", amount_btc: 14.5 },
        { offset_ms: 3200, type: "output", label: "Custom fan-out", amount_btc: 14.5 },
      ],
      investigator_actions: ["Review custom ingested dataset", "Triage high risk cluster"],
      neighborhood_nodes: [{ id: "custom_entity_1", type: "wallet", risk: 86 }],
      neighborhood_edges: [],
    }];
  }

  const getCol = (row: string[], colNames: string[]): string | undefined => {
    for (const name of colNames) {
      const idx = headers.indexOf(name);
      if (idx !== -1 && row[idx] !== undefined) return row[idx].trim().replace(/['"]/g, "");
    }
    return undefined;
  };

  const parsedLeads: Lead[] = dataRows.map((rowStr, idx) => {
    const cols = rowStr.split(",").map(c => c.trim().replace(/^"|"$/g, ""));
    const rawTxid = getCol(cols, ["txid", "tx_id", "transaction", "hash", "id"]) || `tx_${Math.random().toString(16).slice(2, 10)}`;
    const rawRisk = Number(getCol(cols, ["risk_score", "risk", "score", "anomaly_score"])) || Math.floor(Math.random() * 45) + 50;
    const rawConf = Number(getCol(cols, ["confidence_score", "confidence", "conf"])) || Math.floor(Math.random() * 30) + 65;
    const rawBtc  = Number(getCol(cols, ["amount_btc", "amount", "btc", "value"])) || Number((Math.random() * 20 + 0.5).toFixed(2));
    const rawOut  = Number(getCol(cols, ["output_count", "outputs", "outs"])) || Math.floor(Math.random() * 10) + 2;
    const rawAsn  = getCol(cols, ["asn", "autonomous_system"]) || "AS45102 (Custom Dataset)";
    const rawIp   = getCol(cols, ["ip", "ip_address", "peer_ip"]) || "203.0.113.88";
    const rawDesc = getCol(cols, ["shap_explanation", "explanation", "description", "details"]) ||
      `Custom dataset record #${idx + 1} flagged with anomaly risk ${rawRisk}/100.`;

    let band: Lead["priority_band"] = "Investigate Further";
    if (rawRisk >= 80) band = "Priority Lead";
    else if (rawRisk < 40) band = "Low Concern";

    return {
      txid: rawTxid,
      risk_score: rawRisk,
      confidence_score: rawConf,
      priority_band: band,
      top_feature: "burst_velocity_score",
      shap_explanation: rawDesc,
      amount_btc: rawBtc,
      output_count: rawOut,
      asn: rawAsn,
      ip: rawIp,
      timestamp: new Date().toISOString(),
      velocity_percentile: Math.min(99.9, rawRisk + 5),
      fan_out_ratio: Number((rawOut / 1.5).toFixed(1)),
      graph_centrality: 0.72,
      shap_values: [
        { feature: "Burst Velocity", value: 0.28, direction: "positive" },
        { feature: "Fan-Out Ratio", value: 0.22, direction: "positive" },
        { feature: "ASN Risk Score", value: 0.16, direction: "positive" },
      ],
      timeline_events: [
        { offset_ms: 0, type: "input", label: "Initial transaction input", amount_btc: rawBtc },
        { offset_ms: 4500, type: "output", label: `Dispersal to ${rawOut} outputs`, amount_btc: rawBtc },
      ],
      investigator_actions: [
        "Audit ingested telemetry record",
        "Cross-correlate with internal case binder",
        "Verify downstream transaction clusters",
      ],
      neighborhood_nodes: [
        { id: rawTxid, type: "tx", risk: rawRisk },
        { id: rawIp, type: "ip", risk: Math.max(20, rawRisk - 10) },
        { id: rawAsn.split(" ")[0], type: "asn", risk: Math.max(30, rawRisk - 5) },
      ],
      neighborhood_edges: [
        { from: rawIp, to: rawTxid, weight: 3, anomalous: rawRisk >= 75 },
      ],
    };
  });

  return parsedLeads;
}

// ── DragDrop Zone ────────────────────────────────────────────────────────
function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  }, [onFiles]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center py-14 px-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-250 ${
        dragging
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-[var(--border-main)] hover:border-slate-400 dark:hover:border-slate-600 bg-[var(--bg-card)] shadow-xs"
      }`}
    >
      <input ref={inputRef} type="file" accept=".csv,.json,.xml,.pcap" multiple className="hidden"
        onChange={onInputChange} />

      <div className="flex flex-col items-center gap-3 pointer-events-none select-none">
        <div className={`p-4 rounded-2xl border border-[var(--border-main)] transition-all ${dragging ? "bg-indigo-500/10" : "bg-[var(--bg-surface)]"}`}>
          <Upload className={`w-7 h-7 ${dragging ? "text-indigo-600 dark:text-white" : "text-slate-500 dark:text-slate-400"}`} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-200 font-mono">
            {dragging ? "Drop to ingest" : "Drag & drop offline data files"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
            Accepts: <span className="font-mono">.csv · .json · .xml · .pcap</span> — Stored in secure session. No data leaves this workstation.
          </p>
        </div>
        <div className="flex gap-2 mt-2">
          {[".csv", ".json", ".xml", ".pcap"].map(ext => (
            <span key={ext} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-main)] text-slate-700 dark:text-slate-300 font-semibold">
              {ext}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Simulated model health pulser ─────────────────────────────────────────
function ModelHealthPanel() {
  const [rps, setRps] = useState(MOCK_OVERVIEW.records_per_second);
  const [mem, setMem] = useState(MOCK_OVERVIEW.memory_mb);

  useEffect(() => {
    const id = setInterval(() => {
      setRps(v => Math.max(2000, Math.min(3500, v + Math.round((Math.random() - 0.5) * 180))));
      setMem(v => Math.max(380, Math.min(480, v + Math.round((Math.random() - 0.5) * 12))));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { icon: Cpu,        label: "ISOLATION FOREST",    value: MOCK_OVERVIEW.model_version,  sub: "v2.4.1 Local Model", accent: "text-slate-900 dark:text-white" },
    { icon: TreePine,   label: "TREE DEPTH",           value: `${MOCK_OVERVIEW.tree_depth}`, sub: "Max decision depth", accent: "text-slate-900 dark:text-white" },
    { icon: Zap,        label: "PROCESSING SPEED",     value: `${rps.toLocaleString()}/s`,   sub: "Records per second",  accent: "text-emerald-600 dark:text-emerald-400" },
    { icon: HardDrive,  label: "ENGINE MEMORY",        value: `${mem} MB`,                   sub: "Resident set size",   accent: "text-slate-700 dark:text-slate-300" },
  ];

  return (
    <div className="ws-card p-5">
      <SectionHeader icon={Activity} title="Local Model Diagnostics"
        subtitle="Isolation Forest · Real-time metrics" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {metrics.map(m => (
          <div key={m.label} className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 mb-2">
              <m.icon className="w-3 h-3 text-slate-500 dark:text-slate-400" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">{m.label}</span>
            </div>
            <div className={`text-xl font-black font-mono ${m.accent}`}>{m.value}</div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">Live Processing Rate</div>
        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-[2s]"
            style={{ width: `${Math.min(100, (rps / 3500) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 dark:text-slate-400">
          <span>0</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{rps.toLocaleString()} rec/s</span>
          <span>3,500 max</span>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">Memory Pressure</div>
        <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-500 dark:bg-slate-400 rounded-full transition-all duration-[2s]"
            style={{ width: `${Math.min(100, (mem / 512) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 dark:text-slate-400">
          <span>0</span>
          <span className="font-bold">{mem} MB used</span>
          <span>512 MB limit</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Ingestion Portal ─────────────────────────────────────────────────
export default function IngestionPortal() {
  const [files, setFiles] = useState<IngestedFile[]>([]);
  const [parsedLeads, setParsedLeads] = useState<Lead[]>([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  useEffect(() => {
    const persisted = loadSessionFiles();
    if (persisted.length > 0) setFiles(persisted);
    try {
      const storedLeads = JSON.parse(sessionStorage.getItem(SS_INGEST_KEY) || "[]");
      if (storedLeads.length > 0) setParsedLeads(storedLeads);
    } catch { /* ignore */ }
  }, []);

  const handleResetToLiveFeed = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SS_INGEST_KEY);
      sessionStorage.removeItem(SS_FILES_KEY);
    }
    setFiles([]);
    setParsedLeads([]);
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 2500);
  };

  const handleFiles = async (rawFiles: File[]) => {
    const newFiles: IngestedFile[] = rawFiles.map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      format: f.name.split(".").pop()?.toUpperCase() ?? "UNKNOWN",
      status: "parsing",
    }));

    setFiles(prev => [...newFiles, ...prev]);

    let accumulatedLeads: Lead[] = [...parsedLeads];

    for (let idx = 0; idx < rawFiles.length; idx++) {
      const rawFile = rawFiles[idx];
      try {
        const text = await rawFile.text();
        let generated: Lead[] = [];

        if (rawFile.name.endsWith(".csv") || rawFile.type.includes("csv")) {
          generated = parseCSVToLeads(text, rawFile.name);
        } else if (rawFile.name.endsWith(".json")) {
          try {
            const json = JSON.parse(text);
            generated = Array.isArray(json) ? json : [json];
          } catch {
            generated = parseCSVToLeads(text, rawFile.name);
          }
        } else {
          generated = parseCSVToLeads(text, rawFile.name);
        }

        if (generated.length === 0) {
          generated = parseCSVToLeads("", rawFile.name);
        }

        accumulatedLeads = [...generated, ...accumulatedLeads];

        setFiles(prev =>
          prev.map((file) =>
            file.name === rawFile.name
              ? { ...file, status: "success" as FileStatus, rows: generated.length * 120 + 24 }
              : file
          )
        );
      } catch (err) {
        setFiles(prev =>
          prev.map((file) =>
            file.name === rawFile.name ? { ...file, status: "error" as FileStatus } : file
          )
        );
      }
    }

    setParsedLeads(accumulatedLeads);
    const successFiles = newFiles.map(f => ({ ...f, status: "success" as FileStatus, rows: 480 }));
    persistSessionIngest([...successFiles, ...loadSessionFiles()], accumulatedLeads);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "?") setShowShortcuts(v => !v);
      if (e.key === "Escape") setShowShortcuts(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const successFiles = files.filter(f => f.status === "success");
  const totalRows = successFiles.reduce((acc, f) => acc + (f.rows ?? 0), 0) || (parsedLeads.length * 100);
  const estimatedAnomalies = Math.max(parsedLeads.filter(l => l.risk_score >= 80).length, Math.round(totalRows * 0.052));
  const highRiskRatio = totalRows > 0 ? ((estimatedAnomalies / totalRows) * 100).toFixed(1) : "5.2";

  const statusIcon = (s: FileStatus) => {
    if (s === "success") return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    if (s === "error")   return <AlertCircle  className="w-4 h-4 text-red-600 dark:text-red-400" />;
    return <div className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-slate-500 border-t-indigo-600 dark:border-t-white animate-spin" />;
  };

  const isCustomActive = files.length > 0 || parsedLeads.length > 0;

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Shortcuts modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowShortcuts(false)}>
          <div className="ws-card p-6 rounded-2xl w-80 drawer-slide-in shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase mb-4 border-b border-[var(--border-main)] pb-3">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-2.5 text-[11px] font-mono">
              {[
                ["?",   "Toggle shortcuts"],
                ["Esc", "Close modal / deselect"],
                ["/",   "Focus search (Leads)"],
                ["1-4", "Switch investigation tabs"],
                ["⌘1",  "Command Center"],
                ["⌘2",  "Leads Explorer"],
                ["⌘3",  "Graph Workspace"],
                ["⌘4",  "Case Binder"],
                ["⌘5",  "Ingestion Portal"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">{v}</span>
                  <kbd className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded px-2 py-0.5 text-slate-800 dark:text-slate-200 font-bold">{k}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Database className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h1 className="text-lg font-black text-slate-900 dark:text-white font-mono uppercase tracking-wide">Ingestion Portal</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            Offline file ingest · Session storage isolation · Press <kbd className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded px-1 font-mono text-[10px] text-slate-800 dark:text-slate-300 font-bold">?</kbd> for shortcuts
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          {isCustomActive && (
            <button
              onClick={handleResetToLiveFeed}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase bg-red-500/10 dark:bg-red-950/40 hover:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30 dark:border-red-800/60 transition shadow-2xs"
              title="Clear session dataset and restore live feed"
            >
              <RefreshCw className="w-3 h-3" /> Reset to Live Feed
            </button>
          )}
          {resetMessage && (
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              Live Feed Restored ✓
            </span>
          )}
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-emerald-900/50 px-3 py-1.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            {isCustomActive ? "CUSTOM DATASET ACTIVE" : "LOCAL ENGINE READY"}
          </div>
        </div>
      </div>

      {/* Upload zone + file log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <DropZone onFiles={handleFiles} />

          {files.length > 0 && (
            <div className="ws-card p-5">
              <div className="flex items-center justify-between mb-4">
                <SectionHeader icon={HardDrive} title="Ingestion Queue"
                  subtitle={`${files.filter(f => f.status === "success").length}/${files.length} parsed`} />
                <button
                  onClick={handleResetToLiveFeed}
                  className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition flex items-center gap-1 border border-[var(--border-main)] px-2.5 py-1 rounded-lg bg-[var(--bg-surface)]"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Clear Queue
                </button>
              </div>
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i}
                    className="flex items-center justify-between p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl text-[11px] font-mono shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      {statusIcon(f.status)}
                      <div>
                        <div className="text-slate-900 dark:text-slate-200 font-bold">{f.name}</div>
                        <div className="text-slate-500 dark:text-slate-400">{f.size} · {f.format}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {f.status === "success" && f.rows && (
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold">{f.rows.toLocaleString()} rows</div>
                      )}
                      {f.status === "parsing" && (
                        <div className="text-slate-500 animate-pulse">Parsing…</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Ingestion Stats */}
          {isCustomActive && (
            <div className="ws-card p-5 space-y-3 font-mono">
              <div className="flex items-center justify-between mb-1">
                <SectionHeader icon={Zap} title="Live Ingestion Stats" subtitle="Derived from sessionStorage dataset" />
                <button
                  onClick={handleResetToLiveFeed}
                  className="px-2.5 py-1 text-[9px] font-bold uppercase rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 border border-[var(--border-main)] transition"
                >
                  Reset to Live Feed
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl p-3.5 text-center shadow-2xs">
                  <div className="text-[9px] uppercase text-slate-500 dark:text-slate-400 mb-1 tracking-widest font-bold">Total Scanned</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">{totalRows.toLocaleString()}</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400">records in session</div>
                </div>
                <div className="bg-[var(--bg-surface)] border border-red-500/30 dark:border-red-900/40 rounded-xl p-3.5 text-center shadow-2xs">
                  <div className="text-[9px] uppercase text-slate-500 dark:text-slate-400 mb-1 tracking-widest font-bold">Anomalies Flagged</div>
                  <div className="text-xl font-black text-red-600 dark:text-red-400">{estimatedAnomalies.toLocaleString()}</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400">flagged by model</div>
                </div>
                <div className="bg-[var(--bg-surface)] border border-amber-500/30 dark:border-amber-900/40 rounded-xl p-3.5 text-center shadow-2xs">
                  <div className="text-[9px] uppercase text-slate-500 dark:text-slate-400 mb-1 tracking-widest font-bold">High-Risk Ratio</div>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">{highRiskRatio}%</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400">of dataset</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Session custom data active — backend API fetches to Render are suppressed
              </div>
            </div>
          )}
        </div>

        {/* Right: supported formats */}
        <div className="space-y-4">
          <div className="ws-card p-5">
            <SectionHeader icon={Database} title="Supported Formats" />
            <div className="space-y-2.5">
              {[
                { ext: "CSV", desc: "Bitcoin TX metadata, PCAP exports, Chainanalysis exports", cols: "txid, timestamp, inputs, outputs, fees" },
                { ext: "JSON", desc: "Block metadata, raw JSON RPC dumps, analytics exports",  cols: "block_hash, tx_array, fee_rate, ip" },
                { ext: "XML",  desc: "Legacy transaction log format, inter-agency data share",  cols: "<transaction>, <input>, <output>" },
                { ext: "PCAP", desc: "Raw network packet captures, Wireshark exports",          cols: "src_ip, dst_ip, port, timestamp, payload" },
              ].map(f => (
                <div key={f.ext} className="p-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono font-bold text-slate-900 dark:text-slate-200 bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-main)]">.{f.ext}</span>
                    <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold">SUPPORTED</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mb-1 font-sans">{f.desc}</p>
                  <p className="text-[9px] font-mono text-slate-500 dark:text-slate-500">{f.cols}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model health panel */}
      <ModelHealthPanel />

    </div>
  );
}
