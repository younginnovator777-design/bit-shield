"use client";

import { ACTIVITY_EVENTS } from "./MockData";

export default function ActivityTicker() {
  // Duplicate for seamless loop
  const events = [...ACTIVITY_EVENTS, ...ACTIVITY_EVENTS];
  return (
    <div className="ws-card overflow-hidden py-2.5 px-4 flex items-center gap-3">
      <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest shrink-0 border-r border-slate-300 dark:border-slate-800 pr-3 mr-1">
        LIVE FEED
      </span>
      <div className="overflow-hidden flex-1 relative">
        <div className="animate-ticker flex gap-8">
          {events.map((e, i) => (
            <span key={i} className="text-[11px] font-mono text-slate-800 dark:text-slate-300 shrink-0 flex items-center gap-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
