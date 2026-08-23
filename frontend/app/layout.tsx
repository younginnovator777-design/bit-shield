"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, Search, List, Activity } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return <html lang="en" className="dark"><body className="antialiased"><div className="bg-mask"></div>{children}</body></html>;

  const nav = [
    { name: "Command Center", href: "/command-center", icon: LayoutDashboard },
    { name: "Leads Explorer", href: "/leads", icon: List },
  ];

  return (
    <html lang="en" className="dark">
      <body className="antialiased flex h-screen overflow-hidden">
        <div className="bg-mask"></div>
        
        {/* Enterprise Sidebar */}
        <aside className="w-64 bg-slate-950/60 backdrop-blur-xl border-r border-slate-800/60 flex flex-col z-20">
          <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
            <Link href="/" className="flex items-center space-x-3 group">
              <Shield className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              <div>
                <div className="text-lg font-black tracking-widest text-slate-100">BIT-SHIELD</div>
                <div className="text-[9px] text-cyan-500 uppercase tracking-widest font-mono">Offline Engine Active</div>
              </div>
            </Link>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-600 mb-4 px-2 tracking-wider">Investigation</div>
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${active ? 'bg-cyan-950/40 border border-cyan-900/50 text-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'}`}>
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto relative z-10">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
