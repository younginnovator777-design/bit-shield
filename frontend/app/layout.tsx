"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, List, Network, FolderOpen, Database, Lock, Wifi, Cpu, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const NAV_ITEMS = [
  {
    group: "INTELLIGENCE",
    items: [
      { name: "Command Center",    href: "/command-center", icon: LayoutDashboard, shortcut: "⌘1" },
      { name: "Leads Explorer",    href: "/leads",          icon: List,            shortcut: "⌘2" },
      { name: "Graph Workspace",   href: "/investigation",  icon: Network,         shortcut: "⌘3" },
    ],
  },
  {
    group: "CASEWORK",
    items: [
      { name: "Case Binder",       href: "/case-binder",    icon: FolderOpen,      shortcut: "⌘4" },
      { name: "Ingestion Portal",  href: "/ingestion",      icon: Database,        shortcut: "⌘5" },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  const isLanding = pathname === "/";

  useEffect(() => {
    const body = document.body;
    if (isLanding) {
      body.classList.remove("workspace");
    } else {
      body.classList.add("workspace");
    }
    return () => body.classList.remove("workspace");
  }, [isLanding]);

  if (isLanding) {
    return (
      <html lang="en" className="dark">
        <body className="antialiased">{children}</body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark">
      <body className="antialiased flex h-screen overflow-hidden">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="w-60 shrink-0 flex flex-col z-20 border-r border-white/[0.06]"
          style={{ background: "rgba(11,13,17,0.95)", backdropFilter: "blur(16px)" }}>

          {/* Logo block */}
          <div className="h-[60px] flex items-center px-5 border-b border-white/[0.06] shrink-0">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                style={{ background: "rgba(30,35,48,0.8)" }}>
                <Shield className="w-4 h-4 text-slate-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0b0d11]" />
              </div>
              <div>
                <div className="text-sm font-black tracking-widest text-white uppercase">BIT-SHIELD</div>
                <div className="text-[9px] font-mono text-emerald-500 tracking-wider">ENGINE ONLINE</div>
              </div>
            </Link>
          </div>

          {/* Nav groups */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
            {NAV_ITEMS.map((group) => (
              <div key={group.group}>
                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-2 mb-1.5 font-mono">
                  {group.group}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${
                          active
                            ? "bg-white/[0.08] text-white border border-white/[0.1]"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                        }`}
                      >
                        <span className="flex items-center space-x-2.5">
                          <item.icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[12px] font-semibold">{item.name}</span>
                        </span>
                        <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-500">
                          {item.shortcut}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* System status strip */}
          <div className="px-3 pb-4 space-y-2 border-t border-white/[0.06] pt-3 shrink-0">
            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-1 mb-2 font-mono">
              SYSTEM STATUS
            </div>
            <StatusRow icon={Lock}  label="OFFLINE MODE"    value="ACTIVE"      color="text-emerald-400" />
            <StatusRow icon={Wifi}  label="NETWORK"         value="DISCONNECTED" color="text-slate-300" />
            <StatusRow icon={Cpu}   label="AI ENGINE"       value="LOCAL"       color="text-slate-300" />
            <div className="mt-2 pt-2 border-t border-white/[0.04] text-[9px] font-mono text-slate-600 px-1">
              BIT-SHIELD • offline-intel
            </div>
          </div>

        </aside>

        {/* ── Main canvas ─────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden relative z-10">
          {/* Top bar */}
          <div className="h-[60px] shrink-0 flex items-center justify-between px-6 border-b border-white/[0.06]"
            style={{ background: "rgba(11,13,17,0.9)", backdropFilter: "blur(12px)" }}>
            <Breadcrumb pathname={pathname} />
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>OFFLINE TRAFFIC INTELLIGENCE WORKSTATION</span>
            </div>
          </div>
          {/* Page content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-screen-xl mx-auto px-6 py-6">
              {children}
            </div>
          </div>
        </main>

      </body>
    </html>
  );
}

function StatusRow({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
      <span className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
        <Icon className="w-2.5 h-2.5" /> {label}
      </span>
      <span className={`text-[9px] font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
}

function Breadcrumb({ pathname }: { pathname: string }) {
  const parts = pathname.split("/").filter(Boolean);
  return (
    <div className="flex items-center space-x-1.5 text-[11px] font-mono">
      <Link href="/" className="text-slate-500 hover:text-slate-300 transition">BIT-SHIELD</Link>
      {parts.map((part, i) => (
        <span key={i} className="flex items-center space-x-1.5">
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <span className={i === parts.length - 1 ? "text-slate-200 font-semibold" : "text-slate-500"}>
            {part.replace(/-/g, " ").toUpperCase()}
          </span>
        </span>
      ))}
    </div>
  );
}
