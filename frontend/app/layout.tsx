"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, List, Network, FolderOpen, Database, Lock, Wifi, Cpu, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { ThemeProvider, ThemeScript } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const WORKSPACE_NAV = [
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

const MARKETING_ROUTES = [
  "/",
  "/threat-intelligence",
  "/investigations",
  "/risk-matrix",
  "/capabilities",
  "/architecture",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMarketingPage = MARKETING_ROUTES.includes(pathname);

  useEffect(() => {
    const body = document.body;
    if (isMarketingPage) {
      body.classList.remove("workspace");
    } else {
      body.classList.add("workspace");
    }
    return () => body.classList.remove("workspace");
  }, [isMarketingPage]);

  if (isMarketingPage) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeScript />
        </head>
        <body className="antialiased transition-colors duration-300 min-h-screen flex flex-col justify-between">
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased flex h-screen overflow-hidden transition-colors duration-300">
        <ThemeProvider>
          <div className="flex h-screen w-full overflow-hidden">
            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="w-60 shrink-0 flex flex-col z-20 border-r border-[var(--border-main)] bg-[var(--bg-sidebar)] backdrop-blur-xl transition-colors duration-300">

              {/* Logo block */}
              <div className="h-[60px] flex items-center justify-between px-4 border-b border-[var(--border-main)] shrink-0">
                <Link href="/" className="flex items-center space-x-2.5 group">
                  <div className="relative w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border-main)] bg-[var(--bg-card)] shadow-xs transition">
                    <Shield className="w-4 h-4 text-slate-900 dark:text-slate-200" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-surface)]" />
                  </div>
                  <div>
                    <div className="text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase">BIT-SHIELD</div>
                    <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 tracking-wider font-semibold">ENGINE ONLINE</div>
                  </div>
                </Link>
              </div>

              {/* Nav groups */}
              <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
                {WORKSPACE_NAV.map((group) => (
                  <div key={group.group}>
                    <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-2 mb-1.5 font-mono">
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
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold border border-slate-900 dark:border-white"
                                : "text-slate-600 dark:text-slate-400 hover:bg-[var(--bg-card)] hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                          >
                            <span className="flex items-center space-x-2.5">
                              <item.icon className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-[12px] font-semibold">{item.name}</span>
                            </span>
                            <span className={`text-[9px] font-mono ${active ? "opacity-90" : "text-slate-400 dark:text-slate-500"}`}>
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
              <div className="px-3 pb-4 space-y-2 border-t border-[var(--border-main)] pt-3 shrink-0">
                <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 mb-2 font-mono">
                  SYSTEM STATUS
                </div>
                <StatusRow icon={Lock}  label="OFFLINE MODE"    value="ACTIVE"      color="text-emerald-600 dark:text-emerald-400" />
                <StatusRow icon={Wifi}  label="NETWORK"         value="DISCONNECTED" color="text-slate-700 dark:text-slate-300" />
                <StatusRow icon={Cpu}   label="AI ENGINE"       value="LOCAL"       color="text-slate-700 dark:text-slate-300" />
                <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] text-[9px] font-mono text-slate-500 dark:text-slate-400 px-1 font-bold">
                  BIT-SHIELD • offline-intel
                </div>
              </div>

            </aside>

            {/* ── Main canvas ─────────────────────────────────────────── */}
            <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-transparent">
              {/* Top bar */}
              <div className="h-[60px] shrink-0 flex items-center justify-between px-6 border-b border-[var(--border-main)] bg-[var(--bg-header)] backdrop-blur-md transition-colors duration-300">
                <Breadcrumb pathname={pathname} />
                <div className="flex items-center space-x-3 text-[10px] font-mono">
                  <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="hidden sm:inline font-bold">OFFLINE TRAFFIC INTELLIGENCE WORKSTATION</span>
                  </div>
                  <ThemeToggle />
                </div>
              </div>

              {/* Page content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-screen-xl mx-auto px-6 py-6">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function StatusRow({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)]">
      <span className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 dark:text-slate-400">
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
      <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-semibold">BIT-SHIELD</Link>
      {parts.map((part, i) => (
        <span key={i} className="flex items-center space-x-1.5">
          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className={i === parts.length - 1 ? "text-slate-900 dark:text-white font-bold" : "text-slate-500 dark:text-slate-400"}>
            {part.replace(/-/g, " ").toUpperCase()}
          </span>
        </span>
      ))}
    </div>
  );
}
