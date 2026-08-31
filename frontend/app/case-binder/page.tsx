"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderOpen, Clock, Shield, Download, X, ChevronRight, AlertTriangle,
  CheckCircle2, FileText, Package, Eye,
} from "lucide-react";
import { MOCK_LEADS, CASE_BINDER_DATA, type Lead } from "@/components/workspace/MockData";
import { RiskBadge, GlassCard, SectionHeader } from "@/components/workspace/ui";

// ── Report Export Modal ─────────────────────────────────────────────────
function ExportModal({ caseData, onClose }: { caseData: typeof CASE_BINDER_DATA; onClose: () => void }) {
  const [format, setFormat] = useState<"json" | "pdf">("json");
  const leads = MOCK_LEADS.filter(l => caseData.leads.includes(l.txid));

  const jsonPreview = JSON.stringify({
    case_id: caseData.case_id,
    classification: "OFFICIAL — FOR AUTHORIZED USE ONLY",
    generated_at: new Date().toISOString(),
    analyst: caseData.analyst,
    title: caseData.title,
    status: caseData.status,
    leads: leads.map(l => ({
      txid: l.txid,
      risk_score: l.risk_score,
      confidence_score: l.confidence_score,
      priority_band: l.priority_band,
      top_feature: l.top_feature,
      shap_explanation: l.shap_explanation,
      amount_btc: l.amount_btc,
    })),
    audit_trail: caseData.audit_log,
  }, null, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-2xl mx-4 ws-card p-6 rounded-2xl drawer-slide-in shadow-2xl" style={{ maxHeight: "80vh" }}>
        <div className="flex items-center justify-between mb-4 border-b border-[var(--border-main)] pb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase">Report Export Preview</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{caseData.case_id} · {caseData.title}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format toggle */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setFormat("json")}
            className={`flex-1 py-2 rounded-xl text-[10px] font-mono font-bold uppercase border transition ${format === "json" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white font-black" : "border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}>
            <FileText className="inline w-3 h-3 mr-1" />JSON
          </button>
          <button onClick={() => setFormat("pdf")}
            className={`flex-1 py-2 rounded-xl text-[10px] font-mono font-bold uppercase border transition ${format === "pdf" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white font-black" : "border-[var(--border-main)] bg-[var(--bg-surface)] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}>
            <Package className="inline w-3 h-3 mr-1" />PDF
          </button>
        </div>

        {format === "json" ? (
          <div className="overflow-y-auto rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] p-4" style={{ maxHeight: "45vh" }}>
            <pre className="text-[10px] font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{jsonPreview}</pre>
          </div>
        ) : (
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl text-[11px] font-mono text-slate-700 dark:text-slate-300 space-y-3">
            <div className="text-center text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-[var(--border-main)] pb-3">
              ——— OFFICIAL INTELLIGENCE DOSSIER ———
            </div>
            <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 font-bold">FOR OFFICIAL USE ONLY · FIU-INDIA / NTRO</div>
            <div className="grid grid-cols-2 gap-2 text-[10px] pt-2">
              <InfoLine label="Case ID" value={caseData.case_id} />
              <InfoLine label="Title"   value={caseData.title} />
              <InfoLine label="Analyst" value={caseData.analyst} />
              <InfoLine label="Status"  value={caseData.status} />
            </div>
            <div className="border-t border-[var(--border-main)] pt-3 space-y-1">
              {leads.map(l => (
                <div key={l.txid} className="flex justify-between py-1 border-b border-[var(--border-subtle)] text-[10px]">
                  <span className="text-slate-600 dark:text-slate-400">{l.txid}</span>
                  <span className={l.risk_score >= 80 ? "text-red-600 dark:text-red-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>Risk {l.risk_score}</span>
                </div>
              ))}
            </div>
            <div className="text-center text-[9px] text-slate-500 dark:text-slate-400 pt-2">Generated offline · No external network transmission</div>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 border border-slate-900 dark:border-white py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase transition-all shadow-2xs">
            <Download className="w-3 h-3" /> Download {format.toUpperCase()}
          </button>
          <button onClick={onClose} className="px-5 border border-[var(--border-main)] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase transition bg-[var(--bg-surface)]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Case Binder ────────────────────────────────────────────────────
export default function CaseBinder() {
  const [showExport, setShowExport] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    fetch(`${API_BASE}/api/alerts`)
      .then((r) => r.json())
      .then(setLeads)
      .catch(() => setLeads(MOCK_LEADS));
  }, []);

  const caseLeads = leads.filter(l => CASE_BINDER_DATA.leads.includes(l.txid));

  return (
    <div className="space-y-5 animate-fade-in-up">
      {showExport && <ExportModal caseData={CASE_BINDER_DATA} onClose={() => setShowExport(false)} />}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <FolderOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h1 className="text-lg font-black text-slate-900 dark:text-white font-mono uppercase tracking-wide">Case Binder</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">Evidence management · Chain of custody · Export</p>
        </div>
        <button onClick={() => setShowExport(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 border border-slate-900 dark:border-white dark:text-slate-950 text-[10px] font-mono font-bold uppercase px-4 py-2 rounded-xl transition-all shadow-2xs">
          <Download className="w-3 h-3" /> Export Dossier
        </button>
      </div>

      {/* Case identity card */}
      <div className="ws-card p-5">
        <div className="flex items-center gap-3 mb-5 border-b border-[var(--border-main)] pb-4">
          <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
            <Shield className="w-5 h-5 text-slate-800 dark:text-slate-200" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">{CASE_BINDER_DATA.case_id}</div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-mono">{CASE_BINDER_DATA.title}</h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-950/50 border border-amber-500/30 dark:border-amber-800/60 text-amber-700 dark:text-amber-400">
            {CASE_BINDER_DATA.status}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] font-mono">
          <div><span className="text-slate-500 dark:text-slate-400">Analyst:</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">{CASE_BINDER_DATA.analyst}</span></div>
          <div><span className="text-slate-500 dark:text-slate-400">Created:</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">{new Date(CASE_BINDER_DATA.created).toLocaleDateString()}</span></div>
          <div><span className="text-slate-500 dark:text-slate-400">Leads:</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">{CASE_BINDER_DATA.leads.length}</span></div>
          <div><span className="text-slate-500 dark:text-slate-400">Actions:</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">{CASE_BINDER_DATA.audit_log.length}</span></div>
        </div>
      </div>

      {/* 2-column: Leads + Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Pinned Leads */}
        <div className="ws-card p-5">
          <SectionHeader icon={AlertTriangle} title="Evidence Leads" subtitle="Pinned to this case" />
          <div className="space-y-3">
            {caseLeads.map(lead => (
              <div key={lead.txid}
                className="flex items-center justify-between p-3.5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] gap-3 shadow-2xs">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-slate-900 dark:text-slate-200 font-bold">{lead.txid}</span>
                    <RiskBadge band={lead.priority_band} />
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-1 font-sans">{lead.shap_explanation}</p>
                </div>
                <Link href={`/investigation/${lead.txid}`}
                  className="shrink-0 flex items-center gap-1 text-[9px] font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-[var(--border-main)] px-2.5 py-1.5 rounded-lg transition-all bg-[var(--bg-card)] shadow-2xs">
                  <Eye className="w-2.5 h-2.5" /> View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Chain of Custody Log */}
        <div className="ws-card p-5">
          <SectionHeader icon={Clock} title="Chain of Custody" subtitle="Immutable audit log" />
          <div className="relative space-y-0">
            {CASE_BINDER_DATA.audit_log.map((entry, i) => (
              <div key={i} className="flex gap-3 pb-4 last:pb-0">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400 border border-slate-600 mt-1 shrink-0 z-10" />
                  {i < CASE_BINDER_DATA.audit_log.length - 1 && (
                    <div className="flex-1 w-px bg-slate-300 dark:bg-slate-800 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-slate-200">{entry.action}</span>
                    <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                      {new Date(entry.ts).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-slate-500 dark:text-slate-400 font-semibold">{label}:</span>
      <span className="text-slate-900 dark:text-slate-200 font-bold">{value}</span>
    </div>
  );
}
