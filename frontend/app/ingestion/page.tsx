"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Database, Upload, CheckCircle2, AlertCircle, Cpu, Activity, HardDrive, Zap, Clock, MemoryStick, TreePine } from "lucide-react";
import { MOCK_OVERVIEW } from "@/components/workspace/MockData";
import { StatTile, GlassCard, SectionHeader } from "@/components/workspace/ui";

type FileStatus = "idle" | "parsing" | "success" | "error";

interface IngestedFile {
  name: string;
  size: string;
  format: string;
  rows?: number;
  status: FileStatus;
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
            Accepts: <span className="font-mono">.csv · .json · .xml · .pcap</span> — All processing is local. No data leaves this workstation.
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

  // Simulate fluctuating metrics
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

      {/* Processing speed bar */}
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

      {/* Memory pressure */}
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
  const [showShortcuts, setShowShortcuts] = useState(false);

  const handleFiles = (rawFiles: File[]) => {
    const newFiles: IngestedFile[] = rawFiles.map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      format: f.name.split(".").pop()?.toUpperCase() ?? "UNKNOWN",
      status: "parsing",
    }));
    setFiles(prev => [...newFiles, ...prev]);

    // Simulate parse completion
    newFiles.forEach((_, idx) => {
      setTimeout(() => {
        setFiles(prev => prev.map((file, i) =>
          i === idx ? {
            ...file, status: "success",
            rows: Math.floor(Math.random() * 40000) + 1000,
          } : file
        ));
      }, 1200 + Math.random() * 800);
    });
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "?") setShowShortcuts(v => !v);
      if (e.key === "Escape") setShowShortcuts(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const statusIcon = (s: FileStatus) => {
    if (s === "success") return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    if (s === "error")   return <AlertCircle  className="w-4 h-4 text-red-600 dark:text-red-400" />;
    return <div className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-slate-500 border-t-indigo-600 dark:border-t-white animate-spin" />;
  };

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
            Offline file ingest · Model diagnostics · Press <kbd className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded px-1 font-mono text-[10px] text-slate-800 dark:text-slate-300 font-bold">?</kbd> for keyboard shortcuts
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-emerald-900/50 px-3 py-1.5 rounded-full shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          LOCAL ENGINE READY
        </div>
      </div>

      {/* Upload zone + file log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="lg:col-span-2 space-y-4">
          <DropZone onFiles={handleFiles} />

          {files.length > 0 && (
            <div className="ws-card p-5">
              <SectionHeader icon={HardDrive} title="Ingestion Queue"
                subtitle={`${files.filter(f => f.status === "success").length}/${files.length} parsed`} />
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
